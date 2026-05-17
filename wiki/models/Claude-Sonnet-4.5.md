---
title: "Claude Sonnet 4.5"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://www.anthropic.com/news/claude-sonnet-4-5"
  - "https://platform.claude.com/docs/en/docs/about-claude/models/overview"
developer: "Anthropic"
release_date: "2025-09"
family: "Claude 4"
context_length: "200K input"
modality: "text + image"
license: "proprietary (API)"
domain:
  - model-spec
aliases:
  - claude-sonnet-4.5
---

# Claude Sonnet 4.5

> Claude 4 系列的中型旗舰，被 Anthropic 称为'world's best coding model'，在 SWE-bench 与 OSWorld 上刷新 SOTA。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[Anthropic]] |
| 发布时间 | 2025-09 |
| 模型家族 | Claude 4 |
| 上下文长度 | 200K input |
| 模态 | text + image |
| 许可 | proprietary (API) |

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| [[SWE-bench-Verified]] | 77.2% |
| [[OSWorld]] | 约 50-61% |
| [[tau-bench]] | 高于 Opus 4 |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 内的具体分数为 ingest 时记录，**可能与最新官方数字有出入**，权威数据请直接访问官方 sources 链接。

## 前代/相关模型

- Claude Sonnet 4
- Claude 3.7 Sonnet

## 备注

本页基于官方公开材料整理，作为 wiki 索引；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。
