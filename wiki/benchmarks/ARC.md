---
title: "ARC"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [knowledge, reasoning]
language: en
year: 2018
authors: ["Clark et al."]
arxiv_id: "1803.05457"
official_url: "https://allenai.org/data/arc"
license: "CC-BY-SA-4.0"
size: 7787
format: multiple-choice
status: saturated
saturation_threshold: 0.90
sources: []
---

# ARC（AI2 Reasoning Challenge）

> 来自 AI2 的小学科学题推理基准，分为 Easy 和 Challenge 两个子集。

## 概述

ARC（AI2 Reasoning Challenge）由 Clark 等人于 2018 年发布，来自 Allen Institute for AI（AI2）。数据集收集了真实美国小学到初中阶段的科学考试题，共约 7,787 道四选一多选题。

数据集分为两个子集：
- **ARC-Easy**：约 5,197 道题，可以通过简单的检索或词频统计方法解答
- **ARC-Challenge**：约 1,172 道题，简单检索和词频方法均无法正确回答，需要更深层的推理能力

ARC-Challenge 是评测语言模型科学推理能力的重要基准，被广泛用于各类模型评测报告和排行榜（如 Open LLM Leaderboard）。这些题目涵盖物理、化学、生物、地球科学等基础科学领域，要求模型不仅要有相关知识储备，还需要进行基本的科学推理。

随着大型语言模型的快速进步，ARC-Challenge 上的顶尖成绩已大幅超越早期基线。GPT-4 等模型的准确率超过 90%，标志着该数据集也逐渐趋于饱和，但在轻量级模型评测中仍具参考价值。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2018 |
| 数据量 | 约 7,787 题（Easy: 5,197，Challenge: 1,172，另有训练集） |
| 格式 | 多选题（3-5 选 1，多数为 4 选 1） |
| 领域 | 科学知识、推理 |
| 语言 | 英文 |
| 许可证 | CC-BY-SA-4.0 |
| 发布机构 | Allen Institute for AI (AI2) |

## SOTA 表现

当前顶尖模型（GPT-4、Claude 3 系列等）在 ARC-Challenge 上的准确率超过 90%。具体最新成绩见各模型官方技术报告及 Open LLM Leaderboard。

## 主要挑战与局限

- **趋近饱和**：大型模型在 ARC-Challenge 上已取得较高准确率
- **题目来源局限**：主要覆盖美国小学到初中水平科学知识，深度有限
- **知识范围窄**：仅限基础自然科学，不涵盖社会、人文等领域
- **格式固定**：全部为多选题，无法测试开放式生成能力
- **年级定位问题**：对于评测高级推理能力，题目难度不足

## 相关页面

- [[MMLU]]
- [[HellaSwag]]
- [[OpenBookQA]]
- [[PIQA]]
- [[SciQ]]
