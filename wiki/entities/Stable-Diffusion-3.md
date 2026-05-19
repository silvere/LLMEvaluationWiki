---
title: "Stable Diffusion 3"
type: entity
entity_type: model
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://stability.ai/news/stable-diffusion-3"
  - "https://arxiv.org/abs/2403.03206"
aliases:
  - SD3
  - Stable-Diffusion-3
  - Stable Diffusion 3
  - SD3-Medium
domain:
  - entity
---

# Stable Diffusion 3（SD3）

> Stability AI 2024-02 公开技术报告 / 2024-06 开源 Medium 权重的 text-to-image 扩散模型。采用 MM-DiT（Multimodal Diffusion Transformer）+ Rectified Flow，800M~8B 多档参数，是 [[GenEval]] / [[MJHQ-30K]] 等 T2I 评测的标准对照模型之一。

## 技术要点

- **架构**：MM-DiT（Diffusion Transformer，类 DiT）
- **训练目标**：Rectified Flow（替代传统 DDPM noise schedule）
- **参数档**：800M / 2B（Medium，开源）/ 8B（Large，云服务）
- **文本编码**：CLIP + T5 双 encoder，长 prompt 理解能力大幅提升

## 评测表现

- **[[GenEval]]**：在 single/two object / counting / colors 上显著超越 SDXL
- **[[MJHQ-30K]]**：FID 与 aesthetic score 处于第一梯队
- **prompt following**：长 prompt + 文字渲染（OCR-style text in image）方面接近 DALL-E 3

## 历史

- 2024-02：技术报告（Rectified Flow Transformers for High-Resolution Image Synthesis）
- 2024-06：SD3-Medium 开源
- 2024-10：SD3.5 / FLUX.1 等竞争模型抢占开源生态

## 相关页面

- [[GenEval]]
- [[MJHQ-30K]]
- [[multimodal-eval]]
