---
title: "Chain-of-Thought (CoT) 推理"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
---

# Chain-of-Thought (CoT) 推理

> 让模型在给出最终答案前展示中间推理步骤，以提升复杂任务性能的提示技术。

## 定义

Chain-of-Thought（思维链，CoT）是一种提示策略：在少样本示例中展示"推理过程 → 答案"的格式，或通过指令要求模型先推理再回答。该方法由 Google Brain 团队（Wei et al., 2022）系统化提出，发现在足够大的模型上能显著提升推理和数学任务的准确率。

## 重要性（在 LLM 评测中）

CoT 改变了评测结果的解读方式：同一个任务在有无 CoT 提示下可能得到截然不同的分数，因此评测报告必须明确说明是否使用 CoT。BIG-Bench Hard（BBH）的核心设计原则之一就是筛选出那些在应用 CoT 后有显著性能提升的任务，以此作为"真正具有挑战性"的判断依据。对于数学、逻辑推理、代码等任务，不使用 CoT 的评测结果可能严重低估模型能力。

## 主要方法/实现

- **Few-shot CoT**：在提示中提供若干"问题 + 推理步骤 + 答案"示例，模型学习这一格式后对新问题生成推理链。
- **Zero-shot CoT**：仅在提示末尾添加"Let's think step by step"，无需提供示例，适用于无法获取高质量示例的场景。
- **自洽性（Self-Consistency）**：对同一问题生成多条推理链，取多数答案，进一步提升准确率。
- **Program-of-Thought（PoT）**：以代码而非自然语言表达推理步骤，通过解释器执行得到准确数值结果。

## 局限与挑战

- CoT 的有效性在较小模型（通常 < 10B 参数）上不稳定，甚至可能有害。
- 模型可能生成看似合理但实际错误的推理链（"faithful" vs. "unfaithful" CoT），导致答案正确但推理过程错误，或推理正确但答案错误。
- 推理链长度增加推理成本，在延迟敏感场景中受限。
- 不同的 CoT 提示措辞对结果影响显著，增加了跨研究比较的难度。

## 相关页面

- [[process-reward-model]] — 对 CoT 中每一推理步骤进行打分的方法
- [[agent-eval]] — Agent 任务中 CoT 是核心推理机制
- [[few-shot-learning]] — CoT 的 few-shot 和 zero-shot 变体
