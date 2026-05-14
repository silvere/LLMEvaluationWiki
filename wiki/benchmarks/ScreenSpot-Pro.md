---
title: "ScreenSpot Pro"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - agent
  - multimodal
year: 2025
arxiv_id: "2504.07981"
status: active
---

# ScreenSpot Pro

> 面向专业软件界面的精细粒度屏幕元素定位评测基准。

## 概述

ScreenSpot Pro 是 2025 年提出的高难度 GUI grounding（屏幕元素定位）基准，专门评测多模态大模型在复杂专业软件界面中准确定位目标 UI 元素的能力。与早期的 ScreenSpot（2024）相比，Pro 版针对专业领域软件（如 Adobe Photoshop、AutoCAD、JetBrains IDE、Blender、Figma 等）设计，这些界面具有密集工具栏、层叠面板、高度定制化布局等特点，对视觉理解能力要求极高。

ScreenSpot Pro 的任务要求模型根据自然语言描述（如"点击 Layers 面板中的新建图层按钮"），在截图中输出目标元素的精确像素坐标或边界框。专业软件界面相比消费级 App 的 UI 密度更高、元素更小、图标语义更模糊，使该任务对当前视觉语言模型构成显著挑战。

发布时实验结果显示，即使是 GPT-4o 等顶级模型在专业软件 GUI grounding 上的准确率也远低于普通界面，凸显了专业 GUI 理解能力的研究缺口。

## 任务格式

- **输入**：高分辨率专业软件截图 + 自然语言元素描述
- **输出**：目标 UI 元素的像素坐标（点）或边界框（box）
- **规模**：数千个标注实例，覆盖 10+ 专业软件类别
- **标注**：人工精细标注，含元素类型（按钮/菜单/图标/文本框）分类
- **评测**：基于坐标是否落入目标元素边界框内（IoU 或 point-in-box）

## 主要指标

- **Grounding Accuracy**（定位准确率）：预测坐标命中目标元素的比例
- 按软件类别、元素类型分类报告
- 与通用版 ScreenSpot 成绩对比，量化专业难度增量

## 局限性

- 仅覆盖静态截图定位，未评测完整的任务执行流程
- 专业软件界面版本更新快，标注数据可能过期
- 数据收集涉及商业软件界面版权问题

## 相关页面

- [[OSWorld]]
- [[WindowsAgentArena]]
- [[AITZ]]
- [[AndroidWorld]]
