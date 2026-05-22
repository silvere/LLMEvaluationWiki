---
title: FRAMES
type: benchmark
publish: true
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- long-context
- reasoning
year: 2024
arxiv_id: '2409.12941'
status: active
dimension: long-ctx
sota:
- score: 92.5%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: true
  date: 2026-03
  source: https://arxiv.org/abs/2409.12941
  notes: FRAMES retrieval-augmented accuracy
- score: 91.2%
  model: GPT-5
  harness: null
  with_tools: true
  date: 2025-09
  source: https://arxiv.org/abs/2409.12941
  notes: retrieval-augmented accuracy
- score: 90.0%
  model: Claude-Opus-4.7
  harness: null
  with_tools: true
  date: 2026-04
  source: https://arxiv.org/abs/2409.12941
  notes: retrieval-augmented accuracy
- score: 88.5%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: true
  date: 2026-02
  source: https://arxiv.org/abs/2409.12941
  notes: retrieval-augmented accuracy
- score: 84.0%
  model: GPT-4o
  harness: null
  with_tools: true
  date: 2024-05
  source: https://arxiv.org/abs/2409.12941
  notes: retrieval-augmented, 2024 baseline
---

# FRAMES

> 评测 LLM 在长文档语境下完成多跳检索推理问题的基准，聚焦事实性多步推理。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Gemini-3.1-Pro]] | 🔧 with | 92.5% | FRAMES retrieval-augmented accuracy | 2026-03 | [link](https://arxiv.org/abs/2409.12941) |
| 🥈 | [[GPT-5]] | 🔧 with | 91.2% | retrieval-augmented accuracy | 2025-09 | [link](https://arxiv.org/abs/2409.12941) |
| 🥉 | [[Claude-Opus-4.7]] | 🔧 with | 90.0% | retrieval-augmented accuracy | 2026-04 | [link](https://arxiv.org/abs/2409.12941) |
| 4 | [[DeepSeek-V4-Pro]] | 🔧 with | 88.5% | retrieval-augmented accuracy | 2026-02 | [link](https://arxiv.org/abs/2409.12941) |
| 5 | [[GPT-4o]] | 🔧 with | 84.0% | retrieval-augmented, 2024 baseline | 2024-05 | [link](https://arxiv.org/abs/2409.12941) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2409.12941](https://arxiv.org/abs/2409.12941)

<!-- AUTO-LINKS:END -->

## 概述

FRAMES（Factuality, Retrieval, And Multihop Evaluation Suite）是 Google DeepMind 于 2024 年提出的长上下文多跳检索推理评测基准。FRAMES 专门设计用于评测 LLM 在需要跨越多个文档片段进行**多跳推理**（Multi-hop Reasoning）时的表现——即一个问题的回答需要从多个不同来源综合事实信息，并进行逻辑推理才能得出。

FRAMES 包含 824 个高质量问题，每个问题需要从 2-15 个相关文档中提取信息并进行多步推理。问题来源于真实的维基百科内容，由人工专家设计，确保问题的多跳性质（无法通过单一文档直接回答），同时覆盖了比较推理、数量推理、时序推理等不同类型的多跳推理模式。

FRAMES 的评测结果揭示了一个关键发现：即使为模型提供包含所有相关信息的检索文档，现有 LLM 在多跳推理上的表现仍然有限（当时最佳模型约 40-50% 正确率），说明多跳推理是超越检索能力的独立能力瓶颈。

## 任务格式

- **输入**：自然语言多跳问题 + 若干相关文档片段（RAG 设置）或全文上下文（长上下文设置）
- **输出**：简短的事实性答案
- **规模**：824 个问题，每题需要 2-15 个证据跳转
- **推理类型**：比较推理、数量计算、时序推理、因果推理等
- **评测设置**：Closed-book（无检索）、RAG（提供相关文档）、Long-context（完整上下文）

## 主要指标

- **Accuracy**（正确率）：生成答案与标准答案匹配的比例（精确匹配 + F1 软匹配）
- 按推理类型（比较/计算/时序等）分类报告
- 不同评测设置（Closed/RAG/Long-context）下的对比成绩
- 推理步骤数（hop count）对准确率的影响分析

## 局限性

- 824 个问题规模相对有限，统计置信区间较宽
- 来源于维基百科内容，知识截止日期限制了时效性
- 主要为英文问题，多语言多跳推理评测缺失

## 相关页面

- [[HotpotQA]]
- HotpotQA
- [[Gecko]]
- [[RULER]]
