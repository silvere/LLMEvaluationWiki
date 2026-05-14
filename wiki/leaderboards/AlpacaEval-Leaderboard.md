---
title: "AlpacaEval Leaderboard"
type: leaderboard
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# AlpacaEval Leaderboard

## 概述

AlpacaEval Leaderboard 是由斯坦福大学和加州大学伯克利分校联合维护的指令跟随能力排行榜，基于 AlpacaEval 2.0 评测框架。该排行榜专注于衡量大语言模型在开放式指令跟随任务上的综合表现，是学术界和工业界广泛参考的能力基准之一。

## 核心指标：Length-Controlled Win Rate

AlpacaEval 2.0 引入了**长度控制胜率（Length-Controlled Win Rate，LC Win Rate）**作为核心排名指标。该指标通过统计方法消除了模型倾向于输出冗长回答所带来的偏差——早期版本发现，GPT-4 作为评判模型时会明显偏好更长的回答，导致部分模型通过堆砌内容获得虚高分数。LC Win Rate 通过回归分析对回答长度进行控制，使评测结果更能反映真实的指令跟随质量。

## 评测设置

- **评测集**：805 条来自 AlpacaFarm 的多样化指令，覆盖写作、问答、代码、推理等多个领域
- **参考模型**：GPT-4-Turbo（作为基准对比模型）
- **评判模型**：GPT-4-Turbo，采用成对比较（pairwise comparison）方式
- **评测方式**：被评测模型与参考模型的回答进行一对一对比，统计胜率

## 排行榜特点

**优势**：
- 评测集相对固定，便于横向对比历史数据
- LC Win Rate 方法论透明，计算方式公开
- 与人类偏好的相关性较高，在多项研究中被验证

**局限性**：
- 评测集规模较小（805条），可能存在抽样偏差
- 依赖 GPT-4 作为评判，存在模型偏好的系统性偏差
- 指令主要为英文，对多语言能力的覆盖有限
- 随着模型整体能力提升，评测集存在饱和风险

## 与其他排行榜的关系

AlpacaEval 与 LMSYS Chatbot Arena 定位互补：Chatbot Arena 依赖大量人类真实投票，成本高但可信度强；AlpacaEval 使用自动化评测，成本低且可快速复现。两者排名结果有较高相关性，但在某些模型上存在分歧，通常建议结合参考。

## 访问方式

- 官方排行榜：[tatsu-lab.github.io/alpaca_eval](https://tatsu-lab.github.io/alpaca_eval/)
- GitHub：[github.com/tatsu-lab/alpaca_eval](https://github.com/tatsu-lab/alpaca_eval)
- 论文：Dubois et al., "Length-Controlled AlpacaEval: A Simple Way to Debias Automatic Evaluators"（arXiv: 2404.04475）
