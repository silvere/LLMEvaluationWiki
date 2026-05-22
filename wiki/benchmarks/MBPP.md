---
title: MBPP
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- code
language: en
year: 2021
authors:
- Jacob Austin
- Augustus Odena
- Maxwell Nye
- Maarten Bosma
- Henryk Michalewski
- David Dohan
- Ellen Jiang
- Carrie Cai
- Michael Terry
- Quoc Le
- Charles Sutton
arxiv_id: '2108.07732'
official_url: https://github.com/google-research/google-research/tree/master/mbpp
license: CC BY 4.0
size: 974
format: code
status: active
saturation_threshold: 0.9
sources:
- https://arxiv.org/abs/2108.07732
- https://github.com/google-research/google-research/tree/master/mbpp
dimension: H
sota:
- score: 94.9%
  model: o4-mini
  harness: null
  with_tools: false
  date: 2026-05
  source: https://www.codesota.com/llm/humaneval-mbpp
  notes: pass@1，MBPP（mostly basic programming problems），已饱和
- score: 92.0%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-05
  source: https://www.codesota.com/llm/humaneval-mbpp
  notes: pass@1，Claude Opus 4
- score: 89.6%
  model: Claude-Sonnet-4.6
  harness: null
  with_tools: false
  date: 2026-05
  source: https://www.codesota.com/llm/humaneval-mbpp
  notes: pass@1
- score: 89.4%
  model: DeepSeek-V3
  harness: null
  with_tools: false
  date: 2025-12
  source: https://www.codesota.com/llm/humaneval-mbpp
  notes: pass@1，DeepSeek-Coder-V2
- score: 80.1%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://arxiv.org/abs/2407.21075
  notes: pass@1，2024 基线
---

# MBPP (Mostly Basic Python Problems)

> 由Google Brain团队发布的974道入门级Python编程题，每道题目均附有测试用例，用于评测语言模型生成基础Python代码的能力。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2108.07732](https://arxiv.org/abs/2108.07732)
- **官方主页**: [https://github.com/google-research/google-research/tree/master/mbpp](https://github.com/google-research/google-research/tree/master/mbpp)

<!-- AUTO-LINKS:END -->

## 概述

MBPP（Mostly Basic Python Problems）由Austin等人于2021年发布，旨在提供一个相对简单、标准化的代码生成评测集。题目由众包方式收集，覆盖基本数学运算、字符串操作、列表处理等常见编程模式，难度定位为入门级别，适合大多数有一定编程基础的人类解答。

每道题目包含：自然语言描述、1-3个标准测试用例、参考解答。评测方式采用pass@k指标，即在k次采样中至少有一次通过全部测试用例。

MBPP与HumanEval共同构成了代码生成评测的两大基础基准，被广泛用于各类代码模型的性能报告中。EvalPlus团队后续对MBPP进行了扩展，发布了MBPP+版本，增加了更多测试用例以提高评测严格性。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 974 道 |
| 编程语言 | Python |
| 评测方式 | pass@1, pass@10, pass@80 |
| 题目难度 | 入门级 |
| 数据来源 | 众包收集 |
| 数据划分 | 训练集 374 道，验证集 90 道，测试集 500 道，few-shot 示例集 10 道 |

## SOTA 表现

| 模型 | pass@1 |
|------|--------|
| GPT-4o | ~87% |
| Claude 3.5 Sonnet | ~85% |
| 早期Codex（2021） | ~50% |

注：MBPP原版测试集在主流大模型上通过率已较高，建议配合MBPP+评测。


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[o4-mini]] | 🚫 no | 94.9% | pass@1，MBPP（mostly basic programming problems），已饱和 | 2026-05 | [link](https://www.codesota.com/llm/humaneval-mbpp) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 92.0% | pass@1，Claude Opus 4 | 2026-05 | [link](https://www.codesota.com/llm/humaneval-mbpp) |
| 🥉 | [[Claude-Sonnet-4.6]] | 🚫 no | 89.6% | pass@1 | 2026-05 | [link](https://www.codesota.com/llm/humaneval-mbpp) |
| 4 | [[DeepSeek-V3]] | 🚫 no | 89.4% | pass@1，DeepSeek-Coder-V2 | 2025-12 | [link](https://www.codesota.com/llm/humaneval-mbpp) |
| 5 | [[GPT-4o]] | 🚫 no | 80.1% | pass@1，2024 基线 | 2024-05 | [link](https://arxiv.org/abs/2407.21075) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **难度较低，区分度不足**：当前主流代码模型在MBPP上的pass@1已接近饱和，难以区分高性能模型间的差异。
- **测试用例数量有限**：原版每道题仅有1-3个测试用例，存在模型侥幸通过但代码逻辑有误的情况。
- **数据污染问题**：由于数据公开较早，许多模型的训练集中可能已包含MBPP题目，评测结果可能虚高。
- **题型单一**：以算法和数据结构为主，对实际工程编程能力（如API调用、文件操作等）覆盖不足。
- **众包质量参差**：部分题目描述不够精确，参考解答存在边界情况未覆盖的情况。

## 相关页面

- [[HumanEval]]
- [[MBPP-Plus]]
- [[APPS]]
- [[BigCodeBench]]
- [[LiveCodeBench]]
