---
title: "Qwen (通义千问)"
type: entity
entity_type: model
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://github.com/QwenLM/Qwen"
  - "https://qwenlm.github.io/"
aliases:
  - Qwen
  - 通义千问
  - Qwen2
  - Qwen2.5
  - Qwen3
  - Tongyi-Qianwen
domain:
  - entity
---

# Qwen（通义千问）

> 阿里巴巴 [[Alibaba-Tongyi|通义千问]] 团队（[[Junyang-Lin]] 等）的开源大模型系列。从 Qwen1（2023-08）到 Qwen2 / Qwen2.5 / Qwen3 / QwQ（推理）持续迭代，是中文 LLM 生态的事实标杆，HuggingFace 下载量长期前列。Qwen 系列在 [[C-Eval]] / [[CMMLU]] / [[MMLU]] / [[MATH]] / [[HumanEval]] / [[BBH]] 等评测的成绩是中文开源模型最强档之一。

## 模型谱系

- **Qwen 1（2023-08）**：1.8B / 7B / 14B / 72B
- **Qwen 1.5（2024-02）**：架构小调，0.5B–110B 全档
- **Qwen 2（2024-06）**：MoE / GQA，57B-A14B / 72B dense
- **Qwen 2.5（2024-09）**：0.5B–72B + Qwen2.5-Math / Coder 专项
- **Qwen 3（2025）**：Hybrid Thinking + 多档
- **QwQ-32B**：推理模型，对标 o1 / [[DeepSeek-R1]]
- **[[Qwen-VL]]**：vision-language 分支

## 评测圈意义

- 中文场景下事实标杆，[[C-Eval]] / [[CMMLU]] 长期 SOTA
- 开源策略（Apache 2.0）使其成为大量下游 fine-tune 的 base model
- Qwen2.5-Math 等专项模型在 [[MATH]] / [[AIME]] / [[GSM8K]] 持续推高开源天花板
- Qwen3 是 2025-2026 开源最强档代表之一

## 相关页面

- [[Qwen-VL]]
- [[Junyang-Lin]]
- [[Alibaba-Tongyi]]
- [[C-Eval]]
- [[CMMLU]]
- [[MMLU]]
