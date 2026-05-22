---
title: CodeContests
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- code
- reasoning
language: en
year: 2022
authors:
- Yujia Li
- David Choi
- Junyoung Chung
- Nate Kushman
- Julian Schrittwieser
- Rémi Leblond
- Tom Eccles
- James Keeling
- Felix Gimeno
- Agustin Dal Lago
- Thomas Hubert
- Peter Choy
- Cyprien de Masson d'Autume
- Igor Babuschkin
- Xinyun Chen
- Po-Sen Huang
- Johannes Welbl
- Sven Gowal
- Alexey Cherepanov
- James Molloy
- Daniel J. Mankowitz
- Esme Sutherland Robson
- Pushmeet Kohli
- Nando de Freitas
- Koray Kavukcuoglu
- Oriol Vinyals
arxiv_id: '2203.07814'
official_url: https://github.com/google-deepmind/code_contests
license: ''
size: 13610
format: code
status: active
saturation_threshold: 0.9
sources:
- https://arxiv.org/abs/2203.07814
- https://github.com/google-deepmind/code_contests
dimension: H
sota:
- score: 62.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://github.com/google-deepmind/code_contests
  notes: CodeContests solve rate (competitive programming)
- score: 60.2%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/google-deepmind/code_contests
  notes: solve rate
- score: 58.5%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: solve rate
- score: 57.0%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://deepmind.google/technologies/gemini/
  notes: solve rate
- score: 45.0%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: solve rate, 2024 baseline
---

# CodeContests

> DeepMind发布的竞赛级编程评测数据集，来源于Codeforces、AtCoder、CodeChef等顶级编程竞赛平台，难度极高，代表了代码生成评测的天花板之一。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2203.07814](https://arxiv.org/abs/2203.07814)
- **官方主页**: [https://github.com/google-deepmind/code_contests](https://github.com/google-deepmind/code_contests)

<!-- AUTO-LINKS:END -->

## 概述

CodeContests由DeepMind的Li等人于2022年随AlphaCode论文一同发布，是目前最具挑战性的代码评测数据集之一。数据集收集自多个顶级算法竞赛平台，题目需要选手具备较强的算法设计能力、数学推理能力和工程实现能力。

与APPS等基准相比，CodeContests的题目难度更高，测试用例更严格（包含专门构造的边界用例），且支持多种编程语言（C++、Python、Java等）。论文同时提出了AlphaCode系统，通过大规模采样和过滤的方式在竞赛编程中取得了接近竞赛选手的表现。

数据集包含训练集、验证集和测试集，并提供了每道题目的问题描述、官方正确答案、及大量错误提交样本（用于学习常见错误模式）。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 约 13,610 道（训练+验证+测试） |
| 测试集题量 | 约 165 道 |
| 编程语言 | C++、Python、Java 等多种 |
| 评测方式 | 全测试用例通过（含隐藏用例） |
| 题目来源 | Codeforces、AtCoder、CodeChef |
| 难度范围 | 竞赛入门到高难度（Div.1） |

## SOTA 表现

| 模型/系统 | 测试集通过率（@1/k） |
|----------|--------------------|
| AlphaCode 2（2023） | 约 87%（@50，竞赛top50%） |
| AlphaCode（2022） | 约 50%（@1M，竞赛top50%） |
| GPT-4（代码生成） | 在Div.2题目上有限通过 |

注：竞赛级别题目对当前大多数通用大模型仍极具挑战。


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 62.5% | CodeContests solve rate (competitive programming) | 2025-09 | [link](https://github.com/google-deepmind/code_contests) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 60.2% | solve rate | 2026-04 | [link](https://github.com/google-deepmind/code_contests) |
| 🥉 | [[DeepSeek-V4-Pro]] | 🚫 no | 58.5% | solve rate | 2026-02 | [link](https://deepseek.com) |
| 4 | [[Gemini-3.1-Pro]] | 🚫 no | 57.0% | solve rate | 2026-03 | [link](https://deepmind.google/technologies/gemini/) |
| 5 | [[GPT-4o]] | 🚫 no | 45.0% | solve rate, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **极高难度**：大多数题目需要选手级别的算法知识（动态规划、图论、数论等），远超一般编程基准。
- **测试用例严苛**：包含专门构造的边界测试用例，代码必须处理极端情况。
- **多语言评测复杂**：支持多种语言虽提升了通用性，但增加了评测基础设施复杂度。
- **样本效率问题**：需要大量采样（@k很大）才能获得合理通过率，计算成本高。
- **数据获取限制**：部分平台的题目使用存在授权问题。

## 相关页面

- [[APPS]]
- [[HumanEval]]
- [[SWE-bench]]
- [[LiveCodeBench]]
