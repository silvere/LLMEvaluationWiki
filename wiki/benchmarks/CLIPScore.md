---
title: "CLIPScore"
type: benchmark
dimension: F
subdimension: metric
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://arxiv.org/abs/2104.08718"
aliases:
  - CLIPScore
  - CLIP-Score
arxiv_id: "2104.08718"
year: 2021
domain:
  - vision
---

# CLIPScore

> 基于 CLIP 视觉-语言对齐模型的**文图匹配评测指标**，用于衡量文本-图像生成的语义一致性（text-image alignment）。无需参考图像（reference-free），是 T2I 生成评测的基础自动化指标之一。

## 设计

- **核心**：计算生成图像 embedding 与文本 prompt embedding 的余弦相似度
- **RefCLIPScore**：有参考图像时的增强版（与参考图像和文本双向对比）
- **局限**：对细粒度语义（数量、颜色、空间关系）不敏感；与人类判断相关性中等

## 替代 / 补充指标

- [[VQAScore]]：更强的文图对齐评估（基于 VQA 模型）
- [[PickScore]]：人类偏好对齐
- FID / IS：分布级生成质量

## 相关页面

- [[VQAScore]]
- [[PickScore]]
- [[HEIM]]
- [[VBench]]
