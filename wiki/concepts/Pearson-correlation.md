---
title: "Pearson 相关系数（Pearson Correlation）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources:
  - "Pearson, K. (1895). Notes on regression and inheritance in the case of two parents. Proceedings of the Royal Society of London."
  - "Benesty, J., et al. (2009). Pearson Correlation Coefficient. In Noise Reduction in Speech Processing. Springer."
---

# Pearson 相关系数

## 定义

**Pearson 相关系数（Pearson Correlation Coefficient）**，通常记作 $r$，是衡量两个连续变量之间**线性相关**程度的统计量。在 NLP 评测中，常用于量化自动评测指标的分数与人工评测分数之间的线性关联强度。

$$r = \frac{\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum_{i=1}^{n}(x_i-\bar{x})^2 \cdot \sum_{i=1}^{n}(y_i-\bar{y})^2}}$$

其中 $x_i$、$y_i$ 为两组观测值，$\bar{x}$、$\bar{y}$ 为各自均值。

## 取值与解读

- $r = 1$：完全正线性相关
- $r = -1$：完全负线性相关
- $r = 0$：无线性相关
- $|r| > 0.9$：强相关（在 NLP 评测中通常认为"高质量指标"的门槛）
- $0.7 < |r| \leq 0.9$：中等偏强相关
- $|r| \leq 0.7$：弱相关或无法依赖

## 在 NLP 评测中的应用

### 机器翻译指标评测
WMT 竞赛中，Pearson r 用于计算系统级翻译指标（如 BLEU、COMET）与人工 MQM 分数的相关性。系统级 r 通常远高于句子级。

### 人工评测一致性
评测标注一致性时，Pearson r 可衡量两位标注者给出的连续评分（如 1-5 分的流利度评分）之间的线性一致程度。

### 基准质量评测
在构建新基准时，Pearson r 用于验证新基准与既有人类判断数据集的相关性，以证明新基准的效度。

## 前提假设与局限性

Pearson r 的有效性依赖以下假设：

1. **线性关系**：两个变量之间的关系是线性的
2. **连续型数据**：适用于连续或接近连续的数据，不适合有序分类（Likert 量表需谨慎使用）
3. **正态分布**（或样本量足够大以使中心极限定理生效）
4. **无异常值**：单个异常值可能严重扭曲 r 值

**关键局限**：Pearson r 仅测量**线性**相关，若两变量之间存在单调非线性关系，r 可能低估真实相关性。这种情况下 Spearman 相关系数更为合适。

## 与其他相关系数的比较

| 指标 | 数据类型 | 关系假设 | 对异常值敏感性 |
|------|---------|---------|-------------|
| Pearson r | 连续 | 线性 | 高 |
| Spearman ρ | 有序/连续 | 单调 | 低 |
| Kendall τ | 有序/连续 | 单调 | 低 |

在 NLP 评测的实践中，由于评测分数分布往往不满足正态假设，Spearman 和 Kendall 系数通常被认为是更鲁棒的选择。但 Pearson r 仍被广泛报告，以便与历史结果对比。

## 相关概念

- [[Spearman-correlation]]：等级相关系数，对非线性关系更鲁棒
- [[Kendall-tau]]：基于成对比较的排名一致性指标
- [[correlation-with-human]]：NLP 评测中相关性分析的总体框架
