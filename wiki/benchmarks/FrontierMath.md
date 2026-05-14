---
title: "FrontierMath"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [math, reasoning]
language: en
year: 2024
authors: []
arxiv_id: ""
official_url: "https://epochai.org/frontiermath"
license: ""
size: 0
format: open-ended
status: active
saturation_threshold: 0.50
sources:
  - "https://epochai.org/frontiermath"
  - "https://www.nature.com/articles/d41586-024-03502-6"
---

# FrontierMath

> 由Epoch AI委托专业数学家出题的极高难度数学评测集，题目来自数学研究前沿，旨在测试当前最先进AI系统能否解决需要博士级别知识的数学问题。

## 概述

FrontierMath由AI研究机构Epoch AI于2024年发布，与以往竞赛数学基准不同，其题目不来自公开竞赛，而是由全球数十位专业数学家专门为该基准创作，涵盖代数几何、拓扑学、数论、分析学等研究级数学领域。

FrontierMath的核心特点：
1. **极高难度**：题目需要博士级别的数学专业知识，即使是有经验的数学研究者也需要数小时才能解决单道题目。
2. **数据保密**：题目在发布时保密，防止训练数据污染，测试集不对外公开。
3. **可计算验证**：尽管难度极高，每道题目都设计为有确定的数值或符号答案，可以自动验证。
4. **专家出题**：题目由Fields奖得主顾问委员会背书的数学家团队创作。

截至2024年底，包括GPT-4o和Claude 3.5在内的顶级模型在FrontierMath上的准确率均不超过2%，被视为AI数学能力的长期挑战基准。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 数百道（具体数量未公开） |
| 难度定位 | 研究级数学 |
| 题目来源 | 专业数学家原创 |
| 数学领域 | 代数几何、数论、拓扑、分析等高级领域 |
| 答案类型 | 数值 / 数学表达式 |
| 数据公开性 | 测试集保密，防止污染 |

## SOTA 表现

| 模型 | 准确率 |
|------|-------|
| 最强前沿模型（2024） | <2% |
| 人类数学研究者 | 视子领域，通常需数小时/道 |

注：FrontierMath代表了当前AI数学能力的天花板挑战，预计需要数年才能显著突破。

## 主要挑战与局限

- **透明度不足**：题目保密性虽有助于防止污染，但也限制了独立评测和学术研究的可重复性。
- **商业机构主导**：由Epoch AI单一机构维护，缺乏开放的学术社区参与。
- **适用范围极窄**：仅适用于能力最强的前沿模型评测，对大多数模型完全不具备区分度。
- **出题偏向性**：题目风格和领域取决于参与出题的数学家，可能存在系统性偏向。
- **评测成本高**：专家出题和保密运营需要大量资源，扩展性受限。

## 相关页面

- [[MATH]]
- [[MATH500]]
- [[AIME]]
- [[OmniMath]]
- [[ARB]]
- [[Putnam]]
