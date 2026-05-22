---
title: ScreenSpot
type: benchmark
publish: true
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- multimodal
- agent
year: 2024
arxiv_id: '2401.13649'
status: active
dimension: D
subdimension: general
sota:
- score: 92.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/njucckevin/SeeClick
  notes: ScreenSpot GUI grounding accuracy
- score: 91.2%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://github.com/njucckevin/SeeClick
  notes: GUI grounding accuracy
- score: 90.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://github.com/njucckevin/SeeClick
  notes: GUI grounding accuracy
- score: 89.0%
  model: Qwen3.6
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/njucckevin/SeeClick
  notes: GUI grounding accuracy
- score: 72.5%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://github.com/njucckevin/SeeClick
  notes: GUI grounding accuracy, 2024 baseline
---

# ScreenSpot

> 评测多模态大模型在 GUI 截图中定位指定 UI 元素能力的基准，面向屏幕操作智能体场景。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Claude-Opus-4.7]] | 🚫 no | 92.5% | ScreenSpot GUI grounding accuracy | 2026-04 | [link](https://github.com/njucckevin/SeeClick) |
| 🥈 | [[Gemini-3.1-Pro]] | 🚫 no | 91.2% | GUI grounding accuracy | 2026-03 | [link](https://github.com/njucckevin/SeeClick) |
| 🥉 | [[GPT-5]] | 🚫 no | 90.5% | GUI grounding accuracy | 2025-09 | [link](https://github.com/njucckevin/SeeClick) |
| 4 | [[Qwen3.6]] | 🚫 no | 89.0% | GUI grounding accuracy | 2026-04 | [link](https://github.com/njucckevin/SeeClick) |
| 5 | [[GPT-4o]] | 🚫 no | 72.5% | GUI grounding accuracy, 2024 baseline | 2024-05 | [link](https://github.com/njucckevin/SeeClick) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2401.13649](https://arxiv.org/abs/2401.13649)

<!-- AUTO-LINKS:END -->

## 概述

ScreenSpot 由 NUS（新加坡国立大学）于 2024 年提出，专注于评测多模态大模型的**GUI 视觉定位**（Grounding）能力——即给定自然语言指令，模型能否准确在屏幕截图中找到对应的 UI 元素坐标（如按钮、图标、文本框等）。

该基准面向 GUI 智能体（GUI Agent）这一新兴应用场景：随着 AI 辅助电脑操作的需求增长，模型需要理解屏幕内容并精准点击/操作 UI 元素。ScreenSpot 覆盖移动端（iOS/Android）、桌面端（macOS/Windows/Linux）和 Web 三大平台，并区分文本元素和图标/图形元素两类定位任务，全面评测模型的跨平台 GUI 理解能力。

评测结果显示，即使是 GPT-4V 等最强模型，在 ScreenSpot 上的定位准确率也远低于人类（人类约 79%，早期 MLLM 普遍低于 20%），说明精准 GUI 定位是当时多模态模型的重大挑战。

## 任务格式

- **截图数量**：约 1,200 张真实设备截图
- **问题数量**：约 1,272 道定位任务（每张截图配 1 道定位指令）
- **平台覆盖**：iOS、Android、macOS、Windows、Linux、Web 六大平台
- **元素类型**：文本元素（Text）和图标/图形元素（Icon）
- **输出格式**：模型输出目标 UI 元素的坐标（x, y）或边界框
- **评分标准**：预测坐标落在目标元素边界框内即为正确

## 主要指标

- **总体定位准确率（Accuracy）**：预测坐标命中目标元素的比例
- **平台细分**：分别报告移动端、桌面端、Web 的准确率
- **元素类型细分**：文本元素与图标元素分别统计，图标元素通常更难

## 局限性

- 截图来源以英文界面为主，对中文或其他语言 GUI 场景的覆盖有限
- 定位精度评测（坐标命中）可能受 UI 元素大小影响，大按钮天然更易命中
- 未涵盖动态交互场景（如弹出菜单、动画），仅评测静态截图理解

## 相关页面
- [[AgentBench]]
- [[OSWorld]]
- OSWorld
