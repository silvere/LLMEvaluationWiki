---
title: "CREAK (Commonsense Reasoning over Entity Knowledge)"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [knowledge, reasoning]
language: en
year: 2021
authors: ["Yasumasa Onoe", "Michael J.Q. Zhang", "Eunsol Choi", "Greg Durrett"]
arxiv_id: "2109.01653"
official_url: "https://github.com/yasumasaonoe/creak"
license: "MIT"
size: 13000
format: binary
status: active
saturation_threshold: 0.90
sources:
  - "Onoe, Y., et al. (2021). CREAK: A Dataset for Commonsense Reasoning over Entity Knowledge. NeurIPS 2021 Datasets and Benchmarks Track."
---

# CREAK

## 概述

CREAK（Commonsense Reasoning over Entity Knowledge）是由 University of Texas at Austin 等机构于 2021 年发布的常识推理基准，专注于**实体知识与常识推理的交叉领域**。该数据集要求模型判断涉及具体实体（如人物、地点、事物）的陈述的真假，其中正确回答不仅依赖事实知识，还需要结合常识进行推理。

## 任务设计

CREAK 的每道题目是一个关于真实世界实体的陈述，模型需要判断该陈述是 **True（真）** 还是 **False（假）**。

示例：
- "Hummingbirds are too heavy to hover in place." → False（蜂鸟以能悬停著称）
- "The Eiffel Tower was built before the Statue of Liberty." → False（自由女神像1886年竣工，埃菲尔铁塔1889年建成）

关键特点是：陈述中的"实体事实"部分可能是正确的，但"常识推理"部分可能是错误的（或反之），模型需要同时具备两方面能力才能作答。

## 数据构成

| 分割     | 数量   |
|----------|--------|
| 训练集   | 10,176 |
| 开发集   | 1,371  |
| 测试集   | 1,371  |
| 对抗测试 | ~1,000 |

数据集还包含一个对抗子集（Contrast Set），通过对原始题目进行最小化修改来测试模型的鲁棒性，验证模型是否真正理解了判断依据。

## 与其他推理基准的区别

| 特点 | CREAK | CommonsenseQA | TruthfulQA |
|------|-------|---------------|-----------|
| 实体绑定 | 是 | 部分 | 部分 |
| 真假判断 | 是 | 否（选择题） | 否（选择题） |
| 需要事实知识 | 是 | 否 | 是 |
| 需要常识推理 | 是 | 是 | 否 |

## 挑战特性

1. **知识交织推理**：正确回答需要同时激活实体相关的事实知识和领域常识
2. **反事实干扰**：部分题目涉及真实实体被置于反事实语境，易产生混淆
3. **对抗鲁棒性**：对比集（Contrast Set）专门测试模型在细微语义变化下的一致性

## 评测意义

CREAK 揭示了当时主流 NLU 模型的一个关键弱点：即使在简单问答任务上表现良好的模型，在需要同时整合实体知识与常识的任务上仍会显著失准。该数据集推动了实体知识增强（entity-enhanced）语言模型的研究。

## 局限性

- 数据集规模中等，标注覆盖的实体类型有限
- 真/假二元标签过于简化，忽略了现实中"部分正确"的情况
- 题目主要面向英文世界的实体知识，跨文化泛化性有待验证

## 相关基准

- **FEVER**：事实核查，判断维基百科陈述的真假
- **VitaminC**：基于反事实的事实核查
- **EntityQuestions**：实体相关的开放域问答
