---
title: "PAWS-X (Cross-lingual Paraphrase Adversaries from Word Scrambling)"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [multilingual]
language: multilingual
year: 2019
authors: ["Yinfei Yang", "Yuan Zhang", "Chris Tar", "Jason Baldridge"]
arxiv_id: "1908.11828"
official_url: "https://github.com/google-research-datasets/paws/tree/master/pawsx"
license: "Apache 2.0"
size: 53401
format: binary
status: active
saturation_threshold: 0.92
sources:
  - "Yang, Y., et al. (2019). PAWS-X: A Cross-lingual Adversarial Dataset for Paraphrase Identification. EMNLP 2019."
---

# PAWS-X

## 概述

PAWS-X（Cross-lingual Paraphrase Adversaries from Word Scrambling）是由 Google Research 于 2019 年发布的跨语言释义（paraphrase）识别基准。该数据集将英语 PAWS 的高质量对抗性样本扩展到 **6 种语言**，专门测试模型识别**语义等价但词序不同**的句对的能力，同时避免被词汇重叠程度高但语义不同的样本欺骗。

## 背景：PAWS 数据集

PAWS（Paraphrase Adversaries from Word Scrambling）的核心设计是构造"高词汇重叠但语义不同"的难样本：

- 正样本：语义相同的句对（真释义）
- 负样本：通过词序调换生成的、词汇高度重叠但语义完全不同的句对

这要求模型必须理解句子的整体语义，而非依赖词汇重叠这一捷径。

示例（难负样本）：
- Sentence 1: "The cat chased the dog."
- Sentence 2: "The dog chased the cat."（非释义，尽管词汇完全相同）

## 覆盖语言

PAWS-X 涵盖 6 种语言：

| 语言 | 代码 | 数据来源 |
|------|------|---------|
| 英语 | en | 原始 PAWS |
| 法语 | fr | 专业翻译 |
| 西班牙语 | es | 专业翻译 |
| 德语 | de | 专业翻译 |
| 中文 | zh | 专业翻译 |
| 日语 | ja | 专业翻译 |
| 韩语 | ko | 专业翻译 |

## 数据规模

| 分割 | 每语言样本数 | 合计 |
|------|------------|------|
| 训练集（英语） | 49,401 | 49,401 |
| 开发集（各语言） | 2,000 | 14,000 |
| 测试集（各语言） | ~2,000 | ~14,000 |

## 任务格式

二元分类：给定两个句子，判断是否为**释义对（paraphrase）**：
- **1**：两句语义等价，构成释义
- **0**：两句语义不同，不构成释义

## 评测挑战

1. **对词汇捷径的对抗**：数据集专门构造高词汇重叠的负样本，迫使模型使用真正的语义理解
2. **跨语言泛化**：仅在英语上训练的模型能否正确处理其他语言中的释义识别？
3. **语言结构差异**：日语、韩语等 SOV 语言的词序与英语差异较大，进一步增加难度

## 典型性能

| 模型 | 英语 | 法语 | 日语 | 韩语 | 平均 |
|------|------|------|------|------|------|
| Multilingual BERT | 86.5% | 81.9% | 78.6% | 81.6% | 82.1% |
| XLM-R Large | 91.6% | 87.7% | 84.4% | 85.9% | 87.4% |

## 在 LLM 评测中的应用

PAWS-X 被广泛用于：
- 评测多语言模型的语义理解能力
- 作为细粒度语义相似度任务的跨语言基准
- 研究句子嵌入（sentence embedding）的跨语言对齐质量

## 局限性

- 仅覆盖 6 种语言，均为资源相对丰富的语言
- 数据来源主要为维基百科和 Quora，领域较为单一
- 二元分类格式过于简化，不能捕捉"部分释义"等中间情况
- 部分语言已接近人类表现上限

## 相关基准

- **XNLI**：跨语言自然语言推理，15 种语言
- **STS-B**（跨语言版）：跨语言语义文本相似度评测
- **XCOPA**：跨语言因果推理，11 种语言
