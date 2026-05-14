---
title: "Spearman 等级相关系数"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources:
  - "Spearman, C. (1904). The proof and measurement of association between two things. American Journal of Psychology."
  - "Freitag, M., et al. (2023). Results of the WMT23 Metrics Shared Task. WMT 2023."
---

# Spearman 等级相关系数

## 定义

**Spearman 等级相关系数（Spearman's Rank Correlation Coefficient）**，通常记作 $\rho$（rho），是一种非参数统计量，通过将原始数据转化为秩（rank）后计算相关性，衡量两个变量之间的**单调**相关程度。Spearman ρ 对数据分布没有正态性假设，对异常值具有较好的鲁棒性。

$$\rho = 1 - \frac{6 \sum_{i=1}^{n} d_i^2}{n(n^2 - 1)}$$

其中 $d_i = \text{rank}(x_i) - \text{rank}(y_i)$ 为第 $i$ 个样本在两个序列中秩的差值。

本质上，Spearman ρ 等同于对秩次数据计算 Pearson r。

## 取值与解读

- $\rho = 1$：两个排名完全一致（单调递增）
- $\rho = -1$：两个排名完全相反（单调递减）
- $\rho = 0$：无单调相关性
- $|\rho| > 0.9$：强排名一致性（NLP 评测中系统级指标的常见范围）

## 在 NLP 评测中的应用

### 机器翻译指标评测
WMT Metrics Shared Task 使用 Spearman ρ 量化翻译自动指标分数排名与人工评测排名的一致性：
- 系统级 ρ 用于比较不同翻译系统的整体性能排名
- BLEU 的系统级 Spearman ρ 通常在 0.85-0.95 之间
- COMET 等神经网络指标通常可达 0.95+

### LLM 能力评测
在多基准评测中，Spearman ρ 可分析：
- 不同基准之间的排名一致性（同一组模型在两个基准上排名是否相似）
- 人工评测与自动评测的排名相关性

### 标注一致性
当多位标注者提供有序评分时，计算其排名相关性以量化标注一致性（与 Kendall τ 互补）。

## Spearman ρ vs Pearson r

| 维度 | Spearman ρ | Pearson r |
|------|-----------|-----------|
| 数据要求 | 有序或连续 | 连续 |
| 分布假设 | 无 | 正态（严格来说） |
| 捕捉关系类型 | 单调 | 线性 |
| 对异常值敏感性 | 低 | 高 |
| 适用数据规模 | 中小型均可 | 中大型更稳定 |

在 NLP 评测实践中，由于评测分数分布往往存在偏态，Spearman ρ 通常比 Pearson r 更受推荐，因为它不要求线性关系且对异常值更稳健。

## 统计显著性

Spearman ρ 的统计检验：
- 样本量 $n \geq 10$ 时，可用 $t = \rho\sqrt{(n-2)/(1-\rho^2)}$ 进行 $t$ 检验
- 对于 NLP 评测（系统数量通常较少），应谨慎解读显著性，报告置信区间

## 局限性

- 对并列（ties）的处理需要修正（使用均值秩次）
- 当样本量较少（如仅比较 5-10 个模型）时，统计效力有限，ρ 的置信区间较宽
- 非参数特性意味着损失了部分信息（相比 Pearson r 对数值大小的利用）

## 相关概念

- [[Pearson-correlation]]：线性相关，Spearman 的参数化对应版本
- [[Kendall-tau]]：成对比较一致性，与 ρ 常一起报告
- [[correlation-with-human]]：与人类判断相关性的整体框架
