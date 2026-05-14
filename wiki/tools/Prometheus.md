---
title: "Prometheus"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Prometheus

## 概述

Prometheus 是一个专为 LLM 评测任务微调的开源评判模型，由 KAIST 研究团队于 2023 年发布（arXiv: 2310.08491）。Prometheus 的核心目标是提供一个**开源、可本地部署的替代 GPT-4-as-judge 方案**，降低大规模 LLM 评测的成本和对专有 API 的依赖。

## 背景与动机

GPT-4 作为评判模型（LLM-as-Judge）已被广泛证明与人类偏好高度相关，但存在以下问题：
- **成本高**：大规模评测的 API 费用昂贵
- **不透明**：GPT-4 是闭源模型，评判逻辑无法解释
- **不可复现**：模型更新可能导致相同输入的评判结果变化
- **受控性差**：无法针对特定评测场景进行定制

Prometheus 通过在专门构建的评测数据集上微调开源 LLaMA 模型，使开源模型具备接近 GPT-4 的评判能力。

## 技术实现

**训练数据**：Prometheus 使用人工构建的"Feedback Collection"数据集训练，该数据集包含：
- 多样化的指令和回答
- 详细的评分标准（rubric）
- 逐步推理的评分解释
- 1-5 分的数值评分

**评测方式**：Prometheus 接受以下输入：
- 原始指令（instruction）
- 被评测模型的回答（response）
- 评分标准（score rubric）
- 参考答案（可选）

输出包括详细的文字反馈和数值评分。

## Prometheus 2

2024 年推出的 Prometheus 2 进行了重要改进：
- 支持成对比较（pairwise ranking）模式，不仅限于绝对评分
- 在更多评测基准上与 GPT-4 的相关性更高
- 基于更强的基础模型（Mistral/Llama 2/3）微调

## 适用场景

- 需要大规模评测但 GPT-4 成本过高的场景
- 要求完全本地部署（数据隐私需求）的评测
- 需要可解释评判过程的研究场景
- 针对特定领域需要定制评分标准的应用

## 访问方式

- 论文（Prometheus）：arXiv: 2310.08491
- 论文（Prometheus 2）：arXiv: 2405.01535
- HuggingFace：kaist-ai/prometheus-7b-v1.0 / kaist-ai/prometheus-8x7b-v2.0
- GitHub：[github.com/kaistAI/prometheus](https://github.com/kaistAI/prometheus)
