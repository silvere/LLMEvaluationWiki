---
title: "Qwen3 系列（235B-A22B / 32B / Thinking）"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://qwenlm.github.io/blog/qwen3/"
  - "https://arxiv.org/abs/2505.09388"
developer: "Alibaba-Tongyi"
release_date: "2025-04 (235B MoE 等多尺寸)"
family: "Qwen 3"
context_length: "128K input"
modality: "text + image (VL)"
license: "open weights (Apache 2.0)"
domain:
  - model-spec
aliases:
  - qwen3
---

# Qwen3 系列（235B-A22B / 32B / Thinking）

> 阿里第三代开源旗舰，MoE 架构（235B 总参/22B 激活），首个开源支持 Thinking/Non-Thinking 模式切换的中国模型。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[Alibaba-Tongyi]] |
| 发布时间 | 2025-04 (235B MoE 等多尺寸) |
| 模型家族 | Qwen 3 |
| 上下文长度 | 128K input |
| 模态 | text + image (VL) |
| 许可 | open weights (Apache 2.0) |

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| [[MMLU]] Pro | 约 80% |
| [[AIME]] 2025 (thinking) | 约 81% |
| [[GPQA]] (thinking) | 约 70% |
| [[LiveCodeBench]] | 约 70% |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 内的具体分数为 ingest 时记录，**可能与最新官方数字有出入**，权威数据请直接访问官方 sources 链接。

## 前代/相关模型

- Qwen2.5

## 备注

本页基于官方公开材料整理，作为 wiki 索引；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。
