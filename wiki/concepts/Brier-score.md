---
title: "Brier 分数（Brier Score）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Brier 分数（Brier Score）

> 衡量概率预测准确性的严格评分规则，计算预测概率与实际结果之间的均方误差，越低越好，是评测模型置信度校准质量的严格指标。

## 定义

Brier 分数由 Glenn Brier 于 1950 年提出，最初用于气象概率预测评测，后被广泛用于评测概率预测的质量：

$$\text{BS} = \frac{1}{N} \sum_{i=1}^{N} (f_i - o_i)^2$$

其中 f_i 是预测概率，o_i 是实际结果（0 或 1）。

**范围**：0（完美预测）到 1（最差预测，总是以 100% 确信度预测错误结果），随机预测（f=0.5）的 Brier 分数为 0.25。

**与 ECE 的区别**：
- ECE 衡量置信度与准确率的一致性（校准度）
- Brier 分数同时惩罚校准差和分辨率差（无论置信度如何，都惩罚错误预测）
- Brier 分数是严格的"proper scoring rule"，鼓励报告真实概率

## 重要性（在 LLM 评测中）

Brier 分数在 LLM 评测中的作用随置信度评测需求的增长而提升：

1. **多项选择基准**：在 MMLU、ARC 等选择题基准中，可基于模型的选项概率分布计算 Brier 分数
2. **不确定性评测**：与 ECE 互补，提供另一个维度的概率预测质量评估
3. **人类预测能力研究**：在比较 LLM 与人类预测能力时，Brier 分数是常用的对比指标
4. **问答任务校准评测**：TriviaQA 等问答任务中，用模型的 token 概率作为置信度计算 Brier 分数

## 主要方法/实现

**Python 实现**：
```python
import numpy as np

def brier_score(probabilities, outcomes):
    """
    probabilities: 模型预测为正类的概率列表
    outcomes: 实际结果（0 或 1）的列表
    """
    probs = np.array(probabilities)
    outs = np.array(outcomes)
    return np.mean((probs - outs) ** 2)

# 多类别 Brier 分数
def multiclass_brier_score(prob_matrix, true_labels):
    """
    prob_matrix: (n_samples, n_classes) 的概率矩阵
    true_labels: 真实类别索引
    """
    n, k = prob_matrix.shape
    one_hot = np.eye(k)[true_labels]
    return np.mean(np.sum((prob_matrix - one_hot) ** 2, axis=1))
```

**分解分析**：Brier 分数可分解为可靠性（reliability）、分辨率（resolution）和不确定性（uncertainty）三部分，帮助诊断概率预测的具体缺陷。

**与交叉熵的关系**：两者都是 proper scoring rule，但 Brier 分数对离群预测更宽容（平方 vs 对数惩罚）。

## 局限与挑战

- **基准率依赖**：不同任务的 Brier 分数基准不同（类别不均衡时随机预测分数更低），跨任务比较需归一化
- **开放生成场景不适用**：需要明确定义的预测类别空间，开放式生成任务无法直接应用
- **与准确率解耦**：高准确率模型的 Brier 分数不一定低（若用极端置信度预测），反映不同能力维度
- **LLM 概率校准问题**：LLM 的 softmax 输出概率普遍过度自信，直接用于 Brier 分数计算可能偏高

## 相关页面

- [[expected-calibration-error]] — 与 Brier 分数互补的校准指标
- [[calibration]] — 校准的完整概念
- [[significance-testing]] — 判断 Brier 分数差异是否显著
- [[benchmark-design]] — 在基准中加入概率评测维度
