---
title: "Hugging Face"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Hugging Face

> 开源 AI 平台公司，提供模型 Hub、Datasets 和 Spaces，Open LLM Leaderboard 的运营者，AI 开源生态的核心基础设施提供者。

## 基本信息

- **性质**：营利性开源 AI 平台公司
- **成立时间**：2016 年
- **总部**：美国纽约
- **联合创始人**：Clément Delangue、Julien Chaumond、Thomas Wolf
- **规模**：数百人

## 主要贡献（评测相关）

Hugging Face 在 LLM 评测基础设施层面的贡献无可替代。

**Open LLM Leaderboard**：2023 年推出的开源模型评测榜单，基于标准化评测框架（lm-evaluation-harness）对提交的开源模型进行 ARC、HellaSwag、MMLU、TruthfulQA 等基准的自动化评测，成为开源 LLM 社区最重要的参照榜单之一。2024 年推出 v2 版本，引入更难的评测集。

**lm-evaluation-harness**：与 EleutherAI 合作维护的开源 LLM 评测框架，支持数百个评测任务，是学术界和工业界广泛使用的评测工具。

**Datasets Hub**：托管大量用于 NLP 和 LLM 评测的数据集，提供标准化加载接口，便于评测复现。

**Transformers 库**：标准化了模型加载和推理接口，使不同来源模型的对比评测成为可能。

**MTEB（Massive Text Embedding Benchmark）**：与学术界合作发布的文本嵌入评测基准，成为嵌入模型评测的行业标准。

## 代表性模型/产品

- **Hugging Face Hub**：模型、数据集、Spaces 托管平台
- **Transformers**：主流开源 NLP/LLM 框架
- **Open LLM Leaderboard**：开源模型评测榜单
- **MTEB Leaderboard**：文本嵌入模型评测榜单
- **Evaluate 库**：标准化评测指标计算工具

## 对评测生态的影响

Hugging Face 将评测的"基础设施层"标准化：统一的模型格式、数据集加载方式和评测框架，使不同机构的模型可以在相同条件下被比较。Open LLM Leaderboard 的出现也带来了"刷榜"（benchmark overfitting）现象的广泛讨论，推动了评测社区对评测集污染和训练集重叠问题的关注。

## 相关页面

- [[Open-LLM-Leaderboard]]
- [[lm-evaluation-harness]]
- [[EleutherAI]]
- [[MTEB]]
- Datasets
