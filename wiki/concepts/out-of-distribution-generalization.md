---
title: "分布外泛化（Out-of-Distribution Generalization）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources:
  - "Koh, P.W., et al. (2021). WILDS: A Benchmark of in-the-Wild Distribution Shifts. ICML 2021."
  - "Shen, Z., et al. (2021). Towards Out-of-Distribution Generalization: A Survey. arXiv:2108.13624."
---

# 分布外泛化（Out-of-Distribution Generalization）

## 定义

**分布外泛化（Out-of-Distribution Generalization，OOD Generalization）**是指机器学习模型在与训练数据分布不同（分布外）的输入上，仍能保持良好性能的能力。与标准泛化（在同分布数据上）相比，OOD 泛化要求更深层次的理解，而非对训练分布特定统计规律的记忆。

## 重要性

OOD 泛化能力是衡量 LLM 真实推理能力的关键维度，原因在于：

1. **真实部署场景多变**：用户请求的分布与训练数据分布几乎不可能完全相同
2. **揭示真实理解**：只有真正理解任务的模型才能在新分布上保持性能，依赖统计捷径的模型会在 OOD 场景下失败
3. **安全关键性**：在医疗、法律等高风险领域，分布外失败可能带来严重后果

## OOD 类型与评测

### 领域/话题泛化
模型在一个话题/领域上训练，在新话题上评测：
- **基准示例**：WILDS（野外分布偏移）、MultiNLI → SNLI-hard

### 组合泛化（Compositional Generalization）
模型在简单组合上训练，在新的组合方式上评测：
- **基准示例**：SCAN（简单组合推理）、COGS（组合语义泛化）
- **LLM 相关**：MATH 题目中的新颖运算组合

### 长度泛化（Length Generalization）
模型在短序列上训练，在更长序列上评测：
- 算法推理（如加法）在超过训练长度时是否仍然有效？

### 对抗性 OOD
专门构造破坏捷径的分布外样本：
- **基准示例**：HANS（破坏词汇重叠捷径）、PAWS（破坏同一词序列→释义的假设）

## 在 LLM 评测中的应用

OOD 评测在 LLM 研究中体现为：

1. **时间 OOD**：用训练截止日期后发布的数据评测（如用 2025 年事件测试 2024 年截止的模型）
2. **格式 OOD**：用训练时未见过的提示格式/任务描述测试
3. **语言 OOD**：用训练中低资源的语言测试（如 TyDiQA 的低资源语言）
4. **难度 OOD**：用超过训练难度分布的题目测试（如 FrontierMath 对数学模型的挑战）

## OOD vs. In-Distribution 性能差异

研究发现，在同分布数据上表现出色的模型，在 OOD 数据上的性能下降幅度往往超出预期。这一"OOD 差距"（OOD Gap）成为评测模型真实泛化能力的关键指标。

理想的评测体系应同时报告：
- 同分布（in-distribution）性能
- 分布外（out-of-distribution）性能
- OOD 差距 = 两者之差

## 局限性与挑战

- OOD 的边界难以精确定义（什么程度的分布差异才算"分布外"？）
- 对大型预训练模型而言，OOD 的概念更难界定（预训练覆盖的数据分布极广）
- 针对特定 OOD 场景的优化可能不可泛化到其他 OOD 场景

## 相关概念

- [[distributional-shift]]：分布偏移，OOD 泛化问题的根源
- [[shortcut-learning]]：导致 OOD 泛化失败的学习行为
- [[benchmark-contamination]]：预训练污染可使 OOD 评测失效
