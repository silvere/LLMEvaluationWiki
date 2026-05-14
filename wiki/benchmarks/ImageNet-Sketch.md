---
title: "ImageNet-Sketch"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - vision
year: 2019
arxiv_id: "1905.13549"
status: active
---

# ImageNet-Sketch

> ImageNet 1000 类的手绘草图变体，专门用于评测视觉模型对非自然图像分布的域外泛化能力。

## 概述

ImageNet-Sketch 由 Wang 等人于 NeurIPS 2019 论文《Learning Robust Global Representations by Penalizing Local Predictive Power》（arXiv 1905.13549）中伴随发布，是一个与 ImageNet 验证集类别完全对应的**草图风格图像**评测数据集。其核心目标是评测在 ImageNet 自然照片上预训练的视觉模型，是否能够迁移到以黑白草图为主的非自然图像分布，衡量模型对语义概念的泛化能力而非纹理依赖性。

数据集包含 **50,000 张**草图图像，覆盖全部 **1,000 个 ImageNet 类别**，每个类别恰好 50 张。图像通过 Google 图片搜索以 "sketch of [类名]" 为查询词、限定黑白色彩方案获取，并经过人工清洗去除无关图像，对样本不足的类别通过翻转/旋转进行数据增强。整体图像风格接近手绘草图或线条插图，视觉特征与标准 ImageNet 照片存在显著分布差距。

ImageNet-Sketch 已成为评测视觉模型域外（Out-of-Distribution, OOD）泛化能力的标准基准之一，与 ImageNet-A（对抗样本）、ImageNet-C（损坏扰动）、ObjectNet（姿态/背景变化）等变体共同构成 ImageNet 泛化评测套件，被 CLIP、ViT、ConvNeXt 等主流视觉基础模型广泛用于报告鲁棒性性能。

## 任务格式

- 数据集规模：50,000 张草图图像，1,000 个 ImageNet 类别，每类 50 张
- 任务：图像分类，类别体系与 ImageNet ILSVRC 1000 类完全一致
- 评测方式：使用在 ImageNet 自然图像上预训练的模型，直接在草图图像上进行零样本或线性探测分类，无额外草图训练数据
- 评测指标以 Top-1 / Top-5 准确率为主，与 ImageNet 标准验证集结果进行对比，差距大小反映域外泛化能力

## 主要指标

- **Top-1 准确率**：正确分类图像比例，主要指标
- **Top-5 准确率**：前 5 名预测中包含正确类别的图像比例
- 通常与 ImageNet-val（自然图像）Top-1 对比，报告"性能下降幅度"以量化域漂移带来的损失

## 局限性

- 图像来源于网络搜索，草图质量参差不齐，部分图像接近艺术插图而非手绘草图，风格不够一致
- 每类仅 50 张，样本量有限，对低频类别的评测噪声较大
- 评测范围局限于闭集 1000 类分类，不覆盖细粒度识别、目标定位等任务
- 随着 CLIP 等大规模视觉-语言预训练模型出现，草图类 OOD 基准上的性能差距大幅缩小，区分度逐渐降低

## 相关页面

- [[MMMU]]
- [[multimodal-eval]]
