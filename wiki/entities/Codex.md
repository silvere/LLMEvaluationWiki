---
title: "Codex"
type: entity
entity_type: model
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://arxiv.org/abs/2107.03374"
aliases:
  - Codex
  - OpenAI-Codex
  - code-davinci
domain:
  - entity
---

# Codex（OpenAI）

> OpenAI 2021-07 发布的代码生成模型（论文「Evaluating Large Language Models Trained on Code」，[[Mark-Chen]] / Jerry Tworek 等），是 GPT-3 在 GitHub 代码语料上微调的版本，驱动 GitHub Copilot 第一版。同论文一并提出 [[HumanEval]] 评测，定义 `pass@k` 指标，是 code generation 评测的奠基工作。

## 关键产物

- **Codex 模型**：GPT-3 → code-davinci / code-cushman 多档
- **[[HumanEval]]**：164 道手写编程题 + 平均 7.7 个 unit test
- **pass@k 指标**：从 k 个采样中至少有一个通过测试的概率

## 评测圈意义

- 首次把 LLM 的代码能力 systematic benchmarking，开启了 code evaluation 子领域
- [[HumanEval]] 至今是 code LLM 的事实对照标准（即便已被 [[LiveCodeBench]] / [[SWE-bench-Verified]] 等取代主导地位）
- pass@k 范式被几乎所有后续 code benchmark 沿用

## 后续

- 2023 OpenAI 关停 codex API（合并入 GPT-4）
- 2025 OpenAI 推出新一代 [[OpenAI-Codex|Codex CLI]]（agentic code assistant），与早期 Codex 同名但定位不同

## 相关页面

- [[HumanEval]]
- [[Mark-Chen]]
- [[OpenAI]]
- [[LiveCodeBench]]
- [[SWE-bench-Verified]]
