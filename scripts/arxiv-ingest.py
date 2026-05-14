#!/usr/bin/env python3
"""
arXiv LLM Evaluation Paper Ingest Pipeline
- 搜索最近12个月 cs.CL/cs.AI 中 LLM 评测相关论文
- 质量打分（顶级机构/顶级会议/评测创新性）
- 下载 PDF 到 raw/papers/
- 优秀论文（score>=8）自动生成 wiki/sources/ 草稿
- 其余生成待确认列表
"""

import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import json
import os
import csv
import re
import time
from datetime import datetime, timedelta
from pathlib import Path

# ─── 路径配置 ───────────────────────────────────────────────
ROOT = Path(__file__).parent.parent
RAW_DIR = ROOT / "raw" / "papers"
WIKI_SOURCES = ROOT / "wiki" / "sources"
INDEX_CSV = RAW_DIR / "_index.csv"
PENDING_MD = ROOT / "raw" / "benchmarks" / "pending-papers.md"
TODAY = datetime.now().strftime("%Y-%m-%d")

# ─── 质量打分标准 ────────────────────────────────────────────
TOP_LABS = [
    "google", "deepmind", "openai", "anthropic", "meta", "microsoft",
    "apple", "nvidia", "stanford", "mit", "cmu", "berkeley", "princeton",
    "yale", "harvard", "oxford", "cambridge", "allen institute", "ai2",
    "tsinghua", "peking university", "fudan", "nanjing", "sjtu",
    "scale ai", "hugging face", "cohere", "mistral", "01.ai", "baidu",
    "alibaba", "bytedance", "tencent", "huawei", "zhipu", "moonshot",
    "deepseek", "01-ai", "minimax", "sensetime",
]

TOP_VENUES = [
    "neurips", "icml", "iclr", "acl", "emnlp", "naacl", "cvpr", "iccv",
    "eccv", "aaai", "ijcai", "coling", "findings", "tacl",
]

QUALITY_KEYWORDS = [
    "benchmark", "evaluation", "leaderboard", "assessment", "judge",
    "metric", "dataset", "test set", "human evaluation", "contamination",
    "saturation", "annotation", "ground truth",
]

EVAL_INNOVATION = [
    "novel benchmark", "new benchmark", "propose a benchmark",
    "introduce a benchmark", "we present", "we propose",
    "dynamic benchmark", "live benchmark", "contamination-free",
    "multi-modal evaluation", "agentic evaluation",
]

STRONG_MODELS = ["gpt-4", "gpt-o", "claude", "gemini", "llama", "qwen", "mistral", "deepseek"]


def score_paper(title: str, abstract: str, authors: str, journal_ref: str, categories: str) -> int:
    """综合质量打分，满分 20，≥8 视为优秀"""
    score = 0
    text = (title + " " + abstract + " " + authors + " " + journal_ref).lower()

    # 顶级机构 +4
    if any(lab in text for lab in TOP_LABS):
        score += 4

    # 顶级会议发表 +5
    if any(venue in journal_ref.lower() for venue in TOP_VENUES):
        score += 5

    # 评测核心关键词 +2
    kw_hits = sum(1 for kw in QUALITY_KEYWORDS if kw in (title + " " + abstract).lower())
    score += min(kw_hits, 2)

    # 评测创新性 +3
    if any(kw in abstract.lower() for kw in EVAL_INNOVATION):
        score += 3

    # 对比了多个强模型 +2
    model_hits = sum(1 for m in STRONG_MODELS if m in abstract.lower())
    if model_hits >= 3:
        score += 2
    elif model_hits >= 1:
        score += 1

    # 标题直接包含 "benchmark" 或 "evaluation" +2
    title_lower = title.lower()
    if "benchmark" in title_lower or "evaluation" in title_lower or "leaderboard" in title_lower:
        score += 2

    # cs.CL 主分类 +1
    if "cs.cl" in categories.lower() or "cs.ai" in categories.lower():
        score += 1

    return score


def fetch_arxiv(query: str, start: int = 0, max_results: int = 100) -> list:
    """查询 arXiv API，返回论文元数据列表"""
    # 直接拼接 URL 避免二次编码问题
    url = (f"https://export.arxiv.org/api/query?"
           f"search_query={query}"
           f"&start={start}&max_results={max_results}"
           f"&sortBy=submittedDate&sortOrder=descending")
    print(f"  查询: {url[:100]}...")

    with urllib.request.urlopen(url, timeout=30) as resp:
        data = resp.read()

    ns = {"atom": "http://www.w3.org/2005/Atom", "arxiv": "http://arxiv.org/schemas/atom"}
    root = ET.fromstring(data)
    papers = []

    for entry in root.findall("atom:entry", ns):
        arxiv_id_raw = entry.find("atom:id", ns).text
        arxiv_id = arxiv_id_raw.split("/abs/")[-1].replace("v1","").replace("v2","").replace("v3","").strip()
        # keep only the base id like 2501.12345
        arxiv_id = re.sub(r'v\d+$', '', arxiv_id)

        title = entry.find("atom:title", ns).text.strip().replace("\n", " ")
        abstract = entry.find("atom:summary", ns).text.strip().replace("\n", " ")
        published = entry.find("atom:published", ns).text[:10]

        authors_list = [a.find("atom:name", ns).text for a in entry.findall("atom:author", ns)]
        authors = ", ".join(authors_list[:5])
        if len(authors_list) > 5:
            authors += " et al."

        # journal ref (venue)
        jref_el = entry.find("arxiv:journal_ref", ns)
        journal_ref = jref_el.text if jref_el is not None else ""

        # categories
        cats = " ".join(cat.get("term", "") for cat in entry.findall("atom:category", ns))

        papers.append({
            "id": arxiv_id,
            "title": title,
            "abstract": abstract,
            "authors": authors,
            "published": published,
            "journal_ref": journal_ref,
            "categories": cats,
        })

    return papers


def download_pdf(arxiv_id: str, dest: Path) -> bool:
    """下载 PDF 到 dest，已存在则跳过"""
    if dest.exists():
        print(f"    已存在: {dest.name}")
        return True
    url = f"https://arxiv.org/pdf/{arxiv_id}.pdf"
    try:
        print(f"    下载: {arxiv_id}.pdf ...", end="", flush=True)
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as resp:
            dest.write_bytes(resp.read())
        print(f" ✓ ({dest.stat().st_size // 1024}KB)")
        time.sleep(1.5)  # 礼貌延迟
        return True
    except Exception as e:
        print(f" ✗ ({e})")
        return False


def gen_wiki_source(paper: dict, score: int) -> str:
    """生成 wiki/sources/<arxiv-id>.md 内容"""
    arxiv_id = paper["id"]
    title = paper["title"]
    abstract = paper["abstract"]
    authors = paper["authors"]
    published = paper["published"]
    journal_ref = paper.get("journal_ref", "")
    venue = journal_ref if journal_ref else "arXiv preprint"

    # 截取摘要前 300 字
    abstract_short = abstract[:400] + ("..." if len(abstract) > 400 else "")

    return f"""---
title: "{title}"
type: source
publish: true
confidence: draft
as_of_date: "{TODAY}"
last_verified: "{TODAY}"
sources:
  - "https://arxiv.org/abs/{arxiv_id}"
arxiv_id: "{arxiv_id}"
authors: "{authors}"
venue: "{venue}"
year: {published[:4]}
quality_score: {score}
domain:
  - benchmark-design
---

# {title}

> 来源：{venue}（{published[:4]}）| 作者：{authors}

## 摘要

{abstract_short}

## 核心 Claim

<!-- TODO: 阅读全文后补充 [REF: §X.Y] 引注 -->
- [REF: §1]

## 相关 Wiki 页面

<!-- TODO: 补充 [[英文-slug]] -->

"""


def load_existing_ids() -> set:
    """读取已入库的 arXiv ID"""
    existing = set()
    if INDEX_CSV.exists():
        with open(INDEX_CSV, newline="") as f:
            for row in csv.DictReader(f):
                if row.get("id"):
                    existing.add(row["id"])
    # 也扫描 wiki/sources/
    for f in WIKI_SOURCES.glob("*.md"):
        existing.add(f.stem)
    return existing


def append_to_index(paper: dict, score: int, status: str, source_page: str):
    exists = INDEX_CSV.exists() and INDEX_CSV.stat().st_size > 0
    with open(INDEX_CSV, "a", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["id","title","authors","year","added_at","status","source_page"])
        if not exists:
            writer.writeheader()
        writer.writerow({
            "id": paper["id"],
            "title": paper["title"][:80],
            "authors": paper["authors"][:60],
            "year": paper["published"][:4],
            "added_at": TODAY,
            "status": status,
            "source_page": source_page,
        })


def main():
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    WIKI_SOURCES.mkdir(parents=True, exist_ok=True)
    PENDING_MD.parent.mkdir(parents=True, exist_ok=True)

    existing_ids = load_existing_ids()
    print(f"已入库论文: {len(existing_ids)} 篇")

    # 搜索策略：arXiv API 简化查询，避免复杂 Boolean 导致 500
    queries = [
        'cat:cs.CL+AND+ti:benchmark',
        'cat:cs.CL+AND+ti:evaluation+AND+ti:llm',
        'cat:cs.CL+AND+ti:evaluation+AND+ti:language+model',
        'cat:cs.CL+AND+ti:leaderboard',
        'cat:cs.CL+AND+ti:benchmark+AND+abs:multimodal',
        'cat:cs.AI+AND+ti:benchmark+AND+abs:evaluation',
    ]

    all_papers = {}
    for q in queries:
        print(f"\n搜索: {q[:80]}...")
        try:
            results = fetch_arxiv(q, max_results=60)
            print(f"  获得 {len(results)} 篇")
            for p in results:
                if p["id"] not in all_papers:
                    all_papers[p["id"]] = p
            time.sleep(3)
        except Exception as e:
            print(f"  查询失败: {e}")

    # 过滤：只保留最近12个月的论文
    one_year_ago = (datetime.now() - timedelta(days=365)).strftime("%Y-%m-%d")
    print(f"\n去重后共 {len(all_papers)} 篇候选，过滤已入库 + 日期 >= {one_year_ago}...")
    candidates = [
        p for pid, p in all_papers.items()
        if pid not in existing_ids and p.get("published","") >= one_year_ago
    ]
    print(f"新论文: {len(candidates)} 篇")

    # 打分排序
    for p in candidates:
        p["score"] = score_paper(p["title"], p["abstract"], p["authors"],
                                  p.get("journal_ref",""), p.get("categories",""))
    candidates.sort(key=lambda x: x["score"], reverse=True)

    if not candidates:
        print("未找到新论文，退出。")
        return

    # 取前 50
    top50 = candidates[:50]
    print(f"\n取 top {len(top50)}（得分范围: {top50[-1]['score']} ~ {top50[0]['score']}）\n")

    excellent = []   # score >= 8
    pending = []     # score < 8

    for i, paper in enumerate(top50):
        pid = paper["id"]
        score = paper["score"]
        print(f"[{i+1:02d}] score={score:02d} | {paper['title'][:70]}")

        # 下载 PDF
        pdf_path = RAW_DIR / f"{pid}.pdf"
        downloaded = download_pdf(pid, pdf_path)

        # 分流
        if score >= 8:
            excellent.append(paper)
            # 生成 wiki source 草稿
            source_file = WIKI_SOURCES / f"{pid}.md"
            if not source_file.exists():
                source_file.write_text(gen_wiki_source(paper, score))
                print(f"    → wiki/sources/{pid}.md 已创建")
            append_to_index(paper, score, "imported", f"wiki/sources/{pid}.md")
        else:
            pending.append(paper)
            append_to_index(paper, score, "pending", "")

    # 生成待确认列表
    lines = [
        f"# 待确认论文列表\n",
        f"> 生成时间：{TODAY}  |  共 {len(pending)} 篇（score < 8，请人工审阅后决定是否导入）\n\n",
        "| # | arXiv ID | 得分 | 标题 | 作者 | 年份 |\n",
        "|---|---------|------|------|------|------|\n",
    ]
    for i, p in enumerate(pending, 1):
        lines.append(
            f"| {i} | [{p['id']}](https://arxiv.org/abs/{p['id']}) "
            f"| {p['score']} | {p['title'][:60]} | {p['authors'][:40]} | {p['published'][:4]} |\n"
        )
    PENDING_MD.write_text("".join(lines))

    print(f"\n{'='*60}")
    print(f"✅ 优秀论文（score≥8）：{len(excellent)} 篇 → 已自动导入 wiki/sources/")
    print(f"📋 待确认论文（score<8）：{len(pending)} 篇 → {PENDING_MD}")
    print(f"📦 PDF 存放：{RAW_DIR}")


if __name__ == "__main__":
    main()
