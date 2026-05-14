---
title: "CMI-Bench"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - audio
year: 2025
arxiv_id: "2506.12285"
status: active
---

# CMI-Bench

> 系统评测音频文本大模型在多样化音乐信息检索任务上的综合基准，接受于 ISMIR 2025，揭示当前 Audio LLM 与监督模型的显著差距。

## 概述

CMI-Bench（A Comprehensive Benchmark for Evaluating Music Instruction Following）由多位音乐信息检索（MIR）领域研究者共同构建，论文发表于 arXiv（2506.12285），并被第 26 届国际音乐信息检索学会年会（ISMIR 2025）接收。该基准旨在为音频文本大语言模型（audio-text LLM）在 MIR 任务上建立统一的评测标准，以直接可比的方式对比 LLM 与专门的监督模型。

CMI-Bench 的核心贡献在于其任务覆盖的广度与评测指标的标准化。现有工作往往在单个或少数 MIR 任务上评测 Audio LLM，导致跨工作的结果难以比较。CMI-Bench 整合了 13 类核心 MIR 任务，并为每类任务采用与 MIR 领域 SOTA 监督模型一致的评估指标，使研究者可以直接看到 LLM 距专业系统还有多大差距。

实验结果揭示了多个重要发现：当前 Audio LLM（包括 LTU、Qwen-Audio、SALMONN 等开源模型）在大多数 MIR 任务上均显著落后于有监督的专业模型；模型表现出文化偏见（对西方音乐理解优于东方音乐）、时序偏见（对近代流行音乐理解优于古典音乐）和性别偏见（对特定演唱风格识别存在偏差）。

## 任务格式

- **任务类别总数**：13 类 MIR 核心任务
- **具体任务**：流派分类（genre classification）、情感回归（emotion regression）、情感标注（emotion tagging）、乐器分类（instrument classification）、音高估计（pitch estimation）、调式检测（key detection）、歌词转录（lyrics transcription）、旋律提取（melody extraction）、演唱技巧识别（vocal technique recognition）、演奏技法检测（instrument performance technique detection）、音乐标签（music tagging）、音乐字幕生成（music captioning）、拍子追踪（beat tracking）
- **题目类型**：多类别分类 / 回归 / 序列生成（视任务而定）
- **评估方式**：与 MIR SOTA 监督模型一致的任务专属指标（如 F1、Accuracy、OA 等）

## 主要指标

- **任务级指标**：各任务采用对应 MIR 领域标准指标（如情感回归用 R2/RMSE，歌词转录用 WER，拍子追踪用 F-measure）
- **总体排名**：以各任务指标归一化后的综合得分排名参与模型

## 局限性

- 任务以英语和西方音乐体系为主，对多语言、多文化音乐（如中国传统音乐、印度古典音乐）的覆盖有限
- 评测中发现明显的文化与时序偏见，但基准本身尚未设计针对性的去偏方案
- 部分任务（如拍子追踪）对 Audio LLM 生成格式要求严格，可能低估模型的真实能力

## 相关页面

- [[multimodal-eval]]
- [[SongEval]]
- [[SingMOS-Pro]]
