---
title: "Movie Gen Video Bench"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - video
  - multimodal
year: 2024
arxiv_id: "2410.13720"
status: active
---

# Movie Gen Video Bench

> Meta AI 随 Movie Gen 模型一同发布的文生视频评测基准，包含 1,003 个多维度提示词，覆盖人体动作、自然场景、物理效果等核心评测方向，规模超过此前同类基准三倍以上（arXiv:2410.13720，2024）。

## 概述

Movie Gen Video Bench 是 Meta AI 在其基础媒体模型 Movie Gen 技术报告（arXiv:2410.13720）中发布的文生视频评测基准，于 2024 年 10 月正式开源于 GitHub（facebookresearch/MovieGenBench）和 Hugging Face。它是 Movie Gen Bench 套件的视频部分，配套另有 Movie Gen Audio Bench（527 个提示词，评测音频生成）。

Movie Gen 是 Meta 研发的一系列基础媒体生成模型，能够生成最高 1080p 高清视频（带不同宽高比）并同步生成音频。为系统评估该模型的能力，Meta 团队构建了专门的评测基准，其规模是此前同类研究所用基准的三倍以上，并采用大规模人工评估作为主要评测手段。

Movie Gen Video Bench 的 1,003 个提示词设计涵盖了从高动作量到低动作量的宽泛运动谱系，同时覆盖人体动作细节（四肢运动、面部表情、嘴部动作等）、自然景观、物理规律还原以及罕见或超现实主题，力求对模型的综合视频生成能力进行全面压测。

## 任务格式

- **提示词总数**：1,003 个
- **评测维度**：
  - 人体动作（Human Activity）：四肢运动、情绪表达、嘴部动作
  - 自然场景（Natural Scenery）：地形、天气、光影
  - 物理效果（Physics）：液体、碰撞、重力
  - 异常/超现实主体（Unusual Subjects & Activities）
- **运动量分布**：高/中/低动作级别均衡分布，避免评测偏向特定运动强度
- **评测方式**：以人工评估为核心，评测人员对文本对齐度、视觉质量、真实感和美学进行综合打分；同时支持基于 VQA 或 CLIP 的自动化评估
- **比较系统**：Movie Gen 与 Runway Gen3、LumaLabs 等主流商业及开源系统进行横向比较

## 主要指标

- **文本对齐度（Text Alignment）**：生成视频与文本提示的语义一致性
- **视觉质量（Visual Quality）**：生成画面的清晰度、细节精度与色彩自然度
- **真实感（Realism）**：生成内容的物理合理性和场景真实感
- **美学评分（Aesthetics）**：视频的整体视觉美感

**关键结果**：Movie Gen Video 在上述四个维度的人工评估中全面超越 Runway Gen3 和 LumaLabs，成为公布时最强的文生视频系统之一。

## 局限性

- **人工评估可扩展性差**：大规模人工标注耗时且成本高，难以频繁更新或扩充基准
- **来自模型发布者**：基准由 Meta 随自家模型一同发布，存在潜在的基准设计偏向风险
- **不含音频联合评测**：视频基准与音频基准分离，无法评估视听协同质量
- **静态提示词**：提示词为固定集合，随模型迭代可能产生数据记忆效应
- **中文及多语言支持不足**：提示词以英语为主，对非英语视频生成能力的评测覆盖不足

## 相关页面

- [[Step-Video-T2V-Eval]]
- [[VBench]]
- [[EvalCrafter]]
- [[multimodal-eval]]
- [[Meta-AI]]
