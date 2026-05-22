---
title: T2I-CompBench
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-19'
last_verified: '2026-05-22'
sources:
- https://arxiv.org/abs/2307.06350
aliases:
- T2I-CompBench
- T2ICompBench
- T2I-CompBench++
domain:
- benchmark
- vision
- multimodal
dimension: F
subdimension: T2I
sota:
- score: 78.5%
  model: DALL-E-3
  harness: null
  with_tools: false
  date: 2024-03
  source: https://karine-t.github.io/T2I-CompBench/
  notes: T2I-CompBench compositional alignment score
- score: 76.2%
  model: Stable-Diffusion-3
  harness: null
  with_tools: false
  date: 2024-06
  source: https://karine-t.github.io/T2I-CompBench/
  notes: alignment score
- score: 74.5%
  model: Midjourney-v6
  harness: null
  with_tools: false
  date: 2024-03
  source: https://karine-t.github.io/T2I-CompBench/
  notes: alignment score
- score: 72.0%
  model: Ideogram-2
  harness: null
  with_tools: false
  date: 2024-09
  source: https://karine-t.github.io/T2I-CompBench/
  notes: alignment score
- score: 68.5%
  model: SDXL
  harness: null
  with_tools: false
  date: 2023-08
  source: https://karine-t.github.io/T2I-CompBench/
  notes: alignment score, baseline
---

# T2I-CompBench

> 2023-07 由 HKU / Microsoft 等发布的 text-to-image compositional 评测：6,000 个 prompt，分 3 类 compositional 能力 ×（attribute binding / object relationships / complex composition）。是与 [[GenEval]] 并列的 T2I compositional 评测主流，T2I-CompBench++（2024）扩展到更复杂的多模态场景。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[DALL-E-3]] | 🚫 no | 78.5% | T2I-CompBench compositional alignment score | 2024-03 | [link](https://karine-t.github.io/T2I-CompBench/) |
| 🥈 | [[Stable-Diffusion-3]] | 🚫 no | 76.2% | alignment score | 2024-06 | [link](https://karine-t.github.io/T2I-CompBench/) |
| 🥉 | [[Midjourney-v6]] | 🚫 no | 74.5% | alignment score | 2024-03 | [link](https://karine-t.github.io/T2I-CompBench/) |
| 4 | [[Ideogram-2]] | 🚫 no | 72.0% | alignment score | 2024-09 | [link](https://karine-t.github.io/T2I-CompBench/) |
| 5 | [[SDXL]] | 🚫 no | 68.5% | alignment score, baseline | 2023-08 | [link](https://karine-t.github.io/T2I-CompBench/) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv**: [https://arxiv.org/abs/2307.06350](https://arxiv.org/abs/2307.06350)

<!-- AUTO-LINKS:END -->

## 设计

- **3 大类 + 6 子任务**：
  - **Attribute Binding**：color / shape / texture
  - **Object Relationships**：spatial / non-spatial
  - **Complex Composition**：多对象 + 多属性 + 多关系
- **打分**：BLIP-VQA / UniDet / CLIPScore / 3-in-1 综合指标

## 与 GenEval 关系

- [[GenEval]] 更短小、agent-like 评测（atomic property checks）
- T2I-CompBench 更全面，关注 attribute binding 等 GenEval 较少覆盖维度
- 现代 T2I 论文通常两者都报

## 相关页面

- [[GenEval]]
- [[MJHQ-30K]]
- [[Stable-Diffusion-3]]
- [[multimodal-eval]]
