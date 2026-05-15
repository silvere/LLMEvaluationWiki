---
title: "Lianmin Zheng（郑联民）"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Lianmin Zheng（郑联民）

> UC Berkeley 研究员，Chatbot Arena 和 LMSYS Org 的共同创始人，vLLM 论文第一作者，LLM 人类偏好评测和高效推理领域的核心贡献者。

## 基本信息

- **所属机构**：加州大学伯克利分校（UC Berkeley）
- **研究方向**：LLM 系统优化、LLM 评测、人类偏好对齐
- **相关项目**：LMSYS Org、Chatbot Arena、vLLM

## 评测领域主要贡献

**Chatbot Arena（2023）**：Lianmin Zheng 作为核心开发者参与构建的 Chatbot Arena（LMSYS），是目前最具影响力的基于人类偏好的 LLM 对比评测平台。平台采用 Elo 评分机制，通过众包方式收集用户对不同模型回答的偏好投票，形成动态更新的模型排行榜。其统计方法和评测设计已被广泛引用和参照。

**MT-Bench（2023）**：与 Chatbot Arena 一同发布的 MT-Bench（Multi-Turn Benchmark）是专为评测多轮对话能力设计的评测集，包含 80 个需要多轮交互的高质量问题，并引入 GPT-4 作为评判模型（LLM-as-Judge），成为 LLM 对话质量评测的重要工具。

**vLLM（2023）**：作为第一作者发表的 vLLM 论文提出了 PagedAttention 机制，大幅提升了 LLM 推理吞吐量，间接降低了大规模模型评测（需要运行大量 inference）的计算成本，促进了开源评测研究的可及性。

**FastChat**：开发了 FastChat 开源框架，成为 Chatbot Arena 的技术基础，也被广泛用于部署开源模型进行评测。

## 代表性工作

- "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena"（2023）
- "Efficient Memory Management for Large Language Model Serving with PagedAttention"（vLLM，2023）
- Chatbot Arena 平台开发与维护

## 相关页面

- [[Chatbot-Arena]]
- [[LMSYS-Org]]
- [[MT-Bench]]
- vLLM
- [[LLM-as-Judge]]
- [[Wei-Lin-Chiang]]
