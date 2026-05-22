---
title: "ELLA"
type: benchmark
dimension: F
subdimension: T2I
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://arxiv.org/abs/2403.05135"
  - "https://ella-diffusion.github.io/"
aliases:
  - ELLA
  - ELLA-diffusion
arxiv_id: "2403.05135"
year: 2024
domain:
  - vision
---

# ELLA

> **Efficient Large Language Model Adapter for T2I**：将大型语言模型（LLM）注入扩散模型文本编码器的适配器方法，提升文生图对复杂 prompt（含多对象、属性绑定、空间关系）的理解能力。[[DPG-Bench]] 等 T2I 评测常以 ELLA 作为强基线。

## 设计

- **核心**：LLM 作为强力文本编码器 → Temporal Self-Attention 适配器注入 UNet
- **训练**：只训练适配器，冻结 LLM + 扩散模型主体（参数高效）
- **优势**：对长 prompt / 多属性描述的语义对齐显著改进

## 评测圈意义

- 是 [[DPG-Bench]] / T2I-CompBench++ 的常见对比基线
- 展示「LLM + 扩散模型」融合路径

## 相关页面

- [[DPG-Bench]]
- [[HEIM]]
- [[VQAScore]]
- [[CLIPScore]]
