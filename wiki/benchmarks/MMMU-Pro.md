---
title: "MMMU-Pro"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [multimodal, knowledge]
language: en
year: 2024
authors: ["Xiang Yue", "Tianyu Zheng", "Yuansheng Ni", "Yubo Wang", "Kai Zhang", "Shengbang Tong", "Yuxuan Sun", "Ming Yin", "Botao Yu", "Ge Zhang", "Huan Sun", "Yu Su", "Wenhu Chen", "Graham Neubig"]
arxiv_id: "2409.02813"
official_url: "https://mmmu-benchmark.github.io"
license: ""
size: 3460
format: multiple-choice
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2409.02813"
---

# MMMU-Pro：专业多学科多模态进阶评测基准

## 概述

MMMU-Pro 是 2024 年提出的 **MMMU（Massive Multitask Multimodal Understanding）进阶版本**，专为应对顶尖多模态模型在 MMMU 上接近饱和的问题而设计。它包含约 **3,460 道**题目，通过增加题目难度、引入多图推理和扩展选项数量，显著提升了对最先进模型的区分能力。

## 任务设计

MMMU-Pro 相比 MMMU 做出了三项关键改进：

**1. 扩展选项数量：**
- MMMU 为 4 选 1，MMMU-Pro 扩展为 **10 选 1**
- 增加更多高质量干扰项，降低猜测获分的概率

**2. 纯视觉问题（Vision-Only）：**
- 将文字类题目转化为图像呈现（把问题和选项都嵌入图像中）
- 要求模型直接从视觉内容理解题目，无文字提示
- 测试真正的视觉文字理解能力，而非依赖文字模态

**3. 多图推理：**
- 部分题目涉及多张图像的综合推理
- 需要跨图信息整合和比较分析

**学科覆盖（与 MMMU 一致）：**
涵盖艺术与设计、商业、科学、健康与医学、人文社科、技术与工程共 6 大领域 30 个学科。

## 评分机制

标准多项选择准确率（10 个选项），完全自动化评分。分别汇报标准版（文字+图像题）和纯视觉版（Vision-Only）的准确率。

## 数据特点

- 3,460 道题覆盖 30 个学科，每道题配有 1–3 张图像
- 所有题目均需研究生及以上水平的专业知识
- 题目同时在标准模式（文字+图像）和纯视觉模式下评测
- 通过扩展选项和专家级难度过滤，有效避免简单猜测

## 主要发现与局限

MMMU-Pro 发布时揭示了顶尖模型在更难条件下的能力边界：
- GPT-4V 在 MMMU 上约达 56% 准确率，但在 MMMU-Pro（10 选 1）上仅约 46%
- 纯视觉模式（Vision-Only）对所有模型造成约 10–15% 的额外性能下降
- 医学、工程类学科是难度最高的领域
- 即使是最强的 Claude/GPT-4o 系列，在 MMMU-Pro 上仍有较大提升空间

主要局限在于题目内容主要面向英语学术背景；10 选 1 格式使部分评测结果可解释性降低；专业知识要求极高，人类标注员本身可能存在判断误差。

## 参考文献

Yue, X., Zheng, T., Ni, Y., et al. (2024). MMMU-Pro: A More Robust Multi-discipline Multimodal Understanding Benchmark. *arXiv:2409.02813*.
