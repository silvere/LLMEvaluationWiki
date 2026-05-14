---
title: "Wilcoxon 检验（Wilcoxon Test）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources:
  - "Wilcoxon, F. (1945). Individual comparisons by ranking methods. Biometrics Bulletin."
  - "Demšar, J. (2006). Statistical Comparisons of Classifiers over Multiple Data Sets. Journal of Machine Learning Research."
---

# Wilcoxon 检验

## 定义

**Wilcoxon 检验**是一类非参数统计检验，不依赖数据的正态分布假设，通过对秩次（rank）进行分析来检验两组数据是否存在显著差异。在 NLP 评测中，Wilcoxon 检验被用于在不满足参数检验前提时比较两个模型或系统的性能差异。

## 两种主要形式

### Wilcoxon 符号秩检验（Signed-Rank Test）
适用于**成对（paired）样本**比较，如同一测试集上两个模型的逐样本得分：

1. 计算每对样本的差值 $d_i$
2. 对差值的绝对值 $|d_i|$ 排秩
3. 分别计算正差值和负差值的秩和
4. 取较小的秩和作为检验统计量 $W$

**在 NLP 中的应用**：比较模型 A 和模型 B 在相同测试集上的逐样本评分（如 BLEU、F1）差异是否显著。

### Wilcoxon 秩和检验（Rank-Sum Test / Mann-Whitney U Test）
适用于**独立样本**比较，也称 Mann-Whitney U 检验：

检验两个独立样本来自相同分布的零假设。

**在 NLP 中的应用**：比较来自两种不同数据分布的评测结果。

## 与参数检验（t 检验）的比较

| 维度 | Wilcoxon 检验 | 配对 t 检验 |
|------|-------------|------------|
| 分布假设 | 无（非参数） | 正态分布 |
| 对异常值鲁棒性 | 高 | 低 |
| 统计功效（正态数据时） | 略低 | 略高 |
| 适用数据类型 | 连续或有序 | 连续 |

当数据不满足正态假设时（NLP 评测中较常见），Wilcoxon 检验比 t 检验更可靠。

## 多数据集比较：Demšar 建议

Demšar（2006）的经典论文为 NLP/ML 多数据集模型比较提供了统计检验框架：
- **两个分类器比较**：使用 Wilcoxon 符号秩检验（优于成对 t 检验）
- **多个分类器比较**：使用 Friedman 检验（多组版 Wilcoxon），随后做事后检验（如 Nemenyi 检验）

该框架在 NLP 多数据集评测论文中被广泛引用。

## 在 LLM 评测中的实践

- **基准集合比较**：当研究者声称新方法在多个 NLP 基准上"普遍"优于基线时，Wilcoxon 检验可验证该改进是否统计显著
- **人工评测分数比较**：人工评测分数往往呈非正态分布（如 1-5 分量表），Wilcoxon 检验比 t 检验更适合
- **鲁棒性评估**：在不同提示格式下的性能差异分析

## 局限性

- 只能检验差异是否显著，不直接量化差异大小（需配合效应量）
- 对并列值（ties）的处理可能影响结果，尤其在粗粒度评分量表（如 1-5 分）中
- 样本量极小时（< 5 对），检验功效很低

## 相关概念

- [[McNemar-test]]：专用于两个分类器的成对二元比较
- [[effect-size-NLP]]：量化差异的实际大小
- [[confidence-intervals-eval]]：补充统计显著性的不确定性量化
