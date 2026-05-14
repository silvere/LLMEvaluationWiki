---
title: "工具使用评测（Tool Use Evaluation）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 工具使用评测（Tool Use Evaluation）

> 评测 LLM 能否正确调用外部工具（函数、API、代码执行环境）来解决任务的能力评测方法，是 Agent 能力评测的核心组成部分。

## 定义

工具使用（Tool Use，也称 Function Calling）是指 LLM 在处理用户请求时，识别需要调用外部工具的时机，生成符合工具接口规范的调用参数，并整合工具返回结果生成最终回答。

工具使用的完整评测维度：
1. **工具选择**：从多个工具中选择正确工具（或决定不调用工具）
2. **参数生成**：生成结构正确、参数值准确的调用请求
3. **结果利用**：正确理解并整合工具返回的结果
4. **多步工具调用**：在需要时按正确顺序调用多个工具
5. **错误处理**：工具调用失败时的恰当处理行为

## 重要性（在 LLM 评测中）

工具使用能力是 LLM Agent 实用性的基础，已成为独立的评测维度：

1. **Agent 能力的核心**：GPT-4 Turbo、Claude 3 等模型的 function calling 能力是商业应用的核心功能
2. **超越纯语言的能力边界**：工具使用使 LLM 可以执行代码、查询数据库、调用 API，评测需覆盖这些扩展能力
3. **误差来源定位**：Agent 任务失败可能来自工具选择错误、参数生成错误或结果理解错误，需分层评测
4. **安全性维度**：LLM 选择错误工具或生成恶意参数（prompt injection via tool results）的风险

## 主要方法/实现

**评测基准**：
- **ToolBench**（Qin et al., 2023）：16000+ 真实 API 的工具使用基准
- **ToolEval**：从 ToolBench 衍生，标准化评测协议
- **BFCL**（Berkeley Function-Calling Leaderboard）：聚焦结构化函数调用的专项基准
- **API-Bank**：多步 API 调用能力评测

**评测指标**：
```python
# 工具选择准确率
tool_acc = sum(predicted_tool == gold_tool for ...) / total

# 参数精确匹配率（或部分匹配的 F1）
param_em = sum(predicted_params == gold_params for ...) / total

# 端到端任务完成率（最终答案正确）
task_success = sum(final_answer_correct) / total
```

**格式评测**：检查生成的 JSON 参数是否结构合法（schema 验证），独立于参数值是否正确。

**多步 Agent 评测**：通过追踪完整工具调用轨迹（trajectory），评测中间步骤的正确性。

## 局限与挑战

- **工具 schema 设计偏差**：工具接口设计质量影响评测结果，设计不佳的工具即使模型理解正确也难以调用成功
- **动态环境评测**：实际工具调用结果是动态的，难以在静态基准中完整复现
- **多轮决策评测**：单次工具调用评测无法覆盖复杂的多轮 Agent 决策场景
- **结果依赖性**：评测标准假设工具调用的"正确"参数是确定的，但许多任务有多种有效调用方式
- **提示格式依赖**：不同模型的函数调用接口（OpenAI format、XML format 等）不标准化，跨模型比较困难

## 相关页面

- [[pass-at-k]] — 代码生成评测的相关方法
- [[retrieval-augmented-generation-eval]] — RAG 作为特殊工具使用场景
- [[multi-turn-eval]] — 多轮 Agent 对话评测
- [[chain-of-thought-eval]] — 工具使用中的推理链评测
- [[adversarial-robustness]] — 工具调用中的安全风险
