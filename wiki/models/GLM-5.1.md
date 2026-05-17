---
title: "GLM-5.1"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://huggingface.co/zai-org/GLM-5.1"
  - "https://wavespeed.ai/blog/posts/glm-5-1-vs-claude-gpt-gemini-deepseek-llm-comparison/"
  - "https://winbuzzer.com/2026/04/09/z-ai-releases-glm-5-1-754b-model-tops-swe-bench-pro-xcxwbn/"
developer: "Zhipu AI (Z.ai)"
release_date: "2026-03-27"
family: "GLM-5"
context_length: "128K"
modality: "text"
license: "open weights (MIT)"
model_id: "glm-5.1"
domain:
  - model-spec
aliases:
  - GLM5.1
  - glm-5.1
---

# GLM-5.1

> 智谱 AI 2026-03-27 发布的 GLM-5 增量版本（754B 参数），通过强化后训练显著提升编码与推理；**在 SWE-Bench Pro 上击败所有同期闭源旗舰**。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[Zhipu-AI]] |
| 发布时间 | 2026-03-27 |
| 模型家族 | GLM-5 |
| 总参数 | 754B |
| 上下文长度 | 128K |
| 模态 | text |
| 许可 | 开源权重（MIT） |
| 官方 model_id | `glm-5.1` |

## 评测表现（公开数据）

| Benchmark | 分数 | 备注 |
|-----------|-----|------|
| [[HLE]] | 31.0% | 较 GLM-5 (30.5%) 微提 |
| [[GPQA]] (Diamond) | 86.2% | 较 GLM-5 (86.0%) 微提 |
| [[SWE-bench-Pro]] | **58.4%** | **榜首**，超过 Claude Opus 4.6 (57.3%) 与 GPT-5.4 (57.7%) |

> 数据来源：HuggingFace model card + Winbuzzer / Wavespeed 报道。GLM-5.1 是 GLM-5 的强化后训练增量版本，主要提升点为编码与 agentic 能力。

## 前代/相关模型

- 前代：[[GLM-5]]
- 同期对手：[[Claude-Opus-4.7]] / [[GPT-5.5]] / [[Gemini-3.1-Pro]] / [[DeepSeek-V4-Pro]]

## 备注

本页基于智谱官方 HuggingFace model card 整理；详尽测试结果请参考 [[Artificial-Analysis-Leaderboard]] 等独立榜单。
