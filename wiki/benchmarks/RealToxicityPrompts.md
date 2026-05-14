---
title: "RealToxicityPrompts"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [safety]
language: en
year: 2020
authors: ["Samuel Gehman", "Suchin Gururangan", "Maarten Sap", "Yejin Choi", "Noah A. Smith"]
arxiv_id: "2009.11462"
official_url: "https://github.com/allenai/real-toxicity-prompts"
license: "Apache 2.0"
size: 100000
format: open-ended
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2009.11462"
---

# RealToxicityPrompts：真实文本毒性触发评测基准

## 概述

RealToxicityPrompts 是 2020 年由 Allen Institute for AI 提出的语言模型毒性评测基准，发表于 EMNLP 2020 Findings。它包含约 **100,000 条**来自真实互联网文本的提示词，旨在评测语言模型在真实提示词诱导下产生有毒内容的倾向，是语言模型安全研究领域的奠基性工作之一。

## 任务设计

RealToxicityPrompts 的核心设计思路：**使用真实互联网中存在的自然语言提示词，测试语言模型是否会在续写时产生有毒内容。**

**数据来源：**
- 从 OpenWebText 语料库（来自 Reddit 精选链接的网页文本）中采样
- 选取文章的前半句话作为"提示词（Prompt）"，评测语言模型续写的毒性
- 按提示词本身的毒性分为两类：
  - **有毒提示（Toxic Prompts）**：约 22,000 条，本身含有毒性内容
  - **无毒提示（Non-toxic Prompts）**：约 78,000 条，本身无毒但可能诱发有毒续写

**Perspective API 毒性评分：**
- 使用 Google 的 Perspective API 对提示词和模型生成内容进行毒性评分
- 毒性分数范围 0–1，分数 ≥ 0.5 视为有毒
- 六个细分维度：毒性（Toxicity）、严重毒性（Severe Toxicity）、侮辱（Insult）、威胁（Threat）、身份攻击（Identity Attack）、亵渎（Profanity）

## 评分机制

核心指标：
- **期望最大毒性（Expected Maximum Toxicity）**：在 k 次生成中，毒性最高一次的期望值
- **毒性概率（Toxicity Probability）**：至少有一次生成毒性分数 ≥ 0.5 的概率
- 分别对有毒提示和无毒提示计算上述指标

## 数据特点

- 10 万条提示词规模大，统计意义强
- 来自真实互联网文本，分布贴近实际使用场景
- 提示词本身的毒性标注允许分类分析
- 配合 Perspective API 使用，评测流程可完全自动化
- Apache 2.0 开源，广泛用于语言模型毒性研究

## 主要发现与局限

RealToxicityPrompts 发布时揭示了预训练语言模型的严重毒性风险：
- 即使是在无毒提示下，GPT-2 等模型也有约 50% 的概率在 25 次生成中产生至少一次毒性输出
- 有毒提示显著增加模型生成有毒内容的概率
- 多种毒性减少策略（如域适应、PPLM）仅能部分降低毒性，无法完全消除
- 有毒内容的分布对种族、性别等身份群体存在不均匀偏差

主要局限在于 Perspective API 评分对隐性毒性和非英语内容有盲点；互联网文本来源可能引入特定人口群体的偏差；随着 RLHF 对齐技术进步，现代模型在该基准上的毒性已大幅降低，区分度下降。

## 参考文献

Gehman, S., Gururangan, S., Sap, M., Choi, Y., & Smith, N. A. (2020). RealToxicityPrompts: Evaluating Neural Toxic Degeneration in Language Models. *arXiv:2009.11462*. EMNLP 2020 Findings.
