---
title: MMT-Bench
type: benchmark
publish: true
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- multimodal
- knowledge
- reasoning
year: 2024
arxiv_id: '2404.16006'
status: active
dimension: E
sota:
- score: 77.5%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://mmt-bench.github.io
  notes: MMT-Bench accuracy (300+ subtasks)
- score: 76.2%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://mmt-bench.github.io
  notes: accuracy
- score: 75.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://mmt-bench.github.io
  notes: accuracy
- score: 74.8%
  model: Qwen3.6
  harness: null
  with_tools: false
  date: 2026-04
  source: https://mmt-bench.github.io
  notes: accuracy
- score: 63.4%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://mmt-bench.github.io
  notes: accuracy, 2024 baseline
---

# MMT-Bench

> 覆盖 162 个子任务的大规模多模态多任务评测基准，通过广泛的任务多样性衡量通用多模态智能。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Gemini-3.1-Pro]] | 🚫 no | 77.5% | MMT-Bench accuracy (300+ subtasks) | 2026-03 | [link](https://mmt-bench.github.io) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 76.2% | accuracy | 2026-04 | [link](https://mmt-bench.github.io) |
| 🥉 | [[GPT-5]] | 🚫 no | 75.5% | accuracy | 2025-09 | [link](https://mmt-bench.github.io) |
| 4 | [[Qwen3.6]] | 🚫 no | 74.8% | accuracy | 2026-04 | [link](https://mmt-bench.github.io) |
| 5 | [[GPT-4o]] | 🚫 no | 63.4% | accuracy, 2024 baseline | 2024-05 | [link](https://mmt-bench.github.io) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2404.16006](https://arxiv.org/abs/2404.16006)

<!-- AUTO-LINKS:END -->

## 概述

MMT-Bench（Massive Multitask Test Benchmark）由上海 AI 实验室等机构于 2024 年提出，是迄今规模最大、任务覆盖最广的多模态评测基准之一。该基准的核心理念是通过**极广泛的任务覆盖**（162 个子任务）来综合评测多模态大模型的通用能力，避免单一任务类型的评测盲区。

MMT-Bench 从 31,325 道精心整理的问题出发，覆盖视觉感知、知识理解、推理、文化理解、安全等多个维度，并引入了大量此前很少出现在多模态基准中的任务类型（如地图理解、医学图像、卫星图像、图表分析等）。每个子任务来自真实世界的专业应用场景。

该基准还提供了系统性的模型能力雷达图分析，帮助研究者快速识别不同模型的优势领域和薄弱点，对多模态模型的全面评估具有重要参考价值。

## 任务格式

- **问题总数**：31,325 道多项选择题
- **子任务数量**：162 个子任务，归属于 4 大核心能力类别
- **核心能力**：视觉理解（Visual Understanding）、视觉推理（Visual Reasoning）、视觉知识（Visual Knowledge）、视觉生成与变换（Visual Generation & Transformation）
- **问题格式**：标准多项选择（通常 4 选 1）
- **语言**：英文为主
- **评测方式**：全自动化，计算各子任务和总体准确率

## 主要指标

- **总体准确率**：所有 162 个子任务的平均准确率
- **4 大类别准确率**：按核心能力类别汇总的分类准确率
- **子任务细分**：162 个子任务的详细性能分析
- **能力雷达图**：可视化多维能力对比

## 局限性

- 题目数量庞大，完整评测成本较高，不同团队可能仅报告子集结果
- 162 个子任务的难度和数据质量参差不齐，总分可能掩盖重要的任务级差异
- 多项选择格式无法评测开放式生成、多步推理等能力

## 相关页面
- [[MMMU]]
- [[MMBench]]
- [[MMStar]]
