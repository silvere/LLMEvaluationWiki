---
title: "EvalMuse-Alignment"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
year: 2024
arxiv_id: ""
status: active
---

# EvalMuse-Alignment

> 面向文本生成图像模型语义对齐能力的精细粒度评测基准。

## 概述

EvalMuse-Alignment 是 2024 年提出的文本生成图像（Text-to-Image, T2I）语义对齐评测基准，专注于评测 T2I 模型将文本描述中的语义信息准确映射到图像中的能力。与关注视觉质量（如 FID、IS）的传统 T2I 指标不同，EvalMuse-Alignment 深入评测模型对文本语义各个层次的理解和实现程度，包括属性绑定、数量理解、空间关系、动作描述等。

EvalMuse-Alignment 构建了一个多层次的语义对齐分类体系，将文本语义分解为实体（Entity）、属性（Attribute）、关系（Relation）、动作（Action）等基本语义单元，并为每类语义单元设计了专门的评测提示词和自动化评分方案。基准收集了来自多个主流 T2I 模型（DALL-E 3、Stable Diffusion XL、Midjourney 等）的生成图像，并配套了大规模人工标注数据。

EvalMuse-Alignment 的评测工具基于多模态大模型（如 GPT-4V、LLaVA）作为评判者，实现了低成本、可扩展的对齐质量评估，为 T2I 模型的语义对齐研究提供了系统性的方法论框架。

## 任务格式

- **输入**：包含多种语义元素的文本提示词（实体+属性+关系+动作组合）
- **输出**：T2I 模型生成的图像
- **语义层次**：实体完整性、属性绑定、空间关系、数量准确性、动作描述
- **规模**：数千个评测提示词，覆盖 5+ 语义类别
- **评判**：MLLM 自动评判 + 人工标注校验

## 主要指标

- **Alignment Score**（对齐得分）：生成图像与文本描述的综合语义匹配度
- **Attribute Binding Accuracy**：实体-属性正确对应的比例
- **Spatial Relation Score**：空间关系（左/右/上/下/前/后）的描述准确率
- **Counting Accuracy**：数量描述的精确匹配率
- 各语义层次分类报告

## 局限性

- MLLM 评判者本身的能力限制了评测精度上限
- 语义对齐标准的主观性，部分边界情况难以自动判断
- 主要针对英文提示词，中文 T2I 场景适用性有限

## 相关页面

- [[EvalCrafter]]
- [[T2V-CompBench]]
- [[VBench]]
