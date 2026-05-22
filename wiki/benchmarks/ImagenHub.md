---
title: "ImagenHub"
type: benchmark
dimension: F
subdimension: T2I
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://github.com/TIGER-AI-Lab/ImagenHub"
  - "https://huggingface.co/datasets/TIGER-Lab/ImagenWorld-model-outputs"
aliases:
  - ImagenHub
  - Imagen-Hub
official_url: "https://github.com/TIGER-AI-Lab/ImagenHub"
license: "MIT"
org: "TIGER-AI-Lab"
github_url: "https://github.com/TIGER-AI-Lab/ImagenHub"
domain:
  - multimodal
  - vision
---

# ImagenHub

> TIGER-AI-Lab 2023 推出、ICLR 2024 收录的 conditional image generation 一站式评测框架。统一**7 类**图像生成任务的 inference + evaluation pipeline，让不同模型在同一 dataset / 同一指标下对比。后续 ImagenWorld 扩展到 6 任务 × 6 内容域的真实多模态场景。

## 7 类任务

text-guided image gen / mask-guided image edit / text-guided image edit / subject-driven image gen / multi-concept image composition / control-guided image gen / 等

## 设计

- **统一 inference**：用一个 Python 接口跑各类 T2I / image-edit 模型，规避「每家 demo 都不一样」
- **统一评测数据集**：每任务一份标准 test set，输出可直接对比
- **后续**：ImagenWorld（更大规模 / 真实多模态）

## 评测圈意义

- 「standardize inference」是大量 T2I 论文复现的痛点 → ImagenHub 是事实标准之一
- 与 [[HEIM]] 偏 holistic 维度互补：ImagenHub 偏「跨任务横向对比」
- TIGER-AI-Lab 同期产出还有 [[MMMU]] / [[CMMMU]] / [[MMLU-Pro]] 等

## 已知 pitfall

- 标准化必然损失部分 model-specific 调优
- 7 任务覆盖外的新颖任务需自行扩展
- 2024 起 image-edit 领域涌现的 Step1X / Bagel / OmniGen 等新模型需要 community 持续扩展

## 相关页面

- [[HEIM]]
- [[GenEval]]
- [[MMMU]]
- [[multimodal-eval]]
