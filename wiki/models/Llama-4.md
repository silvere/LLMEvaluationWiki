---
title: "Llama 4 (Maverick / Scout)"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://ai.meta.com/blog/llama-4-multimodal-intelligence/"
  - "https://www.llama.com/models/llama-4/"
developer: "Meta-AI"
release_date: "2025-04"
family: "Llama 4"
context_length: "10M input (Scout)"
modality: "text + image (native multimodal)"
license: "Llama 4 Community License (open weights)"
domain:
  - model-spec
aliases:
  - llama-4
---

# Llama 4 (Maverick / Scout)

> Meta 第四代开源模型，首个原生多模态 + 极长上下文（Scout 10M token）的开源大模型；MoE 架构。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[Meta-AI]] |
| 发布时间 | 2025-04 |
| 模型家族 | Llama 4 |
| 上下文长度 | 10M input (Scout) |
| 模态 | text + image (native multimodal) |
| 许可 | Llama 4 Community License (open weights) |

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| [[MMLU]] Pro (Maverick) | 约 80.5% |
| [[GPQA]] Diamond (Maverick) | 约 69.8% |
| [[LiveCodeBench]] | 约 43.4% |
| MMMU (Maverick) | 约 73.4% |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 内的具体分数为 ingest 时记录，**可能与最新官方数字有出入**，权威数据请直接访问官方 sources 链接。

## 前代/相关模型

- Llama 3.3

## 备注

本页基于官方公开材料整理，作为 wiki 索引；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。
