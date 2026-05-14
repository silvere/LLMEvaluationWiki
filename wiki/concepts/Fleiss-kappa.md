---
title: "Fleiss' κ 系数"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Fleiss' κ 系数

> Cohen's κ 的多标注者扩展版本，衡量三个或更多标注者对同一分类任务的一致程度，广泛用于众包标注质量评估。

## 定义

Fleiss' κ 由 Fleiss 于 1971 年提出，适用于固定类别数 k、每个样本由 n 个标注者独立标注（n ≥ 2，且每个样本的标注者可以不同）的场景。

公式与 Cohen's κ 结构相同：

$$\kappa = \frac{\bar{P} - \bar{P}_e}{1 - \bar{P}_e}$$

其中：
- **P̄**：所有样本的平均观测一致率，对每个样本计算同类标注对的比例后平均
- **P̄_e**：基于各类别总体边际分布计算的随机一致预期率

关键特性：每个样本的标注者可以不同（众包场景下常见），但每个样本的标注者数量必须相同。

## 重要性（在 LLM 评测中）

Fleiss' κ 在以下 LLM 评测场景中不可替代：

1. **众包偏好数据**：Amazon Mechanical Turk 等众包平台招募多个独立标注者，Fleiss' κ 评估整体一致性
2. **大型基准标注**：FLAN、SuperGLUE 等基准的多标注者标注质量验证
3. **人工评测协议**：多评估者对 LLM 回答质量（流畅性/准确性/有用性）的评分一致性
4. **安全标注**：Red-teaming 中多名安全专家对有害内容的一致性判断

## 主要方法/实现

**Python 计算**：
```python
import numpy as np

def fleiss_kappa(ratings):
    """
    ratings: (N_items, N_raters) 矩阵
    """
    N, n = ratings.shape
    k = int(ratings.max()) + 1
    # 每个样本中各类别的计数
    counts = np.zeros((N, k))
    for i in range(N):
        for j in range(n):
            counts[i, int(ratings[i, j])] += 1
    # 每个样本的 P_i
    P_i = (np.sum(counts ** 2, axis=1) - n) / (n * (n - 1))
    P_bar = np.mean(P_i)
    # 各类别的边际比例
    p_j = np.sum(counts, axis=0) / (N * n)
    P_e = np.sum(p_j ** 2)
    return (P_bar - P_e) / (1 - P_e)
```

**与 Cohen's κ 的关系**：当 n=2 且两标注者标注所有样本时，Fleiss' κ 等价于两标注者 Cohen's κ 的平均。

**实践中的分工**：大型标注项目通常先计算 Fleiss' κ 评估整体一致性，再对高分歧样本进行单独的 Cohen's κ 分析，找出具体分歧来源。

## 局限与挑战

- **每样本标注者数量需一致**：现实中不同样本的标注者数量可能不同，需要补全或使用 Krippendorff's α
- **与 Cohen's κ 同样的基率悖论**：极不均衡类别分布下 κ 偏低
- **不支持有序/连续数据**：序数评分（如 1-5 分）下无法加权，需改用 Krippendorff's α
- **标注者同质性假设**：Fleiss' κ 将所有标注者视为同质，无法识别个别低质量标注者
- **样本量需求**：稳定估计需要足够的样本量（通常 ≥ 30 个项目）

## 相关页面

- [[inter-annotator-agreement]] — 标注一致性综述
- [[Cohens-kappa]] — 两标注者版本
- [[Krippendorffs-alpha]] — 支持多种数据类型的通用系数
- [[crowdsourcing-eval]] — 众包评测中的质量控制
