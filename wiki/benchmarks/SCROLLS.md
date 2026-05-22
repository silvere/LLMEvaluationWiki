---
title: SCROLLS
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- long-context
- reasoning
language: en
year: 2022
authors:
- Shaham et al.
arxiv_id: '2201.03533'
official_url: https://www.scrolls-benchmark.com/
license: Multiple
size: 0
format: open-ended
status: active
saturation_threshold: 0.9
sources: []
dimension: long-ctx
sota:
- score: 87.2%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.scrolls-benchmark.com
  notes: geometric mean across SCROLLS subtasks
- score: 86.0%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://openai.com/gpt-5
  notes: geometric mean
- score: 84.8%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://deepmind.google/technologies/gemini/
  notes: geometric mean
- score: 83.5%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: geometric mean
- score: 78.0%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: geometric mean, 2024 baseline
---

# SCROLLS（Standardized CompaRison Over Long Language Sequences）

> 包含 7 个长文档理解和摘要任务的聚合基准，提供统一评测界面和排行榜。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2201.03533](https://arxiv.org/abs/2201.03533)
- **官方主页**: [https://www.scrolls-benchmark.com/](https://www.scrolls-benchmark.com/)

<!-- AUTO-LINKS:END -->

## 概述

SCROLLS 由 Shaham 等人于 2022 年提出（发表于 EMNLP 2022），来自特拉维夫大学等机构。该基准将 7 个已有的长文档 NLP 数据集整合为一个统一的评测套件，提供标准化的数据加载、评测指标和排行榜平台，降低了长文本研究的评测门槛。

SCROLLS 包含的 7 个子任务：
1. **GovReport** - 政府报告摘要（平均约 9k words）
2. **SumScr** - 影视剧本摘要（平均约 35k words）
3. **QMSum** - 会议记录问答摘要
4. **Qasper** - 学术论文问答
5. **NarrativeQA** - 长篇小说/电影剧本问答
6. **QuALITY** - 长文本多选阅读理解
7. **ContractNLI** - 合同自然语言推理

统一评测指标根据任务类型不同而异：摘要任务使用 ROUGE，问答任务使用 F1，分类任务使用准确率，最终汇报各任务的宏平均得分。

SCROLLS 的价值在于提供了一个社区共识的长文本评测标准，使得不同论文的结果具有可比性。它也推动了效率优化型长文本模型的研究（Longformer、BigBird 等）。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2022 |
| 子任务数 | 7 个 |
| 格式 | 开放式（摘要/问答/分类） |
| 领域 | 多领域长文档 |
| 语言 | 英文 |
| 许可证 | 各子任务许可证不同 |
| 文档长度 | 数千至数万词不等 |

## SOTA 表现

顶尖长上下文模型在 SCROLLS 各子任务上的表现参差不齐，整体宏平均得分见官方排行榜。


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Claude-Opus-4.7]] | 🚫 no | 87.2% | geometric mean across SCROLLS subtasks | 2026-04 | [link](https://www.scrolls-benchmark.com) |
| 🥈 | [[GPT-5]] | 🚫 no | 86.0% | geometric mean | 2025-09 | [link](https://openai.com/gpt-5) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 84.8% | geometric mean | 2026-03 | [link](https://deepmind.google/technologies/gemini/) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 83.5% | geometric mean | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 78.0% | geometric mean, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **子任务质量参差不齐**：7 个子任务难度和格式差异较大
- **ROUGE 评测局限**：摘要任务的 ROUGE 指标无法准确反映生成质量
- **计算成本高**：长文本处理需要大量计算资源和内存
- **模型输入限制**：早期模型受上下文窗口限制无法处理所有任务
- **许可证复杂**：多个来源的不同版权限制

## 相关页面

- [[Zero-SCROLLS]]
- [[LongBench]]
- [[QuALITY]]
- [[L-Eval]]
- [[HELMET]]
