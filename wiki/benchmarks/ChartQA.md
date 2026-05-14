---
title: "ChartQA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [multimodal]
language: en
year: 2022
authors: ["Ahmed Masry", "Do Xuan Long", "Jia Qing Tan", "Shafiq Joty", "Enamul Hoque"]
arxiv_id: "2203.10244"
official_url: "https://github.com/vis-nlp/ChartQA"
license: ""
size: 9608
format: open-ended
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2203.10244"
---

# ChartQA：图表理解视觉问答基准

## 概述

ChartQA 是 2022 年由 Masry 等人提出的图表理解视觉问答基准，发表于 ACL 2022 Findings。它专注于评测模型对**真实数据图表**（条形图、折线图、饼图等）的理解与推理能力，包含 **9,608 道**来自真实数据图表的问答对，是该领域规模最大、被引用最广的基准之一。

## 任务设计

ChartQA 的问题分为两类：

**人类生成问题（Human-written Questions）：**
- 由人工标注员基于图表自由提问，贴近真实用户需求
- 包含复杂推理问题，如趋势分析、比较、计算等
- 约 4,804 道

**模板生成问题（Augmented/Template Questions）：**
- 通过程序化模板批量生成
- 覆盖基础数值提取、排序、比例计算等
- 约 4,804 道

问题类型涵盖：
- 数值提取（Value Retrieval）
- 数值比较（Comparison）
- 趋势分析（Trend）
- 相关性判断
- 计算与推导

## 评分机制

ChartQA 采用**放松精确匹配（Relaxed Accuracy）**：对于数值型答案，允许 ±5% 的相对误差；对于文字型答案，采用精确字符串匹配。这种设计考虑了图表数值读取的自然误差，使评分更贴近实际需求。

## 数据特点

- 图表来源于 Statista、Pew Research、Our World in Data、OECD 等真实数据源
- 涵盖**条形图、折线图、饼图、散点图**等多种图表类型
- 每道题附有标准答案，部分题目有多个等价答案
- 数据集分为训练集（9,608）和测试集（1,250）

## 主要发现与局限

ChartQA 揭示了当时视觉语言模型在图表理解上的显著不足：
- 早期模型（如 VQA 系列）在 ChartQA 上准确率低于 20%
- 需要多步数值推理的问题是最大难点
- 专为图表设计的模型（如 MatCha）通过预训练图表数据显著提升了性能
- GPT-4V 等大型模型已能达到 80% 以上的放松准确率

主要局限在于题目主要覆盖英文图表；放松匹配的 5% 阈值在某些场景下可能过于宽松或严格；模板生成问题相对简单，无法全面考察深度推理。

## 参考文献

Masry, A., Long, D. X., Tan, J. Q., et al. (2022). ChartQA: A Benchmark for Question Answering about Charts with Visual and Logical Reasoning. *arXiv:2203.10244*. ACL 2022 Findings.
