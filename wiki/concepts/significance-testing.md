---
title: "显著性检验（Significance Testing）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 显著性检验（Significance Testing）

> 判断 LLM 评测中观测到的性能差异是否超出随机波动范围的统计方法，防止将噪声误判为真实改进。

## 定义

显著性检验（Significance Testing）回答：两个模型在基准上观测到的性能差异，有多大概率仅仅是由于测试集抽样的随机性，而非真实能力差异？

在 NLP 评测中常用方法：
- **配对 t 检验**（Paired t-test）：假设每个测试样本的性能差异服从正态分布，计算 t 统计量
- **Wilcoxon 符号秩检验**（非参数）：不假设正态分布，对有序数据更鲁棒
- **Bootstrap 显著性检验**：通过重采样估计性能差异的分布（见 [[bootstrap-sampling]]）
- **McNemar's Test**：专用于两个分类器的正确/错误模式比较

**惯例**：p < 0.05 认为差异统计显著；p < 0.01 为强显著；NLP 评测中 p < 0.05 是报告新 SOTA 的最低标准。

## 重要性（在 LLM 评测中）

显著性检验是评测结果可信度的守门人：

1. **防止 SOTA 通货膨胀**：许多论文报告的微小提升（如 BLEU +0.1）可能不具统计显著性，滥用 SOTA 声明
2. **测试集大小估算**：显著性检验告诉我们需要多大的测试集才能可靠检测到特定大小的效果
3. **鲁棒性评估**：跨测试集的显著性检验揭示改进的泛化稳定性
4. **消融研究验证**：验证每个组件的贡献是否显著，防止错误归因

## 主要方法/实现

**配对 bootstrap 检验**：
```python
import numpy as np

def bootstrap_significance_test(scores_a, scores_b, n_bootstrap=10000, alpha=0.05):
    """
    检验 A 和 B 的性能差异是否显著
    scores: 每个样本的性能分数（如 EM 0/1 或 BLEU 分数）
    """
    observed_diff = np.mean(scores_a) - np.mean(scores_b)
    
    # Bootstrap 重采样
    bootstrap_diffs = []
    n = len(scores_a)
    for _ in range(n_bootstrap):
        idx = np.random.choice(n, n, replace=True)
        diff = np.mean(scores_a[idx]) - np.mean(scores_b[idx])
        bootstrap_diffs.append(diff)
    
    # 计算 p 值（双侧检验）
    p_value = np.mean(np.abs(bootstrap_diffs) >= np.abs(observed_diff))
    return observed_diff, p_value, p_value < alpha
```

**测试集大小与效果量**：使用统计功效分析（power analysis）确定：要以 80% 的把握检测到 2% 的性能差异，需要约 1500 个样本。

**报告规范**：论文应报告置信区间（CI）而非只报告 p 值，CI 同时传达效果大小和不确定性。

## 局限与挑战

- **多重检验问题**：若同时对多个指标/多个模型对进行检验，需进行 Bonferroni 等多重检验校正
- **测试集质量假设**：显著性检验假设测试集是目标分布的代表性样本，不符合时结论无效
- **效果大小缺失**：统计显著 ≠ 实践显著，0.1% 的提升可能统计显著但无实际价值
- **LLM 时代的大规模测试**：超大测试集下几乎任何差异都统计显著，p 值的参考价值下降
- **非独立性问题**：LLM 在相关样本上的错误不独立，违反许多检验的独立性假设

## 相关页面

- [[bootstrap-sampling]] — 用于显著性检验的重采样方法
- [[benchmark-design]] — 测试集大小设计与显著性要求
- [[F1-score]] — 常见的被检验的评测指标
- [[inter-annotator-agreement]] — 标注一致性的统计检验
