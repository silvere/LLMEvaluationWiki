---
title: "SciCode"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [code, reasoning]
language: en
year: 2024
authors: ["Minyang Tian", "Luyu Gao", "Shizhuo Dylan Zhang", "Xinan Chen", "Cunwei Fan", "Xuefei Guo", "Roland Haas", "Pan Ji", "Kittithat Krongchon", "Yao Li", "Shengyan Liu", "Di Luo", "Yutao Ma", "Hao Tong", "Kha Trinh", "Hanghang Tong", "Julien Juillard", "Yifan Zhang", "Jiawei Han", "Heng Ji"]
arxiv_id: "2407.13168"
official_url: "https://scicode-bench.github.io/"
license: ""
size: 338
format: code
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2407.13168"
  - "https://scicode-bench.github.io/"
---

# SciCode

> 包含338道科学研究级编程问题的评测基准，跨越数学、物理、化学、生物、材料科学等多个学科，要求模型具备真实科研人员水平的编程与领域知识。

## 概述

SciCode由Tian等人于2024年发布，针对科学研究场景下的代码编写能力进行评测。与DS-1000等数据科学编程基准不同，SciCode的题目来源于真实的科学研究需求，涵盖数值模拟、数据分析、算法实现等科研常见编程任务，要求模型具备相应学科的专业知识。

题目被分解为多个子问题（subproblems），模型需要按顺序完成每个子问题并构建最终解答。这种设计反映了科研编程的渐进性特点。题目覆盖的学科包括：计算数学、物理模拟、量子化学、生物信息学、材料科学等。

SciCode的测评采用两种模式：（1）有科学背景知识提示（with context）；（2）无背景知识（without context），用于区分模型的编程能力和领域知识记忆能力。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 338 道主问题（含多个子问题） |
| 覆盖学科 | 数学、物理、化学、生物、材料科学等 |
| 编程语言 | Python |
| 评测模式 | 有/无科学背景知识提示 |
| 评测方式 | 单元测试执行正确性 |
| 难度定位 | 科研级别（PhD水平） |

## SOTA 表现

| 模型 | 主问题通过率（含提示） | 主问题通过率（无提示） |
|------|-------------------|-------------------|
| Claude 3.5 Sonnet | ~26% | ~18% |
| GPT-4o | ~22% | ~15% |
| GPT-4 Turbo | ~17% | ~12% |

注：SciCode难度极高，即使顶级模型的通过率也不超过30%，具有良好的区分度。

## 主要挑战与局限

- **领域知识要求高**：许多题目需要特定学科的深度专业知识，通用语言模型难以掌握所有领域。
- **题量有限**：338道题在某些学科分支上数量偏少。
- **评测环境依赖**：科学计算通常依赖特定版本的数值计算库，环境配置复杂。
- **子问题依赖链**：前一个子问题的错误会级联影响后续子问题，使得部分正确解答难以被公平评估。
- **招募专家出题成本高**：需要各学科博士级专家参与，数据集扩展难度大。

## 相关页面

- [[DS-1000]]
- [[SciBench]]
- [[GPQA]]
- [[BigCodeBench]]
- [[APPS]]
