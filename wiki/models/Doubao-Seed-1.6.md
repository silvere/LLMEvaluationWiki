---
title: "Doubao Seed 1.6 / Seed-Thinking"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://seed.bytedance.com/en/blog/bytedance-s-latest-thinking-model-seed-thinking-v1-5-technical-details-disclosed"
developer: "ByteDance-AI"
release_date: "2025-04 (Seed-Thinking-v1.5), 2025-06 (Seed 1.6)"
family: "Doubao Seed"
context_length: "256K input"
modality: "text + image + video"
license: "proprietary (API)"
domain:
  - model-spec
aliases:
  - doubao-seed-1.6
---

# Doubao Seed 1.6 / Seed-Thinking

> 字节 Seed 团队推理模型；多个版本中 Seed-Thinking-v1.5 配合 RLHF 在数学/代码上达到对标 o1 的水平。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[ByteDance-AI]] |
| 发布时间 | 2025-04 (Seed-Thinking-v1.5), 2025-06 (Seed 1.6) |
| 模型家族 | Doubao Seed |
| 上下文长度 | 256K input |
| 模态 | text + image + video |
| 许可 | proprietary (API) |

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| [[AIME]] 2024 (Seed-Thinking) | 约 86.7% |
| [[Codeforces]] Elo | 约 86.0 percentile |
| [[GPQA]] Diamond | 约 77.3% |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 内的具体分数为 ingest 时记录，**可能与最新官方数字有出入**，权威数据请直接访问官方 sources 链接。

## 前代/相关模型

- Doubao 1.5 Pro

## 备注

本页基于官方公开材料整理，作为 wiki 索引；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。
