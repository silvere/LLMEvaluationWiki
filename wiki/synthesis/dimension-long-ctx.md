---
title: "长上下文评测（横切维度）"
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
derived_from: "所有 wiki/{benchmarks,tools,harnesses,leaderboards}/*.md 的 dimension=long-ctx frontmatter（由 build-synthesis-tables.ts 聚合）"
dimension: long-ctx
domain:
  - synthesis
---

# 长上下文评测（横切维度）

> ⚠️ **Draft 状态**：横向对比表由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension: long-ctx` 自动聚合（事实层 grounded）；下方决策入门段为 LLM 起草（Tier 1），仅供导航参考，未经领域专家正式审阅。

## 覆盖范围（Tier 1 框架）

32K-1M+ token context 下的 retrieval / reasoning / generation 能力

## 决策入门段（Tier 1 LLM 起草 / opinion）

合成召回：NIAH / Sequential-NIAH；系统化：RULER / HELMET / BABILong；真实下游任务：LongBench v2 / InfiniteBench / L-Eval / LooGLE；视频长上下文：InfiniBench / Video-MME 长视频子集。

## 数据来源与生成方法

- **横向对比表**（下方 AUTO-SYN-TABLE 区块）：从 `wiki/{benchmarks,tools,harnesses,leaderboards}/*.md` 的 frontmatter `dimension: long-ctx` 字段自动聚合
- **覆盖范围 / 决策入门**：LLM 起草，未经审阅，可能有遗漏
- **维护**：改各单页 frontmatter → 跑 `npx tsx scripts/build-synthesis-tables.ts` 同步

<!-- AUTO-SYN-TABLE:dimension=long-ctx:START -->

## 长上下文（横切维度）（自动生成）

> 由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension:` 字段自动聚合。**维护方式：改各单页 frontmatter，不要手改本表。**

| Benchmark / Tool | 题量 | 年份 | 评测协议 | SOTA / 备注 | Saturation |
|---|---|---|---|---|---|
| [[CLongEval|CLongEval]] | 0 | 2024 | — | — | — |
| [[FRAMES|FRAMES]] | — | 2024 | — | — | — |
| [[HELMET|HELMET]] | 0 | 2024 | — | — | — |
| [[L-Eval|L-Eval]] | 411 | 2023 | — | — | — |
| [[LOFT|LOFT]] | — | 2024 | — | — | — |
| [[LRA|Long Range Arena (LRA)]] | — | — | — | — | — |
| [[LongBench|LongBench]] | 4750 | 2023 | — | — | — |
| [[LongBench-v2|LongBench v2]] | 0 | 2024 | — | — | — |
| [[LongVideoBench|LongVideoBench]] | — | 2024 | — | — | — |
| [[LVBench|LVBench]] | — | 2024 | — | — | — |
| [[LVOmniBench|LVOmniBench]] | — | 2026 | — | — | — |
| [[MLVU|MLVU]] | — | 2024 | — | — | — |
| [[MMLongBench|MMLongBench-Doc]] | — | 2024 | — | — | — |
| [[MMNeedle|MMNeedle]] | — | 2024 | — | — | — |
| [[NeedleInAHaystack|Needle In A Haystack]] | 0 | 2023 | — | — | — |
| [[NIAH|Needle in a Haystack (NIAH)]] | — | — | — | — | — |
| [[NeedleBench|NeedleBench]] | — | 2024 | — | — | — |
| [[OpenAI-MRCR|OpenAI-MRCR]] | — | 2025 | — | — | — |
| [[QuALITY|QuALITY]] | 2523 | 2022 | — | — | — |
| [[RULER|RULER]] | 0 | 2024 | — | — | — |
| [[SCROLLS|SCROLLS]] | 0 | 2022 | — | — | — |
| [[Zero-SCROLLS|Zero-SCROLLS]] | 0 | 2023 | — | — | — |

_共 22 条，最后更新：2026-05-22_

<!-- AUTO-SYN-TABLE:dimension=long-ctx:END -->

## 相关页面

- [[choose-math-benchmark]] · [[choose-code-benchmark]]
- [[benchmark-pitfalls-cheatsheet]]
- [[2026-eval-recommended-stack]]



