---
title: "微观平均与宏观平均（Micro vs Macro Average）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources:
  - "Manning, C.D., Raghavan, P., & Schütze, H. (2008). Introduction to Information Retrieval. Cambridge University Press."
  - "Sebastiani, F. (2002). Machine Learning in Automated Text Categorization. ACM Computing Surveys."
---

# 微观平均与宏观平均

## 概述

在多类别分类或多任务/多数据集评测中，需要将各类别/任务的性能指标（如 F1、准确率）聚合为一个综合指标。**微观平均（Micro Average）**和**宏观平均（Macro Average）**是两种最常用的聚合方式，二者在如何对待不同类别/任务的权重上存在本质差异。

## 微观平均（Micro Average）

微观平均通过**汇总所有类别的预测结果**再统一计算指标，等效于按样本数量加权的平均：

$$\text{Micro Precision} = \frac{\sum_c TP_c}{\sum_c (TP_c + FP_c)}$$

$$\text{Micro F1} = \frac{2 \cdot \text{Micro Precision} \cdot \text{Micro Recall}}{\text{Micro Precision} + \text{Micro Recall}}$$

**特点**：
- 每个样本对最终指标贡献相同
- 对高频类别敏感（高频类别主导结果）
- 当类别分布不均匀时，微观指标主要反映多数类的性能

## 宏观平均（Macro Average）

宏观平均先对每个类别独立计算指标，再对所有类别取**简单算术平均**：

$$\text{Macro F1} = \frac{1}{K}\sum_{c=1}^{K} F1_c$$

**特点**：
- 每个类别对最终指标贡献相同，不受类别样本数量影响
- 对低频（少数）类别给予与高频类别相同的权重
- 在类别严重不均衡时，比微观平均对少数类别更公平

## 加权宏观平均（Weighted Average）

一种折中方案，按各类别的样本数量加权：

$$\text{Weighted F1} = \frac{1}{N}\sum_{c=1}^{K} n_c \cdot F1_c$$

兼顾了类别样本数量和单类别性能。

## 在 LLM 评测中的应用

### 多数据集综合评测
当需要汇总模型在多个基准上的性能时：
- **宏观平均**：对每个基准平等对待（不因数据集大小而偏权）
- **微观平均**：大规模数据集的性能主导结果，可能掩盖模型在小基准上的失败

例如，MMLU 的 57 个学科子集通常报告宏观平均准确率，确保生僻学科（如少数民族历史）与主流学科（如高中数学）被同等对待。

### 多语言模型评测
在评测覆盖多语言的模型时：
- **宏观平均**（各语言等权）：更公平地反映低资源语言的性能，防止评测结果被英语等高资源语言主导
- **微观平均**（按样本数）：主要反映高资源语言的性能

### 多类别分类任务
在命名实体识别（NER）、意图识别等多类别任务中，微观 F1 和宏观 F1 可能差异很大，通常两者都应报告。

## 选择建议

| 场景 | 推荐方式 |
|------|---------|
| 类别/任务样本量均衡 | 两者等价，均可 |
| 关注整体样本性能 | 微观平均 |
| 关注每类/任务平均性能 | 宏观平均 |
| 多语言、强调低资源语言公平 | 宏观平均 |
| 需要综合考虑 | 加权宏观平均 |

## 相关概念

- [[F1-score]]：微观/宏观平均的基本计算单元
- [[confidence-intervals-eval]]：聚合指标的不确定性量化
- [[micro-vs-macro-average]] 与多基准评测排名的关系
