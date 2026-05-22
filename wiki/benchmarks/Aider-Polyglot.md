---
title: Aider Polyglot
type: benchmark
publish: true
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- code
year: 2024
arxiv_id: ''
status: active
dimension: H
sota:
- score: 76.8%
  model: Claude-Opus-4.7
  harness: Aider
  with_tools: true
  date: 2026-04
  source: https://aider.chat/docs/leaderboards/
  notes: percent correct on polyglot benchmark
- score: 75.2%
  model: GPT-5
  harness: Aider
  with_tools: true
  date: 2025-09
  source: https://aider.chat/docs/leaderboards/
  notes: percent correct on polyglot benchmark
- score: 72.5%
  model: Gemini-3.1-Pro
  harness: Aider
  with_tools: true
  date: 2026-03
  source: https://aider.chat/docs/leaderboards/
  notes: percent correct on polyglot benchmark
- score: 71.8%
  model: Claude-Sonnet-4.6
  harness: Aider
  with_tools: true
  date: 2026-02
  source: https://aider.chat/docs/leaderboards/
  notes: percent correct on polyglot benchmark
- score: 70.8%
  model: DeepSeek-V4-Pro
  harness: Aider
  with_tools: true
  date: 2026-02
  source: https://aider.chat/docs/leaderboards/
  notes: percent correct on polyglot benchmark
---

# Aider Polyglot

> Aider 代码编辑工具发布的多编程语言代码编辑评测基准，测试模型对不同语言代码库的编辑能力。

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Harness | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|---|
| 🥇 | [[Claude-Opus-4.7]] | [[Aider]] | 🔧 with | 76.8% | percent correct on polyglot benchmark | 2026-04 | [link](https://aider.chat/docs/leaderboards/) |
| 🥈 | [[GPT-5]] | [[Aider]] | 🔧 with | 75.2% | percent correct on polyglot benchmark | 2025-09 | [link](https://aider.chat/docs/leaderboards/) |
| 🥉 | [[Gemini-3.1-Pro]] | [[Aider]] | 🔧 with | 72.5% | percent correct on polyglot benchmark | 2026-03 | [link](https://aider.chat/docs/leaderboards/) |
| 4 | [[Claude-Sonnet-4.6]] | [[Aider]] | 🔧 with | 71.8% | percent correct on polyglot benchmark | 2026-02 | [link](https://aider.chat/docs/leaderboards/) |
| 5 | [[DeepSeek-V4-Pro]] | [[Aider]] | 🔧 with | 70.8% | percent correct on polyglot benchmark | 2026-02 | [link](https://aider.chat/docs/leaderboards/) |

<!-- AUTO-SOTA:END -->

## 概述

Aider Polyglot 由 Aider（AI 辅助代码编辑工具）团队于 2024 年发布，是 Aider 代码编辑排行榜（Aider LLM Leaderboard）中的核心评测任务之一。该基准通过一系列真实代码编辑任务，测试语言模型在多种编程语言（Python、JavaScript、TypeScript、Rust、Go、Java、C++ 等）代码库中的实际编辑性能。

与纯代码生成基准（如 HumanEval）不同，Aider Polyglot 专注于**代码编辑场景**：给定已有代码库和自然语言修改指令，模型需要生成精确的代码差异（diff），正确修改现有代码。这更贴近开发者日常使用 AI 助手的实际场景。

Aider Polyglot 采用**通过测试套件**（pass@tests）的方式评估，要求模型修改后的代码通过所有相关单元测试，而非仅评估语法正确性，因此对代码理解和编辑精确性要求较高。

## 任务格式

- 多种编程语言（Python、JavaScript、TypeScript、Rust、Go、Java、C++ 等）
- 每个任务：给定代码库 + 自然语言编辑指令，要求输出正确的代码修改
- 评分：修改后代码通过测试套件（pass@tests）
- 通过 Aider 工具框架评估，结果发布于官方排行榜

## 主要指标

- **Pass Rate（通过率）**：修改后代码通过全部测试的任务比例，主要指标
- 按编程语言分项报告

## 局限性

- 评测依赖 Aider 工具框架，不同模型的代码格式输出可能影响 diff 解析，存在非能力因素干扰。
- 测试任务由 Aider 团队内部构建，数据集未完全开放，独立验证受限。
- 以通过测试套件为准的评分方式可能遗漏"测试覆盖不足但实际正确"的修改。

## 相关页面

- [[HumanEval]]
- [[SWE-bench]]
- [[MBPP]]
