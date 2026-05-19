---
title: "MATH"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
domain: [math, reasoning]
language: en
year: 2021
authors: ["Dan Hendrycks", "Collin Burns", "Saurav Kadavath", "Akul Arora", "Steven Basart", "Eric Tang", "Dawn Song", "Jacob Steinhardt"]
arxiv_id: "2103.03874"
official_url: "https://github.com/hendrycks/math"
official_leaderboard: "https://paperswithcode.com/sota/math-word-problem-solving-on-math"
license: "MIT"
size: 12500
format: open-ended
saturation_status: saturated
sources:
  - "https://arxiv.org/abs/2103.03874"
  - "https://github.com/hendrycks/math"
evaluation_protocol:
  default_shots: "0-shot 或 4-shot CoT（推理模型默认 0-shot）"
  default_cot: true
  tool_use: false
  scoring: "exact-match accuracy（数值答案对比）"
pitfalls:
  - "**MATH ≠ MATH-500**：原 MATH 12,500 题、MATH-500 是 OpenAI o1 引入的 500 题子集，分数差异较大，跨论文必须确认"
  - "饱和：MATH-500 顶级模型 ≥97%（DeepSeek-R1 97.3%），无区分度，应替换为 [[AIME]] / [[FrontierMath]]"
  - "答案提取脚本敏感：模型输出 \\boxed{...} 还是末行答案差异大，不同评测框架（lm-evaluation-harness / OpenAI eval）的提取规则不一致"
  - "训练数据污染严重：MATH 已在公开训练语料数年，所有主流 base model 几乎确定见过"
  - "中文报告时常把 MATH-500 误称为 MATH，跨语言对比前必须确认 variant"
sota:
  - score: "97.3%"
    model: "DeepSeek-R1"
    harness: null
    notes: "500"
  - score: "96.2%"
    model: "Kimi-K1.5"
    harness: null
    notes: "500"
  - score: "94.8%"
    model: "o1"
    harness: null
  - score: "90.2%"
    model: "DeepSeek-V3"
    harness: null
    notes: "500"
  - score: "约 89.7%"
    model: "Gemini-2.0-Flash"
    harness: null
  - score: "约 78%"
    model: "Doubao-1.5-Pro"
    harness: null
  - score: "约 77%"
    model: "Llama-3.3-70B"
    harness: null
  - score: "76.6%"
    model: "GPT-4o"
    harness: null
  - score: "约 75%"
    model: "Yi-Lightning"
    harness: null
  - score: "67.7%"
    model: "Gemini-1.5-Pro"
    harness: null
---

# MATH（Mathematics Assessment）

> 竞赛级数学评测基准，覆盖 AMC/AIME 难度的代数、几何、数论等题目，2024 年后顶级模型已达 90%+。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2103.03874](https://arxiv.org/abs/2103.03874)
- **官方主页**: [https://github.com/hendrycks/math](https://github.com/hendrycks/math)

<!-- AUTO-LINKS:END -->

## 概述

MATH 由 Hendrycks 等人于 2021 年发布，共包含 12,500 道数学题，按难度分为 5 级（Level 1 至 Level 5），覆盖预代数、代数、几何、数论、概率论、微积分预备等核心数学领域。题目来源于 AMC（美国数学竞赛）、AIME（美国数学邀请赛）等权威竞赛，代表了高中数学竞赛难度的上限。

与 GSM8K 的小学水平相比，MATH 难度数量级更高。原始论文发布时，当时最先进的模型在测试集上的准确率仅约 5%，Level 5 难度题对所有模型几乎无解，这使其成为 2021-2023 年间数学推理能力突破进展的核心评测平台。题目答案以 LaTeX 格式书写，评测依赖精确匹配或基于规则的等价判断，有时存在评分误差。

随着 2024 年推理增强型模型的崛起（如使用强化学习训练的模型），MATH 基准也随之快速饱和。顶级模型已达到 90%+ 的准确率，Level 1-4 的题目对前沿模型几乎没有挑战，Level 5 的难题成为剩余区分力的主要来源。目前 MATH 作为标准评测项仍被广泛报告，但对前沿模型的区分能力已明显减弱，AIME 等更高难度竞赛题正在成为新的数学推理评测主流。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2021 |
| 大小 | 12,500 题（5 个难度级别） |
| 题目格式 | 开放性数学题（open-ended，LaTeX 答案） |
| 覆盖领域 | 数学、推理（代数、几何、数论、概率、微积分预备等） |
| 语言 | 英文 |
| 许可证 | MIT |

## SOTA 表现

- 顶级模型（2024-2025 年）：90%+（各主流前沿推理模型）


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | 分数 | 备注 |
|---|---|---|---|
| 🥇 | [[DeepSeek-R1]] | 97.3% | 500 |
| 🥈 | [[Kimi-K1.5]] | 96.2% | 500 |
| 🥉 | [[o1]] | 94.8% |  |
| 4 | [[DeepSeek-V3]] | 90.2% | 500 |
| 5 | [[Gemini-2.0-Flash]] | 约 89.7% |  |
| 6 | [[Doubao-1.5-Pro]] | 约 78% |  |
| 7 | [[Llama-3.3-70B]] | 约 77% |  |
| 8 | [[GPT-4o]] | 76.6% |  |
| 9 | [[Yi-Lightning]] | 约 75% |  |
| 10 | [[Gemini-1.5-Pro]] | 67.7% |  |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **接近饱和**：顶级模型已突破 90%，对前沿模型的区分力大幅下降。剩余挑战主要集中在 Level 5 最难题，整体基准已不足以充分评测当前最强模型的数学能力上限。
- **评分可靠性问题**：答案以 LaTeX 格式书写，自动评分依赖字符串匹配或规则等价判断，不同书写形式（如 $\frac{1}{2}$ 与 $0.5$）可能导致等价正确答案被误判为错误，引入评分噪声。
- **数据污染隐患**：题目来自公开竞赛数据，已存在多年，前沿模型的训练数据中可能包含原题。

## 相关页面

- [[GSM8K]]
- [[AIME]]
- [[benchmark-saturation]]
- [[data-contamination]]

