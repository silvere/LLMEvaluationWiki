---
title: "RefCOCO"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
year: 2016
arxiv_id: "1608.00272"
status: active
---

# RefCOCO

> 基于 COCO 图像的指代表达理解基准，要求模型根据自然语言描述定位图像中的特定物体。

## 概述

RefCOCO 是 2016 年由 UNC 团队提出的指代表达理解（Referring Expression Comprehension, REC）基准数据集，基于 MS-COCO 图像构建。数据通过交互式游戏（ReferIt Game）收集，标注者需用简短描述区分同一图像中的多个同类物体，最终生成约 **50,000 张图像上的 142,209 条指代表达**。

该基准旨在测试模型能否理解"左边的那把椅子""穿红衣服的人"等指代性自然语言，并精确定位（通过预测边界框）目标物体。由于图像中往往有多个同类物体，模型需要结合上下文与空间关系做出判断，对视觉-语言联合推理能力要求较高。

RefCOCO 与 RefCOCO+、RefCOCOg 并称 RefCOCO 三件套，是视觉定位与多模态理解任务的核心评测集。

## 任务格式

- 输入：图像 + 一段自然语言指代表达
- 输出：目标物体的边界框（bounding box）
- 数据集划分：train / val / testA / testB（testA 以人为主，testB 以非人物体为主）
- 总计约 142,209 条表达，50,000+ 图像

## 主要指标

- **Acc@0.5**：预测框与 GT 框 IoU ≥ 0.5 的准确率（主要指标）
- **Acc@0.25** / **Acc@0.75**：不同 IoU 阈值下的准确率

## 局限性

- 指代表达以简短、任务性语言为主（参与者用最少词语区分物体），不反映真实对话中的自然语言多样性。
- 主要覆盖 COCO 80 类常见物体，领域覆盖有限。
- 对细粒度属性（如颜色、纹理）理解的测试力度不如 RefCOCO+。

## 相关页面

- [[RefCOCO+]]
- [[RefCOCOg]]
- [[ADE20K]]
