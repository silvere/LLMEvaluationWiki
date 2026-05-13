---
title: "EleutherAI"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
---

# EleutherAI

> 专注开源 LLM 研究的非营利组织，lm-evaluation-harness 的开发者。

## 基本信息

- **性质**：非营利研究组织
- **成立背景**：由 AI 研究社区成员自发组建，目标是推动大型语言模型的开放研究
- **影响领域**：开源模型训练、评测框架、数据集构建

## 主要贡献

### lm-evaluation-harness
EleutherAI 对 LLM 评测生态影响最大的项目，已成为学术界评测开源模型的事实标准。支持 100+ benchmark，为 Hugging Face Open LLM Leaderboard 提供技术后端。详见 [[lm-evaluation-harness]]。

### GPT-Neo / GPT-J / GPT-NeoX
早期开源大语言模型系列，是 GPT-3 发布后社区开源复现的先驱之一，推动了开放模型研究的发展。

### The Pile
大规模多样化文本预训练数据集，包含学术论文、代码、书籍、网页等多种来源，被多个开源模型用于预训练。

## 对评测生态的影响

lm-evaluation-harness 通过提供统一的评测接口，大幅降低了研究者对比不同模型的成本，奠定了可复现评测的技术基础。Hugging Face Open LLM Leaderboard 基于 Harness 对 3,000+ 模型进行标准化评测，使开源模型的能力比较成为可能。

EleutherAI 的评测哲学强调：相同的任务、相同的 prompt、相同的 shot 数，才能得到有意义的跨模型比较结果。

## 局限

- 作为非营利社区组织，资源有限，benchmark 更新和维护依赖社区贡献，部分实现可能滞后。
- 框架主要针对英文任务和开源模型，中文和多语言支持不如 OpenCompass 完善。

## 相关页面

- [[lm-evaluation-harness]] — 核心技术贡献
- [[HuggingFace-Open-LLM-Leaderboard]] — 主要合作方
- [[opencompass]] — 同类框架，面向中文评测
