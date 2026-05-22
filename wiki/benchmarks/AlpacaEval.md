---
title: AlpacaEval
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- instruction-following
language: en
year: 2023
authors:
- Li et al.
arxiv_id: '2305.14387'
official_url: https://tatsu-lab.github.io/alpaca_eval/
license: Apache-2.0
size: 805
format: open-ended
status: active
saturation_threshold: 0.9
sources: []
dimension: B
sota:
- score: 98.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://tatsu-lab.github.io/alpaca_eval/
  notes: AlpacaEval 1.0 win rate vs text-davinci-003
- score: 97.8%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://tatsu-lab.github.io/alpaca_eval/
  notes: win rate
- score: 97.2%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://tatsu-lab.github.io/alpaca_eval/
  notes: win rate
- score: 96.5%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: win rate
- score: 93.0%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://tatsu-lab.github.io/alpaca_eval/
  notes: win rate, 2024 baseline
---

# AlpacaEval

> 基于 LLM-as-Judge 的指令跟随能力自动评测框架，以 Win Rate（对比 text-davinci-003）为核心指标。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2305.14387](https://arxiv.org/abs/2305.14387)
- **官方主页**: [https://tatsu-lab.github.io/alpaca_eval/](https://tatsu-lab.github.io/alpaca_eval/)

<!-- AUTO-LINKS:END -->

## 概述

AlpacaEval 由 Li 等人于 2023 年提出，来自斯坦福大学（与 Alpaca 项目相关）。该评测框架的核心创新是将**成对比较**（pairwise comparison）与**LLM-as-Judge**结合，为指令跟随能力提供快速、低成本的自动化评测方案。

评测集包含 805 道多样化指令，来源于多个数据集（Self-Instruct、Open Assistant、Dolly、HH-RLHF 等）。评测流程如下：
1. 将待测模型与参考模型（原版为 text-davinci-003）分别回答同一指令
2. 使用 GPT-4 作为 Judge，判断哪个回答更好
3. 统计待测模型"胜出"的比例，即 **Win Rate**

AlpacaEval 的优势在于自动化程度高、评测成本低，且与人工评测（如 Chatbot Arena）有较高相关性。它迅速成为评测指令微调模型能力的流行工具。

然而，随着模型能力的提升，Win Rate 指标出现了**长度偏差**：更长的回答往往被 GPT-4 评为更好，导致模型可以通过生成冗长回答而虚增得分。这一问题在 AlpacaEval 2.0 中通过引入 Length-Controlled Win Rate 得到改进。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 数据量 | 805 道指令 |
| 格式 | 开放式（成对比较） |
| 领域 | 指令跟随 |
| 语言 | 英文 |
| 许可证 | Apache-2.0 |
| 评分方式 | GPT-4 Judge（Win Rate vs text-davinci-003） |

## SOTA 表现

顶尖模型（GPT-4o、Claude 3.5 Sonnet 等）的原始 Win Rate 均超过 90%，而 length-controlled win rate 更能体现真实能力差距。具体最新成绩见官方排行榜。


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 98.5% | AlpacaEval 1.0 win rate vs text-davinci-003 | 2025-09 | [link](https://tatsu-lab.github.io/alpaca_eval/) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 97.8% | win rate | 2026-04 | [link](https://tatsu-lab.github.io/alpaca_eval/) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 97.2% | win rate | 2026-03 | [link](https://tatsu-lab.github.io/alpaca_eval/) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 96.5% | win rate | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 93.0% | win rate, 2024 baseline | 2024-05 | [link](https://tatsu-lab.github.io/alpaca_eval/) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **长度偏差**：原始 Win Rate 偏向更长的回答，引发虚假高分
- **参考模型过时**：text-davinci-003 已被淘汰，win rate 数字随参考基准变化而失去可比性
- **GPT-4 Judge 偏见**：Judge 可能偏向特定风格或偏向 GPT-4 自身输出
- **覆盖范围有限**：805 道指令难以覆盖所有使用场景
- **评测成本**：使用 GPT-4 作为 Judge 需要 API 费用

## 相关页面

- [[AlpacaEval-2.0]]
- [[ArenaHard]]
- [[MT-Bench]]
- [[WildBench]]
- [[Chatbot-Arena]]
