---
title: "LiveBench Leaderboard"
type: leaderboard
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# LiveBench Leaderboard

## 概述

LiveBench Leaderboard 是一个**动态更新**的大语言模型综合能力排行榜，核心设计理念是通过定期更换评测题目来对抗数据污染（data contamination）问题。LiveBench 将评测题目来源与实时互联网内容绑定，确保模型无法通过记忆训练数据中的答案获得高分。

> 注：本页面与 wiki/benchmarks/ 下的 LiveBench.md 描述同一基准，聚焦于其排行榜层面的运营机制。

## 动态更新机制

LiveBench 的反污染策略是其最核心的技术创新：

**题目来源**：从近期发布的新闻、学术论文、数学竞赛、编程竞赛等来源中自动提取或生成题目，确保题目是在大多数模型训练截止日之后产生的。

**定期轮换**：每月或每季度更新部分题目集，淘汰已被广泛测试的旧题，引入新题。这使得排名随时间的变化真实反映模型能力的进步，而非对旧题的记忆程度。

**答案可验证性**：为保持自动评测的可行性，LiveBench 侧重有客观答案的任务（数学、代码、推理），减少开放式主观任务。

## 评测类别

- **数学推理**：来自近期数学竞赛和新题
- **代码生成**：来自近期编程竞赛
- **数据分析**：表格理解和数据处理任务
- **语言能力**：多步推理和语义理解
- **指令跟随**：精确的格式和约束遵循

## 排行榜特点

**优势**：
- 动态更新有效对抗数据污染，排名更真实
- 所有评测自动化且完全开源，结果可复现
- 无需 GPT-4 等外部评判，评测成本相对可控
- 实时追踪最新模型，更新及时

**局限性**：
- 动态更新导致不同时期的排名不完全可比
- 以客观题为主，对开放式生成能力覆盖不足
- 题目更新的周期设置与实际训练数据截止日期的匹配难以完全精准

## 与其他排行榜的关系

LiveBench 与 HELM 均强调系统性评测，但 LiveBench 更聚焦于反污染机制。与 Chatbot Arena 的人类投票机制相比，LiveBench 完全自动化但覆盖范围更窄。两者结合使用可获得更全面的能力评估。

## 访问方式

- 官方排行榜：[livebench.ai](https://livebench.ai/)
- GitHub：[github.com/LiveBench/LiveBench](https://github.com/LiveBench/LiveBench)
- 论文：White et al., "LiveBench: A Challenging, Contamination-Free LLM Benchmark"（arXiv: 2406.19314）
