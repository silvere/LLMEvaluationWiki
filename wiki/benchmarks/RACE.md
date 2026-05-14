---
title: "RACE (ReAding Comprehension from Examinations)"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [knowledge, reasoning]
language: en
year: 2017
authors: ["Guokun Lai", "Qizhen Cai", "Yingqi Qu", "Hang Li", "Danqi Chen"]
arxiv_id: "1704.04683"
official_url: "https://www.cs.cmu.edu/~glai1/data/race/"
license: ""
size: 97687
format: multiple-choice
status: active
saturation_threshold: 0.90
sources:
  - "Lai, G., et al. (2017). RACE: Large-scale ReAding Comprehension Dataset From Examinations. EMNLP 2017."
---

# RACE（ReAding Comprehension from Examinations）

## 概述

RACE 是由卡内基梅隆大学于 2017 年发布的大规模阅读理解基准，全称 ReAding Comprehension from Examinations。其数据来源于中国中学和高中英语考试题目，包含约 28,000 篇文章和 97,687 道题目，是早期规模最大的阅读理解数据集之一。

## 数据来源与构成

RACE 的题目由英语教师为中国学生精心设计，具有以下特点：

- **来源**：中国中学（RACE-M，Middle school）和高中（RACE-H，High school）英语考试
- **文章规模**：平均每篇约 300 词，涵盖新闻、故事、科普等多种题材
- **题目类型**：每篇文章对应 4 道四选一选择题

| 子集     | 文章数   | 题目数  |
|----------|---------|---------|
| RACE-M   | ~6,400  | ~25,000 |
| RACE-H   | ~21,800 | ~72,000 |
| 合计     | ~28,000 | ~97,000 |

## 任务设计

模型需阅读给定段落，然后回答关于段落内容的选择题。相比同期的 SQuAD 等抽取式问答数据集，RACE 的特点在于：

- **需要推理**：大量题目不能直接从原文定位答案，需要对多处信息综合推断
- **四选一格式**：标准多项选择，干扰项质量较高
- **词汇难度**：面向中国考生设计，词汇和语法符合标准英语学习曲线

题目类型包括：细节理解、主旨大意、推断判断、词义辨析、填写空白等。

## 评测指标

主要使用准确率（Accuracy）作为评测指标，分别报告 RACE-M、RACE-H 和整体 RACE 的准确率。人类基线约为 94.5%，早期深度学习模型在 RACE-H 上仅约 44-50%。

## 历史意义与影响

RACE 在发布时是最大规模的阅读理解数据集，推动了以下几方面研究：

1. **推理能力评测**：证明了仅靠词汇匹配无法解决的阅读理解任务的重要性
2. **迁移学习基础**：成为 BERT、RoBERTa 等预训练模型微调阶段的重要数据集
3. **派生数据集**：启发了 RACE+ 等扩展版本，以及针对不同语言和教育背景的类似数据集

## 局限性

- 数据来自中国考试，题目风格和文化背景较为单一
- 高中试题（RACE-H）的难度与真实世界推理场景存在一定差距
- 随着大型语言模型的发展，该基准已接近饱和（顶级模型准确率超过 90%）
- 作为静态数据集，存在训练集污染风险

## 相关基准

- **ReClor**：来自法律/研究生入学考试的更难阅读理解题目
- **QuALITY**：长文档多选阅读理解，专注于长上下文理解
- **MultiRC**：多句子推理阅读理解
