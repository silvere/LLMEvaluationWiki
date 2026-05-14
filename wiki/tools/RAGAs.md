---
title: "RAGAs"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# RAGAs

## 概述

RAGAs（Retrieval-Augmented Generation Assessment）是一个专门用于评测 RAG（检索增强生成）系统质量的开源评测框架，发布于 2023 年。RAGAs 填补了 RAG 系统缺乏系统性评测方法的空白，提供了一套无需人工标注答案即可进行自动化评测的指标体系。

## 核心评测指标

RAGAs 从两个维度评测 RAG 系统的质量：

**检索质量指标**：
- **Context Precision（上下文精确率）**：检索结果中与查询相关的内容比例，衡量检索器的精确性
- **Context Recall（上下文召回率）**：生成答案所需的信息是否都出现在检索结果中，需要参考答案
- **Context Relevance**：检索到的上下文与问题的相关程度

**生成质量指标**：
- **Faithfulness（忠实度）**：生成答案中的每个陈述是否都有检索上下文的支撑，核心反幻觉指标
- **Answer Relevance（答案相关性）**：生成答案是否直接回答了问题
- **Answer Correctness**：与参考答案对比的事实准确性（需要人工标注答案）

## 无参考评测

RAGAs 最重要的特性之一是大多数核心指标**不需要人工标注的参考答案**，而是利用 LLM（通常是 GPT-4）对检索结果和生成答案之间的一致性进行自动推断。这使得 RAGAs 可以用于无法预先准备标准答案的生产环境评测。

## 使用示例

```python
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy
from datasets import Dataset

data = {
    "question": ["What is photosynthesis?"],
    "answer": ["Photosynthesis is the process by which plants make food."],
    "contexts": [["Photosynthesis converts light energy into chemical energy..."]],
}
dataset = Dataset.from_dict(data)
result = evaluate(dataset, metrics=[faithfulness, answer_relevancy])
```

## 适用场景

- RAG 系统开发迭代中的质量监控
- 比较不同检索策略（稠密检索、稀疏检索、混合检索）的效果
- 对比不同 Chunk 大小和 Embedding 模型的检索质量
- 生产环境中的持续质量评测

## 局限性

- 依赖 LLM 进行自动评判，存在 LLM 评判偏差
- Faithfulness 等指标的计算成本较高（需要多次 LLM 调用）
- 对非英文语言的评测质量依赖所用评判模型的多语言能力

## 访问方式

- GitHub：[github.com/explodinggradients/ragas](https://github.com/explodinggradients/ragas)
- 文档：[docs.ragas.io](https://docs.ragas.io/)
- 论文：Es et al., "RAGAs: Automated Evaluation of Retrieval Augmented Generation"（arXiv: 2309.15217）
