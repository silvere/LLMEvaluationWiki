---
title: "Claude 3.5 Sonnet"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://www.anthropic.com/news/claude-3-5-sonnet"
  - "https://www.anthropic.com/news/3-5-models-and-computer-use"
developer: "Anthropic"
release_date: "2024-06 (v1), 2024-10 (new/v2)"
family: "Claude 3"
context_length: "200K input / 8K output"
modality: "text + image"
license: "proprietary (API)"
domain:
  - model-spec
aliases:
  - claude-3.5-sonnet
---

# Claude 3.5 Sonnet

> Anthropic 中型旗舰，长期被工业界视为代码能力最强模型之一；引入 Computer Use 工具调用范式。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[Anthropic]] |
| 发布时间 | 2024-06 (v1), 2024-10 (new/v2) |
| 模型家族 | Claude 3 |
| 上下文长度 | 200K input / 8K output |
| 模态 | text + image |
| 许可 | proprietary (API) |

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| [[HumanEval]] | 92.0% |
| [[SWE-bench-Verified]] | 49.0% |
| [[MMLU]] | 88.7% |
| [[GPQA]] Diamond | 65.0% |
| MMMU | 68.3% |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 内的具体分数为 ingest 时记录，**可能与最新官方数字有出入**，权威数据请直接访问官方 sources 链接。

## 前代/相关模型

- Claude 3 Sonnet

## 备注

本页基于官方公开材料整理，作为 wiki 索引；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。
