---
title: "SQuAD 2.0"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [knowledge, reasoning]
language: en
year: 2018
authors: ["Rajpurkar et al."]
arxiv_id: "1806.03822"
official_url: "https://rajpurkar.github.io/SQuAD-explorer/"
license: "CC-BY-SA-4.0"
size: 150000
format: open-ended
status: saturated
saturation_threshold: 0.90
sources: []
---

# SQuAD 2.0（Stanford Question Answering Dataset 2.0）

> 斯坦福大学的机器阅读理解数据集，2.0 版本引入无法回答的问题，测试模型的"知道自己不知道"能力。

## 概述

SQuAD 2.0 由 Rajpurkar 等人于 2018 年提出（发表于 ACL 2018），是 SQuAD 1.1 的重要升级版本。SQuAD 1.1 的所有问题在对应段落中都有明确答案，而 SQuAD 2.0 引入了约 53,775 道**无法回答的问题**（unanswerable questions），这些问题表面上与段落相关，但实际上在段落中找不到答案。

这一设计要求模型不仅要能准确抽取答案，还要能够识别"无法回答"的情况，即模型需要表现出**适当的不确定性**。这是对模型可靠性的重要测试维度。

数据集构建方式：SQuAD 2.0 保留了 SQuAD 1.1 的 87,599 道可回答问题，并由众包工作者为相同的段落额外编写了 53,775 道看似合理但无法从段落中找到答案的问题。

SQuAD 系列数据集深刻影响了 NLP 领域的发展，推动了 BERT、RoBERTa 等预训练语言模型的诞生和改进。目前顶尖模型在 SQuAD 2.0 上的 F1 分数已接近甚至超过人类水平，数据集趋于饱和。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2018 |
| 数据量 | 约 150,000 题（可回答 ~97k + 无法回答 ~53k） |
| 格式 | 开放式（答案抽取 + 拒绝回答） |
| 领域 | 阅读理解 |
| 语言 | 英文 |
| 许可证 | CC-BY-SA-4.0 |
| 数据来源 | Wikipedia + 众包 |

## SOTA 表现

顶尖系统在 SQuAD 2.0 测试集上的 F1 分数已超过 90%，超越人类基线（约 89% F1）。具体最新成绩见官方排行榜（squad-explorer）。

## 主要挑战与局限

- **趋于饱和**：顶尖模型已超越人类水平，区分度降低
- **领域受限于 Wikipedia**：全部来自 Wikipedia，不代表其他文本类型
- **无法回答问题的标注主观性**：某些"无法回答"的判断存在边界模糊
- **答案抽取局限**：仅支持从文本中直接抽取，不测试生成能力
- **英文单一**：不适用于多语言阅读理解评测

## 相关页面

- [[NaturalQuestions]]
- [[TriviaQA]]
- [[HotpotQA]]
- [[DROP]]
- [[CoQA]]
