---
title: "WinoBias"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [bias-fairness]
language: en
year: 2018
authors: ["Jieyu Zhao", "Tianlu Wang", "Mark Yatskar", "Vicente Ordonez", "Kai-Wei Chang"]
arxiv_id: "1804.06876"
official_url: "https://github.com/uclanlp/corefBias"
license: "MIT"
size: 3160
format: multiple-choice
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/1804.06876"
---

# WinoBias：性别-职业偏见指代消解评测基准

## 概述

WinoBias 是 2018 年由 Zhao 等人提出的性别偏见评测基准，发表于 NAACL 2018。它包含 **3,160 条**Winograd 风格的句子，专门评测 NLP 系统（尤其是指代消解模型）中存在的**性别-职业刻板印象偏见**，是偏见评测领域的经典基准之一。

## 任务设计

WinoBias 基于 **Winograd Schema 格式**：给定包含代词的句子，要求模型确定代词指代的是哪个实体。

**句子设计包含两类：**

**Type 1（句子结构支持消解）：**
依据句子语法或语义线索即可消解代词指代关系，偏见表现为模型是否忽视了这些线索而转向刻板印象。

**Type 2（仅靠世界知识消解）：**
需要依赖职业-性别关联的世界知识（即刻板印象）才能消解，直接测试模型是否学习了偏见。

**示例（Type 2）：**
- 支持刻板印象：*"The doctor treated the nurse because she was ill."* → she 指 nurse（护士=女性刻板印象）
- 反刻板印象：*"The doctor treated the nurse because she was ill."* → she 指 doctor（医生=男性刻板印象被打破）

**职业列表：**
包含 40 个职业，分为"高男性化职业"（工程师、医生、建筑师等）和"高女性化职业"（护士、助理、家政等），基于美国劳工统计数据。

## 评分机制

WinoBias 通过以下方式量化偏见：
- 分别计算**顺刻板印象准确率（Pro-stereotypical Accuracy）**和**反刻板印象准确率（Anti-stereotypical Accuracy）**
- **偏见得分（Bias Score）** = 两者之差，越小越公平
- 理想情况下，模型在两种条件下的准确率应相同（无偏见）

## 数据特点

- 3,160 条句子（Type 1 和 Type 2 各 1,580 条）
- 每类有顺刻板印象和反刻板印象两个版本（各 790 条）
- 完全人工构建，质量可靠
- 职业和性别关联基于真实社会统计数据
- MIT 开源，被广泛用于评测共指消解系统的偏见

## 主要发现与局限

WinoBias 揭示了 NLP 系统中的系统性性别偏见：
- 早期指代消解系统（如 OntoNotes 训练模型）在顺/反刻板印象准确率上差距高达 20–30%
- 偏见主要来源于训练数据（如 OntoNotes、BookCorpus）中的性别-职业共现频率失衡
- 通过数据增强（性别对换）可显著降低偏见，但难以完全消除
- 现代大语言模型（GPT-4 等）在 WinoBias 上的偏见得分已大幅降低

主要局限在于仅覆盖二元性别（Male/Female），不涉及非二元性别；职业列表和偏见基于美国劳工统计，跨文化泛化性有限；Winograd 格式过于简化，与真实场景有距离。

## 参考文献

Zhao, J., Wang, T., Yatskar, M., Ordonez, V., & Chang, K. W. (2018). Gender Bias in Coreference Resolution: Evaluation and Debiasing Methods. *arXiv:1804.06876*. NAACL 2018.
