---
title: "ANLI (Adversarial NLI)"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning]
language: en
year: 2020
authors: ["Yixin Nie", "Adina Williams", "Emily Dinan", "Mohit Bansal", "Jason Weston", "Douwe Kiela"]
arxiv_id: "1910.14599"
official_url: "https://github.com/facebookresearch/anli"
license: "CC BY-NC 4.0"
size: 162000
format: multiple-choice
status: active
saturation_threshold: 0.90
sources:
  - "Nie, Y., et al. (2020). Adversarial NLI: A New Benchmark for Natural Language Understanding. ACL 2020."
---

# ANLI（Adversarial NLI）

## 概述

Adversarial NLI（ANLI）是由 Facebook AI Research 等机构于 2020 年提出的自然语言推理基准。与传统 NLI 数据集不同，ANLI 采用了**对抗性人机协作（Human-and-Model-in-the-Loop Enabled Training, HAMLET）**构造流程，专门生成能够欺骗当前最优模型的难题，从而持续挑战模型的语言推理能力。

## 构造方法

ANLI 的数据通过三轮迭代（R1、R2、R3）对抗收集：

1. 标注者给定一个前提（premise），并被要求写出一个假设（hypothesis），使其标签为"蕴含"、"中立"或"矛盾"。
2. 每写完一个假设，会立即用当前轮次的最优模型进行预测；若模型预测错误，该条数据被保留。
3. 成功"欺骗"模型的样本进入数据集，并在下一轮训练更强的模型，循环往复。

三轮数据的难度递增，R3 被认为是现有 NLI 数据集中最具挑战性的子集之一。

## 数据规模

| 轮次 | 训练集 | 开发集 | 测试集 |
|------|--------|--------|--------|
| R1   | 16,946 | 1,000  | 1,000  |
| R2   | 45,460 | 1,000  | 1,000  |
| R3   | 100,459 | 1,200 | 1,200  |
| 合计 | ~162,865 | 3,200 | 3,200 |

## 任务格式

标准三分类 NLI 任务：给定前提和假设，判断两者的逻辑关系：
- **Entailment（蕴含）**：假设可从前提中逻辑推导出来
- **Neutral（中立）**：假设与前提既不蕴含也不矛盾
- **Contradiction（矛盾）**：假设与前提相互矛盾

## 评测意义

- **动态难度**：通过对抗构造确保每一轮的样本都能难住当时最强的模型，避免了传统数据集因模型进步而迅速饱和的问题。
- **揭示漏洞**：ANLI 揭示了许多模型在应对词汇重叠、词序变换、否定逻辑等情况时仍存在系统性弱点。
- **训练价值**：ANLI 不仅作为评测基准，其训练数据也被广泛用于提升 NLI 模型的鲁棒性。

## 局限性

- 对抗构造可能引入特定的标注者风格偏差，影响泛化能力。
- 三轮数据分布差异较大，跨轮次的模型表现可比性有限。
- 部分样本的"正确答案"存在主观性争议。

## 典型模型表现

在 R3 测试集上，早期 RoBERTa-Large 模型的准确率约为 44%，仅略高于随机基线（33%）。随着大型语言模型的发展，GPT-4 等模型在 R3 上的准确率已大幅提升，但相比标准 NLI 数据集，ANLI 仍具有明显的区分度。
