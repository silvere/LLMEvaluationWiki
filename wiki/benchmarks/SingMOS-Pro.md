---
title: "SingMOS-Pro"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - audio
year: 2024
arxiv_id: "2510.01812"
status: active
---

# SingMOS-Pro

> 首个多语言、多任务的歌声质量评测 MOS 数据集，覆盖歌声合成（SVS）、歌声转换（SVC）和歌声修复（SVR），并被 ASRU 2024 VoiceMOS 挑战赛采用。

## 概述

SingMOS-Pro 由 TangRain 等研究者构建，论文于 2024 年 10 月提交至 arXiv（2510.01812）。它是 SingMOS 数据集（arXiv 2406.10911）的扩展增强版，旨在建立一个更全面、多任务的歌声质量评测（Singing Quality Assessment, SQA）标准。

歌声合成与语音合成的质量评测有本质区别：歌声需要同时保证音高准确性、节奏稳定性、歌词可懂度和整体音乐表现力，任何维度的缺失都会显著降低听感。传统 MOS（Mean Opinion Score）评测主要针对语音合成，无法有效区分歌声的不同质量维度。SingMOS-Pro 通过引入多维度评分标准，将歌词得分（lyrics score）、旋律得分（melody score）和整体 MOS（overall MOS）分开标注，提供了更细粒度的质量信号。

数据集覆盖 SVS（歌声合成）、SVC（歌声转换）和 SVR（歌声修复）三类主要歌声处理任务，是目前唯一同时覆盖这三类任务的 MOS 数据集。数据集中的歌声来自多款最新系统，由 78 名有经验的标注者完成评分，总计收集超过 44,000 条评分记录，预览版已被 ASRU 2024 VoiceMOS 挑战赛的歌声赛道正式采用。

## 任务格式

- **音频片段总量**：7,981 段（SVS: 3,425 段，SVC: 1,307 段，SVR: 2,671 段，真实录音: 578 段）
- **总时长**：约 11.15 小时
- **题目类型**：主观评分任务（听音打分）
- **评估方式**：MOS 预测（回归任务）；与人工评分的皮尔逊相关系数（PCC）和 Spearman 相关系数（SRCC）
- **每段片段标注数**：5 名标注者
- **标注总数**：44,247 条评分记录
- **标注人员**：78 名有经验的标注者

## 主要指标

- **歌词得分（Lyrics Score）**：歌词可懂度与发音准确性评分
- **旋律得分（Melody Score）**：音高准确性与旋律连贯性评分
- **整体 MOS（Overall MOS）**：歌声合成质量的总体主观得分
- **预测相关性**：自动 SQA 模型与人工评分的 PCC / SRCC

## 局限性

- 标注者主要为有经验的普通听众，并非职业歌手或声乐专家，在专业维度的评分精准性上有所局限
- 数据集以中文歌声为主，英文和其他语言的覆盖较少，多语言泛化能力待验证
- SVC 和 SVR 任务下游应用场景与 SVS 差异较大，统一 MOS 框架评测可能低估某些任务的特定质量要求

## 相关页面

- [[SongEval]]
- [[CMI-Bench]]
- [[multimodal-eval]]
