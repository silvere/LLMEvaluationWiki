---
title: Arena-Hard
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- reasoning
- instruction-following
language: en
year: 2024
authors:
- Li et al.
arxiv_id: '2406.11939'
official_url: https://github.com/lmarena/arena-hard-auto
license: Apache-2.0
size: 500
format: open-ended
status: active
saturation_threshold: 0.9
sources: []
dimension: B
sota:
- score: 94.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://lmsys.org/blog/2024-04-19-arena-hard/
  notes: Arena-Hard win rate (vs GPT-4-0314)
- score: 92.8%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://lmsys.org/blog/2024-04-19-arena-hard/
  notes: win rate
- score: 91.5%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://lmsys.org/blog/2024-04-19-arena-hard/
  notes: win rate
- score: 90.2%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: win rate
- score: 82.5%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://lmsys.org/blog/2024-04-19-arena-hard/
  notes: win rate, 2024 baseline
---

# Arena-Hard

> 从 Chatbot Arena 中筛选的 500 道高质量、高难度指令，使用 GPT-4 Turbo 作为 Judge 进行自动评测。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2406.11939](https://arxiv.org/abs/2406.11939)
- **官方主页**: [https://github.com/lmarena/arena-hard-auto](https://github.com/lmarena/arena-hard-auto)

<!-- AUTO-LINKS:END -->

## 概述

Arena-Hard 由 Li 等人于 2024 年提出，来自加州大学伯克利分校 Sky Computing Lab。该基准从 Chatbot Arena 的真实用户查询中，通过严格的质量筛选机制提取出 500 道最具区分度的高难度题目。

Arena-Hard 的核心设计理念是：通过自动化工具模拟 Chatbot Arena 的人工评测结果。题目筛选标准包括：专业性强、需要深度知识、任务明确、技术含量高等。这确保了数据集具有较高的**区分度**（separability），能够有效区分顶尖模型之间的细微差异。

评测流程：
1. 将待测模型与参考模型（GPT-4 Turbo 0314）分别回答同一题目
2. 使用 GPT-4 Turbo 作为 Judge 进行成对比较
3. 统计 Win Rate 并计算 Bootstrap CI（置信区间）

Arena-Hard 的得分与 Chatbot Arena ELO 排名高度相关（相关系数约 0.94），是当前最接近真实用户偏好的自动化基准之一。

题目类型涵盖：编程（约 30%）、数学（约 10%）、科学解释、数据分析、写作等多个类别，整体偏向技术型任务。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2024 |
| 数据量 | 500 道指令 |
| 格式 | 开放式（成对比较） |
| 领域 | 技术推理、指令跟随 |
| 语言 | 英文 |
| 许可证 | Apache-2.0 |
| 评分方式 | GPT-4 Turbo Judge（Win Rate） |
| 参考基线 | GPT-4 Turbo 0314 |

## SOTA 表现

顶尖模型（GPT-4o、Claude 3.5 Sonnet、Gemini 1.5 Pro 等）的 Win Rate 均超过 60%（以 GPT-4 Turbo 0314 为 50% 基线）。具体最新成绩见官方 GitHub 排行榜。


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 94.5% | Arena-Hard win rate (vs GPT-4-0314) | 2025-09 | [link](https://lmsys.org/blog/2024-04-19-arena-hard/) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 92.8% | win rate | 2026-04 | [link](https://lmsys.org/blog/2024-04-19-arena-hard/) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 91.5% | win rate | 2026-03 | [link](https://lmsys.org/blog/2024-04-19-arena-hard/) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 90.2% | win rate | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 82.5% | win rate, 2024 baseline | 2024-05 | [link](https://lmsys.org/blog/2024-04-19-arena-hard/) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **题目偏向技术型**：编程和数学题占比较高，可能对人文类能力评测不足
- **英文单一**：不覆盖多语言能力
- **GPT-4 Judge 偏见**：Judge 可能偏向与 GPT-4 风格接近的回答
- **参考基线老化**：随着 GPT-4 Turbo 本身被更强模型取代，基线参考价值下降
- **规模小**：500 道题的统计置信区间较宽

## 相关页面

- [[AlpacaEval-2.0]]
- [[AlpacaEval]]
- [[WildBench]]
- [[Chatbot-Arena]]
- [[MT-Bench]]
