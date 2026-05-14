---
title: "CLUEWSC"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - reasoning
  - multilingual
year: 2020
arxiv_id: ""
status: active
---

# CLUEWSC

> 中文自然语言推理基准 CLUE 中的 Winograd 代词消歧子任务，测试模型对中文句子中代词指代关系的理解能力。

## 概述

CLUEWSC（Chinese Language Understanding Evaluation Winograd Schema Challenge）是 CLUE（Chinese Language Understanding Evaluation）基准套件的一部分，于 2020 年随 CLUE 整体发布。该任务是中文版本的 Winograd Schema Challenge（WSC），专门评测模型对**中文代词消歧**的理解能力。

Winograd Schema Challenge 的核心挑战在于：代词的正确指代需要依赖常识知识和语境推理，而非单纯的句法规则。例如，"市长拒绝给示威者发放游行许可证，因为他们害怕暴力"——此处"他们"指的是"市长"还是"示威者"？正确解析需要理解不同群体的典型行为动机。

CLUEWSC 基于中文文本构建，针对中文语法特点（如代词使用频率相对较低、但指代歧义仍普遍存在）进行了本地化设计，是评测中文大语言模型常识推理与语言理解能力的重要子任务。

## 任务格式

- 二元分类任务：给定句子和一个代词，判断该代词指代哪个候选实体（A 或 B）
- 部分版本为多选题形式
- 数据集规模：约 1,244 条（CLUE 标准版本）
- 题目均为中文句子，融合常识与语境推理

## 主要指标

- **准确率**（二元分类准确率）：主要指标，随机基线为 50%

## 局限性

- 数据集规模较小（约 1,244 条），统计稳定性有限。
- 部分题目的常识背景隐含文化假设，对不同文化背景的模型存在偏差。
- 随着大模型性能快速提升，高分模型在此类任务上趋于饱和，区分度下降。

## 相关页面

- [[XBench]]
- [[AlignBench]]
- [[C-Eval]]
