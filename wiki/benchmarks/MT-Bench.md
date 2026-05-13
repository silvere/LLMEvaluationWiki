---
title: "MT-Bench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
domain: [reasoning, instruction-following, dialog]
language: en
year: 2023
authors: ["Zheng et al."]
arxiv_id: "2306.05685"
official_url: "https://github.com/lm-sys/FastChat/tree/main/fastchat/llm_judge"
license: ""
size: 80
format: multiple-choice
status: active
saturation_threshold: 0.90
sources: ["[[2026-04-llm-eval-landscape]]"]
---

# MT-Bench（Multi-Turn Benchmark）

> 用 GPT-4 作为评判的多轮对话质量基准，最早系统性验证 LLM-as-Judge 范式，开创聊天助手能力评测新方向。

## 概述

MT-Bench 由 LMSYS 团队（Zheng et al.）于 2023 年发布，与 Chatbot Arena 同一论文提出。其目标是构建一套可自动化、可扩展的对话质量评测方案，用以替代昂贵且不可扩展的人类标注评分。

基准包含 80 道多轮对话问题，分属 8 个类别：写作、角色扮演、推理、数学、编程、知识提取、STEM 科学和人文学科。每道题设计为两轮：第一轮提出主问题，第二轮在前一轮回答的基础上进行追问或转向。这一设计要求模型不仅能给出高质量的初始回答，还需在上下文持续追踪中保持一致性和连贯性。

MT-Bench 的核心评测机制是 LLM-as-Judge：使用 GPT-4 对模型的每轮回答打 1–10 分，并给出评分理由。这一方法显著降低了评测成本，同时被验证与人类偏好判断有较高的相关性，是最早大规模验证"用强模型评弱模型"可行性的工作之一。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 大小 | 80 道问题（8 类别，每题 2 轮对话） |
| 题目格式 | 开放性多轮对话（GPT-4 打 1–10 分） |
| 覆盖领域 | 推理、指令遵循、对话 |
| 语言 | 英文 |

## 当前状态

该基准处于 active 状态，但因题目数量极少（80 道），当前顶级模型得分差距已趋于压缩，区分度有限。饱和阈值设为 90%（以 10 分满分计）。LLM-as-Judge 方法本身（以 GPT-4 为裁判）存在裁判偏好偏差，且随着 GPT-4 版本更新，历史评分的跨时间可比性存疑。

## 主要局限

- **题目规模极小**：仅 80 道题，任何单题的表现偏差都对整体得分有明显影响，统计可靠性较弱。
- **裁判模型偏差**：以 GPT-4 为评判存在已知偏好模式（如偏好更长的回答、对特定写作风格评分偏高），不同版本 GPT-4 的评分标准也会随时间漂移。
- **覆盖能力有限**：8 个类别无法覆盖模型在代码调试、数据分析、工具调用等专业任务上的能力，对通用助手能力的代表性存在盲区。

## 相关页面

- [[Chatbot-Arena]]
- [[IFEval]]
- [[llm-as-judge]]
- [[instruction-following-evaluation]]
