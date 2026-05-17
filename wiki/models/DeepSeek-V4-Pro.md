---
title: "DeepSeek V4-Pro"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://api-docs.deepseek.com/news/news260424"
  - "https://huggingface.co/deepseek-ai"
  - "https://www.cnbc.com/2026/04/24/deepseek-v4-llm-preview-open-source-ai-competition-china.html"
developer: "DeepSeek"
release_date: "2026-04-24"
family: "DeepSeek V4"
context_length: "1M"
modality: "text"
license: "MIT (open weights)"
model_id: "deepseek-v4-pro"
domain:
  - model-spec
aliases:
  - deepseek-v4-pro
  - DeepSeek-V4
---

# DeepSeek V4-Pro

> DeepSeek 旗舰开源模型，1.6T 总参 / 49B 激活，1M 上下文，引入 DSA（DeepSeek Sparse Attention），开源权重 MIT 协议。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[DeepSeek]] |
| 发布时间 | 2026-04-24（Preview） |
| 模型家族 | DeepSeek V4 |
| 总参数 | 1.6T |
| 激活参数 | 49B（MoE） |
| 上下文长度 | 1M（默认全量开放） |
| 注意力 | Token-wise 压缩 + DSA（DeepSeek Sparse Attention） |
| 模态 | text |
| 许可 | MIT（开源权重） |
| 官方 model_id | `deepseek-v4-pro` |
| API 兼容 | OpenAI ChatCompletions + Anthropic API |
| 模式 | 双模式（Thinking / Non-Thinking） |

## 评测表现（来自官方公告）

| Benchmark | 分数 | 备注 |
|-----------|-----|------|
| [[SWE-bench-Verified]] | 80.6% | 与 Gemini 3.1 Pro 同档 |
| [[SWE-bench-Pro]] | 55.4% | open-source 第一 |
| [[GPQA]] (Diamond) | 90.1% | |
| Codeforces | 3206 | |

> 数据来源：上方 frontmatter `sources` 列出的 api-docs.deepseek.com 官方公告。官方表述：在 Math/STEM/Coding 上击败所有当前开源模型，与顶级闭源模型相当；World Knowledge 仅次于 [[Gemini-3.1-Pro]]。

## API 迁移

> 旧端点 `deepseek-chat` 与 `deepseek-reasoner` 将于 **2026-07-24 15:59 UTC** 全面停用。迁移：保持 base_url 不变，将 `model` 参数改为 `deepseek-v4-pro` 或 `deepseek-v4-flash`。

## 前代/相关模型

- [[DeepSeek-V3.1]]
- [[DeepSeek-V3]]
- [[DeepSeek-R1]]
- 兄弟版本：[[DeepSeek-V4-Flash]]（284B/13B 轻量版）

## 备注

本页基于 DeepSeek 官方公告整理；详尽测试结果与第三方独立评测请参考 [[Artificial-Analysis-Leaderboard]] / [[LMSYS-Chatbot-Arena]] / [[HELM-Leaderboard]] 等独立榜单。如发现数据过时或错误，请人工编辑后将 `confidence` 改为 `promoted`。
