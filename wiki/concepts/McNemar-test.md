---
title: "McNemar 检验（McNemar's Test）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources:
  - "McNemar, Q. (1947). Note on the sampling error of the difference between correlated proportions or percentages. Psychometrika."
  - "Dietterich, T.G. (1998). Approximate Statistical Tests for Comparing Supervised Classification Learning Algorithms. Neural Computation."
---

# McNemar 检验

## 定义

**McNemar 检验（McNemar's Test）**是一种用于比较**两个分类器在相同测试集上错误模式**的成对非参数统计检验。其核心思想是：两个性能相当的分类器不仅总体准确率应相近，其错误应该"对称"分布——若分类器 A 错而 B 对的样本数 ≈ B 错而 A 对的样本数，则两者无显著差异。

## 原理

对于在同一测试集上的两个分类器 A 和 B，构建如下 2×2 列联表：

|  | B 正确 | B 错误 |
|--|--------|--------|
| **A 正确** | $n_{11}$ | $n_{12}$ |
| **A 错误** | $n_{21}$ | $n_{22}$ |

McNemar 检验统计量只关注**不一致对**（即只有一个分类器答对的样本）：

$$\chi^2 = \frac{(n_{12} - n_{21})^2}{n_{12} + n_{21}}$$

在零假设（两分类器无差异）下，$\chi^2$ 近似服从自由度为 1 的卡方分布。

当样本量较小时（$n_{12} + n_{21} < 25$），应使用 Yates 连续性修正或精确二项检验。

## 在 NLP 评测中的应用

### 模型对比分析
假设模型 A（旧）准确率 84%，模型 B（新）准确率 86%，McNemar 检验可判断这 2% 的改进是否统计显著：
- 若主要由 A 答错 B 答对的样本（$n_{21}$）主导，且 $n_{12} \ll n_{21}$，则差异显著
- 若 $n_{12}$ 和 $n_{21}$ 接近（两者互补答对），则差异可能不显著

### 错误分析
McNemar 检验不仅是显著性检验，也是深度错误分析工具：
- **$n_{12}$（A 对 B 错）大于 $n_{21}$（B 对 A 错）**：模型 B 虽总体准确率更高，但在某子集上比 A 更差
- **$n_{12} \approx n_{21}$**：两模型犯错位置高度重叠，改进主要来自共同答对的样本增加

### 消融实验
在 NLP 论文中，McNemar 检验常用于验证某个模块的加入是否带来了显著改进（对比有/无该模块的两个系统）。

## McNemar 检验 vs 其他检验

| 检验 | 适用场景 | 数据要求 |
|------|---------|---------|
| McNemar | 成对二元预测比较 | 相同测试集，二元输出 |
| Wilcoxon 符号秩检验 | 成对连续分数比较 | 相同测试集，连续分数 |
| t 检验（成对） | 成对连续分数，正态假设 | 相同测试集，正态分布 |
| 卡方检验 | 独立样本比例差异 | 独立样本 |

McNemar 检验是 NLP 二分类任务（如 NLI、情感分析）中**最适合的成对比较方法**。

## 局限性

- 只适用于**二元分类**任务（多分类需要推广版本）
- 要求两个系统在**完全相同的测试集**上运行
- 当不一致对数量 ($n_{12} + n_{21}$) 较少时，检验功效低
- 不提供效应量信息，需配合其他度量使用

## 相关概念

- [[Wilcoxon-test]]：非参数成对比较，适用于连续分数
- [[effect-size-NLP]]：量化差异的实际大小
- [[confidence-intervals-eval]]：统计不确定性的量化
