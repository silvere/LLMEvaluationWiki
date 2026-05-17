---
title: "Kimi K2.6"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://huggingface.co/moonshotai/Kimi-K2.6"
  - "https://miraflow.ai/blog/kimi-k2-6-explained-moonshot-ai-open-source-model-ties-gpt-5-5-coding"
developer: "Moonshot-AI"
release_date: "2026-04-20"
family: "Kimi K2"
context_length: "256K input"
modality: "text + image + video（含 400M MoonViT vision encoder）"
license: "Modified MIT (open-weight)"
model_id: "kimi-k2.6"
domain:
  - model-spec
aliases:
  - kimi-k2.6
---

# Kimi K2.6

> Moonshot 当前开源旗舰，1T 参数 / 32B 激活 MoE；在 SWE-Bench Pro 上 ties GPT-5.5（58.6%），HLE with tools 54.0% leads。Agent Swarm 扩展到 300 sub-agents / 4000 steps。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[Moonshot-AI]] |
| 发布时间 | 2026-04-20 |
| 模型家族 | Kimi K2 |
| 上下文长度 | 256K input |
| 模态 | text + image + video（含 400M MoonViT vision encoder） |
| 许可 | Modified MIT (open-weight) |
| 官方 model_id | `kimi-k2.6` |


## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| [[SWE-bench-Pro]] (tied with GPT-5.5) | 58.6% |
| [[HLE]] (with tools, leading) | 54.0% |

> 数据来源：上方 frontmatter `sources` 列出的官方页面。本 wiki 仅作 wiki 索引，权威数据请访问官方源。

## 前代/相关模型

- [[Kimi-K2.5|Kimi K2.5]]
- [[Kimi-K2|Kimi K2]]

## 备注

本页基于官方公开材料整理；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。如发现数据过时或错误，请人工编辑后将 `confidence` 改为 `promoted`。
