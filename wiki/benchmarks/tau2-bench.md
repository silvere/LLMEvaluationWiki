---
title: "τ²-Bench"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
aliases:
  - tau2-bench
  - tau-squared-bench
domain:
  - agent
  - dialog
year: 2025
arxiv_id: "2506.07982"
status: active
---

# τ²-Bench

> 由 Sierra Research 发布的 τ-bench 第二代版本，引入电信（Telecom）领域，采用 Dec-POMDP 建模多 agent 协作，评测 AI agent 在双控制域（双向信息不完全）场景下的工具使用和对话推理能力。

## 概述

τ²-Bench（tau-squared-bench，2025，Sierra Research）是 [[tau-bench|τ-bench]] 系列的第二代版本，在原有零售（Retail）和航空（Airline）两个领域基础上新增**电信（Telecom）**场景，并引入更严格的形式化框架——Dec-POMDP（去中心化部分可观测马尔可夫决策过程）。

**相比原版 τ-bench 的主要改进**：

1. **新增电信领域**：电信客服场景覆盖套餐变更、设备故障排查、账单争议处理等任务，工具调用图更复杂
2. **双控制域建模**：用 Dec-POMDP 建模"客户信息对 agent 部分不可见"的现实情况，agent 必须通过对话主动获取信息，而不是假设全知
3. **多轮追踪更严格**：引入任务完成轨迹的精确状态追踪，评估 agent 在 15-30 轮对话中的一致性
4. **错误恢复评测**：专门测试 agent 在中途遇到工具调用失败时的纠错和继续能力

τ²-Bench 的发布揭示了当前 LLM agent 在**真实业务流程**（非实验室合成任务）中的瓶颈：多轮状态跟踪能力远弱于单轮问答，工具依赖链越长则错误累积越明显。

## 任务格式

- **领域覆盖**：零售（Retail）、航空（Airline）、电信（Telecom）三大客服场景
- **任务总量**：数百个用户模拟任务（每轮测试随机采样用户状态）
- **交互方式**：Agent 与用户（LLM 模拟）+ 工具 API 三方交互
- **对话轮次**：平均 15-30 轮，最长可达 50+ 轮
- **评估方式**：任务成功率（Task Success Rate）+ 工具调用准确率

## 主要指标

- **Task Success Rate (TSR)**：agent 完整成功完成用户任务的比率（不接受部分完成）
- **Tool Call Accuracy**：在多轮对话中工具调用参数的准确率
- **Recovery Rate**：遇到工具错误后成功恢复的比率

## 局限性

- 用 LLM 模拟用户存在分布偏差，真实用户行为更多变且非理性
- 三个领域的任务均来自英语场景，对多语言客服评测覆盖不足
- Dec-POMDP 形式化框架的设置假设（信息边界定义）影响评测结论的可推广性

## 相关页面

- [[tau-bench]]
- [[tau3-bench]]
- [[AgentBench]]
- [[TheAgentCompany]]
- [[BFCL]]
