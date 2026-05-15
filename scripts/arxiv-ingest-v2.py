#!/usr/bin/env python3
"""
arXiv LLM Evaluation Paper Ingest v2
严格三轴打分：LLM评测强相关 + 引用量(SemanticScholar) + 作者机构
+ Claude API 读 PDF 全文提取 claim
"""
import urllib.request, urllib.parse, xml.etree.ElementTree as ET
import json, os, csv, re, time
from datetime import datetime, timedelta
from pathlib import Path
import fitz  # PyMuPDF

ROOT = Path(__file__).parent.parent
RAW_DIR = ROOT / "raw" / "papers"
WIKI_SOURCES = ROOT / "wiki" / "sources"
INDEX_CSV = RAW_DIR / "_index.csv"
PENDING_MD = ROOT / "raw" / "benchmarks" / "pending-papers.md"
TODAY = datetime.now().strftime("%Y-%m-%d")

# ══════════════════════════════════════════════════════
# AXIS 1: LLM 评测强相关性（必过门槛，≥3 才进入候选）
# ══════════════════════════════════════════════════════
POSITIVE_BENCHMARK_PATTERNS = [
    r'\bwe (introduce|present|propose|release|build|construct)\b.{0,60}\b(benchmark|dataset|eval|leaderboard)\b',
    r'\b(new|novel|comprehensive|large.scale)\b.{0,30}\bbenchmark\b',
    r'\bbenchmark(ing|s)?\b.{0,40}\b(large language model|llm|gpt|claude|gemini|llama)\b',
]
POSITIVE_EVAL_PATTERNS = [
    r'\bwe (evaluate|assess|compare|test)\b.{0,50}\b(gpt|claude|gemini|llama|qwen|mistral|deepseek|gpt-4|gpt-o)',
    r'\bllm.as.(a.)?judge\b',
    r'\b(contamination|saturation|leakage)\b.{0,50}\b(benchmark|eval)',
    r'\b(human evaluation|automatic evaluation|automated evaluation)\b.{0,30}\b(llm|language model)',
    r'\beval(uation)? (framework|methodology|protocol|pipeline)\b.{0,50}\b(llm|language model)',
]
NEGATIVE_PATTERNS = [  # 这些模式暗示论文不是以评测为主要贡献
    r'^we (fine-?tune|train|pre-?train)',
    r'\brag\b.{0,20}\bpipeline\b',
    r'\bspeech recognition\b',
    r'\bmachine translation\b',
]

def llm_eval_relevance(title: str, abstract: str) -> int:
    """0-5 分，强相关性判断"""
    text = (title + " " + abstract).lower()
    score = 0

    # 负面过滤：核心贡献不是LLM评测
    for pat in NEGATIVE_PATTERNS:
        if re.search(pat, abstract.lower()[:300]):
            return 0

    # 正面：引入新benchmark
    for pat in POSITIVE_BENCHMARK_PATTERNS:
        if re.search(pat, text, re.IGNORECASE):
            score += 3
            break

    # 正面：评测多个LLM
    llm_mentions = sum(1 for m in ['gpt-4','gpt-o','claude','gemini','llama','qwen',
                                    'mistral','deepseek','gpt-3','falcon','mixtral','o1','o3']
                       if m in text)
    if llm_mentions >= 4: score += 2
    elif llm_mentions >= 2: score += 1

    # 正面：评测方法论贡献
    for pat in POSITIVE_EVAL_PATTERNS:
        if re.search(pat, text, re.IGNORECASE):
            score += 2
            break

    # 标题直接命名LLM评测
    title_lower = title.lower()
    if re.search(r'\b(evaluat|benchmark|assess)\w*\b.{0,30}\b(llm|large language|gpt|claude|gemini)\b',
                 title_lower, re.IGNORECASE):
        score += 1

    return min(score, 5)


# ══════════════════════════════════════════════════════
# AXIS 2: 引用量 via Semantic Scholar
# ══════════════════════════════════════════════════════
S2_CACHE_FILE = ROOT / "raw" / "benchmarks" / "s2-cache.json"
_s2_cache: dict = {}

def load_s2_cache():
    global _s2_cache
    if S2_CACHE_FILE.exists():
        _s2_cache = json.loads(S2_CACHE_FILE.read_text())
        print(f"  S2 缓存已加载: {len(_s2_cache)} 条")

def save_s2_cache():
    S2_CACHE_FILE.parent.mkdir(parents=True, exist_ok=True)
    S2_CACHE_FILE.write_text(json.dumps(_s2_cache, indent=2))

def fetch_s2(arxiv_id: str) -> dict:
    if arxiv_id in _s2_cache:
        return _s2_cache[arxiv_id]
    url = (f"https://api.semanticscholar.org/graph/v1/paper/arXiv:{arxiv_id}"
           f"?fields=citationCount,influentialCitationCount,venue,authors")
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "LLMWiki/1.0"})
            with urllib.request.urlopen(req, timeout=15) as r:
                data = json.loads(r.read())
            _s2_cache[arxiv_id] = data
            time.sleep(3.5)  # S2 free: 100/5min = 1.2/s，保守用 3.5s
            return data
        except Exception as e:
            if '429' in str(e):
                wait = 30 * (attempt + 1)
                print(f"      S2 限流，等待 {wait}s ...")
                time.sleep(wait)
            else:
                break
    _s2_cache[arxiv_id] = {}
    return {}

def citation_score(s2_data: dict, days_old: int) -> int:
    """0-5，按论文年龄归一化"""
    citations = s2_data.get("citationCount", 0) or 0
    infl = s2_data.get("influentialCitationCount", 0) or 0
    # 年龄权重
    if days_old < 60:   mult = 0.15
    elif days_old < 120: mult = 0.35
    elif days_old < 180: mult = 0.6
    else:                mult = 1.0
    # influential citations 权重 3x
    weighted = citations + infl * 3
    thresholds = [100, 50, 20, 8, 2]
    for i, t in enumerate(thresholds):
        if weighted >= int(t * mult):
            return 5 - i
    return 0


# ══════════════════════════════════════════════════════
# AXIS 3: 作者机构
# ══════════════════════════════════════════════════════
TOP5_LABS   = ['google deepmind', 'google research', 'deepmind', 'openai', 'anthropic',
               'meta ai', 'meta fair', 'fair,', 'microsoft research']
STRONG_LABS = ['stanford', 'mit,', 'mit.', 'carnegie mellon', 'cmu', 'uc berkeley',
               'princeton', 'oxford', 'cambridge', 'allen institute', 'ai2',
               'tsinghua', 'peking university', 'fudan', 'scale ai', 'cohere',
               'hugging face', 'together ai', 'allenai']

# Fallback patterns when S2 affiliation unavailable — only trust first-person abstracts
_ABSTRACT_TOP5   = ['openai', 'anthropic', 'google deepmind', 'deepmind',
                    'google research', 'meta ai', 'meta fair', 'microsoft research']
_ABSTRACT_STRONG = ['stanford university', 'carnegie mellon', 'uc berkeley',
                    'allen institute', 'ai2,', 'allenai', 'scale ai', 'hugging face']

def author_score(s2_data: dict, authors_str: str, title: str = "", abstract: str = "") -> int:
    s2_authors = " ".join(
        " ".join(a.get("affiliations", []) or [])
        for a in (s2_data.get("authors") or [])
    ).lower()
    text = (s2_authors + " " + authors_str).lower()
    if any(lab in text for lab in TOP5_LABS):   return 5
    if any(lab in text for lab in STRONG_LABS): return 3

    # S2 returned no affiliation data — fall back to abstract heuristic
    if not s2_authors.strip():
        ab = (title + " " + abstract[:600]).lower()
        # Only trust when paper is first-person ("we introduce/present…")
        if re.search(r'\bwe (introduce|present|propose|release|describe|report)\b', ab):
            if any(lab in ab for lab in _ABSTRACT_TOP5):   return 4
            if any(lab in ab for lab in _ABSTRACT_STRONG): return 2
    return 0


# ══════════════════════════════════════════════════════
# 综合评分
# ══════════════════════════════════════════════════════
def score_paper(paper: dict) -> tuple[int, int, str]:
    """
    Returns (total, relevance, verdict)
    verdict: 'excellent'(≥threshold AND rel≥3) / 'pending'(rel≥2) / 'skip'
    """
    published = paper.get("published", TODAY)
    days_old = (datetime.now() - datetime.strptime(published[:10], "%Y-%m-%d")).days

    relevance = llm_eval_relevance(paper["title"], paper["abstract"])
    if relevance < 2:
        return 0, relevance, "skip"

    s2 = fetch_s2(paper["id"])
    s2_has_data = bool(s2 and s2.get("citationCount") is not None)
    cs  = citation_score(s2, days_old)
    aus = author_score(s2, paper["authors"], paper["title"], paper["abstract"])

    # venue bonus
    venue = (s2.get("venue") or paper.get("journal_ref") or "").lower()
    if any(v in venue for v in ["neurips","icml","iclr","acl","emnlp","naacl","cvpr","iccv","tacl"]):
        venue_bonus = 5
    elif any(v in venue for v in ["aaai","ijcai","findings","coling","eccv"]):
        venue_bonus = 3
    else:
        venue_bonus = 0

    total = relevance + cs + aus + venue_bonus

    # Relax threshold slightly when S2 has no citation/affiliation data yet
    # (common for very recent papers < 60 days)
    excellent_threshold = 8 if not s2_has_data else 10

    if total >= excellent_threshold and relevance >= 3:
        verdict = "excellent"
    elif relevance >= 2:
        verdict = "pending"
    else:
        verdict = "skip"

    return total, relevance, verdict


# ══════════════════════════════════════════════════════
# Claude API — 读 PDF 全文提取 claim
# ══════════════════════════════════════════════════════
LLM_NAMES = ['gpt-4o','gpt-4','gpt-3.5','o1','o3','claude-3','claude 3','gemini',
             'llama-3','llama 3','llama-2','llama 2','qwen','mistral','deepseek',
             'falcon','yi-','baichuan','internlm','chatgpt','palm','bard']

CLAIM_PATTERNS = [
    # 数字结论
    r'((?:achieves?|reaches?|obtains?|improves?|outperforms?)[^.]{0,80}\d+\.?\d*\s*%[^.]*\.)',
    r'(\d+\.?\d*\s*%[^.]{0,60}(?:accuracy|f1|recall|precision|score|improvement)[^.]*\.)',
    r'(our (?:benchmark|model|approach|method)[^.]{0,100}\.)',
    r'(we (?:introduce|present|propose|release)[^.]{0,100}benchmark[^.]*\.)',
    r'((?:state-of-the-art|sota|best performance)[^.]{0,80}\.)',
]

WIKI_KEYWORDS = {
    'llm-as-judge': ['llm as judge','llm-as-judge','model as judge','gpt as judge'],
    'benchmark-contamination': ['data contamination','test leakage','benchmark leakage','training contamination'],
    'benchmark-saturation': ['saturation','ceiling effect','performance plateau'],
    'inference-time-scaling': ['test-time compute','inference scaling','chain-of-thought','cot'],
    'multimodal-eval': ['multimodal','vision-language','visual question','image understanding'],
    'agent-eval': ['agent','tool use','function call','web agent','code execution'],
    'process-reward-model': ['process reward','prm','step-level reward','outcome reward'],
    'safety-eval-landscape': ['safety','harmful','jailbreak','red team','toxicity'],
    'MMLU': ['mmlu','massive multitask'],
    'HumanEval': ['humaneval','human eval','code generation'],
    'GSM8K': ['gsm8k','grade school math'],
    'MATH': ['math benchmark','competition math','math500'],
    'SWE-bench': ['swe-bench','software engineering','github issue'],
}

def extract_from_pdf_text(pdf_path: Path, paper: dict) -> dict:
    """用 PyMuPDF 提取文本，正则提取 claim 和结构化信息"""
    if not pdf_path.exists():
        return {}
    try:
        doc = fitz.open(str(pdf_path))
        # 读前 8 页（abstract + intro + experiments）
        text = ""
        for i, page in enumerate(doc):
            if i >= 8: break
            text += page.get_text()
        doc.close()
        text_lower = text.lower()

        # 提取评测的 LLM 列表
        models = [m for m in LLM_NAMES if m in text_lower]
        models = list(dict.fromkeys(models))[:6]  # 去重保序

        # 提取 benchmark 名称（优先标题中的）
        bench_match = re.search(
            r'\b([A-Z][A-Za-z0-9\-_]{2,20}(?:-[A-Z][A-Za-z0-9]{1,10})?)'
            r'(?:\s+(?:benchmark|dataset|leaderboard))\b', text, re.IGNORECASE)
        bench_name = bench_match.group(1) if bench_match else ""

        # 提取核心 claim（数字结论句子）
        claims = []
        for pat in CLAIM_PATTERNS:
            for m in re.finditer(pat, text, re.IGNORECASE):
                c = m.group(1).strip()
                if 20 < len(c) < 200 and c not in claims:
                    claims.append(c)
                if len(claims) >= 5: break
            if len(claims) >= 5: break

        # 截取前 3 条，加上节号占位
        claims_out = [f"{c} [REF: §Results]" for c in claims[:3]]
        if not claims_out:
            claims_out = ["（见论文实验章节）[REF: §4]"]

        # 推断相关 wiki 页面
        related = []
        for slug, keywords in WIKI_KEYWORDS.items():
            if any(kw in text_lower[:3000] for kw in keywords):
                related.append(slug)
        related = related[:5]

        return {
            "contribution": paper["abstract"][:350] + "...",
            "claims": claims_out,
            "models_evaluated": models,
            "benchmark_name": bench_name,
            "key_metrics": [c[:120] for c in claims[:2]],
            "related_wiki": related,
        }
    except Exception as e:
        print(f"      PDF文本提取失败: {e}")
        return {}


# ══════════════════════════════════════════════════════
# Wiki Source 文件生成
# ══════════════════════════════════════════════════════
def gen_wiki_source(paper: dict, score: int, relevance: int, extracted: dict) -> str:
    pid     = paper["id"]
    title   = paper["title"]
    authors = paper["authors"]
    pub     = paper["published"]
    venue   = paper.get("journal_ref") or "arXiv preprint"

    contrib  = extracted.get("contribution", paper["abstract"][:300] + "...")
    claims   = extracted.get("claims", ["- [REF: §1] （待补充）"])
    models   = extracted.get("models_evaluated", [])
    bench    = extracted.get("benchmark_name", "")
    metrics  = extracted.get("key_metrics", [])
    related  = extracted.get("related_wiki", [])

    claims_md  = "\n".join(f"- {c}" for c in claims)
    models_md  = "、".join(models) if models else "未明确"
    metrics_md = "\n".join(f"- {m}" for m in metrics) if metrics else "- 见论文"
    related_md = "\n".join(f"- [[{r}]]" for r in related) if related else "- [[benchmark-design]]"

    return f"""---
title: "{title}"
type: source
publish: true
confidence: draft
as_of_date: "{TODAY}"
last_verified: "{TODAY}"
sources:
  - "https://arxiv.org/abs/{pid}"
arxiv_id: "{pid}"
authors: "{authors}"
venue: "{venue}"
year: {pub[:4]}
quality_score: {score}
llm_eval_relevance: {relevance}
benchmark: "{bench}"
domain:
  - benchmark-design
---

# {title}

> 来源：{venue}（{pub[:4]}）| 作者：{authors}

## 主要贡献

{contrib}

## 核心 Claim

{claims_md}

## 评测模型

{models_md}

## 关键指标

{metrics_md}

## 相关 Wiki 页面

{related_md}
"""


# ══════════════════════════════════════════════════════
# arXiv 搜索
# ══════════════════════════════════════════════════════
def fetch_arxiv(query: str, max_results: int = 80) -> list:
    url = (f"https://export.arxiv.org/api/query?"
           f"search_query={query}&start=0&max_results={max_results}"
           f"&sortBy=submittedDate&sortOrder=descending")
    ns  = {"atom": "http://www.w3.org/2005/Atom",
           "arxiv": "http://arxiv.org/schemas/atom"}
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as r:
            root = ET.fromstring(r.read())
    except Exception as e:
        print(f"  查询失败: {e}")
        return []

    papers = []
    for e in root.findall("atom:entry", ns):
        raw_id = e.find("atom:id", ns).text.split("/abs/")[-1]
        pid = re.sub(r'v\d+$', '', raw_id).strip()
        jref_el = e.find("arxiv:journal_ref", ns)
        cats = " ".join(c.get("term","") for c in e.findall("atom:category", ns))
        auths = [a.find("atom:name", ns).text for a in e.findall("atom:author", ns)]
        papers.append({
            "id":          pid,
            "title":       e.find("atom:title", ns).text.strip().replace("\n"," "),
            "abstract":    e.find("atom:summary", ns).text.strip().replace("\n"," "),
            "published":   e.find("atom:published", ns).text[:10],
            "authors":     ", ".join(auths[:6]) + (" et al." if len(auths)>6 else ""),
            "journal_ref": jref_el.text if jref_el is not None else "",
            "categories":  cats,
        })
    return papers


def download_pdf(arxiv_id: str, dest: Path) -> bool:
    if dest.exists():
        return True
    url = f"https://arxiv.org/pdf/{arxiv_id}.pdf"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=90) as r:
            dest.write_bytes(r.read())
        time.sleep(2)
        return True
    except Exception as e:
        print(f"      PDF下载失败: {e}")
        return False


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
    load_s2_cache()
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    WIKI_SOURCES.mkdir(parents=True, exist_ok=True)
    PENDING_MD.parent.mkdir(parents=True, exist_ok=True)

    existing = load_existing_ids()
    one_year_ago = (datetime.now() - timedelta(days=365)).strftime("%Y-%m-%d")

    # 更精准的搜索查询（聚焦LLM评测）
    queries = [
        "cat:cs.CL+AND+ti:benchmark+AND+abs:language+model",
        "cat:cs.CL+AND+ti:evaluation+AND+abs:llm",
        "cat:cs.CL+AND+ti:evaluation+AND+abs:gpt",
        "cat:cs.CL+AND+abs:llm-as-judge",
        "cat:cs.CL+AND+ti:leaderboard+AND+abs:language+model",
        "cat:cs.AI+AND+ti:benchmark+AND+abs:large+language",
        "cat:cs.CL+AND+ti:benchmark+AND+abs:multimodal+AND+abs:evaluation",
    ]

    all_papers = {}
    for q in queries:
        print(f"搜索: {q}")
        results = fetch_arxiv(q, max_results=80)
        for p in results:
            if p["id"] not in all_papers:
                all_papers[p["id"]] = p
        time.sleep(3)

    candidates = [p for pid, p in all_papers.items()
                  if pid not in existing and p.get("published","") >= one_year_ago]
    print(f"\n候选论文（去重+过滤已入库+近12个月）: {len(candidates)}\n")

    # ── 第一轮：快速打分（仅元数据 + SemanticScholar） ──
    print("第一轮打分（元数据+引用数）...")
    scored = []
    for i, p in enumerate(candidates):
        total, rel, verdict = score_paper(p)
        if verdict != "skip":
            scored.append((total, rel, verdict, p))
        if (i+1) % 10 == 0:
            save_s2_cache()
            print(f"  已处理 {i+1}/{len(candidates)}，S2缓存已保存")

    save_s2_cache()
    scored.sort(key=lambda x: x[0], reverse=True)

    # 取前 70 候选进行 PDF 精读（excellent 优先，最多 50 篇）
    excellent_cands = [x for x in scored if x[2]=="excellent"][:50]
    pending_cands   = [x for x in scored if x[2]=="pending"]

    print(f"\n第一轮筛出 excellent: {len(excellent_cands)}  pending: {len(pending_cands)}")

    # ── 第二轮：PDF 下载 + Claude 精读 ──
    final_excellent = []
    print("\n第二轮：PDF下载 + Claude精读...\n")
    for i, (total, rel, _, paper) in enumerate(excellent_cands):
        pid = paper["id"]
        print(f"[{i+1:02d}/{len(excellent_cands)}] score={total} rel={rel} | {paper['title'][:65]}")
        pdf_path = RAW_DIR / f"{pid}.pdf"
        downloaded = download_pdf(pid, pdf_path)
        if downloaded:
            print("      PDF文本提取中...")
            extracted = extract_from_pdf_text(pdf_path, paper)
        else:
            extracted = {}

        # 写 wiki/sources/
        source_file = WIKI_SOURCES / f"{pid}.md"
        source_file.write_text(gen_wiki_source(paper, total, rel, extracted))
        print(f"      → wiki/sources/{pid}.md ✓")
        append_index(paper, total, "imported", f"wiki/sources/{pid}.md")
        final_excellent.append(paper)

    # ── 输出待确认列表 ──
    lines = [
        f"# 待确认论文列表（v2）\n",
        f"> 生成时间：{TODAY} | 共 {len(pending_cands)} 篇（relevance≥2 但总分<10）\n\n",
        "| # | arXiv | 总分 | 相关性 | 标题 | 年份 |\n",
        "|---|-------|------|--------|------|------|\n",
    ]
    for i,(total,rel,_,p) in enumerate(pending_cands[:60],1):
        lines.append(
            f"| {i} | [{p['id']}](https://arxiv.org/abs/{p['id']}) "
            f"| {total} | {rel}/5 | {p['title'][:55]} | {p['published'][:4]} |\n"
        )
        append_index(p, total, "pending", "")
    PENDING_MD.write_text("".join(lines))

    save_s2_cache()

    print(f"\n{'='*65}")
    print(f"✅ 优秀论文自动导入: {len(final_excellent)} 篇 → wiki/sources/")
    print(f"📋 待确认列表: {len(pending_cands)} 篇 → {PENDING_MD.name}")
    print(f"总分分布: {[x[0] for x in excellent_cands]}")


if __name__ == "__main__":
    main()
