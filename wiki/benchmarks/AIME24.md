---
title: AIME 2024
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
authors: []
arxiv_id: ''
official_url: https://artofproblemsolving.com/wiki/index.php/2024_AIME_I_Problems
license: ''
size: 30
format: open-ended
status: active
saturation_threshold: 0.8
sources:
- https://artofproblemsolving.com/wiki/index.php/2024_AIME_I_Problems
- https://artofproblemsolving.com/wiki/index.php/2024_AIME_II_Problems
dimension: A
subdimension: benchmark
sota:
- score: 92.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://openai.com/gpt-5
  notes: AIME 2024 accuracy
- score: 90.8%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.anthropic.com/claude
  notes: AIME 2024 accuracy
- score: 89.5%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: AIME 2024 accuracy
- score: 88.2%
  model: Qwen3.6
  harness: null
  with_tools: false
  date: 2026-04
  source: https://qwenlm.github.io
  notes: AIME 2024 accuracy
- score: 86.5%
  model: Kimi-K2.5
  harness: null
  with_tools: false
  date: 2026-04
  source: https://kimi.moonshot.cn
  notes: AIME 2024 accuracy
---

# AIME 2024

> 2024年美国数学邀请考试（AIME I 和 AIME II）的30道题目，是当前评测大语言模型数学竞赛级推理能力最常用的近期基准之一，具有低数据污染风险。

<!-- AUTO-LINKS:START -->

## 参考链接

- **官方主页**: [https://artofproblemsolving.com/wiki/index.php/2024_AIME_I_Problems](https://artofproblemsolving.com/wiki/index.php/2024_AIME_I_Problems)
- **官网**: [https://artofproblemsolving.com/wiki/index.php/2024_AIME_II_Problems](https://artofproblemsolving.com/wiki/index.php/2024_AIME_II_Problems)

<!-- AUTO-LINKS:END -->

## 概述

AIME（American Invitational Mathematics Examination，美国数学邀请考试）是高中数学竞赛体系中仅次于USAMO的顶级赛事，参赛资格需通过AMC筛选。AIME每年举行两次（AIME I和AIME II），每次15道题，答案均为0-999之间的整数，无需选择，完全开放式计算。

AIME 2024的30道题目（AIME I 15道 + AIME II 15道）因其发布时间较新（2024年初），被广泛用于评测前沿模型，原因在于：大多数主流模型的训练数据截止日期早于2024年，因此数据污染风险相对较低，能更可靠地反映模型的真实数学推理能力。

AIME题目难度极高，全国参赛学生（已通过AMC筛选）的平均分通常在3-5分（满分15分），是测试高难度数学推理能力的理想基准。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 30 道（AIME I + AIME II，各15道） |
| 答案类型 | 0-999的整数（完全开放式，无选项） |
| 题目格式 | 无多选，纯计算/推理 |
| 难度 | 极高（高中竞赛顶级） |
| 主办机构 | 美国数学学会（MAA） |
| 答题时间 | 3小时（原竞赛） |

## SOTA 表现

| 模型 | AIME 2024 I 正确率 | AIME 2024 II 正确率 |
|------|-----------------|------------------|
| o1（OpenAI，2024） | 83.3%（12.5/15） | 73.3%（11/15） |
| o3-mini（high） | ~80% | ~73% |
| GPT-4o | ~20-30% | ~20-30% |
| Claude 3.5 Sonnet | ~25-35% | ~20-30% |

注：o系列推理模型在AIME上表现显著优于标准GPT-4类模型，反映了数学推理专项能力的提升。


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 92.5% | AIME 2024 accuracy | 2025-09 | [link](https://openai.com/gpt-5) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 90.8% | AIME 2024 accuracy | 2026-04 | [link](https://www.anthropic.com/claude) |
| 🥉 | [[DeepSeek-V4-Pro]] | 🚫 no | 89.5% | AIME 2024 accuracy | 2026-02 | [link](https://deepseek.com) |
| 4 | [[Qwen3.6]] | 🚫 no | 88.2% | AIME 2024 accuracy | 2026-04 | [link](https://qwenlm.github.io) |
| 5 | [[Kimi-K2.5]] | 🚫 no | 86.5% | AIME 2024 accuracy | 2026-04 | [link](https://kimi.moonshot.cn) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **题量极小**：每套仅15道题，30道合并后仍有较大方差，单道题的随机性影响较大。
- **污染风险随时间增加**：随着2024年数据被纳入新模型训练集，数据污染问题会逐渐加重。
- **整数答案限制**：AIME的答案必须为整数，这不完全反映复杂数学推理的全貌，某些类型题目（如需要证明的题目）无法纳入。
- **可持续性问题**：每年需使用新题目（AIME 2025等）以维持低污染特性，需持续关注。
- **难度对弱模型区分度低**：大多数一般模型得分接近0，主要用于区分最顶级的模型。

## 相关页面

- [[AIME]]
- [[AMC23]]
- [[MATH]]
- [[MATH500]]
- [[OmniMath]]
- [[FrontierMath]]
