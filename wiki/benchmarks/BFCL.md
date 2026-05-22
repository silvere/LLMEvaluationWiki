---
title: BFCL
type: benchmark
publish: true
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- agent
- code
year: 2024
arxiv_id: '2407.09203'
status: active
dimension: H
sota:
- score: 97.8%
  model: GPT-5
  harness: null
  with_tools: true
  date: 2025-09
  source: https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html
  notes: BFCL v3 overall accuracy
- score: 96.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: true
  date: 2026-04
  source: https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html
  notes: BFCL v3 overall accuracy
- score: 95.8%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: true
  date: 2026-03
  source: https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html
  notes: BFCL v3 overall accuracy
- score: 94.6%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: true
  date: 2026-02
  source: https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html
  notes: BFCL v3 overall accuracy
- score: 90.0%
  model: GPT-4o
  harness: null
  with_tools: true
  date: 2024-05
  source: https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html
  notes: BFCL v3, 2024 baseline
---

# BFCL

> Berkeley Function Calling Leaderboard（伯克利函数调用排行榜），系统评测大语言模型调用外部 API 和工具函数的准确性、格式合规性和参数填充能力。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🔧 with | 97.8% | BFCL v3 overall accuracy | 2025-09 | [link](https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html) |
| 🥈 | [[Claude-Opus-4.7]] | 🔧 with | 96.5% | BFCL v3 overall accuracy | 2026-04 | [link](https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html) |
| 🥉 | [[Gemini-3.1-Pro]] | 🔧 with | 95.8% | BFCL v3 overall accuracy | 2026-03 | [link](https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html) |
| 4 | [[DeepSeek-V4-Pro]] | 🔧 with | 94.6% | BFCL v3 overall accuracy | 2026-02 | [link](https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html) |
| 5 | [[GPT-4o]] | 🔧 with | 90.0% | BFCL v3, 2024 baseline | 2024-05 | [link](https://gorilla.cs.berkeley.edu/blogs/8_berkeley_function_calling_leaderboard.html) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2407.09203](https://arxiv.org/abs/2407.09203)

<!-- AUTO-LINKS:END -->

## 概述

BFCL（Berkeley Function Calling Leaderboard）由加州大学伯克利分校于 2024 年发布，是目前最权威的 LLM **函数调用（Function Calling / Tool Use）**能力评测平台。随着 OpenAI 函数调用 API、Anthropic 工具使用等特性的普及，如何准确评测模型调用工具的能力成为迫切需求。

BFCL 系统化定义了函数调用的多个难度维度：
1. **Simple Function Call**：单个函数、参数明确，直接调用
2. **Multiple Function Call**：需要依次调用多个函数完成任务
3. **Parallel Function Call**：需要同时（并行）调用多个独立函数
4. **Parallel Multiple Function Call**：并行调用多个序列（最高复杂度）
5. **Relevance Detection**：判断是否需要调用函数（避免不必要的工具调用）
6. **Executable Function Call**：验证调用结果是否可在真实 API 上执行

基准支持多编程语言格式（Python、Java、JavaScript、SQL、REST API），反映真实应用的多样性。BFCL 以动态排行榜形式持续更新，是工业界选型工具使用模型的重要参考。

## 任务格式

- **题目总量**：2000+ 个函数调用场景（持续扩展）
- **API 类型**：Python 函数、REST API、SQL、Java/JavaScript SDK
- **复杂度类型**：Simple / Multiple / Parallel / Parallel Multiple / Relevance Detection
- **评估方式**：AST（抽象语法树）解析验证参数格式和类型 + 真实 API 执行验证
- **语言格式**：JSON 函数调用格式（兼容 OpenAI/Anthropic 标准）
- **更新频率**：每月更新新题目和新模型排名

## 主要指标

- **Overall Accuracy**：所有场景的综合函数调用正确率
- **Simple Function Call Accuracy**：基础单函数调用准确率
- **Parallel Function Call Accuracy**：并行函数调用准确率
- **Relevance Detection Accuracy**：正确判断是否需要调用函数的比例
- **Executable Rate**：生成的函数调用能在真实 API 成功执行的比例

## 局限性

- 动态排行榜的题目持续变化，不同时间点的分数横向比较需谨慎
- 评测主要覆盖格式正确性，对函数调用背后的语义理解能力评估不足
- 基准函数库的领域分布（以信息检索、日历、天气等常见 API 为主）可能不代表所有垂直行业

## 相关页面

- [[API-Bank]]
- [[AgentBench]]
- [[TheAgentCompany]]
- [[ToolBench]]
