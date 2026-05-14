---
title: "Effibench"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - code
year: 2024
arxiv_id: "2402.02037"
status: active
---

# Effibench

> 评测 LLM 生成高效率（低时间/空间复杂度）代码能力的专项基准。

## 概述

Effibench 是 2024 年提出的代码效率评测基准，填补了代码生成评测领域长期忽视执行效率的空白。HumanEval、MBPP 等主流代码基准仅验证代码功能正确性，而 Effibench 同时评测生成代码的**时间效率**（运行时间）和**空间效率**（内存占用），更贴近真实工程场景中对代码质量的完整要求。

Effibench 包含 1000 个来自 LeetCode 的编程题，这些题目均有明确的时间/空间复杂度优化空间，且存在常见的低效实现模式（如 O(n²) 可优化为 O(n log n)）。对每个题目，Effibench 提供了可执行的测试用例和基于大量提交数据统计的效率基准线（"超越X%提交者"的参考分布）。

Effibench 的核心评测指标是 EER（Expected Efficiency Ratio）——生成代码的实际执行效率与参考最优实现之间的效率比值，同时考虑正确性约束（代码必须通过所有功能测试才计入效率评分）。研究发现，当时的代码 LLM（包括 GPT-4）倾向于生成功能正确但效率较低的代码，在优化效率方面有较大提升空间。

## 任务格式

- **输入**：LeetCode 编程题描述（英文）
- **输出**：Python 代码解决方案
- **规模**：1000 个题目，覆盖数组、动态规划、图算法、字符串等多类算法主题
- **评测执行**：真实执行代码，记录运行时间和内存消耗
- **效率基准**：基于 LeetCode 历史提交分布的百分位参考线

## 主要指标

- **Pass@1**（功能正确率）：一次生成通过所有测试用例的概率
- **EER（Expected Efficiency Ratio）**：生成代码效率与最优解效率的比值（越接近 1.0 越好）
- **Time Percentile**：运行时间在 LeetCode 提交分布中的百分位排名
- **Memory Percentile**：内存使用在 LeetCode 提交分布中的百分位排名

## 局限性

- 执行效率受测试硬件环境影响，跨平台可重复性有一定挑战
- 仅使用 Python，对编译型语言（C++、Java）的效率评测无法直接迁移
- LeetCode 题目偏向算法竞赛风格，与真实工程代码效率优化有差距

## 相关页面

- [[CanItEdit]]
- [[SWE-bench]]
- [[ML-Bench]]
- [[FullStackBench]]
