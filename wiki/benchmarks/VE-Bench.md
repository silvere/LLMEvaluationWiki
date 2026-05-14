---
title: "VE-Bench"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
year: 2024
arxiv_id: "2410.05765"
status: active
---

# VE-Bench

> 专门评测 AI 视频编辑模型质量的综合性基准，覆盖编辑精度、内容保留和感知质量三维度。

## 概述

VE-Bench（Video Editing Benchmark）是 2024 年提出的视频编辑质量评测基准，填补了视频编辑（Video Editing）这一细分任务缺乏系统性评测标准的空白。与文本生成视频（T2V）评测不同，视频编辑任务要求模型在保留原始视频核心内容（背景、结构、时序）的同时，按照编辑指令精确修改指定元素（更换风格、改变对象属性、局部替换等）。

VE-Bench 包含 600 个视频编辑任务，涵盖 4 种主要编辑类型：风格迁移（Style Transfer）、对象替换（Object Replacement）、属性编辑（Attribute Editing）和动作修改（Action Modification）。对每种编辑类型，基准分别设计了专门的评测指标，兼顾编辑效果的准确性和原始内容的保留程度。

VE-Bench 还构建了配套的 VE-Judge 自动评判模型，基于预训练视频理解模型，对编辑结果进行细粒度打分，其评判结果与人工偏好标注有较强的相关性。

## 任务格式

- **输入**：原始视频 + 自然语言编辑指令（如"将背景改为雪景"）
- **输出**：视频编辑模型生成的编辑后视频
- **规模**：600 个编辑任务，4 种编辑类型（每类 150 个）
- **参考对比**：部分任务提供人工编辑的参考视频
- **自动评判**：VE-Judge 模型打分 + 传统指标（PSNR、SSIM、LPIPS）

## 主要指标

- **Edit Accuracy**（编辑准确率）：编辑指令指定的修改是否被正确执行
- **Content Preservation**（内容保留度）：非编辑区域与原视频的一致性（PSNR/SSIM）
- **Perceptual Quality**（感知质量）：编辑后视频的视觉自然度和流畅性
- **VE-Judge Score**：VE-Judge 自动评判模型的综合得分

## 局限性

- 视频编辑的"正确性"本身存在主观性，金标准难以定义
- 600 个任务规模有限，复杂的跨场景编辑类型覆盖不足
- 依赖 VE-Judge 自动评判，对新型编辑方式的泛化能力有待验证

## 相关页面

- [[VBench]]
- [[EvalCrafter]]
- [[T2VQA-DB]]
