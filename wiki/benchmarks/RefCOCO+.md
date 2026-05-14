---
title: "RefCOCO+"
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

# RefCOCO+

> RefCOCO 的变体版本，禁止标注者使用绝对位置词，迫使模型依赖外观属性理解指代表达。

## 概述

RefCOCO+ 与 RefCOCO 同时发布（均来自 arxiv:1608.00272），同样基于 MS-COCO 图像，通过 ReferIt Game 收集标注。其核心区别在于**限制标注者不得使用绝对空间位置词**（如"左边""右边""上方"等），迫使描述依赖颜色、服装、动作等**外观属性**来区分目标物体。

这一设计使 RefCOCO+ 更侧重测试模型对**视觉属性**的理解能力，而非空间推理能力。与 RefCOCO 相比，RefCOCO+ 的指代表达通常更具描述性，例如"穿蓝色夹克的女人"或"拿着手机的人"。

RefCOCO+ 包含约 **141,564 条指代表达**，覆盖 19,992 张图像，数据划分与 RefCOCO 相同（train / val / testA / testB）。

## 任务格式

- 输入：图像 + 基于外观属性的自然语言指代表达（无绝对位置词）
- 输出：目标物体的边界框（bounding box）
- 数据集划分：train / val / testA / testB
- 总计约 141,564 条表达，19,992 张图像

## 主要指标

- **Acc@0.5**：预测框与 GT 框 IoU ≥ 0.5 的准确率（主要指标）
- **Acc@0.25** / **Acc@0.75**：不同 IoU 阈值下的准确率

## 局限性

- 禁用位置词的约束虽提升了外观属性测试强度，但也导致部分自然语言描述较为冗长或不自然。
- 与现实对话中兼用位置与外观描述的习惯不符，存在一定的人工设计痕迹。
- 在颜色感知差异较大的场景（如低光照图像）下，外观描述的可靠性降低。

## 相关页面

- [[RefCOCO]]
- [[RefCOCOg]]
- [[ADE20K]]
