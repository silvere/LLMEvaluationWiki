---
title: "AssistantBench"
type: benchmark
dimension: D
subdimension: web-gui
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://assistantbench.github.io/"
  - "https://arxiv.org/abs/2407.15711"
aliases:
  - AssistantBench
org: "AI2 / Tel Aviv University"
arxiv_id: "2407.15711"
year: 2024
domain:
  - agent
---

# AssistantBench

> 评测 web agent 完成**真实世界辅助任务**（如旅行规划、信息汇总、购物对比）的 benchmark。任务需多步 web 交互 + 答案合成，共 214 道难题，是 [[BrowserGym]] 的成员任务集之一。

## 关键特点

- **任务数**：214（人工精心构造，避免数据污染）
- **评测指标**：accuracy + efficiency（步数）
- **特色**：任务需跨多网站检索 + 推理，不可单步完成

## 相关页面

- [[BrowserGym]]
- [[WebArena]]
- [[WorkArena]]
- [[GAIA]]
