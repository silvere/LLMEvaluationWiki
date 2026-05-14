---
title: "ARC-Easy"
aliases:
  - ARC-e
  - ARC-Easy
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - knowledge
year: 2018
arxiv_id: "1803.05457"
status: saturated
---

# ARC-Easy（ARC-e）

> ARC（AI2 Reasoning Challenge）数据集中的简单子集，包含约 5,197 道可通过检索或词频方法回答的科学知识题，现代 LLM 在此子集上已接近满分。

## 概述

ARC-Easy（常缩写为 ARC-e）是 [[ARC]] 数据集的简单子集。ARC 由 Clark 等人于 2018 年发布，来自 Allen Institute for AI（AI2）。ARC-Easy 包含约 5,197 道测试题，这些题目的特征是：至少有一种简单基线系统（基于检索或词频统计）能够正确回答，因此代表了相对直接的科学知识问题。

题目同样来自美国小学至初中科学考试，格式为四选一多选题，覆盖物理、化学、生物、地球科学等基础科学领域。ARC-Easy 与 ARC-Challenge 共同构成完整的 ARC 数据集，两者使用相同的题目来源和格式，区别仅在于筛选标准——Easy 子集中的题目对早期检索系统来说是"可解的"。

对于现代语言模型，ARC-Easy 已基本饱和：7B 级别的开源模型通常即可达到 80%+ 的准确率，顶级模型接近 95%+。因此，ARC-Easy 在当前 LLM 评测报告中较少单独使用，更多作为 ARC 整体的一部分出现，或用于评测轻量级边缘部署模型的基础知识能力。

注：本页面为 ARC-Easy 子集的专用页面，完整数据集信息（含 ARC-Challenge）详见 [[ARC]] 页面。

## 任务格式

- 格式：四选一多选题（multiple-choice, 4 options）
- 数据规模：约 5,197 道测试题（另有训练集约 2,251 道、验证集约 570 道）
- 领域：科学知识（物理、化学、生物、地球科学）
- 语言：英文

## 主要指标

- **准确率（Accuracy）**：四选一多选，随机基线 25%
- 7B 级开源模型：约 80%+
- 顶级模型（2024-2025 年）：> 95%

## 局限性

- **严重饱和**：现代 LLM 在此子集上已接近天花板，基本失去区分力
- **仅适用于轻量级模型评测**：对于参数量较大的模型，ARC-Easy 分数无实质意义
- **任务单一**：全为选择题，无法测试生成能力

## 相关页面

- [[ARC]]
- [[ARC-c]]
- [[MMLU]]
- [[HellaSwag]]
- [[OpenBookQA]]
