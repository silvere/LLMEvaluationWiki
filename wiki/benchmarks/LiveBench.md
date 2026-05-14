---
title: "LiveBench"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
aliases:
  - livebench
domain:
  - knowledge
  - reasoning
  - math
  - code
year: 2024
arxiv_id: "2406.19314"
status: active
---

# LiveBench

> 由 White Box Technologies 发布的动态防污染综合评测基准，每月从最新竞赛题目、arXiv 论文和新闻事件中自动生成新题目，通过时效性保证测试集从未出现在模型训练数据中。

## 概述

LiveBench（2024）是专门针对**训练数据污染**问题设计的动态评测平台。传统基准（如 MMLU、GSM8K）的题目已被大量模型训练集收录，导致评测分数严重虚高。LiveBench 的核心思路是：**只用比模型训练截止日期更新的题目来评测**，从根本上杜绝直接污染。

LiveBench 每月从以下来源自动采集新题目：
- **数学竞赛**：AMC、AIME、Putnam 等月度竞赛的最新题目
- **arXiv 新论文**：从最新 AI/CS/Math 论文中提取的推理类问题
- **新闻事件**：基于最新时事的知识性问题（考察实时知识而非记忆）
- **代码挑战**：最新 LeetCode 竞赛题和编程挑战

基准的所有答案都可以通过确定性规则自动验证（避免 LLM 裁判的偏差），并在每次更新后清除已发布题目、追加新题目，保持评测的时效性。

LiveBench 是目前学界用于监测模型"真实泛化能力"（而非对训练集的记忆）的少数可靠工具之一，与 [[benchmark-contamination]] 的核心应对思路直接对应。

## 任务格式

- **题目总量**：每月更新，累计 2000+ 题（旧题持续可访问）
- **任务类别**：数学推理、编程、数据分析、语言理解、指令跟随、知识问答
- **评估方式**：规则自动评分（精确匹配 / 代码执行验证），无 LLM 裁判
- **更新频率**：每月一批新题目，旧题目从"当月考核"中移除但保留历史记录
- **访问方式**：公开排行榜 livebench.ai + 本地评测脚本

## 主要指标

- **Global Average**：所有任务类别的平均分，是模型综合排名的核心指标
- **Math Score**：数学竞赛题上的得分（高难度，顶尖模型约 70-80%）
- **Coding Score**：编程任务得分（LeetCode 竞赛难度）
- **Reasoning Score**：复杂推理任务（包含 Hard Reasoning 子集）
- **Data Analysis Score**：表格/图表数据分析得分

## 局限性

- 题目来源集中于数学和代码，语言理解、常识推理覆盖相对有限
- 月更机制下，不同月份的分数直接比较存在题目难度差异
- 实时知识类题目对 API-only 模型（无联网能力）可能不公平

## 相关页面

- [[benchmark-contamination]] — LiveBench 的核心动机
- [[LIFEBENCH]]
- [[LiveCodeBench]]
- [[LiveMathBench]]
- [[MMLU]]
- [[GSM8K]]
