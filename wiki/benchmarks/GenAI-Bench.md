---
title: "GenAI-Bench"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
year: 2024
arxiv_id: "2406.13743"
status: active
---

# GenAI-Bench

> 由 Adobe Research 提出的生成式 AI 评测基准，专门评测文生图和文生视频模型在细粒度语义对齐（Compositional Prompt Following）上的能力，强调模型是否能忠实遵循复杂的组合性文本描述。

## 概述

GenAI-Bench（2024，Adobe Research）是针对文生图（T2I）和文生视频（T2V）模型的统一评测基准，聚焦于**复杂组合性提示的语义对齐能力**。现有 T2I/T2V 评测往往使用简单单概念提示（如"一只猫"），难以区分模型在多概念、属性绑定、空间关系、计数等复杂语义上的差异。

GenAI-Bench 通过设计 1600+ 条包含复杂组合关系的提示词（如"左侧一只橙色猫坐在木桌旁，桌上有三本蓝色书"），测试模型是否能在生成图像/视频中忠实地将所有概念、属性和关系都正确呈现。评测采用 VQA（视觉问答）自动评分和人类偏好评分两种方式，并发现 VQA 评分与人类偏好高度相关。

基准版本 v1（图像）和 v1.1（扩展至视频）均已发布，是评测多模态生成模型组合语义对齐能力的主要标准之一。

## 任务格式

- **题目总量**：1600+ 条生成提示（图像）+ 扩展视频子集
- **提示类型**：单属性、多属性绑定、计数、空间关系、动作等 6 类组合复杂度
- **评估方式**：VQA 自动评分（每条提示对应多个验证性问题）+ 人类偏好评分
- **模型范围**：DALL-E 3、Stable Diffusion 系列、Imagen、Sora 等主流生成模型

## 主要指标

- **VQA Score**：基于视觉问答模型逐问题评分的综合对齐得分
- **Human Preference Score**：人类评估员对图像/视频质量的偏好评分
- **Compositional Accuracy**：在不同组合复杂度类别上的分项得分

## 局限性

- VQA 评分依赖视觉问答模型的质量，对该模型的错误有传播效应
- 提示的"复杂性"定义主观，评测重点为英文提示，多语言场景覆盖不足
- 视频版本（v1.1）的人类偏好数据较图像版本规模小

## 相关页面

- [[DrawBench]]
- [[T2I-CompBench++]]
- [[EvalCrafter]]
- [[T2V-CompBench]]
