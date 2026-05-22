---
title: "WMDP (Weapons of Mass Destruction Proxy)"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://arxiv.org/abs/2403.03218"
  - "https://www.wmdp.ai/"
aliases:
  - WMDP
  - Weapons of Mass Destruction Proxy
domain:
  - benchmark
  - safety
dimension: I
subdimension: safety-benchmark
---

# WMDP（Weapons of Mass Destruction Proxy）

> 2024-03 由 [[Dan-Hendrycks|Hendrycks]] 等（[[Center-for-AI-Safety]]）联合 60+ 安全专家发布，3,668 题多选题覆盖 biosecurity / cybersecurity / chemical security 危险知识代理，目标是评估「LLM 在双用途风险领域到底知道多少」并配套 unlearning 方法（CUT）。是 [[safety-eval-landscape]] 中危险能力评估的标杆。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv**: [https://arxiv.org/abs/2403.03218](https://arxiv.org/abs/2403.03218)
- **官网**: [https://www.wmdp.ai/](https://www.wmdp.ai/)

<!-- AUTO-LINKS:END -->

## 设计

- **题量**：3,668 MCQ（biosecurity 1,520 / cybersecurity 1,987 / chemical security 408 等子集）
- **代理设计**：每题不直接问「如何造武器」，而是其上游领域知识（基因克隆、漏洞利用、毒物合成路径等）
- **配套方法**：CUT（Conditioning-Untargeted Training）unlearning，让模型在保持 [[MMLU]] 性能的同时大幅降低 WMDP 准确率

## 影响

- 是 NIST AISI / UK AISI / 各家 frontier model evals 的标配 dangerous-capability test
- 影响 EU AI Act、Biden 行政令的「能力门槛」条款讨论
- 推动 [[unlearning]] / [[machine-unlearning]] 评测方法学

## 相关页面

- [[Dan-Hendrycks]]
- [[Center-for-AI-Safety]]
- [[safety-eval-landscape]]
- [[HarmBench]]
- [[MMLU]]
