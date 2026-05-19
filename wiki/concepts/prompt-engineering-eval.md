---
title: "Prompt Engineering 评测"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources: []
aliases:
  - prompt-engineering-eval
  - prompt engineering evaluation
  - prompt-eval
domain:
  - concept
---

# Prompt Engineering 评测

> 评测「同一模型在不同 prompt 下性能的差异」与「自动 prompt 优化方法的有效性」。是 LLM 评测可复现性危机的关键议题之一：prompt 改一句话，[[MMLU]] 可能差 5 个百分点。

## 评测维度

- **Prompt sensitivity**：模型对 prompt 措辞 / 格式 / 顺序的鲁棒性
- **In-context learning（ICL）**：few-shot example 数量、顺序、相似度对效果的影响
- **CoT prompting**：[[chain-of-thought]] / Tree-of-Thoughts / least-to-most 等
- **Automatic prompt optimization**：APE / OPRO / DSPy 等自动化 prompt search
- **System prompt vs user prompt**：边界与权重

## 代表 benchmark / 实证研究

- **PromptBench**：系统对比不同 prompt template 的鲁棒性
- **promptsource / Natural Instructions** —— 大规模 prompt 数据集
- **[[BBH]]** —— 关键工作之一是发现 CoT 显著提升复杂推理
- **DSPy benchmark suite** —— Stanford [[Christopher-Manning]] 等的 prompt programming 评测

## 评测圈意义

- prompt 改写 → 评测分数大幅波动 是 [[evaluation-reproducibility-crisis]] 主要触发因素
- 大模型推断时是否需要 prompt engineering 本身在退化（更大模型更鲁棒）
- 自动 prompt 优化框架（DSPy / OPRO）评测「不依赖人工 prompt 工程」的能力

## 相关页面

- [[chain-of-thought]]
- [[evaluation-reproducibility-crisis]]
- [[BBH]]
- [[Christopher-Manning]]
