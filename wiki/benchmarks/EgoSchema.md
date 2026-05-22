---
title: EgoSchema
type: benchmark
publish: true
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- multimodal
year: 2023
arxiv_id: '2308.09126'
status: active
dimension: E
sota:
- score: 84.5%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://egoschema.github.io
  notes: accuracy on long-form video QA
- score: 83.2%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://egoschema.github.io
  notes: accuracy
- score: 82.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://egoschema.github.io
  notes: accuracy
- score: 81.0%
  model: Qwen3.6
  harness: null
  with_tools: false
  date: 2026-04
  source: https://egoschema.github.io
  notes: accuracy
- score: 72.2%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://egoschema.github.io
  notes: accuracy, 2024 baseline
---

# EgoSchema

> 专注于第一人称（Ego）视角长视频理解的多选题基准，每题需综合 3 分钟视频内容作答。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Gemini-3.1-Pro]] | 🚫 no | 84.5% | accuracy on long-form video QA | 2026-03 | [link](https://egoschema.github.io) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 83.2% | accuracy | 2026-04 | [link](https://egoschema.github.io) |
| 🥉 | [[GPT-5]] | 🚫 no | 82.5% | accuracy | 2025-09 | [link](https://egoschema.github.io) |
| 4 | [[Qwen3.6]] | 🚫 no | 81.0% | accuracy | 2026-04 | [link](https://egoschema.github.io) |
| 5 | [[GPT-4o]] | 🚫 no | 72.2% | accuracy, 2024 baseline | 2024-05 | [link](https://egoschema.github.io) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2308.09126](https://arxiv.org/abs/2308.09126)

<!-- AUTO-LINKS:END -->

## 概述

EgoSchema 于 2023 年发布，是专为评测**长视频理解**能力设计的多选题基准，全部数据来自第一人称（Ego-centric）视角视频数据集 Ego4D。数据集包含 **5,000 道**问答题，每道题对应一段约 **3 分钟**的第一人称视频，涵盖日常生活场景（烹饪、修理、户外活动等）。

与传统视频 QA 基准（通常只需理解短片段）不同，EgoSchema 每道题需要模型综合整个 3 分钟视频的信息才能正确作答，有效测试模型的**长时序理解与跨帧信息整合**能力。五个选项均为候选答案，且设计上排除了仅凭单帧或短片段即可答对的题目。

EgoSchema 提供 500 题的公开测试集（有标准答案）和 5,000 题的完整评测集（答案保留于官方评测服务器），是当前最具挑战性的长视频理解基准之一。

## 任务格式

- 总计 5,000 道题（500 题公开子集 + 4,500 题完整集）
- 五选一多选题（MCQ），每题对应 ~3 分钟第一人称视频
- 视频均来自 Ego4D 数据集，涵盖日常生活场景
- 需综合长时序上下文作答，排除短片段解题路径

## 主要指标

- **Accuracy**（五选一准确率）：主要指标，随机基线为 20%

## 局限性

- 所有视频均来自 Ego4D（第一人称视角），测试结果向第三人称或广播类视频的迁移性未知。
- 长视频上下文对现有多模态模型的视频帧采样策略提出挑战，模型间的比较可能因帧率设置不同而失去公平性。
- 公开子集仅 500 题，评估方差较大；完整集需提交至官方服务器，限制了快速迭代的便利性。

## 相关页面

- [[TOMATO]]
- [[TVBench]]
- [[MotionBench]]
