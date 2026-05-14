---
title: "Video-MME"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
aliases:
  - VideoMME
domain: [multimodal]
language: en
year: 2024
authors: ["Chaoyou Fu", "Yuhan Dai", "Yondong Luo", "Lei Li", "Shuhuai Ren", "Renrui Zhang", "Zihan Wang", "Chenyu Zhou", "Yunhang Shen", "Mengdan Zhang", "Peixian Chen", "Yanwei Li", "Shaohui Lin", "Sirui Zhao", "Ke Li", "Tong Xu", "Xiawu Zheng", "Enhong Chen", "Rongrong Ji", "Xing Sun"]
arxiv_id: "2405.21075"
official_url: "https://video-mme.github.io"
license: ""
size: 2700
format: multiple-choice
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2405.21075"
---

# Video-MME：全面的视频多模态评测基准

## 概述

Video-MME 是 2024 年提出的视频理解综合评测基准，专注于评测**视频多模态大模型（Video MLLMs）**的理解能力。它包含 **900 个视频**（总时长 254 小时）和 **2,700 道**问答题，覆盖短、中、长三种时长类别，是目前最全面的视频理解基准之一。

## 任务设计

Video-MME 按视频时长将样本分为三类：

**短视频（Short Duration）：**
- 时长 < 2 分钟（平均约 40 秒）
- 300 个视频，900 道题
- 聚焦单一场景或动作的理解

**中等视频（Medium Duration）：**
- 时长 4–15 分钟
- 300 个视频，900 道题
- 需要跨片段的时序理解

**长视频（Long Duration）：**
- 时长 30–60 分钟
- 300 个视频，900 道题
- 需要全局叙事理解、人物关系跟踪等长程推理

**视频类型：**
涵盖知识百科、体育、艺术表演、影视、游戏、纪录片、新闻等多种类别，确保场景多样性。

**评测能力：**
- 感知（Perception）：时序定位、运动理解
- 理解（Comprehension）：事件理解、情节关系
- 推理（Reasoning）：因果推断、预测

## 评分机制

标准多项选择准确率，每道题四个选项。同时提供有/无字幕（Subtitle）两种评测设置：
- **无字幕**：纯视觉+音频理解
- **有字幕**：允许利用视频字幕文本，测试语言辅助对视频理解的提升

## 数据特点

- 视频来源于 YouTube，均为公开授权内容
- 人工标注，经过多轮质量审核
- 支持视觉帧采样+音频+字幕三种输入模态的灵活组合评测
- 提供标准化帧采样协议（1fps/2fps），便于跨模型公平比较

## 主要发现与局限

Video-MME 揭示了当前视频理解模型的核心挑战：
- 所有模型在长视频理解上的性能显著低于短视频
- 字幕信息对长视频推理有明显辅助作用，反映出纯视觉建模的局限
- GPT-4o 在短视频上表现优秀，但在 30 分钟以上视频上显著下滑
- 当前模型在时序定位和跨场景推理上仍有较大提升空间

主要局限在于视频仅覆盖 YouTube 来源，多语言视频比例有限；多项选择格式无法评估生成式视频描述能力。

## 参考文献

Fu, C., Dai, Y., Luo, Y., et al. (2024). Video-MME: The First-Ever Comprehensive Evaluation Benchmark of Multi-modal LLMs in Video Analysis. *arXiv:2405.21075*.
