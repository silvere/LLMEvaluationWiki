---
title: "τ-bench (tau-bench)"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [agent]
language: en
year: 2024
authors: ["Shunyu Yao", "Noah Shinn", "Pedram Razavi", "Karthik Narasimhan"]
arxiv_id: "2406.12045"
official_url: "https://github.com/sierra-research/tau-bench"
license: "MIT"
size: 477
format: open-ended
status: active
saturation_threshold: 0.80
sources:
  - "Yao, S., et al. (2024). τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains. arXiv:2406.12045."
---

# τ-bench（tau-bench）

## 概述

τ-bench（tau-bench）是由 Princeton NLP 和 Sierra Research 于 2024 年提出的工具使用代理评测基准，专注于评测 LLM 代理在**真实 API 调用场景**下的任务完成能力。该基准的核心特色是模拟真实客服/助手场景：代理需要与用户进行自然语言对话，同时调用真实业务 API 完成用户请求，并在两者之间进行准确的状态管理。

## 设计特点

τ-bench 的核心设计理念是**三方交互（Tool-Agent-User Interaction）**：

```
用户（模拟） ←→ LLM 代理 ←→ 工具/API（真实调用）
```

代理需要同时处理：
1. 与用户的多轮自然语言对话（理解需求、澄清信息）
2. 调用正确的 API 完成操作（数据库查询、状态更新等）
3. 管理对话和操作的一致性状态

## 数据域

τ-bench 包含两个真实业务场景：

| 域 | 描述 | 任务数 |
|----|------|--------|
| **零售（Retail）** | 在线零售客服场景，包含订单查询、退换货、账户管理等 | ~477 |
| **航空（Airline）** | 航空公司客服场景，包含改签、退票、座位选择等 | ~在扩展中 |

每个场景都有对应的数据库状态、API 规范和用户模拟器。

## 评测方法

τ-bench 采用**程序化评测 + 用户模拟器**的组合方案：

1. **用户模拟器**：使用 LLM 模拟用户，根据预定义的用户意图生成真实对话回应
2. **动作验证**：通过检查 API 调用序列和最终数据库状态来判断任务是否正确完成
3. **pass@k 指标**：类似代码评测，通过多次独立运行评测稳定性（pass@1、pass@5）

## 挑战特性

τ-bench 揭示了当前 LLM 代理的关键弱点：

1. **策略遵从**：代理需要遵守明确定义的业务规则（如退货政策），违规操作会导致失败
2. **不确定性处理**：用户提供信息不完整时，代理需要主动澄清而非猜测
3. **多轮一致性**：在长对话中维持操作状态的一致性，避免重复操作或状态混乱
4. **错误恢复**：在操作失败后正确响应错误信息并调整策略

## 典型表现

在 Retail 任务上（pass@1）：

| 模型 | pass@1 |
|------|--------|
| GPT-4o | ~50% |
| Claude 3.5 Sonnet | ~55% |
| GPT-3.5 | ~20% |
| 开源模型（7B） | ~5-15% |

## 与其他代理基准的区别

τ-bench 与 WebArena、AgentBench 等基准的主要区别在于：
- 专注于**真实业务场景**而非通用任务
- 强调**用户交互质量**而非单纯任务完成率
- 使用**真实 API 规范**（包含参数约束、错误码等），评测更接近生产环境

## 局限性

- 目前覆盖场景有限（主要是客服场景）
- 用户模拟器的真实性对评测结果有较大影响
- 评测成本较高（每次测试需要多轮对话交互）

## 相关基准

- **ToolBench**：更广泛的 API 工具调用评测
- **AgentBench**：多任务综合代理评测
- **GAIA**：真实世界任务助手评测
