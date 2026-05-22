---
title: "vLLM"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://github.com/vllm-project/vllm"
  - "https://blog.vllm.ai/"
aliases:
  - vllm
dimension: infra
infrastructure: true
note: "vLLM 是评测**基础设施**（推理引擎），不是评测工具本身。但几乎所有 LLM 评测 harness 都依赖 vLLM 类引擎做高吞吐推理。"
domain:
  - other
---

# vLLM

> 高吞吐、内存高效的 LLM 推理服务引擎。PagedAttention 机制原创实现，已成为 LLM 评测 pipeline 最常用的推理后端之一。

## 简介

vLLM 由 UC Berkeley Sky Computing Lab（Ion Stoica / Hao Zhang 等团队）2023 起开源。核心创新 **PagedAttention** 把虚拟内存分页思想引入 KV cache 管理，让 LLM 推理在并发场景下显著提升吞吐量与显存利用率。

## 评测语境下的作用

- **评测 pipeline 默认推理后端**：[[LM-Evaluation-Harness]]、[[OpenCompass]]、[[HELM]] 等主流评测框架都支持以 vLLM 为推理后端
- **多 batch 评测加速**：把 [[MMLU]] / [[BBH]] / [[BIG-bench]] 等多任务批量评测的吞吐拉高 5-10×
- **serving-aware benchmark**：催生 vLLM 官方 benchmark_serving.py 等专评推理引擎吞吐/延迟的工具脚本

## 相关页面

- [[Hao-Zhang]]
- [[Ion-Stoica]]
- [[LMSYS-Org]]
- [[Chatbot-Arena]]
- [[LM-Evaluation-Harness]]
