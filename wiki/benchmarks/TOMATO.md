---
title: "TOMATO"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
year: 2024
arxiv_id: "2406.16871"
status: active
---

# TOMATO

> 时序视频定位综合评测基准，涵盖多种时序推理场景，测试多模态模型的精细时序理解能力。

## 概述

TOMATO（Temporal Ordering, Motional Alignment, and Temporal Awareness Observations）于 2024 年发布，是专为评测多模态大语言模型**细粒度时序视频理解**能力设计的综合基准。TOMATO 包含多种时序推理子任务，涵盖动作顺序判断、运动方向识别、时间点问答、时序关系推断等。

与 EgoSchema 等长视频理解基准不同，TOMATO 更侧重于**精细时序感知**——即模型能否准确理解"哪个动作先发生""这个动作持续了多久""物体在 T 时刻处于什么位置"等时序精度要求较高的问题。

TOMATO 通过系统化的子任务设计，分别测试模型的时序排序（ordering）、运动对齐（motion alignment）和时序感知（temporal awareness）三种能力维度，为时序推理能力的细粒度分析提供了有力工具。

## 任务格式

- 多类时序推理子任务（动作排序、运动方向、时间点 QA、时序关系等）
- 主要为多选题（MCQ）
- 视频输入 + 自然语言问题
- 包含验证集和测试集

## 主要指标

- **整体准确率**：全部题目的正确率
- **各子任务准确率**：时序排序、运动对齐、时序感知分项得分

## 局限性

- 时序理解的评测高度依赖视频帧的采样策略，不同模型的帧采样设置差异可能导致比较不公平。
- 部分时序推理题目与视频内容的语言描述有较强绑定，语言理解能力可能掩盖真正的视觉时序推理能力。
- 数据集的场景多样性和规模仍有提升空间。

## 相关页面

- [[EgoSchema]]
- [[CharadesSTA]]
- [[TVBench]]
