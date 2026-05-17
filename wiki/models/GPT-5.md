---
title: "GPT-5"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://openai.com/index/introducing-gpt-5/"
  - "https://platform.openai.com/docs/models"
developer: "OpenAI"
release_date: "2025-08"
family: "GPT"
context_length: "400K input / 128K output (estimated)"
modality: "text + image + audio"
license: "proprietary (API)"
domain:
  - model-spec
aliases:
  - gpt-5
---

# GPT-5

> OpenAI 的新一代旗舰模型，融合 GPT-4o 系列对话能力与 o-series 推理能力，按需切换 thinking/non-thinking。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[OpenAI]] |
| 发布时间 | 2025-08 |
| 模型家族 | GPT |
| 上下文长度 | 400K input / 128K output (estimated) |
| 模态 | text + image + audio |
| 许可 | proprietary (API) |

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| [[HLE]] | 约 25% (with reasoning) |
| [[AIME]] 2025 | 94.6% |
| [[GPQA]] Diamond | 约 85-88% |
| [[SWE-bench-Verified]] | 约 74% |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 内的具体分数为 ingest 时记录，**可能与最新官方数字有出入**，权威数据请直接访问官方 sources 链接。

## 前代/相关模型

- GPT-4o
- o3
- o4-mini

## 备注

本页基于官方公开材料整理，作为 wiki 索引；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。
