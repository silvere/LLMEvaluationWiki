---
title: "HumanEval-X"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [code]
language: en
year: 2023
authors: ["Qinkai Zheng", "Xiao Xia", "Xu Zou", "Yuxiao Dong", "Shan Wang", "Yufei Xue", "Zihan Wang", "Lei Shen", "Andi Wang", "Yang Li", "Teng Su", "Zhilin Yang", "Jie Tang"]
arxiv_id: "2303.17568"
official_url: "https://github.com/THUDM/CodeGeeX"
license: "Apache 2.0"
size: 820
format: code
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2303.17568"
  - "https://github.com/THUDM/CodeGeeX"
---

# HumanEval-X

> 由清华大学CodeGeeX团队发布的多语言代码评测基准，将HumanEval扩展至Python、Java、C++、Go、JavaScript五种编程语言，支持代码生成、代码翻译等多类任务。

## 概述

HumanEval-X由Zheng等人于2023年随CodeGeeX论文发布，是对OpenAI原版HumanEval的多语言扩展版本。原版HumanEval仅支持Python，而实际软件开发中需要多种语言的编程能力。HumanEval-X将原版164道题目扩展到5种编程语言的高质量实现，每种语言的题目均通过人工翻译和验证，确保各语言版本的语义一致性。

HumanEval-X支持两类评测任务：
- **代码生成**（Code Generation）：根据函数签名和docstring生成代码，与原版HumanEval相同。
- **代码翻译**（Code Translation）：将一种语言的代码实现翻译为另一种语言，是评测跨语言理解能力的新任务。

数据集为每种语言均提供了完整的函数声明、文档字符串和测试用例，并针对各语言的特性（如Java的类结构、C++的头文件等）进行了适配。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 164 道 × 5 种语言 = 820 个 |
| 编程语言 | Python、Java、C++、Go、JavaScript |
| 评测任务 | 代码生成 / 代码翻译 |
| 评测指标 | pass@1, pass@10, pass@100 |
| 数据来源 | HumanEval 人工多语言扩展 |

## SOTA 表现

| 模型 | Python pass@1 | Java pass@1 | C++ pass@1 |
|------|-------------|------------|-----------|
| GPT-4o | ~90% | ~85% | ~83% |
| CodeGeeX2 | ~71% | ~65% | ~61% |

注：各语言表现差异较大，Go和JavaScript的支持质量因模型而异。

## 主要挑战与局限

- **语言间不一致**：不同语言版本的题目虽经人工翻译，但语言特性差异导致部分题目在某些语言中偏难或偏易。
- **覆盖语言有限**：仅覆盖5种主流语言，Rust、TypeScript、Ruby等未被包含。
- **与原版HumanEval的相关性**：Python结果与HumanEval高度相关，对已有HumanEval结果的额外信息量有限。
- **逐渐饱和**：主流语言（Python、Java）在顶级模型上通过率已较高，区分度下降。
- **代码翻译评测复杂性**：翻译任务的正确性判断依赖目标语言的测试用例，部分细微语义差异难以通过测试覆盖。

## 相关页面

- [[HumanEval]]
- [[MBPP]]
- [[HumanEvalPack]]
- [[BigCodeBench]]
- [[LiveCodeBench]]
