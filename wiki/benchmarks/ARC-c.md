---
title: "ARC-Challenge"
aliases:
  - ARC-c
  - ARC-Challenge
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - knowledge
  - reasoning
year: 2018
arxiv_id: "1803.05457"
status: saturated
---

# ARC-Challenge（ARC-c）

> ARC（AI2 Reasoning Challenge）数据集中的困难子集，包含约 1,172 道无法通过简单检索或词频方法回答的科学推理题，是评测中小型语言模型推理能力的经典基准。

## 概述

ARC-Challenge（常缩写为 ARC-c）是 [[ARC]] 数据集的困难子集。ARC 由 Clark 等人于 2018 年发布，来自 Allen Institute for AI（AI2），完整数据集包含约 7,787 道美国小学至初中科学考试题，分为 Easy（ARC-e）和 Challenge（ARC-c）两个子集。

ARC-Challenge 子集的筛选标准是：题目对于两类简单基线系统（基于检索的系统和基于词频的系统）均无法答对，因此这些题目需要真正的推理能力而非表面统计模式匹配。子集包含约 1,172 道测试题，覆盖物理、化学、生物、地球科学等基础科学领域，全为四选一多选题格式。

ARC-Challenge 长期被用于评测中小型语言模型（7B-13B 参数级别）的科学推理能力，也是 Open LLM Leaderboard（v1 版本）六项核心基准之一。随着 LLM 规模快速增长，顶级大模型（GPT-4、Claude 3 等）在 ARC-c 上的准确率已超过 90%，基准趋于饱和，但对于评测轻量级开源模型仍有参考价值。

注：本页面为 ARC-Challenge 子集的专用页面，完整数据集信息（含 ARC-Easy）详见 [[ARC]] 页面。

## 任务格式

- 格式：四选一多选题（multiple-choice, 4 options）
- 数据规模：约 1,172 道测试题（另有训练集约 1,119 道、验证集约 299 道）
- 领域：科学知识与推理（物理、化学、生物、地球科学）
- 语言：英文

## 主要指标

- **准确率（Accuracy）**：四选一多选，随机基线 25%
- 顶级模型（2024-2025 年）：> 90%

## 局限性

- **已接近饱和**：前沿大模型准确率超过 90%，对顶级模型的区分力极低
- **题目难度上限不足**：即使是 Challenge 子集，对大模型而言仍偏简单
- **知识范围局限**：仅限美国K-8科学知识，深度和广度均有限

## 相关页面

- [[ARC]]
- [[ARC-e]]
- [[MMLU]]
- [[HellaSwag]]
- [[OpenBookQA]]
