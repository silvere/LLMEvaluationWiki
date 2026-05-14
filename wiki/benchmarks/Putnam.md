---
title: "Putnam"
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
official_url: "https://math.scu.edu/putnam/"
license: ""
size: 0
format: open-ended
status: active
saturation_threshold: 0.50
sources:
  - "https://artofproblemsolving.com/wiki/index.php/William_Lowell_Putnam_Mathematical_Competition"
---

# Putnam

> 威廉·洛厄尔·普特南数学竞赛题目集，是北美大学本科生级别最高荣誉的数学竞赛，作为LLM评测基准时代表了数学证明推理能力的极限挑战。

## 概述

威廉·洛厄尔·普特南数学竞赛（William Lowell Putnam Mathematical Competition）由美国数学学会主办，每年12月举行，面向美国和加拿大的大学本科生。竞赛包含12道题（上午6道，下午6道），要求提供严格的数学证明，满分为120分。令人印象深刻的是，历年参赛学生的平均分通常只有1-2分（满分120分），该竞赛被认为是有史以来最难的数学竞赛之一。

在LLM评测中，Putnam题目集通常指从历年竞赛中收集的开放式证明题，用于评测模型在大学级别深度数学推理和证明写作上的能力。与AIME（计算为主）不同，Putnam更侧重创造性的数学证明构造。

已有多个研究工作使用Putnam题目评测LLM，包括Azerbayev等人的工作（LLEMMA）以及后续的数学推理研究。

## 规格

| 属性 | 值 |
|------|-----|
| 每届题量 | 12 道（6+6） |
| 答案类型 | 严格数学证明 |
| 难度定位 | 大学本科级最高水平 |
| 主办机构 | 美国数学学会 |
| 竞赛历史 | 1938年至今 |
| 评测挑战 | 证明正确性的自动验证极难 |

## SOTA 表现

| 模型 | 表现估计 |
|------|---------|
| o3（OpenAI，2025） | 部分题目可解，具体数据以官方报告为准 |
| GPT-4 | 能解答部分A1、B1级别（最容易的题目） |
| 一般LLM | 接近0分 |

注：Putnam对自动评测构成极大挑战，证明的正确性难以用程序自动验证，现有报告数据存在较大不确定性。

## 主要挑战与局限

- **证明验证极难**：与有明确数值答案的竞赛不同，Putnam要求严格的数学证明，自动评判极为困难，目前主要依赖人工评判或形式化验证工具（如Lean）。
- **难度对当前模型几乎无区分度**：大多数模型得分接近0，无法有效区分不同能力层次。
- **数据集构建困难**：历年题目公开但附有版权，且需要人工标注答案，构建标准化数据集存在法律和技术障碍。
- **创造性推理要求**：Putnam题目通常需要非常规的数学洞察力，超出当前LLM的系统性推理范畴。
- **形式化证明体系依赖**：目前更可靠的Putnam评测需要模型生成形式化证明（Lean/Isabelle等），这要求额外的形式化数学能力。

## 相关页面

- [[AIME]]
- [[AIME24]]
- [[FrontierMath]]
- [[OmniMath]]
- [[OlympiadBench]]
