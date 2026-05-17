---
title: "Kimi K2"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://moonshotai.github.io/Kimi-K2/"
  - "https://github.com/moonshotai/Kimi-K2"
developer: "Moonshot-AI"
release_date: "2025-07"
family: "Kimi"
context_length: "128K input"
modality: "text + image"
license: "open weights (limited)"
domain:
  - model-spec
aliases:
  - kimi-k2
---

# Kimi K2

> Moonshot 1T 参数 MoE 模型，主打长上下文与代码 Agent；在 SWE-bench 与 LiveCodeBench 等代码 benchmark 上对标 Claude/GPT-4o。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[Moonshot-AI]] |
| 发布时间 | 2025-07 |
| 模型家族 | Kimi |
| 上下文长度 | 128K input |
| 模态 | text + image |
| 许可 | open weights (limited) |

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| [[SWE-bench-Verified]] (Agentic) | 约 65.8% |
| [[LiveCodeBench]] | 约 53.7% |
| [[AIME]] 2025 | 约 53.1% |
| [[GPQA]] Diamond | 约 75.1% |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 内的具体分数为 ingest 时记录，**可能与最新官方数字有出入**，权威数据请直接访问官方 sources 链接。

## 前代/相关模型

- Kimi K1.5
- Moonshot v1

## 备注

本页基于官方公开材料整理，作为 wiki 索引；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。
