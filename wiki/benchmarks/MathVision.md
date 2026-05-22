---
title: MathVision
type: benchmark
publish: true
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- multimodal
- math
- reasoning
year: 2024
arxiv_id: '2402.14804'
status: active
sota:
- score: 71.2%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-05
  source: https://mathvision-challenge.github.io/leaderboard
  notes: MathVision（数学视觉推理），Gemini 多模态强
- score: 68.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://mathvision-challenge.github.io/leaderboard
  notes: MathVision
- score: 65.8%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2026-04
  source: https://mathvision-challenge.github.io/leaderboard
  notes: MathVision
- score: 60.2%
  model: Qwen3.6
  harness: null
  with_tools: false
  date: 2026-03
  source: https://mathvision-challenge.github.io/leaderboard
  notes: Qwen3.6 VL
dimension: E
---

# MathVision

> 包含图形的多模态数学推理基准，覆盖从初中到竞赛级别的 16 个数学学科，评测模型视觉数学推理能力。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Gemini-3.1-Pro]] | 🚫 no | 71.2% | MathVision（数学视觉推理），Gemini 多模态强 | 2026-05 | [link](https://mathvision-challenge.github.io/leaderboard) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 68.5% | MathVision | 2026-04 | [link](https://mathvision-challenge.github.io/leaderboard) |
| 🥉 | [[GPT-5]] | 🚫 no | 65.8% | MathVision | 2026-04 | [link](https://mathvision-challenge.github.io/leaderboard) |
| 4 | [[Qwen3.6]] | 🚫 no | 60.2% | Qwen3.6 VL | 2026-03 | [link](https://mathvision-challenge.github.io/leaderboard) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2402.14804](https://arxiv.org/abs/2402.14804)

<!-- AUTO-LINKS:END -->

## 概述

MathVision（也称 MATH-Vision）由多所高校联合于 2024 年提出，是迄今规模最大、难度分层最细致的多模态数学推理基准之一。该基准的核心目标是评测模型在含有图形（几何图、函数图像、统计图表、示意图等）的数学题目上的推理能力，要求模型同时理解视觉信息和进行数学推理。

与 MathVista 等通用数学视觉基准不同，MathVision 专注于**真实数学竞赛和教材**题目，所有题目均来自竞赛题库、高考及教材，难度覆盖初中、高中到大学竞赛级别。16 个数学子学科的覆盖使其成为数学领域最全面的多模态评测工具之一。

评测结果显示，即使是 GPT-4V 等顶级模型，在 MathVision 上的整体准确率也仅约 22%，远低于人类专家水平（约 68%），揭示了当前多模态模型在复杂数学视觉推理上的显著不足。

## 任务格式

- **题目数量**：3,040 道题
- **学科覆盖**：16 个数学学科，包括代数、几何、数论、组合、微积分、统计等
- **难度等级**：5 个难度等级（对应初中到竞赛级别）
- **图形类型**：几何构型图、函数图像、数轴、表格、统计图等多种形式
- **答案格式**：混合格式，包括数值填写、多项选择和表达式填写
- **语言**：英文（部分题目从中文竞赛题翻译）

## 主要指标

- **总体准确率**：所有题目的平均正确率
- **学科细分**：16 个子学科分别报告准确率
- **难度细分**：按 5 个难度等级统计，揭示模型在不同难度上的表现差异
- **人类对比**：提供专家人类基线（约 68%）用于参照

## 局限性

- 题目来源以竞赛和教材为主，可能包含模型训练数据，存在数据污染风险
- 答案评分对数值精度和表达式格式较敏感，可能导致实际正确的答案被判错
- 中文来源题目的翻译质量可能影响部分题目的语言自然度

## 相关页面
- [[MathVista]]
- [[MATH]]
- [[OlympiadBench]]

