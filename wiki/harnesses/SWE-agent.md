---
title: "SWE-agent"
type: harness
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
developer: "Princeton NLP"
official_url: "https://swe-agent.com/"
github: "https://github.com/princeton-nlp/SWE-agent"
arxiv_id: "2405.15793"
license: "MIT"
supported_benchmarks:
  - "[[SWE-bench]]"
  - "[[SWE-bench-Verified]]"
  - "[[SWE-bench-Lite]]"
  - "[[SWE-bench-Pro]]"
sources:
  - "https://swe-agent.com/"
  - "https://arxiv.org/abs/2405.15793"
  - "https://github.com/princeton-nlp/SWE-agent"
domain:
  - agent
  - code
---

# SWE-agent

> Princeton NLP 团队开发的 agent scaffolding，定义了"Agent-Computer Interface (ACI)"概念，让 LLM 通过专用工具在仓库内执行 bash / 编辑 / 查看文件等动作。是 SWE-bench 系列上的代表性 harness 之一。

## 基本信息

- **开发方**：[[Princeton-AI|Princeton NLP]]
- **首次发布**：2024-04（arXiv 2405.15793）
- **设计哲学**：Agent-Computer Interface (ACI) — 给 LLM 设计专门的工具集（不只是 shell），降低 agent 行为空间的复杂度
- **支持模型**：任意 chat-completion LLM（GPT-4 / Claude / Llama / DeepSeek 等）

## 设计要点

- 不是裸 ReAct——重点在精心设计的 file viewer / editor 工具，限制 token 浪费在大文件 dump
- 默认 single-turn 工具调用 + 错误反馈
- 是 SWE-bench 早期排行榜上最常被引用的开源 baseline

## 应用 benchmark

- [[SWE-bench]] / [[SWE-bench-Verified]] / [[SWE-bench-Lite]] / [[SWE-bench-Pro]]

## 备注

本页为 stub，详细评测组合（SWE-agent + GPT-4 / Claude / etc.）数据待补，confidence 为 draft。
