---
title: "L 维度：评测方法论 / Meta-eval Theory"
type: synthesis
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
review_status: "未审阅（LLM 起草 + 自动表）"
next_review_due: "2026-08-22"
sources:
  - "https://arxiv.org/abs/2406.04127"
  - "https://arxiv.org/abs/2305.17926"
derived_from: "wiki/{benchmarks,papers,concepts}/*.md 的 frontmatter dimension=L 聚合"
dimension: L
domain:
  - other
---

# L 维度：评测方法论 / Meta-eval Theory

> ⚠️ **Draft 状态**：本页 Tier 1 框架 + Tier 3 推荐为 LLM 起草未审阅；Tier 2 横向对比表由 `scripts/build-synthesis-tables.ts` 从单页 frontmatter 自动聚合。

## 覆盖范围（Tier 1 框架）

**L 维度**专注「评测**评测器**本身」的方法论与理论：
- **Contamination detection**：检测训练数据中是否泄露 benchmark
- **Saturation analysis**：判断 benchmark 是否已饱和（顶级模型 ≥ 90%）
- **Benchmark critique**：标签错误率 / 题目偏差 / 排名稳健性
- **Dynamic eval**：DynaBench / LiveBench / LiveCodeBench 等动态评测范式
- **Survey & theory**：评测领域的综述论文

## 决策入门段（Tier 1 LLM 起草 / opinion）

**评测 wiki 用户必读的方法论清单**：

1. **「Are We Done with MMLU?」([[2406.04127]])**：先看这篇，理解为什么纸面 SOTA 数据不可全信
2. **「LLMs are not Fair Evaluators」([[2305.17926]])**：用 LLM-as-judge 前必读，position bias 教科书
3. **[[benchmark-contamination]]**：训练数据污染检测的现状综述
4. **[[benchmark-saturation]]**：判定 benchmark 是否退役的标准

## 数据来源与生成方法

- **横向对比表**：从 `wiki/{benchmarks,papers,concepts,tools}/*.md` 的 frontmatter `dimension: L` 自动聚合
- **决策入门**：LLM 起草，未审阅
- **维护**：改各单页 frontmatter → 跑 `npx tsx scripts/build-synthesis-tables.ts`

<!-- AUTO-SYN-TABLE:dimension=L:START -->

## L 维度 评测方法论 / Meta-eval Theory（自动生成）

> 由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension:` 字段自动聚合。**维护方式：改各单页 frontmatter，不要手改本表。**

| Benchmark / Tool | 题量 | 年份 | 评测协议 | SOTA / 备注 | Saturation |
|---|---|---|---|---|---|
| [[2406.04127|Are We Done with MMLU?]] | — | 2024 | — | — | — |

_共 1 条，最后更新：2026-05-22_

<!-- AUTO-SYN-TABLE:dimension=L:END -->

## 相关页面

- [[2406.04127|Are We Done with MMLU?]] · [[2305.17926|LLMs are not Fair Evaluators]]
- [[benchmark-contamination]] · [[benchmark-saturation]] · [[evaluation-reproducibility-crisis]]
- [[benchmark-pitfalls-cheatsheet]]
- [[dimension-K-judge]]（Judge 维度与 Methodology 维度交集）
