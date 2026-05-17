---
title: "GPT-4.1"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://openai.com/index/gpt-4-1/"
  - "https://platform.openai.com/docs/models/gpt-4.1"
developer: "OpenAI"
release_date: "2025-04"
family: "GPT"
context_length: "1M input"
modality: "text + image"
license: "proprietary (API)"
domain:
  - model-spec
aliases:
  - gpt-4.1
---

# GPT-4.1

> GPT-4o 的迭代版本，主要在编程能力、指令跟随和长上下文上提升；首个 1M token 上下文的 GPT 系列。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[OpenAI]] |
| 发布时间 | 2025-04 |
| 模型家族 | GPT |
| 上下文长度 | 1M input |
| 模态 | text + image |
| 许可 | proprietary (API) |

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| [[SWE-bench-Verified]] | 54.6% |
| [[MMLU]] | 约 90.2% |
| [[HumanEval]] | 约 90%+ |
| MMLU Long-Context (1M) | 84.1% |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 内的具体分数为 ingest 时记录，**可能与最新官方数字有出入**，权威数据请直接访问官方 sources 链接。

## 前代/相关模型

- GPT-4o

## 备注

本页基于官方公开材料整理，作为 wiki 索引；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。
