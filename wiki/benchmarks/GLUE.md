---
title: GLUE
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- reasoning
- knowledge
language: en
year: 2018
authors:
- Wang et al.
arxiv_id: '1804.07461'
official_url: https://gluebenchmark.com/
license: Multiple
size: 0
format: multiple-choice
status: saturated
saturation_threshold: 0.9
sources: []
dimension: A
subdimension: benchmark
sota:
- score: 93.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://gluebenchmark.com
  notes: GLUE score (average across 8 tasks)
- score: 92.8%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.anthropic.com/claude
  notes: GLUE average
- score: 92.2%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://deepmind.google/technologies/gemini/
  notes: GLUE average
- score: 91.5%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: GLUE average
- score: 89.5%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: GLUE average, 2024 baseline
---

# GLUE（General Language Understanding Evaluation）

> 包含 9 个 NLP 任务的通用语言理解评测基准，深刻推动了预训练语言模型时代的到来。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/1804.07461](https://arxiv.org/abs/1804.07461)
- **官方主页**: [https://gluebenchmark.com/](https://gluebenchmark.com/)

<!-- AUTO-LINKS:END -->

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


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 93.5% | GLUE score (average across 8 tasks) | 2025-09 | [link](https://gluebenchmark.com) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 92.8% | GLUE average | 2026-04 | [link](https://www.anthropic.com/claude) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 92.2% | GLUE average | 2026-03 | [link](https://deepmind.google/technologies/gemini/) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 91.5% | GLUE average | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 89.5% | GLUE average, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

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
