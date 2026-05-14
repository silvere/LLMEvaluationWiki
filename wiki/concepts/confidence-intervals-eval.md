---
title: "评测置信区间（Confidence Intervals in Evaluation）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources:
  - "Dror, R., et al. (2018). The Hitchhiker's Guide to Testing Statistical Significance in Natural Language Processing. ACL 2018."
  - "Bouthillier, X., et al. (2021). Accounting for Variance in Machine Learning Benchmarks. MLSys 2021."
---

# 评测置信区间

## 定义

**评测置信区间（Confidence Intervals in Evaluation）**是量化评测结果**统计不确定性**的工具，表示在重复实验或使用不同数据样本时，真实性能参数落在某范围内的概率。在 NLP 和 LLM 评测中，报告置信区间是科学、负责任地呈现评测结果的重要组成部分。

## 为何需要置信区间

单点评测分数往往给人以精确性的错觉：

- 基准测试集大小有限（如 MMLU 测试集约 14k 题），存在抽样误差
- 模型生成具有随机性（temperature > 0 时，同一输入的不同运行结果不同）
- 评测协议的细节差异（提示格式、解码参数）导致分数波动
- 没有置信区间，就无法判断两个模型之间的分数差异是否统计显著

## 常用方法

### Bootstrap 置信区间
最常用于 NLP 评测的方法：

1. 从测试集中有放回地重采样 N 次（如 N=1000）
2. 每次计算评测指标
3. 取重采样分布的 2.5% 和 97.5% 分位数作为 95% 置信区间

**优点**：无参数假设，适用于各种评测指标
**缺点**：计算量较大

### Wilson 区间（用于二项比例）
适用于准确率（accuracy）这类二项比例的置信区间：

$$\tilde{p} = \frac{n_s + z^2/2}{n + z^2}$$

$$CI = \tilde{p} \pm z\frac{\sqrt{n_s(1-n_s/n)/n + z^2/4n}}{n + z^2/n}$$

其中 $z$ 为标准正态分布的分位数（95% 区间取 1.96），$n_s$ 为正确预测数，$n$ 为总样本数。

### 正态近似
对于大样本，准确率的置信区间可近似为：

$$\hat{p} \pm z \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$$

## 在 LLM 评测中的应用

### 基准性能报告
顶级 LLM 的 MMLU 分数往往相差不到 1%，若不报告置信区间，性能差异可能实为统计噪声：
- 在 1,000 道题目上，准确率 85% 的 95% 置信区间约为 ±2.2%
- 这意味着两个分数分别为 84.5% 和 85.3% 的模型可能并无统计显著差异

### 多次运行的方差
对于生成式评测任务（如 MT-Bench），建议多次运行（不同随机种子）并报告均值 ± 标准差。

### 系统比较的统计显著性
在比较两个系统时，应使用统计检验（如 McNemar 检验、Bootstrap 显著性检验）判断差异是否显著，而非仅看点估计分数的大小。

## 当前 LLM 评测实践中的问题

目前大多数 LLM 技术报告和排行榜不报告置信区间，这是一个已被多次批评的实践缺陷：
- 排行榜上名次接近的模型可能在统计上无显著差异
- 单次评测结果可能受随机种子影响，存在较大方差

## 相关概念

- [[effect-size-NLP]]：效应量，判断差异的实际意义
- [[McNemar-test]]：两分类器的成对显著性检验
- [[Wilcoxon-test]]：非参数比较检验
