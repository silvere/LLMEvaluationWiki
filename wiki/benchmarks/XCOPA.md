---
title: "XCOPA (Cross-lingual Choice of Plausible Alternatives)"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning, multilingual]
language: multilingual
year: 2021
authors: ["Edoardo Maria Ponti", "Goran Glavaš", "Olga Majewska", "Qianchu Liu", "Ivan Vulić", "Anna Korhonen"]
arxiv_id: "2005.00333"
official_url: "https://github.com/cambridgeltl/xcopa"
license: "CC BY 4.0"
size: 11000
format: multiple-choice
status: active
saturation_threshold: 0.88
sources:
  - "Ponti, E.M., et al. (2021). XCOPA: Translation and Paraphrase of the Choice of Plausible Alternatives Dataset for 11 Languages. EMNLP 2020."
---

# XCOPA

## 概述

XCOPA（Cross-lingual Choice of Plausible Alternatives）是由剑桥大学于 2021 年发布的跨语言因果推理基准，将英语 COPA（Choice of Plausible Alternatives）数据集翻译和本地化适应到 **11 种语言**，用于评测 LLM 的跨语言因果常识推理能力。

## 基础：英语 COPA

XCOPA 基于 COPA 数据集。COPA 的每道题目包含：
- 一个**前提**（premise）
- 一个**问题类型**："是什么原因导致了这件事？"或"这件事之后发生了什么？"
- 两个**候选答案**，选择更合理的一个

示例（英语）：
> 前提：The man lost his balance on the ladder.
> 问题：What happened as a result?
> A. He fell off the ladder.（正确）
> B. He climbed to the top of the ladder.

## 覆盖语言

XCOPA 覆盖 11 种语言，其中包含多种低资源语言：

| 语言 | 代码 | 资源丰富程度 |
|------|------|------------|
| 英语（参考） | en | 高 |
| 埃塞俄比亚语（Amharic） | et | 低 |
| 海地克里奥尔语 | ht | 低 |
| 印度尼西亚语 | id | 中 |
| 意大利语 | it | 高 |
| 夸秋亚语（Quechua） | qu | 低 |
| 斯瓦希里语 | sw | 低 |
| 泰米尔语 | ta | 中 |
| 泰语 | th | 中 |
| 土耳其语 | tr | 中 |
| 越南语 | vi | 中 |
| 中文 | zh | 高 |

每种语言 500 道测试题（英语为参考集），合计约 11,000 道。

## 构建方法

XCOPA 采用"翻译+本地化"的策略：

1. **专业翻译**：由母语者进行人工翻译（非机器翻译）
2. **文化本地化**：部分题目中的文化元素经过调整，使其在目标语言中自然合理
3. **一致性验证**：每道翻译题均经过独立验证，确保语义等价

## 评测意义

1. **跨语言零样本迁移**：XCOPA 是测试多语言预训练模型（如 mBERT、XLM-R）零样本跨语言迁移能力的标准基准之一
2. **低资源语言评测**：覆盖夸秋亚语、海地克里奥尔语等极低资源语言，评测 LLM 在数据稀缺语言中的推理能力
3. **因果推理的跨语言一致性**：检验因果推理能力是否能跨语言泛化，还是仅在高资源语言中有效

## 典型表现

- 英语（COPA）：大模型（GPT-4 等）准确率接近 99%
- 高资源语言（意大利语、中文）：通常在 85-95% 之间
- 低资源语言（夸秋亚语、海地克里奥尔语）：显著下降，约 60-70%

## 局限性

- 每种语言仅 500 道测试题，统计显著性有限
- 翻译质量在不同语言间存在差异
- 文化本地化程度不一，部分语言的文化适配仍不充分
- 高资源语言上已接近饱和

## 相关基准

- **XNLI**：跨语言自然语言推理，15 种语言
- **PAWS-X**：跨语言释义识别，6 种语言
- **Belebele**：多语言阅读理解，122 种语言
