---
title: "代码能力评测（Code Evaluation）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-15"
last_verified: "2026-05-15"
sources: []
aliases:
  - code-evaluation
  - 代码评测
---

# 代码能力评测（Code Evaluation）

> 系统评估大模型代码生成、编辑、调试、理解能力的方法与基准体系。

## 核心评测维度

- **代码生成**：给定自然语言描述生成正确代码（HumanEval、MBPP）
- **代码编辑**：修改已有代码以满足新需求（CodeEditorBench、SWE-bench）
- **代码理解**：解释、摘要、注释代码
- **可视化与交互**：生成可运行的前端代码（ArtifactsBench）
- **真实世界任务**：解决 GitHub issue（SWE-bench）

## 评测方法

主要采用 `pass@k` 指标：运行生成代码对应的单元测试，统计 k 次生成中至少通过一次的比例。
沙箱隔离是 agent 类代码评测的关键基础设施要求。

## 代表性 benchmark

- [[HumanEval]] — 164 题，OpenAI 提出的经典代码生成评测
- [[SWE-bench]] — 真实 GitHub issue 修复任务
- [[LiveCodeBench]] — 动态更新防污染的竞赛题评测
- [[CodeEditorBench]] — 代码编辑四类任务专项评测
- [[ArtifactsBench]] — 视觉交互代码生成评测

## 相关页面

- [[benchmark-design]]
- [[agent-eval|Agent 评测]]
- [[benchmark-saturation]]
