---
title: "OpenAI"
type: entity
entity_type: org
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# OpenAI

> 美国人工智能研究公司，ChatGPT 和 GPT 系列模型的开发者，推动了 RLHF 与指令跟随评测范式的主流化。

## 基本信息

- **性质**：营利性 AI 研究公司（capped-profit 结构）
- **成立时间**：2015 年
- **总部**：美国旧金山
- **现任 CEO**：Sam Altman
- **规模**：千人以上

## 主要贡献（评测相关）

OpenAI 通过发布一系列里程碑模型，持续重塑 LLM 评测的参照系。GPT-3（2020）首次系统展示 few-shot in-context learning 能力，促使研究界将此作为评测维度。InstructGPT（2022）将 RLHF 引入对齐训练，并推动了以人类偏好作为评测信号的方法论（如 win-rate、AlpacaEval）。

ChatGPT（2022 年底）的公开上线使"对话质量"评测需求爆发，间接催生了 Chatbot Arena 等基于人类投票的评测平台。GPT-4（2023）在众多基准上刷新纪录，也暴露了现有评测体系的天花板效应，推动了更难评测集的设计。

OpenAI 还发布了 Evals 开源框架，允许社区为其模型贡献自定义评测任务，是目前 LLM 评测工具生态的重要组成部分。

## 代表性模型/产品

- **GPT-3 / GPT-3.5**：大规模语言模型，few-shot 能力标杆
- **InstructGPT**：RLHF 对齐模型，指令跟随评测参照
- **ChatGPT**：对话式 AI 产品，引发评测范式转变
- **GPT-4 / GPT-4o**：多模态旗舰模型
- **o1 / o3**：推理增强系列模型
- **OpenAI Evals**：开源评测框架

## 对评测生态的影响

OpenAI 的模型发布节奏直接驱动了评测社区的研究议程。每次新模型发布后，主要基准上的得分都会迅速成为比较基线。其 API 的广泛可及性也使 LLM-as-Judge 评测方法（以 GPT-4 作为评判模型）得以规模化应用，并引发了关于此类评测方式自我强化偏见的讨论。

## 相关页面

- [[GPT-4]]
- [[RLHF]]
- [[OpenAI-Evals]]
- [[Chatbot-Arena]]
- [[Long-Ouyang]]
- [[Tom-Brown]]

<!-- AUTO-RELATED:START -->

## 自动关联

> 以下由 `scripts/inject-entity-related.ts` 自动维护——基于 `wiki/models/` 的 `developer` 字段与 `wiki/entities/` 的 `entity_type` 字段。手动编辑会被覆盖。

### 该机构发布的模型 Spec

- [[GPT-5.5|GPT-5.5（含 Pro / Instant 变体）]]（2026-04 (API), 2026-05 (ChatGPT default)）
- [[GPT-5|GPT-5]]（2025-08）
- [[GPT-4.1|GPT-4.1]]（2025-04）
- [[o3|o3]]（2025-01 (announced), 2025-04 (public)）
- [[o1|o1]]（2024-12）
- [[GPT-4o|GPT-4o]]（2024-05）

### 同类机构

- [[xAI|xAI]]
- [[Reka|Reka AI]]
- [[Microsoft-Research|Microsoft Research]]
- [[Meta-AI|Meta AI]]
- [[Google-DeepMind|Google DeepMind]]
- [[Cohere|Cohere]]
- [[Anthropic|Anthropic]]
- [[Zhipu-AI|智谱AI（Zhipu AI）]]

<!-- AUTO-RELATED:END -->
