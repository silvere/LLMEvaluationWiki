---
title: "ImageNet-1K"
aliases:
  - ImageNet
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
year: 2012
arxiv_id: ""
status: active
---

# ImageNet-1K

> 计算机视觉领域最具影响力的图像分类基准，包含 1,000 个类别的 120 万张训练图像，催生了深度学习革命。

## 概述

ImageNet-1K（即 ILSVRC 2012 分类子集）是由斯坦福大学李飞飞团队主导构建的大规模图像数据集，也是 ImageNet Large Scale Visual Recognition Challenge（ILSVRC）自 2012 年起的标准分类评测任务。该数据集包含 **1,000 个语义类别**、约 **120 万张训练图像**、50,000 张验证图像和 100,000 张测试图像，是计算机视觉发展史上的里程碑。

2012 年，AlexNet 在 ImageNet-1K 上以大幅优势击败传统方法，开启了深度卷积神经网络在视觉任务中的主导地位。此后，VGG、GoogLeNet、ResNet、ViT 等划时代模型均以 ImageNet-1K Top-1 准确率作为核心评测指标，该数据集成为视觉模型预训练与迁移学习的事实标准。

在多模态大语言模型评测中，ImageNet-1K 常作为视觉编码器能力的基础校验，尤其用于评估 zero-shot 图像分类（如 CLIP 等对比学习模型）的能力。

## 任务格式

- 训练集：~1,281,167 张图像；验证集：50,000 张；测试集：100,000 张
- 任务：单标签图像分类（1,000 类 WordNet 层级类别）
- 输入：RGB 图像（通常缩放至 224×224）
- 输出：预测类别（及 Top-5 候选）

## 主要指标

- **Top-1 Accuracy**：最高概率预测与真实标签一致的比例（主要指标）
- **Top-5 Accuracy**：真实标签出现在模型前 5 预测中的比例

## 局限性

- 数据集标注以 ImageNet 的 WordNet 层级为准，部分类别粒度极细（如不同犬种），与实际应用需求不完全对齐。
- 顶级模型 Top-1 准确率已超过 90%，接近人类水平，区分度持续下降，难以区分最新 SOTA 模型。
- 数据集存在已知的标注噪声（约 5.8% 标注错误），高分模型可能已超过"标注上限"。

## 相关页面

- [[ImageNet-A]]
- [[ImageNet-R]]
- [[ImageNet-V2]]
