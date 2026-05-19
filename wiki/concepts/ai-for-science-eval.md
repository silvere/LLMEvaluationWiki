---
title: "AI for Science 评测"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources: []
aliases:
  - ai-for-science-eval
  - AI4Science
  - AI for Science evaluation
domain:
  - concept
---

# AI for Science 评测

> 评测 AI 在科学发现领域（蛋白质结构、化学合成、数学证明、物理模拟、生命科学等）的能力。与通用 LLM 评测不同，AI for Science 强调 **可验证实验真值**、**长周期盲测**、**领域专家共识**。最典型范式：[[CASP]]（蛋白质结构）/ [[MATH]] / [[FrontierMath]] / [[GPQA]]（科学问答）/ AlphaProof（数学奥赛）。

## 评测特征

- **真值可验证**：实验数据、定理证明、化学反应产物等可独立校验
- **长周期盲测**：CASP 两年一届、IMO 一年一届，避免数据污染
- **领域专家共识**：评测协议由学界共同制定
- **抗 contamination 强**：真值往往是新实验或新定理

## 代表 benchmark

- **[[CASP]]**：蛋白质结构预测，AlphaFold 系列里程碑
- **[[MATH]] / AIME / IMO**：数学
- **[[GPQA]]**：研究生物理 / 化学 / 生物多选题
- **FrontierMath**：Epoch AI 的「未解决数学难题」
- **MaterialsProject / Open Catalyst**：材料 / 催化

## 与通用 LLM 评测对比

- 通用：MMLU / ChatBot Arena → 模型综合能力
- AI4Science：CASP / FrontierMath → 特定科学领域突破
- 趋势：科学评测越来越倚重「LLM-as-tool + 仿真验证 pipeline」

## 相关页面

- [[CASP]]
- [[GPQA]]
- [[MATH]]
- [[AlphaFold]]
- [[benchmark-contamination]]
