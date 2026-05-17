#!/usr/bin/env python3
"""
arXiv LLM Evaluation Paper Ingest v4 — 终态版，内置质量分流 + 自动反向关联
- Stage 1: 多查询搜索（20+ queries, 时间窗默认 2.5 年）
- Stage 2: 元数据预筛 → top 300
- Stage 3: 并发下载 PDF
- Stage 4: PDF 解析 + 质量评估（25 分制）
- Stage 5: 质量分流：
    ≥ EXCELLENT_TH (18)   → wiki/papers/<id>.md
    [MID, EXCELLENT_TH)   → private/sources-midgrade/<id>.md
    <  MID (12)           → pending-papers-v4.md
- Stage 6: 反向关联 — 给每个被高质量 paper 引用的 topic 页追加「近期相关研究」章节
"""
import urllib.request, xml.etree.ElementTree as ET
import json, csv, re, sys, time
import concurrent.futures as cf
from datetime import datetime, timedelta
from pathlib import Path
import fitz  # PyMuPDF

sys.stdout.reconfigure(line_buffering=True)

ROOT = Path(__file__).parent.parent
RAW_DIR = ROOT / "raw" / "papers"
WIKI_PAPERS = ROOT / "wiki" / "papers"
PRIVATE_MID = ROOT / "private" / "sources-midgrade"
INDEX_CSV = RAW_DIR / "_index.csv"
PENDING_MD = ROOT / "raw" / "benchmarks" / "pending-papers-v6.md"
TODAY = datetime.now().strftime("%Y-%m-%d")

DOWNLOAD_TARGET = 250  # v5 24/200 入库率 → 250 篇争取再 ~30 excellent
EXCELLENT_TH = 18
MID_TH = 12
YEARS_BACK = 2.5

# ═══════════════ Stage 1 ═══════════════
TITLE_STRONG = [r'\bbenchmark\b', r'\bevaluation\b', r'\bleaderboard\b',
                r'\bassessment\b', r'\bllm[- ]as[- ](a[- ])?judge\b',
                r'\bevaluating\b', r'\beval\b']
ABSTRACT_LLM = ['gpt-4', 'gpt-3', 'claude', 'gemini', 'llama', 'qwen',
                'mistral', 'deepseek', 'o1', 'o3', 'large language model', 'llm']
NEG_TOPICS = ['speech recognition', 'machine translation system',
              'image generation pipeline', 'video generation diffusion',
              'molecular dynamics', 'protein folding']

def meta_score(title: str, abstract: str) -> int:
    text = (title + " " + abstract).lower()
    score = 0
    if any(neg in text[:400] for neg in NEG_TOPICS): return 0
    title_l = title.lower()
    if any(re.search(p, title_l) for p in TITLE_STRONG): score += 3
    llm_hits = sum(1 for m in ABSTRACT_LLM if m in text)
    if llm_hits >= 3: score += 3
    elif llm_hits >= 1: score += 1
    if re.search(r'\bwe (introduce|present|propose|release|construct|build)\b.{0,80}\b(benchmark|dataset|eval)\b', text):
        score += 2
    return min(score, 8)


def fetch_arxiv(query: str, max_results: int = 100, start: int = 0) -> list:
    url = (f"https://export.arxiv.org/api/query?"
           f"search_query={query}&start={start}&max_results={max_results}"
           f"&sortBy=submittedDate&sortOrder=descending")
    ns = {"atom": "http://www.w3.org/2005/Atom"}
    root = None
    last_err = None
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=30) as r:
                root = ET.fromstring(r.read())
            last_err = None
            break
        except Exception as e:
            last_err = e
            if '429' in str(e) or 'timed out' in str(e).lower():
                wait = 15 * (attempt + 1)
                print(f"    限流，{wait}s 后重试 (attempt {attempt+1}/4)", flush=True)
                time.sleep(wait)
            else:
                break
    if root is None:
        print(f"  查询失败 [{query[:50]}]: {last_err}", flush=True)
        return []
    papers = []
    for e in root.findall("atom:entry", ns):
        raw_id = e.find("atom:id", ns).text.split("/abs/")[-1]
        pid = re.sub(r'v\d+$', '', raw_id).strip()
        cats = " ".join(c.get("term","") for c in e.findall("atom:category", ns))
        auths = [a.find("atom:name", ns).text for a in e.findall("atom:author", ns)]
        papers.append({
            "id": pid,
            "title": e.find("atom:title", ns).text.strip().replace("\n"," "),
            "abstract": e.find("atom:summary", ns).text.strip().replace("\n"," "),
            "published": e.find("atom:published", ns).text[:10],
            "authors": ", ".join(auths[:6]) + (" et al." if len(auths)>6 else ""),
            "categories": cats,
        })
    return papers


# ═══════════════ Stage 3 ═══════════════
def download_one(arxiv_id: str) -> tuple[str, bool]:
    dest = RAW_DIR / f"{arxiv_id}.pdf"
    if dest.exists() and dest.stat().st_size > 50_000:
        return arxiv_id, True
    url = f"https://arxiv.org/pdf/{arxiv_id}.pdf"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=90) as r:
            dest.write_bytes(r.read())
        return arxiv_id, True
    except Exception:
        return arxiv_id, False


def parallel_download(paper_ids: list, concurrency: int = 8) -> dict:
    results = {}
    done = 0
    total = len(paper_ids)
    with cf.ThreadPoolExecutor(max_workers=concurrency) as ex:
        futures = {ex.submit(download_one, pid): pid for pid in paper_ids}
        for fut in cf.as_completed(futures):
            pid, ok = fut.result()
            results[pid] = ok
            done += 1
            if done % 20 == 0 or done == total:
                succ = sum(1 for v in results.values() if v)
                print(f"  [{done}/{total}] 下载完成 ({succ} 成功)", flush=True)
    return results


# ═══════════════ Stage 4 ═══════════════
TOP_LABS_PATTERNS = [
    'openai', 'anthropic', 'google deepmind', 'google research', r'\bdeepmind\b',
    'meta ai', 'meta fair', r'\bfair labs\b', 'microsoft research',
    'apple machine learning', 'nvidia research',
]
STRONG_LABS_PATTERNS = [
    'stanford university', 'stanford ai', 'carnegie mellon', 'cmu',
    'uc berkeley', 'mit csail', 'mit eecs', 'princeton university',
    'allen institute', 'allenai', 'ai2 ', 'university of washington',
    'oxford', 'cambridge', 'tsinghua', 'peking university',
    'scale ai', 'hugging face', 'cohere',
]
LLM_NAMES = ['gpt-4o','gpt-4','gpt-3.5','o1','o3','claude-3','claude 3','claude-3.5',
             'gemini','llama-3','llama 3','llama-2','llama 2','qwen2','qwen-2',
             'mistral','mixtral','deepseek-v','deepseek-r','phi-3','phi-4',
             'falcon','yi-34b','yi-1.5','chatgpt','palm','bard']
EVAL_KEYWORDS = ['benchmark', 'evaluation', 'leaderboard', 'metric',
                 'accuracy', 'human evaluation', 'llm-as-a-judge',
                 'contamination', 'test set', 'human annotators']
VENUE_RE = [
    (r'\b(NeurIPS|Neural Information Processing Systems)\b', 5),
    (r'\b(ICML|International Conference on Machine Learning)\b', 5),
    (r'\b(ICLR|International Conference on Learning Representations)\b', 5),
    (r'\b(ACL|Association for Computational Linguistics)\b', 5),
    (r'\b(EMNLP)\b', 5),
    (r'\b(NAACL)\b', 4),
    (r'\b(AAAI)\b', 3),
    (r'\b(CVPR|ICCV|ECCV)\b', 4),
    (r'\b(Findings of)\b', 3),
]

def parse_pdf(pdf_path: Path) -> dict:
    try:
        doc = fitz.open(str(pdf_path))
    except Exception as e:
        return {"error": str(e)}
    page_count = doc.page_count
    head_text = ""
    for i in range(min(10, page_count)):
        head_text += doc[i].get_text()
    tail_text = ""
    for i in range(max(0, page_count - 3), page_count):
        tail_text += doc[i].get_text()
    doc.close()
    text = head_text + "\n" + tail_text
    text_lower = text.lower()
    front_page = head_text[:5000].lower()
    top_lab = any(re.search(p, front_page) for p in TOP_LABS_PATTERNS)
    strong_lab = any(re.search(p, front_page) for p in STRONG_LABS_PATTERNS)
    llms_found = list(set(m for m in LLM_NAMES if m in text_lower))
    eval_kw_hits = sum(text_lower.count(kw) for kw in EVAL_KEYWORDS)
    ref_section = tail_text
    ref_count = max(
        len(re.findall(r'\n\[\d+\]', ref_section)),
        len(re.findall(r'\n\d+\.\s+[A-Z][a-z]', ref_section)),
    )
    venue_bonus = 0
    for pat, bonus in VENUE_RE:
        if re.search(pat, head_text[:3000]):
            venue_bonus = max(venue_bonus, bonus)
    table_hits = len(re.findall(r'\bTable\s+\d+', head_text))
    has_quant = bool(re.search(r'\d+\.\d+\s*%', head_text)) and bool(re.search(r'accuracy|f1|recall|precision', text_lower[:8000]))
    return {
        "page_count": page_count, "top_lab": top_lab, "strong_lab": strong_lab,
        "llms_evaluated": llms_found, "eval_kw_hits": eval_kw_hits,
        "ref_count": ref_count, "venue_bonus": venue_bonus,
        "table_hits": table_hits, "has_quantitative": has_quant,
        "head_text": head_text[:15000],
    }


def quality_score(meta: int, pdf_signals: dict) -> tuple[int, str]:
    if "error" in pdf_signals:
        return meta, f"meta={meta} | PDF解析失败: {pdf_signals['error']}"
    score = meta
    if pdf_signals["top_lab"]: score += 6; lab = "T1"
    elif pdf_signals["strong_lab"]: score += 3; lab = "T2"
    else: lab = "—"
    n_llm = len(pdf_signals["llms_evaluated"])
    llm_score = min(3, n_llm); score += llm_score
    score += pdf_signals["venue_bonus"]
    if pdf_signals["eval_kw_hits"] >= 30: kw_score = 2
    elif pdf_signals["eval_kw_hits"] >= 10: kw_score = 1
    else: kw_score = 0
    score += kw_score
    rigor = 0
    if pdf_signals["ref_count"] >= 30: rigor += 1
    if pdf_signals["table_hits"] >= 3: rigor += 1
    if pdf_signals["has_quantitative"]: rigor += 1
    score += rigor
    if pdf_signals["page_count"] < 6: score -= 3
    breakdown = (f"meta={meta} lab={lab}({6 if pdf_signals['top_lab'] else 3 if pdf_signals['strong_lab'] else 0}) "
                 f"llms={n_llm}({llm_score}) venue={pdf_signals['venue_bonus']} "
                 f"kw={pdf_signals['eval_kw_hits']}({kw_score}) rigor={rigor} "
                 f"pages={pdf_signals['page_count']}")
    return score, breakdown


# ═══════════════ Stage 5: 写文件 ═══════════════
WIKI_KEYWORDS = {
    'llm-as-judge': ['llm-as-a-judge','llm as judge','model as judge','gpt as judge'],
    'benchmark-contamination': ['data contamination','test leakage','benchmark leakage'],
    'benchmark-saturation': ['saturation','ceiling effect'],
    'inference-time-scaling': ['test-time compute','inference scaling','chain-of-thought'],
    'multimodal-eval': ['multimodal','vision-language','visual question'],
    'agent-eval': ['agent','tool use','function call','web agent'],
    'process-reward-model': ['process reward','prm','step-level'],
    'safety-eval-landscape': ['safety','harmful','jailbreak','red team'],
    'MMLU': ['mmlu','massive multitask'],
    'HumanEval': ['humaneval','code generation benchmark'],
    'GSM8K': ['gsm8k','grade school math'],
    'MATH': ['math500','competition math'],
    'SWE-bench': ['swe-bench','software engineering benchmark'],
    'GPQA': ['gpqa','graduate-level qa'],
    'AIME': ['aime','american invitational'],
}
CLAIM_PATTERNS = [
    r'((?:achieves?|reaches?|obtains?|outperforms?)[^.]{0,80}\d+\.?\d*\s*%[^.]*\.)',
    r'(\d+\.?\d*\s*%[^.]{0,60}(?:accuracy|f1|score|improvement)[^.]*\.)',
    r'(we (?:introduce|present|propose)[^.]{0,100}benchmark[^.]*\.)',
    r'((?:state-of-the-art|sota)[^.]{0,80}\.)',
]

def extract_claims(head_text: str, abstract: str):
    text_lower = head_text.lower()
    claims = []
    for pat in CLAIM_PATTERNS:
        for m in re.finditer(pat, head_text, re.IGNORECASE):
            c = ' '.join(m.group(1).split()).strip()
            if 30 < len(c) < 220 and c not in claims: claims.append(c)
            if len(claims) >= 5: break
        if len(claims) >= 5: break
    related = []
    for slug, keywords in WIKI_KEYWORDS.items():
        if any(kw in text_lower[:8000] for kw in keywords): related.append(slug)
    related = related[:6]
    llms = list(dict.fromkeys(m for m in LLM_NAMES if m in text_lower))[:8]
    return claims, related, llms


def gen_paper_md(paper, score, breakdown, pdf_signals, paper_type="paper"):
    pid = paper["id"]
    title = paper["title"].replace('"', "'")
    authors = paper["authors"].replace('"', "'")
    pub = paper["published"]
    claims, related, llms = extract_claims(pdf_signals.get("head_text",""), paper["abstract"])
    claims_md = "\n".join(f"- {c} [REF: §Results]" for c in claims) if claims else "- 见论文实验章节 [REF: §4]"
    llms_md = "、".join(llms) if llms else "未明确"
    related_md = "\n".join(f"- [[{r}]]" for r in related) if related else "- [[benchmark-design]]"
    abstract_short = paper["abstract"][:500].replace('"', "'")
    # 提取 first author 单独标注
    first_author = authors.split(',')[0].strip()
    return f"""---
title: "{title}"
type: {paper_type}
publish: true
confidence: draft
as_of_date: "{TODAY}"
last_verified: "{TODAY}"
sources:
  - "https://arxiv.org/abs/{pid}"
arxiv_id: "{pid}"
authors: "{authors}"
first_author: "{first_author}"
year: {pub[:4]}
quality_score: {score}
score_breakdown: "{breakdown}"
pages: {pdf_signals.get('page_count', 0)}
domain:
  - benchmark-design
---

# {title}

> arXiv: [{pid}](https://arxiv.org/abs/{pid}) | {pub} | **第一作者**: {first_author} | 全部作者: {authors}

## 摘要

{abstract_short}{'...' if len(paper['abstract']) > 500 else ''}

## 核心 Claim

{claims_md}

## 评测的模型

{llms_md}

## 相关 Wiki 页面

{related_md}

## 评分明细

```
{breakdown}
total = {score}/25 (excellent_th={EXCELLENT_TH})
```
"""


def load_existing_ids() -> set:
    existing = set()
    if INDEX_CSV.exists():
        with open(INDEX_CSV) as f:
            for row in csv.DictReader(f):
                if row.get("id"): existing.add(row["id"])
    for f in WIKI_PAPERS.glob("*.md"): existing.add(f.stem)
    for f in PRIVATE_MID.glob("*.md") if PRIVATE_MID.exists() else []: existing.add(f.stem)
    return existing


def append_index(paper, score, status, source_page):
    header = not INDEX_CSV.exists() or INDEX_CSV.stat().st_size == 0
    with open(INDEX_CSV, "a", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["id","title","authors","year","added_at","status","source_page"])
        if header: w.writeheader()
        w.writerow({"id": paper["id"], "title": paper["title"][:80],
                    "authors": paper["authors"][:60], "year": paper["published"][:4],
                    "added_at": TODAY, "status": status, "source_page": source_page})


# ═══════════════ Stage 6: 反向关联 ═══════════════
def build_reverse_links(excellent_papers: list):
    """扫所有高质量 paper 的「相关 Wiki 页面」章节，反向写入 topic 页"""
    WIKI = ROOT / "wiki"
    slug_to_file = {}
    for md in WIKI.rglob('*.md'):
        if 'papers' in md.parts: continue
        if 'synthesis' in md.parts: continue
        slug_to_file[md.stem] = md

    reverse_map = {}  # slug -> [paper dict with id/score/title]
    for paper in excellent_papers:
        pid = paper["id"]
        f = WIKI_PAPERS / f"{pid}.md"
        if not f.exists(): continue
        txt = f.read_text()
        section = re.search(r'## 相关 Wiki 页面\s*\n(.+?)(?=\n##|\Z)', txt, re.DOTALL)
        if not section: continue
        for m in re.finditer(r'\[\[([^\]|#]+)', section.group(1)):
            slug = m.group(1).strip()
            if slug == 'benchmark-design': continue
            reverse_map.setdefault(slug, []).append({
                'id': pid, 'score': paper['_score'],
                'title': paper['title'].rstrip('"').rstrip(),
                'first_author': paper['authors'].split(',')[0].strip(),
            })

    updated = 0
    MARKER = '## 近期相关研究（arXiv 2026-05 自动入库）'
    for slug, papers in reverse_map.items():
        target = slug_to_file.get(slug)
        if not target: continue
        txt = target.read_text()
        # 移除旧 section（若存在）
        if MARKER in txt:
            idx = txt.find(MARKER)
            next_h = txt.find('\n## ', idx + len(MARKER))
            if next_h == -1: next_h = len(txt)
            txt = txt[:idx] + txt[next_h:]
            txt = txt.rstrip() + '\n'
        # 排序：按分数降序
        papers_sorted = sorted(papers, key=lambda x: -x['score'])
        lines = [f'\n{MARKER}\n',
                 f'> 以下为 ingest pipeline 筛出的高质量 LLM 评测论文（quality ≥{EXCELLENT_TH}/25），自动关联到本页主题。\n']
        for p in papers_sorted:
            author = p.get('first_author','')
            byline = f" · {author} 等" if author else ""
            lines.append(f"- [[{p['id']}|{p['title']}]]{byline} · score {p['score']}/25")
        target.write_text(txt.rstrip() + '\n' + '\n'.join(lines) + '\n')
        updated += 1
    return updated, reverse_map


# ═══════════════ MAIN ═══════════════
def main():
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    WIKI_PAPERS.mkdir(parents=True, exist_ok=True)
    PRIVATE_MID.mkdir(parents=True, exist_ok=True)
    PENDING_MD.parent.mkdir(parents=True, exist_ok=True)
    existing = load_existing_ids()
    cutoff = (datetime.now() - timedelta(days=int(YEARS_BACK * 365))).strftime("%Y-%m-%d")
    print(f"已入库: {len(existing)} 篇 | 目标下载: {DOWNLOAD_TARGET} 篇 | 时间窗: >= {cutoff}", flush=True)
    print(f"质量分流: <{MID_TH} pending  /  [{MID_TH},{EXCELLENT_TH}) midgrade  /  ≥{EXCELLENT_TH} wiki/papers/", flush=True)

    # ─── STAGE 1 ───
    # v6 策略：8 个针对前几轮覆盖不足主题的大查询
    print("\n══ Stage 1: arXiv 候选搜索（v6: 8 个新主题查询） ══", flush=True)
    queries = [
        "ti:code+AND+abs:benchmark+AND+abs:large+language+model",
        "ti:medical+AND+abs:benchmark+AND+abs:large+language+model",
        "ti:law+AND+abs:benchmark+AND+abs:large+language+model",
        "ti:reasoning+AND+abs:evaluation+AND+abs:large+language+model",
        "ti:robust+AND+abs:benchmark+AND+abs:large+language+model",
        "ti:bias+AND+abs:benchmark+AND+abs:large+language+model",
        "ti:scientific+AND+abs:benchmark+AND+abs:large+language+model",
        "ti:instruction+AND+abs:benchmark+AND+abs:large+language+model",
    ]
    all_papers = {}
    for q in queries:
        print(f"  查询: {q[:60]}", flush=True)
        results = fetch_arxiv(q, max_results=300, start=0)
        new = 0
        for p in results:
            if p["id"] not in all_papers and p["id"] not in existing:
                if p.get("published","") >= cutoff:
                    all_papers[p["id"]] = p
                    new += 1
        print(f"    返回 {len(results)} | 新增 {new} | 累计 {len(all_papers)}", flush=True)
        time.sleep(10)  # 每查询间 10s，比之前严格

    print(f"\n候选总数（去重 + 已入库过滤 + 时间窗）: {len(all_papers)}", flush=True)

    # ─── STAGE 2 ───
    print("\n══ Stage 2: 元数据预筛选 ══", flush=True)
    for p in all_papers.values():
        p["meta_score"] = meta_score(p["title"], p["abstract"])
    sorted_papers = sorted(all_papers.values(), key=lambda x: x["meta_score"], reverse=True)
    top = [p for p in sorted_papers if p["meta_score"] >= 4][:DOWNLOAD_TARGET]
    if top:
        print(f"meta≥4 取前 {len(top)}（meta max={top[0]['meta_score']} min={top[-1]['meta_score']}）", flush=True)
    else:
        print("⚠ 无符合条件的候选，退出"); return

    # ─── STAGE 3 ───
    print(f"\n══ Stage 3: 并发下载 {len(top)} 篇 PDF（8 并发） ══", flush=True)
    paper_ids = [p["id"] for p in top]
    dl_result = parallel_download(paper_ids, concurrency=8)
    ok_papers = [p for p in top if dl_result.get(p["id"])]
    print(f"  下载成功: {len(ok_papers)}/{len(top)}", flush=True)

    # ─── STAGE 4 ───
    print(f"\n══ Stage 4: PDF 解析 + 质量评估 ══", flush=True)
    excellent, mid, pending = [], [], []
    for i, paper in enumerate(ok_papers):
        pid = paper["id"]
        pdf = RAW_DIR / f"{pid}.pdf"
        signals = parse_pdf(pdf)
        total, breakdown = quality_score(paper["meta_score"], signals)
        paper["_score"] = total
        paper["_breakdown"] = breakdown
        paper["_pdf"] = signals
        if total >= EXCELLENT_TH: bucket = "✓ EXC"; excellent.append(paper)
        elif total >= MID_TH:     bucket = "· MID"; mid.append(paper)
        else:                     bucket = "✗ PEN"; pending.append(paper)
        if (i+1) % 25 == 0 or i+1 == len(ok_papers):
            print(f"  [{i+1:03d}/{len(ok_papers)}] {bucket} score={total:2d} | {paper['title'][:55]}", flush=True)

    # ─── STAGE 5: 分流写文件 ───
    print(f"\n══ Stage 5: 分流写文件 ══", flush=True)
    print(f"  ≥{EXCELLENT_TH} (excellent) → wiki/papers/  : {len(excellent)}", flush=True)
    print(f"  [{MID_TH},{EXCELLENT_TH}) (mid) → private/    : {len(mid)}", flush=True)
    print(f"  <{MID_TH} (pending)    → pending.md      : {len(pending)}", flush=True)

    for p in excellent:
        f = WIKI_PAPERS / f"{p['id']}.md"
        f.write_text(gen_paper_md(p, p["_score"], p["_breakdown"], p["_pdf"], "paper"))
        append_index(p, p["_score"], "imported", f"wiki/papers/{p['id']}.md")
    for p in mid:
        f = PRIVATE_MID / f"{p['id']}.md"
        f.write_text(gen_paper_md(p, p["_score"], p["_breakdown"], p["_pdf"], "paper"))
        append_index(p, p["_score"], "demoted", f"private/sources-midgrade/{p['id']}.md")

    pending.sort(key=lambda x: -x["_score"])
    lines = [f"# v4 待确认论文（< {MID_TH} 分）\n",
             f"> 生成 {TODAY} | 共 {len(pending)} 篇\n\n",
             "| # | arXiv | 分数 | 标题 |\n|---|-------|------|------|\n"]
    for i, p in enumerate(pending[:200], 1):
        lines.append(f"| {i} | [{p['id']}](https://arxiv.org/abs/{p['id']}) | {p['_score']}/25 | {p['title'][:60]} |\n")
        append_index(p, p["_score"], "pending", "")
    PENDING_MD.write_text("".join(lines))

    # ─── STAGE 6: 反向关联 ───
    print(f"\n══ Stage 6: 反向关联到 topic 页 ══", flush=True)
    n_updated, rmap = build_reverse_links(excellent)
    print(f"  更新 {n_updated} 个 topic 页面", flush=True)
    for slug, papers in sorted(rmap.items(), key=lambda x: -len(x[1])):
        print(f"    {slug:30s} ← {len(papers)} 篇引用", flush=True)

    # ─── 总结 ───
    print(f"\n{'='*70}", flush=True)
    print(f"✅ excellent (wiki/papers/) : {len(excellent)} 篇", flush=True)
    print(f"📦 mid (private)           : {len(mid)} 篇", flush=True)
    print(f"📋 pending                  : {len(pending)} 篇", flush=True)
    print(f"🔗 反向关联 topic 页        : {n_updated} 个", flush=True)
    print(f"📦 PDF 总库                 : {len(list(RAW_DIR.glob('*.pdf')))} 篇", flush=True)
    if excellent:
        scores = sorted([p["_score"] for p in excellent])
        print(f"   excellent 分数范围      : {scores[0]}-{scores[-1]}  中位 {scores[len(scores)//2]}", flush=True)


if __name__ == "__main__":
    main()
