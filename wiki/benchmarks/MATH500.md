---
title: "MATH500"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [math, reasoning]
language: en
year: 2023
authors: ["Hunter Lightman", "Vineet Kosaraju", "Yura Burda", "Harri Edwards", "Bowen Baker", "Teddy Lee", "Jan Leike", "John Schulman", "Ilya Sutskever", "Karl Cobbe"]
arxiv_id: "2305.20050"
official_url: ""
license: ""
size: 500
format: open-ended
status: active
saturation_threshold: 0.95
sources:
  - "https://arxiv.org/abs/2305.20050"
  - "https://github.com/openai/prm800k"
---

# MATH500

> MATH基准测试集的500题精选子集，由OpenAI的Lightman等人在"Let's Verify Step by Step"论文中引入，已成为评测数学推理能力的标准子集之一。

## 概述

MATH500不是独立的新基准，而是从Hendrycks等人发布的原版MATH数据集（12,500道题）中精心挑选的500道题目子集，由OpenAI研究团队在2023年的过程奖励模型（PRM）研究论文中提出。

选题标准：覆盖MATH数据集的7个数学领域（代数、计数与概率、几何、中间代数、数论、预代数、预微积分），并在各难度级别上均衡分布，尤其保留了较高比例的难题（Level 4-5）。

MATH500之所以被广泛采用，主要原因有：（1）相比完整MATH测试集，评测成本显著降低；（2）题目分布均衡，具有良好的代表性；（3）与过程奖励模型（PRM）研究紧密相关，推动了数学推理领域的研究进展。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 500 道 |
| 来源 | MATH 数据集测试集 |
| 覆盖领域 | 代数、几何、数论、计数与概率、中间代数、预代数、预微积分 |
| 难度级别 | Level 1-5，侧重 Level 4-5 |
| 答案类型 | 数学表达式（LaTeX格式） |
| 评测方式 | 符号等价匹配 |

## SOTA 表现

| 模型 | 准确率 |
|------|-------|
| o1-preview（2024） | ~85% |
| GPT-4o | ~76% |
| Claude 3.5 Sonnet | ~71% |
| GPT-4（2023） | ~67% |
| GPT-3.5 + CoT | ~57% |

## 主要挑战与局限

- **题量较小**：500道题在统计上可能存在较大方差，对模型排名的稳定性有一定影响。
- **与原版MATH重叠**：由于是MATH的子集，存在与训练数据重叠的可能（原版MATH数据早已公开）。
- **高难度题目集中**：对弱模型区分度不足（难题得分普遍为0），对强模型需配合更难基准。
- **格式敏感性**：数学表达式的符号等价判断存在边界情况，可能导致正确答案被错判。
- **逐渐饱和**：随着模型能力提升，MATH500的区分度在顶级模型间逐渐下降。

## 相关页面

- [[MATH]]
- [[AIME]]
- [[OmniMath]]
- [[GSM8K]]
- [[Minerva]]
