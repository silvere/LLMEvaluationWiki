---
title: "LiveCodeBench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
domain: [code]
language: en
year: 2024
authors: []
arxiv_id: ""
official_url: "https://livecodebench.github.io"
license: ""
size: 0
format: code
status: active
saturation_threshold: 0.70
sources: [""]
---

# LiveCodeBench

> 持续从竞赛平台收集比赛后新题的动态代码评测基准，天然抗污染，揭示了模型在 HumanEval 上的高分与真实代码能力之间的差距。

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

## 主要挑战与局限

- **评测一致性问题**：由于数据集持续更新，不同时间点的评测基于不同的题目集，跨时间的分数对比需注意题目集不完全相同带来的可比性问题；时间窗口的选取对最终分数影响显著。
- **难度分布不均**：题目来自多个竞赛平台，不同平台的难度标准和题目风格存在差异，竞赛题目的整体难度分布并不一定与实际工程场景相符，对特定类型推理能力的评测可能存在偏向。
- **竞赛题目偏差**：题目主要来自算法竞赛，侧重数据结构与算法实现，对工程类代码能力（如系统设计、API 调用、调试现有代码）的覆盖几乎为零，不能全面代表实际软件开发能力。

## 相关页面

- [[HumanEval]]
- [[SWE-bench-Verified]]
- [[data-contamination]]
- [[benchmark-saturation]]

## 主流模型得分（来自 wiki/models/）

> 以下分数来自 wiki/models/ 中各模型的官方/技术报告数据（汇总自 model spec 页）。准确数字以模型方公布为准。

| 模型 | 分数 | 备注 |
|------|------|------|
| [[Gemini-2.5-Pro|Gemini 2.5 Pro]] | 约 80% |  |
| [[Qwen3|Qwen3 系列（235B-A22B / 32B / Thinking）]] | 约 70% |  |
| [[Kimi-K2|Kimi K2]] | 约 53.7% |  |
| [[Llama-4|Llama 4 (Maverick / Scout)]] | 约 43.4% |  |
| [[Gemini-2.0-Flash|Gemini 2.0 Flash]] | 约 36% |  |
