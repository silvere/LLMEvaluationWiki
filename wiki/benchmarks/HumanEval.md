---
title: "HumanEval"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
domain: [code]
language: en
year: 2021
authors: ["Chen et al."]
arxiv_id: "2107.03374"
official_url: "https://github.com/openai/human-eval"
license: "MIT"
size: 164
format: code
status: saturated
saturation_threshold: 0.95
sources: [""]
---

# HumanEval（含 HumanEval+）

> OpenAI 于 2021 年发布的函数级 Python 编程评测基准，2024 年后顶级模型准确率已超过 93%，完全饱和。

## 概述

HumanEval 由 OpenAI 的 Chen 等人于 2021 年随 Codex 模型一同发布，是最早被广泛采用的代码生成评测基准之一。数据集包含 164 个 Python 函数级编程任务，每道题给出函数签名、文档字符串（docstring）和若干示例，要求模型生成完整的函数实现。评测采用 pass@k 指标，通过运行测试用例判断生成代码是否正确，主要使用 pass@1（生成 1 个解，通过即得分）。

HumanEval 的设计重点是函数级别的代码理解与生成，题目相对聚焦：字符串操作、数学运算、列表处理等算法类任务占多数，不涉及复杂的多文件项目结构、API 调用或调试。发布时 Codex 的 pass@1 约为 28.8%，这一基线反映了当时代码生成的真实水平。

HumanEval+ 是 EvalPlus 项目对 HumanEval 的增强版本，通过自动化方法大量扩充每道题的测试用例（原题测试用例数量极少，平均约 7 条），揭示了部分模型在原 HumanEval 上的"虚假通过"问题——即代码通过了有限测试用例但实际逻辑存在错误。HumanEval+ 能有效降低这类虚假通过率，是更可靠的替代评测选项。

随着代码模型能力提升，HumanEval 迅速饱和。2024 年后顶级模型的 pass@1 超过 93%，164 道题的规模和题目难度已无法有效区分前沿模型，现实代码任务中所需的仓库级理解、调试、多步骤工具调用等能力完全超出其覆盖范围。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2021 |
| 大小 | 164 道 Python 编程题 |
| 题目格式 | 代码生成（函数级，单元测试评估） |
| 覆盖领域 | 代码（函数级 Python 编程） |
| 语言 | 英文（代码为 Python） |
| 许可证 | MIT |

## SOTA 表现

- 顶级模型（2024-2025 年）：93%+（pass@1）

## 主要挑战与局限

- **完全饱和**：顶级模型 pass@1 已超过 93%，164 道题的有限规模和难度已无法区分前沿代码模型的真实能力差异。
- **测试用例覆盖不足**：原版 HumanEval 每题平均测试用例极少（约 7 条），边界情况覆盖不充分，导致"表面通过但逻辑错误"的虚假通过问题。HumanEval+ 通过扩充测试用例缓解了这一问题。
- **任务场景过于局限**：仅覆盖独立函数级 Python 任务，不涉及多文件项目、依赖管理、调试、代码审查等真实软件工程场景，与实际开发需求差距较大。SWE-bench 等仓库级基准已成为更贴近现实的代码能力评测标准。

## 相关页面

- [[SWE-bench-Verified]]
- [[LiveCodeBench]]
- [[benchmark-saturation]]
- [[data-contamination]]
