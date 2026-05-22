---
title: DROP
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- reasoning
- math
language: en
year: 2019
authors:
- Dua et al.
arxiv_id: '1903.00161'
official_url: https://allenai.org/data/drop
license: CC-BY-4.0
size: 96567
format: open-ended
status: active
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
  source: https://openai.com/gpt-5
  notes: F1 score, 3-shot
- score: 91.8%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.anthropic.com/claude
  notes: F1 score, 3-shot
- score: 90.4%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://deepmind.google/technologies/gemini/
  notes: F1 score, 3-shot
- score: 89.2%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: F1 score, 3-shot
- score: 88.0%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: F1 score, 3-shot, 2024 baseline
---

# DROP（Discrete Reasoning Over Paragraphs）

> 要求在段落理解基础上进行离散推理（加减法、计数、排序等）的阅读理解数据集。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/1903.00161](https://arxiv.org/abs/1903.00161)
- **官方主页**: [https://allenai.org/data/drop](https://allenai.org/data/drop)

<!-- AUTO-LINKS:END -->

## 概述

DROP（Discrete Reasoning Over Paragraphs）由 Dua 等人于 2019 年提出（发表于 NAACL 2019），来自 Allen Institute for AI。该数据集专门针对**离散推理**（discrete reasoning）能力：模型不仅需要理解文本，还需要在文本信息的基础上执行加减法、计数、排序、集合运算等数学或逻辑操作。

例如，给定一段 NFL 比赛描述，问题可能是："在第二节，哪支球队得分更多？"或"第三季度一共打入多少次达阵？"——这需要模型从文本中提取多个数值并进行计算。

数据集来源于 Wikipedia 中的 NFL 赛事报告（约 60%）和历史事件描述（约 40%）。共约 96,567 道问题，分为训练集（77,409）和验证集（9,536），测试集标签不公开。

答案类型多样，包括：数字、日期、文本片段、数字列表等。这使得评测相对复杂，采用 F1 分数（支持部分匹配）和精确匹配（EM）双重指标。

DROP 是评测语言模型数值推理和组合推理能力的重要基准，与 MathQA、GSM8K 等数学推理数据集互补。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2019 |
| 数据量 | 约 96,567 题 |
| 格式 | 开放式（数字/日期/文本抽取 + 计算） |
| 领域 | 离散推理、数学计算、阅读理解 |
| 语言 | 英文 |
| 许可证 | CC-BY-4.0 |
| 数据来源 | Wikipedia（NFL 赛事 + 历史事件） |

## SOTA 表现

顶尖系统在 DROP 验证集上的 F1 分数超过 90%。大型语言模型（如 GPT-4）配合思维链（CoT）推理表现优秀。具体最新成绩见各模型官方技术报告。


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 93.5% | F1 score, 3-shot | 2025-09 | [link](https://openai.com/gpt-5) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 91.8% | F1 score, 3-shot | 2026-04 | [link](https://www.anthropic.com/claude) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 90.4% | F1 score, 3-shot | 2026-03 | [link](https://deepmind.google/technologies/gemini/) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 89.2% | F1 score, 3-shot | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 88.0% | F1 score, 3-shot, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **数值推理依赖**：需要精确的算术操作，对语言模型的弱点具有针对性
- **领域集中**：大量题目来自 NFL 报道，领域分布不均
- **答案类型复杂**：多种答案类型增加了评测实现难度
- **多步推理**：部分问题需要多步骤的信息提取和计算
- **测试集不公开**：需通过官方渠道评测

## 相关页面

- [[SQuAD-2.0]]
- [[HotpotQA]]
- [[NaturalQuestions]]
- [[GSM8K]]
- [[MATH]]
