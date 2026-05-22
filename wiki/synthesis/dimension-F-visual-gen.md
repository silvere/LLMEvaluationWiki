---
title: "F 维度：视觉生成（图像/视频/I2V）评测 —— 业务核心"
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
derived_from: "所有 wiki/{benchmarks,tools,harnesses,leaderboards}/*.md 的 dimension=F frontmatter（由 build-synthesis-tables.ts 聚合）"
dimension: F
domain:
  - synthesis
---

# F 维度：视觉生成（图像/视频/I2V）评测 —— 业务核心

> ⚠️ **Draft 状态**：横向对比表由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension: F` 自动聚合（事实层 grounded）；下方决策入门段为 LLM 起草（Tier 1），仅供导航参考，未经领域专家正式审阅。

## 覆盖范围（Tier 1 框架）

T2I + T2V + I2V + image edit + 偏好模型 + 经典指标，按 subdimension 五分组

## 决策入门段（Tier 1 LLM 起草 / opinion）

T2I 综合：HEIM / ImagenHub / GenEval / T2I-CompBench / DPG-Bench / MJHQ-30K；T2V：VBench / EvalCrafter / T2V-CompBench / VMBench；I2V：VBench-I2V；偏好模型：PickScore / HPSv2 / ImageReward；alignment 指标：VQAScore / GenAI-Bench；经典：clean-fid / FVD / torchmetrics。

## 数据来源与生成方法

- **横向对比表**（下方 AUTO-SYN-TABLE 区块）：从 `wiki/{benchmarks,tools,harnesses,leaderboards}/*.md` 的 frontmatter `dimension: F` 字段自动聚合
- **覆盖范围 / 决策入门**：LLM 起草，未经审阅，可能有遗漏
- **维护**：改各单页 frontmatter → 跑 `npx tsx scripts/build-synthesis-tables.ts` 同步

<!-- AUTO-SYN-TABLE:dimension=F:START -->

## F 维度 视觉生成（图像 / 视频 / I2V）（自动生成）

> 由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension:` 字段自动聚合。**维护方式：改各单页 frontmatter，不要手改本表。**

| Benchmark / Tool | 子类 | 题量 | 年份 | SOTA / 备注 | Saturation |
|---|---|---|---|---|---|
| [[VBench-I2V|VBench-I2V]] | I2V | — | — | — | — |
| [[VQAScore|VQAScore]] | metric | — | — | — | — |
| [[HPSv2|HPSv2]] | preference | — | — | — | — |
| [[ImageReward|ImageReward]] | preference | — | — | — | — |
| [[PickScore|PickScore]] | preference | — | — | — | — |
| [[Commonsense-T2I|Commonsense-T2I]] | T2I | — | 2024 | — | — |
| [[DPG-Bench|DPG-Bench]] | T2I | — | — | — | — |
| [[EvalMuse-40K|EvalMuse-40K]] | T2I | — | — | — | — |
| [[GenAI-Bench|GenAI-Bench]] | T2I | — | 2024 | — | — |
| [[HEIM|HEIM]] | T2I | — | — | — | — |
| [[ImageNet-1K|ImageNet-1K]] | T2I | — | 2012 | — | — |
| [[ImageNet-A|ImageNet-A]] | T2I | — | 2021 | — | — |
| [[ImageNet-R|ImageNet-R]] | T2I | — | 2021 | — | — |
| [[ImageNet-Sketch|ImageNet-Sketch]] | T2I | — | 2019 | — | — |
| [[ImageNet-V2|ImageNet-V2]] | T2I | — | 2019 | — | — |
| [[ImagenHub|ImagenHub]] | T2I | — | — | — | — |
| [[MJHQ-30K|MJHQ-30K]] | T2I | — | — | — | — |
| [[T2I-CompBench|T2I-CompBench]] | T2I | — | — | — | — |
| [[T2I-CompBench++|T2I-CompBench++]] | T2I | — | 2024 | — | — |
| [[Step-Video-T2V-Eval|Step-Video-T2V-Eval]] | T2V | — | 2025 | — | — |
| [[T2V-CompBench|T2V-CompBench]] | T2V | — | 2024 | — | — |
| [[T2VQA-DB|T2VQA-DB]] | T2V | — | 2024 | — | — |
| [[DrawBench|DrawBench]] | — | — | 2022 | — | — |
| [[EvalCrafter|EvalCrafter]] | — | — | 2024 | — | — |
| [[GenEval|GenEval]] | — | — | — | — | — |
| [[MVBench|MVBench]] | — | — | 2023 | — | — |
| [[OVBench|OVBench]] | — | — | 2024 | — | — |
| [[TVBench|TVBench]] | — | — | 2024 | — | — |
| [[VBench|VBench]] | — | — | 2023 | — | — |
| [[VBench-2.0|VBench-2.0]] | — | — | 2025 | — | — |

_共 30 条，最后更新：2026-05-22_

<!-- AUTO-SYN-TABLE:dimension=F:END -->

## 相关页面

- [[choose-math-benchmark]] · [[choose-code-benchmark]]
- [[benchmark-pitfalls-cheatsheet]]
- [[2026-eval-recommended-stack]]
- [[VBench]] · [[HEIM]] · [[GenEval]] · [[T2I-CompBench]] · [[MJHQ-30K]] · [[Stable-Diffusion-3]]


