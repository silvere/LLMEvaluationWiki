---
title: "SUN-RGBD"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
  - vision
year: 2015
arxiv_id: ""
status: active
---

# SUN-RGBD

> 普林斯顿大学发布的 RGB-D 室内场景理解综合基准套件，包含 10,335 张密集标注图像，覆盖 2D/3D 多项场景理解任务。

## 概述

SUN RGB-D 由普林斯顿大学的 Shuran Song 等人于 CVPR 2015 论文《SUN RGB-D: A RGB-D Scene Understanding Benchmark Suite》中发布，是室内 RGB-D 场景理解领域规模最大、标注最全面的基准数据集之一。数据集整合了来自四种不同深度传感器的图像序列（Intel RealSense、Asus Xtion LIVE PRO、Kinect v1、Kinect v2），同时吸收了 NYU Depth V2、Berkeley B3DO 和 SUN3D 中的已有数据，最终构成包含 **10,335 张 RGB-D 图像**的综合数据集。

SUN RGB-D 的核心贡献在于其极为丰富的多层次标注体系：每张图像都包含 **2D 多边形语义分割**（146,617 个）、**3D 有向包围盒**（64,595 个，带物体方向角）、**3D 房间布局**和**场景类别**标注，支持从像素级 2D 分割到完整 3D 场景理解的全链路评测。数据集包含 37 个物体类别，训练集 5,285 张，测试集 5,050 张。

SUN RGB-D 的多传感器设计使其能够反映真实世界中不同 RGB-D 设备的性能差异，同时为研究跨传感器域迁移提供了独特的基础。在多模态 LLM 评测中，SUN RGB-D 被用于检验模型对室内 3D 空间结构、物体方向和场景布局的理解能力，常与 ScanNet 等数据集联合使用于 3D 视觉语言模型的评测。

## 任务格式

- 数据集规模：10,335 张 RGB-D 图像（训练集 5,285 张，测试集 5,050 张）
- 传感器来源：Intel RealSense / Asus Xtion / Kinect v1 / Kinect v2（四种传感器）
- 整合来源：NYU Depth V2、Berkeley B3DO、SUN3D 以及新采集数据
- 标注层次：
  - 2D：像素级语义分割多边形（146,617 个，880 个精细类别）
  - 3D：有向目标包围盒（64,595 个，带物体方向角）
  - 3D：完整房间布局（墙面、地面、天花板）
  - 场景级别：场景类别标签（47 个场景类型）
- 标准评测任务：2D 语义分割（37 类）、3D 目标检测、3D 场景布局估计

## 主要指标

**2D 语义分割：**
- **mIoU**：37 个物体类别的平均交并比
- **像素准确率**（Pixel Accuracy）

**3D 目标检测：**
- **mAP**（mean Average Precision）@3D IoU 阈值（通常为 0.25 和 0.5），分类别报告

**深度估计：**
- AbsRel、RMSE、δ 阈值准确率（当用作深度基准评测时）

## 局限性

- 四种传感器采集的数据在深度质量、分辨率和视场角上存在显著差异，直接训练可能导致模型偏向特定传感器特性
- 3D 包围盒标注仅覆盖 37 个常见物体类别，对长尾物体的支持有限
- 图像分辨率因传感器不同而异（主要为 640×480），缺乏高分辨率 RGB-D 数据
- 随着 ScanNet（室内 3D 重建）、Matterport3D（360° 全景 RGB-D）等更大规模数据集的发布，SUN RGB-D 在 3D 理解任务上的主导地位有所下降，但测试集评测基准地位仍被广泛保留

## 相关页面

- [[ARKitScenes]]
- [[NYU-Depth-V2]]
- [[multimodal-eval]]
