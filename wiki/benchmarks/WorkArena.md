---
title: "WorkArena"
type: benchmark
dimension: D
subdimension: web-gui
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://github.com/ServiceNow/WorkArena"
  - "https://arxiv.org/abs/2403.07718"
aliases:
  - WorkArena
org: "ServiceNow Research"
arxiv_id: "2403.07718"
year: 2024
domain:
  - agent
---

# WorkArena

> ServiceNow Research 推出的 web agent benchmark，在 ServiceNow 企业平台（knowledge base / form / list / calendar / dashboard 等 UI 组件）上评测 agent 完成工作流任务的能力。是 [[BrowserGym]] 的成员任务集之一。

## 关键特点

- **平台**：ServiceNow（企业级 SaaS 应用）
- **任务类型**：form filling / list navigation / knowledge retrieval / workflow automation
- **评测维度**：task success rate
- **Agent 接口**：通过 [[BrowserGym]] 统一 observation/action space

## 相关页面

- [[BrowserGym]]
- [[WebArena]]
- [[VisualWebArena]]
- [[AgentBench]]
