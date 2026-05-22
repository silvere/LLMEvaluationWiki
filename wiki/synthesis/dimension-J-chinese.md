---
title: "J 维度：中文评测"
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
derived_from: "所有 wiki/{benchmarks,tools,harnesses,leaderboards}/*.md 的 dimension=J frontmatter（由 build-synthesis-tables.ts 聚合）"
dimension: J
domain:
  - synthesis
---

# J 维度：中文评测

> ⚠️ **Draft 状态**：横向对比表由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension: J` 自动聚合（事实层 grounded）；下方决策入门段为 LLM 起草（Tier 1），仅供导航参考，未经领域专家正式审阅。

## 覆盖范围（Tier 1 框架）

中文 base / chat / 多模态 / 长文本 评测

## 决策入门段（Tier 1 LLM 起草 / opinion）

知识 + 推理：C-Eval / CMMLU / AGIEval / GAOKAO-Bench；综合：SuperCLUE / Xiezhi；专业：CMB（医疗）；多模态：CMMMU；retrieval：C-MTEB；榜单：CompassRank。

## 数据来源与生成方法

- **横向对比表**（下方 AUTO-SYN-TABLE 区块）：从 `wiki/{benchmarks,tools,harnesses,leaderboards}/*.md` 的 frontmatter `dimension: J` 字段自动聚合
- **覆盖范围 / 决策入门**：LLM 起草，未经审阅，可能有遗漏
- **维护**：改各单页 frontmatter → 跑 `npx tsx scripts/build-synthesis-tables.ts` 同步

<!-- AUTO-SYN-TABLE:dimension=J:START -->

## J 维度 中文评测（自动生成）

> 由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension:` 字段自动聚合。**维护方式：改各单页 frontmatter，不要手改本表。**

| Benchmark / Tool | 题量 | 年份 | 评测协议 | SOTA / 备注 | Saturation |
|---|---|---|---|---|---|
| [[C-Eval|C-Eval]] | 13948 | 2023 | — | 约 89.2%（Doubao-1.5-Pro） | — |
| [[Chinese-SimpleQA|Chinese SimpleQA]] | — | 2024 | — | — | — |

_共 2 条，最后更新：2026-05-22_

<!-- AUTO-SYN-TABLE:dimension=J:END -->

## 相关页面

- [[choose-math-benchmark]] · [[choose-code-benchmark]]
- [[benchmark-pitfalls-cheatsheet]]
- [[2026-eval-recommended-stack]]



