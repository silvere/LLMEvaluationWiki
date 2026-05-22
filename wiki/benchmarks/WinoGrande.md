---
title: WinoGrande
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- reasoning
language: en
year: 2019
authors:
- Sakaguchi et al.
arxiv_id: '1907.10641'
official_url: https://winogrande.allenai.org/
license: Apache-2.0
size: 43985
format: multiple-choice
status: saturated
saturation_threshold: 0.9
sources: []
dimension: A
subdimension: benchmark
sota:
- score: 95.8%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://openai.com/gpt-5
  notes: 5-shot accuracy
- score: 95.2%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.anthropic.com/claude
  notes: 5-shot accuracy
- score: 94.5%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://deepmind.google/technologies/gemini/
  notes: 5-shot accuracy
- score: 92.8%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: 5-shot accuracy
- score: 91.5%
  model: Qwen3.6
  harness: null
  with_tools: false
  date: 2026-04
  source: https://qwenlm.github.io
  notes: 5-shot accuracy
- score: 90.3%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: 5-shot accuracy, 2024 baseline
---

# WinoGrande

> 大规模 Winograd Schema 挑战数据集，专门测试模型的常识推理与指代消解能力。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/1907.10641](https://arxiv.org/abs/1907.10641)
- **官方主页**: [https://winogrande.allenai.org/](https://winogrande.allenai.org/)

<!-- AUTO-LINKS:END -->

## 概述

WinoGrande 由 Sakaguchi 等人于 2019 年提出（发表于 AAAI 2020），是经典 Winograd Schema Challenge（WSC）的大规模扩展版本。原始 WSC 数据集只有 273 道题，规模太小，导致结果波动较大；WinoGrande 将其扩展到约 44,000 道题，大幅提升了统计可靠性。

每道题包含一个句子，其中有一个代词指代不明确，模型需从两个候选词中选出正确的指代对象。这类题目本质上要求对世界常识有深刻理解，单纯依靠语言统计规律很难解决。例如："The trophy didn't fit in the suitcase because it was too big. What was too big?"

WinoGrande 同样采用了 **AFLITE**（Adversarial Filtering Lite）技术来过滤掉可以通过表面统计特征解答的题目，提高题目质量。数据集提供从 640 到 43,985 道题的多个规模划分，便于不同实验需求。

随着 GPT-4 等大型模型的出现，WinoGrande 的顶尖成绩已经接近甚至超过人类水平（约 94%），数据集趋于饱和，但仍是常识推理评测的标准基准之一。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2019 |
| 数据量 | 约 43,985 题 |
| 格式 | 多选题（2 选 1） |
| 领域 | 常识推理、指代消解 |
| 语言 | 英文 |
| 许可证 | Apache-2.0 |
| 数据来源 | 众包写作 + AFLITE 过滤 |

## SOTA 表现

顶尖模型在 WinoGrande 上的准确率已超过 90%，部分模型接近人类水平（94%）。具体最新成绩见各模型官方技术报告。


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 95.8% | 5-shot accuracy | 2025-09 | [link](https://openai.com/gpt-5) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 95.2% | 5-shot accuracy | 2026-04 | [link](https://www.anthropic.com/claude) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 94.5% | 5-shot accuracy | 2026-03 | [link](https://deepmind.google/technologies/gemini/) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 92.8% | 5-shot accuracy | 2026-02 | [link](https://deepseek.com) |
| 5 | [[Qwen3.6]] | 🚫 no | 91.5% | 5-shot accuracy | 2026-04 | [link](https://qwenlm.github.io) |
| 6 | [[GPT-4o]] | 🚫 no | 90.3% | 5-shot accuracy, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **趋近饱和**：大型模型已接近人类表现，区分度降低
- **题型单一**：所有题目都是二选一的指代消解，覆盖范围有限
- **常识来源偏差**：众包来源的题目可能存在文化和语言背景的偏差
- **数据污染**：广泛流传使训练集污染风险增加
- **仅英文**：不能直接用于多语言能力评测

## 相关页面

- [[HellaSwag]]
- [[CommonsenseQA]]
- [[PIQA]]
- [[ARC]]
- [[MMLU]]
