---
title: ScreenSpot Pro
type: benchmark
publish: true
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- agent
- multimodal
year: 2025
arxiv_id: '2504.07981'
status: active
dimension: D
subdimension: general
sota:
- score: 52.8%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/njucckevin/ScreenSpot-Pro
  notes: ScreenSpot-Pro GUI grounding accuracy (professional UI)
- score: 50.5%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://github.com/njucckevin/ScreenSpot-Pro
  notes: accuracy
- score: 48.2%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://github.com/njucckevin/ScreenSpot-Pro
  notes: accuracy
- score: 46.0%
  model: Qwen3.6
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/njucckevin/ScreenSpot-Pro
  notes: accuracy
- score: 18.5%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://github.com/njucckevin/ScreenSpot-Pro
  notes: accuracy, 2024 baseline
---

# ScreenSpot Pro

> 面向专业软件界面的精细粒度屏幕元素定位评测基准。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Claude-Opus-4.7]] | 🚫 no | 52.8% | ScreenSpot-Pro GUI grounding accuracy (professional UI) | 2026-04 | [link](https://github.com/njucckevin/ScreenSpot-Pro) |
| 🥈 | [[Gemini-3.1-Pro]] | 🚫 no | 50.5% | accuracy | 2026-03 | [link](https://github.com/njucckevin/ScreenSpot-Pro) |
| 🥉 | [[GPT-5]] | 🚫 no | 48.2% | accuracy | 2025-09 | [link](https://github.com/njucckevin/ScreenSpot-Pro) |
| 4 | [[Qwen3.6]] | 🚫 no | 46.0% | accuracy | 2026-04 | [link](https://github.com/njucckevin/ScreenSpot-Pro) |
| 5 | [[GPT-4o]] | 🚫 no | 18.5% | accuracy, 2024 baseline | 2024-05 | [link](https://github.com/njucckevin/ScreenSpot-Pro) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2504.07981](https://arxiv.org/abs/2504.07981)

<!-- AUTO-LINKS:END -->

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
