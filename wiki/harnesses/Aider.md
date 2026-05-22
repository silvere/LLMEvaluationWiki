---
title: "Aider"
type: harness
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
developer: "Paul Gauthier"
official_url: "https://aider.chat/"
github: "https://github.com/Aider-AI/aider"
arxiv_id: ""
license: "Apache-2.0"
supported_benchmarks:
  - "[[Aider-Polyglot]]"
  - "[[SWE-bench]]"
sources:
  - "https://aider.chat/"
  - "https://aider.chat/docs/leaderboards/"
  - "https://github.com/Aider-AI/aider"
domain:
  - agent
  - code
dimension: A
subdimension: harness
---

# Aider

> 命令行 AI 编程助手 + agent harness，由 Paul Gauthier 维护。设计哲学："pair programming"——LLM 在用户 repo 上做精确的 diff 编辑，配合 git commit 历史。同时维护一个权威的 [[Aider-Polyglot]] benchmark 排行榜。

## 基本信息

- **开发方**：Paul Gauthier
- **首次发布**：2023
- **设计哲学**：editor-style agent — 用 SEARCH/REPLACE block 让 LLM 输出精准 diff，每次改动自动 git commit
- **支持模型**：OpenAI / Anthropic / Gemini / Ollama / 任意 LiteLLM 后端

## 设计要点

- 多种 edit 格式（whole / diff / SEARCH-REPLACE / udiff），针对不同模型能力优化
- 自带 repo map（让 LLM 看到代码库结构而非全 dump）
- 维护活跃的 [[Aider-Polyglot|Polyglot benchmark]]（225 个跨 6 种语言的编程题），是社区最常引用的代码 agent 排行榜之一

## 应用 benchmark

- [[Aider-Polyglot]]（自家 benchmark，权威更新最快）
- [[SWE-bench]]

## 备注

本页为 stub。Aider 维护的 leaderboard 是当前社区最受关注的代码 agent 排行榜之一，见 [[Aider-Leaderboard]]。
