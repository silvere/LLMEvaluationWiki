---
title: RULER
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-13'
last_verified: '2026-05-22'
domain:
- long-context
- reasoning
- retrieval
language: en
year: 2024
authors:
- Hsieh et al.
arxiv_id: '2404.06654'
official_url: https://github.com/hsiehjackson/RULER
license: ''
size: 0
format: multiple-choice
status: active
saturation_threshold: 0.8
sources:
- ''
dimension: long-ctx
sota:
- score: 97.8%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://deepmind.google/technologies/gemini/
  notes: 128K context average score
- score: 97.2%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.anthropic.com/claude
  notes: 128K context average score
- score: 96.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://openai.com/gpt-5
  notes: 128K context average score
- score: 95.8%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: 128K context average score
- score: 94.8%
  model: Qwen3.6
  harness: null
  with_tools: false
  date: 2026-04
  source: https://qwenlm.github.io
  notes: 128K context average score
- score: 91.2%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: 128K context, 2024 baseline
---

# RULER（Ruler Unified Long-context Evaluation for Language Models）

> 专为测试长上下文理解能力设计的综合评测框架，覆盖 4K 到 128K 的上下文长度，揭示模型声称能力与实际性能之间的差距。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Gemini-3.1-Pro]] | 🚫 no | 97.8% | 128K context average score | 2026-03 | [link](https://deepmind.google/technologies/gemini/) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 97.2% | 128K context average score | 2026-04 | [link](https://www.anthropic.com/claude) |
| 🥉 | [[GPT-5]] | 🚫 no | 96.5% | 128K context average score | 2025-09 | [link](https://openai.com/gpt-5) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 95.8% | 128K context average score | 2026-02 | [link](https://deepseek.com) |
| 5 | [[Qwen3.6]] | 🚫 no | 94.8% | 128K context average score | 2026-04 | [link](https://qwenlm.github.io) |
| 6 | [[GPT-4o]] | 🚫 no | 91.2% | 128K context, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2404.06654](https://arxiv.org/abs/2404.06654)
- **官方主页**: [https://github.com/hsiehjackson/RULER](https://github.com/hsiehjackson/RULER)

<!-- AUTO-LINKS:END -->

## 概述

RULER 于 2024 年发布，全称 Ruler Unified Long-context Evaluation for Language Models，是专门评测大语言模型长上下文处理能力的综合框架。其设计动机源于一个普遍现象：许多模型在技术规格上声称支持 128K 乃至更长的上下文窗口，但在实际使用中，随着输入长度增加，模型性能往往大幅下滑，尤其是在需要从长文档中精准检索或跨段落推理时。

RULER 提供多种任务类型，涵盖单跳检索（needle-in-a-haystack 变体）、多跳推理（需要跨多个证据片段推理）、聚合任务（统计某类信息出现次数）以及问答任务。所有任务均可在不同上下文长度（4K、8K、16K、32K、64K、128K）下运行，使得研究者可以系统性地观察模型能力随上下文长度的衰减曲线。

RULER 的核心贡献在于用可控、可重复的方式量化了"上下文长度声称值"与"有效上下文长度"之间的差距——后者是模型真正能可靠利用的上下文范围。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2024 |
| 大小 | 待核实（依任务类型和长度配置动态生成） |
| 题目格式 | 多种任务（检索、多跳推理、聚合、问答） |
| 覆盖领域 | 长上下文、推理、检索 |
| 语言 | 英文 |

## 当前状态

该基准处于 active 状态。由于任务可按上下文长度参数化生成，理论上不易因题目记忆而被污染。随着模型上下文窗口规格持续扩大（部分模型已声称支持 1M token），RULER 的高端测试配置仍有评测价值。饱和阈值设为 80%，当前多数顶级模型在 4K-16K 段表现尚可，但在 64K 以上长度下性能普遍下滑明显（具体数值以各模型论文为准）。

## 主要局限

- **合成任务与真实场景存在差距**：RULER 的部分任务（如在大量填充文本中检索特定字符串）属于合成构造，与用户真实使用长上下文的场景不完全等价。
- **填充文本质量影响结果**：Needle-in-a-haystack 类任务对填充文本的选择敏感，若填充文本与关键信息存在语义关联，会影响结果的可解释性。
- **缺乏标准化排行榜**：RULER 尚无被广泛认可的统一排行榜，各方测试结果需注意配置是否一致。

## 相关页面

- [[LongBench-v2]]
- [[LongBench-v2]]
- [[data-contamination]]
