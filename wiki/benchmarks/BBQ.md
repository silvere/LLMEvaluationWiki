---
title: "BBQ"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [bias-fairness]
language: en
year: 2022
authors: ["Alicia Parrish", "Angelica Chen", "Nikita Nangia", "Vishakh Padmakumar", "Jason Phang", "Jana Thompson", "Phu Mon Htut", "Samuel R. Bowman"]
arxiv_id: "2110.08193"
official_url: "https://github.com/nyu-mll/BBQ"
license: "CC BY 4.0"
size: 58492
format: multiple-choice
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2110.08193"
---

# BBQ：偏见基准问答测试集

## 概述

BBQ（Bias Benchmark for QA）是 2022 年由纽约大学提出的社会偏见评测基准，发表于 ACL 2022 Findings。它包含 **58,492 道**多项选择题，专门评测语言模型在不同**上下文充分程度（Context Sufficiency）**下对 **9 种社会偏见维度**的表现，是 NLP 偏见研究最重要的基准之一。

## 任务设计

BBQ 的核心设计创新是**双上下文框架**：

**两种上下文类型：**
1. **歧义上下文（Ambiguous Context）**：情境信息不足以从两个人中判断谁执行了某个行动
2. **明确上下文（Disambiguated Context）**：提供了明确信息，可以确定哪个人执行了行动

**评测逻辑：**
- 在歧义上下文下，正确答案是"无法确定（Unknown）"
- 如果模型在歧义时根据社会群体特征（而非上下文信息）作出偏见性判断，说明存在偏见
- 在明确上下文下，模型应按照证据作答，不应受刻板印象影响

**9 个偏见维度：**
1. 年龄（Age）
2. 残障状态（Disability Status）
3. 性别认同（Gender Identity）
4. 国籍（Nationality）
5. 外貌体型（Physical Appearance）
6. 种族/民族（Race/Ethnicity）
7. 宗教（Religion）
8. 社会经济地位（Socioeconomic Status）
9. 性取向（Sexual Orientation）

## 评分机制

BBQ 使用两个核心指标：
- **歧义准确率（Ambiguous Accuracy）**：在歧义上下文下选择"Unknown"的比例（应接近 100%）
- **偏见得分（Bias Score）**：在歧义上下文下，当模型不选"Unknown"时，偏向负面刻板印象的比例（越低越好）
- 分别统计正面目标问题（问谁做了好事）和负面目标问题（问谁做了坏事）的偏见方向

## 数据特点

- 58,492 道题，9 个偏见类别分布均衡
- 每道题包含明确和歧义两种上下文版本
- 人工构建和验证，质量高
- CC BY 4.0 开源，广泛用于偏见评测研究
- 针对每个偏见维度都有细粒度统计，便于针对性改进

## 主要发现与局限

BBQ 发布时的测评结果揭示了主流语言模型的偏见状况：
- 所有测试模型在歧义上下文下均存在显著偏见（偏见得分远高于 0）
- 在明确上下文下，较大模型（GPT-3）表现更接近人类水平
- 宗教和种族维度的偏见在多数模型上最为突出
- 经过 RLHF 对齐的模型在偏见得分上改善显著，但尚未完全消除

主要局限在于偏见类别基于美国社会语境构建，全球化适用性有限；三选一格式（人物A/人物B/Unknown）可能引导模型猜测"Unknown"而非真正理解；部分刻板印象题目存在争议性。

## 参考文献

Parrish, A., Chen, A., Nangia, N., et al. (2022). BBQ: A Hand-Built Bias Benchmark for Question Answering. *arXiv:2110.08193*. ACL 2022 Findings.
