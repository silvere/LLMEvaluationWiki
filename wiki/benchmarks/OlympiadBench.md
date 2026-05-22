---
title: OlympiadBench
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- math
- reasoning
language: en
year: 2024
authors:
- Chaoqun He
- Renjie Luo
- Yuzhuo Bai
- Shengding Hu
- Zhen Leng Thai
- Junhao Shen
- Jinyi Hu
- Xu Han
- Yujie Huang
- Yuxiang Zhang
- Jie Liu
- Lei Qi
- Zhiyuan Liu
- Maosong Sun
arxiv_id: '2402.14008'
official_url: https://github.com/OpenBMB/OlympiadBench
license: ''
size: 8952
format: open-ended
status: active
saturation_threshold: 0.9
sources:
- https://arxiv.org/abs/2402.14008
- https://github.com/OpenBMB/OlympiadBench
dimension: A
subdimension: benchmark
sota:
- score: 62.6%
  model: DeepSeek-R1
  harness: null
  with_tools: false
  date: 2025-01
  source: https://github.com/OpenBMB/OlympiadBench
  notes: 数学子集，开源 SoTA（AIME/IMO 类型题）
- score: 58.3%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/OpenBMB/OlympiadBench
  notes: 奥数+物理综合，2026 frontier
- score: 55.1%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/OpenBMB/OlympiadBench
  notes: 奥数+物理综合
- score: 44.1%
  model: o1-preview
  harness: null
  with_tools: false
  date: 2024-09
  source: https://arxiv.org/abs/2404.02349
  notes: 增强模式（Python+Wolfram），含工具辅助
- score: 39.72%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://arxiv.org/abs/2404.02349
  notes: 纯文本模式（无图表）
---

# OlympiadBench

> 包含8952道中英文奥林匹克竞赛级别数学与物理题目的双语评测基准，用于评测大语言模型在高难度科学竞赛推理上的极限能力。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2402.14008](https://arxiv.org/abs/2402.14008)
- **官方主页**: [https://github.com/OpenBMB/OlympiadBench](https://github.com/OpenBMB/OlympiadBench)

<!-- AUTO-LINKS:END -->

## 概述

OlympiadBench由He等人于2024年发布，收集了来自中国和国际数学奥林匹克（IMO）、物理奥林匹克（IPhO）及相关竞赛的真实题目，涵盖中英文两种语言。这是目前规模最大的奥林匹克竞赛级别双语科学推理基准之一。

题目类型包括填空题和解答题，评测时采用自动判分机制，对数值答案使用精确匹配或近似匹配，对推导过程题则依赖LLM辅助评分。OlympiadBench的设计目标是测试模型在人类精英水平推理任务上的性能上限，是"frontier model"能力评测的重要工具。

数据集分为数学（OlympiadBench-Math）和物理（OlympiadBench-Physics）两个子集，并分别提供中文和英文版本。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 8,952 道 |
| 语言 | 中文、英文 |
| 学科 | 数学、物理 |
| 题目来源 | IMO、IPhO、中国奥数/物理竞赛等 |
| 答案类型 | 数值答案、表达式、证明 |
| 评测方式 | 精确匹配 + LLM辅助评分 |

## SOTA 表现

| 模型 | 数学（英文）准确率 | 物理（英文）准确率 |
|------|-----------------|-----------------|
| GPT-4o | ~43% | ~33% |
| Claude 3 Opus | ~35% | ~28% |
| 开源前沿模型 | ~25-35% | ~20-28% |

注：奥林匹克级别题目难度极高，即使顶级模型也仅能解答约三分之一到四分之一的题目。


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[DeepSeek-R1]] | 🚫 no | 62.6% | 数学子集，开源 SoTA（AIME/IMO 类型题） | 2025-01 | [link](https://github.com/OpenBMB/OlympiadBench) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 58.3% | 奥数+物理综合，2026 frontier | 2026-04 | [link](https://github.com/OpenBMB/OlympiadBench) |
| 🥉 | [[GPT-5]] | 🚫 no | 55.1% | 奥数+物理综合 | 2026-04 | [link](https://github.com/OpenBMB/OlympiadBench) |
| 4 | [[o1-preview]] | 🚫 no | 44.1% | 增强模式（Python+Wolfram），含工具辅助 | 2024-09 | [link](https://arxiv.org/abs/2404.02349) |
| 5 | [[GPT-4o]] | 🚫 no | 39.72% | 纯文本模式（无图表） | 2024-05 | [link](https://arxiv.org/abs/2404.02349) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **极高专业难度**：奥林匹克竞赛题目需要深度数学推导和物理直觉，远超普通高考题目。
- **评测一致性**：证明类题目的自动评分依赖LLM判断，存在主观性和不一致性。
- **中英文表现差异**：模型在中文题目上的表现通常弱于英文，反映了多语言能力的不均衡。
- **数据可及性**：部分竞赛题目的版权归属复杂，数据集的长期可获取性存在不确定性。
- **图表题处理困难**：包含几何图形或实验装置图的物理题对纯文本模型构成额外挑战。

## 相关页面

- [[MATH]]
- [[MATH500]]
- [[AIME]]
- [[SciBench]]
- [[OmniMath]]
- [[FrontierMath]]
