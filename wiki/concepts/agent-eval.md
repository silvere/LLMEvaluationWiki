---
title: "Agent 评测"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
---

# Agent 评测

> 评测 AI Agent 在多步骤、工具调用、真实环境任务中的完成能力。

## 定义

Agent 评测是指评估 AI 系统在需要规划、决策、工具使用和多轮交互的任务上的表现。与单次问答不同，Agent 任务通常包含：向外部环境（浏览器、代码执行器、文件系统等）发出动作、根据环境反馈调整策略、在多步骤序列中完成目标。

## 重要性（在 LLM 评测中）

随着 LLM 从"聊天机器人"向"能干活的 Agent"演进，Agent 评测成为衡量模型实际用途最直接的方式。代码修复（SWE-bench）、网页浏览（WebArena）、操作系统控制（OSWorld）等 benchmark 已成为衡量前沿模型实用价值的核心指标。截至 2025 年，相关 benchmark 已超过 50 个，但标准化程度仍然很低，结果跨研究难以比较。

## 主要方法/实现

**主要 Benchmark：**
- **SWE-bench / SWE-bench Verified**：给定 GitHub Issue，要求 Agent 自动修复代码。Verified 版本经人工核实，排除了约 5.2% 的虚假通过任务。
- **WebArena**：在真实网页环境中完成购物、信息查找等任务。
- **OSWorld**：在真实操作系统界面中执行用户指令。
- **τ-bench**：评测 Agent 在工具调用和 API 交互场景中的表现。
- **GAIA**：通用 AI Assistant 基准，测试综合信息检索和推理能力。

**评测指标：**
- **任务完成率**：最常用指标，但对部分完成缺乏区分度。
- **pass^k**：运行 k 次，至少通过一次算成功；衡量模型的最大潜力而非平均表现。
- **工具调用效率**：完成任务所需的工具调用次数、token 消耗。

## 局限与挑战

- **非确定性**：相同任务多次运行结果不同，需要多次运行取平均，成本高。
- **长期信用分配**：多步骤序列中难以判断哪一步的决策导致了最终失败。
- **工具/环境可变性**：外部 API、网页结构随时间变化，评测结果时效性短。
- **虚假通过**：SWE-bench 中 5.2% 的任务存在虚假通过问题，高估了实际修复率。
- **标准化缺失**：超过 50 个 benchmark 之间缺乏统一的任务格式、评分标准和难度分级。

## 相关页面

- [[chain-of-thought]] — Agent 推理的核心机制
- [[process-reward-model]] — Agent 长序列任务的过程评估
- [[SWE-bench-Leaderboard]] — 代码 Agent 评测的标志性排行榜
