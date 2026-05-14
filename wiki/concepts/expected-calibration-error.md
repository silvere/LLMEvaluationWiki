---
title: "期望校准误差（Expected Calibration Error）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 期望校准误差（Expected Calibration Error）

> 衡量模型预测置信度与实际准确率之间差距的指标，ECE 越低说明模型的自信程度与其实际能力越匹配，是评测模型可靠性的关键指标。

## 定义

期望校准误差（Expected Calibration Error，ECE）量化了预测置信度的准确性：若模型声称对 100 道题有 80% 的把握，其中应该有约 80 道做对——如果只有 60 道做对，则存在过度自信（overconfidence）。

**计算方法**：
1. 将预测置信度分成 M 个等距桶（如 0-10%，10-20%，...，90-100%）
2. 对每个桶 B_m，计算该桶内样本的实际准确率 acc(B_m) 和平均置信度 conf(B_m)
3. 加权求和：

$$\text{ECE} = \sum_{m=1}^{M} \frac{|B_m|}{n} |acc(B_m) - conf(B_m)|$$

**校准曲线**：以置信度为 x 轴、实际准确率为 y 轴绘制的可靠性图（Reliability Diagram），完美校准的模型应接近对角线。

## 重要性（在 LLM 评测中）

ECE 在 LLM 评测中回答了一个关键问题："模型知道自己什么时候不知道答案吗？"

1. **不确定性评测**：高质量的 LLM 应能表达适当的不确定性，而非对所有答案都同样自信
2. **RLHF 后的校准退化**：研究发现经过 RLHF 的模型往往比基础模型更过度自信，ECE 是监测这一退化的指标
3. **医疗/法律等高风险应用**：在高风险场景中，模型知道"不知道"比给出自信但错误的回答更重要
4. **选择性预测**：通过允许模型"拒绝回答"并分析保留曲线（coverage-accuracy tradeoff），评测模型的实用可靠性

## 主要方法/实现

**Python 实现**：
```python
import numpy as np

def expected_calibration_error(confidences, accuracies, n_bins=10):
    bin_boundaries = np.linspace(0, 1, n_bins + 1)
    ece = 0.0
    for bin_lower, bin_upper in zip(bin_boundaries[:-1], bin_boundaries[1:]):
        # 找出置信度在此区间内的样本
        in_bin = (confidences > bin_lower) & (confidences <= bin_upper)
        prop_in_bin = in_bin.mean()
        if prop_in_bin > 0:
            accuracy_in_bin = accuracies[in_bin].mean()
            avg_confidence_in_bin = confidences[in_bin].mean()
            ece += prop_in_bin * abs(accuracy_in_bin - avg_confidence_in_bin)
    return ece
```

**LLM 置信度提取**：
- **Token 概率**：从 softmax 输出直接读取
- **口头化概率**（Verbal Probability）：让模型用语言表达置信度（"我有 90% 把握"）
- **多次采样一致性**：以一致率作为代理置信度

**Temperature Scaling**：训练后校准的最简单方法，在验证集上优化温度参数使 ECE 最小化。

## 局限与挑战

- **多项选择 vs 开放生成**：ECE 在选择题场景下容易计算，在开放生成场景下置信度难以定义
- **LLM 口头置信度的不可靠性**：要求 LLM 用语言表达置信度时，其口头表述与实际 token 概率往往不一致
- **分布外不确定性**：ECE 在训练分布内评测，对分布外样本的不确定性量化更困难
- **过度校准**：过分降低 ECE 可能导致模型丢失有效的区分性预测（对简单题低置信度）
- **Bin 数量依赖**：ECE 值受桶数量 M 影响，需报告具体设置

## 相关页面

- [[calibration]] — 校准的完整概念
- [[Brier-score]] — 另一个评测概率预测质量的指标
- [[perplexity]] — 与校准相关的语言模型基础指标
- [[hallucination-taxonomy]] — 过度自信是幻觉的重要成因
- [[human-eval-protocol]] — 人工评测中评估模型不确定性表达
