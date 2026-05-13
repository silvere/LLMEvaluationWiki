---
title: "OpenCompass（上海 AI 实验室）"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
---

# OpenCompass（上海 AI 实验室）

> 上海 AI 实验室开发的开源评测框架，专注中英双语评测，中国模型评测主流工具。

## 基本信息

- **全称**：OpenCompass
- **开发者**：上海人工智能实验室（Shanghai AI Lab）
- **开源地址**：github.com/open-compass/opencompass
- **主要用途**：中英双语 LLM 评测，司南排行榜的技术后端

## 功能与特点

- **双语覆盖**：支持 70+ benchmark，涵盖中文理解、中文推理等本地化任务，填补了 EleutherAI Harness 在中文评测上的空白。
- **司南排行榜**：OpenCompass 团队运营司南（Sinian）公开排行榜，是国内最权威的开源模型中英双语排名。
- **面向中国模型**：对国内主流模型（如通义、文心、InternLM、ChatGLM 等）的接入和适配支持更完善。
- **答案提取准确率**：xFinder 框架测评为 74.38%，高于 lm-evaluation-harness 的 67.80%，在复杂输出格式解析上有优势。
- **分布式评测支持**：支持多机多卡并行评测，适合大规模模型快速评测。

## 与其他框架的对比

| 维度 | OpenCompass | lm-evaluation-harness |
|------|-------------|----------------------|
| 中文 benchmark | 丰富 | 较少 |
| 答案提取准确率 | 74.38% | 67.80% |
| 国际学术使用频率 | 较低 | 高（事实标准） |
| Hugging Face 集成 | 独立 | 深度集成 |

## 局限与挑战

- **国际影响力有限**：相比 EleutherAI Harness，OpenCompass 在非中文学术社区的使用率较低。
- **部分 benchmark 版本差异**：与 Harness 对同一 benchmark 的实现可能存在细节差异，导致分数不直接可比。

## 相关页面

- [[Shanghai-AI-Lab]] — 开发团队
- [[OpenCompass-Sinian]] — 基于 OpenCompass 的公开排行榜
- [[lm-evaluation-harness]] — 主要竞争框架
