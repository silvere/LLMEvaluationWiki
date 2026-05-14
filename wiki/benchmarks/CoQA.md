---
title: "CoQA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning, dialog]
language: en
year: 2019
authors: ["Reddy et al."]
arxiv_id: "1808.07042"
official_url: "https://stanfordnlp.github.io/coqa/"
license: "Multiple (by source)"
size: 127000
format: dialog
status: active
saturation_threshold: 0.90
sources: []
---

# CoQA（Conversational Question Answering）

> 基于对话形式的阅读理解数据集，要求模型在多轮对话上下文中连续理解和回答问题。

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
