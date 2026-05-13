---
title: "SWE-bench Leaderboard"
type: leaderboard
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
---

# SWE-bench Leaderboard

> 展示各 Agent 框架在 SWE-bench Verified 上代码修复成功率的排行榜。

## 基本信息

- **关联 benchmark**：SWE-bench Verified（SWE-bench 的人工核实版本）
- **评测任务**：给定真实 GitHub Issue，Agent 需自动定位并修复代码仓库中的 bug
- **评测指标**：成功修复率（Resolved Rate），即通过全部原始测试用例的任务比例

## 背景：SWE-bench 与 SWE-bench Verified

**SWE-bench**：从真实 Python 开源项目（如 Django、scikit-learn 等）中抽取 2,294 个 GitHub Issue，要求 Agent 基于 Issue 描述生成代码补丁。

**SWE-bench Verified**：由人工标注者对原始任务进行核实，过滤了描述不清晰、评测标准有问题的任务，保留更可靠的评测子集。其中约 **5.2% 的任务存在虚假通过问题**（即测试用例通过但修复不正确），这是排行榜分数需要谨慎解读的重要注意事项。

## 排行榜特点

- **Agent 生态晴雨表**：SWE-bench Leaderboard 是衡量代码 Agent 实际能力最直接的公开基准，各主要 Agent 框架（如 SWE-agent、Devin、OpenHands 等）均将成绩作为核心竞争指标。
- **快速进步**：从 2023 年初最强模型约 1-2% 的成功率，到 2025 年部分 Agent 超过 50%，是 AI 能力进步最可见的领域之一。
- **框架多样性**：上榜方法涵盖不同推理策略（单次生成、多次采样、搜索树）、不同工具配置，便于研究框架设计对性能的影响。

## 虚假通过问题

约 5.2% 的 SWE-bench Verified 任务存在虚假通过：Agent 提交的补丁通过了评测脚本，但实际上并未正确修复 Issue（可能是测试用例本身有问题，或补丁绕过了测试而非真正修复了 bug）。这意味着榜单上报告的成功率存在一定程度的高估，需在解读时注意。

## 局限与挑战

- **评测成本高**：运行完整 SWE-bench 需要在多个 Python 环境中执行代码，计算资源消耗大。
- **非确定性**：Agent 行为具有随机性，多次运行结果不同，需运行多次取平均（pass^k）。
- **任务分布偏向**：以 Python 开源项目为主，对其他编程语言和私有代码库的泛化能力未知。
- **排行榜时效性**：顶部成绩更新极快，排名在数月内可能发生大幅变化。

## 相关页面

- [[agent-eval]] — SWE-bench 属于代码 Agent 评测的典型场景
- [[benchmark-contamination]] — 代码 benchmark 的污染检测更复杂
- [[goodharts-law]] — SWE-bench 成为主流后同样面临针对性优化问题
