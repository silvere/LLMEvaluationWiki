---
title: "Machine Unlearning / 模型反学习"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources: []
aliases:
  - unlearning
  - machine-unlearning
  - Machine Unlearning
  - 反学习
domain:
  - concept
  - safety
---

# Machine Unlearning（模型反学习）

> 在保持模型通用能力的前提下，**精确移除模型对特定知识 / 数据子集的记忆**。LLM 时代主要两类需求：(1) GDPR/隐私 —— 用户数据撤回；(2) 安全 —— 让模型「忘掉」生物武器 / 化学武器等危险知识。代表评测：[[WMDP]] + CUT unlearning 方法学组合。

## 评测维度

- **遗忘成功率**：在被遗忘子集上的准确率下降
- **保留率**：在其他 benchmark（[[MMLU]] / [[BBH]]）的性能保持
- **稳健性**：jailbreak / fine-tune 后能否恢复（"recall"）
- **效率**：unlearn 一个事实的算力 vs 重训练对比

## 代表方法

- **CUT**（Conditioning-Untargeted Training）—— 配合 [[WMDP]] 提出
- **Gradient Ascent / Negative Preference Optimization**
- **Influence Function-based**：识别相关参数后局部 zero-out
- **TOFU benchmark**（虚构作者 + QA）作为隐私 unlearning 测试床

## 核心挑战

- "**Strong unlearning**" 要求 jailbreak / fine-tune 后仍不可恢复 —— 几乎没有方法满足
- 与 LLM 内部知识表示去定位 / 编辑相关（与 mechanistic interpretability 重叠）

## 相关页面

- [[WMDP]]
- [[safety-eval-landscape]]
- [[Dan-Hendrycks]]
- [[Center-for-AI-Safety]]
