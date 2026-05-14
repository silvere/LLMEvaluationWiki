---
title: "ProofWriter"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - reasoning
year: 2021
arxiv_id: "2012.13048"
status: active
---

# ProofWriter

> 评测 LLM 基于给定事实和规则生成多步骤逻辑推理链（proof）能力的基准，涵盖从单步到五步以上的演绎推理深度。

## 概述

ProofWriter 由 Clark 等人（Allen Institute for AI）于 2021 年发布，专注于评测模型能否在严格的演绎逻辑框架下生成正确的多步推理证明（proof）。数据集使用程序化方法生成，每道题包含一组事实（facts）、一组规则（rules）和一个目标命题（hypothesis），模型需要判断目标命题是否成立（True/False/Unknown），并给出完整的推理链。

ProofWriter 的核心创新是引入"推理深度"（proof depth）维度：数据集按照推理所需步骤数分为 D0（无推理）、D1（1步）、D2（2步）、D3（3步）、D5（5步或以上）等子集，使研究者能够系统评测模型在不同推理深度下的能力表现。研究发现，随着推理深度增加，大多数模型的准确率呈现显著下降趋势，揭示了模型在深层逻辑推理上的能力天花板。

ProofWriter 是研究 LLM 演绎推理与神经符号方法结合的重要基准，被广泛用于探索 CoT、scratchpad、program synthesis 等推理增强方法。尽管近年被 BBH、FOLIO、PrOntoQA 等更新基准补充，ProofWriter 作为演绎推理领域的基础性工作仍有重要参考价值。

## 任务格式

- 格式：True/False/Unknown 三分类判断 + 推理链生成
- 数据规模：约 50 万道题（程序化生成，覆盖多个深度子集）
- 推理深度：D0/D1/D2/D3/D5 五个难度层次
- 语言：英文（自然语言描述的逻辑命题）

## 主要指标

- **准确率（Accuracy）**：True/False/Unknown 三分类
- **证明准确率（Proof Accuracy）**：生成推理链与标准推理链的一致性
- 按推理深度（D0-D5）分别报告

## 局限性

- **程序生成的自然度**：程序化生成的题目语言较为刻板，与真实自然语言推理场景存在风格差距
- **封闭世界假设**：基于封闭世界假设（CWA），与现实中的开放世界推理不一致
- **泛化性有限**：在 ProofWriter 上表现好的模型，在真实世界逻辑推理任务上不一定同样有效

## 相关页面

- [[BBH]]
- [[StrategyQA]]
- [[MuSR]]
- 
- [[AQuA]]
