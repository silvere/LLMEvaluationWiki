---
title: AI2D
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- multimodal
- knowledge
language: en
year: 2016
authors:
- Aniruddha Kembhavi
- Mike Salvato
- Eric Kolve
- Mausam
- Hannaneh Hajishirzi
- Ali Farhadi
arxiv_id: ''
official_url: https://allenai.org/data/diagrams
license: CC BY 4.0
size: 15000
format: multiple-choice
status: active
saturation_threshold: 0.9
sources:
- https://prior.allenai.org/projects/diagram-understanding
- https://arxiv.org/abs/1603.07988
dimension: E
sota:
- score: 98.5%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://deepmind.google/technologies/gemini/
  notes: accuracy on AI2D diagram understanding
- score: 98.0%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.anthropic.com/claude
  notes: accuracy
- score: 97.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://openai.com/gpt-5
  notes: accuracy
- score: 97.0%
  model: Qwen3.6
  harness: null
  with_tools: false
  date: 2026-04
  source: https://qwenlm.github.io
  notes: accuracy
- score: 94.2%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: accuracy, 2024 baseline
---

# AI2D：科学图表理解评测基准

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Gemini-3.1-Pro]] | 🚫 no | 98.5% | accuracy on AI2D diagram understanding | 2026-03 | [link](https://deepmind.google/technologies/gemini/) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 98.0% | accuracy | 2026-04 | [link](https://www.anthropic.com/claude) |
| 🥉 | [[GPT-5]] | 🚫 no | 97.5% | accuracy | 2025-09 | [link](https://openai.com/gpt-5) |
| 4 | [[Qwen3.6]] | 🚫 no | 97.0% | accuracy | 2026-04 | [link](https://qwenlm.github.io) |
| 5 | [[GPT-4o]] | 🚫 no | 94.2% | accuracy, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **官方主页**: [https://allenai.org/data/diagrams](https://allenai.org/data/diagrams)
- **官网**: [https://prior.allenai.org/projects/diagram-understanding](https://prior.allenai.org/projects/diagram-understanding)
- **arXiv**: [https://arxiv.org/abs/1603.07988](https://arxiv.org/abs/1603.07988)

<!-- AUTO-LINKS:END -->

## 概述

AI2D（Allen Institute for AI Diagram Understanding）是 2016 年由 Allen Institute for AI 提出的科学图表理解数据集。它包含超过 **5,000 张**科学示意图（主要来自 K–12 年级教科书）和约 **15,000 道**配套问答题，是评测模型理解科学图示、标注和教材插图能力的重要基准。

## 任务设计

AI2D 的图像来源于真实科学教材，覆盖地球科学、生物学、化学、物理等学科领域。每张图像配有多道多项选择题，问题类型包括：

- **标注识别**：识别图中标注的名称或含义
- **结构关系**：判断图中各部分的空间关系或层级关系
- **科学推理**：基于图示进行科学概念推断（如食物链能量流动方向）
- **比较与计算**：对图中数值或比例进行比较

**图像类型包括：**
- 生命周期图（Life Cycles）
- 食物链/食物网（Food Chains/Webs）
- 地质结构图（Geological Diagrams）
- 天体运动图（Astronomical Diagrams）
- 化学反应示意图（Chemical Diagrams）
- 物理装置示意图（Physics Diagrams）

## 评分机制

标准多项选择准确率（每题 3–5 个选项），完全自动化评分。通常报告总体准确率，部分研究进一步按图像类别或问题类型细分分析。

## 数据特点

- 覆盖 K–12 年级科学教材的主要知识领域
- 图像包含丰富的文字标注（Labels），识别标注是许多题目的必要步骤
- 提供图像分割和标注的结构化元数据（用于图像解析研究）
- 数据集以 CC BY 4.0 许可证开放，广泛用于学术研究
- 后续被收录至 MMMU、ScienceQA 等更大型多模态基准

## 主要发现与局限

AI2D 长期作为科学图表理解的标准基准：
- 早期 VQA 模型（2016–2019 年）在 AI2D 上准确率约 60–65%
- 专门针对图表理解设计的模型通过布局感知预训练可达 80% 以上
- 现代多模态大模型（如 GPT-4V、Gemini）在 AI2D 上已超过 90%，接近饱和
- 主要挑战集中在含复杂箭头/流程的图（如生命周期图）

主要局限在于题目主要覆盖北美 K–12 课程体系；部分题目可通过文字标注直接作答，无需深入理解图示结构；随着大模型能力提升，该基准区分度已明显下降。

## 参考文献

Kembhavi, A., Salvato, M., Kolve, E., et al. (2016). A Diagram Is Worth A Dozen Images. ECCV 2016.
