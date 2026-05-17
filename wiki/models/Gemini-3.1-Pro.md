---
title: "Gemini 3.1 Pro"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-1-pro/"
  - "https://deepmind.google/models/model-cards/gemini-3-1-pro/"
  - "https://artificialanalysis.ai/models/gemini-3-1-pro-preview"
developer: "Google-DeepMind"
release_date: "2026"
family: "Gemini 3"
context_length: "1M input"
modality: "text + image + audio + video"
license: "proprietary (API)"
model_id: "gemini-3-1-pro"
domain:
  - model-spec
aliases:
  - gemini-3.1-pro
---

# Gemini 3.1 Pro

> Google 当前最强模型，'leading on 13 of 16 benchmarks Google measured'，引入 vibe coding 与 agentic 能力。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[Google-DeepMind]] |
| 发布时间 | 2026 |
| 模型家族 | Gemini 3 |
| 上下文长度 | 1M input |
| 模态 | text + image + audio + video |
| 许可 | proprietary (API) |
| 官方 model_id | `gemini-3-1-pro` |


## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| [[SWE-bench-Verified]] | 80.6% |
| [[GPQA]] Diamond | 94.3% |
| [[ARC-AGI]]-2 | 77.1% |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 仅作 wiki 索引，权威数据请访问官方源。

## 前代/相关模型

- [[Gemini-2.5-Pro|Gemini 2.5 Pro]]

## 备注

本页基于官方公开材料整理；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。如发现数据过时或错误，请人工编辑后将 `confidence` 改为 `promoted`。
