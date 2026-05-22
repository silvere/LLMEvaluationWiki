---
title: "Observability / 商业评测平台（横切维度）"
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
derived_from: "所有 wiki/{benchmarks,tools,harnesses,leaderboards}/*.md 的 dimension=obs frontmatter（由 build-synthesis-tables.ts 聚合）"
dimension: obs
domain:
  - synthesis
---

# Observability / 商业评测平台（横切维度）

> ⚠️ **Draft 状态**：横向对比表由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension: obs` 自动聚合（事实层 grounded）；下方决策入门段为 LLM 起草（Tier 1），仅供导航参考，未经领域专家正式审阅。

## 覆盖范围（Tier 1 框架）

production LLM 应用的 tracing / logging / 持续评测 / prompt 管理 / 实验编排

## 决策入门段（Tier 1 LLM 起草 / opinion）

开源：Langfuse / Arize Phoenix / OpenLLMetry / Helicone；商业：LangSmith / Braintrust / Weave (W&B) / Comet Opik / Confident-AI / Patronus / Galileo / Fiddler；通用 monitoring：Datadog / Evidently。

## 数据来源与生成方法

- **横向对比表**（下方 AUTO-SYN-TABLE 区块）：从 `wiki/{benchmarks,tools,harnesses,leaderboards}/*.md` 的 frontmatter `dimension: obs` 字段自动聚合
- **覆盖范围 / 决策入门**：LLM 起草，未经审阅，可能有遗漏
- **维护**：改各单页 frontmatter → 跑 `npx tsx scripts/build-synthesis-tables.ts` 同步

<!-- AUTO-SYN-TABLE:dimension=obs:START -->

## Observability / 商业评测平台（横切维度）（自动生成）

> 由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension:` 字段自动聚合。**维护方式：改各单页 frontmatter，不要手改本表。**

| Benchmark / Tool | 题量 | 年份 | 评测协议 | SOTA / 备注 | Saturation |
|---|---|---|---|---|---|
| [[Langfuse|Langfuse]] | — | — | — | — | — |
| [[Patronus|Patronus AI]] | — | — | — | — | — |
| [[Weave|Weave (W&B)]] | — | — | — | — | — |

_共 3 条，最后更新：2026-05-22_

<!-- AUTO-SYN-TABLE:dimension=obs:END -->

## 相关页面

- [[choose-math-benchmark]] · [[choose-code-benchmark]]
- [[benchmark-pitfalls-cheatsheet]]
- [[2026-eval-recommended-stack]]



