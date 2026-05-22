---
title: MT-Bench-101
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- dialog
- instruction-following
language: en
year: 2024
authors: []
arxiv_id: '2402.14762'
official_url: https://github.com/mtbench101/mt-bench-101
license: Apache-2.0
size: 1388
format: dialog
status: active
saturation_threshold: 0.9
sources: []
dimension: B
sota:
- score: '9.72'
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://arxiv.org/abs/2402.14762
  notes: MT-Bench-101 GPT-4 judge score (1-10)
- score: '9.65'
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://arxiv.org/abs/2402.14762
  notes: score (1-10)
- score: '9.58'
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://arxiv.org/abs/2402.14762
  notes: score (1-10)
- score: '9.50'
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://arxiv.org/abs/2402.14762
  notes: score (1-10)
- score: '9.18'
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://arxiv.org/abs/2402.14762
  notes: score (1-10), 2024 baseline
---

# MT-Bench-101

> 多轮对话细粒度评测基准，包含 1,388 道对话轮次，通过 LLM-as-Judge 对多轮对话能力进行精细化评测。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2402.14762](https://arxiv.org/abs/2402.14762)
- **官方主页**: [https://github.com/mtbench101/mt-bench-101](https://github.com/mtbench101/mt-bench-101)

<!-- AUTO-LINKS:END -->

## 概述

MT-Bench-101 是对原版 MT-Bench（80 道题）的大规模扩展，专注于多轮对话能力的细粒度评测。原版 MT-Bench 仅有 80 道问题，统计稳定性有限；MT-Bench-101 通过扩大规模和细化任务类型，提供了更全面的多轮对话评测框架。

MT-Bench-101 的设计重点包括：
- **多轮依赖**：后续轮次的问题基于前轮对话上下文，测试模型的上下文跟踪能力
- **细粒度能力分类**：将多轮对话能力细分为多个子维度，如主题连贯性、指令修改响应、错误纠正、知识迁移等
- **扩展规模**：1,388 道对话轮次（约 101 组对话），显著提升统计可靠性

评测使用 GPT-4 作为 Judge，对每个回答在准确性、帮助性和连贯性等维度进行 1-10 分的评分。

MT-Bench-101 针对当前对话助手在多轮交互中的常见失败模式进行了专门设计，例如：遗忘先前约束、无法处理主题转换、对修改请求响应不当等。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2024 |
| 数据量 | 1,388 道对话轮次 |
| 格式 | 多轮对话（LLM-as-Judge 评分） |
| 领域 | 多轮对话 |
| 语言 | 英文 |
| 许可证 | Apache-2.0 |
| 对话组数 | 约 101 组 |

## SOTA 表现

顶尖大型语言模型（GPT-4o、Claude 3.5 Sonnet 等）在 MT-Bench-101 上的平均分超过 8.0/10。具体最新成绩见 GitHub 排行榜。


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 9.72 | MT-Bench-101 GPT-4 judge score (1-10) | 2025-09 | [link](https://arxiv.org/abs/2402.14762) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 9.65 | score (1-10) | 2026-04 | [link](https://arxiv.org/abs/2402.14762) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 9.58 | score (1-10) | 2026-03 | [link](https://arxiv.org/abs/2402.14762) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 9.50 | score (1-10) | 2026-02 | [link](https://arxiv.org/abs/2402.14762) |
| 5 | [[GPT-4o]] | 🚫 no | 9.18 | score (1-10), 2024 baseline | 2024-05 | [link](https://arxiv.org/abs/2402.14762) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **依赖 GPT-4 评分**：Judge 偏见和一致性问题依然存在
- **多轮依赖链**：前轮错误可能级联影响后续评测结果
- **规模仍有限**：相比单轮评测，101 组对话在领域覆盖上仍有限
- **英文为主**：不覆盖多语言多轮对话能力
- **上下文长度需求**：长对话历史对短上下文窗口模型不公平

## 相关页面

- [[MT-Bench]]
- [[AlpacaEval]]
- [[WildBench]]
- [[FLASK]]
- [[CoQA]]
