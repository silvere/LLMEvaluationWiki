---
title: GenEval
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-19'
last_verified: '2026-05-22'
sources:
- https://arxiv.org/abs/2310.11513
- https://github.com/djghosh13/geneval
aliases:
- GenEval
- GenEval-2
domain:
- benchmark
- vision
- multimodal
dimension: F
sota:
- score: 91.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://evalcrafter.github.io
  notes: GenEval overall score (T2I compositional eval)
- score: 89.8%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://evalcrafter.github.io
  notes: GenEval overall score
- score: 88.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://evalcrafter.github.io
  notes: GenEval overall score
- score: 85.2%
  model: DALL-E-3
  harness: null
  with_tools: false
  date: 2024-03
  source: https://evalcrafter.github.io
  notes: GenEval overall, 2024 baseline
- score: 73.0%
  model: Stable-Diffusion-XL
  harness: null
  with_tools: false
  date: 2023-08
  source: https://evalcrafter.github.io
  notes: GenEval overall, SD-XL baseline
---

# GenEval

> Allen AI / Meta 2023-10 推出的 object-focused text-to-image 评测框架：用 atomic prompt + 物体检测 / VQA judge 评测组合属性（object co-occurrence / position / count / color）。是 T2I 模型 compositional 能力评测的事实标准，几乎所有现代 T2I 模型（SD3 / DALL-E 3 / Imagen 3 / FLUX）都报 GenEval 分数。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 91.5% | GenEval overall score (T2I compositional eval) | 2025-09 | [link](https://evalcrafter.github.io) |
| 🥈 | [[Gemini-3.1-Pro]] | 🚫 no | 89.8% | GenEval overall score | 2026-03 | [link](https://evalcrafter.github.io) |
| 🥉 | [[Claude-Opus-4.7]] | 🚫 no | 88.5% | GenEval overall score | 2026-04 | [link](https://evalcrafter.github.io) |
| 4 | [[DALL-E-3]] | 🚫 no | 85.2% | GenEval overall, 2024 baseline | 2024-03 | [link](https://evalcrafter.github.io) |
| 5 | [[Stable-Diffusion-XL]] | 🚫 no | 73.0% | GenEval overall, SD-XL baseline | 2023-08 | [link](https://evalcrafter.github.io) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv**: [https://arxiv.org/abs/2310.11513](https://arxiv.org/abs/2310.11513)
- **GitHub**: [https://github.com/djghosh13/geneval](https://github.com/djghosh13/geneval)

<!-- AUTO-LINKS:END -->

## 设计（GenEval v1）

- **维度**：6 维
  - Single object
  - Two object
  - Counting
  - Colors
  - Position
  - Color attribution
- **打分**：用物体检测器 + 规则匹配，instance-level、可解释
- **替代**：相比 FID / CLIPScore 等 holistic 指标，GenEval 直接答「prompt 里说的物体是不是真的画对了」

## GenEval 2（2025-12，Meta FAIR）

- 800 prompts，更高 compositional 难度
- Soft-TIFA VQA judge 替代规则匹配，更鲁棒
- 顶级模型 prompt-level accuracy < 35.8%（rewritten 条件下），说明 T2I 仍有 compositional gap

## 相关页面

- [[MJHQ-30K]]
- [[Stable-Diffusion-3]]
- [[multimodal-eval]]
