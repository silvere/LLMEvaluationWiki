---
title: "VQAv2"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [multimodal]
language: en
year: 2017
authors: ["Yash Goyal", "Tejas Khot", "Douglas Summers-Stay", "Dhruv Batra", "Devi Parikh"]
arxiv_id: "1612.00837"
official_url: "https://visualqa.org"
license: ""
size: 2150000
format: open-ended
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/1612.00837"
---

# VQAv2：视觉问答平衡数据集 v2

## 概述

VQAv2 是 2017 年由 Goyal 等人提出的视觉问答数据集，发表于 CVPR 2017。它是原始 VQA（VQA v1）的改进版本，通过**配对平衡（Balanced Pairs）**机制消除了语言先验偏见，共包含约 **215 万道**问答对，基于 COCO 图像数据集构建。VQAv2 是视觉问答领域最重要的基准之一，长期作为多模态模型的标准评测集。

## 任务设计

VQAv2 的核心设计创新是针对 VQA v1 存在的**语言偏见（Language Bias）**问题：
- VQA v1 中，模型即使不看图像，仅依靠问题文本的统计规律（如"Is there a ..." → 答 "yes"）就能获得较高准确率
- VQAv2 要求对每道题找到一张**配对反例图像**，使相同问题对不同图像有不同答案（如一张有猫的图 vs. 一张没猫的图）

问题类型覆盖：
- 是/否（Yes/No）：约 38%
- 数量（Number）：约 12%
- 其他（Other）：约 50%，包含颜色、物体、场景等开放性回答

## 评分机制

VQAv2 采用标准 **VQA 准确率**：
- 每道题有 10 个人工标注答案
- 准确率 = min(匹配答案数 / 3, 1)
- 最终分数为测试集所有题目的平均准确率

## 数据特点

- 基于 COCO 2015 图像集（约 204,721 张图像）
- 训练集约 443,757 道，验证集 214,354 道，测试集 447,793 道
- 通过 EvalAI 平台维护测试集评测，防止答案泄露
- 每道题均有开放域自由文本答案，无固定选项

## 主要发现与局限

VQAv2 发布后显著提高了 VQA 研究的难度和质量：
- 通过配对平衡，纯语言模型的准确率从 VQA v1 的约 57% 降低至约 50%（接近随机）
- 视觉问答系统准确率从 60% 左右（早期 CNN+LSTM）逐步提升至 80% 以上（BLIP-2、GPT-4V 等）
- 人类表现约为 83%

主要局限在于图像来源于 COCO，场景偏向日常生活，覆盖范围有限；配对反例构造过程依赖众包，部分配对质量参差不齐；随着模型能力不断提升，VQAv2 对最先进模型的区分度已有所下降。

## 参考文献

Goyal, Y., Khot, T., Summers-Stay, D., et al. (2017). Making the V in VQA Matter: Elevating the Role of Image Understanding in Visual Question Answering. *arXiv:1612.00837*. CVPR 2017.
