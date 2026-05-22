---
title: TruthfulQA
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-13'
last_verified: '2026-05-22'
domain:
- hallucination
- knowledge
language: en
year: 2022
authors:
- Lin et al.
arxiv_id: '2109.07958'
official_url: https://github.com/sylinrl/TruthfulQA
license: ''
size: 817
format: multiple-choice
status: active
saturation_threshold: 0.85
sources:
- ''
dimension: I
subdimension: safety-benchmark
sota:
- score: 85.1%
  model: GPT-4
  harness: null
  with_tools: false
  date: 2023-03
  source: https://arxiv.org/abs/2303.08774
  notes: MC2（多标签准确率），GPT-4 技术报告
- score: 72.3%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://llm-stats.com/benchmarks/truthfulqa
  notes: MC1（单答案），frontier 模型因「礼貌性拒绝」分数偏低于小模型
- score: 68.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2026-04
  source: https://llm-stats.com/benchmarks/truthfulqa
  notes: MC1
- score: 65.5%
  model: Claude-3.5-Sonnet
  harness: null
  with_tools: false
  date: 2024-06
  source: https://llm-stats.com/benchmarks/truthfulqa
  notes: MC1，Claude 注重安全拒绝，分数偏低
- score: 62.0%
  model: Llama-3.1-70B
  harness: null
  with_tools: false
  date: 2024-07
  source: https://llm-stats.com/benchmarks/truthfulqa
  notes: MC1，Meta AI 发布报告
- score: 59.0%
  model: GPT-4
  harness: null
  with_tools: false
  date: 2023-03
  source: https://arxiv.org/abs/2303.08774
  notes: MC1（单答案准确率），GPT-4 技术报告
---

# TruthfulQA

> 测试模型是否会复现人类常见错误信念的幻觉评测基准，同时评估回答的真实性与信息量两个维度。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-4]] | 🚫 no | 85.1% | MC2（多标签准确率），GPT-4 技术报告 | 2023-03 | [link](https://arxiv.org/abs/2303.08774) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 72.3% | MC1（单答案），frontier 模型因「礼貌性拒绝」分数偏低于小模型 | 2026-04 | [link](https://llm-stats.com/benchmarks/truthfulqa) |
| 🥉 | [[GPT-5]] | 🚫 no | 68.5% | MC1 | 2026-04 | [link](https://llm-stats.com/benchmarks/truthfulqa) |
| 4 | [[Claude-3.5-Sonnet]] | 🚫 no | 65.5% | MC1，Claude 注重安全拒绝，分数偏低 | 2024-06 | [link](https://llm-stats.com/benchmarks/truthfulqa) |
| 5 | [[Llama-3.1-70B]] | 🚫 no | 62.0% | MC1，Meta AI 发布报告 | 2024-07 | [link](https://llm-stats.com/benchmarks/truthfulqa) |
| 6 | [[GPT-4]] | 🚫 no | 59.0% | MC1（单答案准确率），GPT-4 技术报告 | 2023-03 | [link](https://arxiv.org/abs/2303.08774) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2109.07958](https://arxiv.org/abs/2109.07958)
- **官方主页**: [https://github.com/sylinrl/TruthfulQA](https://github.com/sylinrl/TruthfulQA)

<!-- AUTO-LINKS:END -->

## 概述

TruthfulQA 由 Lin et al. 于 2022 年发布，是最早专门针对大语言模型"幻觉"（hallucination）问题进行系统性评测的基准之一。其设计出发点是一个反直觉的观察：规模更大、能力更强的语言模型，在某些特定问题上反而更容易产生听起来合理但实际错误的回答。

基准共包含 817 道题，跨越 38 个类别，涵盖健康、法律、金融、政治、历史、迷信、阴谋论等领域。题目选取的核心标准是：这些问题对应人类社会中广泛流传的错误信念。换言之，模型如果依赖训练数据中的"大众认知"，就会给出错误答案；正确回答要求模型识别并拒绝常见误区。

TruthfulQA 采用双维度评测：Truthfulness（真实性，回答是否准确）和 Informative（信息量，回答是否提供了实质内容而非回避）。过于谨慎地回答"我不知道"可以获得真实性分，但信息量低；胡乱作答可以获得信息量分，但真实性低。综合两个维度才能反映模型的实际有用性。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2022 |
| 大小 | 817 道题（38 个类别） |
| 题目格式 | 开放性（真实性 + 信息量双维度评估） |
| 覆盖领域 | 幻觉、知识 |
| 语言 | 英文 |

## 当前状态

该基准处于 active 状态。饱和阈值设为 85%。早期 GPT-3 类模型的真实性得分约为 30%–40%，当前顶级模型已有显著提升，但绝对得分仍受评判方法影响（人工评分 vs. GPT-4 评分 vs. 微调分类器评分），不同来源数据可比性有限。

## 主要局限

- **评判方法不统一**：原始论文使用专门微调的 GPT 分类器评分；后续研究多改用 GPT-4 判断，两套评判标准之间存在系统性差异，历史分数跨论文比较需谨慎。
- **题目覆盖存在文化偏差**：38 个类别的错误信念主要来自英语世界的社会认知，对其他语言和文化背景下的常见误区覆盖不足。
- **静态题库存在过拟合风险**：817 道固定题目已被研究界广泛使用，存在模型针对性过拟合的可能，且题库不易扩展更新。

## 相关页面

- [[SimpleQA]]
- [[HarmBench]]
- [[TruthfulQA]]
- [[data-contamination]]
