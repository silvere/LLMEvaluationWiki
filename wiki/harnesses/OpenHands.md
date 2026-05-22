---
title: "OpenHands"
type: harness
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
developer: "All Hands AI"
official_url: "https://www.all-hands.dev/"
github: "https://github.com/All-Hands-AI/OpenHands"
arxiv_id: "2407.16741"
license: "MIT"
aliases:
  - OpenDevin
supported_benchmarks:
  - "[[SWE-bench-Verified]]"
  - "[[SWE-bench]]"
  - "[[GAIA]]"
  - "[[Multi-SWE-bench]]"
sources:
  - "https://www.all-hands.dev/"
  - "https://arxiv.org/abs/2407.16741"
  - "https://github.com/All-Hands-AI/OpenHands"
domain:
  - agent
  - code
dimension: A
subdimension: harness
---

# OpenHands（前身：OpenDevin）

> 开源 agent 平台，由 All Hands AI 维护，提供完整的 agent runtime（沙箱 Docker + 浏览器 + 终端 + 文件操作）。是 SWE-bench 和 GAIA 上排名靠前的开源 harness。

## 基本信息

- **开发方**：All Hands AI（核心团队来自 UIUC / CMU）
- **首次发布**：2024-03 (OpenDevin)，2024-09 改名 OpenHands
- **架构**：multi-agent 协作 + 完整沙箱环境（Docker runtime / VSCode integration / browser）
- **支持模型**：任意 LiteLLM 兼容后端

## 设计要点

- 提供完整的"虚拟程序员工位"——不只是 bash 工具，还包含 web browser、code editor、Python interpreter
- 多 agent 角色（CodeActAgent / BrowsingAgent / 等）可组合
- 是 [[SWE-bench-Verified]] 开源 harness 榜单的常驻 Top-3

## 应用 benchmark

- [[SWE-bench-Verified]] / [[SWE-bench]] / [[Multi-SWE-bench]] / [[GAIA]]

## 备注

本页为 stub，详细评测组合（OpenHands + Claude / GPT-5 等）数据待补。
