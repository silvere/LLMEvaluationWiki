---
title: "Grok 4.3"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://docs.x.ai/developers/models"
  - "https://artificialanalysis.ai/models/grok-4-3"
  - "https://artificialanalysis.ai/articles/xai-launches-grok-4-3-with-improved-agentic-performance-and-lower-pricing"
  - "https://venturebeat.com/technology/xai-launches-grok-4-3-at-an-aggressively-low-price-and-a-new-fast-powerful-voice-cloning-suite"
developer: "xAI"
release_date: "2026-04-30"
family: "Grok 4"
context_length: "1M"
modality: "text"
license: "proprietary (API)"
model_id: "grok-4-3"
domain:
  - model-spec
aliases:
  - grok-4.3
  - Grok4.3
---

# Grok 4.3

> xAI 2026-04-30 发布的 Grok 4 系列最新版本，1M 上下文，比 Grok 4.20 更便宜约 20% 同时智能指数提升；在 GDPval-AA 这一 agent benchmark 上 ELO 大幅跃升 321 点。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[xAI]] |
| 发布时间 | 2026-04-30 |
| 模型家族 | Grok 4 |
| 上下文长度 | 1M tokens |
| 模态 | text |
| 许可 | proprietary (API) |
| 官方 model_id | `grok-4-3` |
| 价格 | $1.25 / 1M input、$2.50 / 1M output |
| 价格 (cache) | $0.20 / 1M cached input |
| 工具调用 | Web Search / Code Execution $5 / 1K calls；File Attachments $10 / 1K |

## 评测表现（公开数据）

| Benchmark | 分数 | 备注 |
|-----------|-----|------|
| Artificial Analysis Intelligence Index | 53 | 同价位推理模型中"远高于均值" |
| GDPval-AA (ELO) | 1500 | 较 Grok 4.20 的 1179 跃升 321 |
| Coding Index (Kilo) | 41.0 | 83 tok/s |

> 数据来源：Artificial Analysis + xAI 官方 docs。Grok 4.3 在 GDPval-AA（generative-agent 类 benchmark）上单 benchmark 涨幅是历代最大。

## 前代/相关模型

- 前代：Grok 4.20（本 wiki 未收录）
- 兄弟版本：Grok 4.3 (high) / Grok 4.3 Voice Suite

## 备注

本页基于 xAI 官方 docs 与 Artificial Analysis 独立榜单整理；详尽测试结果请参考 [[Artificial-Analysis-Leaderboard]]。
