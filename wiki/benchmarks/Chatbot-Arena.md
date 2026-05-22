---
title: Chatbot Arena
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-19'
last_verified: '2026-05-22'
domain:
- dialog
- instruction-following
- reasoning
language: multilingual
year: 2023
authors:
- LMSYS Org (UC Berkeley)
arxiv_id: '2403.04132'
official_url: https://lmarena.ai/
official_leaderboard: https://lmarena.ai/leaderboard
license: ''
size: 6000000
format: pairwise-preference
saturation_status: active
sources:
- https://lmarena.ai/
- https://arxiv.org/abs/2403.04132
- https://news.lmarena.ai/series-a/
evaluation_protocol:
  scoring: Bradley-Terry (Elo-like)
  default_shots: user-defined
  default_cot: false
  tool_use: false
sota:
- score: '1504'
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://benchlm.ai/llm-leaderboard-history
  notes: Arena ELO（Text），with extended thinking，lmarena.ai 榜首
- score: '1493'
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.promptt.dev/blog/lmsys-chatbot-arena-leaderboard-2026
  notes: Arena ELO（Text），Gemini 3.1 Pro Preview
- score: '1484'
  model: GPT-5
  harness: null
  with_tools: false
  date: 2026-04
  source: https://benchlm.ai/llm-leaderboard-history
  notes: Arena ELO（Text），GPT-5.4 High
- score: '1470'
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://aidevdayindia.org/blogs/lmsys-chatbot-arena-current-rankings/
  notes: Arena ELO（Text），standard（无扩展 thinking）
- score: '1465'
  model: GPT-5.5
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.swfte.com/lmsys-leaderboard
  notes: Arena ELO（Text）
dimension: B
---

# Chatbot Arena（LMSYS）

> 基于真实用户盲测投票的模型能力排行榜，已成为业界衡量对话助手综合质量的事实标准。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Claude-Opus-4.7]] | 🚫 no | 1504 | Arena ELO（Text），with extended thinking，lmarena.ai 榜首 | 2026-04 | [link](https://benchlm.ai/llm-leaderboard-history) |
| 🥈 | [[Gemini-3.1-Pro]] | 🚫 no | 1493 | Arena ELO（Text），Gemini 3.1 Pro Preview | 2026-04 | [link](https://www.promptt.dev/blog/lmsys-chatbot-arena-leaderboard-2026) |
| 🥉 | [[GPT-5]] | 🚫 no | 1484 | Arena ELO（Text），GPT-5.4 High | 2026-04 | [link](https://benchlm.ai/llm-leaderboard-history) |
| 4 | [[Claude-Opus-4.7]] | 🚫 no | 1470 | Arena ELO（Text），standard（无扩展 thinking） | 2026-04 | [link](https://aidevdayindia.org/blogs/lmsys-chatbot-arena-current-rankings/) |
| 5 | [[GPT-5.5]] | 🚫 no | 1465 | Arena ELO（Text） | 2026-04 | [link](https://www.swfte.com/lmsys-leaderboard) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2403.04132](https://arxiv.org/abs/2403.04132)
- **官方主页**: [https://chat.lmsys.org](https://chat.lmsys.org)

<!-- AUTO-LINKS:END -->

## 概述

Chatbot Arena 由 LMSYS Org（UC Berkeley）于 2023 年发布并持续运营。其核心机制是众包盲测：用户向两个匿名模型发送同一问题，看到双方回答后选择哪个更好（或平局）。每次对战的结果通过 Bradley-Terry 模型（早期为 online Elo）汇总为全局排名，模型身份在用户投票后才揭晓。截至 2025-09 累计 3.5M+ 真人对战投票（覆盖 400+ 模型），到 2026 已超 6M+。2026-01 母公司 [[LMSYS|LMArena]] 完成 $150M Series A、估值 $1.7B，并整体品牌更名为 Arena；月活用户 500 万+，月对话量 60M+。

Chatbot Arena 的设计理念是让真实用户在真实使用场景中评判，而非依赖专家标注或预设题库。这使其能覆盖各类用户关心的任务，包括写作、编程、数学、创意生成、多语言对话等。由于问题由用户自由提出，分布反映了真实的使用需求，而非研究者的主观假设。

该平台影响力已远超学术范畴。主流 AI 实验室在发布新模型时普遍引用 Arena Elo 分数作为"用户偏好"维度的外部验证。Arena 排行榜第 1 和第 10 名之间的 Elo 差距已从 2023 年的 11.9% 收窄至 2025 年的 5.4%，说明顶级模型之间的用户可感知差异正在趋同。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023（持续运营） |
| 大小 | 3.5M+ 票 / 400+ 模型（2025-09 官方）→ 6M+ 票（2026 累计） |
| 月活用户 | 500 万+ / 150 国 / 月对话量 60M+（2026 Series A 披露） |
| 题目格式 | 人类偏好投票（盲测 A/B 对比） |
| 评分模型 | Bradley-Terry（早期 online Elo） |
| 覆盖领域 | 对话、指令遵循、推理（用户自由提问） |
| 语言 | 多语言（英语主导） |

## 当前状态

该基准处于 active 状态，持续接收新投票和新模型。由于问题来自真实用户，不存在传统意义上的数据污染问题，但存在投票操纵风险（模型供应商可能组织定向投票）。顶级模型 Elo 得分差距已收窄，用 Arena 单一指标区分头部模型的能力下降。

## 主要局限

- **投票操纵风险**：平台开放注册，模型提供方有能力组织大规模定向投票，已有公开讨论质疑部分模型排名可信度。
- **样本选择偏差**：用户群体以英语母语、技术背景为主，提问分布不能代表全球多元用户需求；少数语言、专业领域（如医疗、法律）的覆盖比例偏低。
- **长尾能力盲区**：Arena 的主流问题集中在通用对话，对代码正确性、数学推理、安全性等需要客观判断的任务，人类投票者本身的判断准确性存疑。

## 相关页面

- [[MT-Bench]]
- [[IFEval]]
- [[llm-as-judge]]
- [[benchmark-saturation]]

