---
title: "MultiNLI"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning]
language: en
year: 2018
authors: ["Williams et al."]
arxiv_id: "1704.05426"
official_url: "https://cims.nyu.edu/~sbowman/multinli/"
license: "CC-BY-3.0-Unported"
size: 433000
format: multiple-choice
status: saturated
saturation_threshold: 0.90
sources: []
---

# MultiNLI（Multi-Genre Natural Language Inference）

> 覆盖 10 种文本类型的大规模自然语言推理数据集，是 NLI 研究的核心基准之一。

## 概述

MultiNLI 由 Williams 等人于 2018 年提出（发表于 NAACL 2018），来自纽约大学。该数据集是 SNLI 的重要扩展版本，最大改进是引入了多种文本类型（genres）：包括口语、书面语、政府文件、小说、电话对话等 10 种不同的文本风格，极大提升了数据集的领域多样性。

每个样本由一个**前提**（premise）和一个**假设**（hypothesis）组成，模型需要判断它们之间的关系：
- **蕴含**（entailment）：前提为真时假设必然为真
- **矛盾**（contradiction）：前提为真时假设必然为假
- **中立**（neutral）：前提为真时假设可能为真也可能为假

数据集共约 433,000 句对，分为训练集（约 393,000）和开发集（约 20,000 x 2，分别来自"匹配"和"不匹配"领域）。测试集通过竞赛方式评测，不公开标签。

MultiNLI 是 GLUE 基准的核心组成部分，BERT、RoBERTa 等预训练模型在该任务上的成功大幅推动了 NLP 领域的发展。目前顶尖模型已远超人类基线，数据集趋于饱和。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2018 |
| 数据量 | 约 433,000 句对 |
| 格式 | 三分类（蕴含/矛盾/中立） |
| 领域 | 自然语言推理 |
| 语言 | 英文 |
| 许可证 | CC-BY-3.0-Unported |
| 数据来源 | 多来源文本 + 众包 |

## SOTA 表现

顶尖模型在 MultiNLI 匹配开发集上的准确率超过 93%，超越人类基线（约 88%）。数据集已高度饱和。具体最新成绩见 GLUE 官方排行榜。

## 主要挑战与局限

- **高度饱和**：顶尖模型已远超人类水平，区分度极低
- **标注噪声**：大规模众包标注不可避免存在质量问题
- **假设偏差（annotation artifacts）**：假设句中某些词汇统计特征与标签相关，模型可能学到捷径
- **领域不平衡**：不同文本类型的样本量不均
- **英文单一**：仅覆盖英文，无法评测多语言推理

## 相关页面

- [[SNLI]]
- [[GLUE]]
- [[SuperGLUE]]
- [[BoolQ]]
- [[FEVER]]
