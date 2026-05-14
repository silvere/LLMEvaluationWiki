---
title: "BigCodeBench Leaderboard"
type: leaderboard
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# BigCodeBench Leaderboard

## 概述

BigCodeBench Leaderboard 由 BigCode 项目维护，基于 BigCodeBench 评测框架，专注于衡量大语言模型在**复杂代码生成任务**上的能力。相较于 HumanEval 等早期代码基准，BigCodeBench 强调多库调用、API 综合使用能力，更接近真实软件开发场景。

## 核心评测框架

BigCodeBench 包含超过 1,100 个编程任务，每个任务需要调用多个 Python 标准库或第三方库（如 NumPy、Pandas、Requests 等）。评测通过**执行准确率（pass@k）**衡量模型表现，即模型生成的代码能否通过预定义测试用例。

评测集分为两个版本：
- **BigCodeBench-Complete**：给定函数签名和文档字符串，要求模型补全函数体
- **BigCodeBench-Instruct**：将编程任务转化为自然语言指令，要求模型从零生成完整代码

## 排行榜特点

**优势**：
- 任务复杂度高，能有效区分不同层级的代码能力
- 多库调用测试反映了真实开发中的代码组合能力
- 提供开放的评测代码，结果可复现
- 同时收录开源和闭源模型，对比维度全面

**局限性**：
- 仅评测 Python，不覆盖其他编程语言
- 执行环境的配置差异可能影响评测一致性
- 部分任务依赖特定库版本，存在兼容性问题
- 与 HumanEval+ 等基准相比，任务数量更多但更新频率较低

## 与其他代码评测排行榜的关系

BigCodeBench 与 EvalPlus（HumanEval+/MBPP+）互补：EvalPlus 提供经过扩充测试用例的标准基准，适合快速评测；BigCodeBench 提供更复杂的多步骤编程任务，适合评测高阶代码能力。Aider Leaderboard 则侧重代码编辑和修改场景，三者共同构成代码能力评测的主要参考。

## 访问方式

- 官方排行榜：[bigcode-bench.github.io](https://bigcode-bench.github.io/)
- GitHub：[github.com/bigcode-project/bigcodebench](https://github.com/bigcode-project/bigcodebench)
- HuggingFace：bigcode/bigcodebench
- 论文：Zhuo et al., "BigCodeBench: Benchmarking Code Generation with Diverse Function Calls and Complex Instructions"（arXiv: 2406.15877）
