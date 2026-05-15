---
title: "SparseEval: Efficient Evaluation of Large Language Models by Sparse Optimization"
type: paper
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
source_type: paper
url: "https://arxiv.org/abs/2602.07909"
ingested: "2026-05-14"
sources:
  - "https://arxiv.org/abs/2602.07909"
year: 2026
authors:
  - "Taolin Zhang"
  - "Hang Guo"
  - "Wang Lu"
  - "Tao Dai"
discusses:
  - "[[sparse-evaluation]]"
  - "[[benchmark-design]]"
  - "[[benchmark-design|benchmark-saturation]]"
  - "[[meta-evaluation]]"
---

# SparseEval: Efficient Evaluation of Large Language Models by Sparse Optimization

> 将 LLM 评测题目选择建模为稀疏优化问题，通过梯度下降优化锚点权重，仅用 100 道题即可准确估计全量基准分数。

## 核心贡献

- 首次将**梯度下降（Gradient Descent）**引入锚点权重优化，使用 MLP 建模稀疏聚合函数，实现端到端锚点权重优化 [REF: §4.1]
- 提出**锚点重要性评分（AIS）和候选重要性评分（CIS）**，通过反向传播梯度幅度和预测残差的点积定量评估每道题目的价值，驱动迭代锚点精炼 [REF: §4.3]
- 证明 LLM 基准测试中普遍存在**评测稀疏性（Evaluation Sparsity）**：六大基准（ARC、GSM8K、HellaSwag、MMLU、TruthfulQA、Winogrande）的题目-题目相似度矩阵均呈现明显的聚类块结构，簇内相似度 0.72–0.89 [REF: Figure 1]
- 在 Open-LLM Leaderboard 上将训练模型数量从 300 扩展到 **5,000**，大幅提升评测泛化验证范围 [REF: §5.1]

## 主要 Claim

- SparseEval 在 6 个 LLM 基准测试上的 MAE 一致低于 Anchor Points、gp-IRT、TailoredBench，最多降低约 **2%**；Kendall's τ 最多提升约 **0.1** [REF: Table 1]
- 仅使用 **100 个锚点**，SparseEval 可达到其他方法需 **500+ 个锚点**才能达到的估计精度，实现超过 **5× 的锚点数缩减** [REF: Figure 3 / §5.3]
- 当锚点数为 100 时，SparseEval 在 ARC 上的 MAE 为 **1.165%**，Kendall's τ 为 **0.917**；在 HellaSwag 上 MAE 仅 **0.827%**，τ = **0.918** [REF: Table 1]
- 传统聚类方法（如 Anchor Points）随锚点数增加反而性能下降，而 SparseEval 保持单调改善 [REF: Figure 3]
- 消融实验证明锚点精炼显著优于纯 k-means 或随机初始化：以 ARC 20 锚点为例，SparseEval MAE=1.778% vs. k-means MAE=1.945% vs. Random MAE=3.131% [REF: Table 2]

## 方法 / 数据集规模

- 数据来源：Open-LLM Leaderboard 中 **5,000 个模型**在 ARC、GSM8K、HellaSwag、MMLU、TruthfulQA、Winogrande 六个基准上的得分矩阵 [REF: §5.1]
- 划分：200 个模型作为验证/测试集（各半），其余为训练集 [REF: §5.1]
- 网络结构：**4 层 MLP**，学习率 6×10⁻⁴，精炼步数设为 10 [REF: §5.1]
- 评测指标：**MAE（↓）** 和 **Kendall's τ（↑）** [REF: §5.1]
- 题目规模：锚点数从 20 到 100 进行消融，全量评测题目数因基准不同（ARC ≈1,000，HellaSwag ≈10,000，MMLU ≈14,000+） [REF: Figure 1]

## 主要实验结果

以 100 个锚点为例（SparseEval vs. 最强基线 TailoredBench）：

| 基准 | SparseEval MAE | TailoredBench MAE | SparseEval τ | TailoredBench τ |
|---|---|---|---|---|
| ARC | **1.165%** | 2.413% | **0.917** | 0.873 |
| GSM8K | **1.619%** | 4.203% | **0.936** | 0.912 |
| HellaSwag | **0.827%** | 1.968% | **0.918** | 0.876 |
| MMLU | **0.842%** | 2.019% | **0.908** | 0.862 |
| TruthfulQA | **1.027%** | 1.577% | **0.931** | 0.895 |
| Winogrande | **1.027%** | 3.120% | **0.897** | 0.788 |

[REF: Table 1]

## 局限性

- 锚点筛选与权重训练依赖已有模型得分数据，对全新能力域或无历史数据的新基准适用性有限
- 稀疏结构假设在高异质性模型集合（如专业领域模型与通用模型混合）下可能减弱
- 论文在文本理解、数学等任务上验证，对多模态、代码等评测的迁移性待验证

## 相关页面

- [[sparse-evaluation]]
- [[benchmark-design]]
- [[benchmark-design|benchmark-saturation]]
- [[meta-evaluation]]
- [[significance-testing]]
