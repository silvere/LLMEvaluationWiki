---
title: "CRUXEval"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [code, reasoning]
language: en
year: 2024
authors: ["Alex Gu", "Baptiste Rozière", "Hugh Leather", "Armando Solar-Lezama", "Gabriel Synnaeve", "Sida I. Wang"]
arxiv_id: "2401.03065"
official_url: "https://github.com/facebookresearch/cruxeval"
license: "CC BY-NC 4.0"
size: 800
format: code
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2401.03065"
  - "https://github.com/facebookresearch/cruxeval"
---

# CRUXEval (Code Reasoning, Understanding, and eXecution Evaluation)

> 包含800道Python函数题，分为输入预测（CRUXEval-I）和输出预测（CRUXEval-O）两个子任务，评测模型对代码执行过程的推理理解能力。

## 概述

CRUXEval由Gu等人于2024年发布，旨在评测语言模型的代码推理与执行理解能力，而非单纯的代码生成能力。其核心思路是：给定一个Python函数，要求模型在不实际执行代码的情况下，通过推理预测函数的输入或输出。

CRUXEval包含两个子任务：
- **CRUXEval-I（输入预测）**：给定函数代码和期望输出，预测能产生该输出的输入值。
- **CRUXEval-O（输出预测）**：给定函数代码和输入值，预测函数的执行输出。

题目由代码模型生成后经过筛选，确保题目格式规范且评测结果可靠。CRUXEval填补了评测体系中"代码理解"与"代码推理"维度的空缺，与代码生成评测形成互补。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 800 道（输入预测400 + 输出预测400） |
| 编程语言 | Python |
| 子任务 | CRUXEval-I（输入预测）、CRUXEval-O（输出预测） |
| 评测方式 | 精确匹配（exact match） |
| 题目生成方式 | 代码模型生成 + 人工筛选 |
| 函数复杂度 | 中等，平均约7行 |

## SOTA 表现

| 模型 | CRUXEval-I pass@1 | CRUXEval-O pass@1 |
|------|-------------------|-------------------|
| GPT-4o | ~75% | ~80% |
| GPT-4（2024初） | ~50% | ~55% |
| CodeLlama-34B | ~33% | ~36% |

## 主要挑战与局限

- **推理链复杂**：对于包含递归、复杂数据结构操作的函数，模型需要在脑中模拟多步执行，容易出错。
- **输入预测难度更高**：CRUXEval-I要求逆向推理，比输出预测更难，模型在该子任务上表现普遍较弱。
- **题目来源单一**：题目由代码模型生成，可能与模型训练数据存在分布重叠。
- **覆盖范围有限**：800道题目规模适中，但对某些特殊编程模式（如异步、多线程等）覆盖不足。
- **仅限Python**：不覆盖其他编程语言，限制了评测的泛化性。

## 相关页面

- [[HumanEval]]
- [[MBPP]]
- [[LiveCodeBench]]
- [[BigCodeBench]]
