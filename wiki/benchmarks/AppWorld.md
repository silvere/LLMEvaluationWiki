---
title: AppWorld
type: benchmark
publish: true
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- agent
year: 2024
arxiv_id: '2407.18901'
status: active
dimension: D
subdimension: general
sota:
- score: 52.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: true
  date: 2026-04
  source: https://appworld.dev
  notes: AppWorld task success rate (100+ apps)
- score: 50.2%
  model: GPT-5
  harness: null
  with_tools: true
  date: 2025-09
  source: https://appworld.dev
  notes: task success rate
- score: 48.0%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: true
  date: 2026-03
  source: https://appworld.dev
  notes: task success rate
- score: 45.5%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: true
  date: 2026-02
  source: https://deepseek.com
  notes: task success rate
- score: 26.3%
  model: GPT-4o
  harness: null
  with_tools: true
  date: 2024-05
  source: https://appworld.dev
  notes: task success rate, 2024 baseline
---

# AppWorld

> 评测 AI 代理通过 API 调用操控多个互联应用程序完成复杂任务的能力。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Claude-Opus-4.7]] | 🔧 with | 52.5% | AppWorld task success rate (100+ apps) | 2026-04 | [link](https://appworld.dev) |
| 🥈 | [[GPT-5]] | 🔧 with | 50.2% | task success rate | 2025-09 | [link](https://appworld.dev) |
| 🥉 | [[Gemini-3.1-Pro]] | 🔧 with | 48.0% | task success rate | 2026-03 | [link](https://appworld.dev) |
| 4 | [[DeepSeek-V4-Pro]] | 🔧 with | 45.5% | task success rate | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🔧 with | 26.3% | task success rate, 2024 baseline | 2024-05 | [link](https://appworld.dev) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2407.18901](https://arxiv.org/abs/2407.18901)

<!-- AUTO-LINKS:END -->

## 概述

AppWorld 是 2024 年提出的代理评测基准，构建了一个包含 9 个相互关联的模拟应用程序（涵盖电商、音乐、社交、文件管理、任务管理等）的沙箱世界，要求代理通过调用 API 接口完成跨应用的复杂任务。与基于 GUI 截图的代理基准不同，AppWorld 侧重于**程序化 API 交互**和跨应用数据流转，更接近真实软件生态中的工具调用场景。

AppWorld 包含 750 个任务，任务难度设计为多层级——从简单的单应用操作（在音乐 App 中添加收藏）到复杂的跨应用协同（根据日历事件自动发送提醒、整合购物订单到任务清单）。每个任务都附有精确的前置条件设置和状态验证脚本，确保评测的一致性和可重复性。

AppWorld 的设计哲学是：现实中的 AI 助手需要在多应用生态中协同工作，单一工具/应用的代理能力不足以反映真实场景需求。发布时实验显示 GPT-4 类模型约完成 50% 的简单任务，但复杂跨应用任务完成率明显下降。

## 任务格式

- **环境**：包含 9 个模拟应用的沙箱（Spotify-like、Amazon-like、GitHub-like 等），各有完整 REST API
- **输入**：自然语言任务描述 + 当前应用状态（可通过 API 查询）
- **输出**：API 调用序列（方法名 + 参数）
- **规模**：750 个任务，3 个难度级别（简单/中等/复杂）
- **评测**：执行 API 调用后验证最终应用状态是否符合预期

## 主要指标

- **Task Success Rate**（任务完成率）：代理完成任务后应用状态与预期完全一致的比例
- 按难度级别（简单/中等/复杂）和应用类别分类报告
- **Step Efficiency**：完成任务所需 API 调用步数与最优路径的比值

## 局限性

- 应用世界为模拟沙箱，与真实 App 的 API 语义存在差异
- 任务覆盖的应用类型以西方主流产品为原型，缺乏中文应用场景
- 复杂任务的评测验证逻辑可能存在边界案例误判

## 相关页面

- [[AgentBench]]
- [[ToolACE]]
- [[xLAM]]
- [[OSWorld]]
