---
title: "xLAM"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - agent
year: 2024
arxiv_id: "2402.15506"
status: active
---

# xLAM

> Salesforce 提出的大型代理模型（Large Action Model）评测与训练框架，专注于工具调用和函数执行代理能力。

## 概述

xLAM（Large Action Models）是 Salesforce AI Research 于 2024 年发布的代理模型评测与训练框架。xLAM 同时包含一套评测基准和一系列经过专门代理任务微调的模型系列（xLAM-1B 至 xLAM-8x22B），重点评测 LLM 在工具调用（Function Calling）、API 调用序列规划和代理决策场景下的能力。

xLAM 评测基准涵盖多个工具调用场景，要求模型根据自然语言任务描述，从工具列表中选择正确工具并生成结构化的调用参数（JSON 格式）。基准特别关注**多步骤工具调用链**的能力——许多实际任务需要按序调用多个工具、处理中间结果、进行动态决策，这对模型的规划和推理能力提出了较高要求。

xLAM 框架整合了多个现有代理评测基准（如 ToolBench、APIBench、BFCL），并新增了专门针对销售、客服等商业场景的工具调用任务，为企业应用场景下的代理能力评测提供了参考。

## 任务格式

- **输入**：自然语言任务描述 + 可用工具列表（含工具名、参数说明、返回值类型）
- **输出**：工具调用序列（JSON 格式，含工具名和参数值）
- **规模**：整合多个基准，共计数千个工具调用任务实例
- **场景**：单轮工具调用 + 多轮工具调用链 + 并行工具调用
- **工具集**：REST API、Python 函数、数据库查询等多类工具

## 主要指标

- **Tool Selection Accuracy**（工具选择准确率）：模型选择正确工具的比例
- **Parameter Accuracy**（参数准确率）：生成的工具调用参数与参考答案的匹配度
- **End-to-End Success Rate**（端到端完成率）：完整工具调用链执行后任务目标达成比例
- 与 GPT-4、Claude 等基线模型的对比排名

## 局限性

- 工具调用评测中的"正确参数"有时存在多种等效表示，精确匹配可能低估模型性能
- 商业场景工具的专有性降低了可复现性
- 主要面向英文工具调用场景，多语言工具调用覆盖不足

## 相关页面

- [[ToolACE]]
- [[AppWorld]]
- [[AgentBench]]
- [[API-Bank]]
