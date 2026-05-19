---
title: "预训练评测"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources: []
aliases:
  - pretraining-eval
  - pretraining evaluation
  - 预训练评测
domain:
  - concept
---

# 预训练评测（Pretraining Evaluation）

> 评测 base model（未经指令微调 / RLHF）的语言建模与少样本泛化能力。重点是「数据 + 规模 + 训练目标」对下游能力的影响，常用零样本 / 少样本 prompt 评测。与 instruction-tuned 评测（chat / arena）形成两条独立赛道。

## 评测目标

- **数据质量评测**：[[DataComp-LM]] —— 固定 model / recipe，比数据策略
- **scaling laws**：[[scaling-laws]] —— 损失 vs 参数 / token 拟合
- **emergent abilities**：少样本提示下哪些任务有 phase transition
- **multilingual / domain coverage**：base model 多语言 / 代码 / 数学覆盖度

## 常用 base-model benchmark

- **[[MMLU]] / [[BBH]] / [[ARC]] / [[HellaSwag]] / [[OpenBookQA]] / [[WinoGrande]]** —— 多选题，可零样本
- **[[GSM8K]] / [[MATH]]** —— 数学推理少样本
- **[[HumanEval]]** —— 代码 pass@1
- **[[Lambada]] / WikiText / The Pile** —— 困惑度

## 与 instruction-tuned 评测的区分

- Base：MMLU few-shot / log-likelihood scoring
- Instruct：[[Chatbot-Arena]] / [[MT-Bench]] / [[Arena-Hard-Auto]] / [[IFEval]]
- 现代实践：发布 base 模型 + instruct 模型两份评测表

## 相关页面

- [[DataComp-LM]]
- [[scaling-laws]]
- [[MMLU]]
- [[BBH]]
- emergent abilities
