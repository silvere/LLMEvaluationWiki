---
title: CoQA
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- reasoning
- dialog
language: en
year: 2019
authors:
- Reddy et al.
arxiv_id: '1808.07042'
official_url: https://stanfordnlp.github.io/coqa/
license: Multiple (by source)
size: 127000
format: dialog
status: active
saturation_threshold: 0.9
sources: []
dimension: B
sota:
- score: 95.8%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://stanfordnlp.github.io/coqa/
  notes: F1 score on CoQA dev set
- score: 95.0%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://stanfordnlp.github.io/coqa/
  notes: F1 score
- score: 94.2%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://stanfordnlp.github.io/coqa/
  notes: F1 score
- score: 93.5%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: F1 score
- score: 90.0%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: F1 score, 2024 baseline
---

# CoQA（Conversational Question Answering）

> 基于对话形式的阅读理解数据集，要求模型在多轮对话上下文中连续理解和回答问题。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/1808.07042](https://arxiv.org/abs/1808.07042)
- **官方主页**: [https://stanfordnlp.github.io/coqa/](https://stanfordnlp.github.io/coqa/)

<!-- AUTO-LINKS:END -->

## 概述

CoQA 由 Reddy 等人于 2019 年提出（发表于 TACL 2019），来自斯坦福大学 NLP 组。该数据集的核心创新是将阅读理解与**对话上下文**结合：每个对话包含多轮问答，后续问题通常依赖前面对话内容，模型需要理解对话历史才能正确回答。

数据集包含约 127,000 道问题，来自 8,000 篇文章，分布于 7 个不同领域：儿童故事（MCTest）、文学（Gutenberg）、初中/高中考试（MCScript、RACE）、新闻（CNN）、维基百科和 Reddit。这使得 CoQA 具有较好的领域多样性。

构建方式：标注者两两配对，一人提问，一人阅读文章并回答，再进行角色互换，形成自然的对话流。答案形式为自由文本，但同时标注了答案在文章中的对应范围（span）。

CoQA 的独特挑战包括：指代消解（需理解对话中的代词指代）、省略（问题可能省略前文已提及的信息）和对话主题转变。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2019 |
| 数据量 | 约 127,000 问题（来自 8,000 篇文章） |
| 格式 | 对话式问答（自由文本 + span 标注） |
| 领域 | 对话阅读理解 |
| 语言 | 英文 |
| 许可证 | 多种（依来源文章许可） |
| 数据来源 | 7 个领域文章 + 众包对话标注 |

## SOTA 表现

顶尖系统在 CoQA 测试集上的 F1 分数超过 90%，已接近人类水平（约 88.8% F1）。具体最新成绩见官方排行榜。


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 95.8% | F1 score on CoQA dev set | 2025-09 | [link](https://stanfordnlp.github.io/coqa/) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 95.0% | F1 score | 2026-04 | [link](https://stanfordnlp.github.io/coqa/) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 94.2% | F1 score | 2026-03 | [link](https://stanfordnlp.github.io/coqa/) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 93.5% | F1 score | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 90.0% | F1 score, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **对话依赖性**：需要跟踪多轮对话上下文，对模型的对话管理能力要求较高
- **指代消解难题**：代词和省略大量出现，解析困难
- **自由文本答案评测难**：F1 分数对措辞变化不够鲁棒
- **许可证复杂**：来源文章版权各异，使用受限
- **趋近饱和**：顶尖模型已接近人类水平

## 相关页面

- [[SQuAD-2.0]]
- [[QuALITY]]
- [[HotpotQA]]
- [[NaturalQuestions]]
- [[MT-Bench]]
