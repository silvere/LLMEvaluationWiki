---
title: "Langfuse"
type: tool
dimension: obs
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://langfuse.com/"
  - "https://github.com/langfuse/langfuse"
  - "https://langfuse.com/docs/observability/overview"
aliases:
  - Langfuse
official_url: "https://langfuse.com/"
license: "MIT"
org: "Langfuse GmbH (acquired by ClickHouse 2026-01)"
homepage: "https://langfuse.com/"
github_url: "https://github.com/langfuse/langfuse"
domain:
  - agent
---

# Langfuse

> 当前最主流的**开源** LLM 应用 observability 平台（YC W23，2026-01 被 ClickHouse 收购）。提供 tracing / prompts / evals / experiments / human annotation 一站式工作流。集成 OpenTelemetry / LangChain / OpenAI SDK / LiteLLM 等。是 [[LangSmith]] 的开源替代。

## 关键能力

- **LLM Observability**：instrument app → tracing LLM call + retrieval + embedding + agent action
- **Prompt Management**：centralized / version-controlled / strong cached prompt store
- **Evals**：LLM-as-judge / user feedback / manual labeling / custom pipeline
- **Experiments**：A/B test prompts & models
- **Human annotation**：协作 labeling

## 部署形态

- **Self-hosted**：开源免费，单 docker-compose 起步
- **Cloud**：托管版（含免费 tier）
- 2026-01 ClickHouse 收购后能力不变

## 评测圈意义

- 是「evaluation」与「observability」融合的代表
- 与 [[LangSmith]]（商业闭源 by LangChain）/ [[Arize-Phoenix]] / [[Weave]] 并列 LLM 观测主流
- 是当前**自部署友好**的首选

## 已知 pitfall

- self-host 需要 PostgreSQL / ClickHouse 等依赖
- 评测能力相对 [[Braintrust]] / [[Confident-AI]] 较基础
- Prompt 平台与代码仓库容易割裂（需双向同步）

## 相关页面

- [[LangSmith-Eval]]
- [[Arize-Phoenix]]
- [[Weave]]
- [[Braintrust]]
- [[Patronus]]
- [[evaluation-reproducibility-crisis]]
