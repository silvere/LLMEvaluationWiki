---
title: RealWorldQA
type: benchmark
publish: true
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- multimodal
- reasoning
year: 2024
arxiv_id: ''
status: active
dimension: E
sota:
- score: 82.5%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://realworldqa.ai
  notes: accuracy on real-world spatial QA
- score: 81.2%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://realworldqa.ai
  notes: accuracy
- score: 80.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://realworldqa.ai
  notes: accuracy
- score: 79.8%
  model: Qwen3.6
  harness: null
  with_tools: false
  date: 2026-04
  source: https://realworldqa.ai
  notes: accuracy
- score: 69.5%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://realworldqa.ai
  notes: accuracy, 2024 baseline
---

# RealWorldQA

> xAI 发布的真实世界空间推理基准，图像均来自真实场景照片，测试模型的空间常识理解能力。

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Gemini-3.1-Pro]] | 🚫 no | 82.5% | accuracy on real-world spatial QA | 2026-03 | [link](https://realworldqa.ai) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 81.2% | accuracy | 2026-04 | [link](https://realworldqa.ai) |
| 🥉 | [[GPT-5]] | 🚫 no | 80.5% | accuracy | 2025-09 | [link](https://realworldqa.ai) |
| 4 | [[Qwen3.6]] | 🚫 no | 79.8% | accuracy | 2026-04 | [link](https://realworldqa.ai) |
| 5 | [[GPT-4o]] | 🚫 no | 69.5% | accuracy, 2024 baseline | 2024-05 | [link](https://realworldqa.ai) |

<!-- AUTO-SOTA:END -->

## 概述

RealWorldQA 由 xAI（埃隆·马斯克的 AI 公司）于 2024 年发布，作为 Grok 多模态能力的对外评测工具之一。该基准包含 **765 道**问答题，图像均来自真实世界场景（包括道路、室内、户外等），重点测试模型对**空间关系、距离估计、方向判断**等真实世界常识推理能力。

RealWorldQA 的设计初衷是填补现有基准在"真实世界空间理解"上的空白——许多现有多模态基准侧重于图像分类或学术图表，而 RealWorldQA 更贴近自动驾驶、机器人导航等实际应用场景所需的感知推理能力。

由于数据集规模相对较小且为 xAI 内部构建，评测社区对其数据质量和代表性仍在持续评估中。

## 任务格式

- 共 765 道题，全部为多选题（MCQ）
- 图像来自真实世界场景照片
- 涵盖空间关系、距离估计、物体计数、方向判断等任务
- 评测协议简洁，适合快速评测

## 主要指标

- **Accuracy**（多选题准确率）：主要指标

## 局限性

- 数据集规模较小（765 题），统计稳定性有限，评估结果方差较大。
- 由 xAI 内部构建，缺乏开放的数据构建流程说明，数据质量难以独立验证。
- 场景分布和题目设计细节未完全公开，限制了深入的误差分析。

## 相关页面

- [[EMMA]]
- [[VCBench]]
- [[VisualWebBench]]
