---
title: "ImageNet-V2"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
year: 2019
arxiv_id: "1902.10811"
status: active
---

# ImageNet-V2

> ImageNet 测试集的重采样版本，旨在揭示模型是否对原始测试集产生了过拟合。

## 概述

ImageNet-V2 由 Benjamin Recht 等人于 2019 年提出，通过严格遵循原始 ImageNet 数据收集流程重新采样，构建了一个与 ImageNet-1K 测试集分布高度相似但**图像全新**的测试集，包含 **10,000 张**图像（每类 10 张），覆盖全部 1,000 个 ImageNet 类别。

这项工作的核心发现是：几乎所有在 ImageNet-1K 上报告的模型均在 ImageNet-V2 上出现了 **约 11–14% 的准确率下降**，且不同规模和架构的模型均无法规避这一现象。这说明十年来的 ImageNet 排行榜优化已在不同程度上导致测试集过拟合——即研究者通过超参数搜索和架构设计隐式地优化了原始测试集上的性能。

ImageNet-V2 提供三个子版本（Threshold0.7、TopImages、MatchedFrequency），其中 **MatchedFrequency** 被最广泛使用，其构建策略最严格地复现了原始数据收集频率分布。

## 任务格式

- 共 10,000 张图像（每类 10 张），覆盖 1,000 个 ImageNet 类别
- 任务：单标签图像分类（1,000 类）
- 仅含测试集，与原始 ImageNet-1K 训练集使用相同的评测协议
- 三个子版本：Threshold0.7 / TopImages / MatchedFrequency

## 主要指标

- **Top-1 Accuracy**：主要指标，通常比 ImageNet-1K 验证集低 11–14 个百分点

## 局限性

- 重采样时互联网图像分布已发生变化，部分类别的新图像与原始测试集的难度差异难以完全控制。
- 揭示的过拟合现象已广为人知，当前新发表的模型通常不再在原始 ImageNet 测试集上调优，使 V2 的区分意义有所减弱。
- 数据集较小（每类仅 10 张），在难度较高类别上统计估计的方差较大。

## 相关页面

- [[ImageNet-1K]]
- [[ImageNet-A]]
- [[ImageNet-R]]
