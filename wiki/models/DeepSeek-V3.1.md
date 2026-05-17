---
title: "DeepSeek V3.1 / V3.2"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://huggingface.co/deepseek-ai/DeepSeek-V3.1"
  - "https://www.bentoml.com/blog/the-complete-guide-to-deepseek-models-from-v3-to-r1-and-beyond"
developer: "DeepSeek"
release_date: "2025-08 (V3.1), 2025-09+ (V3.2)"
family: "DeepSeek V"
context_length: "128K (V3.1) / 163K (V3.2)"
modality: "text"
license: "open weights (MIT-like)"
model_id: "deepseek-v3.1 / deepseek-v3.2"
domain:
  - model-spec
aliases:
  - deepseek-v3.1
---

# DeepSeek V3.1 / V3.2

> V3.1 是 V3 与 R1 的 hybrid 融合（thinking + non-thinking），671B 总参/37B 激活；V3.2 扩展 context 至 163K。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[DeepSeek]] |
| 发布时间 | 2025-08 (V3.1), 2025-09+ (V3.2) |
| 模型家族 | DeepSeek V |
| 上下文长度 | 128K (V3.1) / 163K (V3.2) |
| 模态 | text |
| 许可 | open weights (MIT-like) |
| 官方 model_id | `deepseek-v3.1 / deepseek-v3.2` |


## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| 数据待 audit | 详见 sources |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 仅作 wiki 索引，权威数据请访问官方源。

## 前代/相关模型

- [[DeepSeek-V3|DeepSeek V3]]
- [[DeepSeek-R1|DeepSeek R1]]

## 备注

本页基于官方公开材料整理；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。如发现数据过时或错误，请人工编辑后将 `confidence` 改为 `promoted`。
