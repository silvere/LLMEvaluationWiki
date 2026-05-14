---
title: "ImageNet-R"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
year: 2021
arxiv_id: "2006.16668"
status: active
---

# ImageNet-R

> ImageNet 的多渲染风格测试集，收录艺术画、卡通、素描等多种非照片渲染形式，测试模型对风格分布偏移的鲁棒性。

## 概述

ImageNet-R（Renditions）由 Dan Hendrycks 等人于 2021 年提出，包含 **30,000 张**来自 ImageNet 200 个类别的多种渲染风格图像，涵盖艺术画（art）、卡通（cartoon）、素描（sketch）、刺绣（embroidery）、折纸（origami）、玩具（toy）、雕塑（sculpture）等多达 30 种视觉风格。

ImageNet-R 旨在测试模型是否能识别跨越不同视觉域（domain）的同一概念，而不仅仅依赖于真实照片的纹理统计特征。这与人类视觉的强泛化能力对照：人类能轻松识别一张卡通猫与一只真实猫为同一类别，而依赖纹理偏差训练的 CNN 模型往往在此类测试上表现不佳。

该数据集是评测视觉模型**风格不变性**与**形状偏置**（shape bias）的重要工具，也被广泛用于对比 CNN 与 ViT 类模型在分布外泛化上的差异。

## 任务格式

- 共 30,000 张图像，覆盖 200 个 ImageNet 类别的多种渲染风格
- 任务：图像分类（200 类子集）
- 仅含测试集，不应在此数据上微调
- 输入：RGB 图像（通常缩放至 224×224）

## 主要指标

- **Top-1 Accuracy（200 类子集）**：主要指标

## 局限性

- 仅覆盖 200 个类别，且多数为较具象的物体类别，不涵盖全部 ImageNet 分布。
- 部分渲染风格样本量不均衡，不同风格之间的难度差异较大。
- "渲染风格"本身是一个宽泛概念，数据集涵盖的 30 种风格未必能代表所有视觉域偏移。

## 相关页面

- [[ImageNet-1K]]
- [[ImageNet-A]]
- [[ImageNet-V2]]
