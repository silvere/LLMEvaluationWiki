---
title: "ARB"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning, math]
language: en
year: 2023
authors: ["Tomohiro Sawada", "Daniel Paleka", "Alexander Havrilla", "Pranav Tadepalli", "Paula Vidas", "Alexander Kranias", "John J. Nay", "Kshitij Gupta", "Aran Komatsuzaki"]
arxiv_id: "2307.13692"
official_url: "https://github.com/TheDuckAI/arb"
license: ""
size: 0
format: open-ended
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2307.13692"
  - "https://github.com/TheDuckAI/arb"
---

# ARB (Advanced Reasoning Benchmark)

> 包含来自数学、物理学、生物学、化学、法律等多领域研究级别难题的高级推理基准，旨在评测语言模型在专家水平复杂推理任务上的表现极限。

## 概述

ARB由Sawada等人于2023年发布，旨在提供一个覆盖多个高难度学科领域的推理评测基准，弥补现有基准在评测研究级（PhD及以上水平）推理能力上的不足。

ARB的题目来源广泛，包括：数学（复分析、拓扑学等）、物理学（量子力学、广义相对论等）、生物学（分子生物学等）、化学（有机合成等）、以及法律推理（美国法律案例等）。每个领域的题目均需要深度的专业知识和复杂的多步推理。

ARB的设计特点之一是引入了**部分分数评估**（rubric-based scoring）：许多题目的答案不是简单的对错，而是按照评分标准给出0-4分的部分分数，更接近人类专家评估的方式。这也意味着ARB需要使用LLM或人工评判来打分，增加了评测的复杂性。

## 规格

| 属性 | 值 |
|------|-----|
| 覆盖领域 | 数学、物理、生物、化学、法律 |
| 难度定位 | 研究级（PhD水平） |
| 评分方式 | 部分分数（rubric-based，0-4分） |
| 评判方式 | LLM评判 + 人工评判 |
| 题目来源 | 学术教材、研究题目 |

注：ARB的具体题量暂未查证到可靠数据。

## SOTA 表现

| 模型 | 数学子集 | 物理子集 |
|------|---------|---------|
| GPT-4（CoT） | ~50% | ~35% |
| GPT-3.5 | ~20% | ~15% |

注：分数为部分分数的百分比，具体以论文数据为准。

## 主要挑战与局限

- **评测主观性**：rubric-based评分方式引入主观性，不同评判者或LLM对相同答案可能给出不同分数。
- **题量有限**：部分领域（如生物、法律）的题量较少，统计可靠性有限。
- **法律推理的地域局限性**：法律推理题目基于美国法律体系，对其他法律体系的适用性有限。
- **评测成本高**：需要LLM或人工逐题打分，大规模评测成本较高。
- **与其他基准的重叠**：数学和物理部分与GPQA、TheoremQA等基准存在一定重叠。

## 相关页面

- [[GPQA]]
- [[TheoremQA]]
- [[SciBench]]
- [[OlympiadBench]]
- [[FrontierMath]]
