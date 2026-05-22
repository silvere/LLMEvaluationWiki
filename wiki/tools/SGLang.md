---
title: "SGLang"
type: tool
dimension: infra
infrastructure: true
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://github.com/sgl-project/sglang"
  - "https://arxiv.org/abs/2312.07104"
aliases:
  - SGLang
  - sgl-project
official_url: "https://github.com/sgl-project/sglang"
license: "Apache-2.0"
org: "LMSYS / SGL Project"
homepage: "https://docs.sglang.ai/"
github_url: "https://github.com/sgl-project/sglang"
domain:
  - other
note: "SGLang 是评测**基础设施**（推理引擎 + 结构化生成 DSL），不是评测工具本身。"
---

# SGLang

> [[LMSYS]] / SGL Project 主导的高性能 LLM 推理引擎，2023-12 论文 + 2024 起 production-ready。亮点：**RadixAttention** 复用 KV cache + **结构化生成 DSL**（嵌入 Python 写复杂 prompt 流），在 throughput / latency 多个维度超过 [[vLLM]]。是 [[Chatbot-Arena]] / [[Arena-Hard-Auto]] 等 LMSYS 系列产品的底层引擎。

## 关键能力

- **RadixAttention**：KV cache 共享，多 prompt 复用前缀
- **结构化生成 DSL**：JSON / regex / grammar 约束生成（开箱即用）
- **批量推理**：throughput 在多场景超 vLLM
- **多模态**：原生支持 Llava / Qwen-VL 等 VLM
- **多 backend**：CUDA / ROCm / TPU

## 评测圈意义

- 是评测**基础设施**，与 [[vLLM]] 同档（非评测工具本身）
- LMSYS 自家产品（Arena）的底层加速引擎
- 评测时若结果对 sampling 敏感，需注明用 SGLang vs vLLM vs TGI

## 已知 pitfall

- 与 vLLM 在不同 workload 下互有胜负，benchmark 时需注明
- DSL 学习曲线略陡（vs vLLM 的 OpenAI-compatible API）
- 对 prefix sharing 高的 workload 才能充分发挥 RadixAttention 收益

## 相关页面

- [[vLLM]]
- [[LMSYS]]
- [[Lianmin-Zheng]]
- [[evaluation-reproducibility-crisis]]
