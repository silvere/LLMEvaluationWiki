---
title: "BoolQ"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning, knowledge]
language: en
year: 2019
authors: ["Clark et al."]
arxiv_id: "1905.10044"
official_url: "https://github.com/google-research-datasets/boolean-questions"
license: "CC-BY-SA-3.0"
size: 15942
format: multiple-choice
status: active
saturation_threshold: 0.90
sources: []
---

# BoolQ（Boolean Questions）

> 基于真实搜索查询的是非题数据集，每题附有相关文章段落，测试阅读理解与判断能力。

## 概述

BoolQ 由 Clark 等人于 2019 年提出，来自 Google Research。数据集的核心特点是**自然性**——题目均来自真实用户在 Google 搜索中提出的是非问题，因此具有很高的现实意义和多样性。每道题由三部分组成：一个是非疑问句（question）、一段相关 Wikipedia 文章段落（passage），以及答案（True/False）。

与许多人工构造的基准不同，BoolQ 的问题是在用户不知道答案的情况下自然提出的，这确保了题目的真实性和挑战性。即使有辅助段落，许多问题也需要深层推理而非简单的文本匹配。

BoolQ 是 SuperGLUE 基准的组成任务之一，被广泛用于评测语言模型的阅读理解和自然语言推理能力。数据集分为训练集（约 9,427）、验证集（约 3,270）和测试集（约 3,245）。

人类在该任务上的准确率约为 90%，早期 BERT-based 模型约为 80% 左右，当前大型语言模型已能接近或超越人类水平。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2019 |
| 数据量 | 约 15,942 题 |
| 格式 | 是非题（True/False） |
| 领域 | 阅读理解、推理 |
| 语言 | 英文 |
| 许可证 | CC-BY-SA-3.0 |
| 数据来源 | 真实 Google 搜索查询 + Wikipedia |

## SOTA 表现

当前顶尖模型在 BoolQ 上的准确率已超过 90%，部分大型模型超越人类基线（约 90%）。具体最新成绩见各模型官方技术报告。

## 主要挑战与局限

- **依赖段落**：需要准确的段落与问题匹配，脱离段落语境会影响准确率
- **False Presupposition**：部分问题本身含有错误预设，增加判断难度
- **类别不平衡**：True 答案略多于 False，可能影响模型决策偏向
- **难以区分顶尖模型**：随着大型模型能力提升，区分度降低
- **仅英文**：不支持多语言评测

## 相关页面

- [[SuperGLUE]]
- [[GLUE]]
- [[MultiNLI]]
- [[SQuAD-2.0]]
- [[NaturalQuestions]]
