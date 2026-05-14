---
title: "WildVision Arena"
type: leaderboard
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# WildVision Arena

## 概述

WildVision Arena 是专注于**多模态语言模型**能力评测的竞技场式排行榜，由艾伦人工智能研究所（AI2）等机构联合开发。与 Chatbot Arena 的文本对话评测类似，WildVision Arena 允许真实用户上传图像并提出问题，通过用户的真实投票来评测不同多模态模型的视觉理解能力。

## 评测机制

**用户投票模式**：
- 用户上传真实图像，输入相关问题
- 系统向两个匿名模型展示相同的图像和问题
- 用户根据回答质量投票，选择更好的一方
- 基于大量投票通过 Elo 评分系统计算排名

**评测优势**：这种"真实用户 + 真实图像"的设计确保了评测反映实际使用场景，而非精心设计的学术测试图像。

## 多模态评测的特殊挑战

WildVision Arena 揭示了多模态评测的若干核心难题：

1. **视觉幻觉**：模型对图像中不存在的内容产生幻觉，是多模态模型最常见的错误类型
2. **细粒度识别**：文字识别（OCR）、图表理解、专业领域图像识别等需要精细视觉能力
3. **视觉推理**：需要结合图像内容进行多步推理的任务
4. **主观评判**：图像描述和审美判断难以有客观标准

## 排行榜特点

**优势**：
- 真实用户上传的图像多样性极高，覆盖自然场景、文档、截图、艺术品等
- 投票机制直接反映用户满意度
- 动态排名持续更新，新模型可快速获得评测结果

**局限性**：
- 用户投票质量参差不齐，缺乏专业评测标准
- 图像分布存在偏差（取决于用户群体）
- 排名稳定性需要大量投票，新模型初期置信区间较大
- 不同模型处理图像的分辨率上限不同，影响公平性

## 在多模态评测生态中的位置

WildVision Arena 与 MMBench、MME、MMMU 等基于标准测试集的多模态基准形成互补。标准基准提供可复现的客观评分，WildVision Arena 提供真实用户视角下的主观偏好排名。

## 访问方式

- HuggingFace Space：WildVision/wildvision-arena
- GitHub：[github.com/WildVision-AI/WildVision-Arena](https://github.com/WildVision-AI/WildVision-Arena)
