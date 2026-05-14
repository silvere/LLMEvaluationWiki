---
title: "EvoEval"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [code]
language: en
year: 2024
authors: ["Chunqiu Steven Xia", "Yinlin Deng", "Lingming Zhang"]
arxiv_id: ""
official_url: "https://evo-eval.github.io/"
license: ""
size: 0
format: code
status: active
saturation_threshold: 0.90
sources:
  - "https://evo-eval.github.io/"
  - "https://github.com/evo-eval/evoeval"
---

# EvoEval

> 通过自动化"进化"手段从HumanEval衍生出多个变体套件的代码评测基准，用于揭示模型在原版HumanEval上的表现是否存在过拟合或题目泄漏问题。

## 概述

EvoEval由Xia等人于2024年发布，其核心思路是使用LLM对HumanEval的原始题目进行语义等价变换，生成多个难度和风格各异的变体题目集，从而构建更难以被记忆、更能反映真实泛化能力的评测套件。

EvoEval包含多个子集，每个子集对应一种进化策略，例如：
- **Difficult**：增加问题复杂度和逻辑约束
- **Creative**：用不同的场景和措辞重新描述同一问题
- **Subtle**：对题目进行细微但关键的语义变化
- **Combined**：综合多种变换策略
- **Tool Use**：要求使用特定工具或库

通过对比模型在原版HumanEval和EvoEval各子集上的表现差异，可以诊断模型是否存在数据污染或过拟合。

## 规格

| 属性 | 值 |
|------|-----|
| 基础来源 | HumanEval（164道题） |
| 子集数量 | 5个（Difficult / Creative / Subtle / Combined / Tool Use） |
| 编程语言 | Python |
| 评测方式 | pass@1，基于测试用例执行 |
| 生成方式 | LLM驱动的自动化题目进化 |

## SOTA 表现

| 模型 | HumanEval pass@1 | EvoEval (Difficult) pass@1 |
|------|-----------------|---------------------------|
| GPT-4 | ~90% | ~60-70% |
| GPT-3.5 | ~70% | ~40-50% |

注：精确数据以官网最新排行榜为准，各子集表现差异显著。

## 主要挑战与局限

- **进化质量参差不齐**：LLM生成的变体题目在语义准确性和测试用例覆盖上可能存在缺陷。
- **覆盖范围依赖HumanEval**：EvoEval的题目领域分布与HumanEval相同，受限于原版基准的题型偏向。
- **缺乏论文正式记录**：相比有arXiv论文的基准，学术引用和可重复性验证相对不足。
- **进化策略的有效性存疑**：部分"进化"后的题目可能并未真正增加难度，只是措辞不同。

## 相关页面

- [[HumanEval]]
- [[MBPP]]
- [[LiveCodeBench]]
- [[BigCodeBench]]
