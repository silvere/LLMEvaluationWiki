---
title: HumanEval-X
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- code
language: en
year: 2023
authors:
- Qinkai Zheng
- Xiao Xia
- Xu Zou
- Yuxiao Dong
- Shan Wang
- Yufei Xue
- Zihan Wang
- Lei Shen
- Andi Wang
- Yang Li
- Teng Su
- Zhilin Yang
- Jie Tang
arxiv_id: '2303.17568'
official_url: https://github.com/THUDM/CodeGeeX
license: Apache 2.0
size: 820
format: code
status: active
saturation_threshold: 0.9
sources:
- https://arxiv.org/abs/2303.17568
- https://github.com/THUDM/CodeGeeX
dimension: H
sota:
- score: 90.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/THUDM/CodeGeeX
  notes: HumanEval-X pass@1 (multilingual HumanEval)
- score: 89.2%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://openai.com/gpt-5
  notes: pass@1
- score: 88.0%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://deepmind.google/technologies/gemini/
  notes: pass@1
- score: 86.5%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: pass@1
- score: 82.0%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: pass@1, 2024 baseline
---

# HumanEval-X

> 由清华大学CodeGeeX团队发布的多语言代码评测基准，将HumanEval扩展至Python、Java、C++、Go、JavaScript五种编程语言，支持代码生成、代码翻译等多类任务。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2303.17568](https://arxiv.org/abs/2303.17568)
- **官方主页**: [https://github.com/THUDM/CodeGeeX](https://github.com/THUDM/CodeGeeX)

<!-- AUTO-LINKS:END -->

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


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Claude-Opus-4.7]] | 🚫 no | 90.5% | HumanEval-X pass@1 (multilingual HumanEval) | 2026-04 | [link](https://github.com/THUDM/CodeGeeX) |
| 🥈 | [[GPT-5]] | 🚫 no | 89.2% | pass@1 | 2025-09 | [link](https://openai.com/gpt-5) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 88.0% | pass@1 | 2026-03 | [link](https://deepmind.google/technologies/gemini/) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 86.5% | pass@1 | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 82.0% | pass@1, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

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
