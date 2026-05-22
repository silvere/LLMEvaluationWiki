---
title: "H 维度：代码能力评测"
type: synthesis
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
review_status: "未审阅（LLM 起草 + 自动表）"
next_review_due: "2026-08-22"
sources:
  - "https://crfm.stanford.edu/helm/"
  - "https://lmarena.ai/"
derived_from: "所有 wiki/{benchmarks,tools,harnesses,leaderboards}/*.md 的 dimension=H frontmatter（由 build-synthesis-tables.ts 聚合）"
dimension: H
domain:
  - synthesis
---

# H 维度：代码能力评测

> ⚠️ **Draft 状态**：横向对比表由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension: H` 自动聚合（事实层 grounded）；下方决策入门段为 LLM 起草（Tier 1），仅供导航参考，未经领域专家正式审阅。

## 覆盖范围（Tier 1 框架）

函数级 + 仓库级 + agent 编程 + 代码理解

## 决策入门段（Tier 1 LLM 起草 / opinion）

函数级（已饱和）：HumanEval+ / MBPP+ / EvalPlus / MultiPL-E；防污染：LiveCodeBench（按时间窗）；仓库级 agent：SWE-bench-Verified（必报 scaffold）+ SWE-bench-Pro；代码理解：BigCodeBench / CRUXEval；多语言代码：MultiPL-E。

## 数据来源与生成方法

- **横向对比表**（下方 AUTO-SYN-TABLE 区块）：从 `wiki/{benchmarks,tools,harnesses,leaderboards}/*.md` 的 frontmatter `dimension: H` 字段自动聚合
- **覆盖范围 / 决策入门**：LLM 起草，未经审阅，可能有遗漏
- **维护**：改各单页 frontmatter → 跑 `npx tsx scripts/build-synthesis-tables.ts` 同步

<!-- AUTO-SYN-TABLE:dimension=H:START -->

## H 维度 代码能力（自动生成）

> 由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension:` 字段自动聚合。**维护方式：改各单页 frontmatter，不要手改本表。**

| Benchmark / Tool | 题量 | 年份 | 评测协议 | SOTA / 备注 | Saturation |
|---|---|---|---|---|---|
| [[Aider-Polyglot|Aider Polyglot]] | — | 2024 | — | 76.8%（Claude-Opus-4.7） | — |
| [[APPS|APPS]] | 10000 | 2021 | — | 94.2%（GPT-5） | — |
| [[BFCL|BFCL]] | — | 2024 | — | 97.8%（GPT-5） | — |
| [[BigCodeBench|BigCodeBench]] | 1140 | 2024 | — | 74.5%（Claude-Opus-4.7） | — |
| [[Codeforces|Codeforces]] | — | 2024 | — | 3206（DeepSeek-V4-Pro） | — |
| [[CRUXEval|CRUXEval]] | 800 | 2024 | — | 96.2%（Claude-Opus-4.7） | — |
| [[HumanEval|HumanEval]] | 164 | 2021 | 0-shot / pass@k（k 通常为 1，最初论文用 pass@1/1… | 96.3%（Claude-Opus-4.7） | 🔴 saturated |
| [[LiveBench|LiveBench]] | — | 2024 | — | 92.6%（GPT-5） | — |
| [[LiveCodeBench|LiveCodeBench]] | 600 | 2024 | 0-shot / pass@1（部分变体支持 pass@5） | 91.7%（Gemini-3.1-Pro） | 🟢 active |
| [[MBPP|MBPP]] | 974 | 2021 | — | 94.9%（o4-mini） | — |
| [[MBPP-Plus|MBPP+]] | 974 | 2023 | — | 97.2%（GPT-5） | — |
| [[Multi-SWE-bench|Multi-SWE-bench]] | — | 2025 | — | 42.5%（Claude-Opus-4.7） | — |
| [[MultiPL-E|MultiPL-E]] | — | 2022 | — | 87.5%（Claude-Opus-4.7） | — |
| [[SWE-bench|SWE-bench]] | 2294 | 2023 | — | 61.2%（Claude-Opus-4.7） | — |
| [[SWE-bench-Lite|SWE-bench Lite]] | 300 | 2023 | — | 72.8%（Claude-Opus-4.7） | — |
| [[SWE-bench-Pro|SWE-bench Pro]] | — | 2025 | — | 48.2%（Claude-Opus-4.7） | — |
| [[SWE-bench-Verified|SWE-bench Verified]] | 500 | 2024 | agent-driven / % resolved (patch passes ALL … | 93.9%（Claude-Opus-4.7） | 🟢 active |
| [[BIRD|BIRD]] | 12751 | 2023 | — | — | — |
| [[CanItEdit|CanItEdit]] | — | 2023 | — | — | — |
| [[ClassEval|ClassEval]] | — | 2023 | — | — | — |
| [[CodeApex|CodeApex]] | — | 2023 | — | — | — |
| [[CodeContests|CodeContests]] | 13610 | 2022 | — | — | — |
| [[DS-1000|DS-1000]] | 1000 | 2022 | — | — | — |
| [[Effibench|Effibench]] | — | 2024 | — | — | — |
| [[EvalPerf|EvalPerf]] | 0 | 2024 | — | — | — |
| [[EvoEval|EvoEval]] | 0 | 2024 | — | — | — |
| [[FairCoder|FairCoder]] | — | 2025 | — | — | — |
| [[FullStackBench|FullStackBench]] | — | 2024 | — | — | — |
| [[HumanEval-V|HumanEval-V]] | — | 2024 | — | — | — |
| [[HumanEval-X|HumanEval-X]] | 820 | 2023 | — | — | — |
| [[HumanEval-XL|HumanEval-XL]] | — | 2024 | — | — | — |
| [[HumanEvalPack|HumanEvalPack]] | 984 | 2023 | — | — | — |
| [[InterCode|InterCode]] | 0 | 2023 | — | — | — |
| [[IT-Bench|IT-Bench]] | — | 2025 | — | — | — |
| [[LCB|LCB]] | — | 2024 | — | — | — |
| [[McEval|McEval]] | — | 2024 | — | — | — |
| [[ML-Bench|ML-Bench]] | — | 2024 | — | — | — |
| [[MLE-Bench|MLE-Bench]] | — | 2024 | — | — | — |
| [[PaperBench|PaperBench]] | — | 2025 | — | — | — |
| [[Plot2Code|Plot2Code]] | — | 2024 | — | — | — |
| [[SciCode|SciCode]] | 338 | 2024 | — | — | — |
| [[Spider|Spider]] | 10181 | 2018 | — | — | — |
| [[SUPER|SUPER]] | — | 2024 | — | — | — |
| [[SWE-Lancer|SWE-Lancer]] | — | 2025 | — | — | — |
| [[SWT-Bench|SWT-Bench]] | — | 2024 | — | — | — |
| [[TDD-Bench-Verified|TDD-Bench Verified]] | — | 2024 | — | — | — |
| [[TheAgentCompany|TheAgentCompany]] | — | 2024 | — | — | — |

_共 47 条，最后更新：2026-05-22_

<!-- AUTO-SYN-TABLE:dimension=H:END -->

## 相关页面

- [[choose-math-benchmark]] · [[choose-code-benchmark]]
- [[benchmark-pitfalls-cheatsheet]]
- [[2026-eval-recommended-stack]]



