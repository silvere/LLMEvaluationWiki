---
title: "GLM-5"
type: model
publish: true
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://huggingface.co/zai-org/GLM-5"
  - "https://www.buildfastwithai.com/blogs/glm-5-released-open-source-model-2026"
developer: "Zhipu AI (Z.ai)"
release_date: "2026-02-11"
family: "GLM-5"
context_length: "128K"
modality: "text"
license: "open weights (MIT)"
model_id: "glm-5"
domain:
  - model-spec
aliases:
  - GLM5
  - glm-5
---

# GLM-5

> 智谱 AI 2026-02 发布的开源旗舰模型，744B 总参 / 40B 激活，28.5T tokens 预训练，agentic 能力为重点，在 SWE-bench Verified 上为开源第一。

## 基本信息

| 属性 | 值 |
|------|-----|
| 开发方 | [[Zhipu-AI]] |
| 发布时间 | 2026-02-11 |
| 模型家族 | GLM-5 |
| 总参数 | 744B |
| 激活参数 | 40B（MoE） |
| 预训练 tokens | 28.5T |
| 上下文长度 | 128K |
| 注意力 | DSA-style 稀疏注意力 |
| 模态 | text |
| 许可 | 开源权重（MIT） |
| 官方 model_id | `glm-5` |

## 评测表现（公开数据）

| Benchmark | 分数 | 备注 |
|-----------|-----|------|
| [[HLE]] (Humanity's Last Exam) | 30.5 / **50.4 w/ tools** | 超过 Claude Opus 4.5 (28.4 / 43.4) |
| [[GPQA]] (Diamond) | 86.0 | 与 Claude Opus 4.5 (87.0) 接近，低于 Gemini 3 Pro (91.9) |
| [[SWE-bench-Verified]] | 77.8% | **开源第一**；Claude Opus 4.5 (80.9%) / GPT-5.2 (80.0%) 领先 |
| SWE-bench Multilingual | 73.3% | |
| Terminal-Bench 2.0 | 56.2 / 60.7 | |
| BrowseComp | 62.0 / 75.9 | |
| AIME 2026 I | 92.7 | |

> 数据来源：HuggingFace model card + 媒体报道。

## 前代/相关模型

- ChatGLM-3（智谱旧家族，尚无独立 wiki 页）
- 后续版本：[[GLM-5.1]]

## 备注

本页基于智谱官方 HuggingFace model card 整理；详尽测试结果请参考 [[Artificial-Analysis-Leaderboard]] 等独立榜单。
