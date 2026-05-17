---
title: "Claude 3.7 Sonnet"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://www.anthropic.com/news/claude-3-7-sonnet"
developer: "Anthropic"
release_date: "2025-02"
family: "Claude 3"
context_length: "200K input / 64K output (128K with extended thinking)"
modality: "text + image"
license: "proprietary (API)"
domain:
  - model-spec
aliases:
  - claude-3.7-sonnet
---

# Claude 3.7 Sonnet

> Anthropic 首个 hybrid reasoning 模型，可在 standard 与 extended thinking 模式间切换；编程能力大幅提升。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[Anthropic]] |
| 发布时间 | 2025-02 |
| 模型家族 | Claude 3 |
| 上下文长度 | 200K input / 64K output (128K with extended thinking) |
| 模态 | text + image |
| 许可 | proprietary (API) |

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| [[SWE-bench-Verified]] | 70.3% (高级配置) |
| [[AIME]] 2024 (extended thinking) | 约 78% |
| [[GPQA]] Diamond | 约 78% |
| [[HumanEval]] | 约 92-95% |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 内的具体分数为 ingest 时记录，**可能与最新官方数字有出入**，权威数据请直接访问官方 sources 链接。

## 前代/相关模型

- Claude 3.5 Sonnet (v2)

## 备注

本页基于官方公开材料整理，作为 wiki 索引；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。
