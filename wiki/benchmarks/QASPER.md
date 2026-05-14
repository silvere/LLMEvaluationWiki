---
title: "QASPER (Question Answering on Scientific Papers)"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [knowledge, retrieval]
language: en
year: 2021
authors: ["Pradeep Dasigi", "Kyle Lo", "Iz Beltagy", "Arman Cohan", "Noah A. Smith", "Matt Gardner"]
arxiv_id: "2105.03011"
official_url: "https://allenai.org/data/qasper"
license: "CC BY 4.0"
size: 5049
format: open-ended
status: active
saturation_threshold: 0.85
sources:
  - "Dasigi, P., et al. (2021). A Dataset of Information-Seeking Questions and Answers Anchored in Research Papers. NAACL 2021."
---

# QASPER

## 概述

QASPER（Question Answering on Scientific Papers）是由 Allen Institute for AI 于 2021 年发布的科学论文问答基准。该数据集专注于**信息检索型问答**（information-seeking QA），测试模型从完整 NLP 论文全文中定位和综合信息的能力。

## 数据构成

QASPER 包含来自约 1,585 篇 NLP 领域论文的 5,049 对问答，具有以下特征：

- **问题来源**：由未读过原文的 NLP 研究者基于论文摘要和标题提出，确保问题反映真实信息需求
- **答案来源**：由阅读过全文的标注者从正文中标注答案
- **答案类型**：
  - **Extractive**（抽取式）：从原文直接截取文本片段
  - **Abstractive**（生成式）：基于原文信息重新表述
  - **Boolean**（是/否）：是或否，附有文本证据
  - **Unanswerable**（无法回答）：问题无法从论文中找到答案

## 任务挑战

QASPER 的独特挑战在于：

1. **长文档理解**：论文全文通常超过 5,000 词，模型需在完整文档中定位相关片段，对长上下文处理能力要求较高
2. **多段落证据**：部分问题的答案分散在文章多个位置，需要跨段落综合
3. **领域知识依赖**：NLP 论文包含大量专业术语和领域背景知识
4. **答案类型多样**：模型需识别并输出适合当前问题的答案类型

## 评测指标

- **Token-level F1**：主要评测指标，比较预测答案与参考答案的词元重叠
- **Exact Match（EM）**：完全匹配率
- 对于 Unanswerable 类型，预测"无法回答"即得满分

人类标注一致性约为 Token F1 = 0.60，反映了科学问答任务本身的主观性。

## 与长上下文评测的关系

QASPER 是早期专注于完整文档（而非短段落）的问答数据集之一，推动了以下方向的研究：

- **长文档 Transformer**：Longformer、BigBird 等在 QASPER 上进行了大量实验
- **检索增强生成（RAG）**：QASPER 被用于评测先检索相关段落再生成答案的流水线
- **科学文献理解**：促进了专注 NLP/科学领域的专用语言模型研究

## 局限性

- 仅覆盖 NLP 领域论文，领域多样性有限
- 问答对数量（5,049）相对较少，评测统计稳健性有限
- 答案可能存在多种合理表述，Token F1 不能完全捕捉语义等价关系

## 相关基准

- **QuALITY**：更长文档的多选阅读理解
- **NarrativeQA**：基于书籍和电影剧本的长文档问答
- **MultiFieldQA**：多领域长文档问答
