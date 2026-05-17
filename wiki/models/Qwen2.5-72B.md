---
title: "Qwen2.5 系列（含 72B / Coder / Math / VL）"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://qwenlm.github.io/blog/qwen2.5/"
  - "https://huggingface.co/Qwen/Qwen2.5-72B"
developer: "Alibaba-Tongyi"
release_date: "2024-09"
family: "Qwen 2.5"
context_length: "128K input"
modality: "text (Coder/Math 专业版) / text+image (VL)"
license: "open weights (Apache 2.0, 部分 Qwen License)"
domain:
  - model-spec
aliases:
  - qwen2.5-72b
---

# Qwen2.5 系列（含 72B / Coder / Math / VL）

> 阿里通义实验室主力开源系列，覆盖 0.5B-72B 多个尺寸；Coder/Math/VL 等领域专精版本为开源最强之一。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[Alibaba-Tongyi]] |
| 发布时间 | 2024-09 |
| 模型家族 | Qwen 2.5 |
| 上下文长度 | 128K input |
| 模态 | text (Coder/Math 专业版) / text+image (VL) |
| 许可 | open weights (Apache 2.0, 部分 Qwen License) |

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| [[MMLU]] | 约 85.0% |
| [[GSM8K]] | 约 95.8% |
| [[HumanEval]] (Coder-32B) | 约 92.7% |
| MATH (Math-7B) | 约 83.6% |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 内的具体分数为 ingest 时记录，**可能与最新官方数字有出入**，权威数据请直接访问官方 sources 链接。

## 前代/相关模型

- Qwen2

## 备注

本页基于官方公开材料整理，作为 wiki 索引；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。
