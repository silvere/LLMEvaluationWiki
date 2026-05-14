---
title: "MusicEval"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - audio
year: 2025
arxiv_id: "2501.10811"
status: active
---

# MusicEval

> 首个针对文本生成音乐（text-to-music）任务的专家评分生成音乐数据集，涵盖 31 款模型生成的 2,748 段音乐和 14 名音乐专家的专业评分。

## 概述

MusicEval 由刘等研究者发布，论文"MusicEval: A Generative Music Dataset with Expert Ratings for Automatic Text-to-Music Evaluation"于 2025 年 1 月提交至 arXiv（2501.10811）。该工作针对文本生成音乐（TTM，text-to-music）领域长期缺乏可靠自动评测标准的核心痛点，构建了目前规模最大、专家评分最为系统的 TTM 评测数据集。

文本生成音乐是生成式 AI 中技术难度最高的任务之一，既需要生成音乐符合文本描述的风格和情绪语义（text-music alignment），又需要保证音乐本身的质量（音乐性、节奏、和声等）。现有自动评测指标（FAD、KL 散度、CLAP 相似度等）与人类感知的相关性较低，且无法全面捕捉音乐质量的两个核心维度。MusicEval 通过构建专家评分数据集，为训练更接近人类判断的自动评测模型提供了基础。

数据集收集了 31 款主流 TTM 模型对 384 条文本提示词的生成结果，共 2,748 段音频，由 14 名音乐专家从两个维度进行评分：整体音乐印象（overall musical impression）和文本一致性（text alignment）。基于此数据集，研究者训练了 CLAP-based 自动评分模型，实验验证其预测结果比现有客观指标更接近人类评分。该工作受国家重点研发计划和 NSF 中国支持。

## 任务格式

- **音频片段总量**：2,748 段（31 款模型 × 约 88 段）
- **文本提示词总量**：384 条
- **生成模型数量**：31 款（涵盖当时主流 TTM 系统）
- **评分维度**：2 个（整体音乐印象 + 文本一致性）
- **专家标注者数**：14 名音乐专家
- **总评分记录数**：13,740 条
- **评估方式**：专家打分（MOS 形式）；基于此训练自动评分模型

## 主要指标

- **整体音乐印象（Overall Musical Impression）**：音乐质量的总体主观评分
- **文本一致性（Text-Music Alignment）**：生成音乐与文本提示词的语义吻合程度
- **自动模型准确性**：CLAP-based 自动评分与人工评分的皮尔逊相关系数

## 局限性

- 384 条文本提示词数量偏少，对长尾描述（罕见乐器、跨文化风格组合）的覆盖有限
- 仅涵盖 2024 年底前发布的模型，随着 Suno v4、Udio 等新系统迭代，评测覆盖面需持续更新
- 两个评分维度的定义较为宽泛，专家内部一致性（inter-rater agreement）在评分分歧大的样本上有待进一步分析

## 相关页面

- [[SongEval]]
- [[CMI-Bench]]
- [[SingMOS-Pro]]
- [[multimodal-eval]]
