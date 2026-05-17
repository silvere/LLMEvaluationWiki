---
title: "Maarten Bosma"
type: entity
entity_type: person
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://ma2rten.github.io/"
  - "https://scholar.google.com/citations?user=wkeFQPgAAAAJ"
aliases:
  - Maarten Bosma
affiliation: "Google Brain / Google DeepMind"
position: "Research Engineer"
education: ["University of Amsterdam"]
research_focus:
  - Pretraining data pipelines
  - LLM evaluation systems
  - Chain-of-Thought prompting
homepage: "https://ma2rten.github.io/"
google_scholar: "https://scholar.google.com/citations?user=wkeFQPgAAAAJ"
domain:
  - entity
---

# Maarten Bosma

> Google Brain / Google DeepMind Research Engineer。LaMDA、GLaM、PaLM 等大模型预训练数据 pipeline 与评测系统的核心构建者；Chain-of-Thought 论文共同作者。

## 基本信息

- **所属机构**：Google Brain → Google DeepMind（2023 重组后）
- **职位**：Research Engineer
- **学历背景**：University of Amsterdam
- **链接**：[主页](https://ma2rten.github.io/) · [Google Scholar](https://scholar.google.com/citations?user=wkeFQPgAAAAJ)

## 评测领域主要贡献

**Pretraining 数据评测**：在 LaMDA / GLaM / PaLM 等大模型项目中创建预训练数据 pipeline，进行数据质量 ablation 实验——把"数据质量"从模糊概念变成可量化评测维度。这条工程线影响后续 [[DataComp-LM]] 等数据中心化评测的实践方法。

**PaLM 评测系统设计**：作为 PaLM 核心贡献者，为大模型在 [[BBH]] / [[MMLU]] / [[HumanEval]] 等多任务评测上建立可复用的评测系统（pipelines + harness）；这套基础设施是后续 Gemini 系列评测的技术底座。

**Chain-of-Thought 共同作者**：与 Jason Wei、Xuezhi Wang、Denny Zhou 等共同发表奠基论文 [[2201.11903|Chain-of-Thought Prompting Elicits Reasoning in Large Language Models]]（NeurIPS 2022），是 LLM 推理评测当今主流报告范式（CoT pass@1）的方法学起点。

## 代表性工作

- [[2201.11903|Chain-of-Thought Prompting Elicits Reasoning in LLMs]]（NeurIPS 2022）
- LaMDA / GLaM / PaLM 评测系统与数据 pipeline
- Pretraining data quality ablation 系列实验

## 本 wiki 收录的该作者论文

<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:START -->
*共 3 篇（截至 2026-05-17，按发表年份倒序）*

- [[2201.11903|Chain-of-Thought Prompting Elicits Reasoning in Large Language Models]]（2022）
- [[2110.14168|Finetuned Language Models Are Zero-Shot Learners]]（2021）
- [[2107.03374|Program Synthesis with Large Language Models]]（2021）
<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:END -->

## 相关页面

- [[Google-DeepMind]]
- [[Denny-Zhou]]
- [[Jason-Wei]]
- [[Quoc-Le]]
- [[chain-of-thought]]
