---
title: "EvalMuse-40K"
type: benchmark
dimension: F
subdimension: T2I
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://arxiv.org/abs/2412.18150"
  - "https://shh-han.github.io/EvalMuse-project/"
aliases:
  - EvalMuse-40K
  - EvalMuse
arxiv_id: "2412.18150"
official_url: "https://shh-han.github.io/EvalMuse-project/"
license: "Apache-2.0"
domain:
  - multimodal
  - vision
---

# EvalMuse-40K

> 2024-12 发布、AAAI 2025 收录的细粒度 T2I 对齐评测：**40K image-text pair** + **1M+ 人工标注**。除提供数据集外还提出两个新评测方法（FGA-BLIP2 端到端 fine-tune + PN-VQA zero-shot），与人类判断相关性显著超越 CLIPScore / BLIP2Score。

## 数据规模

| 项 | 数量 |
|---|---|
| Prompt | 4,000（2K 真实 from DiffusionDB + 2K 合成） |
| Image-text pair | 40,000 |
| 细粒度人工标注 | >1,000,000 |

## 两套评测方法

- **FGA-BLIP2**：端到端 fine-tune BLIP-2 输出 fine-grained alignment score
- **PN-VQA**：positive-negative VQA 范式做 zero-shot 细粒度评测

## 评测圈意义

- 是当前 T2I alignment 评测数据集中**标注规模最大**之一
- 解决「现有评测数据集小、无法评 fine-grained 指标」的痛点
- 与 [[VQAScore]] / [[GenAI-Bench]] 共同推动 T2I alignment 评测进入「细粒度可解释」阶段

## 已知 pitfall

- 数据集中合成 prompt 偏 attribute / location 等可枚举类型，对复杂 relation 覆盖弱
- 1M+ 标注需要 batch 加载，本地评测内存压力大
- FGA-BLIP2 需要 fine-tune，开箱即用难度高于 [[VQAScore]]

## 相关页面

- [[VQAScore]]
- [[GenAI-Bench]]
- [[GenEval]]
- [[DPG-Bench]]
- [[multimodal-eval]]
