---
title: "WindowsAgentArena"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - agent
year: 2024
arxiv_id: "2409.08264"
status: active
---

# WindowsAgentArena

> 在 Windows 操作系统中评测 AI 代理完成真实桌面任务的综合基准。

## 概述

WindowsAgentArena（WAA）是由 Microsoft Research 于 2024 年发布的 Windows 平台 AI 代理评测基准。它在 Azure 云上的 Windows 11 虚拟机中运行，要求代理通过截图感知系统状态，完成横跨 Office 365 套件、Windows 系统工具、Web 浏览器等多类应用的实际任务。

WAA 包含 154 个任务，专门为 Windows 环境设计，覆盖文件管理、Office 文档编辑、注册表操作、命令行工具等场景。与 OSWorld 相比，WAA 更聚焦于 Windows 原生应用生态和企业工作场景。基准配套发布了 NAVI 代理框架（基于 GPT-4V），在并行评测设置下完成率约为 19.5%，人类基线约 74%。

WAA 的一个重要特点是支持**并行评测**——通过 Azure 批量部署多个独立 VM 实例，可同时运行多个评测任务，显著降低评测的时间成本，有助于快速迭代代理开发。

## 任务格式

- **环境**：Windows 11 虚拟机（运行于 Azure），通过 RDP 远程桌面截图交互
- **输入**：自然语言任务指令 + 屏幕截图
- **输出**：鼠标点击、键盘输入、滚动等 GUI 操作
- **规模**：154 个任务，覆盖 Office 365、File Explorer、PowerShell、Edge 等 Windows 应用
- **评测**：脚本化状态验证 + 部分人工检查

## 主要指标

- **Task Success Rate**（任务完成率）：代理正确完成任务的比例
- 人类基线约 74%；NAVI（GPT-4V）约 19.5%
- 支持并行批量评测，报告单任务及跨类别平均成绩

## 局限性

- 依赖 Azure 云环境，本地复现需要额外配置
- 154 个任务规模较小，覆盖的应用场景有限
- 主要针对英文 Windows 界面，多语言场景覆盖不足

## 相关页面

- [[OSWorld]]
- [[AndroidWorld]]
- [[ScreenSpot Pro]]
- [[AppWorld]]
