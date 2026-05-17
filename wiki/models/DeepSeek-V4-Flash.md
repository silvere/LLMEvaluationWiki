---
title: "DeepSeek V4-Flash"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://api-docs.deepseek.com/news/news260424"
  - "https://huggingface.co/deepseek-ai"
developer: "DeepSeek"
release_date: "2026-04-24"
family: "DeepSeek V4"
context_length: "1M"
modality: "text"
license: "MIT (open weights)"
model_id: "deepseek-v4-flash"
domain:
  - model-spec
aliases:
  - deepseek-v4-flash
---

# DeepSeek V4-Flash

> DeepSeek V4 系列轻量版，284B 总参 / 13B 激活，1M 上下文，与 V4-Pro 同步开源（MIT），主打长上下文高吞吐与低成本部署。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[DeepSeek]] |
| 发布时间 | 2026-04-24（Preview） |
| 模型家族 | DeepSeek V4 |
| 总参数 | 284B |
| 激活参数 | 13B（MoE） |
| 上下文长度 | 1M |
| 注意力 | Token-wise 压缩 + DSA |
| 模态 | text |
| 许可 | MIT（开源权重） |
| 官方 model_id | `deepseek-v4-flash` |
| API 兼容 | OpenAI ChatCompletions + Anthropic API |
| 模式 | 双模式（Thinking / Non-Thinking） |

## 评测表现（公开数据）

| Benchmark | 分数 |
|-----------|-----|
| 详细数字待官方 model card 公布 | 以官方为准 |

> 官方定位：长上下文 + 高吞吐量场景，性价比最优。具体分数请参考 frontmatter `sources` 中的官方页面。

## 前代/相关模型

- 旗舰版：[[DeepSeek-V4-Pro]]
- [[DeepSeek-V3.1]]
- [[DeepSeek-R1]]

## 备注

本页基于 DeepSeek 官方公告整理；详尽测试结果请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] 等独立榜单。
