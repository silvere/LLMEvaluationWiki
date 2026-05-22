---
title: Arena-Hard-Auto
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-19'
last_verified: '2026-05-22'
sources:
- https://github.com/lmarena/arena-hard-auto
- https://lmsys.org/blog/2024-04-19-arena-hard/
aliases:
- Arena-Hard
- Arena-Hard-Auto
- ArenaHard
domain:
- benchmark
- leaderboard
dimension: A
subdimension: benchmark
sota:
- score: 92.1%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/lm-sys/arena-hard-auto
  notes: Arena-Hard win rate vs GPT-4-0314，2026 frontier
- score: 88.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/lm-sys/arena-hard-auto
  notes: GPT-5 win rate
- score: 87.6%
  model: o3
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/lm-sys/arena-hard-auto
  notes: o3-2025-04-16，CI ±0.9%
- score: 82.7%
  model: o4-mini
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/lm-sys/arena-hard-auto
  notes: o4-mini high，CI ±1.2%
- score: 79.0%
  model: Gemini-2.5-Pro
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/lm-sys/arena-hard-auto
  notes: CI ±1.8%
- score: 68.6%
  model: Gemini-2.5-Flash
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/lm-sys/arena-hard-auto
  notes: CI ±1.6%
- score: 59.8%
  model: Claude-3.7-Sonnet
  harness: null
  with_tools: false
  date: 2026-02
  source: https://github.com/lm-sys/arena-hard-auto
  notes: extended thinking 16k，CI ±1.8%
- score: 58.4%
  model: Qwen3.5
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/lm-sys/arena-hard-auto
  notes: Qwen3-235B-A22B，CI ±2.1%
---

# Arena-Hard-Auto

> [[LMSYS]] / [[Chatbot-Arena]] 团队 2024-04 推出的自动评测 benchmark：通过 BenchBuilder pipeline 从真实 [[Chatbot-Arena]] 对战数据中筛 500 个最有区分度的 hard prompt，由强 LLM-as-judge（GPT-4 / Claude 3.5）打对战，号称对 [[Chatbot-Arena]] human preference 排名的相关性达 89%。是替代 [[MT-Bench]] 的事实标准。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Claude-Opus-4.7]] | 🚫 no | 92.1% | Arena-Hard win rate vs GPT-4-0314，2026 frontier | 2026-04 | [link](https://github.com/lm-sys/arena-hard-auto) |
| 🥈 | [[GPT-5]] | 🚫 no | 88.5% | GPT-5 win rate | 2026-04 | [link](https://github.com/lm-sys/arena-hard-auto) |
| 🥉 | [[o3]] | 🚫 no | 87.6% | o3-2025-04-16，CI ±0.9% | 2026-04 | [link](https://github.com/lm-sys/arena-hard-auto) |
| 4 | [[o4-mini]] | 🚫 no | 82.7% | o4-mini high，CI ±1.2% | 2026-04 | [link](https://github.com/lm-sys/arena-hard-auto) |
| 5 | [[Gemini-2.5-Pro]] | 🚫 no | 79.0% | CI ±1.8% | 2026-04 | [link](https://github.com/lm-sys/arena-hard-auto) |
| 6 | [[Gemini-2.5-Flash]] | 🚫 no | 68.6% | CI ±1.6% | 2026-04 | [link](https://github.com/lm-sys/arena-hard-auto) |
| 7 | [[Claude-3.7-Sonnet]] | 🚫 no | 59.8% | extended thinking 16k，CI ±1.8% | 2026-02 | [link](https://github.com/lm-sys/arena-hard-auto) |
| 8 | [[Qwen3.5]] | 🚫 no | 58.4% | Qwen3-235B-A22B，CI ±2.1% | 2026-04 | [link](https://github.com/lm-sys/arena-hard-auto) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **GitHub**: [https://github.com/lmarena/arena-hard-auto](https://github.com/lmarena/arena-hard-auto)
- **官网**: [https://lmsys.org/blog/2024-04-19-arena-hard/](https://lmsys.org/blog/2024-04-19-arena-hard/)

<!-- AUTO-LINKS:END -->

## 设计

- **BenchBuilder pipeline**：自动聚类 + 难度筛选 + diversity 控制，从 Chatbot Arena 200K+ 历史 prompt 中提炼 500 个
- **评测协议**：模型 vs baseline（默认 GPT-4-0314）pairwise，judge 用 GPT-4-Turbo
- **指标**：win rate + 95% CI
- **成本**：约 $25/run，远低于人工 Arena

## 关键数值

- 与 [[Chatbot-Arena]] 排名相关性 **89%**（[[MT-Bench]] 约 75%）
- 置信区间比 MT-Bench **紧 3x**（500 题 vs MT-Bench 80 题）
- 区分度：能区分 GPT-4 不同版本，MT-Bench 已 saturate

## 衍生

- **Arena-Hard v2**（2025）扩展到 multilingual / coding 子集
- 影响 [[AlpacaEval]] 2.0 等 LLM-judge benchmark 的设计

## 相关页面

- [[Chatbot-Arena]]
- [[LMSYS]]
- [[MT-Bench]]
- [[AlpacaEval]]
- [[llm-as-judge]]
