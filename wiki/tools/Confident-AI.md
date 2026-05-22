---
title: "Confident AI"
type: tool
dimension: obs
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://www.confident-ai.com/"
  - "https://github.com/confident-ai/deepeval"
aliases:
  - Confident-AI
  - Confident AI
org: "Confident AI Inc."
official_url: "https://www.confident-ai.com/"
github_url: "https://github.com/confident-ai/deepeval"
license: "Apache-2.0 (deepeval) / proprietary (platform)"
domain:
  - agent
---

# Confident AI

> [[DeepEval]] 背后公司 Confident AI 推出的 LLM 评测与监控 SaaS 平台。提供 unit testing / regression / production monitoring / A/B test 一体化，与 DeepEval 开源框架深度集成。

## 关键能力

- **CI/CD 集成**：GitHub Actions / pytest 对接，每个 PR 自动跑 LLM 回归评测
- **Production monitoring**：线上流量采样 + 自动 eval
- **Dataset management**：golden dataset + versioning
- **LLM-as-judge 配置**：可自定义评测维度和 rubric

## 评测圈意义

- 是 DeepEval 从「开源测试框架」向「评测平台」演进的商业产品
- 与 [[Langfuse]] / [[Braintrust]] / [[Patronus]] 并列 LLM eval SaaS 赛道

## 相关页面

- [[DeepEval]]
- [[Braintrust]]
- [[Langfuse]]
- [[Patronus]]
