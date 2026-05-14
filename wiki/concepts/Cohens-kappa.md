---
title: "Cohen's κ 系数"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Cohen's κ 系数

> 衡量两个标注者分类一致性的统计指标，在原始百分比一致率的基础上扣除随机一致的预期概率，κ > 0.8 通常视为强一致。

## 定义

Cohen's κ（kappa）由 Cohen 于 1960 年提出，公式为：

$$\kappa = \frac{P_o - P_e}{1 - P_e}$$

其中：
- **P_o**（Observed Agreement）：实际观测到的一致率
- **P_e**（Expected Agreement）：假设两标注者独立随机标注时的预期一致率

P_e 根据两标注者各类别的边际分布计算：若标注者 A 和 B 分别以某概率选择各类别，则随机情况下他们偶然一致的期望概率即为 P_e。

κ = 1 表示完全一致；κ = 0 表示一致率与随机相当；κ < 0 表示一致率低于随机预期（极罕见）。

## 重要性（在 LLM 评测中）

Cohen's κ 是 NLP 标注质量报告的标准指标，在以下场景尤为关键：

1. **RLHF 偏好数据质量**：训练奖励模型时，标注者对"哪个回答更好"的一致性直接影响奖励信号质量
2. **基准标注验证**：学术论文发布新基准时必须报告 IAA，κ < 0.6 的基准通常不被接受
3. **LLM 裁判校准**：将 GPT-4 等作为裁判时，用 Cohen's κ 衡量其与人类标注者的对齐程度
4. **安全评测**：有害内容标注的一致性尤为重要，因为模糊边界案例影响安全策略

## 主要方法/实现

**Python 计算**：
```python
from sklearn.metrics import cohen_kappa_score

annotator_a = [1, 0, 1, 1, 0, 1, 0, 0]
annotator_b = [1, 0, 1, 0, 0, 1, 1, 0]
kappa = cohen_kappa_score(annotator_a, annotator_b)
```

**加权 κ**（Weighted Kappa）：对有序类别（如 1-5 分），可按分类间距离加权，使相邻错误的惩罚小于跨越大类别的错误：
```python
kappa_w = cohen_kappa_score(a, b, weights="linear")  # 或 "quadratic"
```

**混淆矩阵辅助分析**：结合混淆矩阵识别分歧集中在哪些类别对，指导标注指南修订。

## 局限与挑战

- **仅限两标注者**：超过两人标注时需改用 Fleiss' κ 或 Krippendorff's α
- **基率悖论**（Prevalence Paradox）：当某类别极度罕见时，即使一致率很高，κ 可能仍然很低，因 P_e 很小而 P_o 只是略高
- **标注者不独立的假设**：实践中标注者往往有背景知识重叠，P_e 的独立性假设不严格成立
- **仅适用分类数据**：连续评分需使用 ICC 等替代指标
- **样本量依赖**：小样本时 κ 的置信区间较宽，不宜过度解读

## 相关页面

- [[inter-annotator-agreement]] — 标注一致性综述
- [[Fleiss-kappa]] — 多标注者扩展版本
- [[Krippendorffs-alpha]] — 更通用的系数
- [[Likert-scale]] — 有序数据评分中的加权 κ 应用
