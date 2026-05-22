---
title: "DPG-Bench"
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
  - DPG-Bench
  - Dense Prompt Graph Benchmark
arxiv_id: "2403.05135"
official_url: "https://ella-diffusion.github.io/"
license: "Research"
org: "Tencent ELLA"
domain:
  - multimodal
  - vision
---

# DPG-Bench（Dense Prompt Graph Benchmark）

> Tencent ELLA 团队 2024-03 随 ELLA（Efficient LLM Adapter for diffusion）一起发布的 T2I 评测：**1,000 个 dense prompt**（每个 prompt 含大量物体 / 属性 / 关系），强测模型在复杂 prompt 下的语义对齐能力。是 [[GenEval]] / [[T2I-CompBench]] 之外针对「长 prompt」的关键补充。

## 设计

- **1,000 dense prompts**：每个含 5-15 个物体 / 属性 / 关系约束
- **VQA-based 评测**：将 prompt 拆成 atomic question，用 VLM 检查每个约束是否被满足
- **指标**：dense prompt 满足率（百分比）

## SOTA 节选

- ELLA + SD-XL：~85%
- Skywork UniPic：85.5
- SD3 / FLUX 系列：~80% 区间（具体看版本）

## 评测圈意义

- 揭示「短 prompt 95%」≠「长 prompt 65%」的能力 cliff
- 推动 T2I 模型对**长指令理解**的优化（与 LLM CoT 类比）
- 是 [[ELLA]] / [[Skywork-UniPic]] / [[FLUX]] 等模型论文的标配对照

## 已知 pitfall

- VQA judge 质量上限决定评分上限（VLM 自身误差 5-10pt）
- 1,000 prompt 中难度不均，宏平均易被简单题拉高
- prompt 由英文为主，跨语言泛化性有限

## 相关页面

- [[GenEval]]
- [[T2I-CompBench]]
- [[HEIM]]
- [[GenAI-Bench]]
- [[multimodal-eval]]
