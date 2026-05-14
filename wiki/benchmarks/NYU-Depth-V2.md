---
title: "NYU-Depth-V2"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
  - vision
year: 2012
arxiv_id: ""
status: active
---

# NYU-Depth-V2

> 纽约大学发布的 RGB-D 室内场景基准数据集，是单目深度估计和语义分割领域最广泛使用的标准测试集之一。

## 概述

NYU-Depth-V2（NYU Depth Dataset V2）由 Nathan Silberman、Pushmeet Kohli、Derek Hoiem 和 Rob Fergus 于 ECCV 2012 论文《Indoor Segmentation and Support Inference from RGBD Images》中发布，是计算机视觉领域室内场景理解研究的奠基性基准数据集。数据集使用 **Microsoft Kinect** 结构光传感器同步采集 RGB 图像与深度图，覆盖美国三个城市的多栋建筑中 **464 个不同室内场景**（住宅与商业场景）的 **26 种场景类别**。

标注子集包含 **1,449 张** 配对的 RGB-D 图像，带有密集的像素级语义分割标签和深度真值，图像分辨率为 640×480。原始原视频序列提供超过 40 万帧的未标注连续帧，可用于无监督/自监督深度估计预训练。官方划分为 795 张训练图像和 654 张测试图像。

在多模态 LLM 评测背景下，NYU-Depth-V2 被用于检验视觉语言模型的深度感知和空间理解能力，尤其在以下几个方向上具有重要地位：单目深度估计（Monocular Depth Estimation）、室内场景语义分割、以及深度补全（Depth Completion）。该数据集也是 SUN RGB-D 基准的重要来源数据集之一。

## 任务格式

- 数据集规模：1,449 张标注 RGB-D 图像，分辨率 640×480，原始视频超 40 万帧
- 场景覆盖：464 个室内场景，26 个场景类别（卧室、客厅、厨房、浴室、办公室等）
- 标注内容：像素级深度图（Kinect 深度真值，经过缺失值填充处理）+ 像素级语义分割（894 个细粒度类别，通常使用 40 类精简版本）
- 主要下游任务：单目深度估计、RGB-D 语义分割、3D 场景重建、法线估计
- 官方划分：训练集 795 张，测试集 654 张

## 主要指标

**深度估计任务：**
- **AbsRel**（Absolute Relative Error）：预测深度与真值的绝对相对误差，主要指标
- **RMSE**（Root Mean Square Error）：均方根误差
- **δ < 1.25**：预测深度与真值之比在 [1/1.25, 1.25] 范围内的像素比例（准确率指标）

**语义分割任务：**
- **mIoU**：40 个类别的平均交并比
- **像素准确率**（Pixel Accuracy）

## 局限性

- 数据集完全局限于室内场景，且以北美城市建筑为主，场景多样性受限
- Kinect v1 深度传感器对镜面反射、强光照、远距离区域存在深度缺失（"flying pixels"），深度图质量不均
- 1,449 张标注样本规模较小，在深度学习时代已难以满足大规模监督训练的需求
- 随着更高质量的室内深度数据集（如 ScanNet、Hypersim）的出现，NYU-Depth-V2 的训练价值有所下降，但仍作为标准测试集沿用

## 相关页面

- [[ARKitScenes]]
- [[SUN-RGBD]]
- [[multimodal-eval]]
