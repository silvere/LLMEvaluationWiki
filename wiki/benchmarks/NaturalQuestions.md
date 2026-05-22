---
title: NaturalQuestions
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- knowledge
- retrieval
language: en
year: 2019
authors:
- Kwiatkowski et al.
arxiv_id: ''
official_url: https://ai.google.com/research/NaturalQuestions
license: CC-BY-SA-3.0
size: 323000
format: open-ended
status: active
saturation_threshold: 0.9
sources: []
dimension: C
sota:
- score: 72.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://openai.com/gpt-5
  notes: open-book exact match
- score: 69.8%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.anthropic.com/claude
  notes: open-book exact match
- score: 68.4%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://deepmind.google/technologies/gemini/
  notes: open-book exact match
- score: 67.0%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: open-book exact match
- score: 60.2%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: open-book exact match, 2024 baseline
---

# NaturalQuestions（NQ）

> 来自真实 Google 搜索的大规模开放域问答数据集，包含长答案和短答案两类标注。

<!-- AUTO-LINKS:START -->

## 参考链接

- **官方主页**: [https://ai.google.com/research/NaturalQuestions](https://ai.google.com/research/NaturalQuestions)

<!-- AUTO-LINKS:END -->

## 概述

NaturalQuestions（NQ）由 Kwiatkowski 等人于 2019 年提出，来自 Google Research（发表于 TACL 2019）。该数据集由真实用户在 Google 搜索中提交的问题组成，每个问题附有对应的 Wikipedia 页面，并由专业标注者标注了长答案（整个段落）和短答案（简短的文字片段或是/否）。

数据集规模庞大：训练集约 307,000 道题，验证集约 7,830 道，测试集约 7,842 道（标签不公开）。这使其成为开放域问答研究的核心基准之一。

NQ 的独特之处在于问题的自然性——用户在提问时并不知道答案，体现了真实的信息需求。部分题目无法在提供的 Wikipedia 页面中找到答案（约 52% 的训练题目有短答案），这增加了任务的复杂性。

NQ 对推动检索增强生成（RAG）和开放域问答（ODQA）研究做出了重要贡献。许多检索系统和语言模型在 NQ 上进行评测，包括 Dense Passage Retrieval（DPR）等经典系统均以 NQ 作为主要基准。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2019 |
| 数据量 | 约 323,000 题（训练集 307k，验证集 7.8k，测试集 7.8k） |
| 格式 | 开放式（短答案/长答案/是否） |
| 领域 | 开放域知识问答 |
| 语言 | 英文 |
| 许可证 | CC-BY-SA-3.0 |
| 发布机构 | Google Research |

## SOTA 表现

在短答案任务上，顶尖系统的 F1 分数已超过 65%。大型语言模型（如 GPT-4）在无检索条件下的准确率也较高。具体最新成绩见各模型官方技术报告。


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 72.5% | open-book exact match | 2025-09 | [link](https://openai.com/gpt-5) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 69.8% | open-book exact match | 2026-04 | [link](https://www.anthropic.com/claude) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 68.4% | open-book exact match | 2026-03 | [link](https://deepmind.google/technologies/gemini/) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 67.0% | open-book exact match | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 60.2% | open-book exact match, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **无答案问题**：部分问题在对应 Wikipedia 页面中无明确答案
- **标注模糊性**：短答案边界确定困难，人工标注存在不一致
- **测试集不公开**：需通过官方渠道提交评测
- **依赖知识时效**：Wikipedia 内容随时间更新，可能影响答案准确性
- **英文单一**：仅覆盖英文问答场景

## 相关页面

- [[TriviaQA]]
- [[SQuAD-2.0]]
- [[HotpotQA]]
- [[DROP]]
- [[TruthfulQA]]
