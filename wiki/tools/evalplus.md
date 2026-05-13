---
title: "EvalPlus（HumanEval+）"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
---

# EvalPlus（HumanEval+）

> 通过大幅扩充测试用例降低代码生成 benchmark 虚假通过率的评测增强框架。

## 基本信息

- **全称**：EvalPlus
- **核心 benchmark**：HumanEval+（针对 HumanEval）、MBPP+（针对 MBPP）
- **主要用途**：代码生成能力的严格评测，识别"能通过测试但实际有 bug"的代码

## 背景：HumanEval 的问题

HumanEval 是 OpenAI 发布的经典代码生成 benchmark，包含 164 个 Python 函数生成任务，每个任务附带少量测试用例（通常 7-8 个）。研究发现，由于测试用例数量极少，模型生成的代码可能通过全部测试但在边界条件、异常输入等情况下仍然存在 bug——即"虚假通过"（false positive）。

## EvalPlus 的解决方案

- **测试用例扩充**：使用 LLM 结合类型感知的突变测试（type-aware mutation testing）自动生成大量额外测试用例，数量从原始的 7-8 个扩充到 100+ 个。
- **严格覆盖边界**：新增测试用例覆盖边界值、异常输入、类型错误等 HumanEval 原始测试忽略的场景。
- **向后兼容**：EvalPlus 与 HumanEval 使用相同的任务集，分数可对比，只是通过门槛更严格。

## 效果与数据

EvalPlus 显著降低了主流代码生成模型的通过率，揭示了原始 HumanEval 分数的虚高程度。部分模型在 HumanEval 上的通过率比在 HumanEval+ 上高出 10-15 个百分点（具体数字待核实）。

## 局限与挑战

- **仅覆盖 Python**：HumanEval 和 EvalPlus 主要针对 Python 函数生成，对多语言代码能力的评测有限。
- **任务集规模**：164 个任务仍然偏少，顶级模型分数趋于饱和，区分度下降。
- **测试用例质量**：自动生成的测试用例可能本身有误，影响评测公正性（待核实）。

## 相关页面

- [[agent-eval]] — 代码生成评测的进阶形式（从函数生成到完整 repo 修复）
- [[benchmark-contamination]] — HumanEval 是受污染最严重的 benchmark 之一
- [[lm-evaluation-harness]] — 集成了 EvalPlus 的评测框架（待核实）
