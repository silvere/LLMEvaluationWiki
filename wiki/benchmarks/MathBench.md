---
title: "MathBench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [math, knowledge]
language: zh
year: 2024
authors: []
arxiv_id: "2405.12209"
official_url: "https://github.com/open-compass/MathBench"
license: "Apache-2.0"
size: 3709
format: multiple-choice
status: active
saturation_threshold: 0.90
sources: []
---

# MathBench

> 覆盖中国初中、高中到大学数学的多级别中文数学评测基准，同时包含中英文数学知识测试。

## 概述

MathBench 于 2024 年发布，来自 OpenCompass 社区（上海人工智能实验室等机构主导）。该基准专门针对中文数学评测场景，填补了中文数学评测基准的空白，同时覆盖数学知识理解和问题解决能力两个维度。

MathBench 的独特设计是**双轨并行**评测：
1. **数学知识（Knowledge）**：测试数学概念、定理、公式的理解和记忆，以选择题形式呈现
2. **数学计算（Calculation/Application）**：测试解决实际数学问题的能力，包含计算和证明

难度层次覆盖：
- **初中数学**：方程、几何基础、统计概率等
- **高中数学**：函数、数列、导数、向量、概率统计等
- **大学数学**：高等数学、线性代数、概率论等
- **竞赛数学**：数学竞赛级别题目

数据集共约 3,709 道题，包含中文和英文两种语言版本，部分题目配有中文解题过程标注。

MathBench 是 OpenCompass 评测平台的重要组成部分，与 GSM8K、MATH 等英文数学基准互补，专门服务于中文数学能力评测需求。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2024 |
| 数据量 | 约 3,709 题 |
| 格式 | 多选题（知识类）+ 开放式（计算类） |
| 领域 | 数学 |
| 语言 | 中英双语 |
| 许可证 | Apache-2.0 |
| 难度层次 | 初中/高中/大学/竞赛 |

## SOTA 表现

顶尖数学推理模型（GPT-4o、Claude 3.5 Sonnet、Qwen 系列、DeepSeek 等）在 MathBench 上的准确率超过 70%，部分模型在高中数学上超过 85%。具体最新成绩见 OpenCompass 排行榜。

## 主要挑战与局限

- **中国课程偏向**：基于中国数学课程标准，与其他国家课程体系有所不同
- **大学数学难度大**：高等数学等大学课程对模型挑战较大
- **评测指标不统一**：选择题和开放式题目使用不同指标
- **数据版权**：部分题目来自教材或考试，版权情况待核实
- **知识与计算的分离评测**：双轨设计增加了评测分析复杂度

## 相关页面

- [[MATH]]
- [[GSM8K]]
- [[MGSM]]
- [[MMLU]]
- [[CMMLU]]
