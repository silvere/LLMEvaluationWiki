---
title: "LAMBADA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning, knowledge]
language: en
year: 2016
authors: ["Paperno et al."]
arxiv_id: "1606.06031"
official_url: "https://zenodo.org/record/2630551"
license: "CC-BY-4.0"
size: 5153
format: open-ended
status: saturated
saturation_threshold: 0.90
sources: []
---

# LAMBADA（LAnguage Modeling Broadened to Account for Discourse Aspects）

> 测试模型在长篇叙事上下文中预测最后一个词的能力，强调跨段落的远程依赖理解。

## 概述

LAMBADA 由 Paperno 等人于 2016 年提出（发表于 ACL 2016）。其核心设计思路是：找出那些人类需要阅读完整段落才能预测最后一词、但单凭最后一句话无法预测的文本片段。这确保了测试的是**真正的上下文理解能力**，而非局部语言模式匹配。

数据集从 BooksCorpus 中筛选出满足以下条件的文本段落：人类标注者在仅给出最后一句话时无法预测最后一词，但在给出完整段落时可以正确预测。最终筛选出 5,153 个测试样本，每个样本包含一个多句段落，模型需要预测最后一句话的最后一个词。

例如，在一段关于角色对话的叙述中，最后一词可能是某个特定人名，这只有通过理解前文的人物关系才能推断。

早期语言模型（GPT-2 时代）在 LAMBADA 上的准确率约为 50-60%，而现代大型语言模型已能达到 80% 以上，该数据集目前趋于饱和。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2016 |
| 数据量 | 5,153 题（测试集） |
| 格式 | 开放式（预测最后一词） |
| 领域 | 语言建模、长距离依赖 |
| 语言 | 英文 |
| 许可证 | CC-BY-4.0 |
| 数据来源 | BooksCorpus |

## SOTA 表现

当前顶尖大型语言模型在 LAMBADA 上的准确率超过 80%，部分模型接近 90%。具体最新成绩见各模型官方技术报告。

## 主要挑战与局限

- **评测标准严格**：仅接受精确词汇匹配，对近义词、变体形式不容忍
- **趋于饱和**：大型模型已能较好处理此类任务
- **数据来源单一**：全部来自小说文学（BooksCorpus），领域受限
- **规模有限**：仅 5,153 道测试题，统计稳定性一般
- **任务设计难以拓展**：特定的筛选条件使得数据集扩展困难

## 相关页面

- [[NaturalQuestions]]
- [[TriviaQA]]
- [[BoolQ]]
- [[HellaSwag]]
