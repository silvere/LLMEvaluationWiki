---
title: "Weave (W&B)"
type: tool
dimension: obs
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://wandb.ai/site/weave"
  - "https://github.com/wandb/weave"
aliases:
  - Weave
  - W&B Weave
  - WandB-Weave
official_url: "https://wandb.ai/site/weave"
license: "Apache-2.0"
org: "Weights & Biases"
homepage: "https://wandb.ai/site/weave"
github_url: "https://github.com/wandb/weave"
domain:
  - agent
---

# Weave（Weights & Biases）

> [[Weights-Biases|W&B]] 推出的 LLM 应用 tracking + experimentation 平台。是 W&B 在 ML 训练观测领域多年积累的 LLM 扩展，提供 self-managed 和 dedicated cloud 两种部署形态，Python + TypeScript SDK。

## 关键能力

- **Tracing**：自动捕获 LLM call chain（含 prompt / response / token / 延时）
- **Evaluations**：scorers + traces 联动，支持自定义 scorer
- **Dataset versioning**：与 W&B 训练侧 dataset 共用
- **Playground**：交互式 prompt 测试
- **集成**：OpenAI / Anthropic / Cohere / LangChain / LlamaIndex 等 SDK 自动 instrument

## 部署形态

- **W&B Cloud**：托管版（与 W&B 训练侧同账号）
- **W&B Dedicated Cloud**：企业专享
- **Self-managed**：on-prem 私有部署

## 评测圈意义

- 训练侧已用 W&B 的团队天然延伸到 LLM 应用观测
- 与 [[LangSmith]] / [[Langfuse]] / [[Arize-Phoenix]] / [[Braintrust]] 并列 LLM 观测主流
- 训练 + inference 数据可在一个平台串起来

## 已知 pitfall

- 自托管成本与运维门槛高于 [[Langfuse]]
- 与 W&B 训练侧账号绑定（独立使用价值下降）
- TypeScript SDK 功能弱于 Python SDK

## 相关页面

- [[LangSmith-Eval]]
- [[Langfuse]]
- [[Arize-Phoenix]]
- [[Braintrust]]
- [[Weights-Biases]]
