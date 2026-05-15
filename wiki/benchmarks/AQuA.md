---
title: "AQuA"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - math
  - reasoning
year: 2017
arxiv_id: "1705.04146"
status: saturated
---

# AQuA

> 包含约 10 万道代数文字题的问答数据集，每道题提供自然语言推理过程（rationale），是早期训练和评测 LLM 数学推理与思维链能力的重要资源。

## 概述

AQuA（Algebra Question Answering with Rationales）由 Ling 等人于 2017 年发布，包含约 100,000 道代数文字题，数据来源于 GRE 和 GMAT 备考题库。AQuA 的核心特色是为每道题提供了人工标注的推理过程（rationale）——用自然语言描述解题步骤，从问题分析到答案推导的完整思路，这在 2017 年是代数推理数据集中的重要创新。

AQuA 的设计目标是支持两类研究：其一是用 rationale 作为训练信号，教导模型"展示工作"（show its work）；其二是在推理过程生成这一框架下评测模型的代数推理能力。题目类型涵盖利率计算、排列组合、速率问题、百分比变化等 GRE/GMAT 数学常见题型，每道题为五选一多选题。

AQuA 在思维链（Chain-of-Thought）研究兴起前是数学推理评测的常用基准。Wei 等人 2022 年发表的 CoT 论文将 AQuA 作为评测集之一。然而随着 GPT-4 等强模型的出现，AQuA 的准确率已被推向较高水平，加之 MATH、GSM8K、AIME 等更具挑战性的数学基准相继发布，AQuA 在前沿模型评测中的使用频率有所下降。

## 任务格式

- 格式：五选一多选题（multiple-choice, 5 options）+ 自然语言推理过程（rationale）
- 数据规模：约 97,467 道题（训练约 97,467 / 开发 254 / 测试 254）
- 来源：GRE、GMAT 数学备考题
- 语言：英文

## 主要指标

- **准确率（Accuracy）**：五选一多选题，随机基线 20%
- **Rationale 质量**：部分研究评测生成推理过程的逻辑正确性

## 局限性

- **题型覆盖有限**：以 GRE/GMAT 代数文字题为主，不涵盖几何、微积分、证明等数学领域
- **考试偏差**：题目来自标准化考试，与真实数学应用场景存在差距
- **已趋于饱和**：顶级 LLM 准确率已较高，区分力下降

## 相关页面

- [[GSM8K]]
- [[MATH]]
- MATH
- [[TheoremQA]]
- [[ProofWriter]]
