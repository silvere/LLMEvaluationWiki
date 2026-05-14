---
title: "XNLI (Cross-lingual Natural Language Inference)"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning, multilingual]
language: multilingual
year: 2018
authors: ["Alexis Conneau", "Ruty Rinott", "Guillaume Lample", "Adina Williams", "Samuel R. Bowman", "Holger Schwenk", "Veselin Stoyanov"]
arxiv_id: "1809.05053"
official_url: "https://github.com/facebookresearch/XNLI"
license: "CC BY-NC 4.0"
size: 112500
format: multiple-choice
status: active
saturation_threshold: 0.90
sources:
  - "Conneau, A., et al. (2018). XNLI: Evaluating Cross-lingual Sentence Representations. EMNLP 2018."
---

# XNLI

## 概述

XNLI（Cross-lingual Natural Language Inference）是由 Facebook AI Research 等机构于 2018 年发布的经典跨语言自然语言推理基准，将英语 MultiNLI 数据集扩展到 **15 种语言**。XNLI 是多语言 NLP 领域使用最广泛的评测基准之一，推动了跨语言预训练模型（mBERT、XLM、XLM-R）的发展。

## 数据构成

XNLI 基于 MultiNLI 的 5,000 条句子对，由专业翻译团队翻译成 14 种语言（加上原始英语共 15 种）：

| 语言 | 代码 |
|------|------|
| 英语 | en |
| 法语 | fr |
| 西班牙语 | es |
| 德语 | de |
| 中文 | zh |
| 阿拉伯语 | ar |
| 保加利亚语 | bg |
| 俄语 | ru |
| 斯瓦希里语 | sw |
| 泰语 | th |
| 土耳其语 | tr |
| 乌尔都语 | ur |
| 越南语 | vi |
| 希腊语 | el |
| 印地语 | hi |

每种语言包含 **5,000 条开发集** + **5,000 条测试集** = 每语言 10,000 条，合计约 **150,000 条**（训练数据仅英语）。

## 任务格式

标准三分类 NLI：给定前提和假设，判断关系为：
- **Entailment（蕴含）**
- **Neutral（中立）**
- **Contradiction（矛盾）**

## 评测设置

XNLI 支持两种主要评测方式：

1. **零样本跨语言迁移（Zero-shot cross-lingual transfer）**：仅在英语训练集上微调，直接在其他语言测试集上评测
2. **翻译后测试（Translate-test）**：将测试样本翻译成英语后，用英语模型评测
3. **各语言独立微调（per-language fine-tuning）**：在每种语言的 MNLI 翻译版本上分别微调（作为上界参考）

## 历史意义

XNLI 在多语言 NLP 发展中具有里程碑意义：

1. **推动多语言预训练**：mBERT（2018）、XLM（2019）、XLM-R（2020）等关键模型均以 XNLI 作为核心评测基准
2. **建立跨语言基线**：量化了"仅用英语训练的模型在其他语言上的零样本表现"，成为衡量多语言迁移能力的标准
3. **揭示语言间差距**：高资源语言（中文、德语）与低资源语言（斯瓦希里语、乌尔都语）之间的性能差距在 XLM-R 论文中被系统分析

## 典型性能

| 模型 | 英语 | 平均（15语言） | 斯瓦希里语 |
|------|------|--------------|-----------|
| mBERT (2018) | 81.9% | 64.3% | 63.8% |
| XLM-R Large (2020) | 89.1% | 79.2% | 66.7% |
| GPT-4 (2023) | ~95%+ | ~85%+ | ~75%+ |

## 局限性

- 仅覆盖 15 种语言，欠缺许多低资源语言
- 翻译数据质量在不同语言和翻译团队间存在差异
- 随着大型多语言模型的发展，部分高资源语言子集已接近饱和
- 原始 MultiNLI 数据存在标注伪影（annotation artifacts），对所有语言均有影响

## 相关基准

- **XCOPA**：跨语言因果推理，11 种语言
- **PAWS-X**：跨语言释义识别，6 种语言
- **TyDiQA**：11 种语言类型多样问答
- **AmericasNLI**：北美土著语言 NLI 扩展
