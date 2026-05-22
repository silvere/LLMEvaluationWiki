---
title: BoolQ
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
year: 2019
authors:
- Clark et al.
arxiv_id: '1905.10044'
official_url: https://github.com/google-research-datasets/boolean-questions
license: CC-BY-SA-3.0
size: 15942
format: multiple-choice
status: active
saturation_threshold: 0.9
sources: []
dimension: A
subdimension: benchmark
sota:
- score: 96.2%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://openai.com/gpt-5
  notes: 0-shot accuracy
- score: 95.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.anthropic.com/claude
  notes: 0-shot accuracy
- score: 94.8%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://deepmind.google/technologies/gemini/
  notes: 0-shot accuracy
- score: 94.0%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: 0-shot accuracy
- score: 91.2%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: 0-shot accuracy, 2024 baseline
---

# BoolQ（Boolean Questions）

> 基于真实搜索查询的是非题数据集，每题附有相关文章段落，测试阅读理解与判断能力。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/1905.10044](https://arxiv.org/abs/1905.10044)
- **官方主页**: [https://github.com/google-research-datasets/boolean-questions](https://github.com/google-research-datasets/boolean-questions)

<!-- AUTO-LINKS:END -->

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


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 96.2% | 0-shot accuracy | 2025-09 | [link](https://openai.com/gpt-5) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 95.5% | 0-shot accuracy | 2026-04 | [link](https://www.anthropic.com/claude) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 94.8% | 0-shot accuracy | 2026-03 | [link](https://deepmind.google/technologies/gemini/) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 94.0% | 0-shot accuracy | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 91.2% | 0-shot accuracy, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

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
