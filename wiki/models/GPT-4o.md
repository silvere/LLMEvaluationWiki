---
title: "GPT-4o"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://openai.com/index/hello-gpt-4o/"
  - "https://platform.openai.com/docs/models/gpt-4o"
developer: "OpenAI"
release_date: "2024-05"
family: "GPT"
context_length: "128K input / 16K output"
modality: "text + image + audio + video"
license: "proprietary (API)"
domain:
  - model-spec
aliases:
  - gpt-4o
---

# GPT-4o

> OpenAI 首个原生多模态模型（'omni'），统一处理文本、图像、音频和视频输入。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[OpenAI]] |
| 发布时间 | 2024-05 |
| 模型家族 | GPT |
| 上下文长度 | 128K input / 16K output |
| 模态 | text + image + audio + video |
| 许可 | proprietary (API) |

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| [[MMLU]] | 88.7% |
| [[AIME]] 2024 | 约 9-13% |
| [[GPQA]] Diamond | 53.6% |
| [[HumanEval]] | 90.2% |
| [[MATH]] | 76.6% |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 内的具体分数为 ingest 时记录，**可能与最新官方数字有出入**，权威数据请直接访问官方 sources 链接。

## 前代/相关模型

- GPT-4-Turbo
- GPT-4

## 备注

本页基于官方公开材料整理，作为 wiki 索引；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。
