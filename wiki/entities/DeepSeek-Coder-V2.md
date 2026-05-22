---
title: "DeepSeek-Coder-V2"
type: entity
entity_type: model
dimension: H
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
aliases:
  - DeepSeek-Coder-V2
  - DeepSeek-Coder-v2
sources:
  - "https://arxiv.org/abs/2406.11931"
  - "https://github.com/deepseek-ai/DeepSeek-Coder-V2"
org: "DeepSeek"
arxiv_id: "2406.11931"
year: 2024
domain:
  - code
---

# DeepSeek-Coder-V2

> DeepSeek 2024-06 发布的代码专项 MoE 模型（16B/236B），以 236B 总参数 / 21B 激活参数实现 GPT-4-Turbo 级别的代码评测表现，并在 [[LiveCodeBench]] / [[HumanEval]] 上达到 SOTA，Apache-2.0 许可。

## 关键数据

- **HumanEval**：90.2%（Instruct）
- **参数**：16B（小）/ 236B（全量，MoE 21B active）
- **许可**：Apache-2.0

## 相关页面

- [[HumanEval]]
- [[LiveCodeBench]]
- [[DeepSeek-R1]]
- [[Qwen2.5-Coder-32B]]
