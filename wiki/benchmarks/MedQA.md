---
title: MedQA
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- knowledge
- reasoning
language: multilingual
year: 2021
authors:
- Jin et al.
arxiv_id: '2009.13081'
official_url: https://github.com/jind11/MedQA
license: MIT
size: 12723
format: multiple-choice
status: active
saturation_threshold: 0.9
sources: []
dimension: A
subdimension: benchmark
sota:
- score: 96.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://openai.com/gpt-5
  notes: USMLE MedQA 4-option accuracy
- score: 95.0%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.anthropic.com/claude
  notes: USMLE MedQA 4-option accuracy
- score: 94.2%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://deepmind.google/technologies/gemini/
  notes: USMLE MedQA 4-option accuracy
- score: 92.5%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: USMLE MedQA 4-option accuracy
- score: 90.2%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: USMLE MedQA 4-option, 2024 baseline
---

# MedQA

> 基于美国医学执照考试（USMLE）的医学推理问答基准，同时包含中国和台湾医学考试题目。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2009.13081](https://arxiv.org/abs/2009.13081)
- **官方主页**: [https://github.com/jind11/MedQA](https://github.com/jind11/MedQA)

<!-- AUTO-LINKS:END -->

## 概述

MedQA 由 Jin 等人于 2021 年提出（发表于 Applied Sciences 2021）。该数据集从多个国家的医学执照考试中收集题目，旨在评测语言模型的医学知识理解和临床推理能力。

数据集包含三个版本：
- **USMLE（美国）**：约 12,723 道美国医学执照考试题（Step 1-3），四选一或五选一
- **中国国家医师资格考试**：约 34,251 道题（含中文版本）
- **台湾医师考试**：约 14,123 道题

USMLE 版本是引用最广泛的版本。USMLE 考试分为三个阶段：Step 1 测试基础医学科学，Step 2 CK 测试临床知识，Step 3 测试临床实践。这些题目要求综合运用病理生理、药理、微生物等基础医学知识和临床推理能力，对模型的医学推理能力是重大挑战。

MedQA 是评测医学 AI 能力的标准基准之一，与 PubMedQA 和 MedMCQA 共同构成医学 NLP 评测的核心套件。GPT-4 在 USMLE Step 1-3 上均超过医师执照考试及格线（约 60%），在医学 AI 领域引起广泛关注。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2021 |
| 数据量 | USMLE 约 12,723 题，全部约 60k+ |
| 格式 | 多选题（4-5 选 1） |
| 领域 | 医学知识、临床推理 |
| 语言 | 英文（主）、中文 |
| 许可证 | MIT |
| 数据来源 | USMLE、中国/台湾医师考试 |

## SOTA 表现

GPT-4 在 MedQA (USMLE) 上的准确率约为 87%，超过医师执照考试及格线（约 60%）。顶尖医学专用模型（如 MedPaLM 2）准确率更高，接近 90%。具体最新成绩见各模型官方技术报告。


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 96.5% | USMLE MedQA 4-option accuracy | 2025-09 | [link](https://openai.com/gpt-5) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 95.0% | USMLE MedQA 4-option accuracy | 2026-04 | [link](https://www.anthropic.com/claude) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 94.2% | USMLE MedQA 4-option accuracy | 2026-03 | [link](https://deepmind.google/technologies/gemini/) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 92.5% | USMLE MedQA 4-option accuracy | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 90.2% | USMLE MedQA 4-option, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **医学知识时效性**：医学知识和诊疗指南不断更新
- **题目版权**：USMLE 题目存在版权问题，实际使用的题目可能是近似版本
- **临床背景依赖**：部分题目需要大量临床背景知识
- **评测局限**：多选题格式无法测试实际临床决策和操作能力
- **中英文差异**：中文版题目在语言和知识体系上与英文版存在差异

## 相关页面

- [[PubMedQA]]
- [[LegalBench]]
- [[MMLU]]
- [[FinanceBench]]
