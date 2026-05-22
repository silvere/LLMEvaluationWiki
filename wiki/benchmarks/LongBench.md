---
title: LongBench
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- long-context
- reasoning
- knowledge
language: multilingual
year: 2023
authors:
- Bai et al.
arxiv_id: '2308.14508'
official_url: https://github.com/THUDM/LongBench
license: MIT
size: 4750
format: open-ended
status: active
saturation_threshold: 0.9
sources: []
dimension: long-ctx
sota:
- score: 87.2%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://openai.com/gpt-5
  notes: LongBench v2 overall score
- score: 85.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.anthropic.com/claude
  notes: LongBench v2 overall score
- score: 84.3%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://deepmind.google/technologies/gemini/
  notes: LongBench v2 overall score
- score: 82.6%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: LongBench v2 overall score
- score: 72.4%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: LongBench v1 score, 2024 baseline
---

# LongBench

> 首个中英文双语长文本理解评测基准，包含 21 个子任务，平均上下文长度约 14k tokens。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2308.14508](https://arxiv.org/abs/2308.14508)
- **官方主页**: [https://github.com/THUDM/LongBench](https://github.com/THUDM/LongBench)

<!-- AUTO-LINKS:END -->

## 概述

LongBench 由 Bai 等人于 2023 年提出，来自清华大学（发表于 ACL 2024）。该基准是最早系统性评测大型语言模型**长文本理解能力**的综合性基准之一，填补了当时缺乏标准化长上下文评测工具的空白。

LongBench 包含 21 个子任务，涵盖 16 个数据集，分为 6 大类：
1. **单文档问答**：长文档阅读理解（如 NarrativeQA、Qasper）
2. **多文档问答**：跨文档推理（如 MuSiQue、HotpotQA）
3. **摘要生成**：长文档摘要（如 GovReport、QMSum）
4. **少样本学习**：长上下文的 few-shot 学习
5. **代码补全**：长代码上下文理解
6. **合成任务**：PassKey Retrieval、数字查找等

数据集平均上下文长度约 14,000 tokens，最长达数万 tokens，覆盖英文和中文两种语言，其中中文任务约占三分之一。

LongBench 为衡量不同上下文窗口大小的模型提供了标准化比较平台，推动了 LLaMA-2 Long、Claude 等长上下文模型的研究进展。后续发布了 LongBench v2 版本（更新更难的任务）。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 数据量 | 约 4,750 样本 |
| 格式 | 开放式（问答/摘要/补全） |
| 领域 | 长文本理解 |
| 语言 | 中英双语 |
| 许可证 | MIT |
| 平均上下文长度 | 约 14,000 tokens |
| 子任务数 | 21 个 |

## SOTA 表现

顶尖长上下文模型（Claude 3 系列、GPT-4 Turbo、Gemini 1.5 Pro 等）在 LongBench 整体上的平均分超过 60 分（满分 100）。具体最新成绩见各模型官方技术报告及 GitHub 排行榜。


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 87.2% | LongBench v2 overall score | 2025-09 | [link](https://openai.com/gpt-5) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 85.5% | LongBench v2 overall score | 2026-04 | [link](https://www.anthropic.com/claude) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 84.3% | LongBench v2 overall score | 2026-03 | [link](https://deepmind.google/technologies/gemini/) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 82.6% | LongBench v2 overall score | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 72.4% | LongBench v1 score, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **上下文长度要求高**：早期模型（4k/8k 窗口）无法完整处理所有任务
- **子任务异质性**：不同任务使用不同评测指标（F1、ROUGE、EM 等），聚合复杂
- **数据来源复杂**：16 个数据集各有不同许可证
- **中文任务覆盖有限**：相比英文任务，中文长文本数据集较少
- **长度分布不均**：不同任务的平均长度差异较大

## 相关页面

- [[LongBench-v2]]
- [[RULER]]
- [[NeedleInAHaystack]]
- [[HELMET]]
- [[QuALITY]]
