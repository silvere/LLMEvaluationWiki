---
title: "KoLA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [knowledge, reasoning]
language: en
year: 2023
authors: ["Yu et al."]
arxiv_id: "2306.09296"
official_url: "https://kola.xlore.cn/"
license: ""
size: 0
format: other
status: active
saturation_threshold: 0.90
sources: []
---

# KoLA（Knowledge-oriented LLM Assessment）

> 基于知识图谱结构的知识导向型语言模型评测基准，分层次评测模型对知识的记忆、理解、应用和创造能力。

## 概述

KoLA 由 Yu 等人于 2023 年提出，来自清华大学知识工程组。该基准的独特之处在于将**知识能力**分为四个层次，形成类似布鲁姆认知分类法的知识评测框架：

1. **知识记忆（Knowledge Memorization）**：模型能否回忆出已有知识点
2. **知识理解（Knowledge Comprehension）**：模型能否理解知识的含义和关系
3. **知识应用（Knowledge Application）**：模型能否将知识应用于解决实际问题
4. **知识创造（Knowledge Creation）**：模型能否基于已有知识生成新的知识推断

KoLA 涵盖 19 个知识任务，包括：
- 实体识别和链接
- 关系抽取和推理
- 知识图谱问答
- 常识推理
- 科学知识应用
- 跨域知识综合

数据集来源包括 Wikidata、Wikipedia 等知识图谱和百科数据，部分任务专门设计了反事实（counterfactual）变体来测试模型的鲁棒性。

KoLA 的分层框架使研究者可以更精细地分析模型的知识处理能力，识别其在不同知识应用层次上的强弱。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 子任务数 | 19 个 |
| 格式 | 多种（分类/问答/生成） |
| 领域 | 知识理解与推理 |
| 语言 | 英文 |
| 数据来源 | Wikidata、Wikipedia 等 |
| 评测框架 | 四层知识分类 |

## SOTA 表现

各模型在 KoLA 不同层次任务上的表现差异显著，高层次的知识应用和创造任务对大型模型挑战较大。具体成绩见官方网站及论文。

## 主要挑战与局限

- **知识图谱时效性**：Wikidata 等来源的知识会随时间更新
- **层次划分主观性**：四层知识分类的边界不总是清晰
- **知识覆盖偏向**：主要基于英语维基数据，存在文化偏差
- **任务设计复杂**：19 个子任务的设计和评测指标各异，聚合困难
- **反事实验证难**：创造类任务的标准答案难以客观界定

## 相关页面

- [[MMLU]]
- [[TriviaQA]]
- [[NaturalQuestions]]
- [[FActScore]]
- [[AGIEval]]
