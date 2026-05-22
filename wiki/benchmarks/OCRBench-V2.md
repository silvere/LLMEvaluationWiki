---
title: OCRBench V2
type: benchmark
publish: true
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- multimodal
year: 2024
arxiv_id: '2404.01981'
status: active
dimension: E
sota:
- score: 85.5%
  model: Qwen3.6
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/Yuliang-Liu/MultimodalOCR
  notes: OCRBench v2 score
- score: 84.2%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://github.com/Yuliang-Liu/MultimodalOCR
  notes: OCRBench v2 score
- score: 83.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/Yuliang-Liu/MultimodalOCR
  notes: OCRBench v2 score
- score: 82.8%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://github.com/Yuliang-Liu/MultimodalOCR
  notes: OCRBench v2 score
- score: 72.0%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://github.com/Yuliang-Liu/MultimodalOCR
  notes: OCRBench v2, 2024 baseline
---

# OCRBench V2

> OCRBench 的升级版，将规模扩展至 10,000 道题，覆盖更多语言与场景的综合 OCR 评测基准。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Qwen3.6]] | 🚫 no | 85.5% | OCRBench v2 score | 2026-04 | [link](https://github.com/Yuliang-Liu/MultimodalOCR) |
| 🥈 | [[Gemini-3.1-Pro]] | 🚫 no | 84.2% | OCRBench v2 score | 2026-03 | [link](https://github.com/Yuliang-Liu/MultimodalOCR) |
| 🥉 | [[Claude-Opus-4.7]] | 🚫 no | 83.5% | OCRBench v2 score | 2026-04 | [link](https://github.com/Yuliang-Liu/MultimodalOCR) |
| 4 | [[GPT-5]] | 🚫 no | 82.8% | OCRBench v2 score | 2025-09 | [link](https://github.com/Yuliang-Liu/MultimodalOCR) |
| 5 | [[GPT-4o]] | 🚫 no | 72.0% | OCRBench v2, 2024 baseline | 2024-05 | [link](https://github.com/Yuliang-Liu/MultimodalOCR) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2404.01981](https://arxiv.org/abs/2404.01981)

<!-- AUTO-LINKS:END -->

## 概述

OCRBench V2 是 2024 年发布的 OCR 综合评测升级版，相比原版将题目规模从 1,000 道大幅扩充至 **10,000 道**，并新增了更多语言（覆盖 12+ 种语言）、更复杂的文档版面及更精细的子任务划分。该基准专为评测多模态大语言模型在光学字符识别与文字理解方面的综合能力而设计。

OCRBench V2 将任务进一步细分为文字识别、文档理解、表格/公式识别、多语言 OCR 及视觉文字推理五大模块，每个模块均有显著扩充的样本量，能更可靠地区分模型在不同 OCR 子场景下的性能差异。

在评估对象上，V2 新增了对手写体、艺术字体、低分辨率/模糊图像等困难样本的专项测试，更贴近真实部署场景中的 OCR 挑战。

## 任务格式

- 共 10,000 道题，开放式问答（open-ended generation）
- 覆盖 29+ 场景类别，12+ 语言
- 图像输入 + 文字问题，模型需生成文字答案
- 评分采用精确匹配与规范化字符匹配混合方式，最终报告百分制分数

## 主要指标

- **总分**（0–100 百分制）
- 各子类别分项得分（文字识别、文档理解、多语言等）
- 按语言分层报告（英文、中文、其他语言）

## 局限性

- 开放式评分对格式变体仍存在容错性不足的问题，部分等价表达可能被误判为错误。
- 数据集规模大但标注成本高，部分低资源语言子集样本量仍有限。
- 与原版 OCRBench 结果不直接可比，需注意版本差异。

## 相关页面

- [[OCRBench]]
- [[AI2D]]
- [[ChartQA]]
