---
title: "DeepSeek R1"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://arxiv.org/abs/2501.12948"
  - "https://huggingface.co/deepseek-ai/DeepSeek-R1"
developer: "DeepSeek"
release_date: "2025-01"
family: "DeepSeek R"
context_length: "128K input"
modality: "text"
license: "open weights (MIT)"
domain:
  - model-spec
aliases:
  - deepseek-r1
---

# DeepSeek R1

> DeepSeek 首个推理优化模型，通过纯 RL（无 SFT）训练取得逼近 o1 的推理能力；震动 AI 工业界，引发开源推理模型浪潮。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[DeepSeek]] |
| 发布时间 | 2025-01 |
| 模型家族 | DeepSeek R |
| 上下文长度 | 128K input |
| 模态 | text |
| 许可 | open weights (MIT) |

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| [[AIME]] 2024 | 79.8% |
| [[MATH]] 500 | 97.3% |
| [[GPQA]] Diamond | 71.5% |
| [[Codeforces]] Elo | 2029 (96.3 percentile) |
| [[MMLU]] | 90.8% |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 内的具体分数为 ingest 时记录，**可能与最新官方数字有出入**，权威数据请直接访问官方 sources 链接。

## 前代/相关模型

- DeepSeek V3

## 备注

本页基于官方公开材料整理，作为 wiki 索引；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。
