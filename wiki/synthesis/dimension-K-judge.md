---
title: "K 维度：Judge 校准 / Meta-evaluation"
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
derived_from: "所有 wiki/{benchmarks,tools,harnesses,leaderboards}/*.md 的 dimension=K frontmatter（由 build-synthesis-tables.ts 聚合）"
dimension: K
domain:
  - synthesis
---

# K 维度：Judge 校准 / Meta-evaluation

> ⚠️ **Draft 状态**：横向对比表由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension: K` 自动聚合（事实层 grounded）；下方决策入门段为 LLM 起草（Tier 1），仅供导航参考，未经领域专家正式审阅。

## 覆盖范围（Tier 1 框架）

评测 LLM-as-Judge / Reward Model 自身的准确性与稳健性

## 决策入门段（Tier 1 LLM 起草 / opinion）

Judge benchmark：RewardBench / JudgeBench / LLMBar / MT-Bench Human Judgments；开源 Judge 模型：Prometheus 2 / JudgeLM / PandaLM / Auto-J / Themis / CompassJudger。Judge 评测要同时看 accuracy + position bias + length bias。

## 数据来源与生成方法

- **横向对比表**（下方 AUTO-SYN-TABLE 区块）：从 `wiki/{benchmarks,tools,harnesses,leaderboards}/*.md` 的 frontmatter `dimension: K` 字段自动聚合
- **覆盖范围 / 决策入门**：LLM 起草，未经审阅，可能有遗漏
- **维护**：改各单页 frontmatter → 跑 `npx tsx scripts/build-synthesis-tables.ts` 同步

<!-- AUTO-SYN-TABLE:dimension=K:START -->

## K 维度 Judge 校准 / Meta-evaluation（自动生成）

> 由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension:` 字段自动聚合。**维护方式：改各单页 frontmatter，不要手改本表。**

| Benchmark / Tool | 子类 | 题量 | 年份 | SOTA / 备注 | Saturation |
|---|---|---|---|---|---|
| [[Auto-J|Auto-J]] | judge-model | — | — | — | — |
| [[CompassJudger|CompassJudger-1]] | judge-model | — | — | — | — |
| [[JudgeBench|JudgeBench]] | judge-benchmark | — | — | — | — |
| [[JudgeLM|JudgeLM]] | judge-model | — | — | — | — |
| [[LLMBar|LLMBar]] | judge-benchmark | — | — | — | — |
| [[PandaLM|PandaLM]] | judge-model | — | — | — | — |
| [[Prometheus|Prometheus]] | judge-model | — | — | — | — |
| [[Prometheus|Prometheus 2]] | judge-model | — | — | — | — |
| [[RewardBench|RewardBench]] | judge-benchmark | — | — | — | — |
| [[Themis|Themis]] | judge-model | — | — | — | — |

_共 10 条，最后更新：2026-05-22_

<!-- AUTO-SYN-TABLE:dimension=K:END -->

## 相关页面

- [[choose-math-benchmark]] · [[choose-code-benchmark]]
- [[benchmark-pitfalls-cheatsheet]]
- [[2026-eval-recommended-stack]]

- [[RewardBench]] · [[JudgeBench]] · [[Prometheus]] · [[llm-as-judge]]

