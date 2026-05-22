---
title: MMLU-Redux
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
sources: []
domain:
- knowledge
- reasoning
language: en
year: 2024
status: active
arxiv_id: '2406.04127'
dimension: A
subdimension: benchmark
sota:
- score: 95.8%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/WildEval/ZeroEval
  notes: MMLU-Redux（5700 题去污染版本），2026 frontier
- score: 94.2%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/WildEval/ZeroEval
  notes: MMLU-Redux
- score: 92.84%
  model: o1-preview
  harness: null
  with_tools: false
  date: 2024-09
  source: https://github.com/WildEval/ZeroEval/blob/main/result_dirs/mmlu-redux.summary.md
  notes: o1-preview，原 ZeroEval 最高
- score: 88.91%
  model: Claude-3.5-Sonnet
  harness: null
  with_tools: false
  date: 2024-10
  source: https://github.com/WildEval/ZeroEval/blob/main/result_dirs/mmlu-redux.summary.md
  notes: Oct 2024 版
- score: 88.88%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-09
  source: https://github.com/WildEval/ZeroEval/blob/main/result_dirs/mmlu-redux.summary.md
  notes: GPT-4o 2024-09-07
---

# MMLU-Redux

> 对 MMLU 原始题目进行人工重新标注后的精纯版本，修正了约 4% 的标注错误，提供更可靠的知识评测基线。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Claude-Opus-4.7]] | 🚫 no | 95.8% | MMLU-Redux（5700 题去污染版本），2026 frontier | 2026-04 | [link](https://github.com/WildEval/ZeroEval) |
| 🥈 | [[GPT-5]] | 🚫 no | 94.2% | MMLU-Redux | 2026-04 | [link](https://github.com/WildEval/ZeroEval) |
| 🥉 | [[o1-preview]] | 🚫 no | 92.84% | o1-preview，原 ZeroEval 最高 | 2024-09 | [link](https://github.com/WildEval/ZeroEval/blob/main/result_dirs/mmlu-redux.summary.md) |
| 4 | [[Claude-3.5-Sonnet]] | 🚫 no | 88.91% | Oct 2024 版 | 2024-10 | [link](https://github.com/WildEval/ZeroEval/blob/main/result_dirs/mmlu-redux.summary.md) |
| 5 | [[GPT-4o]] | 🚫 no | 88.88% | GPT-4o 2024-09-07 | 2024-09 | [link](https://github.com/WildEval/ZeroEval/blob/main/result_dirs/mmlu-redux.summary.md) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2406.04127](https://arxiv.org/abs/2406.04127)

<!-- AUTO-LINKS:END -->

## 概述

MMLU-Redux 是对原始 MMLU（Massive Multitask Language Understanding）数据集的重新标注版本。研究者对 MMLU 的 3,000 道题（30 个科目各 100 题）进行了系统性人工审查，发现约 4.03% 的题目存在错误（模糊题干、错误答案、多个正确选项等），并予以修正。

修正后的版本提供了更严格的基准，对当前排行靠前的模型（尤其是接近人类水平的模型）评测差异可达 2–3 个百分点。

## 相关页面

- [[MMLU]] — 原始基准
- [[benchmark-contamination]] — MMLU 污染问题讨论
- [[benchmark-design]] — 标注质量对基准可靠性的影响
