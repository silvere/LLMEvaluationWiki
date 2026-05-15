---
title: "Long Ouyang（欧阳龙）"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Long Ouyang（欧阳龙）

> OpenAI 研究员，InstructGPT 论文的主要作者，RLHF 在 LLM 指令跟随对齐中应用的先驱，推动了以人类偏好为信号的 LLM 评测范式。

## 基本信息

- **所属机构**：OpenAI
- **研究方向**：AI 对齐、RLHF、指令跟随、人类偏好学习
- **背景**：斯坦福大学博士出身

## 评测领域主要贡献

**InstructGPT（2022）**：Long Ouyang 作为第一作者发表的"Training language models to follow instructions with human feedback"（InstructGPT）是 LLM 对齐评测史上最重要的论文之一。论文系统展示了通过 RLHF（Reinforcement Learning from Human Feedback）训练的模型在人类偏好评测中远超参数量更大的纯 SFT 模型，核心发现是"1.3B InstructGPT 在人类偏好评测中优于 175B GPT-3"，直接确立了"人类偏好评测"作为 LLM 质量评测的关键维度。

**RLHF 评测范式建立**：InstructGPT 的发布使"人类标注者偏好率"（win-rate）成为 LLM 评测的标准方式之一，并推动了 AlpacaEval、Chatbot Arena 等基于人类偏好的评测平台的建立。

**对齐评测方法论**：文章中对人类评测员的标注规范、一致性控制和偏见来源的详细描述，为后续 LLM 人工评测的方法设计提供了参照。

**有害性评测**：InstructGPT 研究过程中对"是否有害"、"是否诚实"、"是否无害"三个维度的人工评测设计，成为后续安全评测的重要框架来源。

## 代表性工作

- "Training language models to follow instructions with human feedback"（InstructGPT，2022）
- OpenAI RLHF 技术体系核心贡献
- 多项 LLM 对齐相关研究

## 相关页面

- [[GPT-4]]
- [[RLHF]]
- 人类偏好评测
- [[AlpacaEval]]
- [[Chatbot-Arena]]
- [[OpenAI]]
