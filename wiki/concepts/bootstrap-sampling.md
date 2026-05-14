---
title: "自助采样法（Bootstrap Sampling）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 自助采样法（Bootstrap Sampling）

> 通过对测试集进行有放回的重复抽样来估计统计量的分布，无需正态分布假设，是 NLP 评测中计算置信区间和显著性检验的标准非参数方法。

## 定义

自助采样法（Bootstrap Sampling）由 Efron (1979) 提出，核心思路：现有测试集是目标分布的有限样本，通过有放回地重采样模拟"如果有不同的测试集"的情况，估计统计量的抽样分布。

**基本流程**：
1. 原始测试集 D 包含 n 个样本
2. 有放回地从 D 中抽取 n 个样本，得到 bootstrap 样本 D*
3. 在 D* 上计算目标统计量（如 BLEU 分数）
4. 重复步骤 2-3 共 B 次（通常 B = 1000-10000）
5. 用 B 个统计量估计分布，计算置信区间

**95% 置信区间**：取 B 个统计量的 2.5 和 97.5 百分位数（百分位法）。

## 重要性（在 LLM 评测中）

Bootstrap 是 NLP 和 LLM 评测最重要的统计工具之一：

1. **指标置信区间**：报告 BLEU/F1/Pass@k 时，同时报告 bootstrap 95% CI，比只报告点估计更诚实
2. **显著性检验**：配对 bootstrap 检验被 MT 评测（WMT）等采用为标准显著性检验方法
3. **小测试集场景**：正态分布假设在小测试集（n < 100）时不可靠，bootstrap 是更好的选择
4. **ELO 评分不确定性**：Chatbot Arena 使用 bootstrap 计算 ELO 评分的置信区间

## 主要方法/实现

**基础 Bootstrap CI**：
```python
import numpy as np

def bootstrap_confidence_interval(scores, n_bootstrap=10000, alpha=0.05):
    """
    scores: 每个测试样本的性能分数列表
    返回：(点估计, 置信区间下界, 置信区间上界)
    """
    original_mean = np.mean(scores)
    bootstrap_means = []
    
    for _ in range(n_bootstrap):
        boot_sample = np.random.choice(scores, size=len(scores), replace=True)
        bootstrap_means.append(np.mean(boot_sample))
    
    lower = np.percentile(bootstrap_means, 100 * alpha / 2)
    upper = np.percentile(bootstrap_means, 100 * (1 - alpha / 2))
    
    return original_mean, lower, upper
```

**配对 Bootstrap 显著性检验**（见 [[significance-testing]] 代码示例）：将 bootstrap 用于检验两个模型性能差异是否显著。

**sacrebleu 的 bootstrap**：sacrebleu 库内置了 bootstrap 置信区间计算，是机器翻译评测的标准工具。

## 局限与挑战

- **计算成本**：10000 次重采样 × 重新评测，对大测试集和慢指标成本高
- **测试集代表性假设**：Bootstrap 假设测试集能代表真实分布，若测试集有系统偏差则 CI 同样偏差
- **聚类/相关性问题**：若测试样本不独立（如来自同一文档的多个句子），标准 bootstrap 低估方差，需使用块 bootstrap
- **极端分布**：当性能分数分布高度偏斜时，百分位法 CI 可能不对称，需使用 BCa（bias-corrected accelerated）方法
- **解释需要统计背景**：置信区间的含义（频率主义解释）常被误解为贝叶斯概率陈述

## 相关页面

- [[significance-testing]] — Bootstrap 在显著性检验中的应用
- [[BLEU]] — 常用 Bootstrap CI 的评测指标
- [[benchmark-design]] — 基准设计中的样本量与统计功效
- [[inter-annotator-agreement]] — 标注一致性系数的 Bootstrap 置信区间
