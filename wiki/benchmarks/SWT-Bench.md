---
title: "SWT-Bench"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - code
year: 2024
arxiv_id: "2406.12952"
status: active
---

# SWT-Bench

> 评测 LLM 为真实 GitHub Issue 编写有效测试用例（而非直接修复）能力的代码基准。

## 概述

SWT-Bench（Software Testing Benchmark）是 2024 年提出的代码测试生成评测基准，与 SWE-Bench 关注代码修复不同，SWT-Bench 专注于评测 LLM 能否为真实的 GitHub Issue 编写能够**复现 Bug 的测试用例**。这一任务反映了软件开发中"测试先行"（Test-Driven Development）的最佳实践——在修复 Bug 前，先编写能够暴露问题的测试。

SWT-Bench 从 GitHub 上的真实开源项目中收集 Issue 和对应的修复 PR，要求模型仅根据 Issue 描述和代码库上下文，生成能在修复前失败、修复后通过的测试用例（即"验证性测试"）。这一任务分离了测试理解能力与代码修复能力，为评测模型的软件测试能力提供了独立视角。

SWT-Bench 基于与 SWE-Bench 相同的数据源构建，包含来自 Python 主流开源库（Django、Flask、Pandas、NumPy 等）的真实 Issue，共计数百个测试样本，确保与 SWE-Bench 的可比性。

## 任务格式

- **输入**：GitHub Issue 自然语言描述 + 相关代码仓库上下文
- **输出**：Python 测试用例（应在 Bug 修复前失败，修复后通过）
- **规模**：数百个来自 Python 开源库的真实 Issue（与 SWE-Bench 数据对齐）
- **评测执行**：在真实项目环境中运行生成的测试，检验其在有 Bug 和无 Bug 两种版本下的通过情况

## 主要指标

- **Test Correctness Rate**：生成的测试在修复后版本中通过的比例（测试有效性）
- **Bug Detection Rate**：生成的测试能够在 Bug 版本中失败的比例（Bug 复现能力）
- **Complete Rate**：同时满足"修复后通过"和"修复前失败"的完整测试比例
- 按项目类别（Web 框架/数据科学/工具库）分类报告

## 局限性

- 仅覆盖 Python 生态，其他语言（Java、JavaScript 等）的测试生成能力无法评测
- 测试用例的"有效性"判断依赖真实执行环境，配置复杂
- Issue 描述质量参差不齐，部分 Issue 信息不足以生成精准测试

## 相关页面

- [[SWE-bench]]
- [[CanItEdit]]
- [[Effibench]]
- [[FullStackBench]]
