---
title: "TACoS"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
year: 2013
arxiv_id: ""
status: active
---

# TACoS

> 时序行为语言对齐基准，提供烹饪视频中细粒度操作步骤的自然语言时序标注。

## 概述

TACoS（Textually Annotated Cooking Scenes）于 2013 年由萨尔大学团队发布，是时序视频语言定位（Temporal Video Grounding）领域的早期重要基准之一。数据集包含来自 MPII Cooking Activities 数据集的烹饪视频，并为每段视频的细粒度操作步骤提供了**精确的时序起止时间戳和自然语言描述**。

TACoS 的核心任务是**时序句子定位**（temporal sentence grounding）：给定视频和一段自然语言描述（如"将切好的黄瓜放入碗中"），要求系统预测该操作在视频中对应的起止时间。这要求系统同时理解视频内容的时序动态和自然语言描述的语义。

尽管 TACoS 数据规模较小（仅约 127 个视频），且场景限于烹饪领域，但其高质量的细粒度标注使其成为时序视频定位研究的重要早期基准，并催生了大量后续工作（如 Charades-STA、ActivityNet Captions 等）。

## 任务格式

- 约 127 个烹饪视频，18,227 段文本-时间戳对
- 任务：给定视频 + 自然语言查询，预测对应时间段（起止时间）
- 评分采用 tIoU（时序交并比）阈值下的召回率

## 主要指标

- **R@1, tIoU=0.3 / 0.5 / 0.7**：在不同时序 IoU 阈值下，预测时间段与 GT 重叠度满足要求的比例

## 局限性

- 场景仅限于室内烹饪，泛化性极为有限，不适合作为通用视频理解评测。
- 数据集规模较小（127 个视频），评估方差较大。
- 发布于 2013 年，基于当时的视频数据质量，分辨率和视频质量较低。

## 相关页面

- [[CharadesSTA]]
- [[TOMATO]]
- [[EgoSchema]]
