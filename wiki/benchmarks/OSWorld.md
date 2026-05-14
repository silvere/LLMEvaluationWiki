---
title: "OSWorld"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - agent
year: 2024
arxiv_id: "2404.07972"
status: active
---

# OSWorld

> 在真实计算机桌面环境中评测 AI 代理完成多步 GUI 操作任务的能力。

## 概述

OSWorld 是由香港大学、上海 AI 实验室等机构于 2024 年提出的计算机任务代理评测基准。它在真实的操作系统环境（Ubuntu、Windows、macOS）中运行，要求代理通过截图感知屏幕状态并输出键鼠操作，完成跨应用的多步骤任务，如文档编辑、代码编写、网页浏览等。

OSWorld 的核心创新在于评测环境的真实性——任务运行在实际虚拟机上，而非模拟器，代理必须解析真实 GUI 截图并生成可执行操作。基准覆盖 369 个任务，涵盖 Office 套件、Web 浏览器、代码编辑器、多媒体工具等 9 类应用场景，每个任务均有脚本化的自动验证机制。

人类在相同任务上的完成率约为 72.36%，而当时最佳 GPT-4V 代理仅能完成约 12.24% 的任务，揭示了 AI 与人类在 GUI 代理能力上的巨大差距。OSWorld 已成为计算机操作代理方向最重要的标杆之一。

## 任务格式

- **环境**：Ubuntu 22.04、Windows 11、macOS，运行于 VirtualBox/VMware 虚拟机
- **输入**：自然语言任务指令 + 屏幕截图（1366×768）
- **输出**：鼠标点击坐标、键盘输入、滚动等原子操作序列
- **规模**：369 个任务，涵盖 9 类应用（Chrome、Firefox、VS Code、LibreOffice Writer/Calc/Impress、OS 文件管理、GIMP、VLC 等）
- **评测**：基于脚本的自动化状态验证（而非 OCR/截图比对）

## 主要指标

- **Task Success Rate**（任务完成率）：代理在规定步数内完成任务的比例，主要指标
- 按应用类别和操作系统分类报告子集得分
- 人类基线约 72.36%；当前顶级代理模型（2025 年）约 30-40%

## 局限性

- 虚拟机运行速度慢，大规模评测成本高
- 任务集中于英文界面，对多语言 GUI 覆盖不足
- 369 个任务量相对有限，部分应用类别样本稀少

## 相关页面

- [[AndroidWorld]]
- [[WindowsAgentArena]]
- [[ScreenSpot Pro]]
- [[AgentBench]]
