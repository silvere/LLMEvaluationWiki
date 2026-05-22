---
title: "AgentBoard"
type: benchmark
dimension: D
subdimension: general
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://arxiv.org/abs/2401.13178"
  - "https://hkust-nlp.github.io/agentboard/"
aliases:
  - AgentBoard
arxiv_id: "2401.13178"
official_url: "https://hkust-nlp.github.io/agentboard/"
license: "Apache-2.0"
org: "HKUST NLP"
domain:
  - agent
---

# AgentBoard

> HKUST NLP 2024-01 推出的 multi-turn LLM agent 分析评测：**9 类任务 × 1,013 环境**，覆盖 embodied AI / game / web / tool agent。亮点是配套的「**analytical evaluation board**」——不只看最终成功率，还细分 sub-goal achievement / planning depth / exploration rate 等过程指标。

## 设计

- **9 类任务**：embodied / game / web / tool / 等
- **1,013 环境**：每个 human-verified 多轮 + 部分可观测
- **过程指标**：planning depth / sub-goal completion / exploration efficiency（vs 仅成功率）
- **配套 analytical board**：交互式分析模型在每个任务维度的表现

## 评测圈意义

- 推动「agent 评测应该看过程而不仅看结果」的方法论
- 与 [[AgentBench]] / [[GAIA]] 等 agent 综合 benchmark 互补（AgentBoard 偏可解释 analysis）
- 揭示「最终成功率相同的两个 agent 可能 planning 路径差异巨大」

## 已知 pitfall

- 1,013 环境部署成本高
- 9 类任务覆盖偏 academic，企业场景代表性有限
- analytical board 依赖详细 log，agent 必须按规范输出 trace

## 相关页面

- [[AgentBench]]
- [[GAIA]]
- [[tau-bench]]
- [[BrowserGym]]
- [[agent-eval]]
