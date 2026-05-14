---
title: "Open LLM Leaderboard v2"
type: leaderboard
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Open LLM Leaderboard v2

## 概述

Open LLM Leaderboard v2 是 Hugging Face 于 2024 年推出的第二代开放大语言模型综合排行榜，用于取代原版 Open LLM Leaderboard（v1）。v2 版本针对 v1 存在的数据污染问题和评测任务饱和问题进行了全面重构，引入了一套全新的评测任务集。

## 从 v1 到 v2 的改进

**v1 的问题**：
- 评测任务（MMLU、HellaSwag 等）的训练数据被大量纳入开源模型的预训练语料，导致分数虚高
- 多项任务趋于饱和，最强模型间差距过小，排名失去区分度
- 评测任务以多选题为主，无法衡量开放式生成能力

**v2 的改进**：
- 引入全新的 6 个核心评测任务，刻意选择目前污染程度较低的基准
- 任务集涵盖更复杂的推理、知识理解和指令执行能力

## v2 核心评测任务

| 任务 | 说明 |
|------|------|
| MMLU-Pro | MMLU 的增强版，选项增加为 10 个，难度提升 |
| GPQA | 研究生水平的科学问答，高难度知识评测 |
| MuSR | 多步推理题，测试复杂推理链 |
| MATH Lvl 5 | 竞赛级数学题，仅取最难等级 |
| IFEval | 指令跟随精确度评测 |
| BBH | BIG-Bench Hard，认知挑战性子集 |

## 排行榜特点

**优势**：
- 任务难度更高，对顶级模型有更好的区分度
- 任务设计考虑了污染风险，选用污染程度较低的数据集
- 完全开放，任何人可以提交模型评测请求
- 是开源社区最广泛参考的开源模型排行榜之一

**局限性**：
- 即使 v2 的任务，随着时间推移同样面临污染风险
- 不接受闭源模型（GPT、Claude 等），与商业模型无法直接对比
- 评测队列有时较长，新模型等待时间较久
- 不覆盖指令跟随、对话等能力，需结合其他排行榜使用

## 访问方式

- HuggingFace：[huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard)
- 博客：Hugging Face 官方博客"Open LLM Leaderboard v2"发布公告
