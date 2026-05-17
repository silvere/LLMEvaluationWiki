#!/usr/bin/env python3
"""补建最新 model spec（基于 2026-05 官方源验证的数据）"""
from pathlib import Path

TODAY = "2026-05-17"
WIKI = Path(__file__).parent.parent / "wiki" / "models"

MODELS = [
    {
        "slug": "Claude-Opus-4.7",
        "title": "Claude Opus 4.7",
        "developer": "[[Anthropic]]",
        "release_date": "2026-04",
        "family": "Claude 4",
        "context": "1M input / 128K output",
        "modality": "text + image",
        "license": "proprietary (API)",
        "model_id": "claude-opus-4-7",
        "headline": "Anthropic 当前最强生成模型，引入 adaptive thinking + 1M context，在 agentic coding 上较 4.6 有 'step-change' 提升。",
        "benchmarks": [
            ("数据待 audit", "official 数字以 anthropic.com/news 为准"),
        ],
        "sources": [
            "https://platform.claude.com/docs/en/docs/about-claude/models/overview",
            "https://www.anthropic.com/news/claude-opus-4-7",
        ],
        "predecessors": ["[[Claude-Opus-4.6|Claude Opus 4.6]]"],
        "knowledge_cutoff": "Jan 2026",
    },
    {
        "slug": "Claude-Sonnet-4.6",
        "title": "Claude Sonnet 4.6",
        "developer": "[[Anthropic]]",
        "release_date": "2026-04",
        "family": "Claude 4",
        "context": "1M input / 64K output",
        "modality": "text + image",
        "license": "proprietary (API)",
        "model_id": "claude-sonnet-4-6",
        "headline": "Claude 4.6 系列的中型旗舰，'best combination of speed and intelligence'；支持 extended/adaptive thinking 双模式。",
        "benchmarks": [
            ("数据待 audit", "official 数字以 anthropic.com 为准"),
        ],
        "sources": [
            "https://platform.claude.com/docs/en/docs/about-claude/models/overview",
            "https://www.anthropic.com/news/claude-sonnet-4-6",
        ],
        "predecessors": ["[[Claude-Sonnet-4.5|Claude Sonnet 4.5]]"],
        "knowledge_cutoff": "Aug 2025",
    },
    {
        "slug": "Claude-Haiku-4.5",
        "title": "Claude Haiku 4.5",
        "developer": "[[Anthropic]]",
        "release_date": "2025-10",
        "family": "Claude 4",
        "context": "200K input / 64K output",
        "modality": "text + image",
        "license": "proprietary (API)",
        "model_id": "claude-haiku-4-5-20251001",
        "headline": "Claude 4.5 系列中最快的模型，'fastest with near-frontier intelligence'；定位于高吞吐/低延迟场景。",
        "benchmarks": [
            ("数据待 audit", "official 数字以 anthropic.com 为准"),
        ],
        "sources": [
            "https://platform.claude.com/docs/en/docs/about-claude/models/overview",
        ],
        "predecessors": ["[[Claude-3.5-Haiku|Claude 3.5 Haiku]]"],
        "knowledge_cutoff": "Feb 2025",
    },
    {
        "slug": "GPT-5.5",
        "title": "GPT-5.5（含 Pro / Instant 变体）",
        "developer": "[[OpenAI]]",
        "release_date": "2026-04 (API), 2026-05 (ChatGPT default)",
        "family": "GPT",
        "context": "1M input",
        "modality": "text + image + audio",
        "license": "proprietary (API)",
        "model_id": "gpt-5.5",
        "headline": "OpenAI 当前旗舰，2026-05-05 起为 ChatGPT 默认模型；GPT-5.5 Pro 在 AIME 2025 上达 81.2%（vs GPT-5 65.4%）。",
        "benchmarks": [
            ("[[AIME]] 2025 (GPT-5.5 Pro)", "81.2%（vs GPT-5 65.4%）"),
            ("数据待 audit（详见 sources）", ""),
        ],
        "sources": [
            "https://openai.com/index/introducing-gpt-5-5/",
            "https://openai.com/index/gpt-5-5-instant/",
            "https://developers.openai.com/api/docs/models/gpt-5.5",
        ],
        "predecessors": ["[[GPT-5|GPT-5]]", "[[GPT-4.1|GPT-4.1]]"],
        "knowledge_cutoff": "约 2025-Q4",
    },
    {
        "slug": "Gemini-3.1-Pro",
        "title": "Gemini 3.1 Pro",
        "developer": "[[Google-DeepMind]]",
        "release_date": "2026",
        "family": "Gemini 3",
        "context": "1M input",
        "modality": "text + image + audio + video",
        "license": "proprietary (API)",
        "model_id": "gemini-3-1-pro",
        "headline": "Google 当前最强模型，'leading on 13 of 16 benchmarks Google measured'，引入 vibe coding 与 agentic 能力。",
        "benchmarks": [
            ("[[SWE-bench-Verified]]", "80.6%"),
            ("[[GPQA]] Diamond", "94.3%"),
            ("[[ARC-AGI]]-2", "77.1%"),
        ],
        "sources": [
            "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/",
            "https://deepmind.google/models/model-cards/gemini-3-1-pro/",
            "https://artificialanalysis.ai/models/gemini-3-1-pro-preview",
        ],
        "predecessors": ["[[Gemini-2.5-Pro|Gemini 2.5 Pro]]"],
    },
    {
        "slug": "Gemini-3-Flash",
        "title": "Gemini 3 Flash",
        "developer": "[[Google-DeepMind]]",
        "release_date": "2026",
        "family": "Gemini 3",
        "context": "1M input / 65K output",
        "modality": "text + image + audio + video",
        "license": "proprietary (API)",
        "model_id": "gemini-3-flash",
        "headline": "高性价比变体（约 $0.50 / 1M input tokens），在 SWE-bench Verified agentic coding 上反超 Gemini 3 Pro。",
        "benchmarks": [
            ("[[SWE-bench-Verified]] (agentic)", "78%"),
        ],
        "sources": [
            "https://blog.google/products/gemini/gemini-3-flash/",
            "https://openrouter.ai/google/gemini-3-flash-preview",
        ],
        "predecessors": ["[[Gemini-2.0-Flash|Gemini 2.0 Flash]]"],
    },
    {
        "slug": "Kimi-K2.6",
        "title": "Kimi K2.6",
        "developer": "[[Moonshot-AI]]",
        "release_date": "2026-04-20",
        "family": "Kimi K2",
        "context": "256K input",
        "modality": "text + image + video（含 400M MoonViT vision encoder）",
        "license": "Modified MIT (open-weight)",
        "model_id": "kimi-k2.6",
        "headline": "Moonshot 当前开源旗舰，1T 参数 / 32B 激活 MoE；在 SWE-Bench Pro 上 ties GPT-5.5（58.6%），HLE with tools 54.0% leads。Agent Swarm 扩展到 300 sub-agents / 4000 steps。",
        "benchmarks": [
            ("[[SWE-bench-Pro]] (tied with GPT-5.5)", "58.6%"),
            ("[[HLE]] (with tools, leading)", "54.0%"),
        ],
        "sources": [
            "https://huggingface.co/moonshotai/Kimi-K2.6",
            "https://miraflow.ai/blog/kimi-k2-6-explained-moonshot-ai-open-source-model-ties-gpt-5-5-coding",
        ],
        "predecessors": ["[[Kimi-K2.5|Kimi K2.5]]", "[[Kimi-K2|Kimi K2]]"],
    },
    {
        "slug": "Kimi-K2.5",
        "title": "Kimi K2.5",
        "developer": "[[Moonshot-AI]]",
        "release_date": "2026-02",
        "family": "Kimi K2",
        "context": "128K-256K input",
        "modality": "text + image（vision support）",
        "license": "Modified MIT (open-weight)",
        "model_id": "kimi-k2.5",
        "headline": "K2 系列的 vision + agent swarm 升级版，首次引入多模态原生支持与 100 sub-agent swarm 协作。",
        "benchmarks": [
            ("数据待 audit", "详见 sources"),
        ],
        "sources": [
            "https://huggingface.co/moonshotai/Kimi-K2.5",
            "https://github.com/MoonshotAI/Kimi-K2.5",
            "https://www.infoq.com/news/2026/02/kimi-k25-swarm/",
        ],
        "predecessors": ["[[Kimi-K2|Kimi K2]]"],
    },
    {
        "slug": "Doubao-Seed-2.0",
        "title": "Doubao Seed 2.0（Pro/Lite/Mini）",
        "developer": "[[ByteDance-AI]]",
        "release_date": "2026-02",
        "family": "Doubao Seed",
        "context": "256K input（Pro）",
        "modality": "text + image + video",
        "license": "proprietary (API, 火山引擎)",
        "model_id": "doubao-seed-2.0",
        "headline": "ByteDance 当前最强系列，Pro 在 AIME 2025 上达 98.3%，Codeforces 3020 Elo，VideoMME 89.5%，直接对标 GPT-5.2/Claude Opus 4.5/Gemini 3 Pro。",
        "benchmarks": [
            ("[[AIME]] 2025 (Pro)", "98.3%"),
            ("[[Codeforces]] Elo (Pro)", "3020"),
            ("VideoMME (Pro)", "89.5%"),
        ],
        "sources": [
            "https://seed.bytedance.com/en/blog/bytedance-s-latest-thinking-model-seed-thinking-v1-5-technical-details-disclosed",
            "https://evolink.ai/blog/doubao-seed-2-0-review-benchmarks-pricing",
        ],
        "predecessors": ["[[Doubao-Seed-1.6|Doubao Seed 1.6]]"],
    },
    {
        "slug": "DeepSeek-V3.1",
        "title": "DeepSeek V3.1 / V3.2",
        "developer": "[[DeepSeek]]",
        "release_date": "2025-08 (V3.1), 2025-09+ (V3.2)",
        "family": "DeepSeek V",
        "context": "128K (V3.1) / 163K (V3.2)",
        "modality": "text",
        "license": "open weights (MIT-like)",
        "model_id": "deepseek-v3.1 / deepseek-v3.2",
        "headline": "V3.1 是 V3 与 R1 的 hybrid 融合（thinking + non-thinking），671B 总参/37B 激活；V3.2 扩展 context 至 163K。",
        "benchmarks": [
            ("数据待 audit", "详见 sources"),
        ],
        "sources": [
            "https://huggingface.co/deepseek-ai/DeepSeek-V3.1",
            "https://www.bentoml.com/blog/the-complete-guide-to-deepseek-models-from-v3-to-r1-and-beyond",
        ],
        "predecessors": ["[[DeepSeek-V3|DeepSeek V3]]", "[[DeepSeek-R1|DeepSeek R1]]"],
    },
]


TEMPLATE = """---
title: "{title}"
type: model
publish: true
confidence: draft
as_of_date: "{TODAY}"
last_verified: "{TODAY}"
sources:
{sources_yaml}
developer: "{developer_plain}"
release_date: "{release_date}"
family: "{family}"
context_length: "{context}"
modality: "{modality}"
license: "{license}"
model_id: "{model_id}"
domain:
  - model-spec
aliases:
  - {slug_lower}
---

# {title}

> {headline}

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | {developer} |
| 发布时间 | {release_date} |
| 模型家族 | {family} |
| 上下文长度 | {context} |
| 模态 | {modality} |
| 许可 | {license} |
| 官方 model_id | `{model_id}` |
{kc_row}

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
{benchmarks_md}

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 仅作 wiki 索引，权威数据请访问官方源。

## 前代/相关模型

{predecessors_md}

## 备注

本页基于官方公开材料整理；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。如发现数据过时或错误，请人工编辑后将 `confidence` 改为 `promoted`。
"""


for m in MODELS:
    f = WIKI / f"{m['slug']}.md"
    benchmarks_md = "\n".join(f"| {b} | {s} |" for b, s in m["benchmarks"])
    predecessors_md = "\n".join(f"- {p}" for p in m.get("predecessors", [])) or "- 无"
    developer_plain = m["developer"].replace("[[", "").replace("]]", "")
    sources_yaml = "\n".join(f'  - "{u}"' for u in m["sources"])
    kc = m.get("knowledge_cutoff")
    kc_row = f"| 知识截止日期 | {kc} |" if kc else ""

    content = TEMPLATE.format(
        TODAY=TODAY,
        title=m["title"],
        slug_lower=m["slug"].lower(),
        developer=m["developer"],
        developer_plain=developer_plain,
        release_date=m["release_date"],
        family=m["family"],
        context=m["context"],
        modality=m["modality"],
        license=m["license"],
        model_id=m["model_id"],
        kc_row=kc_row,
        headline=m["headline"],
        benchmarks_md=benchmarks_md,
        predecessors_md=predecessors_md,
        sources_yaml=sources_yaml,
    )
    f.write_text(content)
    print(f"  ✓ {m['slug']}")

print(f"\n补建 {len(MODELS)} 个最新 model spec")
