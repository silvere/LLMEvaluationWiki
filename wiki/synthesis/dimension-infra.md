---
title: "评测基础设施（横切维度）"
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
derived_from: "所有 wiki/{benchmarks,tools,harnesses,leaderboards}/*.md 的 dimension=infra frontmatter（由 build-synthesis-tables.ts 聚合）"
dimension: infra
domain:
  - synthesis
---

# 评测基础设施（横切维度）

> ⚠️ **Draft 状态**：横向对比表由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension: infra` 自动聚合（事实层 grounded）；下方决策入门段为 LLM 起草（Tier 1），仅供导航参考，未经领域专家正式审阅。

## 覆盖范围（Tier 1 框架）

推理引擎 / model serving / 加速框架（**非评测工具本身**，是评测时被依赖的基础设施）

## 决策入门段（Tier 1 LLM 起草 / opinion）

推理：vLLM / SGLang / TGI（HuggingFace）/ TensorRT-LLM（NVIDIA）；本类不直接是评测工具，但所有 evaluation harness 几乎都需依赖其一加速；评测结果对推理后端敏感（temperature / sampling 实现差异）。

## 数据来源与生成方法

- **横向对比表**（下方 AUTO-SYN-TABLE 区块）：从 `wiki/{benchmarks,tools,harnesses,leaderboards}/*.md` 的 frontmatter `dimension: infra` 字段自动聚合
- **覆盖范围 / 决策入门**：LLM 起草，未经审阅，可能有遗漏
- **维护**：改各单页 frontmatter → 跑 `npx tsx scripts/build-synthesis-tables.ts` 同步

<!-- AUTO-SYN-TABLE:dimension=infra:START -->

## 评测基础设施（横切维度）（自动生成）

> 由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension:` 字段自动聚合。**维护方式：改各单页 frontmatter，不要手改本表。**

| Benchmark / Tool | 题量 | 年份 | 评测协议 | SOTA / 备注 | Saturation |
|---|---|---|---|---|---|
| [[SGLang|SGLang]] | — | — | — | — | — |
| [[vLLM|vLLM]] | — | — | — | — | — |

_共 2 条，最后更新：2026-05-22_

<!-- AUTO-SYN-TABLE:dimension=infra:END -->

## 相关页面

- [[choose-math-benchmark]] · [[choose-code-benchmark]]
- [[benchmark-pitfalls-cheatsheet]]
- [[2026-eval-recommended-stack]]



