---
title: "如何选择数学评测基准（决策树）"
type: synthesis
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
review_status: "未审阅（LLM 起草）"
next_review_due: "2026-08-19"
sources:
  - "https://arxiv.org/abs/2103.03874"
  - "https://artificialanalysis.ai/evaluations/aime"
  - "https://epoch.ai/benchmarks/frontier-math"
derived_from:
  - "wiki/benchmarks/MMLU.md"
  - "wiki/benchmarks/MATH.md"
  - "wiki/benchmarks/AIME.md"
  - "wiki/benchmarks/GPQA.md"
  - "wiki/benchmarks/FrontierMath.md"
  - "wiki/benchmarks/GSM8K.md"
domain:
  - synthesis
  - math
  - reasoning
---

# 如何选择数学评测基准（决策树）

> ⚠️ **Draft 状态**：本页对比表由 `scripts/build-synthesis-tables.ts` 从各 benchmark 单页 frontmatter 自动聚合，**事实层 grounded**；决策树形状与推荐组合为 LLM 起草 + 编辑判断，**未经领域专家正式审阅**，欢迎 PR / Issue 指正。

> 目标读者：在 LLM 评测中需要决定「我该跑哪个数学 benchmark」的工程师与研究员。本页给出当前可用的主流数学评测对比、选型决策树，以及各 benchmark 的关键 pitfall。

## 数据来源与生成方法（透明化）

| 内容 | Tier | 来源 | 可信度 |
|---|---|---|---|
| 横向对比表（题量、SOTA、saturation、pitfall） | **Tier 2 事实** | 自动从 `wiki/benchmarks/*.md` frontmatter aggregate（每月跑脚本） | ⭐⭐⭐⭐ 与单页一致 |
| 单页 frontmatter（sota / pitfalls / 协议） | **Tier 2 事实** | 各 benchmark 页用 WebSearch 核实 | ⭐⭐⭐ 视各页 confidence |
| 决策树结构（按场景分支） | **Tier 1 框架** | LLM 起草，基于 2026-05 主流实践 | ⭐⭐ 结构合理但非权威 |
| 推荐组合（"上面 + X + Y"） | **Tier 3 判断** | 编辑综合判断，可能有偏 | ⭐⭐ opinion，欢迎 PR |

**升级路径**：本页 confidence: draft → 经领域专家 spot-check 至少 5 处具体数字 + 决策树审阅后升 `reviewed` → 完整审阅 + 所有断言追溯后升 `promoted`。

## TL;DR — 决策

| 你的场景 | 推荐 benchmark | [Tier] 理由 |
|---|---|---|
| base model 数学综合 | [[GSM8K]] + [[MATH]]-500 | [opinion] 社区共识基线，但已饱和 |
| 推理模型 ablation | [[AIME]] 2025-2026 + 大量 maj@N | [opinion] 题量大 + 抗污染 |
| frontier 数学能力 | [[FrontierMath]] | [grounded] 顶级模型 o3 仅 ~25% |
| 中文数学 | C-Eval-math / CMMLU-math + GSM8K 中文版 | [opinion] |
| 形式化证明 | miniF2F / PutnamBench | [opinion] |
| 多模态数学 | [[MathVista]] | [opinion] |

## 决策树（[Tier 1] LLM 起草，未审阅）

```
你要评测的是 base LLM 还是 reasoning model？
│
├── base LLM（GPT-4o / Claude / Gemini Pro / Llama / Qwen base）
│   │
│   ├── 想报「公认基线」给学术圈看 → GSM8K + MATH-500
│   ├── 想测中文能力 → 加 C-Eval-math + CMMLU-math
│   └── 想测多模态数学（含图） → MathVista
│
└── reasoning model（o1 / R1 / Claude Thinking / QwQ）
    │
    ├── 主流对照 → AIME 2024+2025+2026（multi-seed maj@64）
    ├── 测「无法靠记忆」的真难度 → FrontierMath（私有 test set）
    ├── 大题量验证 → OmniMATH / Olympiads
    └── 形式化证明 → miniF2F-Lean4 / PutnamBench
```

<!-- AUTO-SYN-TABLE:domain=math:START -->

## 数学评测横向对比（自动生成）

> 由 `scripts/build-synthesis-tables.ts` 从各 benchmark 单页 frontmatter 自动聚合。**维护方式：改各 benchmark 页 frontmatter，不要手改本表。**

| Benchmark | 题量 | 年份 | 评测协议 | 当前 SOTA | Saturation | 主要 Pitfall |
|---|---|---|---|---|---|---|
| [[AIME|AIME]] | 30 | 1983 | 0-shot / exact-match accuracy（每题答案 0-9… | 100%（Kimi-K2.6） | 🟢 active | **年份混淆**：'AIME 88%' 没意义。AIME 2022 / 2023 / 2024 / 2025 / 2026 每年新题，污染程度不同，必须明确报… |
| [[FrontierMath|FrontierMath]] | 0 | 2024 | — | 约 25%（o3） | — | — |
| [[GSM8K|GSM8K]] | 8500 | 2021 | — | 约 95.8%（Qwen2.5-72B） | — | — |
| [[HLE|HLE]] | — | 2025 | — | 64.7%（Claude-Opus-4.7） | — | — |
| [[MATH|MATH]] | 12500 | 2021 | 0-shot 或 4-shot CoT（推理模型默认 0-shot） / exact-match accuracy（数值答案对比） | 97.3%（DeepSeek-R1） | 🔴 saturated | **MATH ≠ MATH-500**：原 MATH 12,500 题、MATH-500 是 OpenAI o1 引入的 500 题子集，分数差异较大，跨论文… |
| [[MathVision|MathVision]] | — | 2024 | — | 88.6（Qwen3.5） | — | — |
| [[MGSM|MGSM]] | 2500 | 2023 | — | 约 91.1%（Llama-3.3-70B） | — | — |
| [[AIME24|AIME 2024]] | 30 | 2024 | — | — | — | — |
| [[AMC23|AMC23]] | 60 | 2023 | — | — | — | — |
| [[AQuA|AQuA]] | — | 2017 | — | — | — | — |
| [[ARB|ARB]] | 0 | 2023 | — | — | — | — |
| [[CMM-Math|CMM-Math]] | — | 2024 | — | — | — | — |
| [[CNMO-2024|CNMO 2024]] | — | 2024 | — | — | — | — |
| [[DROP|DROP]] | 96567 | 2019 | — | — | — | — |
| [[FinQA|FinQA]] | — | 2021 | — | — | — | — |
| [[FormalMATH|FormalMATH]] | — | 2025 | — | — | — | — |
| [[GAOKAO-Bench|GAOKAO-Bench]] | — | 2023 | — | — | — | — |
| [[GeoQA|GeoQA]] | — | 2021 | — | — | — | — |
| [[LiveBench|LiveBench]] | — | 2024 | — | — | — | — |
| [[LiveMathBench|LiveMathBench]] | 0 | 2024 | — | — | — | — |
| [[MATH500|MATH500]] | 500 | 2023 | — | — | — | — |
| [[MathBench|MathBench]] | 3709 | 2024 | — | — | — | — |
| [[MathIF|MathIF]] | — | 2025 | — | — | — | — |
| [[MathVerse|MathVerse]] | 2612 | 2024 | — | — | — | — |
| [[MathVista|MathVista]] | 6141 | 2023 | — | — | — | — |
| [[Minerva|Minerva]] | 0 | 2022 | — | — | — | — |
| [[OlympiadBench|OlympiadBench]] | 8952 | 2024 | — | — | — | — |
| [[OmniMath|OmniMath]] | 4428 | 2024 | — | — | — | — |
| [[PolyMath|PolyMath]] | 0 | 2024 | — | — | — | — |
| [[PRM-Bench|PRM-Bench]] | — | 2025 | — | — | — | — |
| [[Putnam|Putnam]] | 0 | 2024 | — | — | — | — |
| [[SciBench|SciBench]] | 295 | 2023 | — | — | — | — |
| [[TheoremQA|TheoremQA]] | 800 | 2023 | — | — | — | — |

_共 33 个 benchmark，最后更新：2026-05-22_

<!-- AUTO-SYN-TABLE:domain=math:END -->

## 推荐组合（[Tier 3] 编辑判断，可能有偏）

**通用 LLM 发布报告**：GSM8K + MATH-500 + MMLU-math + AIME 2024 maj@1

**推理模型对照**：AIME 2024 maj@64 + AIME 2025 + GPQA + FrontierMath + HLE

**中文模型**：上面 + C-Eval-math + CMMLU-math + GSM8K 中文版

**多模态模型**：上面 + MathVista + We-Math

**最严格 ablation**：FrontierMath（私有）+ AIME 2026（最新）+ miniF2F-Lean4

## 已知失效组合 / 不推荐

- ❌ 只报 GSM8K：已饱和，无信息量
- ❌ 只报 AIME 单次 pass@1：方差大，结论不可信
- ❌ AIME 不报年份：跨论文无法比较
- ❌ 不区分 MATH / MATH-500：分数差异 5-10pt
- ❌ 不报 sampling 协议（pass@1 vs maj@N）：差异巨大

## 相关页面

- [[GSM8K]] · [[MATH]] · [[AIME]] · [[FrontierMath]] · [[MMLU]] · [[GPQA]]
- [[benchmark-saturation]] · [[benchmark-contamination]]
- [[inference-time-scaling]]
- [[choose-code-benchmark]]
- [[benchmark-pitfalls-cheatsheet]]
