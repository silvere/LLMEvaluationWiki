---
title: "AITZ"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - agent
  - multimodal
year: 2024
arxiv_id: "2408.14428"
status: active
---

# AITZ

> 针对 Android 设备 GUI 操作的 Action-in-the-Zone 任务序列评测基准。

## 概述

AITZ（Action-in-the-Zone）是 2024 年提出的 Android GUI 代理评测基准，专注于评测多模态模型在移动设备界面上执行精确操作序列的能力。AITZ 的核心理念是"区域感知操作"——不仅要求模型能识别出需要操作的 UI 元素，还要准确判断操作类型（点击、长按、滑动、输入）和操作区域，模拟真实用户与移动界面的自然交互方式。

AITZ 从真实的 Android 设备使用记录中构建，包含多种日常应用（如社交媒体、地图、购物、系统设置）的操作轨迹。数据集提供了完整的操作序列标注，包括每步操作的截图、UI 元素坐标、操作类型和自然语言意图描述，可支持模仿学习、强化学习等多种训练范式。

与 AndroidWorld（强调任务完成结果）不同，AITZ 更侧重对操作轨迹本身的细粒度评测，关注每个中间步骤的正确性，适合评估代理的低层次 GUI 操作精度。

## 任务格式

- **输入**：Android 截图序列 + 任务自然语言描述
- **输出**：逐步操作指令（含操作类型 + 坐标/文本）
- **规模**：数千条操作轨迹，覆盖 10+ 类 Android 应用
- **标注**：包含截图、UI 元素树、操作类型、坐标的完整轨迹标注
- **评测**：逐步操作精度 + 端到端任务完成率

## 主要指标

- **Step Accuracy**（逐步操作准确率）：每个操作步骤的类型和坐标是否正确
- **Task Completion Rate**（任务完成率）：完整操作序列执行后任务是否达成目标状态
- **Action Type Accuracy**：操作类型（点击/滑动/输入等）的分类准确率

## 局限性

- 数据来自真实设备录制，标注成本高，规模扩展受限
- 操作轨迹反映特定用户习惯，可能存在多样性不足的问题
- 对 UI 布局变动（应用更新）的鲁棒性较差

## 相关页面

- [[AndroidWorld]]
- [[MobileMiniWob++]]
- [[ScreenSpot Pro]]
- [[AppWorld]]
