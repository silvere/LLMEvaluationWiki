#!/usr/bin/env python3
"""
arXiv LLM Evaluation Paper Ingest v3 — 本地 PDF 解析评估，无外部 API 依赖
- Stage 1: 严格 arXiv 查询 → 200+ 候选 → 元数据筛选 → top 100
- Stage 2: 并发下载 100 篇 PDF
- Stage 3: 本地 PDF 全文解析做质量评估
- Stage 4: 高质量论文（score≥ THRESHOLD）导入 wiki/sources/，低质量列入 pending
"""
import urllib.request, urllib.parse, xml.etree.ElementTree as ET
import json, os, csv, re, sys, time
import concurrent.futures as cf
from datetime import datetime, timedelta
from pathlib import Path
import fitz  # PyMuPDF

# 关键：行缓冲，让输出实时可见
sys.stdout.reconfigure(line_buffering=True)

ROOT = Path(__file__).parent.parent
RAW_DIR = ROOT / "raw" / "papers"
WIKI_SOURCES = ROOT / "wiki" / "papers"
INDEX_CSV = RAW_DIR / "_index.csv"
PENDING_MD = ROOT / "raw" / "benchmarks" / "pending-papers-v3.md"
TODAY = datetime.now().strftime("%Y-%m-%d")

DOWNLOAD_TARGET = 100
QUALITY_THRESHOLD = 12  # 满分 25，≥12 导入

# ══════════════════════════════════════════════════════
# 元数据筛选（Stage 1）
# ══════════════════════════════════════════════════════
TITLE_STRONG = [r'\bbenchmark\b', r'\bevaluation\b', r'\bleaderboard\b',
                r'\bassessment\b', r'\bllm[- ]as[- ](a[- ])?judge\b']
ABSTRACT_LLM = ['gpt-4', 'gpt-3', 'claude', 'gemini', 'llama', 'qwen',
                'mistral', 'deepseek', 'o1', 'o3', 'large language model', 'llm']
NEG_TOPICS = ['speech recognition', 'machine translation system',
              'image generation', 'video generation', 'text-to-image',
              'molecular dynamics']

def meta_score(title: str, abstract: str) -> int:
    """元数据筛选分（0-8），用于决定哪些下载 PDF"""
    text = (title + " " + abstract).lower()
    score = 0
    # 负向：明显不是 LLM 评测主题
    if any(neg in text[:400] for neg in NEG_TOPICS):
        return 0
    # 标题命中评测关键词 +3
    title_l = title.lower()
    if any(re.search(p, title_l) for p in TITLE_STRONG):
        score += 3
    # abstract 提及 ≥2 个 LLM 名字 +2
    llm_hits = sum(1 for m in ABSTRACT_LLM if m in text)
    if llm_hits >= 3: score += 3
    elif llm_hits >= 1: score += 1
    # we introduce/propose benchmark +2
    if re.search(r'\bwe (introduce|present|propose|release|construct|build)\b.{0,80}\b(benchmark|dataset|eval)\b', text):
        score += 2
    return min(score, 8)


# ══════════════════════════════════════════════════════
# arXiv 查询（Stage 1）
# ══════════════════════════════════════════════════════
def fetch_arxiv(query: str, max_results: int = 100) -> list:
    url = (f"https://export.arxiv.org/api/query?"
           f"search_query={query}&start=0&max_results={max_results}"
           f"&sortBy=submittedDate&sortOrder=descending")
    ns = {"atom": "http://www.w3.org/2005/Atom"}
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as r:
            root = ET.fromstring(r.read())
    except Exception as e:
        print(f"  查询失败 [{query[:50]}]: {e}", flush=True)
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


# ══════════════════════════════════════════════════════
# PDF 并发下载（Stage 2）
# ══════════════════════════════════════════════════════
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
    except Exception as e:
        return arxiv_id, False


def parallel_download(paper_ids: list, concurrency: int = 6) -> dict:
    """并发下载，返回 {arxiv_id: success_bool}"""
    results = {}
    done = 0
    total = len(paper_ids)
    with cf.ThreadPoolExecutor(max_workers=concurrency) as ex:
        futures = {ex.submit(download_one, pid): pid for pid in paper_ids}
        for fut in cf.as_completed(futures):
            pid, ok = fut.result()
            results[pid] = ok
            done += 1
            if done % 10 == 0 or done == total:
                succ = sum(1 for v in results.values() if v)
                print(f"  [{done}/{total}] 下载完成 ({succ} 成功)", flush=True)
    return results


# ══════════════════════════════════════════════════════
# PDF 解析 + 质量评估（Stage 3）
# ══════════════════════════════════════════════════════
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
    """解析 PDF，提取质量信号"""
    try:
        doc = fitz.open(str(pdf_path))
    except Exception as e:
        return {"error": str(e)}

    page_count = doc.page_count
    # 读前 10 页 + 最后 3 页（references 在末尾）
    head_text = ""
    for i in range(min(10, page_count)):
        head_text += doc[i].get_text()
    tail_text = ""
    for i in range(max(0, page_count - 3), page_count):
        tail_text += doc[i].get_text()
    doc.close()

    text = head_text + "\n" + tail_text
    text_lower = text.lower()
    head_lower = head_text.lower()

    # 信号 1: 顶级机构（在前 2 页 acknowledgment / author block）
    front_page = head_text[:5000].lower()
    top_lab = any(re.search(p, front_page) for p in TOP_LABS_PATTERNS)
    strong_lab = any(re.search(p, front_page) for p in STRONG_LABS_PATTERNS)

    # 信号 2: 评测的 LLM 多样性
    llms_found = list(set(m for m in LLM_NAMES if m in text_lower))

    # 信号 3: 评测关键词密度
    eval_kw_hits = sum(text_lower.count(kw) for kw in EVAL_KEYWORDS)

    # 信号 4: 引用文献数（references 章节后的 [N] 或 N. 行）
    ref_section = tail_text
    ref_count = max(
        len(re.findall(r'\n\[\d+\]', ref_section)),
        len(re.findall(r'\n\d+\.\s+[A-Z][a-z]', ref_section)),
    )

    # 信号 5: venue（页脚 / 标题区）
    venue_bonus = 0
    for pat, bonus in VENUE_RE:
        if re.search(pat, head_text[:3000]):
            venue_bonus = max(venue_bonus, bonus)

    # 信号 6: 实验表格数（评测论文一般有多个 metric 表）
    table_hits = len(re.findall(r'\bTable\s+\d+', head_text))

    # 信号 7: 是否有定量结果（百分比、accuracy 等）
    has_quant = bool(re.search(r'\d+\.\d+\s*%', head_text)) and bool(re.search(r'accuracy|f1|recall|precision', text_lower[:8000]))

    return {
        "page_count": page_count,
        "top_lab": top_lab,
        "strong_lab": strong_lab,
        "llms_evaluated": llms_found,
        "eval_kw_hits": eval_kw_hits,
        "ref_count": ref_count,
        "venue_bonus": venue_bonus,
        "table_hits": table_hits,
        "has_quantitative": has_quant,
        "head_text": head_text[:15000],  # 留给后续 extract claim 用
    }


def quality_score(meta: int, pdf_signals: dict) -> tuple[int, str]:
    """综合质量分（满分 ~25）。返回 (total, breakdown)"""
    if "error" in pdf_signals:
        return meta, f"meta={meta} | PDF解析失败: {pdf_signals['error']}"

    score = meta  # 0-8

    # 机构权重（0-6）
    if pdf_signals["top_lab"]:
        score += 6
        lab = "T1"
    elif pdf_signals["strong_lab"]:
        score += 3
        lab = "T2"
    else:
        score += 0
        lab = "—"

    # LLM 多样性（0-3）
    n_llm = len(pdf_signals["llms_evaluated"])
    llm_score = min(3, n_llm)
    score += llm_score

    # venue（0-5）
    score += pdf_signals["venue_bonus"]

    # 评测关键词密度（0-2）
    if pdf_signals["eval_kw_hits"] >= 30: kw_score = 2
    elif pdf_signals["eval_kw_hits"] >= 10: kw_score = 1
    else: kw_score = 0
    score += kw_score

    # 引用 + 表格 + 定量结果（0-3）
    rigor = 0
    if pdf_signals["ref_count"] >= 30: rigor += 1
    if pdf_signals["table_hits"] >= 3: rigor += 1
    if pdf_signals["has_quantitative"]: rigor += 1
    score += rigor

    # 页数惩罚（短于 6 页扣分）
    if pdf_signals["page_count"] < 6:
        score -= 3

    breakdown = (f"meta={meta} lab={lab}({6 if pdf_signals['top_lab'] else 3 if pdf_signals['strong_lab'] else 0}) "
                 f"llms={n_llm}({llm_score}) venue={pdf_signals['venue_bonus']} "
                 f"kw={pdf_signals['eval_kw_hits']}({kw_score}) rigor={rigor} "
                 f"pages={pdf_signals['page_count']}")
    return score, breakdown


# ══════════════════════════════════════════════════════
# Wiki source 生成（Stage 4）
# ══════════════════════════════════════════════════════
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

def extract_claims(head_text: str, abstract: str) -> tuple[list, list, list]:
    """从 PDF 头部+摘要提取 claims / related wiki / 已评测 LLM"""
    text_lower = head_text.lower()
    # claims
    claims = []
    for pat in CLAIM_PATTERNS:
        for m in re.finditer(pat, head_text, re.IGNORECASE):
            c = ' '.join(m.group(1).split()).strip()
            if 30 < len(c) < 220 and c not in claims:
                claims.append(c)
            if len(claims) >= 5: break
        if len(claims) >= 5: break
    # 关联 wiki
    related = []
    for slug, keywords in WIKI_KEYWORDS.items():
        if any(kw in text_lower[:8000] for kw in keywords):
            related.append(slug)
    related = related[:6]
    # 评测的 LLM
    llms = list(dict.fromkeys(m for m in LLM_NAMES if m in text_lower))[:8]
    return claims, related, llms


def gen_wiki_source(paper: dict, score: int, breakdown: str,
                    pdf_signals: dict) -> str:
    pid = paper["id"]
    title = paper["title"].replace('"', "'")
    authors = paper["authors"].replace('"', "'")
    pub = paper["published"]
    claims, related, llms = extract_claims(
        pdf_signals.get("head_text", ""), paper["abstract"])

    claims_md = "\n".join(f"- {c} [REF: §Results]" for c in claims) if claims \
                else "- 见论文实验章节 [REF: §4]"
    llms_md = "、".join(llms) if llms else "未明确（请阅读全文确认）"
    related_md = "\n".join(f"- [[{r}]]" for r in related) if related \
                 else "- [[benchmark-design]]"
    abstract_short = paper["abstract"][:500].replace('"', "'")

    return f"""---
title: "{title}"
type: paper
publish: true
confidence: draft
as_of_date: "{TODAY}"
last_verified: "{TODAY}"
sources:
  - "https://arxiv.org/abs/{pid}"
arxiv_id: "{pid}"
authors: "{authors}"
year: {pub[:4]}
quality_score: {score}
score_breakdown: "{breakdown}"
pages: {pdf_signals.get('page_count', 0)}
domain:
  - benchmark-design
---

# {title}

> arXiv: [{pid}](https://arxiv.org/abs/{pid}) | {pub} | {authors}

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
total = {score}/25 (threshold = {QUALITY_THRESHOLD})
```
"""


# ══════════════════════════════════════════════════════
# 辅助
# ══════════════════════════════════════════════════════
def load_existing_ids() -> set:
    existing = set()
    if INDEX_CSV.exists():
        with open(INDEX_CSV) as f:
            for row in csv.DictReader(f):
                if row.get("id"): existing.add(row["id"])
    for f in WIKI_SOURCES.glob("*.md"):
        existing.add(f.stem)
    return existing


def append_index(paper, score, status, source_page):
    header = not INDEX_CSV.exists() or INDEX_CSV.stat().st_size == 0
    with open(INDEX_CSV, "a", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["id","title","authors","year","added_at","status","source_page"])
        if header: w.writeheader()
        w.writerow({"id": paper["id"], "title": paper["title"][:80],
                    "authors": paper["authors"][:60], "year": paper["published"][:4],
                    "added_at": TODAY, "status": status, "source_page": source_page})


# ══════════════════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════════════════
def main():
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    WIKI_SOURCES.mkdir(parents=True, exist_ok=True)
    PENDING_MD.parent.mkdir(parents=True, exist_ok=True)
    existing = load_existing_ids()
    one_year_ago = (datetime.now() - timedelta(days=365)).strftime("%Y-%m-%d")
    print(f"已入库: {len(existing)} 篇 | 目标下载: {DOWNLOAD_TARGET} 篇 | 质量阈值: {QUALITY_THRESHOLD}/25", flush=True)

    # ─── STAGE 1: 多查询搜出候选 ────────────────────────
    print("\n══ Stage 1: arXiv 候选搜索 ══", flush=True)
    queries = [
        # 标题直接评测/benchmark + abstract 含 LLM
        "ti:benchmark+AND+abs:large+language+model",
        "ti:evaluation+AND+abs:gpt",
        "ti:evaluation+AND+abs:llm",
        "ti:leaderboard+AND+abs:language+model",
        "ti:benchmark+AND+abs:gpt-4",
        "ti:benchmark+AND+abs:claude",
        "ti:assess+AND+abs:large+language",
        "abs:llm-as-a-judge",
        "ti:reasoning+AND+ti:benchmark+AND+abs:llm",
        "ti:multimodal+AND+ti:benchmark+AND+abs:evaluation",
        "ti:agent+AND+ti:benchmark+AND+abs:llm",
        "ti:code+AND+ti:benchmark+AND+abs:large+language",
        "ti:contamination+AND+abs:benchmark",
        "ti:long+context+AND+abs:benchmark",
    ]
    all_papers = {}
    for q in queries:
        print(f"  查询: {q[:60]}", flush=True)
        results = fetch_arxiv(q, max_results=80)
        new_count = 0
        for p in results:
            if p["id"] not in all_papers and p["id"] not in existing:
                if p.get("published", "") >= one_year_ago:
                    all_papers[p["id"]] = p
                    new_count += 1
        print(f"    → 获得 {len(results)} 篇，新增 {new_count}", flush=True)
        time.sleep(2)

    print(f"\n候选去重: {len(all_papers)} 篇", flush=True)

    # ─── STAGE 2: 元数据筛选 → top 100 ─────────────────
    print("\n══ Stage 2: 元数据预筛选 ══", flush=True)
    for p in all_papers.values():
        p["meta_score"] = meta_score(p["title"], p["abstract"])
    sorted_papers = sorted(all_papers.values(), key=lambda x: x["meta_score"], reverse=True)
    top_candidates = [p for p in sorted_papers if p["meta_score"] >= 4][:DOWNLOAD_TARGET]
    print(f"meta≥4 取前 {len(top_candidates)}（meta 分布: max={top_candidates[0]['meta_score']} min={top_candidates[-1]['meta_score']}）", flush=True)

    # ─── STAGE 3: 并发下载 PDF ─────────────────────────
    print(f"\n══ Stage 3: 并发下载 {len(top_candidates)} 篇 PDF（6 并发） ══", flush=True)
    paper_ids = [p["id"] for p in top_candidates]
    dl_result = parallel_download(paper_ids, concurrency=6)
    successful = [p for p in top_candidates if dl_result.get(p["id"])]
    print(f"  下载成功: {len(successful)}/{len(top_candidates)}", flush=True)

    # ─── STAGE 4: PDF 解析 + 质量评估 ─────────────────
    print(f"\n══ Stage 4: PDF 解析 + 质量评估 ══", flush=True)
    excellent, pending = [], []
    for i, paper in enumerate(successful):
        pid = paper["id"]
        pdf_path = RAW_DIR / f"{pid}.pdf"
        pdf_signals = parse_pdf(pdf_path)
        total, breakdown = quality_score(paper["meta_score"], pdf_signals)
        paper["_score"] = total
        paper["_breakdown"] = breakdown
        paper["_pdf"] = pdf_signals
        flag = "✓" if total >= QUALITY_THRESHOLD else "·"
        print(f"  [{i+1:03d}/{len(successful)}] {flag} score={total:2d} | {paper['title'][:60]}", flush=True)
        if total >= QUALITY_THRESHOLD:
            excellent.append(paper)
        else:
            pending.append(paper)

    # ─── STAGE 5: 导入 wiki/sources/ ───────────────────
    print(f"\n══ Stage 5: 导入 wiki/sources/ ══", flush=True)
    excellent.sort(key=lambda x: x["_score"], reverse=True)
    for paper in excellent:
        pid = paper["id"]
        f = WIKI_SOURCES / f"{pid}.md"
        f.write_text(gen_wiki_source(paper, paper["_score"], paper["_breakdown"], paper["_pdf"]))
        append_index(paper, paper["_score"], "imported", f"wiki/sources/{pid}.md")
    print(f"  → 导入 {len(excellent)} 篇", flush=True)

    # ─── 待确认列表 ────────────────────────────────────
    pending.sort(key=lambda x: x["_score"], reverse=True)
    lines = [
        f"# arXiv 待确认论文列表（v3）\n",
        f"> 生成时间：{TODAY} | 候选 {len(all_papers)} | 下载 {len(successful)} | "
        f"优秀 {len(excellent)} | 待审 {len(pending)}\n\n",
        "| # | arXiv | 分数 | 标题 | 年份 |\n",
        "|---|-------|------|------|------|\n",
    ]
    for i, p in enumerate(pending[:80], 1):
        lines.append(
            f"| {i} | [{p['id']}](https://arxiv.org/abs/{p['id']}) "
            f"| {p['_score']}/25 | {p['title'][:65]} | {p['published'][:4]} |\n"
        )
        append_index(p, p["_score"], "pending", "")
    PENDING_MD.write_text("".join(lines))

    # ─── 总结 ────────────────────────────────────────
    print(f"\n{'='*65}", flush=True)
    print(f"✅ 高质量论文导入: {len(excellent)} 篇 → wiki/sources/", flush=True)
    print(f"📋 待确认列表: {len(pending)} 篇 → {PENDING_MD}", flush=True)
    print(f"📦 PDF 总数: {len(list(RAW_DIR.glob('*.pdf')))} 篇 → {RAW_DIR}", flush=True)
    if excellent:
        scores = [p["_score"] for p in excellent]
        print(f"   分数范围: {min(scores)}-{max(scores)} | 中位: {sorted(scores)[len(scores)//2]}", flush=True)


if __name__ == "__main__":
    main()
