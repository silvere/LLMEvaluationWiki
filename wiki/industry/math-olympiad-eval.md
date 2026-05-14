---
title: "数学竞赛 AI 评测"
type: industry
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 数学竞赛 AI 评测

## 背景

数学竞赛题目因其高度的推理纯度（无需大量背景知识，仅依赖数学推导）和明确的正确性验证（答案唯一可查验），成为评测 LLM 深层推理能力的黄金标准之一。从 AIME 到 IMO，不同难度层次的数学竞赛构成了完整的 LLM 数学推理能力评测阶梯。

## 主要评测基准

**AMC（American Mathematics Competition）**：

AMC 8/10/12 是面向中学生的选择题数学竞赛，难度适中，是早期检验 LLM 基础数学推理能力的入门级竞赛基准。GPT-4 发布时即在 AMC 系列题目上取得优秀成绩（AMC 12 约93百分位）。

**AIME（American Invitational Mathematics Examination）**：

AIME 是 AMC 的进阶赛，包含15道整数答案题（0-999），无选项可供猜测，需要完整的推导过程。AIME 成为衡量 LLM 数学推理能力里程碑式进展的关键基准：
- GPT-4（2023年）：约2-3题正确（满分15）
- o1/o3 系列（2024年）：约9-13题正确，接近 AIME 晋级线（约10题）

**MATH 数据集**：

Hendrycks et al. 构建的 MATH 数据集包含12,500道来自竞赛数学的题目，涵盖代数、几何、数论、组合等7个难度级别，是目前使用最广泛的数学推理评测基准之一。

**IMO（国际数学奥林匹克）**：

IMO 是数学竞赛的最高舞台，每题需要完整的数学证明。Google DeepMind 的 AlphaProof 和 AlphaGeometry 系统在 IMO 2024 上取得金牌分数，标志着 AI 数学推理能力的重大突破。

## 评测方法论

- **答案正确率（Pass Rate）**：最终数值答案的准确率
- **多数投票（Majority Voting / Self-Consistency）**：多次采样后取最多答案，可显著提升准确率
- **过程正确率（Process Correctness）**：使用过程奖励模型（PRM）评估推导步骤的正确性，不仅看最终答案
- **验证能力**：模型识别错误解题步骤的能力（与生成能力分离评测）

## 挑战与局限

- 数学竞赛题库较小，数据污染（Data Contamination）风险较高
- 最终答案正确不等于推导过程正确，需要过程级评测
- 顶级竞赛题目的形式化证明验证仍依赖人工或专用定理证明器
