---
title: "AndroidWorld"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - agent
year: 2024
arxiv_id: "2405.14573"
status: active
---

# AndroidWorld

> 在真实 Android 设备上评测 AI 代理完成日常应用任务的能力。

## 概述

AndroidWorld 是 Google DeepMind 于 2024 年发布的 Android 移动端代理评测基准。它运行在真实的 Android 模拟器（Android 13）上，要求代理通过无障碍服务（Accessibility API）感知屏幕 UI 树状态并执行触摸/滑动/输入操作，完成在真实手机应用中的多步骤任务。

AndroidWorld 包含 116 个任务，覆盖 20 个常用 Android 应用（Gmail、Google Maps、Google Calendar、Chrome、Settings 等）。任务具有**参数化随机性**——每次评测时任务参数（如联系人姓名、日期、文件内容）会随机变化，防止代理通过记忆固定步骤通过评测，提高评测鲁棒性。

该基准还提供人类遥操作基线（约 88% 完成率），在发布时 GPT-4V 代理仅能完成约 30.6%，M3A 代理约 23.9%，显示了移动端 GUI 代理的巨大提升空间。AndroidWorld 与 OSWorld（PC 端）共同构成了跨平台计算机操作代理评测的重要参照体系。

## 任务格式

- **环境**：Android 13 模拟器（AVD），通过 ADB + Accessibility API 交互
- **输入**：自然语言任务指令 + UI 视图层次结构（View Hierarchy）或截图
- **输出**：触摸、长按、滑动、文字输入等 Android 操作原语
- **规模**：116 个任务，20 个应用，支持参数化随机采样
- **评测**：基于应用状态的脚本化自动验证

## 主要指标

- **Task Success Rate**（任务完成率）：代理正确完成端到端任务的比例
- 人类基线约 88%；当时最佳代理约 30%（GPT-4V）
- 按应用类别分类报告子集成绩

## 局限性

- 仅覆盖 Google 系及少数第三方应用，中国本土应用（微信、支付宝等）不在列
- 参数化任务仍为预定义模板，无法覆盖真实用户意图的长尾多样性
- 评测依赖 ADB 桥接，环境搭建较复杂

## 相关页面

- [[OSWorld]]
- [[MobileMiniWob++]]
- [[WindowsAgentArena]]
- [[AITZ]]
