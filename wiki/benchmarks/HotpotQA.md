---
title: "HotpotQA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning, retrieval]
language: en
year: 2018
authors: ["Yang et al."]
arxiv_id: "1809.09600"
official_url: "https://hotpotqa.github.io/"
license: "CC-BY-SA-4.0"
size: 113000
format: open-ended
status: active
saturation_threshold: 0.90
sources: []
---

# HotpotQA

> 要求跨多个 Wikipedia 文档进行多跳推理的问答数据集，同时提供支持事实（supporting facts）标注。

## 概述

HotpotQA 由 Yang 等人于 2018 年提出（发表于 EMNLP 2018），来自卡内基梅隆大学等机构。该数据集的核心特点是**多跳推理**（multi-hop reasoning）：每道问题需要从两个或更多 Wikipedia 文档中获取信息并进行推理，才能得出正确答案。

数据集包含约 113,000 道问题，并提供两项独特的标注：
1. **支持事实（Supporting Facts）**：标注出对回答问题必要的关键句子，使得模型的推理过程可解释和可评测
2. **比较型问题（Comparison Questions）**：专门包含需要对两个实体进行比较的问题（约 25%）

HotpotQA 提供两种评测设置：
- **全文设置（Full Wiki）**：需要从整个 Wikipedia 中检索相关文档
- **干扰设置（Distractor）**：提供 10 个段落（其中 2 个包含答案），测试模型在干扰信息下的推理能力

评测指标同时包含答案 EM/F1 和支持事实 EM/F1，以及两者的联合分数（Joint EM/F1）。这使得 HotpotQA 成为评测模型推理透明度的重要工具。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2018 |
| 数据量 | 约 113,000 题 |
| 格式 | 开放式（答案抽取 + 支持事实标注） |
| 领域 | 多跳推理、阅读理解 |
| 语言 | 英文 |
| 许可证 | CC-BY-SA-4.0 |
| 数据来源 | Wikipedia + 众包 |

## SOTA 表现

在干扰设置下，顶尖系统的联合 F1 分数超过 75%。全文设置更具挑战性。具体最新成绩见官方排行榜。

## 主要挑战与局限

- **多跳推理复杂**：需要跨文档推理，对模型的信息整合能力要求高
- **检索难度大**：全文设置需要从海量文档中准确检索相关段落
- **支持事实标注质量**：众包标注可能存在不一致性
- **问题简化问题**：部分多跳问题可以通过单跳推理解决，数据质量参差不齐
- **计算开销大**：全文设置需要大规模检索基础设施

## 相关页面

- [[NaturalQuestions]]
- [[TriviaQA]]
- [[SQuAD-2.0]]
- [[DROP]]
- [[MuSiQue]]
