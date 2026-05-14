---
title: "PerceptionTest"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
  - reasoning
year: 2023
arxiv_id: "2305.13786"
status: active
---

# PerceptionTest

> DeepMind 提出的视频感知技能综合测试基准，通过精心设计的日常视频评测模型的记忆、抽象、物理、语义等多类感知技能。

## 概述

PerceptionTest 由 Google DeepMind 于 2023 年提出，是一个全面评测视频理解模型感知技能的综合基准。与大多数视频基准使用互联网自然视频不同，PerceptionTest 使用**专门为评测目的拍摄**的受控视频，由真实人类演员按照标准化脚本演示日常生活活动，从而精确控制评测变量。

该基准在设计上受到认知科学的启发，将视频感知能力分解为多个可独立测量的感知技能维度（记忆、抽象、物理直觉、语义理解等），并通过视觉问答（VQA）、时序动作定位（TAL）、点追踪（Point Tracking）三种任务形式来评测这些技能。这种设计使研究者能够精准定位模型在哪类感知技能上存在不足。

PerceptionTest 发布时附带了完整的训练集和评测集，支持监督学习和零样本评测两种模式，是视频感知研究领域的重要基础性资源。

## 任务格式

- **视频数量**：约 11,600 段受控拍摄视频
- **任务类型**：
  - **视觉问答（VQA）**：关于视频中事件和对象的多选题
  - **时序动作定位（TAL）**：标注动作起止时间戳
  - **点追踪（Point Tracking）**：追踪视频中指定像素点的运动轨迹
- **感知技能**：记忆（Memory）、抽象（Abstraction）、物理（Physics）、语义（Semantics）四大类 × 多个子技能
- **问题格式**：多项选择（VQA）和时序标注（TAL/Tracking）
- **语言**：英文

## 主要指标

- **VQA 准确率**：多选题总体及各感知技能类别准确率
- **TAL mAP**：时序动作定位的平均精度（mAP）
- **Tracking 指标**：点追踪的 Jaccard 距离和时序稳定性

## 局限性

- 受控拍摄视频与真实世界视频存在域差异，模型性能可能无法完全迁移到野外视频
- 点追踪等底层感知任务与高层语义理解的评测框架融合带来了不均衡性
- 视频内容来自英语文化背景，跨文化泛化性有限

## 相关页面
- [[MVBench]]
- [[TempCompass]]
- [[VideoMME]]
