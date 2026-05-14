---
title: "Nestful"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - agent
  - reasoning
year: 2024
arxiv_id: "2409.03797"
status: active
---

# Nestful

> IBM Research 发布的嵌套 API 调用序列评测基准，包含 1,800+ 可执行嵌套函数调用序列，专门测试 LLM 处理"将一个函数调用的输出作为另一函数输入"这类真实 Agent 工具链模式的能力，EMNLP 2025 收录。

## 概述

Nestful（官方写作 NESTFUL）于 2024 年 9 月发布，由 IBM Research 与佐治亚理工学院研究团队联合完成，并于 2025 年被 EMNLP 收录。该基准聚焦于一个在真实 Agent 系统中普遍存在但此前被严重忽视的能力：嵌套函数调用（nested function call）——即将一个 API 调用的返回值直接传递给另一个 API 调用作为输入参数，形成调用链。

在实际的 AI Agent 工具链中，嵌套调用是极为常见的操作模式。例如，为了完成"获取伦敦明天天气并发送邮件给团队"这一任务，Agent 需要先调用 `get_city_coordinates("London")` 获取坐标，再将坐标传入 `get_weather(lat, lon, date=tomorrow)` 获取天气，最后将天气结果嵌套进 `send_email(recipients=team, content=weather_result)` 完成发送——整个流程是一个多层嵌套的调用序列。

然而，现有大多数工具调用评测基准（如 BFCL）主要关注单步或多步但独立的 API 调用能力，无法评测这种"输出即输入"的嵌套依赖关系。Nestful 正是为填补这一空白而设计。

数据集包含 1,861 条可执行的嵌套调用序列，分为两类：来自 SGD（Schema-Guided Dialogue）和 GLAIVE 数据集的非可执行序列（经人工标注筛选），以及研究团队通过 LLM 辅助合成并人工审核的可执行序列。每条样本包括用户请求、可用函数库（含参数描述）和期望的嵌套调用序列。评测采用直接提示（Direct Prompting）和 ReAct 两种策略，使用 F1 Intent、F1 Slot、局部匹配准确率（Partial Match Accuracy）和完全匹配准确率（Full Match Accuracy）等多维指标全面评测。

## 任务格式

- **序列总量**：1,861 条嵌套调用序列（评测集）
- **嵌套类型**：单层嵌套（一层函数依赖）和多层嵌套（多级依赖链）
- **输入内容**：用户请求文本 + 可用函数库（含名称、参数、类型和描述）
- **输出目标**：完整的嵌套函数调用序列，包含正确的参数传递关系
- **评估策略**：Direct Prompting（直接提示）和 ReAct（推理+行动）双策略
- **可执行性**：所有评测序列均可实际执行，支持端到端验证

## 主要指标

- **完全匹配准确率（Full Match Accuracy）**：预测的完整嵌套调用序列与标准答案完全一致的比例，最严格指标
- **局部匹配准确率（Partial Match Accuracy）**：嵌套结构部分正确的宽松评测
- **F1 Intent**：函数名称预测的 F1 分数（不考虑参数）
- **F1 Slot**：函数参数预测的 F1 分数（包含嵌套参数依赖）

## 局限性

- 数据集规模约 1,861 条，覆盖的函数域和嵌套深度有限，难以全面代表真实 Agent 工具链的多样性
- 可执行序列的生成依赖 LLM 辅助合成，可能存在系统性偏差
- 当前评测主要覆盖英语场景，多语言工具调用能力未纳入评测范围

## 相关页面

- [[BFCL]]
- [[API-Bank]]
- [[ToolBench]]
- [[ToolACE]]
- [[AgentBench]]
- [[xLAM]]
