---
title: "AIME"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
domain: [math, reasoning]
language: en
year: 1983
authors: []
arxiv_id: ""
official_url: "https://artofproblemsolving.com/wiki/index.php/AIME_Problems_and_Solutions"
license: ""
size: 0
format: open-ended
status: active
saturation_threshold: 0.85
sources: [""]
---

# AIME（American Invitational Mathematics Examination）

> 美国高中数学邀请赛题目构成的评测基准，每年更新，天然抗污染，是当前区分顶级模型数学推理能力的核心指标。

## 概述

AIME 即美国数学邀请赛，自 1983 年起每年举办，由美国数学竞赛（AMC）组织出题。作为 LLM 评测基准，AIME 题目直接来自官方年度竞赛，每年新增 30 道题（AIME I 和 AIME II 各 15 题），答案均为 0 至 999 之间的整数，无法通过选择题猜测获益。题目覆盖代数、几何、数论、概率、组合数学等高中竞赛数学的核心领域。

AIME 成为主流 LLM 评测基准的关键背景是：GSM8K 和 MATH 相继饱和后，业界需要更能反映顶级模型数学推理上限的评测标准。AIME 的高难度（人类参赛者平均得分约为满分 15 分中的 3-5 分）和每年更新的特性，使其成为目前最重要的数学评测基准之一。由于新题每年由 AMC 官方出题，训练截止日期之后的新题对模型构成真实挑战，有效缓解了数据污染问题。

模型在 AIME 上的进步轨迹也是大模型数学能力飞跃最直观的证明之一：早期 GPT-4o 仅能解答约 9.3% 的题目，而 o1 达到 74.4%，此后各前沿模型持续刷新记录，Gemini 2.5 Pro 等模型达到 95%（无工具辅助），部分模型配合代码执行工具甚至达到 100%。这一进步速度本身也引发了对"AIME 是否会像 MATH 一样快速饱和"的讨论。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 1983 年起（每年持续更新） |
| 大小 | 动态增长（每年新增约 30 题） |
| 题目格式 | 开放性（0-999 整数答案，open-ended） |
| 覆盖领域 | 数学、推理（代数、几何、数论、概率、组合） |
| 语言 | 英文 |
| 许可证 | 待更新（AMC 官方版权） |

## SOTA 表现

- GPT-4o：约 9.3%
- o1：约 74.4%
- Gemini 2.5 Pro（无工具）：约 95%
- Gemini 2.5 Pro（含代码执行）：约 100%
- Seed2.0 Pro：约 98.3%

（以上分数来源于各机构发布的技术报告，具体评测条件（题目年份、轮次、工具使用）请参阅原始来源）

## 主要挑战与局限

- **潜在饱和风险**：顶级模型在 AIME 上的分数增长速度极快，部分模型已接近满分。若此趋势持续，AIME 也可能在数年内达到饱和，届时需要更高难度的竞赛题（如 IMO 级别）作为接替。
- **评测年份依赖性**：不同模型报告的 AIME 分数往往基于不同年份的题目（如 AIME 2024 vs AIME 2025），直接对比需确认题目集完全一致，否则难度差异影响可比性。
- **工具使用条件不统一**：部分评测允许代码执行（Python 解题）、搜索或多轮迭代，部分仅允许直接生成，不同条件下的分数差异悬殊，跨报告比较时需特别注意评测协议。

## 相关页面

- [[MATH]]
- [[GSM8K]]
- [[benchmark-saturation]]
