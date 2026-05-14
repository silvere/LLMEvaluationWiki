---
title: "WildVision"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [multimodal]
language: en
year: 2024
authors: ["Yujie Lu", "Dongfu Jiang", "Wenhu Chen", "William Yang Wang", "Yejin Choi", "Bill Yuchen Lin"]
arxiv_id: "2406.11069"
official_url: "https://huggingface.co/spaces/WildVision/vision-arena"
license: ""
size: 0
format: open-ended
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2406.11069"
  - "https://huggingface.co/datasets/WildVision/wildvision-bench"
---

# WildVision：野外真实用户多模态评测

## 概述

WildVision 是 2024 年提出的多模态模型"野外"（In-the-Wild）评测框架，通过收集真实用户向多模态模型提交的图像和问题，构建贴近实际应用场景的评测数据集。与实验室构建的基准不同，WildVision 的数据来源于真实用户在对话中上传的图片，能够反映模型在真实部署场景中的表现。

## 任务设计

WildVision 的核心组成包括两部分：

**WildVision-Arena（对话竞技场）：**
- 用户上传真实图片并提问，系统随机分配两个匿名多模态模型同时回答
- 用户对比两个回答后进行偏好投票
- 基于 ELO 分数系统对模型进行排名
- 类似 Chatbot Arena（LMSYS）的多模态扩展版本

**WildVision-Bench（静态基准）：**
- 从收集的真实用户交互中筛选高质量样本
- 包含多样化的真实世界图像和问题类型
- 使用 GPT-4V 作为评判模型进行自动评分

**真实用户问题类型分布：**
- 图像描述与解释（约 30%）
- 视觉推理与分析（约 25%）
- OCR 与文档理解（约 15%）
- 创意与娱乐（约 15%）
- 技术与专业问题（约 15%）

## 评分机制

WildVision 采用双轨评测：
- **Arena ELO**：基于大量人类偏好投票的相对排名，统计意义强
- **自动评分**：GPT-4V 对模型回答质量打分（1–10 分），支持大规模批量评测

## 数据特点

- 图像来源于真实用户上传，场景极为多样（meme、产品图、截图、手写笔记等）
- 数据持续更新，反映最新用户需求分布
- 相比实验室构建基准，更难通过特定训练集针对性优化
- 支持多语言提问（英文为主，含中文等其他语言）

## 主要发现与局限

WildVision 揭示了野外评测与标准基准排名的差异：
- 在传统多模态基准上得分较高的模型，在 WildVision Arena 中不一定获得用户偏好
- 用户在真实使用中更关注回答的实用性和格式，而非纯粹准确性
- OCR 和文档类问题是用户最常提交的真实需求之一
- 多模态模型在处理非英语文字图像和用户自拍截图时表现差异显著

主要局限在于 ELO 排名依赖用户投票量，早期数据统计方差较大；GPT-4V 自动评分存在偏向某些回答风格的倾向；真实用户数据可能含有隐私信息，数据清洗成本高。

## 参考文献

Lu, Y., Jiang, D., Chen, W., et al. (2024). WildVision: Evaluating Vision-Language Models in the Wild with Human Preferences. *arXiv:2406.11069*.
