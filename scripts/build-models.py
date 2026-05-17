#!/usr/bin/env python3
"""批量生成 wiki/models/ 模型 Spec 页面（基于公开发布信息）"""
from pathlib import Path

TODAY = "2026-05-17"
WIKI = Path(__file__).parent.parent / "wiki" / "models"
WIKI.mkdir(exist_ok=True)

# 每个模型：slug, title, developer, release_date, family, context, modality, license, headline, benchmarks
MODELS = [
    # ─── OpenAI GPT 系列 ───
    {
        "slug": "GPT-5",
        "title": "GPT-5",
        "developer": "[[OpenAI]]",
        "release_date": "2025-08",
        "family": "GPT",
        "context": "400K input / 128K output (estimated)",
        "modality": "text + image + audio",
        "license": "proprietary (API)",
        "headline": "OpenAI 的新一代旗舰模型，融合 GPT-4o 系列对话能力与 o-series 推理能力，按需切换 thinking/non-thinking。",
        "benchmarks": [
            ("[[HLE]]", "约 25% (with reasoning)"),
            ("[[AIME]] 2025", "94.6%"),
            ("[[GPQA]] Diamond", "约 85-88%"),
            ("[[SWE-bench-Verified]]", "约 74%"),
        ],
        "predecessors": ["GPT-4o", "o3", "o4-mini"],
    },
    {
        "slug": "GPT-4o",
        "title": "GPT-4o",
        "developer": "[[OpenAI]]",
        "release_date": "2024-05",
        "family": "GPT",
        "context": "128K input / 16K output",
        "modality": "text + image + audio + video",
        "license": "proprietary (API)",
        "headline": "OpenAI 首个原生多模态模型（'omni'），统一处理文本、图像、音频和视频输入。",
        "benchmarks": [
            ("[[MMLU]]", "88.7%"),
            ("[[AIME]] 2024", "约 9-13%"),
            ("[[GPQA]] Diamond", "53.6%"),
            ("[[HumanEval]]", "90.2%"),
            ("[[MATH]]", "76.6%"),
        ],
        "predecessors": ["GPT-4-Turbo", "GPT-4"],
    },
    {
        "slug": "o1",
        "title": "o1",
        "developer": "[[OpenAI]]",
        "release_date": "2024-12",
        "family": "GPT (reasoning)",
        "context": "200K input / 100K output",
        "modality": "text",
        "license": "proprietary (API)",
        "headline": "OpenAI 首个'推理时扩展'模型，引入大规模隐式思维链（Chain-of-Thought）训练，在数学/编程上大幅超越 GPT-4o。",
        "benchmarks": [
            ("[[AIME]] 2024", "74.4%"),
            ("[[GPQA]] Diamond", "78.0%"),
            ("[[SWE-bench-Verified]]", "48.9%"),
            ("[[MATH]]", "94.8%"),
            ("Codeforces", "Elo 1673 (89th percentile)"),
        ],
        "predecessors": ["GPT-4o"],
    },
    {
        "slug": "o3",
        "title": "o3",
        "developer": "[[OpenAI]]",
        "release_date": "2025-01 (announced), 2025-04 (public)",
        "family": "GPT (reasoning)",
        "context": "200K input",
        "modality": "text + image",
        "license": "proprietary (API)",
        "headline": "o1 的下一代推理模型，引入'tool use during reasoning'，在 ARC-AGI 测试上首次超越人类参考分。",
        "benchmarks": [
            ("[[ARC-AGI]] 1 (high)", "87.5%"),
            ("[[AIME]] 2024", "约 91-96%"),
            ("[[GPQA]] Diamond", "87.7%"),
            ("[[SWE-bench-Verified]]", "约 71%"),
            ("[[FrontierMath]]", "约 25%"),
        ],
        "predecessors": ["o1"],
    },
    {
        "slug": "GPT-4.1",
        "title": "GPT-4.1",
        "developer": "[[OpenAI]]",
        "release_date": "2025-04",
        "family": "GPT",
        "context": "1M input",
        "modality": "text + image",
        "license": "proprietary (API)",
        "headline": "GPT-4o 的迭代版本，主要在编程能力、指令跟随和长上下文上提升；首个 1M token 上下文的 GPT 系列。",
        "benchmarks": [
            ("[[SWE-bench-Verified]]", "54.6%"),
            ("[[MMLU]]", "约 90.2%"),
            ("[[HumanEval]]", "约 90%+"),
            ("MMLU Long-Context (1M)", "84.1%"),
        ],
        "predecessors": ["GPT-4o"],
    },

    # ─── Anthropic Claude 系列 ───
    {
        "slug": "Claude-3.5-Sonnet",
        "title": "Claude 3.5 Sonnet",
        "developer": "[[Anthropic]]",
        "release_date": "2024-06 (v1), 2024-10 (new/v2)",
        "family": "Claude 3",
        "context": "200K input / 8K output",
        "modality": "text + image",
        "license": "proprietary (API)",
        "headline": "Anthropic 中型旗舰，长期被工业界视为代码能力最强模型之一；引入 Computer Use 工具调用范式。",
        "benchmarks": [
            ("[[HumanEval]]", "92.0%"),
            ("[[SWE-bench-Verified]]", "49.0%"),
            ("[[MMLU]]", "88.7%"),
            ("[[GPQA]] Diamond", "65.0%"),
            ("MMMU", "68.3%"),
        ],
        "predecessors": ["Claude 3 Sonnet"],
    },
    {
        "slug": "Claude-3.7-Sonnet",
        "title": "Claude 3.7 Sonnet",
        "developer": "[[Anthropic]]",
        "release_date": "2025-02",
        "family": "Claude 3",
        "context": "200K input / 64K output (128K with extended thinking)",
        "modality": "text + image",
        "license": "proprietary (API)",
        "headline": "Anthropic 首个 hybrid reasoning 模型，可在 standard 与 extended thinking 模式间切换；编程能力大幅提升。",
        "benchmarks": [
            ("[[SWE-bench-Verified]]", "70.3% (高级配置)"),
            ("[[AIME]] 2024 (extended thinking)", "约 78%"),
            ("[[GPQA]] Diamond", "约 78%"),
            ("[[HumanEval]]", "约 92-95%"),
        ],
        "predecessors": ["Claude 3.5 Sonnet (v2)"],
    },
    {
        "slug": "Claude-Opus-4",
        "title": "Claude Opus 4 / Opus 4.1",
        "developer": "[[Anthropic]]",
        "release_date": "2025-05 (Opus 4), 2025-08 (Opus 4.1)",
        "family": "Claude 4",
        "context": "200K input / 32K output",
        "modality": "text + image",
        "license": "proprietary (API)",
        "headline": "Anthropic 最强推理与代码模型，引入'agentic search' 与持久化记忆；自我反思能力显著增强。",
        "benchmarks": [
            ("[[SWE-bench-Verified]]", "72.5-79.4%"),
            ("Terminal-bench", "约 50%"),
            ("[[MMLU]] Pro", "约 88%"),
        ],
        "predecessors": ["Claude 3.7 Sonnet"],
    },
    {
        "slug": "Claude-Sonnet-4.5",
        "title": "Claude Sonnet 4.5",
        "developer": "[[Anthropic]]",
        "release_date": "2025-09",
        "family": "Claude 4",
        "context": "200K input",
        "modality": "text + image",
        "license": "proprietary (API)",
        "headline": "Claude 4 系列的中型旗舰，被 Anthropic 称为'world's best coding model'，在 SWE-bench 与 OSWorld 上刷新 SOTA。",
        "benchmarks": [
            ("[[SWE-bench-Verified]]", "77.2%"),
            ("[[OSWorld]]", "约 50-61%"),
            ("[[tau-bench]]", "高于 Opus 4"),
        ],
        "predecessors": ["Claude Sonnet 4", "Claude 3.7 Sonnet"],
    },

    # ─── Google Gemini 系列 ───
    {
        "slug": "Gemini-1.5-Pro",
        "title": "Gemini 1.5 Pro",
        "developer": "[[Google-DeepMind]]",
        "release_date": "2024-02 (announced), 2024-05 (GA)",
        "family": "Gemini 1.5",
        "context": "1M-2M input",
        "modality": "text + image + audio + video",
        "license": "proprietary (API)",
        "headline": "首个商用百万级 token 上下文模型，引入 Mixture-of-Experts (MoE) 架构。",
        "benchmarks": [
            ("[[MMLU]]", "85.9%"),
            ("[[MATH]]", "67.7%"),
            ("[[HumanEval]]", "71.9%"),
            ("MRCR (1M context retrieval)", "94.5%"),
        ],
        "predecessors": ["Gemini 1.0 Pro"],
    },
    {
        "slug": "Gemini-2.0-Flash",
        "title": "Gemini 2.0 Flash",
        "developer": "[[Google-DeepMind]]",
        "release_date": "2024-12",
        "family": "Gemini 2.0",
        "context": "1M input",
        "modality": "text + image + audio + video + native tool use",
        "license": "proprietary (API)",
        "headline": "Google 首个 'Agentic Era' 模型，强化原生工具使用与多模态生成；以高速度/低成本为定位。",
        "benchmarks": [
            ("[[MMLU]] Pro", "76.4%"),
            ("[[GPQA]] Diamond", "62.1%"),
            ("[[MATH]]", "约 89.7%"),
            ("[[LiveCodeBench]]", "约 36%"),
        ],
        "predecessors": ["Gemini 1.5 Flash"],
    },
    {
        "slug": "Gemini-2.5-Pro",
        "title": "Gemini 2.5 Pro",
        "developer": "[[Google-DeepMind]]",
        "release_date": "2025-03 (preview), 2025-06 (GA)",
        "family": "Gemini 2.5",
        "context": "1M-2M input (extending to 2M)",
        "modality": "text + image + audio + video",
        "license": "proprietary (API)",
        "headline": "Google 思维链原生模型，Chatbot Arena 持续位列 Top-1；强化复杂推理与工具协同。",
        "benchmarks": [
            ("[[AIME]] 2025", "86.7%"),
            ("[[GPQA]] Diamond", "84.0%"),
            ("[[HLE]]", "约 18.8%"),
            ("[[SWE-bench-Verified]]", "63.2%"),
            ("[[LiveCodeBench]]", "约 80%"),
        ],
        "predecessors": ["Gemini 2.0 Pro Experimental"],
    },

    # ─── DeepSeek 系列 ───
    {
        "slug": "DeepSeek-V3",
        "title": "DeepSeek V3 / V3.1",
        "developer": "[[DeepSeek]]",
        "release_date": "2024-12 (V3), 2025-03 (V3.1)",
        "family": "DeepSeek V",
        "context": "128K input",
        "modality": "text",
        "license": "open weights (MIT-like)",
        "headline": "DeepSeek 旗舰 MoE 模型 (671B 总参数 / 37B 激活)，开源开放权重，性能对标 GPT-4o；中国大模型的标志性突破。",
        "benchmarks": [
            ("[[MMLU]]", "88.5%"),
            ("[[MMLU]]-Pro", "75.9%"),
            ("[[HumanEval]]", "约 82-89%"),
            ("[[MATH]] 500", "90.2%"),
            ("[[GPQA]] Diamond", "约 59%"),
        ],
        "predecessors": ["DeepSeek V2.5"],
    },
    {
        "slug": "DeepSeek-R1",
        "title": "DeepSeek R1",
        "developer": "[[DeepSeek]]",
        "release_date": "2025-01",
        "family": "DeepSeek R",
        "context": "128K input",
        "modality": "text",
        "license": "open weights (MIT)",
        "headline": "DeepSeek 首个推理优化模型，通过纯 RL（无 SFT）训练取得逼近 o1 的推理能力；震动 AI 工业界，引发开源推理模型浪潮。",
        "benchmarks": [
            ("[[AIME]] 2024", "79.8%"),
            ("[[MATH]] 500", "97.3%"),
            ("[[GPQA]] Diamond", "71.5%"),
            ("[[Codeforces]] Elo", "2029 (96.3 percentile)"),
            ("[[MMLU]]", "90.8%"),
        ],
        "predecessors": ["DeepSeek V3"],
    },

    # ─── Alibaba Qwen 系列 ───
    {
        "slug": "Qwen2.5-72B",
        "title": "Qwen2.5 系列（含 72B / Coder / Math / VL）",
        "developer": "[[Alibaba-Tongyi]]",
        "release_date": "2024-09",
        "family": "Qwen 2.5",
        "context": "128K input",
        "modality": "text (Coder/Math 专业版) / text+image (VL)",
        "license": "open weights (Apache 2.0, 部分 Qwen License)",
        "headline": "阿里通义实验室主力开源系列，覆盖 0.5B-72B 多个尺寸；Coder/Math/VL 等领域专精版本为开源最强之一。",
        "benchmarks": [
            ("[[MMLU]]", "约 85.0%"),
            ("[[GSM8K]]", "约 95.8%"),
            ("[[HumanEval]] (Coder-32B)", "约 92.7%"),
            ("MATH (Math-7B)", "约 83.6%"),
        ],
        "predecessors": ["Qwen2"],
    },
    {
        "slug": "Qwen3",
        "title": "Qwen3 系列（235B-A22B / 32B / Thinking）",
        "developer": "[[Alibaba-Tongyi]]",
        "release_date": "2025-04 (235B MoE 等多尺寸)",
        "family": "Qwen 3",
        "context": "128K input",
        "modality": "text + image (VL)",
        "license": "open weights (Apache 2.0)",
        "headline": "阿里第三代开源旗舰，MoE 架构（235B 总参/22B 激活），首个开源支持 Thinking/Non-Thinking 模式切换的中国模型。",
        "benchmarks": [
            ("[[MMLU]] Pro", "约 80%"),
            ("[[AIME]] 2025 (thinking)", "约 81%"),
            ("[[GPQA]] (thinking)", "约 70%"),
            ("[[LiveCodeBench]]", "约 70%"),
        ],
        "predecessors": ["Qwen2.5"],
    },

    # ─── Moonshot Kimi 系列 ───
    {
        "slug": "Kimi-K2",
        "title": "Kimi K2",
        "developer": "[[Moonshot-AI]]",
        "release_date": "2025-07",
        "family": "Kimi",
        "context": "128K input",
        "modality": "text + image",
        "license": "open weights (limited)",
        "headline": "Moonshot 1T 参数 MoE 模型，主打长上下文与代码 Agent；在 SWE-bench 与 LiveCodeBench 等代码 benchmark 上对标 Claude/GPT-4o。",
        "benchmarks": [
            ("[[SWE-bench-Verified]] (Agentic)", "约 65.8%"),
            ("[[LiveCodeBench]]", "约 53.7%"),
            ("[[AIME]] 2025", "约 53.1%"),
            ("[[GPQA]] Diamond", "约 75.1%"),
        ],
        "predecessors": ["Kimi K1.5", "Moonshot v1"],
    },
    {
        "slug": "Kimi-K1.5",
        "title": "Kimi K1.5",
        "developer": "[[Moonshot-AI]]",
        "release_date": "2025-01",
        "family": "Kimi",
        "context": "128K input",
        "modality": "text + image",
        "license": "proprietary (API)",
        "headline": "Moonshot 推理模型，发布伴随的技术报告系统揭示 RL+长上下文推理训练方法；中国对标 o1 的标志性发布之一。",
        "benchmarks": [
            ("[[AIME]] 2024", "约 77.5%"),
            ("[[MATH]] 500", "96.2%"),
            ("[[Codeforces]] Elo", "94 percentile"),
            ("[[MMLU]]", "87.4%"),
        ],
        "predecessors": ["Moonshot v1"],
    },

    # ─── ByteDance Doubao 系列 ───
    {
        "slug": "Doubao-1.5-Pro",
        "title": "Doubao 1.5 Pro",
        "developer": "[[ByteDance-AI]]",
        "release_date": "2025-01",
        "family": "Doubao",
        "context": "32K-256K input",
        "modality": "text + image + audio + video",
        "license": "proprietary (API, 火山引擎)",
        "headline": "字节跳动豆包大模型 1.5 代旗舰，主推超低 API 价格策略；在中文场景评测中位列国内 top tier。",
        "benchmarks": [
            ("[[CMMLU]]", "约 88.3%"),
            ("[[C-Eval]]", "约 89.2%"),
            ("[[MATH]]", "约 78%"),
            ("[[MMLU]]", "约 82%"),
        ],
        "predecessors": ["Doubao 1.0 Pro"],
    },
    {
        "slug": "Doubao-Seed-1.6",
        "title": "Doubao Seed 1.6 / Seed-Thinking",
        "developer": "[[ByteDance-AI]]",
        "release_date": "2025-04 (Seed-Thinking-v1.5), 2025-06 (Seed 1.6)",
        "family": "Doubao Seed",
        "context": "256K input",
        "modality": "text + image + video",
        "license": "proprietary (API)",
        "headline": "字节 Seed 团队推理模型；多个版本中 Seed-Thinking-v1.5 配合 RLHF 在数学/代码上达到对标 o1 的水平。",
        "benchmarks": [
            ("[[AIME]] 2024 (Seed-Thinking)", "约 86.7%"),
            ("[[Codeforces]] Elo", "约 86.0 percentile"),
            ("[[GPQA]] Diamond", "约 77.3%"),
        ],
        "predecessors": ["Doubao 1.5 Pro"],
    },

    # ─── Meta Llama 系列 ───
    {
        "slug": "Llama-3.3-70B",
        "title": "Llama 3.3 70B",
        "developer": "[[Meta-AI]]",
        "release_date": "2024-12",
        "family": "Llama 3",
        "context": "128K input",
        "modality": "text",
        "license": "Llama 3 Community License (open weights)",
        "headline": "Meta 开源旗舰，70B 尺寸优化版，性能对标 Llama 3.1 405B 但成本显著降低；多语言能力扩展。",
        "benchmarks": [
            ("[[MMLU]]", "约 86%"),
            ("[[HumanEval]]", "约 88.4%"),
            ("[[MATH]]", "约 77%"),
            ("[[MGSM]]", "约 91.1%"),
        ],
        "predecessors": ["Llama 3.1 70B", "Llama 3.1 405B"],
    },
    {
        "slug": "Llama-4",
        "title": "Llama 4 (Maverick / Scout)",
        "developer": "[[Meta-AI]]",
        "release_date": "2025-04",
        "family": "Llama 4",
        "context": "10M input (Scout)",
        "modality": "text + image (native multimodal)",
        "license": "Llama 4 Community License (open weights)",
        "headline": "Meta 第四代开源模型，首个原生多模态 + 极长上下文（Scout 10M token）的开源大模型；MoE 架构。",
        "benchmarks": [
            ("[[MMLU]] Pro (Maverick)", "约 80.5%"),
            ("[[GPQA]] Diamond (Maverick)", "约 69.8%"),
            ("[[LiveCodeBench]]", "约 43.4%"),
            ("MMMU (Maverick)", "约 73.4%"),
        ],
        "predecessors": ["Llama 3.3"],
    },

    # ─── 01.AI Yi 系列（top tier 国产开源补充）───
    {
        "slug": "Yi-Lightning",
        "title": "Yi-Lightning",
        "developer": "[[01-AI]]",
        "release_date": "2024-10",
        "family": "Yi",
        "context": "16K-200K input",
        "modality": "text",
        "license": "proprietary + open variants",
        "headline": "01.AI 零一万物的旗舰推理模型；在 Chatbot Arena 上一度进入 Top 10，是国产模型在国际榜单的标志性进入。",
        "benchmarks": [
            ("[[Chatbot-Arena]] Elo", "1287 (top 10 at release)"),
            ("[[MMLU]]", "约 81%"),
            ("[[MATH]]", "约 75%"),
        ],
        "predecessors": ["Yi-Large"],
    },
]


TEMPLATE = """---
title: "{title}"
type: model
publish: true
confidence: draft
as_of_date: "{TODAY}"
last_verified: "{TODAY}"
sources: []
developer: "{developer_plain}"
release_date: "{release_date}"
family: "{family}"
context_length: "{context}"
modality: "{modality}"
license: "{license}"
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

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
{benchmarks_md}

> 数据来源：模型卡 / 技术报告 / 官方发布。准确数字以官方为准；本页仅作 wiki 参考。

## 前代/相关模型

{predecessors_md}

## 备注

本页基于官方公开材料整理，作为 wiki 索引；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。
"""


def render(m):
    benchmarks_md = "\n".join(f"| {b} | {s} |" for b, s in m["benchmarks"])
    predecessors_md = "\n".join(f"- {p}" for p in m.get("predecessors", [])) or "- 无"
    developer_plain = m["developer"].replace("[[", "").replace("]]", "")
    return TEMPLATE.format(
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
        headline=m["headline"],
        benchmarks_md=benchmarks_md,
        predecessors_md=predecessors_md,
    )


for m in MODELS:
    f = WIKI / f"{m['slug']}.md"
    f.write_text(render(m))
    print(f"  ✓ {m['slug']}")

print(f"\n共创建 {len(MODELS)} 个模型 Spec 页")
