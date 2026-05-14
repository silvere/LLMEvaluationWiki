---
title: "EvalPerf"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [code, efficiency]
language: en
year: 2024
authors: ["Yuhan Du", "Pinzhen Chen", "Ionut-Teodor Sorodoc", "Barry Haddow", "Alexandra Birch"]
arxiv_id: ""
official_url: ""
license: ""
size: 0
format: code
status: active
saturation_threshold: 0.90
sources: []
---

# EvalPerf

> 专注于评测代码执行效率而非正确性的代码基准，要求模型生成不仅功能正确、还能高效运行的代码，填补了代码评测在性能维度上的空白。

## 概述

EvalPerf由Du等人于2024年发布，其设计理念与HumanEval、MBPP等功能正确性导向的基准有本质区别：EvalPerf的核心评测维度是代码的**执行效率**，即模型生成的代码在时间复杂度和实际运行速度上的表现。

研究发现，即使在功能正确性基准上表现优秀的大语言模型，也往往倾向于生成低效的代码（如使用O(n²)的暴力解法而非O(n log n)的高效算法）。EvalPerf通过实际运行生成的代码并测量执行时间，提供了一个功能测评之外的新评测维度。

评测时，EvalPerf将模型生成代码的执行时间与参考实现进行对比，计算效率得分（Performance Score），而非简单的通过/失败判断。

## 规格

| 属性 | 值 |
|------|-----|
| 评测维度 | 代码执行效率（时间性能） |
| 编程语言 | Python |
| 评测指标 | 执行时间比（相对于参考实现） |
| 评测方式 | 实际代码执行计时 |

注：EvalPerf的详细规格（题量、来源等）暂未查证到可靠数据，以上为确定信息。

## SOTA 表现

暂无可靠的公开排行榜数据。

## 主要挑战与局限

- **执行环境一致性**：代码执行时间受硬件环境、系统负载等因素影响，测量结果的可重复性存在挑战。
- **Python的局限性**：Python本身性能较低，部分效率差异可能被语言特性掩盖。
- **功能与效率的权衡**：高效代码有时需要更复杂的实现，模型可能倾向于牺牲效率换取实现简单。
- **参考实现的质量**：效率评分依赖参考实现的质量，如果参考实现本身不够优化，结果会失去参考价值。
- **信息有限**：EvalPerf目前学术曝光度相对有限，相关信息暂时不充分。

## 相关页面

- [[HumanEval]]
- [[MBPP]]
- [[BigCodeBench]]
- [[LiveCodeBench]]
