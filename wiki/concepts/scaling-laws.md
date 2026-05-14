---
title: "扩展定律（Scaling Laws）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 扩展定律（Scaling Laws）

> 描述 LLM 性能随模型参数量、训练数据量和计算量增加呈现可预测幂律关系的规律，为预训练资源分配提供理论依据，arxiv: 2001.08361。

## 定义

扩展定律（Scaling Laws）由 Kaplan et al. 于 2020 年在 OpenAI 论文中系统提出，发现语言模型的测试集损失（困惑度）与三个关键变量呈幂律关系：

$$L(N) \sim N^{-\alpha_N}, \quad L(D) \sim D^{-\alpha_D}, \quad L(C) \sim C^{-\alpha_C}$$

其中 N 为参数量，D 为训练 token 数，C 为计算量（FLOPs），α 为幂律指数（Kaplan 等人测量约为 0.07-0.08）。

**Chinchilla 修正**（Hoffmann et al., 2022，arxiv: 2203.15556）：对 Kaplan 的工作进行了重要修正，指出给定计算预算下，模型和数据应等比例扩展，最优比例约为每个参数训练约 20 个 token，而非 Kaplan 版本偏向更大模型的结论。

## 重要性（在 LLM 评测中）

扩展定律对 LLM 评测具有深远的方法论影响：

1. **性能预测**：可在训练完成前预测给定规模模型的预期损失，指导是否值得训练全量模型
2. **基准设计挑战**：幂律增长意味着模型进步是连续的，固定难度的基准会随时间被"饱和"（[[benchmark-saturation]]）
3. **计算效率评测**："给定 FLOP 预算下最优模型"是评测训练效率的核心问题
4. **涌现能力解读争议**：扩展定律的连续性与涌现能力的"相变"观察之间存在张力

## 主要方法/实现

**预测建模**：
```python
# 拟合幂律曲线预测性能
import numpy as np
from scipy.optimize import curve_fit

def power_law(x, a, alpha):
    return a * np.power(x, -alpha)

# 用小规模实验点拟合，外推大规模性能
params, _ = curve_fit(power_law, param_counts, test_losses)
predicted_loss = power_law(target_params, *params)
```

**IsoFLOP 曲线**：在固定计算预算下，训练不同参数量的模型，找出最优参数量-数据量配比。

**下游任务扩展**：Kaplan 版本聚焦于语言建模损失，下游任务能力的扩展规律需单独测量，不同任务的扩展曲线斜率差异较大。

## 局限与挑战

- **跨架构不可比**：扩展定律对特定架构成立，不同架构（MoE vs Dense）的幂律参数不同
- **下游任务不总遵循幂律**：涌现能力在某些任务上表现为阈值行为而非平滑幂律
- **数据质量未纳入**：原始扩展定律假设训练数据质量固定，实际上数据质量变化会破坏预测
- **过度优化风险**：完全依赖扩展定律可能忽视架构创新、数据质量改进等非扩展性提升路径
- **RLHF 后失效**：扩展定律描述的是预训练性能，经过 RLHF/指令调整后排名可能重排

## 相关页面

- [[emergent-capabilities]] — 与扩展定律连续性相矛盾的涌现现象
- [[perplexity]] — 扩展定律的核心测量指标
- [[benchmark-saturation]] — 扩展导致的基准饱和问题
- [[evaluation-overfitting]] — 针对特定基准的过度优化
