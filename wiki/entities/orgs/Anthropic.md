---
title: "Anthropic"
type: entity
entity_type: org
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Anthropic

> 美国 AI 安全公司，Claude 系列模型的开发者，Constitutional AI 方法的提出者。

## 基本信息

- **性质**：营利性 AI 安全研究公司（Public Benefit Corporation）
- **成立时间**：2021 年
- **总部**：美国旧金山
- **联合创始人**：Dario Amodei（CEO）、Daniela Amodei（President）及多位前 OpenAI 研究员
- **规模**：数百至千人级别

## 主要贡献（评测相关）

Anthropic 在 AI 安全评测方法论上贡献突出。Constitutional AI（CAI，2022）提出以一组原则约束模型行为，并通过 AI 自我反思替代部分人工标注，开辟了自动化对齐评测的新路径。

Anthropic 内部形成了较为系统的"模型卡（Model Card）"发布实践，公开 Claude 系列模型在多个安全与能力维度的评测结果，包括有害输出率、越狱鲁棒性等指标。

其研究团队发表的可解释性相关工作（如 Toy Models of Superposition、Scaling Monosemanticity）为评测模型内部表征提供了工具和框架，与机械可解释性（Mechanistic Interpretability）评测议题深度相关。

Claude 系列模型在主流评测集（MMLU、HumanEval、MATH 等）上的持续表现，也使其成为评测生态中不可或缺的比较参照。

## 代表性模型/产品

- **Claude 1 / 2 / 3 / 3.5 / 3.7**：Claude 系列对话和助手模型
- **Constitutional AI（CAI）**：基于原则的自动对齐与评测方法
- **Responsible Scaling Policy（RSP）**：分级安全评测政策框架

## 对评测生态的影响

Anthropic 的 Responsible Scaling Policy 将能力评测与安全评测挂钩，规定超过特定危险能力阈值须采取额外安全措施，为 AI 能力风险评测提供了可操作的政策模板，影响了 UK AISI、METR 等机构的评测框架设计。

## 相关页面

- [[Constitutional-AI]]
- [[RLHF]]
- [[METR]]
- [[UK-AISI]]
- [[Neel-Nanda]]

<!-- AUTO-RELATED:START -->

## 自动关联

> 以下由 `scripts/inject-entity-related.ts` 自动维护——基于 `wiki/models/` 的 `developer` 字段与 `wiki/entities/` 的 `entity_type` 字段。手动编辑会被覆盖。

### 该机构发布的模型 Spec

- [[Claude-Sonnet-4.6|Claude Sonnet 4.6]]（2026-04）
- [[Claude-Opus-4.7|Claude Opus 4.7]]（2026-04）
- [[Claude-Haiku-4.5|Claude Haiku 4.5]]（2025-10）
- [[Claude-Sonnet-4.5|Claude Sonnet 4.5]]（2025-09）
- [[Claude-Opus-4|Claude Opus 4 / Opus 4.1]]（2025-05 (Opus 4), 2025-08 (Opus 4.1)）
- [[Claude-3.7-Sonnet|Claude 3.7 Sonnet]]（2025-02）
- [[Claude-3.5-Sonnet|Claude 3.5 Sonnet]]（2024-06 (v1), 2024-10 (new/v2)）

### 同类机构

- [[xAI|xAI]]
- [[Reka|Reka AI]]
- [[OpenAI|OpenAI]]
- [[Microsoft-Research|Microsoft Research]]
- [[Meta-AI|Meta AI]]
- [[Google-DeepMind|Google DeepMind]]
- [[Cohere|Cohere]]
- [[Zhipu-AI|智谱AI（Zhipu AI）]]

<!-- AUTO-RELATED:END -->
