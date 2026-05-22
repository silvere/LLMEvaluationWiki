---
title: "HEIM"
type: benchmark
dimension: F
subdimension: T2I
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://arxiv.org/abs/2311.04287"
  - "https://crfm.stanford.edu/heim/"
  - "https://github.com/stanford-crfm/helm"
aliases:
  - HEIM
  - Holistic Evaluation of Image Models
arxiv_id: "2311.04287"
official_url: "https://crfm.stanford.edu/heim/v1.1.0/"
official_leaderboard: "https://crfm.stanford.edu/heim/v1.1.0/?scenarios=1"
license: "Apache-2.0"
org: "Stanford CRFM"
homepage: "https://crfm.stanford.edu/"
github_url: "https://github.com/stanford-crfm/helm"
domain:
  - multimodal
  - vision
---

# HEIM（Holistic Evaluation of Image Models）

> Stanford CRFM 2023-11 推出的 text-to-image 评测套件（HELM 的图像扩展，NeurIPS 2023 D&B）。覆盖 **12 维度** × **62 场景** × **26 个 T2I 模型**，是首个系统化的「holistic」T2I 评测体系，远超此前仅评 alignment + quality 的局限。

## 12 评测维度

text-image alignment / image quality / aesthetics / originality / reasoning / knowledge / bias / toxicity / fairness / robustness / multilinguality / efficiency

## 设计

- **62 场景**：从写实摄影到抽象艺术、从英文到多语言
- **26 模型**：当时主流 T2I（Stable Diffusion / DALL-E 2 / Midjourney / Imagen 等）
- **人工标注 + 自动指标双轨**
- **公开数据 + 代码**：crfm.stanford.edu/heim

## 评测圈意义

- 首个把 HELM 的「holistic」方法论扩展到多模态生成
- 揭示 no single model excels in all aspects
- 是后续 [[GenEval]] / [[T2I-CompBench]] / [[GenAI-Bench]] 等专项 benchmark 的基础对照

## 已知 pitfall

- 2023 评测的 26 模型已过时（SD3 / FLUX / Imagen 3 / DALL-E 3 多个未覆盖）
- 12 维度部分主观（aesthetics / originality）依赖人工
- 单维度可被针对性优化

## 相关页面

- [[GenEval]]
- [[T2I-CompBench]]
- [[GenAI-Bench]]
- [[Stanford-CRFM]]
- [[HELM]]
- [[multimodal-eval]]
