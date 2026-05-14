---
title: "ImageNet-A"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
year: 2021
arxiv_id: "1907.07174"
status: active
---

# ImageNet-A

> 由自然图像构成的对抗性 ImageNet 测试集，专门收录令标准模型大量失误的真实困难样本。

## 概述

ImageNet-A（Natural Adversarial Examples）由 Dan Hendrycks 等人于 2021 年提出，包含 **7,500 张**从互联网收集的真实自然图像，这些图像对标准 ImageNet 训练的 ResNet-50 模型造成了严重失误（模型准确率接近随机水平），但对人类而言并不困难。

与合成对抗样本不同，ImageNet-A 完全由**自然场景图像**构成，失误原因来自背景混乱、罕见视角、遮挡、纹理误导等真实因素，而非人工添加的扰动。这使其成为测试模型鲁棒性与分布外泛化能力（Out-of-Distribution Generalization）的有力工具。

ImageNet-A 仅覆盖 ImageNet-1K 的 **200 个类别**（选取困难类别），测试时需在这 200 类上计算准确率，不能与完整 1,000 类的 ImageNet-1K 结果直接比较。

## 任务格式

- 共 7,500 张自然图像，对应 200 个 ImageNet 类别
- 任务：图像分类（200 类子集）
- 仅含测试集，无训练集（不应在此数据上微调）
- 输入：RGB 图像（通常缩放至 224×224）

## 主要指标

- **Top-1 Accuracy（200 类子集）**：主要指标，通常远低于 ImageNet-1K 分数

## 局限性

- 仅覆盖 200 个类别，且这些类别被刻意选择为困难类，不代表全部 ImageNet 分布。
- 数据集规模较小（7,500 张），在某些类别上样本量不足，评估方差较大。
- 随着更强鲁棒训练方法（如 CLIP、数据增强）的普及，顶级模型在该集合上的差异正在缩小。

## 相关页面

- [[ImageNet-1K]]
- [[ImageNet-R]]
- [[ImageNet-V2]]
