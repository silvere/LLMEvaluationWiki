---
title: "上下文学习（In-Context Learning）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 上下文学习（In-Context Learning）

> LLM 无需更新模型参数，仅通过 prompt 中的少量示例即可学习新任务的能力，由 GPT-3 论文（Brown et al., 2020）首次大规模展示。

## 定义

上下文学习（In-Context Learning，ICL）是指 LLM 在推理时读取 prompt 中的输入-输出示例，并利用这些示例推断任务规律，对新输入给出正确输出，全程不进行任何梯度更新。

核心形式：
- **零样本（Zero-shot）**：仅提供任务描述，无示例
- **单样本（One-shot）**：提供 1 个示例
- **少样本（Few-shot）**：提供 k 个示例（通常 k = 3-32）

ICL 的机理至今未被完全理解：理论上，Transformer 的注意力机制可以实现"隐式梯度下降"（Akyürek et al., 2022），但其实际工作机制仍是活跃研究领域。

## 重要性（在 LLM 评测中）

ICL 从根本上改变了 LLM 评测的范式：

1. **评测标准化的复杂性**：同一任务的 Zero-shot、Few-shot 结果差异巨大（有时 > 30%），必须统一规定评测设置
2. **示例选择的敏感性**：示例的选取、顺序（[[prompt-sensitivity]]）显著影响评测结果，引入评测噪声
3. **能力 vs 知识的分离**：ICL 能力本身是值得单独评测的能力维度，区别于参数化知识
4. **提示工程的标准化需求**：评测报告必须明确声明是否使用 ICL 以及使用多少示例

## 主要方法/实现

**示例格式**：
```
问题：2 + 2 = ?
答案：4

问题：5 × 3 = ?
答案：15

问题：7 + 8 = ?
答案：[模型预测]
```

**示例选择策略**：
- 随机选取（基线）
- 基于语义相似度检索最相关示例（KATE, Su et al., 2022）
- 覆盖多样性的示例选择

**链式示例（Chain-of-Thought ICL）**：在 few-shot 示例中包含推理步骤，显著提升推理任务性能（Wei et al., 2022）。

**评测标准实践**：MMLU 通常报告 5-shot；BIG-Bench 同时报告 0-shot 和 3-shot；代码评测通常 0-shot。

## 局限与挑战

- **示例顺序敏感性**：同样的示例以不同顺序呈现，性能可能相差 ±30%（Lu et al., 2022）
- **标签正确性的作用**：部分研究发现即使示例标签错误，ICL 也能工作，说明它主要学习的是格式而非内容
- **上下文窗口限制**：示例数量受上下文窗口约束，早期模型无法使用大量示例
- **与微调的比较**：ICL 通常不如在同等数据量上进行参数微调，在评测中两者性能边界需明确
- **理论机制不明**：为何 ICL 有效仍无共识，限制了系统性改进方向

## 相关页面

- [[few-shot-learning]] — 少样本学习能力详解
- [[zero-shot-evaluation]] — 零样本评测基准
- [[prompt-sensitivity]] — ICL 对 prompt 的高度敏感性
- [[chain-of-thought-eval]] — 思维链作为 ICL 的增强形式
- [[capability-elicitation]] — 通过 ICL 激发模型能力
