---
title: "零样本评测（Zero-Shot Evaluation）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 零样本评测（Zero-Shot Evaluation）

> 在不提供任何任务示例的情况下评测 LLM 能力，直接测量模型的泛化能力和指令跟随能力，是衡量模型真实通用能力的基准设置。

## 定义

零样本评测（Zero-Shot Evaluation）是指评测 prompt 中仅包含任务描述或问题本身，不提供任何输入-输出示例，要求模型直接生成正确答案。

与对比设置：
- **Zero-Shot**：仅任务描述，无示例
- **Few-Shot (k-shot)**：提供 k 个示例（k = 1, 3, 5, 10...）
- **Zero-Shot-CoT**：零样本 + 触发推理的指令（"Let's think step by step"）

Zero-Shot 性能代表模型"开箱即用"的能力，反映预训练阶段获得的知识和指令跟随能力，不依赖特定的示例选择策略。

## 重要性（在 LLM 评测中）

零样本评测在 LLM 能力评测体系中具有独特地位：

1. **纯粹能力基线**：排除了示例选择策略的影响，最直接地反映模型参数化知识
2. **指令跟随能力评测**：Zero-Shot 要求模型理解纯语言指令，是衡量 RLHF 对齐效果的重要维度
3. **跨研究可比性最好**：示例选择方式差异小，不同研究的 Zero-Shot 结果更可直接比较
4. **污染风险相对低**：Zero-Shot 格式化的 prompt 不需要与训练数据中的示例格式精确匹配

## 主要方法/实现

**标准 Zero-Shot prompt 格式**：
```
任务描述: 判断以下情感是正面、负面还是中性。

评论: 这款产品真的很棒，我非常满意！
情感:
```

**Zero-Shot-CoT 触发词**（Kojima et al., 2022）：
```
Q: 约翰有 5 个苹果，他给了玛丽 2 个，又买了 3 个。他现在有几个苹果？
A: 让我们一步一步来思考。
```

**MMLU Zero-Shot**：部分研究在 MMLU 上比较 Zero-Shot vs 5-Shot 性能，差距可达 5-15%，反映模型对多项选择格式的适应性。

**基准设置标准化**：需明确报告 prompt 模板、是否使用 CoT 触发词、输出提取方式。

## 局限与挑战

- **格式敏感**：Zero-Shot 对 prompt 措辞更敏感，不同格式变体的性能方差更大
- **能力低估风险**：Zero-Shot 可能低估模型真实能力，因为模型可能"知道但不知道怎么展示"
- **任务理解假设**：假设模型能从纯任务描述理解任务意图，但复杂任务可能需要示例才能明确
- **评测模板影响**：评测时使用的特定 prompt 模板可能与模型训练时的格式偏差影响结果
- **比较公平性**：与更强大模型相比，Zero-Shot 设置下基础模型表现差距可能被夸大

## 相关页面

- [[in-context-learning]] — Zero-Shot 与 Few-Shot 的对比
- [[few-shot-learning]] — Few-Shot 评测设置
- [[prompt-sensitivity]] — Zero-Shot 更受 prompt 格式影响
- [[capability-elicitation]] — 通过 prompt 设计最大化展示能力
- [[benchmark-design]] — 选择合适评测设置的设计原则
