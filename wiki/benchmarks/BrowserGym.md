---
title: "BrowserGym"
type: tool
dimension: D
subdimension: web-gui
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://arxiv.org/abs/2412.05467"
  - "https://github.com/ServiceNow/BrowserGym"
  - "https://huggingface.co/spaces/ServiceNow/browsergym-leaderboard"
aliases:
  - BrowserGym
  - browsergym
arxiv_id: "2412.05467"
official_url: "https://github.com/ServiceNow/BrowserGym"
official_leaderboard: "https://huggingface.co/spaces/ServiceNow/browsergym-leaderboard"
license: "Apache-2.0"
org: "ServiceNow Research"
github_url: "https://github.com/ServiceNow/BrowserGym"
domain:
  - agent
---

# BrowserGym

> ServiceNow Research 2024-12 推出的 **web agent gym 环境框架**。提供统一的 observation/action space + Playwright 浏览器自动化，把 [[WebArena]] / [[VisualWebArena]] / [[Mind2Web]] / [[WorkArena]] / [[AssistantBench]] 等多个 benchmark 拉到同一接口下，作为 web agent 的「评测中间件」。

## 关键能力

- **统一 gym 接口**：observation = DOM snapshot / accessibility tree / viewport screenshot；action = Playwright primitives
- **多 benchmark 集成**：WebArena / VisualWebArena / Mind2Web / WorkArena / MiniWoB++ 等
- **Multimodal 输入**：text + screenshot + DOM 三模态
- **配套**：AgentLab（评测 + 训练 pipeline）+ 公开 leaderboard

## 评测圈意义

- 解决「每个 web benchmark 一套接口」的碎片化问题
- 是 ServiceNow + Université de Montréal + Mila 联合维护的开源标准
- 与 [[OSWorld]] / [[Inspect-AI]] 等同属「web/agent harness」赛道

## 已知 pitfall

- 仍需要 benchmark 各自部署（BrowserGym 是接口而非数据）
- Playwright 依赖浏览器版本，长期复现要锁版本
- 文档侧重接口，缺乏端到端教程

## 相关页面

- [[WebArena]]
- [[VisualWebArena]]
- [[Mind2Web]]
- [[WorkArena]]
- [[OSWorld]]
- [[agent-eval]]
