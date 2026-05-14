---
title: "HumanEval-XL"
aliases:
  - HumanEval-XL
  - MultiPL-HumanEval-XL
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - code
  - multilingual
year: 2024
arxiv_id: ""
status: active
---

# HumanEval-XL

> 2024 年发布的多语言代码生成基准，在 HumanEval 基础上扩展至多种编程语言，注重题目的跨语言对齐质量，区别于早期的 HumanEval-X（CodeGeeX，2022）。

## 概述

HumanEval-XL 于 2024 年发布，是对 HumanEval 框架在多编程语言上的扩展版本，重点关注翻译/改写质量和语言习惯用法（idiomatic code）的保留。与 MultiPL-E（2022 年的机械转译方案）不同，HumanEval-XL 在多语言题目构建上投入了更多的人工校验，确保各语言版本题目的语义对齐性和自然性。

需要特别注意命名歧义：HumanEval-XL 不同于 HumanEval-X。**HumanEval-X** 是 CodeGeeX 团队于 2022 年发布的多语言代码基准（覆盖 Python、C++、Java、JavaScript、Go），属于另一个独立项目。两者均是 HumanEval 的多语言扩展，但来自不同团队、不同年份，评测设计也有所差异。

HumanEval-XL 覆盖的编程语言包括主流语言如 Python、JavaScript、Java、C++、Go、Rust 等，并针对各语言的类型系统、标准库和编程惯例进行了本地化适配，使评测结果更能反映模型对各语言"native"代码风格的理解。

## 任务格式

- 格式：代码补全（function completion），与 HumanEval 框架兼容
- 编程语言：多种主流语言（Python、JavaScript、Java、C++、Go、Rust 等）
- 测试方式：执行语言对应的测试用例，pass@k 验证
- 语言：英文题目描述

## 主要指标

- **pass@1**：单次采样通过全部测试用例的概率
- 各编程语言分别报告，可与 MultiPL-E 的同语言结果对比

## 局限性

- **与 HumanEval-X 命名混淆**：两者名称相似但来自不同团队，引用时需注意区分
- **继承 HumanEval 难度局限**：基础题目难度偏低，顶级模型在 Python 上已趋近饱和
- **发布时间较新**：社区复现和对比评测案例相对有限

## 相关页面

- [[HumanEval]]
- [[MultiPL-E]]
- [[MBPP]]
- [[LiveCodeBench]]
- [[BigCodeBench]]
