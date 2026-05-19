---
title: "GenEval"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://arxiv.org/abs/2310.11513"
  - "https://github.com/djghosh13/geneval"
aliases:
  - GenEval
  - GenEval-2
domain:
  - benchmark
  - vision
  - multimodal
---

# GenEval

> Allen AI / Meta 2023-10 推出的 object-focused text-to-image 评测框架：用 atomic prompt + 物体检测 / VQA judge 评测组合属性（object co-occurrence / position / count / color）。是 T2I 模型 compositional 能力评测的事实标准，几乎所有现代 T2I 模型（SD3 / DALL-E 3 / Imagen 3 / FLUX）都报 GenEval 分数。

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
