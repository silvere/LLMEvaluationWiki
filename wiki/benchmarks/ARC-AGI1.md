---
title: "ARC-AGI1"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - reasoning
year: 2019
arxiv_id: "1911.01547"
status: active
aliases:
  - ARC-AGI
  - ARC-AGI 1.0
---

# ARC-AGI1

> 抽象推理语料库 1.0（Abstraction and Reasoning Corpus），François Chollet 于 2019 年提出的 AGI 能力测试基准，通过视觉模式推理任务衡量模型的核心知识泛化能力。

## 概述

ARC-AGI1（Abstract and Reasoning Corpus for Artificial General Intelligence，第一代）由 Google 研究员 François Chollet 于 2019 年在其里程碑论文《On the Measure of Intelligence》中提出。该基准的设计哲学深刻影响了此后 AGI 能力讨论的框架：真正的智能不在于记忆大量知识，而在于用**极少量先验**（先天核心知识：对象持久性、基本几何、空间关系、数字感）解决**全新类型的问题**。

ARC 任务的形式极为直观：每道题包含 3–5 个"输入-输出"网格图案演示样例（demonstration），模型须从样例中归纳出变换规则，然后将规则应用于新的测试输入网格，生成正确的输出网格。题目无需任何语言理解，对人类而言通常可在数分钟内解决，但对 LLM 却极为困难。

Chollet 将 ARC 设计为"程序员无法作弊"的基准：每道题的规则都是全新的，无法通过记忆模式库来解决。这一设计初衷使 ARC 成为 AI 社区讨论 AGI 进展时最常引用的基准之一。自 2020 年以来，ARC Prize 竞赛持续举办，到 2024 年顶级方法已将准确率提升至 80%+，促使 Chollet 发布 ARC-AGI2。

## 任务格式

- **任务总数**：400 个公开训练任务 + 400 个评估任务 + 200 个私有测试任务
- **输入形式**：彩色网格图案（最大 30×30，常见 3×3 至 10×10）
- **每题结构**：3–5 个演示对（demonstration pairs）+ 1 个测试输入
- **输出要求**：精确重建测试输出网格（逐像素精确匹配）
- **允许尝试次数**：每题最多 3 次
- **评估方式**：精确匹配，所有像素正确才得分

## 主要指标

- **准确率（Accuracy）**：正确解决的任务比例（公开评估集）
- **私有测试集准确率**：防止过拟合的最终衡量标准
- **人类基线**：约 85%（非专家普通人）

## 局限性

- 任务规模（400 评估题）较小，导致细微的性能差距在统计上可能不显著
- "精确像素匹配"评分机制对近似正确的答案（如一个像素偏差）零容忍，可能低估部分能力
- 随着 ARC Prize 吸引大量研究资源定向优化，未来分数提升可能来自任务特异性工程而非通用推理进步

## 相关页面

- [[ARC-AGI2]]
- [[BBEH]]
- [[HLE]]
- [[ARC]]
