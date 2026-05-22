---
title: ARC-AGI2
type: benchmark
publish: true
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- reasoning
year: 2025
arxiv_id: ''
status: active
aliases:
- ARC-AGI 2.0
dimension: A
subdimension: benchmark
sota:
- score: 85.0%
  model: GPT-5.5
  harness: null
  with_tools: false
  date: 2026-05
  source: https://benchlm.ai/benchmarks/arcAgi2
  notes: ARC-AGI v2（比 v1 难数倍，人类基线 ~60-70%）
- score: 83.3%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2026-05
  source: https://benchlm.ai/benchmarks/arcAgi2
  notes: GPT-5.4 Pro
- score: 77.1%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-05
  source: https://benchlm.ai/benchmarks/arcAgi2
  notes: ARC-AGI v2
- score: 75.8%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://arcprize.org/
  notes: ARC-AGI v2
- score: 37.6%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2025-12
  source: https://arcprize.org/blog/arc-prize-2025-results-analysis
  notes: ARC Prize 2025 竞赛集（更难），12 月快照
- score: 24.0%
  model: o3
  harness: null
  with_tools: false
  date: 2025-12
  source: https://arxiv.org/abs/2601.10904
  notes: ARC Prize 2025 Kaggle 第一名系统（NVARC），私有评测集
---

# ARC-AGI2

> 抽象推理语料库 2.0，ARC-AGI1 的升级版，针对前代基准被"工程突破"而非真正泛化推理的方式攻克后，设计了更高标准的纯推理挑战。

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5.5]] | 🚫 no | 85.0% | ARC-AGI v2（比 v1 难数倍，人类基线 ~60-70%） | 2026-05 | [link](https://benchlm.ai/benchmarks/arcAgi2) |
| 🥈 | [[GPT-5]] | 🚫 no | 83.3% | GPT-5.4 Pro | 2026-05 | [link](https://benchlm.ai/benchmarks/arcAgi2) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 77.1% | ARC-AGI v2 | 2026-05 | [link](https://benchlm.ai/benchmarks/arcAgi2) |
| 4 | [[Claude-Opus-4.7]] | 🚫 no | 75.8% | ARC-AGI v2 | 2026-04 | [link](https://arcprize.org/) |
| 5 | [[Claude-Opus-4.7]] | 🚫 no | 37.6% | ARC Prize 2025 竞赛集（更难），12 月快照 | 2025-12 | [link](https://arcprize.org/blog/arc-prize-2025-results-analysis) |
| 6 | [[o3]] | 🚫 no | 24.0% | ARC Prize 2025 Kaggle 第一名系统（NVARC），私有评测集 | 2025-12 | [link](https://arxiv.org/abs/2601.10904) |

<!-- AUTO-SOTA:END -->

## 概述

ARC-AGI2（Abstract and Reasoning Corpus for AGI，第二代）由 François Chollet 与 ARC Prize 组织于 2025 年发布。其发布背景是：2024 年 ARC-AGI1 已被多种方法突破到 80%+ 准确率，但这些突破大量依赖测试时计算（test-time compute scaling）、大规模程序搜索和对 ARC1 特定分布的专门优化，而非 Chollet 最初希望见到的通用推理泛化。

ARC-AGI2 在保持原版核心理念（视觉网格推理、极少先验、全新规则）的同时，显著提升了难度和对通用推理能力的要求：

1. **更复杂的规则组合**：任务规则的构建需要更长的推理链和更多规则的复合应用
2. **更大的抽象跳跃**：从演示样例到测试输入的规律归纳需要更高层次的抽象
3. **对程序搜索的抗性**：精心设计以抵抗纯暴力程序搜索方法
4. **人类难度对比**：人类平均用时显著高于 ARC-AGI1，但仍远低于当前 AI 系统

ARC-AGI2 于发布初期即展现出对前沿模型的强力区分度：o3 等旗舰推理模型在公开测试集上的得分约在 4–5% 区间，而人类基线仍在 60%+ 以上，人机差距达到历史新高。

## 任务格式

- **任务总数**：公开训练集 + 私有评估集（具体数量随竞赛进展更新）
- **形式**：与 ARC-AGI1 一致，彩色网格演示对 + 测试输入
- **难度提升方式**：更长推理链、更复杂规则组合、更大网格
- **允许尝试次数**：每题 2 次（比 ARC-AGI1 更严格）
- **评估方式**：精确像素匹配
- **竞赛平台**：ARC Prize（arcprize.org），含公开排行榜

## 主要指标

- **准确率（Accuracy）**：正确解决的任务比例
- **人类基线**：约 60%（预估，较 ARC-AGI1 下降，反映难度提升）
- **前沿模型基线**：o3 等最强模型约 4–5%（2025 年初数据）

## 局限性

- 发布初期数据较少，长期饱和趋势尚不明确
- 如同 ARC-AGI1，难以区分"真正的泛化推理"与"高效的任务特异性工程"
- 竞赛导向可能再次推动针对 ARC2 分布的专门优化，历史或将重演

## 相关页面

- [[ARC-AGI1]]
- [[BBEH]]
- [[HLE]]
- [[ARC]]
