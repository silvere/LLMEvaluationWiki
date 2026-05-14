---
title: "Krippendorff's α 系数"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Krippendorff's α 系数

> 最通用的标注一致性系数，由 Klaus Krippendorff 提出，支持名义、序数、区间和比例等多种数据类型，适用于任意数量的标注者和缺失数据场景。

## 定义

Krippendorff's α 的核心思路与 κ 系数相同：观测不一致率与随机预期不一致率之比的补数：

$$\alpha = 1 - \frac{D_o}{D_e}$$

其中：
- **D_o**（Observed Disagreement）：观测到的实际不一致量
- **D_e**（Expected Disagreement）：随机情况下预期的不一致量

通过选择不同的**差异度量函数**（difference function）适配不同数据类型：
- **名义数据**：d(v,w) = 0 if v=w, else 1（类似 κ）
- **序数数据**：d(v,w) 基于有序等级之差
- **区间数据**：d(v,w) = (v-w)²（均方差）
- **比例数据**：d(v,w) = ((v-w)/(v+w))²

α 的取值范围理论上为 (-∞, 1]，实践中 α ≥ 0.80 为可靠一致，0.67 ≤ α < 0.80 为勉强可接受。

## 重要性（在 LLM 评测中）

相比 Cohen's κ 和 Fleiss' κ，Krippendorff's α 在以下场景有独特优势：

1. **Likert 量表评测**：LLM 输出质量的主观评分（1-5分）本质上是序数数据，α 可使用序数差异度量，比 κ 更准确
2. **不完整标注数据**：众包场景下部分标注者跳过某些样本，α 天然支持缺失值处理
3. **混合标注者数量**：不同样本有不同数量的标注者时，Fleiss' κ 无法使用而 α 可以
4. **内容分析研究**：LLM 输出的风格、立场、危害性等定性分析的一致性评估

## 主要方法/实现

**Python 实现（krippendorff 库）**：
```python
import krippendorff
import numpy as np

# 标注矩阵：行=标注者，列=样本，NaN 表示缺失
data = np.array([
    [1, 2, 3, 3, 2, 1, 4, 1, 2, np.nan],
    [1, 2, 3, 3, 2, 2, 4, 1, 2, 5],
    [np.nan, 3, 3, 3, 2, 3, 4, 2, 2, 5]
])

alpha_nominal = krippendorff.alpha(data, level_of_measurement='nominal')
alpha_ordinal = krippendorff.alpha(data, level_of_measurement='ordinal')
alpha_interval = krippendorff.alpha(data, level_of_measurement='interval')
```

**Bootstrap 置信区间**：对小样本数据，可通过自助抽样估计 α 的 95% 置信区间，避免对点估计过度解读。

**与 κ 的关系**：对于完整的双标注者名义数据，α 与 Cohen's κ 数值上等价（细微差异来自估计方式）。

## 局限与挑战

- **计算复杂度**：比 κ 系数计算量更大，样本量极大时需要优化
- **差异度量选择**：必须明确数据测量层次，选择错误的差异度量会导致错误结论
- **解释复杂性**：不同数据类型的 α 在相同数值下意义不同，跨研究比较需谨慎
- **小样本不稳定**：样本量 < 30 时 α 估计不可靠
- **仍受基率影响**：在极度不均衡分布下，α 同样可能偏低

## 相关页面

- [[inter-annotator-agreement]] — 标注一致性综述
- [[Cohens-kappa]] — 两标注者简化版本
- [[Fleiss-kappa]] — 多标注者版本
- [[Likert-scale]] — 需要 α 序数度量的评分场景
- [[human-eval-protocol]] — 人工评测中的一致性报告规范
