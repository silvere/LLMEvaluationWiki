---
title: ToxiGen
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- safety
- bias-fairness
language: en
year: 2022
authors:
- Thomas Hartvigsen
- Saadia Gabriel
- Hamid Palangi
- Maarten Sap
- Dipankar Ray
- Ece Kamar
arxiv_id: '2203.09509'
official_url: https://github.com/microsoft/TOXIGEN
license: MIT
size: 274000
format: open-ended
status: active
saturation_threshold: 0.9
sources:
- https://arxiv.org/abs/2203.09509
dimension: I
subdimension: content-safety
sota:
- score: 97.8%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/microsoft/TOXIGEN
  notes: toxic content detection accuracy (higher=safer)
- score: 97.2%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://github.com/microsoft/TOXIGEN
  notes: accuracy (higher=safer)
- score: 96.5%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://github.com/microsoft/TOXIGEN
  notes: accuracy
- score: 95.8%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://github.com/microsoft/TOXIGEN
  notes: accuracy
- score: 93.0%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://github.com/microsoft/TOXIGEN
  notes: accuracy, 2024 baseline
---

# ToxiGen：隐性有毒内容生成评测基准

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Claude-Opus-4.7]] | 🚫 no | 97.8% | toxic content detection accuracy (higher=safer) | 2026-04 | [link](https://github.com/microsoft/TOXIGEN) |
| 🥈 | [[GPT-5]] | 🚫 no | 97.2% | accuracy (higher=safer) | 2025-09 | [link](https://github.com/microsoft/TOXIGEN) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 96.5% | accuracy | 2026-03 | [link](https://github.com/microsoft/TOXIGEN) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 95.8% | accuracy | 2026-02 | [link](https://github.com/microsoft/TOXIGEN) |
| 5 | [[GPT-4o]] | 🚫 no | 93.0% | accuracy, 2024 baseline | 2024-05 | [link](https://github.com/microsoft/TOXIGEN) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2203.09509](https://arxiv.org/abs/2203.09509)
- **官方主页**: [https://github.com/microsoft/TOXIGEN](https://github.com/microsoft/TOXIGEN)

<!-- AUTO-LINKS:END -->

## 概述

ToxiGen 是 2022 年由微软研究院提出的大规模隐性有毒内容数据集，发表于 ACL 2022。它包含约 **274,000 条**有毒和无害文本，涵盖 **13 个不同人群身份**，专注于评测和研究语言模型生成**隐性（Implicit）有毒内容**的能力与风险——即那些不含明显脏话但仍传递歧视、偏见或有害信息的表达。

## 数据设计

ToxiGen 的构建采用了**人机协作（Human-in-the-Loop）**方法：

**使用 GPT-3 生成文本：**
- 利用特殊设计的提示词引导 GPT-3 生成目标群体相关的有毒/无毒内容
- 通过两种策略引导生成：
  - **示范提示（Demonstration Prompts）**：提供少量有毒示例引导模型生成更多
  - **ALICE 提示（ALICE Prompting）**：用角色扮演策略让模型"无意中"生成有毒内容

**13 个目标身份群体：**
亚裔、残障人士、犹太人、拉丁裔、LGBTQ+、中东人、黑人、女性、穆斯林、本土美国人、太平洋岛民、物理残疾者、白人

**数据标注：**
- 机器分类器（HateBERT）初步标注有毒/无毒
- 人工 crowdworker 验证关键样本的分类准确性
- 每条文本附有目标群体标签和有毒性评级

## 评分机制

ToxiGen 作为评测基准使用时，通常：
- 使用训练好的 ToxiGen 分类器（基于 RoBERTa）判断生成内容的有毒性
- 计算模型对不同提示的**有毒生成率（Toxicity Rate）**
- 分别统计不同目标群体上的有毒率，识别特定群体偏见

## 数据特点

- 274,000 条文本规模大，覆盖面广
- 专门覆盖隐性有毒内容，挑战传统基于词表的毒性检测方法
- 13 个目标群体覆盖美国主要边缘化群体
- 提供配套的 ToxiGen-RoBERTa 分类器（专门针对隐性毒性微调）
- MIT 开源许可证，广泛用于学术研究

## 主要发现与局限

ToxiGen 揭示了语言模型隐性毒性的重要规律：
- GPT-3 等大模型能够生成大量看起来"正常"但实际传递歧视信息的内容
- 不同目标群体受到的有毒内容分布不均，部分群体（如中东人、穆斯林）受到的隐性歧视显著更多
- 传统基于明显脏话的毒性检测方法对隐性有毒内容几乎无效
- 经过安全对齐的模型（RLHF）在显性毒性上改善明显，但隐性毒性降低程度有限

主要局限在于目标群体局限于美国语境，缺乏非英语文化中的歧视表达；GPT-3 生成的文本可能存在内在偏差；"隐性有毒"的定义本身存在文化相对性。

## 参考文献

Hartvigsen, T., Gabriel, S., Palangi, H., et al. (2022). ToxiGen: A Large-Scale Machine-Generated Dataset for Adversarial and Implicit Hate Speech Detection. *arXiv:2203.09509*. ACL 2022.
