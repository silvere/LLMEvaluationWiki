---
title: OCRBench
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- multimodal
language: en
year: 2023
authors:
- Zhenrui Liu
- Tianwei Lin
- Quanhao Guo
- Zheyao Zhang
- Weifeng Lin
- Haoxuan Hua
- Dahua Lin
- Wayne Zhang
arxiv_id: '2305.07895'
official_url: https://github.com/Yuliang-Liu/MultimodalOCR
license: ''
size: 1000
format: open-ended
status: active
saturation_threshold: 0.9
sources:
- https://arxiv.org/abs/2305.07895
dimension: E
sota:
- score: 92.8%
  model: Qwen3.6
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/Yuliang-Liu/MultimodalOCR
  notes: OCRBench v2 overall score
- score: 91.5%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://github.com/Yuliang-Liu/MultimodalOCR
  notes: OCRBench v2
- score: 90.8%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/Yuliang-Liu/MultimodalOCR
  notes: OCRBench v2
- score: 89.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://github.com/Yuliang-Liu/MultimodalOCR
  notes: OCRBench v2
- score: 81.0%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://github.com/Yuliang-Liu/MultimodalOCR
  notes: OCRBench, 2024 baseline
---

# OCRBench：多模态模型 OCR 与文字理解评测基准

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Qwen3.6]] | 🚫 no | 92.8% | OCRBench v2 overall score | 2026-04 | [link](https://github.com/Yuliang-Liu/MultimodalOCR) |
| 🥈 | [[Gemini-3.1-Pro]] | 🚫 no | 91.5% | OCRBench v2 | 2026-03 | [link](https://github.com/Yuliang-Liu/MultimodalOCR) |
| 🥉 | [[Claude-Opus-4.7]] | 🚫 no | 90.8% | OCRBench v2 | 2026-04 | [link](https://github.com/Yuliang-Liu/MultimodalOCR) |
| 4 | [[GPT-5]] | 🚫 no | 89.5% | OCRBench v2 | 2025-09 | [link](https://github.com/Yuliang-Liu/MultimodalOCR) |
| 5 | [[GPT-4o]] | 🚫 no | 81.0% | OCRBench, 2024 baseline | 2024-05 | [link](https://github.com/Yuliang-Liu/MultimodalOCR) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2305.07895](https://arxiv.org/abs/2305.07895)
- **官方主页**: [https://github.com/Yuliang-Liu/MultimodalOCR](https://github.com/Yuliang-Liu/MultimodalOCR)

<!-- AUTO-LINKS:END -->

## 概述

OCRBench 是 2023 年提出的专门针对多模态大模型**光学字符识别（OCR）与文字理解**能力的综合评测基准。它包含 **1,000 道**精心策划的题目，来源于 **29 个不同的 OCR 相关场景**，是目前覆盖 OCR 场景最广泛的多模态评测之一。

## 任务设计

OCRBench 将 OCR 相关能力细分为五大类别：

**文字识别（Text Recognition）：**
- 场景文字识别（Scene Text Recognition）
- 艺术字体识别（Artistic Text Recognition）
- 手写文字识别（Handwriting Recognition）
- 困难样本识别（Difficult Cases）

**文档理解（Document Understanding）：**
- 文档文字读取（Document OCR）
- 表格识别（Table Recognition）
- 数学公式识别（Formula Recognition）

**知识型文字理解（Knowledge-based OCR）：**
- 图表文字理解（Chart Text Understanding）
- 街景文字理解（Street View OCR）

**多语言 OCR：**
- 中文、日文、韩文等非英语文字识别

**视觉文字推理（OCR with Reasoning）：**
- 需要结合识别结果进行推理的题目

## 评分机制

OCRBench 使用**人工与规则混合评分**：
- 数字、代码等精确答案采用精确匹配
- 自然语言答案支持等价表达匹配
- 最终以百分制（0-100）报告总分

## 数据特点

- 1,000 道题目均经过人工质检，确保标注准确
- 场景覆盖自然场景、文档、手写、艺术字等 29 类
- 支持英文和中文两种主要语言的分项评测
- 发布了 OCRBench v2（2024），扩展至 10,000 道题，增加更多语言和场景

## 主要发现与局限

OCRBench 的测评揭示了多模态模型 OCR 能力的重要差异：
- 专用 OCR 模型（如 TrOCR）在文字识别上仍优于通用多模态模型
- 手写识别和数学公式识别是大多数通用模型的薄弱环节
- GPT-4V 在知识型文字推理上表现最强，但在精确字符识别上不如专用系统
- 中文 OCR 性能普遍低于英文

主要局限在于规模较小（1,000 道），部分子类别样本量不足；精确匹配评分对格式差异缺乏容错性。

## 参考文献

Liu, Z., et al. (2023). OCRBench: On the Hidden Mystery of OCR in Large Multimodal Models. *arXiv:2305.07895*.
