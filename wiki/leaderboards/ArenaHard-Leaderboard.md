---
title: "Arena-Hard Leaderboard"
type: leaderboard
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Arena-Hard Leaderboard

## 概述

Arena-Hard Leaderboard 由加州大学伯克利分校 Sky Computing Lab 开发，基于 Arena-Hard v0.1 评测框架。该排行榜的设计目标是在保持高度可复现性的前提下，最大程度地逼近 LMSYS Chatbot Arena 的人类投票排名结果，弥补 Chatbot Arena 无法快速测试新模型的缺陷。

## 核心设计思路

Arena-Hard 从 Chatbot Arena 的真实用户对话中筛选出 500 条**高区分度问题**——这些问题具有以下特征：
- 问题复杂、开放性强，难以通过简单关键词匹配评判
- 不同模型在这些问题上的表现差异显著，适合排名区分
- 覆盖技术推理、代码、数学等高难度领域

筛选依据是这些问题在 Chatbot Arena 中对最终模型排名的**贡献度**，即"最能区分模型优劣"的问题子集。

## 评测方式

- **评判模型**：GPT-4-Turbo（作为评判标准）
- **对比基准**：GPT-4-0314（作为固定参考模型）
- **评分指标**：相对于参考模型的成对胜率，经过置信区间估计
- **评测成本**：相对较低，500条问题可在较短时间内完成

## 与 Chatbot Arena 的相关性

Arena-Hard 的设计验证显示，其排名结果与 Chatbot Arena 人类投票排名的 Spearman 相关系数约为 0.98，是目前自动化排行榜中与人类偏好相关性最高的方法之一。这也是该排行榜最核心的竞争优势。

## 排行榜特点

**优势**：
- 与人类偏好排名相关性极高
- 评测集精选，区分度强，高效利用计算资源
- 评测流程完全开源，结果可复现
- 问题数量少但质量高，快速评测新模型成为可能

**局限性**：
- 固定的 500 条问题存在数据污染风险
- 主要覆盖英文技术类任务，语言多样性不足
- 依赖 GPT-4 评判，存在系统性偏差

## 访问方式

- GitHub：[github.com/lm-sys/arena-hard-auto](https://github.com/lm-sys/arena-hard-auto)
- 论文：Li et al., "From Live Data to High-Quality Benchmarks: The Arena-Hard Pipeline"（arXiv: 2406.11939）
