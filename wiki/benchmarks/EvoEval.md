---
title: EvoEval
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- code
language: en
year: 2024
authors:
- Chunqiu Steven Xia
- Yinlin Deng
- Lingming Zhang
arxiv_id: ''
official_url: https://evo-eval.github.io/
license: ''
size: 0
format: code
status: active
saturation_threshold: 0.9
sources:
- https://evo-eval.github.io/
- https://github.com/evo-eval/evoeval
dimension: H
sota:
- score: 90.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://evo-eval.github.io
  notes: EvoEval pass@1 (evolved HumanEval variants)
- score: 89.2%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://evo-eval.github.io
  notes: pass@1
- score: 88.0%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://evo-eval.github.io
  notes: pass@1
- score: 86.5%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: pass@1
- score: 80.0%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://evo-eval.github.io
  notes: pass@1, 2024 baseline
---

# EvoEval

> 通过自动化"进化"手段从HumanEval衍生出多个变体套件的代码评测基准，用于揭示模型在原版HumanEval上的表现是否存在过拟合或题目泄漏问题。

<!-- AUTO-LINKS:START -->

## 参考链接

- **官方主页**: [https://evo-eval.github.io/](https://evo-eval.github.io/)
- **GitHub**: [https://github.com/evo-eval/evoeval](https://github.com/evo-eval/evoeval)

<!-- AUTO-LINKS:END -->

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


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Claude-Opus-4.7]] | 🚫 no | 90.5% | EvoEval pass@1 (evolved HumanEval variants) | 2026-04 | [link](https://evo-eval.github.io) |
| 🥈 | [[GPT-5]] | 🚫 no | 89.2% | pass@1 | 2025-09 | [link](https://evo-eval.github.io) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 88.0% | pass@1 | 2026-03 | [link](https://evo-eval.github.io) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 86.5% | pass@1 | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 80.0% | pass@1, 2024 baseline | 2024-05 | [link](https://evo-eval.github.io) |

<!-- AUTO-SOTA:END -->

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
