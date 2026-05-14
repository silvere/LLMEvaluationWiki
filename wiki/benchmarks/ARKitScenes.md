---
title: "ARKitScenes"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
  - vision
year: 2021
arxiv_id: "2111.08897"
status: active
---

# ARKitScenes

> Apple 发布的首个基于消费级 LiDAR 传感器采集的大规模室内 RGB-D 数据集，用于 3D 场景理解评测。

## 概述

ARKitScenes 由 Apple Machine Learning Research 于 2021 年发布，是第一个利用消费级设备（iPad Pro 内置 LiDAR 扫描仪）采集的大规模 RGB-D 室内场景数据集。论文发表于 NeurIPS 2021 Datasets and Benchmarks Track。与此前主要依赖专业扫描设备的数据集不同，ARKitScenes 使用大规模可普及硬件采集，显著降低了数据获取门槛，同时引入了更真实的传感器噪声特征。

数据集包含 **5,048 个 RGB-D 序列**，覆盖 **1,661 个唯一室内场景**，规模超过此前最大同类数据集的三倍。每帧数据包括宽角 RGB 相机图像、超广角 RGB 图像、LiDAR 深度图、IMU 数据，以及 ARKit 估计的相机位姿和场景重建结果。此外，数据集还使用固定激光扫描仪采集了高分辨率的地面真值深度图，并对大量家具类别进行了人工标注的 3D 有向包围盒（OBB）。

在多模态 LLM 评测语境中，ARKitScenes 被用作衡量视觉语言模型空间推理与 3D 场景理解能力的评测平台，尤其适用于目标检测、深度估计和室内导航等下游任务。

## 任务格式

- 数据集规模：5,048 个序列，覆盖 1,661 个室内场景，包含多种家庭与商业场景类型
- 每序列提供：宽角 RGB / 超广角 RGB / LiDAR 深度图 / IMU / ARKit 位姿 / ARKit 场景重建
- 高质量地面真值：固定激光扫描仪高分辨率深度图，人工标注 3D OBB
- 官方下游评测任务：3D 目标检测（以 mAP 为主要指标）和色彩引导深度超分辨率
- 数据采集传感器：Apple iPad Pro LiDAR + RGB 摄像头 + IMU

## 主要指标

- **3D 目标检测**：mAP（mean Average Precision）@IoU 阈值，按家具类别分别统计
- **深度超分辨率**：RMSE、AbsRel（绝对相对误差）、δ 阈值准确率
- 跨场景类别和传感器类型的性能泛化分析

## 局限性

- 数据集采集完全集中于室内家庭/商业场景，缺乏室外和工业场景，泛化范围有限
- ARKit 位姿估计存在累积漂移，在长序列或遮挡严重场景下精度下降
- 消费级 LiDAR 精度低于工业级设备，深度噪声在远距离和镜面反射区域尤为明显
- 标注主要覆盖家具类别（约 17 类），物体类别覆盖范围相比 ScanNet、Matterport3D 等数据集更为局限

## 相关页面

- [[NYU-Depth-V2]]
- [[SUN-RGBD]]
- [[multimodal-eval]]
