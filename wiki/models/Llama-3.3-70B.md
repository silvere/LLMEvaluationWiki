---
title: "Llama 3.3 70B"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://www.llama.com/models/llama-3/"
  - "https://huggingface.co/meta-llama/Llama-3.3-70B-Instruct"
developer: "Meta-AI"
release_date: "2024-12"
family: "Llama 3"
context_length: "128K input"
modality: "text"
license: "Llama 3 Community License (open weights)"
domain:
  - model-spec
aliases:
  - llama-3.3-70b
---

# Llama 3.3 70B

> Meta 开源旗舰，70B 尺寸优化版，性能对标 Llama 3.1 405B 但成本显著降低；多语言能力扩展。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[Meta-AI]] |
| 发布时间 | 2024-12 |
| 模型家族 | Llama 3 |
| 上下文长度 | 128K input |
| 模态 | text |
| 许可 | Llama 3 Community License (open weights) |

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| [[MMLU]] | 约 86% |
| [[HumanEval]] | 约 88.4% |
| [[MATH]] | 约 77% |
| [[MGSM]] | 约 91.1% |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 内的具体分数为 ingest 时记录，**可能与最新官方数字有出入**，权威数据请直接访问官方 sources 链接。

## 前代/相关模型

- Llama 3.1 70B
- Llama 3.1 405B

## 备注

本页基于官方公开材料整理，作为 wiki 索引；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。
