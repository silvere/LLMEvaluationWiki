---
title: "Gemini 1.5 Pro"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/"
  - "https://ai.google.dev/gemini-api/docs/models"
developer: "Google-DeepMind"
release_date: "2024-02 (announced), 2024-05 (GA)"
family: "Gemini 1.5"
context_length: "1M-2M input"
modality: "text + image + audio + video"
license: "proprietary (API)"
domain:
  - model-spec
aliases:
  - gemini-1.5-pro
---

# Gemini 1.5 Pro

> 首个商用百万级 token 上下文模型，引入 Mixture-of-Experts (MoE) 架构。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[Google-DeepMind]] |
| 发布时间 | 2024-02 (announced), 2024-05 (GA) |
| 模型家族 | Gemini 1.5 |
| 上下文长度 | 1M-2M input |
| 模态 | text + image + audio + video |
| 许可 | proprietary (API) |

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| [[MMLU]] | 85.9% |
| [[MATH]] | 67.7% |
| [[HumanEval]] | 71.9% |
| MRCR (1M context retrieval) | 94.5% |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 内的具体分数为 ingest 时记录，**可能与最新官方数字有出入**，权威数据请直接访问官方 sources 链接。

## 前代/相关模型

- Gemini 1.0 Pro

## 备注

本页基于官方公开材料整理，作为 wiki 索引；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。
