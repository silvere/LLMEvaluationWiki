---
title: "Chatbot Arena"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
domain: [dialog, instruction-following, reasoning]
language: multilingual
year: 2023
authors: ["LMSYS Org (UC Berkeley)"]
arxiv_id: "2403.04132"
official_url: "https://chat.lmsys.org"
license: ""
size: 6000000
format: multiple-choice
status: active
saturation_threshold: 0.90
sources: ["[[2026-04-llm-eval-landscape]]"]
---

# Chatbot Arena（LMSYS）

> 基于真实用户盲测投票的模型能力排行榜，已成为业界衡量对话助手综合质量的事实标准。

## 概述

Chatbot Arena 由 LMSYS Org（UC Berkeley）于 2023 年发布并持续运营。其核心机制是众包盲测：用户向两个匿名模型发送同一问题，看到双方回答后选择哪个更好（或平局）。每次对战的结果通过 Elo/Bradley-Terry 评分体系汇总为全局排名，模型身份在用户投票后才揭晓。截至 2025 年，平台已积累超过 600 万次人类投票。

Chatbot Arena 的设计理念是让真实用户在真实使用场景中评判，而非依赖专家标注或预设题库。这使其能覆盖各类用户关心的任务，包括写作、编程、数学、创意生成、多语言对话等。由于问题由用户自由提出，分布反映了真实的使用需求，而非研究者的主观假设。

该平台影响力已远超学术范畴。主流 AI 实验室在发布新模型时普遍引用 Arena Elo 分数作为"用户偏好"维度的外部验证。Arena 排行榜第 1 和第 10 名之间的 Elo 差距已从 2023 年的 11.9% 收窄至 2025 年的 5.4%，说明顶级模型之间的用户可感知差异正在趋同。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023（持续运营） |
| 大小 | 超过 600 万次人类投票（截至 2025 年） |
| 题目格式 | 人类偏好投票（盲测 A/B 对比） |
| 覆盖领域 | 对话、指令遵循、推理 |
| 语言 | 多语言 |

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
