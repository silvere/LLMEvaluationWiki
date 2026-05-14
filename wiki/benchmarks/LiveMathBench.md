---
title: "LiveMathBench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [math, reasoning]
language: en
year: 2024
authors: []
arxiv_id: ""
official_url: ""
license: ""
size: 0
format: open-ended
status: active
saturation_threshold: 0.90
sources: []
---

# LiveMathBench

> 持续收录最新数学竞赛题目的动态更新数学评测基准，通过引入近期比赛的新题目来缓解数据污染问题，评测模型在"未见题目"上的真实数学推理能力。

## 概述

LiveMathBench于2024年提出，其设计理念与LiveCodeBench类似：通过持续收录最新数学竞赛（AMC、AIME、IMO等）的新题目，构建一个难以被训练数据污染的动态数学评测集。

与MATH500、OmniMath等静态基准相比，LiveMathBench的主要优势在于：所收录题目在大多数主流模型训练截止日期之后发布，因此可以更可靠地评测模型的"真实"数学推理能力，而非对训练数据中已见题目的记忆能力。

数据集会定期更新，纳入最新竞赛的题目，同时保留历史题目用于追踪模型进步趋势。

## 规格

| 属性 | 值 |
|------|-----|
| 更新频率 | 持续更新（跟随竞赛日历） |
| 题目来源 | 近期AMC/AIME/数学奥林匹克等竞赛 |
| 答案类型 | 数值 / 表达式 |
| 评测方式 | 精确匹配 |
| 设计目标 | 防数据污染 |

注：LiveMathBench的详细规格（如具体题量）暂无稳定的公开数据，以确认信息为准。

## SOTA 表现

暂无稳定的公开排行榜数据。

## 主要挑战与局限

- **维护成本持续较高**：动态更新需要持续的人力投入来收录、标注和验证新题目。
- **历史一致性问题**：随着题目集更新，不同时间点的评测结果难以直接比较。
- **竞赛题目版权**：部分竞赛对题目的使用有版权限制。
- **污染防护的有限性**：随着时间推移，新题目也会逐渐进入训练数据，"动态"优势会随时间衰减。
- **信息有限**：LiveMathBench目前学术曝光度相对有限，相关信息暂时不够充分。

## 相关页面

- [[LiveCodeBench]]
- [[MATH]]
- [[MATH500]]
- [[AIME]]
- [[OmniMath]]
