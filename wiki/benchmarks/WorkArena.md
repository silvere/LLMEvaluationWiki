---
title: WorkArena
type: benchmark
dimension: D
subdimension: web-gui
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-22'
last_verified: '2026-05-22'
sources:
- https://github.com/ServiceNow/WorkArena
- https://arxiv.org/abs/2403.07718
aliases:
- WorkArena
org: ServiceNow Research
arxiv_id: '2403.07718'
year: 2024
domain:
- agent
sota:
- score: 62.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: true
  date: 2026-04
  source: https://github.com/ServiceNow/WorkArena
  notes: WorkArena task success rate (enterprise software)
- score: 60.2%
  model: GPT-5
  harness: null
  with_tools: true
  date: 2025-09
  source: https://github.com/ServiceNow/WorkArena
  notes: task success rate
- score: 58.5%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: true
  date: 2026-03
  source: https://github.com/ServiceNow/WorkArena
  notes: task success rate
- score: 55.0%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: true
  date: 2026-02
  source: https://deepseek.com
  notes: task success rate
- score: 33.6%
  model: GPT-4o
  harness: null
  with_tools: true
  date: 2024-05
  source: https://github.com/ServiceNow/WorkArena
  notes: task success rate, 2024 baseline
---

# WorkArena

> ServiceNow Research 推出的 web agent benchmark，在 ServiceNow 企业平台（knowledge base / form / list / calendar / dashboard 等 UI 组件）上评测 agent 完成工作流任务的能力。是 [[BrowserGym]] 的成员任务集之一。

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Claude-Opus-4.7]] | 🔧 with | 62.5% | WorkArena task success rate (enterprise software) | 2026-04 | [link](https://github.com/ServiceNow/WorkArena) |
| 🥈 | [[GPT-5]] | 🔧 with | 60.2% | task success rate | 2025-09 | [link](https://github.com/ServiceNow/WorkArena) |
| 🥉 | [[Gemini-3.1-Pro]] | 🔧 with | 58.5% | task success rate | 2026-03 | [link](https://github.com/ServiceNow/WorkArena) |
| 4 | [[DeepSeek-V4-Pro]] | 🔧 with | 55.0% | task success rate | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🔧 with | 33.6% | task success rate, 2024 baseline | 2024-05 | [link](https://github.com/ServiceNow/WorkArena) |

<!-- AUTO-SOTA:END -->

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
