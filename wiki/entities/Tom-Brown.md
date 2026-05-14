---
title: "Tom Brown"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Tom Brown

> 前 OpenAI 研究员，GPT-3 论文通讯作者，in-context learning（上下文学习）能力的系统展示者，现为 AI 初创公司创始人。

## 基本信息

- **所属机构**：前 OpenAI；现为 Character.AI 联合创始人（此后另创业）
- **研究方向**：大规模语言模型、少样本学习、in-context learning
- **背景**：在 OpenAI 期间主导了 GPT-3 项目的研发

## 评测领域主要贡献

**GPT-3 论文（2020）**：Tom Brown 作为通讯作者发表的"Language Models are Few-Shot Learners"是 LLM 评测史上最重要的文献之一。该论文系统展示了 GPT-3（1750 亿参数）在 zero-shot、one-shot、few-shot 三种设置下在数十个 NLP 评测任务上的表现，首次将"in-context learning"作为 LLM 的新型能力范式进行系统评测，推动了整个 LLM 评测范式从微调迁移到提示评测的转变。

**Few-Shot 评测范式**：GPT-3 论文确立了对 LLM 进行 zero/few-shot 评测（不微调直接用提示测试）的标准实验设计，这一范式至今仍是 LLM 基准评测的主要方式。

**规模效应量化**：论文对不同规模模型（1.25B 至 175B 参数）在相同评测任务上的表现进行了系统对比，为 Scaling Laws 研究提供了基础数据，推动了"规模 vs. 性能"关系的评测研究方向。

**SuperGLUE 等基准的重要参照**：GPT-3 在 SuperGLUE 等多个基准上的 few-shot 结果，使这些评测基准成为后续所有大模型必须报告的参照。

## 代表性工作

- "Language Models are Few-Shot Learners"（GPT-3，2020）
- GPT-3 系列评测实验设计

## 相关页面

- [[GPT-4]]
- [[In-Context-Learning]]
- [[benchmark-design]]
- [[Scaling-Laws]]
- [[OpenAI]]
