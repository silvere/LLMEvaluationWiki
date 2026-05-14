---
title: "MultiPL-E"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - code
year: 2022
arxiv_id: "2208.08227"
status: active
---

# MultiPL-E

> 将 HumanEval 和 MBPP 的题目机械转译为 18 种编程语言的多语言代码生成基准，用于评测模型的跨语言代码泛化能力。

## 概述

MultiPL-E 由 Cassano 等人于 2022 年发布，核心思路是通过自动化翻译工具将 HumanEval（164 题）和 MBPP（374 题）的 Python 题目逐一转译为 18 种编程语言，包括 JavaScript、TypeScript、Java、C++、C#、PHP、Ruby、Scala、Swift、Rust、Julia、Lua、Racket、D、Bash 等。这一设计让研究者能够在完全控制题目难度和语义内容的前提下，系统评测模型对不同编程语言的掌握程度。

MultiPL-E 发布前，代码生成评测几乎全部集中在 Python（HumanEval、MBPP），而现实工程中大量代码以 Java、C++、JavaScript 等语言编写。MultiPL-E 填补了这一空白，并揭示出模型在 Python 以外语言上的表现普遍存在显著下降——尤其是 Racket、Julia 等低资源语言，下降幅度可达 20-40 个百分点。

评测结果表明，模型的跨语言能力与该语言在预训练语料中的代码比例高度相关，为模型训练数据组成对代码能力影响的研究提供了直接证据。MultiPL-E 被广泛用于 StarCoder、CodeLlama、DeepSeek-Coder 等代码模型的多语言能力评测报告。

## 任务格式

- 格式：代码补全（function completion），与 HumanEval 保持一致
- 数据规模：18 种语言 × (164 + 374) 题 ≈ 9,684 个评测实例
- 每题包含函数签名、文档字符串（docstring）、示例，模型需生成函数体
- 使用对应语言的单元测试执行验证，每题有多组 I/O 测试用例

## 主要指标

- **pass@k**（k=1, 10, 100）：从 k 次采样中至少有一次通过全部测试用例的概率
- 各语言分别报告，可横向比较模型的语言偏好分布

## 局限性

- **题目难度偏低**：继承自 HumanEval/MBPP，题目整体偏简单，头部模型在 Python 上已接近饱和
- **机械转译的语言差异**：自动转译无法完全还原各语言的惯用写法（idiomatic code），某些题目在目标语言中显得不自然
- **低资源语言覆盖不均**：Racket、D 等语言题量虽与其他语言相同，但可参照的训练数据极少，难以公平评估"语言能力"本身

## 相关页面

- [[HumanEval]]
- [[MBPP]]
- [[HumanEval-XL]]
- [[LiveCodeBench]]
- [[BigCodeBench]]
