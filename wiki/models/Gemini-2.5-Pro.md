---
title: "Gemini 2.5 Pro"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://blog.google/technology/google-deepmind/gemini-model-thinking-updates-march-2025/"
  - "https://deepmind.google/models/gemini/"
developer: "Google-DeepMind"
release_date: "2025-03 (preview), 2025-06 (GA)"
family: "Gemini 2.5"
context_length: "1M-2M input (extending to 2M)"
modality: "text + image + audio + video"
license: "proprietary (API)"
domain:
  - model-spec
aliases:
  - gemini-2.5-pro
---

# Gemini 2.5 Pro

> Google 思维链原生模型，Chatbot Arena 持续位列 Top-1；强化复杂推理与工具协同。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[Google-DeepMind]] |
| 发布时间 | 2025-03 (preview), 2025-06 (GA) |
| 模型家族 | Gemini 2.5 |
| 上下文长度 | 1M-2M input (extending to 2M) |
| 模态 | text + image + audio + video |
| 许可 | proprietary (API) |

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| [[AIME]] 2025 | 86.7% |
| [[GPQA]] Diamond | 84.0% |
| [[HLE]] | 约 18.8% |
| [[SWE-bench-Verified]] | 63.2% |
| [[LiveCodeBench]] | 约 80% |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 内的具体分数为 ingest 时记录，**可能与最新官方数字有出入**，权威数据请直接访问官方 sources 链接。

## 前代/相关模型

- Gemini 2.0 Pro Experimental

## 备注

本页基于官方公开材料整理，作为 wiki 索引；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。
