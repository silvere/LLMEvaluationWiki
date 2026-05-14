---
title: "AlpacaEval 2.0"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [instruction-following]
language: en
year: 2024
authors: ["Dubois et al."]
arxiv_id: "2404.04475"
official_url: "https://tatsu-lab.github.io/alpaca_eval/"
license: "Apache-2.0"
size: 805
format: open-ended
status: active
saturation_threshold: 0.90
sources: []
---

# AlpacaEval 2.0

> AlpacaEval 的改进版，引入 Length-Controlled Win Rate（LC Win Rate）以减少冗长偏差，参考模型升级为 GPT-4 Turbo。

## 概述

AlpacaEval 2.0 由 Dubois 等人于 2024 年提出（发表于 NeurIPS 2024），是对 AlpacaEval 的重要改进版本。原版 AlpacaEval 存在明显的**长度偏差**（length bias）：LLM Judge 倾向于选择更长的回答，导致模型可以通过增加回答长度来人为提高 Win Rate 分数，而与实际质量无关。

AlpacaEval 2.0 的核心改进是引入了 **Length-Controlled Win Rate（LC Win Rate）**：通过统计回归方法将回答长度的影响从 Win Rate 中分离出来，得到更纯粹的质量评估指标。具体而言，LC Win Rate 控制了模型和参考模型的回答长度差异，只计算在相同长度条件下模型的胜出概率。

同时，AlpacaEval 2.0 将参考模型从过时的 text-davinci-003 升级为 GPT-4 Turbo（1106 版本），使得比较基线更具当代意义。评测集保持 805 道指令不变，确保与原版 AlpacaEval 的可比性。

研究表明 LC Win Rate 与人工评测（Chatbot Arena ELO）的相关性更高（约 0.98），是更可靠的自动化指令跟随评测指标。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2024 |
| 数据量 | 805 道指令 |
| 格式 | 开放式（成对比较） |
| 领域 | 指令跟随 |
| 语言 | 英文 |
| 许可证 | Apache-2.0 |
| 核心指标 | LC Win Rate（vs GPT-4 Turbo） |
| 评分方式 | GPT-4 Judge |

## SOTA 表现

顶尖模型（GPT-4o、Claude 3.5 Sonnet、Gemini Ultra 等）的 LC Win Rate 均超过 55%（以 GPT-4 Turbo 为基线，50% 表示与基线持平）。具体最新成绩见官方排行榜。

## 主要挑战与局限

- **长度控制假设**：LC Win Rate 假设质量与长度线性独立，这一假设并不总是成立
- **参考模型时效性**：随着模型进步，GPT-4 Turbo 参考基线的意义会持续变化
- **GPT-4 Judge 偏见**：Judge 偏见问题仍未完全消除
- **覆盖范围**：805 道指令的多样性仍有限
- **成本问题**：大规模评测仍需可观的 API 费用

## 相关页面

- [[AlpacaEval]]
- [[ArenaHard]]
- [[WildBench]]
- [[MT-Bench]]
- [[Chatbot-Arena]]
