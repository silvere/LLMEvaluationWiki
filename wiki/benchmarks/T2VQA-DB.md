---
title: "T2VQA-DB"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
year: 2024
arxiv_id: "2404.04990"
status: active
---

# T2VQA-DB

> 基于大规模人工标注的文本到视频质量评估数据库，用于开发和验证 T2V 自动质量评估模型。

## 概述

T2VQA-DB（Text-to-Video Quality Assessment Database）是 2024 年提出的专门针对文本生成视频质量感知评估的标注数据库与基准。不同于侧重语义对齐的 T2V 评测（如 FETV、EvalCrafter），T2VQA-DB 聚焦于**感知质量维度**，包括视频的清晰度、失真程度、自然度、技术缺陷等，更接近视频质量评估（VQA）领域的传统研究方向。

T2VQA-DB 收集了来自多个主流 T2V 模型（如 CogVideo、Make-A-Video、Imagen Video 等）生成的视频，为每个视频进行了细粒度的人工质量打分，最终建立了包含数千个带质量标签的视频的数据库。基于此数据库，可以训练和评估专门用于 T2V 视频感知质量预测的无参考质量评估模型（NR-VQA）。

T2VQA-DB 的价值在于为 T2V 质量评估提供了人类感知对齐的金标准数据，弥补了纯参考式指标（需要真实视频对比）在生成内容评估场景下的局限性。

## 任务格式

- **数据来源**：多个 T2V 模型（6+ 个主流模型）生成的视频，覆盖多种提示词类型
- **标注方式**：众包平台人工评分（MOS 平均意见分），5 点量表
- **评测维度**：技术质量（清晰度、运动模糊、压缩噪声）、内容质量（自然度、合理性）、综合质量
- **规模**：数千个标注视频样本

## 主要指标

- **SRCC**（Spearman Rank Correlation Coefficient）：自动质量预测分与 MOS 的等级相关系数
- **PLCC**（Pearson Linear Correlation Coefficient）：线性相关系数
- **RMSE**（Root Mean Square Error）：均方根误差
- 质量预测模型在 T2VQA-DB 测试集上的 SRCC/PLCC 是主要评测指标

## 局限性

- 人工 MOS 评分受标注者主观偏好影响，跨文化一致性存疑
- 数据库构建时间较早，未包含最新高质量 T2V 模型（如 Sora、Gen-3）
- 聚焦感知质量而非语义对齐，对文本提示词复杂性的覆盖不足

## 相关页面

- [[FETV]]
- [[EvalCrafter]]
- [[VBench]]
- [[VE-Bench]]
