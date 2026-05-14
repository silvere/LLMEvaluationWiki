---
title: "SongEval"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - audio
year: 2025
arxiv_id: "2505.10793"
status: active
---

# SongEval

> 西北工业大学 ASLP 实验室发布的 AI 生成歌曲美学评测基准，首个包含完整曲目和专业标注的开源歌曲质量评测数据集。

## 概述

SongEval 由西北工业大学语音语言处理实验室（ASLP-lab）发布，论文于 2025 年 5 月提交至 arXiv（2505.10793），并已被 ICASSP 2026 收录。SongEval 是目前规模最大的开源 AI 生成歌曲美学评测数据集，填补了歌曲生成评测领域缺乏专业主观基准的空白。

歌曲生成（song generation）是比纯文字生成或纯音乐生成更复杂的任务，因为它需要歌词与旋律、歌声、伴奏的协调配合。现有客观指标（如 FAD、FID）难以捕捉人类对歌曲整体美学感受的判断，而现有 MOS 评测主要针对语音合成，对歌曲场景适配性差。SongEval 通过收集真实完整曲目并招募专业标注者，建立了与人类感知更为一致的评测标准。

数据集包含 2,399 首完整歌曲（共超 140 小时音频），由 YuE、DiffRhythm、Mureka、Suno、Udio 五款代表性生成模型产生，覆盖蓝调、流行、摇滚、古典、爵士、电子、嘻哈、世界音乐和乡村九种流派，同时包含中英双语歌曲。评分由 16 名具有音乐背景的专业标注者完成，每首歌曲从五个维度打分。

## 任务格式

- **歌曲总量**：2,399 首完整歌曲（总时长超 140 小时）
- **生成模型**：YuE、DiffRhythm、Mureka、Suno、Udio（五款主流系统）
- **语言**：中文、英文
- **音乐风格**：9 种（蓝调/流行/摇滚/古典/爵士/电子/嘻哈/世界音乐/乡村）
- **评估方式**：人工专业评分（16 名具备音乐背景的标注者）+ 自动预测模型
- **评分维度**：整体连贯性、记忆度、气息与分句自然度、曲结构清晰度、整体音乐性

## 主要指标

- **五维美学评分（Aesthetic Scores）**：整体连贯性（overall coherence）、记忆度（memorability）、气息/分句自然度（naturalness of breathing and phrasing）、曲结构清晰度（clarity of structure）、整体音乐性（overall musicality）
- **自动预测准确性**：CLAP-based 自动评分模型在 SongEval 上的表现优于现有客观指标

## 局限性

- 标注主观性较强，五个维度的边界在部分歌曲上存在模糊
- 16 名标注者规模相对有限，对小众曲风或特定文化背景歌曲的评分代表性可能不足
- 当前数据集仅覆盖五款模型，随着歌曲生成技术快速迭代，数据集可能很快过时

## 相关页面

- [[multimodal-eval]]
