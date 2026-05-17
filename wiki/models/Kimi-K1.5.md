---
title: "Kimi K1.5"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://github.com/MoonshotAI/Kimi-k1.5"
  - "https://arxiv.org/abs/2501.12599"
developer: "Moonshot-AI"
release_date: "2025-01"
family: "Kimi"
context_length: "128K input"
modality: "text + image"
license: "proprietary (API)"
domain:
  - model-spec
aliases:
  - kimi-k1.5
---

# Kimi K1.5

> Moonshot 推理模型，发布伴随的技术报告系统揭示 RL+长上下文推理训练方法；中国对标 o1 的标志性发布之一。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[Moonshot-AI]] |
| 发布时间 | 2025-01 |
| 模型家族 | Kimi |
| 上下文长度 | 128K input |
| 模态 | text + image |
| 许可 | proprietary (API) |

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| [[AIME]] 2024 | 约 77.5% |
| [[MATH]] 500 | 96.2% |
| [[Codeforces]] Elo | 94 percentile |
| [[MMLU]] | 87.4% |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 内的具体分数为 ingest 时记录，**可能与最新官方数字有出入**，权威数据请直接访问官方 sources 链接。

## 前代/相关模型

- Moonshot v1

## 备注

本页基于官方公开材料整理，作为 wiki 索引；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。
