---
title: "Patronus AI"
type: tool
dimension: obs
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://www.patronus.ai/"
  - "https://docs.patronus.ai/"
  - "https://github.com/patronus-ai"
aliases:
  - Patronus
  - Patronus AI
  - Patronus-AI
official_url: "https://www.patronus.ai/"
license: "Commercial"
org: "Patronus AI"
homepage: "https://www.patronus.ai/"
github_url: "https://github.com/patronus-ai"
domain:
  - agent
  - safety
---

# Patronus AI

> 2023 创立、2024 Series A 由 Notable Capital 领投的企业级 LLM 评测 + 安全平台。前 Meta AI 团队创立，主打 **LLM evals as a service**：托管 evaluator 模型（如 Lynx 幻觉检测模型）+ 合规审查 + RAG quality monitoring。

## 关键能力

- **Lynx**：自研开源 hallucination detection 模型（13B / 70B）
- **PatronusAPI**：托管 LLM judge / classifier，无需自部署
- **Glider**：自动评测 generator（synthetic test set generation）
- **Compliance modules**：HIPAA / GDPR / PII 检测预制套件
- **Continuous monitoring**：production trace 持续评测

## 评测圈意义

- 是「**LLM eval-as-a-service**」赛道代表
- 与 [[LangSmith]] / [[Langfuse]] 偏 observability 不同，Patronus 偏 evaluation depth + compliance
- 企业 RAG / 合规场景的常用选项

## 已知 pitfall

- 商业闭源，pricing per-call 对大规模流量不友好
- self-host 选项有限（评测必须走 API）
- Lynx 评测准确率与 GPT-4 judge 接近但偏 hallucination 单一维度

## 相关页面

- [[LangSmith-Eval]]
- [[Langfuse]]
- [[Confident-AI]]
- [[Braintrust]]
- [[hallucination]]
- [[safety-eval-landscape]]
