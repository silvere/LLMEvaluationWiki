---
title: "COCO-Stuff-164K"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
  - vision
year: 2018
arxiv_id: "1612.03716"
status: active
---

# COCO-Stuff-164K

> 在 COCO 2017 全量 164K 图像上扩展像素级 Stuff 类别标注的语义分割数据集，是当前规模最大的 Thing+Stuff 全类型标注数据集之一。

## 概述

COCO-Stuff 由 Caesar 等人于 CVPR 2018 论文《COCO-Stuff: Thing and Stuff Classes in Context》（arXiv 1612.03716）中提出，是对 MS-COCO 数据集的重要语义标注扩展。原始 COCO 数据集仅提供 80 个"Thing"类别（具有明确轮廓的可数物体）的实例级标注，COCO-Stuff 进一步为全部 164K 张图像补充了 **91 个"Stuff"类别**（无明确轮廓的背景材质与场景区域，如天空、草地、水面、道路等）的像素级标注，使得 COCO-Stuff-164K 成为同时覆盖 Thing（80 类）和 Stuff（91 类）两大语义类型共 **171 个有效类别**（另加 1 个"unlabeled"类）的完整场景理解数据集。

COCO-Stuff 采用了基于超像素（superpixel）的高效标注协议，借助原有 Thing 标注指导 Stuff 区域划分，显著提升了大规模密集标注的效率。由于同时具备自然语言描述（来自 COCO Caption）、目标检测、实例分割与语义分割四类标注，COCO-Stuff-164K 为场景理解的多任务联合研究提供了理想的统一平台。

在多模态 LLM 时代，COCO-Stuff-164K 被用于全景分割（Panoptic Segmentation）模型的训练与评测，并作为视觉语言模型空间推理与场景描述能力的细粒度评测数据来源。

## 任务格式

- 数据集规模：164K 张图像（训练集 118K，验证集 5K，测试集 40K）
- 标注类型：像素级语义分割，涵盖 80 个 Thing 类 + 91 个 Stuff 类（共 172 类含 unlabeled）
- 每张图像提供完整的 Stuff 类别像素掩码，与现有 COCO Thing 标注无缝融合
- 支持语义分割、全景分割（Panoptic Segmentation）、场景理解等多类下游评测任务
- 评测通常基于 COCO 官方 API 或主流框架（MMSegmentation、Detectron2）

## 主要指标

- **mIoU**（mean Intersection over Union）：各语义类别 IoU 的平均值，主要指标
- **Panoptic Quality（PQ）**：全景分割专用指标，同时衡量分割质量与类别分类正确性
- 分别统计 Things、Stuff 子集以及全集的 mIoU，以分析模型对两类语义区域的差异表现

## 局限性

- Stuff 标注基于超像素自动分割辅助人工修正，在复杂纹理区域存在边界不精确的问题
- 91 个 Stuff 类别的分布高度不均衡，"天空""路"等高频类与"雪地""镜子"等低频类的训练样本差异悬殊
- 测试集无公开标注，需通过 COCO 官方服务器提交，限制了快速迭代评测
- 随着更精细的语义分割数据集（如 ADE20K-Full、Mapillary Vistas）出现，COCO-Stuff 的标注粒度在部分任务上已显不足

## 相关页面

- [[ADE20K]]
- [[MMMU]]
- [[multimodal-eval]]
