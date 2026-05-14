---
title: "Aider Leaderboard"
type: leaderboard
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Aider Leaderboard

## 概述

Aider Leaderboard 由开源代码助手工具 Aider 的开发团队维护，基于**真实代码编辑任务**评测大语言模型的代码助手实际使用能力。该排行榜的独特价值在于：它不是评测模型的代码补全或算法题解能力，而是评测模型在"代码助手"场景下的实际效用——即在给定真实代码库的情况下，根据自然语言指令修改代码并通过测试的能力。

## 核心基准

Aider 使用两个主要评测基准：

**polyglot（多语言代码编辑）**：
- 涵盖多种编程语言（Python、JavaScript、TypeScript、Go、Rust 等）
- 任务为在真实代码库中完成指定修改并通过现有测试
- 更接近软件工程师的实际工作场景

**SWE-bench Verified**：
- 使用经过人工验证的 SWE-bench 子集
- 评测模型解决真实 GitHub Issue 的能力

## 评测方式

Aider Leaderboard 使用两种 Aider 工作模式分别评测：
- **Diff 格式**：模型以 unified diff 格式输出代码修改
- **Whole 格式**：模型直接输出完整修改后的文件内容

每个模型在两种模式下分别评测，取最佳结果。

## 排行榜特点

**优势**：
- 最接近真实代码助手使用场景的评测
- 覆盖多种编程语言，不局限于 Python
- 任务基于真实代码库，包含复杂的上下文依赖
- 评测代码开源，结果可复现

**局限性**：
- 评测成本较高（需要实际执行代码并运行测试）
- Aider 本身的工具使用方式可能偏向某些模型的格式输出风格
- 不覆盖代码生成（从零开始）的能力
- 数据集会随时间更新，历史排名可能不完全可比

## 与其他代码排行榜的关系

Aider Leaderboard 与 SWE-bench Leaderboard 在目标上有重叠（都评测真实代码库任务），但前者更注重"AI代码助手工具"的整体可用性，后者更聚焦于 Bug 修复的精确度。BigCodeBench 和 EvalPlus 侧重算法代码生成能力，与 Aider 评测的工程代码编辑能力相互补充。

## 访问方式

- 官方排行榜：[aider.chat/docs/leaderboards](https://aider.chat/docs/leaderboards/)
- GitHub：[github.com/paul-gauthier/aider](https://github.com/paul-gauthier/aider)
