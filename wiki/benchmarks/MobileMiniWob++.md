---
title: "MobileMiniWob++"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - agent
year: 2024
arxiv_id: ""
status: active
---

# MobileMiniWob++

> 将 Web 自动化基准 MiniWoB++ 扩展至移动端 GUI 操作场景的评测套件。

## 概述

MobileMiniWob++ 是对经典 Web 自动化基准 MiniWoB++（Mini World of Bits）的移动端扩展版本，面向 Android/iOS 风格的移动 GUI 操作任务。原版 MiniWoB++ 包含 100+ 个标准化的网页交互小任务（如填表、点按、拖拽），MobileMiniWob++ 将这一思路迁移到移动触摸界面，增加了触摸手势、滑动翻页、长按菜单、下拉刷新等移动端特有操作原语。

该基准的主要价值在于提供了**低成本、可重复、标准化**的移动端代理评测环境，弥补了真实设备评测（如 AndroidWorld）的配置复杂性问题。任务以程序化方式生成，参数随机化程度高，适合快速迭代代理策略。任务设计参考了移动端 UI 设计规范，涵盖常见的表单填写、列表操作、导航跳转等场景。

MobileMiniWob++ 通常与其他移动端代理研究配套使用，为研究人员提供一个标准化的入门评测集，再结合 AndroidWorld 等真实设备基准进行进阶验证。

## 任务格式

- **环境**：模拟的移动端 Web 页面（响应式布局，仿手机分辨率）
- **输入**：任务自然语言描述 + 移动端 UI 截图或 DOM 树
- **输出**：触摸点击坐标、滑动手势、文字输入等移动端操作
- **规模**：100+ 个任务类型，每类支持参数化随机实例化
- **评测**：基于任务完成状态的自动脚本判定

## 主要指标

- **Task Success Rate**（任务完成率）：代理成功完成任务实例的比例
- 按任务类型报告分类成绩
- 支持 0-shot、few-shot 等不同设置的对比

## 局限性

- 基于模拟的移动 Web 页面，与真实 App 的原生 UI 存在差距
- 任务种类相对简单，难以覆盖复杂多步骤的真实移动使用场景
- 缺乏对本地 App（需要 ADB 调用）的支持

## 相关页面

- [[AndroidWorld]]
- [[OSWorld]]
- [[AITZ]]
- [[AppWorld]]
