---
title: "CompassJudger-1"
type: tool
dimension: K
subdimension: judge-model
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://arxiv.org/abs/2410.16256"
  - "https://github.com/open-compass/CompassJudger"
aliases:
  - CompassJudger
  - CompassJudger-1
arxiv_id: "2410.16256"
official_url: "https://github.com/open-compass/CompassJudger"
license: "Apache-2.0"
org: "Shanghai AI Lab / OpenCompass"
cn_name: "司南评测器"
github_url: "https://github.com/open-compass/CompassJudger"
domain:
  - dialog
---

# CompassJudger-1

> [[Shanghai-AI-Lab]] OpenCompass 团队 2024-10 推出的「All-in-one Judge Model」。一个 judge 模型同时支持 pairwise / pointwise / chain-of-thought / multi-criteria 等多种评测模式，集成进 [[OpenCompass]] 评测套件。

## 设计

- **all-in-one**：单一模型多种评测模式（避免维护多个 judge）
- **chain-of-thought judge**：先 CoT 推理再下结论，提升复杂任务一致率
- **与 OpenCompass 集成**：作为 OpenCompass 评测 pipeline 的默认 judge 选项
- **多档**：1.5B / 7B / 14B / 32B 系列

## 评测圈意义

- 中文评测圈主流开源 judge 选项（vs Prometheus 偏英文）
- 推动 judge 模型 + 评测框架一体化
- 与 [[OpenCompass]] / [[CompassRank]] 生态深度耦合

## 已知 pitfall

- 在英文极难题上略弱于 Prometheus 2
- 与 OpenCompass 耦合，跨框架移植成本略高
- 中文 rubric 偏向 OpenCompass 评测规范

## 相关页面

- [[OpenCompass]]
- [[Shanghai-AI-Lab]]
- [[Prometheus]]
- [[llm-as-judge]]
