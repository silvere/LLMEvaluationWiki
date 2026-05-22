---
title: WildBench
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- instruction-following
- reasoning
language: en
year: 2024
authors:
- Lin et al.
arxiv_id: '2406.04770'
official_url: https://huggingface.co/spaces/allenai/WildBench
license: Apache-2.0
size: 1024
format: open-ended
status: active
saturation_threshold: 0.9
sources: []
dimension: B
sota:
- score: 50.8%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://huggingface.co/spaces/allenai/WildBench
  notes: WB-Reward score, GPT-4o judge
- score: 48.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://huggingface.co/spaces/allenai/WildBench
  notes: WB-Reward score, GPT-4o judge
- score: 46.2%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://huggingface.co/spaces/allenai/WildBench
  notes: WB-Reward score
- score: 44.8%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://huggingface.co/spaces/allenai/WildBench
  notes: WB-Reward score
- score: 40.5%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://huggingface.co/spaces/allenai/WildBench
  notes: WB-Reward score, 2024 baseline
---

# WildBench

> 基于真实用户查询的复杂指令评测基准，使用 GPT-4 Turbo 进行细粒度 LLM-as-Judge 评分。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2406.04770](https://arxiv.org/abs/2406.04770)
- **官方主页**: [https://huggingface.co/spaces/allenai/WildBench](https://huggingface.co/spaces/allenai/WildBench)

<!-- AUTO-LINKS:END -->

## 概述

WildBench 由 Lin 等人于 2024 年提出，来自 Allen Institute for AI（AI2）。该基准的核心特点是使用**真实用户**在 WildChat 平台上提交的实际查询，确保评测内容反映真实的使用场景和需求，而非人工设计的题目。

WildBench 从 WildChat 数据集中筛选出 1,024 道具有代表性的高难度、多样化查询。筛选标准包括：任务复杂度高、覆盖多种类型（包含单轮和多轮对话）、以及对多个顶尖模型的区分度高。

评测方法采用两种互补的 Judge 策略：
1. **WB-Score**：GPT-4 Turbo 对每个回答给出独立打分（1-10）
2. **WB-Reward**：成对比较，判断哪个回答更好

WildBench 的重要贡献是引入了**细粒度的评分标准**：Judge 不仅给出分数，还针对每种任务类型使用专门的评分准则，减少了评测偏差。

数据集涵盖多种真实任务类型：代码生成、写作辅助、问题解答、数学推理、数据分析等，其分布更贴近真实用户的多样化需求。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2024 |
| 数据量 | 1,024 道查询 |
| 格式 | 开放式（评分 + 成对比较） |
| 领域 | 多样化真实指令 |
| 语言 | 英文 |
| 许可证 | Apache-2.0 |
| 数据来源 | WildChat 真实用户查询 |
| 评分方式 | GPT-4 Turbo Judge |

## SOTA 表现

顶尖模型（GPT-4o、Claude 3.5 Sonnet 等）在 WildBench 上的 WB-Score 超过 7.0/10，WB-Reward 胜率超过 60%。具体最新成绩见官方 HuggingFace 排行榜。


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 50.8% | WB-Reward score, GPT-4o judge | 2025-09 | [link](https://huggingface.co/spaces/allenai/WildBench) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 48.5% | WB-Reward score, GPT-4o judge | 2026-04 | [link](https://huggingface.co/spaces/allenai/WildBench) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 46.2% | WB-Reward score | 2026-03 | [link](https://huggingface.co/spaces/allenai/WildBench) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 44.8% | WB-Reward score | 2026-02 | [link](https://huggingface.co/spaces/allenai/WildBench) |
| 5 | [[GPT-4o]] | 🚫 no | 40.5% | WB-Reward score, 2024 baseline | 2024-05 | [link](https://huggingface.co/spaces/allenai/WildBench) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **真实用户分布偏差**：WildChat 用户可能不代表所有用户群体（偏向英语技术用户）
- **动态基准问题**：真实用户查询分布会随时间变化
- **GPT-4 Judge 偏见**：细粒度评分仍依赖 GPT-4，引入其固有偏见
- **评测成本较高**：1,024 道题 × 成对比较的 API 调用成本较大
- **英文为主**：尽管包含少量其他语言，主要覆盖英文场景

## 相关页面

- [[ArenaHard]]
- [[AlpacaEval-2.0]]
- [[MT-Bench]]
- [[Chatbot-Arena]]
- [[FLASK]]
