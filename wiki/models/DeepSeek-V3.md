---
title: "DeepSeek V3 / V3.1"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://arxiv.org/abs/2412.19437"
  - "https://huggingface.co/deepseek-ai/DeepSeek-V3"
  - "https://api-docs.deepseek.com/"
developer: "DeepSeek"
release_date: "2024-12 (V3), 2025-03 (V3.1)"
family: "DeepSeek V"
context_length: "128K input"
modality: "text"
license: "open weights (MIT-like)"
domain:
  - model-spec
aliases:
  - deepseek-v3
---

# DeepSeek V3 / V3.1

> DeepSeek 旗舰 MoE 模型 (671B 总参数 / 37B 激活)，开源开放权重，性能对标 GPT-4o；中国大模型的标志性突破。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[DeepSeek]] |
| 发布时间 | 2024-12 (V3), 2025-03 (V3.1) |
| 模型家族 | DeepSeek V |
| 上下文长度 | 128K input |
| 模态 | text |
| 许可 | open weights (MIT-like) |

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| [[MMLU]] | 88.5% |
| [[MMLU]]-Pro | 75.9% |
| [[HumanEval]] | 约 82-89% |
| [[MATH]] 500 | 90.2% |
| [[GPQA]] Diamond | 约 59% |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 内的具体分数为 ingest 时记录，**可能与最新官方数字有出入**，权威数据请直接访问官方 sources 链接。

## 前代/相关模型

- DeepSeek V2.5

## 备注

本页基于官方公开材料整理，作为 wiki 索引；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。
