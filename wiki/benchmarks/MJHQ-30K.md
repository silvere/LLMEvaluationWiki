---
title: "MJHQ-30K"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://huggingface.co/datasets/playgroundai/MJHQ-30K"
  - "https://playground.com/blog/playground-v2"
aliases:
  - MJHQ-30K
  - MJHQ
domain:
  - benchmark
  - vision
  - multimodal
---

# MJHQ-30K

> Playground AI 2023-12 随 Playground v2 模型一起发布的图像生成美学评测：30K 张来自 Midjourney 的高质量图像（10 类 × 3K），用 FID + aesthetic + CLIP score 三指标评估 text-to-image 模型的「美感」。是工业界 T2I 模型 launch 时常报的对照表。

<!-- AUTO-LINKS:START -->

## 参考链接

- **Hugging Face**: [https://huggingface.co/datasets/playgroundai/MJHQ-30K](https://huggingface.co/datasets/playgroundai/MJHQ-30K)
- **官网**: [https://playground.com/blog/playground-v2](https://playground.com/blog/playground-v2)

<!-- AUTO-LINKS:END -->

## 设计

- **数据**：30K Midjourney 高质量图像
- **类别**：10 类（animals / art / fashion / food / indoor / landscape / logo / people / plants / vehicles），每类 3K
- **分辨率**：1024×1024
- **指标**：
  - **FID**（per-category + overall）—— 美学相似度
  - **Aesthetic Score** —— LAION aesthetic predictor
  - **CLIP Score** —— image-text alignment

## 意义

- 验证「人类偏好与 FID 在高质量参考集上正相关」，让 FID 重新成为合理评测信号
- Playground / Stable Diffusion 3 / FLUX 等模型 release 时几乎默认报告 MJHQ-30K FID
- 是 [[GenEval]] / [[T2I-CompBench]] 等 compositional benchmark 的美学补集

## 相关页面

- [[Stable-Diffusion-3]]
- [[GenEval]]
- [[multimodal-eval]]
