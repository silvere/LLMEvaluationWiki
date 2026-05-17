---
title: "MGSM"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [math, multilingual]
language: multilingual
year: 2023
authors: ["Shi et al."]
arxiv_id: "2210.03057"
official_url: "https://github.com/google-research/url-nlp/tree/main/mgsm"
license: "CC-BY-4.0"
size: 2500
format: open-ended
status: active
saturation_threshold: 0.90
sources: []
---

# MGSM（Multilingual Grade School Math）

> 将 GSM8K 数学题翻译为 10 种语言的多语言小学数学推理基准。

## 概述

MGSM 由 Shi 等人于 2023 年提出（发表于 ICLR 2023），来自 Google Research。该数据集通过将 GSM8K 的数学文字题翻译为 10 种语言，创建了一个评测多语言数学推理能力的标准基准。

MGSM 涵盖的 10 种语言：
- **西欧语言**：英文、德文、法文、西班牙文、俄文
- **亚洲语言**：中文、日文、泰文、斯瓦希里文
- **其他**：班图语系

每种语言包含 250 道精心翻译的小学数学文字题（来自 GSM8K 的子集），要求模型通过多步推理给出数值答案。翻译由母语者完成，确保翻译质量。

MGSM 的重要发现是：模型在不同语言上的数学推理能力存在显著差异，即使是顶尖模型，在资源较少的语言（如斯瓦希里文、泰文）上的性能也明显低于高资源语言（如英文）。这揭示了多语言模型在数学推理方面存在系统性的语言不公平问题。

该论文还研究了**跨语言思维链**（cross-lingual chain-of-thought）的影响，发现让模型用英文进行推理再翻译为目标语言答案有时表现更好。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 数据量 | 2,500 题（10 语言 × 250 题） |
| 格式 | 开放式（数值答案） |
| 领域 | 数学推理、多语言 |
| 语言 | 10 种语言 |
| 许可证 | CC-BY-4.0 |
| 数据来源 | GSM8K 翻译 |

## SOTA 表现

顶尖多语言模型（GPT-4o、Gemini Ultra 等）在 MGSM 的平均准确率超过 85%（英文），但各语言间仍存在差距。具体最新成绩见各模型官方技术报告。

## 主要挑战与局限

- **翻译保真度**：数学表达的翻译可能引入歧义，尤其是单位和专有名词
- **语言资源不平等**：低资源语言上的性能差距反映了训练数据偏差
- **基于 GSM8K**：继承了 GSM8K 本身的局限（如题目难度偏低、容易数据污染）
- **文化适应性**：某些数学情境（货币、单位）在翻译时未完全本地化
- **规模有限**：每种语言仅 250 道题

## 相关页面

- [[GSM8K]]
- [[MATH]]
- [[FLoRes-200]]
- [[MathBench]]
- [[MMLU]]

## 主流模型得分（来自 wiki/models/）

> 以下分数来自 wiki/models/ 中各模型的官方/技术报告数据（汇总自 model spec 页）。准确数字以模型方公布为准。

| 模型 | 分数 | 备注 |
|------|------|------|
| [[Llama-3.3-70B|Llama 3.3 70B]] | 约 91.1% |  |
