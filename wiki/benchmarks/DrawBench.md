---
title: "DrawBench"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
year: 2022
arxiv_id: ""
status: active
---

# DrawBench

> Google 提出的文本到图像生成评测基准，通过 11 类挑战性提示词和人工评估衡量 T2I 模型的图文对齐和生成质量。

## 概述

DrawBench 由 Google Brain 于 2022 年随 Imagen 模型论文（arXiv:2205.11487）发布，是文本到图像生成领域最具影响力的早期评测基准之一。该基准由 200 条精心设计的文本提示词组成，覆盖 11 类已知的 T2I 生成挑战场景，用于系统评测生成模型在各类困难情况下的表现。

DrawBench 的评测采用**人工并排比较（Human Side-by-Side Evaluation）**方法：评估者看到两个不同模型对同一提示词生成的图像，选择哪个更好（考虑图文一致性和图像质量两个维度）。Google 使用 DrawBench 系统性地证明了 Imagen 在多项评测维度上优于 DALL-E 2、GLIDE、Stable Diffusion 等竞品。

尽管 DrawBench 规模较小，但其 11 类挑战维度的设计框架（颜色绑定、文字渲染、罕见词理解等）对后续 T2I 评测基准的设计产生了深远影响，被广泛引用为 T2I 评测的重要参照。

## 任务格式

- **提示词数量**：200 条文本提示词
- **挑战类别**：11 类，包括：
  - 颜色（Colors）、计数（Counting）、冲突场景（Conflicting）
  - DALL-E 挑战（源自 DALL-E 论文的困难案例）、描述（Descriptions）
  - 文字渲染（Text）、比较（Comparisons）、Gary Marcus 案例
  - 句子结构（Reddit sentences）、稀有词（Rare words）
  - 位置关系（Positional）
- **评测方式**：人工并排比较（非自动化指标）
- **评分标准**：评估者在图文一致性（Alignment）和图像质量（Fidelity）上的偏好比例

## 主要指标

- **人工偏好率（Human Preference Rate）**：在各类提示词上，评估者偏好某模型的比例
- **整体偏好对比**：两个模型的图文一致性和图像质量的整体人工偏好对比
- **分类表现**：11 个挑战类别的分类人工评估结果

## 局限性

- 全依赖人工评估，成本高昂且难以大规模重复，不同论文间结果可比性有限
- 仅 200 条提示词，统计可靠性有限
- 人工评估者的背景和评估标准可能存在差异，影响跨研究比较

## 相关页面
- [[T2I-CompBench++]]
- [[Commonsense-T2I]]
- [[GenAI-Bench]]
