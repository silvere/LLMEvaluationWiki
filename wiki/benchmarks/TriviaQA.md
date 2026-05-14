---
title: "TriviaQA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [knowledge, retrieval]
language: en
year: 2017
authors: ["Joshi et al."]
arxiv_id: "1705.03551"
official_url: "http://nlp.cs.washington.edu/triviaqa/"
license: "Apache-2.0"
size: 650000
format: open-ended
status: active
saturation_threshold: 0.90
sources: []
---

# TriviaQA

> 大规模三方组合问答数据集，包含问题、答案及多个支持文档，用于评测开放域阅读理解能力。

## 概述

TriviaQA 由 Joshi 等人于 2017 年提出（发表于 ACL 2017），来自华盛顿大学。数据集的构建方式独特：首先从公开的 trivia 网站（竞猜题来源）收集问题和答案对，再通过搜索引擎和 Wikipedia 为每道题找到支持证据文档，形成"问题-答案-证据"三元组。

数据集规模约 650,000 个问答对（含训练集），涵盖 95,956 道独立问题，每道题平均关联约 6 个支持文档。答案均为命名实体（人名、地名、年份等），便于自动评测。

TriviaQA 有两个评测设置：
- **Wikipedia 设置**：仅使用 Wikipedia 段落作为支持文档
- **Web 设置**：使用来自网络的多个文档，证据更为分散

与 SQuAD 等数据集不同，TriviaQA 的证据文档是在问题创建后才附加的，因此答案在文档中可能出现多次或措辞不同，增加了任务难度。TriviaQA 是开放域问答和检索增强问答研究的重要基准。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2017 |
| 数据量 | 约 650,000 问答对（约 95,956 独立问题） |
| 格式 | 开放式（短答案抽取） |
| 领域 | 开放域知识问答 |
| 语言 | 英文 |
| 许可证 | Apache-2.0 |
| 数据来源 | Trivia 网站 + Wikipedia + 网络搜索 |

## SOTA 表现

顶尖系统在 TriviaQA Wikipedia 验证集上的 EM（精确匹配）得分超过 85%。大型语言模型在无检索条件下也表现出较强能力。具体最新成绩见各模型官方报告。

## 主要挑战与局限

- **证据文档分散**：答案可能出现在多个位置，答案抽取更具挑战性
- **别名和同义表达**：同一实体的多种表达方式使精确匹配评测复杂
- **证据质量不均**：来自网络的文档质量参差不齐，可能包含噪声
- **问题来源偏差**：来自 trivia 竞猜，可能偏向特定领域（历史、地理、体育等）
- **测试集需提交评测**：测试集标签不完全公开

## 相关页面

- [[NaturalQuestions]]
- [[SQuAD-2.0]]
- [[HotpotQA]]
- [[DROP]]
- [[SimpleQA]]
