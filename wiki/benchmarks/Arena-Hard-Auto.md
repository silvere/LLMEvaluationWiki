---
title: "Arena-Hard-Auto"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://github.com/lmarena/arena-hard-auto"
  - "https://lmsys.org/blog/2024-04-19-arena-hard/"
aliases:
  - Arena-Hard
  - Arena-Hard-Auto
  - ArenaHard
domain:
  - benchmark
  - leaderboard
---

# Arena-Hard-Auto

> [[LMSYS]] / [[Chatbot-Arena]] 团队 2024-04 推出的自动评测 benchmark：通过 BenchBuilder pipeline 从真实 [[Chatbot-Arena]] 对战数据中筛 500 个最有区分度的 hard prompt，由强 LLM-as-judge（GPT-4 / Claude 3.5）打对战，号称对 [[Chatbot-Arena]] human preference 排名的相关性达 89%。是替代 [[MT-Bench]] 的事实标准。

## 设计

- **BenchBuilder pipeline**：自动聚类 + 难度筛选 + diversity 控制，从 Chatbot Arena 200K+ 历史 prompt 中提炼 500 个
- **评测协议**：模型 vs baseline（默认 GPT-4-0314）pairwise，judge 用 GPT-4-Turbo
- **指标**：win rate + 95% CI
- **成本**：约 $25/run，远低于人工 Arena

## 关键数值

- 与 [[Chatbot-Arena]] 排名相关性 **89%**（[[MT-Bench]] 约 75%）
- 置信区间比 MT-Bench **紧 3x**（500 题 vs MT-Bench 80 题）
- 区分度：能区分 GPT-4 不同版本，MT-Bench 已 saturate

## 衍生

- **Arena-Hard v2**（2025）扩展到 multilingual / coding 子集
- 影响 [[AlpacaEval]] 2.0 等 LLM-judge benchmark 的设计

## 相关页面

- [[Chatbot-Arena]]
- [[LMSYS]]
- [[MT-Bench]]
- [[AlpacaEval]]
- [[llm-as-judge]]
