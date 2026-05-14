---
title: "Kendall's τ（Kendall 相关系数）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources:
  - "Kendall, M.G. (1938). A new measure of rank correlation. Biometrika 1938."
  - "Callison-Burch, C., et al. (2010). Findings of the 2010 Joint Workshop on Statistical Machine Translation and Metrics. WMT 2010."
---

# Kendall's τ（Kendall 相关系数）

## 定义

**Kendall's τ（tau）**是一种基于成对比较（pairwise comparison）的排名相关性度量，衡量两个排名序列中"一致对"与"不一致对"的比例差异。与 Pearson r（线性相关）和 Spearman ρ（等级相关）相比，Kendall's τ 具有更直观的概率解释。

$$\tau = \frac{C - D}{\frac{1}{2}n(n-1)}$$

其中 $C$ 是一致对（concordant pairs）数量，$D$ 是不一致对（discordant pairs）数量，$n$ 是样本数。

**概率解释**：$\tau = P(\text{随机选取的对是一致的}) - P(\text{随机选取的对是不一致的})$

## 变体

| 变体 | 适用场景 |
|------|---------|
| **Kendall τ-a** | 无并列（ties）的基础版本 |
| **Kendall τ-b** | 有并列时的修正版，最常用 |
| **Kendall τ-c** | 矩形（非方形）表格使用 |

在 NLP 评测中，τ-b 最为常见。

## 在 NLP 评测中的应用

### 机器翻译指标竞赛
WMT Metrics Shared Task 采用 Kendall's τ 作为衡量翻译指标质量的核心指标，计算方式为：将所有系统输出两两比较，检验指标排名与人工评测排名的一致性。

$$\tau = \frac{|\text{一致的成对比较}| - |\text{不一致的成对比较}|}{|\text{所有成对比较}|}$$

### LLM 成对偏好比较
在基于成对比较的评测中（如 Chatbot Arena），τ 可衡量人工评判顺序与模型 Elo 排名的一致性。

### 基准排名稳定性
通过计算不同评测条件下模型排名的 Kendall τ，量化排名对评测设置变化的鲁棒性。

## Kendall's τ vs Spearman's ρ

| 维度 | Kendall τ | Spearman ρ |
|------|-----------|-----------|
| 计算基础 | 成对比较 | 等级差平方 |
| 取值范围 | [-1, 1] | [-1, 1] |
| 数值大小 | 通常比 ρ 略低 | 通常比 τ 略高 |
| 概率解释 | 直观（概率差） | 较不直观 |
| 对异常值鲁棒性 | 高 | 较高 |
| 统计效率 | 略低 | 略高 |

两者结论通常一致，但 τ 具有更直观的概率解释，在需要解释"两种排名有多一致"时更便于表达。

## 局限性

- 计算复杂度为 O(n²)（朴素实现），n 较大时计算成本较高（可用 O(n log n) 算法优化）
- 与 Pearson r 一样，τ 反映单调相关性，不能完全捕捉非单调关系
- 样本量较小时，τ 的统计检验功效相对有限

## 相关概念

- [[Spearman-correlation]]：基于等级差的排名相关，与 τ 常一起报告
- [[Pearson-correlation]]：线性相关系数，适合连续数据
- [[correlation-with-human]]：NLP 评测中相关性分析的应用背景
