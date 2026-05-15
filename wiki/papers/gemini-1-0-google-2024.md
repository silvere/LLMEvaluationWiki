---
title: "Gemini: A Family of Highly Capable Multimodal Models"
type: paper
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
source_type: paper
url: "https://arxiv.org/abs/2312.11805"
arxiv_id: "2312.11805"
authors: ["Gemini Team", "Google DeepMind"]
published: "2024-02-01"
ingested: "2026-05-14"
license: "Google DeepMind Technical Report"
discusses: ["[[Gemini|Gemini]]", "[[multimodal-eval|多模态模型]]", "[[MMLU]]", "[[CLongEval|长上下文评测]]"]
sources:
  - "https://arxiv.org/abs/2312.11805"
---

# Gemini: A Family of Highly Capable Multimodal Models

> Google DeepMind 发布 Gemini 系列多模态模型（Ultra、Pro、Nano），在 MMLU 等多项基准上声称超越 GPT-4，原生支持文本、图像、音频、视频多模态输入。

## 核心主张
- [CLAIM]: Gemini Ultra 在 MMLU（5-shot）上准确率约为 90.0%，首次达到人类专家水平（89.8%），超过 GPT-4 的 86.4%（论文中声称）。
- [CLAIM]: Gemini 系列原生多模态训练（而非将文本模型扩展到多模态），在视频理解、音频推理等任务上具有原生优势。
- [CLAIM]: Gemini Pro 支持 32K token 上下文窗口，Ultra 支持更长窗口；在长上下文基准上，大幅优于同期竞争模型。
- [CLAIM]: Gemini Nano（针对设备端部署）在参数量极小的情况下（1.8B 和 3.25B）保持较强的推理能力。

## 方法论摘要

Gemini 使用 Google 内部基础设施（TPU v4/v5）训练，预训练数据包含多模态数据（文本、代码、图像、视频、音频）。MMLU 评测使用 CoT 提示（论文中使用 CoT@32 变体），这与标准 5-shot 设置存在差异，引发后续比较的争议。

## 数据与结果

- MMLU（论文 CoT@32）：Gemini Ultra 90.0%（GPT-4：86.4%）
- HumanEval：Gemini Ultra 约 74.4%
- GSM8K：Gemini Ultra 约 94.4%
- MMMU（多模态）：约 62.4%
- 注：后续独立复现指出评测设置差异，实际差距争议较大

## 局限与争议

- MMLU 90.0% 的结果使用 CoT@32（32 次 CoT 采样取最优），而非标准 5-shot 格式，被批评不公平比较。
- 多模态评测的独立复现难度高，部分结果难以验证。
- 训练数据、模型规模和架构细节未完整披露。
- 发布后的独立评测显示实际性能与技术报告数据存在出入。

## 相关 wiki 页

- [[Gemini|Gemini]]
- [[multimodal-eval|多模态模型]]
- [[MMLU]]
- [[GPT-4|GPT-4]]
- [[CLongEval|长上下文评测]]
