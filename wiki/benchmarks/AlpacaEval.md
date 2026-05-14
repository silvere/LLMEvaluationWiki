---
title: "AlpacaEval"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [instruction-following]
language: en
year: 2023
authors: ["Li et al."]
arxiv_id: "2305.14387"
official_url: "https://tatsu-lab.github.io/alpaca_eval/"
license: "Apache-2.0"
size: 805
format: open-ended
status: active
saturation_threshold: 0.90
sources: []
---

# AlpacaEval

> 基于 LLM-as-Judge 的指令跟随能力自动评测框架，以 Win Rate（对比 text-davinci-003）为核心指标。

## 概述

AlpacaEval 由 Li 等人于 2023 年提出，来自斯坦福大学（与 Alpaca 项目相关）。该评测框架的核心创新是将**成对比较**（pairwise comparison）与**LLM-as-Judge**结合，为指令跟随能力提供快速、低成本的自动化评测方案。

评测集包含 805 道多样化指令，来源于多个数据集（Self-Instruct、Open Assistant、Dolly、HH-RLHF 等）。评测流程如下：
1. 将待测模型与参考模型（原版为 text-davinci-003）分别回答同一指令
2. 使用 GPT-4 作为 Judge，判断哪个回答更好
3. 统计待测模型"胜出"的比例，即 **Win Rate**

AlpacaEval 的优势在于自动化程度高、评测成本低，且与人工评测（如 Chatbot Arena）有较高相关性。它迅速成为评测指令微调模型能力的流行工具。

然而，随着模型能力的提升，Win Rate 指标出现了**长度偏差**：更长的回答往往被 GPT-4 评为更好，导致模型可以通过生成冗长回答而虚增得分。这一问题在 AlpacaEval 2.0 中通过引入 Length-Controlled Win Rate 得到改进。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 数据量 | 805 道指令 |
| 格式 | 开放式（成对比较） |
| 领域 | 指令跟随 |
| 语言 | 英文 |
| 许可证 | Apache-2.0 |
| 评分方式 | GPT-4 Judge（Win Rate vs text-davinci-003） |

## SOTA 表现

顶尖模型（GPT-4o、Claude 3.5 Sonnet 等）的原始 Win Rate 均超过 90%，而 length-controlled win rate 更能体现真实能力差距。具体最新成绩见官方排行榜。

## 主要挑战与局限

- **长度偏差**：原始 Win Rate 偏向更长的回答，引发虚假高分
- **参考模型过时**：text-davinci-003 已被淘汰，win rate 数字随参考基准变化而失去可比性
- **GPT-4 Judge 偏见**：Judge 可能偏向特定风格或偏向 GPT-4 自身输出
- **覆盖范围有限**：805 道指令难以覆盖所有使用场景
- **评测成本**：使用 GPT-4 作为 Judge 需要 API 费用

## 相关页面

- [[AlpacaEval-2.0]]
- [[ArenaHard]]
- [[MT-Bench]]
- [[WildBench]]
- [[Chatbot-Arena]]
