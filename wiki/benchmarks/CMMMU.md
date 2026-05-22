---
title: CMMMU
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-19'
last_verified: '2026-05-22'
sources:
- https://arxiv.org/abs/2401.11944
- https://cmmmu-benchmark.github.io/
aliases:
- CMMMU
- Chinese MMMU
- C-MMMU
domain:
- benchmark
- multimodal
dimension: E
sota:
- score: 85.2%
  model: Qwen3.6
  harness: null
  with_tools: false
  date: 2026-04
  source: https://qwenlm.github.io
  notes: Chinese Multimodal MMMU accuracy
- score: 84.5%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://deepmind.google/technologies/gemini/
  notes: Chinese Multimodal MMMU accuracy
- score: 82.8%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.anthropic.com/claude
  notes: Chinese Multimodal MMMU accuracy
- score: 81.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://openai.com/gpt-5
  notes: Chinese Multimodal MMMU accuracy
- score: 75.0%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: Chinese Multimodal MMMU, 2024 baseline
---

# CMMMU（Chinese Massive Multi-discipline Multimodal Understanding）

> 2024-01 由 [[M-A-P]] 等团队发布的中文版 [[MMMU]]：12K 道大学考试/教材题，6 学科 30 子科目，39 类图像（图表、地图、乐谱、化学结构等）。是中文多模态大学级评测的事实标准，GPT-4V 仅 42% 准确率。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Qwen3.6]] | 🚫 no | 85.2% | Chinese Multimodal MMMU accuracy | 2026-04 | [link](https://qwenlm.github.io) |
| 🥈 | [[Gemini-3.1-Pro]] | 🚫 no | 84.5% | Chinese Multimodal MMMU accuracy | 2026-03 | [link](https://deepmind.google/technologies/gemini/) |
| 🥉 | [[Claude-Opus-4.7]] | 🚫 no | 82.8% | Chinese Multimodal MMMU accuracy | 2026-04 | [link](https://www.anthropic.com/claude) |
| 4 | [[GPT-5]] | 🚫 no | 81.5% | Chinese Multimodal MMMU accuracy | 2025-09 | [link](https://openai.com/gpt-5) |
| 5 | [[GPT-4o]] | 🚫 no | 75.0% | Chinese Multimodal MMMU, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv**: [https://arxiv.org/abs/2401.11944](https://arxiv.org/abs/2401.11944)
- **项目主页**: [https://cmmmu-benchmark.github.io/](https://cmmmu-benchmark.github.io/)

<!-- AUTO-LINKS:END -->

## 设计

- **题量**：12,000 道（manually collected from 大学考试 / 习题册 / 教科书）
- **6 学科**：Art & Design / Business / Science / Health & Medicine / Humanities & Social Science / Tech & Engineering
- **30 子科目**
- **39 类图像**：charts / diagrams / maps / tables / 乐谱 / 化学结构等
- **协议**：严格 follow [[MMMU]] 的标注与评测范式

## 关键结果

- GPT-4V 仅 42% 准确率
- 中文 LMM（Qwen-VL / DeepSeek-VL / InternVL 等）有专项优化空间
- 与 [[MMMU]] 配合使用，揭示中英文多模态推理 gap

## 与其他中文评测关系

- [[C-Eval]] / [[CMMLU]] —— 纯文本中文
- [[CMMMU]] —— 中文 + 多模态
- [[MMMU]] —— 英文 + 多模态

## 相关页面

- [[MMMU]]
- [[M-A-P]]
- [[multimodal-eval]]
- [[C-Eval]]
- [[CMMLU]]
