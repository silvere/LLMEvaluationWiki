---
title: "效应量（Effect Size in NLP Evaluation）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources:
  - "Cohen, J. (1988). Statistical Power Analysis for the Behavioral Sciences. Lawrence Erlbaum Associates."
  - "Dror, R., et al. (2018). The Hitchhiker's Guide to Testing Statistical Significance in Natural Language Processing. ACL 2018."
---

# 效应量（Effect Size）

## 定义

**效应量（Effect Size）**是量化两组数据之间差异**实际大小**的统计量，与统计显著性（p 值）互补。统计显著性告诉我们"差异是否真实存在"，效应量告诉我们"差异有多大/有多重要"。在 NLP 和 LLM 评测中，效应量帮助区分"统计显著但实际无关紧要的微小差异"和"真正有实际意义的性能差距"。

## 为什么仅靠 p 值不够

- 大样本下，即使非常微小的差异（如准确率相差 0.1%）也可能统计显著（p < 0.05）
- 小样本下，实际重要的差异可能不显著（统计功效不足）
- p 值只说明差异不为零，不说明差异有多大

## 常用效应量度量

### Cohen's d
适用于两个连续分布的均值比较：

$$d = \frac{\mu_1 - \mu_2}{s_{pooled}}$$

**参考值**（Cohen 1988）：
- $|d| < 0.2$：可忽略效应
- $0.2 \leq |d| < 0.5$：小效应
- $0.5 \leq |d| < 0.8$：中等效应
- $|d| \geq 0.8$：大效应

### Cliff's δ（适合 NLP 评测）
非参数效应量，基于成对比较，适用于非正态分布数据：

$$\delta = P(X > Y) - P(X < Y)$$

取值范围 [-1, 1]，无需正态性假设，在 NLP 评测中更为适用。

### Cohen's κ（用于一致性）
用于标注一致性评测（详见 [[Cohens-kappa]]），衡量两位标注者超过随机水平的一致程度。

### 相关系数 r（效应量版本）
对于二元比较，$r = \sqrt{Z^2/n}$ 可作为效应量（0.1=小，0.3=中，0.5=大）。

## 在 LLM 评测中的应用

### 基准分数差异的实际意义
当两个模型的 MMLU 准确率分别为 85.2% 和 85.8% 时，差异是否有实际意义？
- 若 Cohen's d ≈ 0.1，则差异可忽略
- 若 d ≈ 0.5，则差异有实质意义

### 人工评测 vs 自动评测的对比
效应量可量化人工评测与自动指标之间的差异程度，辅助判断自动指标是否可替代人工评测。

### 模型改进的实际价值
新版本模型相比旧版本的改进，通过效应量可判断是否值得部署和推广（而不仅仅看 p 值）。

## 与统计显著性的配合使用

最佳实践是同时报告：
1. 点估计（均值/比例）
2. 置信区间（不确定性）
3. 统计显著性（差异是否真实）
4. 效应量（差异有多大）

**示例报告**："模型 B 的准确率（86.2%）显著高于模型 A（84.8%），$p < 0.01$，Cohen's d = 0.35（小至中等效应）。"

## 局限性

- 效应量的"小/中/大"参考标准来自心理学研究，在 NLP 中可能需要针对具体任务重新校准
- 不同效应量度量之间难以直接比较
- 效应量本身也有抽样误差，应报告其置信区间

## 相关概念

- [[confidence-intervals-eval]]：置信区间，量化不确定性
- [[McNemar-test]]：成对比较的统计检验
- [[Wilcoxon-test]]：非参数统计检验
