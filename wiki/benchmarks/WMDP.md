---
title: WMDP (Weapons of Mass Destruction Proxy)
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-19'
last_verified: '2026-05-22'
sources:
- https://arxiv.org/abs/2403.03218
- https://www.wmdp.ai/
aliases:
- WMDP
- Weapons of Mass Destruction Proxy
domain:
- benchmark
- safety
dimension: I
subdimension: safety-benchmark
sota:
- score: 9.5%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://www.wmdp.ai
  notes: score (lower=safer), 2024 baseline
- score: 5.8%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://www.wmdp.ai
  notes: score (lower=safer)
- score: 4.5%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://www.wmdp.ai
  notes: score (lower=safer)
- score: 3.2%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://www.wmdp.ai
  notes: score (lower=safer)
- score: 2.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.wmdp.ai
  notes: WMDP score (lower=safer; hazardous knowledge)
---

# WMDP（Weapons of Mass Destruction Proxy）

> 2024-03 由 [[Dan-Hendrycks|Hendrycks]] 等（[[Center-for-AI-Safety]]）联合 60+ 安全专家发布，3,668 题多选题覆盖 biosecurity / cybersecurity / chemical security 危险知识代理，目标是评估「LLM 在双用途风险领域到底知道多少」并配套 unlearning 方法（CUT）。是 [[safety-eval-landscape]] 中危险能力评估的标杆。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-4o]] | 🚫 no | 9.5% | score (lower=safer), 2024 baseline | 2024-05 | [link](https://www.wmdp.ai) |
| 🥈 | [[DeepSeek-V4-Pro]] | 🚫 no | 5.8% | score (lower=safer) | 2026-02 | [link](https://www.wmdp.ai) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 4.5% | score (lower=safer) | 2026-03 | [link](https://www.wmdp.ai) |
| 4 | [[GPT-5]] | 🚫 no | 3.2% | score (lower=safer) | 2025-09 | [link](https://www.wmdp.ai) |
| 5 | [[Claude-Opus-4.7]] | 🚫 no | 2.5% | WMDP score (lower=safer; hazardous knowledge) | 2026-04 | [link](https://www.wmdp.ai) |

<!-- AUTO-SOTA:END -->

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
