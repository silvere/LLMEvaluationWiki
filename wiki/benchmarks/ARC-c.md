---
title: ARC-Challenge
aliases:
- ARC-c
- ARC-Challenge
type: benchmark
publish: true
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- knowledge
- reasoning
year: 2018
arxiv_id: '1803.05457'
status: saturated
dimension: A
subdimension: benchmark
sota:
- score: 99.2%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://openai.com/gpt-5
  notes: ARC-Challenge accuracy, 25-shot
- score: 98.8%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.anthropic.com/claude
  notes: ARC-Challenge accuracy, 25-shot
- score: 98.4%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://deepmind.google/technologies/gemini/
  notes: ARC-Challenge accuracy, 25-shot
- score: 97.8%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: ARC-Challenge accuracy, 25-shot
- score: 96.4%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: ARC-Challenge 25-shot, 2024 baseline
---

# ARC-Challenge（ARC-c）

> ARC（AI2 Reasoning Challenge）数据集中的困难子集，包含约 1,172 道无法通过简单检索或词频方法回答的科学推理题，是评测中小型语言模型推理能力的经典基准。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 99.2% | ARC-Challenge accuracy, 25-shot | 2025-09 | [link](https://openai.com/gpt-5) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 98.8% | ARC-Challenge accuracy, 25-shot | 2026-04 | [link](https://www.anthropic.com/claude) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 98.4% | ARC-Challenge accuracy, 25-shot | 2026-03 | [link](https://deepmind.google/technologies/gemini/) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 97.8% | ARC-Challenge accuracy, 25-shot | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 96.4% | ARC-Challenge 25-shot, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/1803.05457](https://arxiv.org/abs/1803.05457)

<!-- AUTO-LINKS:END -->

## 概述

ARC-Challenge（常缩写为 ARC-c）是 [[ARC]] 数据集的困难子集。ARC 由 Clark 等人于 2018 年发布，来自 Allen Institute for AI（AI2），完整数据集包含约 7,787 道美国小学至初中科学考试题，分为 Easy（ARC-e）和 Challenge（ARC-c）两个子集。

ARC-Challenge 子集的筛选标准是：题目对于两类简单基线系统（基于检索的系统和基于词频的系统）均无法答对，因此这些题目需要真正的推理能力而非表面统计模式匹配。子集包含约 1,172 道测试题，覆盖物理、化学、生物、地球科学等基础科学领域，全为四选一多选题格式。

ARC-Challenge 长期被用于评测中小型语言模型（7B-13B 参数级别）的科学推理能力，也是 Open LLM Leaderboard（v1 版本）六项核心基准之一。随着 LLM 规模快速增长，顶级大模型（GPT-4、Claude 3 等）在 ARC-c 上的准确率已超过 90%，基准趋于饱和，但对于评测轻量级开源模型仍有参考价值。

注：本页面为 ARC-Challenge 子集的专用页面，完整数据集信息（含 ARC-Easy）详见 [[ARC]] 页面。

## 任务格式

- 格式：四选一多选题（multiple-choice, 4 options）
- 数据规模：约 1,172 道测试题（另有训练集约 1,119 道、验证集约 299 道）
- 领域：科学知识与推理（物理、化学、生物、地球科学）
- 语言：英文

## 主要指标

- **准确率（Accuracy）**：四选一多选，随机基线 25%
- 顶级模型（2024-2025 年）：> 90%

## 局限性

- **已接近饱和**：前沿大模型准确率超过 90%，对顶级模型的区分力极低
- **题目难度上限不足**：即使是 Challenge 子集，对大模型而言仍偏简单
- **知识范围局限**：仅限美国K-8科学知识，深度和广度均有限

## 相关页面

- [[ARC]]
- [[ARC-e]]
- [[MMLU]]
- [[HellaSwag]]
- [[OpenBookQA]]
