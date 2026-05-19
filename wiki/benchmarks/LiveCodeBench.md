---
title: "LiveCodeBench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
domain: [code]
language: en
year: 2024
authors: ["Naman Jain", "King Han", "Alex Gu", "Wen-Ding Li", "Fanjia Yan", "Tianjun Zhang", "Sida Wang", "Armando Solar-Lezama", "Koushik Sen", "Ion Stoica"]
arxiv_id: "2403.07974"
official_url: "https://livecodebench.github.io"
official_leaderboard: "https://livecodebench.github.io/leaderboard.html"
license: "MIT"
size: 600
format: code
saturation_status: active
sources:
  - "https://arxiv.org/abs/2403.07974"
  - "https://livecodebench.github.io/"
  - "https://github.com/livecodebench/livecodebench"
evaluation_protocol:
  default_shots: "0-shot"
  default_cot: true
  tool_use: false
  scoring: "pass@1（部分变体支持 pass@5）"
  time_filter: "按题目发布日期过滤，仅评测模型 cutoff 之后的题"
pitfalls:
  - "**必须报告时间窗**：'LiveCodeBench 80%' 没意义，必须说 '2024-08 之后题目 80%'，否则无法排除污染"
  - "数据来源 LeetCode/AtCoder/CodeForces，仍以英文 + 算法竞赛风格为主，对工程任务代表性不足（应结合 SWE-bench）"
  - "模型 cutoff 内的题分数会被记忆污染，cutoff 后题分数显著下降——这正是 LiveCodeBench 的设计核心"
  - "题目持续更新（约每月），不同时间快照的分数不可直接对比，引用时必须说明 leaderboard 版本"
sota:
  - score: "约 80%"
    model: "Gemini-2.5-Pro"
    harness: null
  - score: "约 70%"
    model: "Qwen3"
    harness: null
  - score: "约 53.7%"
    model: "Kimi-K2"
    harness: null
  - score: "约 43.4%"
    model: "Llama-4"
    harness: null
  - score: "约 36%"
    model: "Gemini-2.0-Flash"
    harness: null
---

# LiveCodeBench

> 持续从竞赛平台收集比赛后新题的动态代码评测基准，天然抗污染，揭示了模型在 HumanEval 上的高分与真实代码能力之间的差距。

<!-- AUTO-LINKS:START -->

## 参考链接

- **官方主页**: [https://livecodebench.github.io](https://livecodebench.github.io)

<!-- AUTO-LINKS:END -->

## 概述

LiveCodeBench 于 2024 年发布，核心设计理念是"动态基准"（Live Benchmark）：持续自动从 LeetCode、AtCoder、Codeforces 等主流竞赛平台收集每次比赛结束后公开发布的新题，并以时间戳为维度追踪不同模型在不同时期新题上的表现。由于题目均来自模型训练截止日期之后的新竞赛，数据污染问题从根本上得到缓解，而非依赖人工去污染操作。

LiveCodeBench 的重要发现之一是揭示了"HumanEval 高分陷阱"：在 HumanEval 上排名靠前的模型，在 LiveCodeBench 上的相对表现往往并不一致，甚至出现排名倒置。这一差异表明，HumanEval 上的高分部分来自对特定题目模式的过拟合（包括数据污染和分布偏差），而非真正泛化的代码推理能力。LiveCodeBench 由此成为更可信赖的代码能力评测参照。

数据集规模持续增长（随新竞赛不断扩充），覆盖多种编程语言（主要为 Python，也包含 C++、Java 等），难度分布从竞赛入门级到高难度算法题不等，与实际竞赛场景高度匹配。评测使用自动化测试用例验证代码正确性，指标与 HumanEval 的 pass@k 框架兼容。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2024（持续更新） |
| 大小 | 动态增长（持续从竞赛平台收集新题） |
| 题目格式 | 代码生成（多编程语言，测试用例验证） |
| 覆盖领域 | 代码（竞赛算法题，多语言） |
| 语言 | 英文（题目描述），代码多语言 |
| 许可证 | 待更新 |

## SOTA 表现

- 顶级模型（2024-2025 年）：待更新


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | 分数 | 备注 |
|---|---|---|---|
| 🥇 | [[Gemini-2.5-Pro]] | 约 80% |  |
| 🥈 | [[Qwen3]] | 约 70% |  |
| 🥉 | [[Kimi-K2]] | 约 53.7% |  |
| 4 | [[Llama-4]] | 约 43.4% |  |
| 5 | [[Gemini-2.0-Flash]] | 约 36% |  |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **评测一致性问题**：由于数据集持续更新，不同时间点的评测基于不同的题目集，跨时间的分数对比需注意题目集不完全相同带来的可比性问题；时间窗口的选取对最终分数影响显著。
- **难度分布不均**：题目来自多个竞赛平台，不同平台的难度标准和题目风格存在差异，竞赛题目的整体难度分布并不一定与实际工程场景相符，对特定类型推理能力的评测可能存在偏向。
- **竞赛题目偏差**：题目主要来自算法竞赛，侧重数据结构与算法实现，对工程类代码能力（如系统设计、API 调用、调试现有代码）的覆盖几乎为零，不能全面代表实际软件开发能力。

## 相关页面

- [[HumanEval]]
- [[SWE-bench-Verified]]
- [[data-contamination]]
- [[benchmark-saturation]]

