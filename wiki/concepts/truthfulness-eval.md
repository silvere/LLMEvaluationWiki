---
title: "Truthfulness 评测"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources: []
aliases:
  - truthfulness-eval
  - truthfulness evaluation
  - 真实性评测
domain:
  - concept
---

# Truthfulness（真实性）评测

> 评测模型在易产生「人类似的错误信念」（misconceptions / urban legends / conspiracy theories）问题上是否如实回答、不附和。最具代表性的是 [[TruthfulQA]]（817 题，38 类常见误信息）。现代延伸到 hallucination detection / 长篇事实 grounding（[[SimpleQA]] / LongFact）。

## 与相关概念区分

- **Truthfulness**：避免重复人类社会中常见 misconception
- **Factuality / Hallucination**：避免生造事实 / 引用伪造
- **Calibration**：模型对自己 confidence 的估计准确度
- **Faithfulness**：摘要 / RAG 输出是否忠于上下文

## 代表 benchmark

- **[[TruthfulQA]]**：Owain Evans 等 2021；二选一 / 生成两类
- **[[SimpleQA]]**：OpenAI 2024 短答事实问答（4000+ 题）
- **LongFact / FACTSCORE**：长篇事实分解评测
- **HaluEval / HalluLens**：hallucination 专评

## 评测方法学

- 模型规模 + RLHF 不一定提升 truthfulness，甚至可能让模型「更圆滑地附和」（[[sycophancy]]）
- LLM-as-judge 评 truthfulness 需配 ground-truth 来源对照
- truthfulness ≠ refuse to answer，过度 refuse 也是失败模式

## 相关页面

- [[TruthfulQA]]
- [[SimpleQA]]
- [[sycophancy]]
- [[safety-eval-landscape]]
- Owain Evans
