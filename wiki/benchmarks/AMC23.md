---
title: "AMC23"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [math, reasoning]
language: en
year: 2023
authors: []
arxiv_id: ""
official_url: "https://artofproblemsolving.com/wiki/index.php/AMC_Problems_and_Solutions"
license: ""
size: 60
format: multiple-choice
status: active
saturation_threshold: 0.95
sources:
  - "https://artofproblemsolving.com/wiki/index.php/2023_AMC_10A_Problems"
  - "https://artofproblemsolving.com/wiki/index.php/2023_AMC_12A_Problems"
---

# AMC23

> 2023年美国数学竞赛（AMC 10A/10B/12A/12B）的题目集合，用于评测大语言模型在高中竞赛级数学推理上的表现，是连接日常数学评测（如MATH）与顶级竞赛评测（如AIME）的中间难度基准。

## 概述

AMC（American Mathematics Competition）是由美国数学学会（MAA）主办的权威数学竞赛系列，AMC 10面向10年级及以下学生，AMC 12面向12年级及以下学生。AMC23特指2023年举办的AMC竞赛题目。

AMC题目均为选择题（5个选项），每套题目30道，分为AMC 10和AMC 12两个级别，每个级别又分A、B两套（在不同日期举行）。题目覆盖代数、几何、数论、组合等核心数学领域，难度层次分明：前半部分相对基础，后半部分（尤其最后10道）需要较强的数学竞赛技巧。

AMC成绩达到一定分数线可晋级AIME，AMC23因此作为AIME难度的前置基准被广泛使用。在大模型评测中，AMC23常与AIME24配合使用，共同评测模型的数学竞赛能力梯度。

## 规格

| 属性 | 值 |
|------|-----|
| 题目数量 | 每套30道（共4套：10A/10B/12A/12B） |
| 题目格式 | 五选一选择题 |
| 难度范围 | 竞赛入门到中高难度 |
| 评分方式 | 答对得分，答错无惩罚（2023年起） |
| 主办机构 | 美国数学学会（MAA） |
| 晋级机制 | 达到分数线可晋级AIME |

## SOTA 表现

| 模型 | AMC 10/12 满分得分率 |
|------|-------------------|
| o1（2024） | 接近满分（~28-29/30） |
| GPT-4o | ~22-25/30 |
| GPT-4（2023） | ~20-24/30 |

注：顶级模型在AMC级别已接近饱和，区分度主要体现在后半部分难题。

## 主要挑战与局限

- **难度对顶级模型偏低**：2024年后的前沿模型（如o1系列）已能稳定高分通过AMC，区分度下降。
- **题量有限**：每套仅30道，统计方差较大。
- **选择题格式可猜测**：五选一格式下，模型即使推理有误也有一定概率猜对答案，影响评测准确性。
- **数据污染风险高**：AMC历年题目均在Art of Problem Solving等网站公开，极可能出现在训练数据中。
- **时效性**：每年新题公布后需更新，评测社区需及时维护题目集。

## 相关页面

- [[AIME]]
- [[MATH]]
- [[MATH500]]
- [[OmniMath]]
- [[FrontierMath]]
