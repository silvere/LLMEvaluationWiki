---
title: Winograd Schema Challenge
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- reasoning
- knowledge
language: en
year: 2012
authors:
- Hector J. Levesque
- Ernest Davis
- Leora Morgenstern
arxiv_id: ''
official_url: https://cs.nyu.edu/~davise/papers/WinogradSchemas/WS.html
license: ''
size: 273
format: multiple-choice
status: active
saturation_threshold: 0.9
sources:
- 'Levesque, H., Davis, E., & Morgenstern, L. (2012). The Winograd Schema Challenge. AAAI Spring Symposium: Logical Formalizations of Commonsense Reasoning.'
dimension: A
subdimension: benchmark
sota:
- score: 98.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://openai.com/gpt-5
  notes: Winograd Schema Challenge accuracy
- score: 97.8%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.anthropic.com/claude
  notes: accuracy
- score: 97.2%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://deepmind.google/technologies/gemini/
  notes: accuracy
- score: 96.5%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: accuracy
- score: 95.0%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: accuracy, 2024 baseline
---

# Winograd Schema Challenge

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 98.5% | Winograd Schema Challenge accuracy | 2025-09 | [link](https://openai.com/gpt-5) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 97.8% | accuracy | 2026-04 | [link](https://www.anthropic.com/claude) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 97.2% | accuracy | 2026-03 | [link](https://deepmind.google/technologies/gemini/) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 96.5% | accuracy | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 95.0% | accuracy, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **官方主页**: [https://cs.nyu.edu/~davise/papers/WinogradSchemas/WS.html](https://cs.nyu.edu/~davise/papers/WinogradSchemas/WS.html)
- **官网**: [Levesque, H., Davis, E., & Morgenstern, L. (2012). The Winograd Schema Challenge. AAAI Spring Symposium: Logical Formalizations of Commonsense Reasoning.](Levesque, H., Davis, E., & Morgenstern, L. (2012). The Winograd Schema Challenge. AAAI Spring Symposium: Logical Formalizations of Commonsense Reasoning.)

<!-- AUTO-LINKS:END -->

## 概述

Winograd Schema Challenge（WSC）是一个经典的常识推理基准，由 Hector J. Levesque 等人于 2012 年提出。该基准专注于测试机器在理解代词指代消歧（coreference resolution）方面的能力，被认为是图灵测试的替代性评测方案之一。

## 任务设计

WSC 的核心任务是：给定一个包含代词（如"它"、"他们"）的句子，模型需要判断该代词指向句中的哪个名词短语。每个题目通常包含两个候选答案，且题目经过精心构造，使得统计共现或浅层句法线索无法提供帮助，必须依赖常识知识和语境理解才能正确作答。

经典示例：
- "The trophy didn't fit in the suitcase because **it** was too big." — "it" 指代 trophy（奖杯太大）
- "The trophy didn't fit in the suitcase because **it** was too small." — "it" 指代 suitcase（箱子太小）

通过改变句中一个词（"big" → "small"），代词指代发生反转，从而规避了语言统计捷径。

## 数据规模

原始 WSC 数据集包含 273 道精心设计的题目，数量较少但质量极高。后续研究者在此基础上扩展出 WinoGrande（约 44k 题）等更大规模的变体，以缓解数据量不足的问题。

## 评测意义

WSC 之所以具有里程碑意义，在于它明确区分了"语言理解"与"真正的常识推理"：

- **对抗统计捷径**：题目的设计原则要求任何纯统计方法（如 n-gram 语言模型）都无法超越随机基线，迫使模型真正理解语义。
- **图灵测试替代**：Levesque 认为 WSC 比标准图灵测试更具可操作性和可重复性，可作为机器智能的硬指标之一。
- **影响后续研究**：WSC 启发了 SuperGLUE 中的 WSC 子任务、WinoGrande、Winogrande-XL 等一系列衍生基准。

## 当前挑战与局限

随着大型语言模型的发展，顶尖模型（如 GPT-4）在原始 WSC 上已接近人类水平（约 90%），导致基准趋于饱和。主要局限包括：

- **规模有限**：273 道题目使得统计检验的置信度较低，单次评测结果方差较大。
- **英语为主**：原始数据集仅覆盖英文，跨语言泛化能力有待评测。
- **构造偏差**：由于题目手工构造，可能存在风格特征被模型隐式学习。

## 相关基准

- **WinoGrande**：基于众包扩展的 44k 版本，引入了反偏见过滤（AFLite）。
- **SuperGLUE WSC 子任务**：将 WSC 纳入多任务评测框架。
- **Winograd NLI**：将代词消歧转化为自然语言推理格式。
