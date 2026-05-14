---
title: "POPE"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [multimodal, hallucination]
language: en
year: 2023
authors: ["Yifan Li", "Yifan Du", "Kun Zhou", "Jinpeng Wang", "Wayne Xin Zhao", "Ji-Rong Wen"]
arxiv_id: "2305.10355"
official_url: "https://github.com/AoiDragon/POPE"
license: ""
size: 8910
format: multiple-choice
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2305.10355"
---

# POPE：视觉对象幻觉轮询评测基准

## 概述

POPE（Polling-based Object Probing Evaluation）是 2023 年提出的视觉语言模型**对象幻觉（Object Hallucination）**专项评测基准，发表于 EMNLP 2023。它通过系统性的轮询问答方式检测模型是否会"凭空捏造"图像中不存在的对象，是目前最广泛使用的幻觉评测基准之一。

## 任务设计

POPE 的核心思想是：通过问"图中是否存在对象 X？"来探测模型的幻觉倾向。

**数据构建策略（三种采样方式）：**

1. **随机采样（Random）**：从 MSCOCO 类别中随机选择不存在于图中的对象作为负样本
2. **流行采样（Popular）**：选择在数据集中频繁出现的对象作为负样本，难度更高
3. **对抗采样（Adversarial）**：选择经常与图中已有对象共同出现的对象作为负样本，最难

每种策略构造等量的正样本（图中实际存在的对象）和负样本（图中不存在的对象），问题格式为"Is there a [object] in the image? Please answer yes or no."

## 评分机制

POPE 使用二分类评测指标：
- **准确率（Accuracy）**：正负样本整体答对比例
- **精确率（Precision）**：回答"是"的题目中实际为正的比例
- **召回率（Recall）**：实际为正的题目中回答"是"的比例
- **F1 Score**：精确率和召回率的调和均值

分别针对三种采样策略汇报指标，其中对抗采样下的 F1 Score 最能反映模型的幻觉抵抗能力。

## 数据特点

- 基于 MSCOCO 500 张图像构建，总计约 8,910 道问答对（3 种策略 × 500 图 × 约 6 题）
- 正负样本 1:1 配比，消除标签偏置
- 完全依赖是/否回答，评分简单可靠
- 被广泛用作多模态模型论文的标准幻觉报告指标

## 主要发现与局限

POPE 揭示了早期多模态模型幻觉问题的严重性：
- 早期 LLaVA 等模型在对抗采样下 F1 约 75–80%，存在明显幻觉倾向
- 模型训练数据中对象共现统计对幻觉有直接影响
- 通过 RLHF、幻觉惩罚训练等方法可显著提升 POPE 得分
- 随着技术进步，主流模型在 POPE 上已普遍达到 85–90%，区分度下降

主要局限在于 POPE 仅覆盖"对象存在性"幻觉，无法评估属性幻觉（颜色、数量错误）和关系幻觉；基于 COCO 的图像分布较为受限；二元问答无法区分不同程度的幻觉。

## 参考文献

Li, Y., Du, Y., Zhou, K., et al. (2023). Evaluating Object Hallucination in Large Vision-Language Models. *arXiv:2305.10355*. EMNLP 2023.
