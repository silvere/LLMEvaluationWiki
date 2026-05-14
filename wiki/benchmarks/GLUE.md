---
title: "GLUE"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning, knowledge]
language: en
year: 2018
authors: ["Wang et al."]
arxiv_id: "1804.07461"
official_url: "https://gluebenchmark.com/"
license: "Multiple"
size: 0
format: multiple-choice
status: saturated
saturation_threshold: 0.90
sources: []
---

# GLUE（General Language Understanding Evaluation）

> 包含 9 个 NLP 任务的通用语言理解评测基准，深刻推动了预训练语言模型时代的到来。

## 概述

GLUE 由 Wang 等人于 2018 年提出（发表于 EMNLP 2018），来自纽约大学等机构。GLUE 是第一个被广泛采用的**多任务 NLP 综合评测基准**，通过汇聚多个不同类型的 NLP 任务，提供了一个统一的语言理解能力评测框架。

GLUE 包含 9 个子任务：
1. **CoLA** - 语言可接受性判断
2. **SST-2** - 电影评论情感分析
3. **MRPC** - 句子对语义等价判断
4. **STS-B** - 语义文本相似度（回归任务）
5. **QQP** - Quora 问题对相似度
6. **MNLI** - 多类型自然语言推理（MultiNLI）
7. **QNLI** - 问答推理（SQuAD 转化）
8. **RTE** - 文本蕴含识别
9. **WNLI** - Winograd Schema 挑战

最终得分为各任务结果的宏平均。GLUE 推动了 BERT（2018 年）的诞生，BERT 一经提出便在 GLUE 上以大幅优势超越之前所有模型，标志着预训练语言模型时代的开始。

然而，BERT 发布后数个月内，GLUE 即宣告饱和（模型超越人类水平），随即推出了更难的 SuperGLUE。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2018 |
| 任务数量 | 9 个子任务 |
| 格式 | 分类/回归（按任务不同） |
| 领域 | 通用语言理解 |
| 语言 | 英文 |
| 许可证 | 各任务许可证不同 |

## SOTA 表现

GLUE 已完全饱和，顶尖模型均达到或超越人类水平（约 87.1 分）。已不再作为有效的区分性基准，其历史意义在于推动了 BERT 等模型的发展。

## 主要挑战与局限

- **完全饱和**：所有子任务均已被顶尖模型超越，失去区分价值
- **部分任务规模小**：如 CoLA（8,551 训练样本）、RTE（2,490 训练样本）
- **任务权重均等**：宏平均可能掩盖模型在特定任务上的弱点
- **只覆盖英文**：无法评测多语言能力
- **已被 SuperGLUE 取代**：作为挑战性基准已成历史

## 相关页面

- [[SuperGLUE]]
- [[MultiNLI]]
- [[SNLI]]
- [[BoolQ]]
- [[MMLU]]
