---
title: LongBench v2
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-13'
last_verified: '2026-05-22'
domain:
- long-context
- knowledge
- reasoning
language: multilingual
year: 2024
authors:
- Bai et al.
arxiv_id: ''
official_url: https://github.com/THUDM/LongBench
license: ''
size: 0
format: multiple-choice
status: active
saturation_threshold: 0.75
sources:
- ''
dimension: long-ctx
sota:
- score: 76.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://github.com/THUDM/LongBench
  notes: LongBench v2 overall score (harder version)
- score: 74.8%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/THUDM/LongBench
  notes: LongBench v2 score
- score: 73.5%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://github.com/THUDM/LongBench
  notes: LongBench v2 score
- score: 72.0%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: LongBench v2 score
- score: 65.0%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://github.com/THUDM/LongBench
  notes: LongBench v2 score, 2024 baseline
---

# LongBench v2

> 面向真实长文档理解的中英文混合评测基准，v2 版本任务难度显著提升，来源于真实文档场景。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 76.5% | LongBench v2 overall score (harder version) | 2025-09 | [link](https://github.com/THUDM/LongBench) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 74.8% | LongBench v2 score | 2026-04 | [link](https://github.com/THUDM/LongBench) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 73.5% | LongBench v2 score | 2026-03 | [link](https://github.com/THUDM/LongBench) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 72.0% | LongBench v2 score | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 65.0% | LongBench v2 score, 2024 baseline | 2024-05 | [link](https://github.com/THUDM/LongBench) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **官方主页**: [https://github.com/THUDM/LongBench](https://github.com/THUDM/LongBench)

<!-- AUTO-LINKS:END -->

## 概述

LongBench v2 于 2024 年发布，是清华大学团队对 LongBench v1 的重要升级。v1 版本已在长文档问答、多文档检索和代码补全等任务上建立了长上下文评测的基础框架；v2 在此基础上大幅提升任务难度，并引入更多来自真实世界文档的测试样本，使其与用户实际使用场景更贴近。

LongBench v2 的显著特点之一是中英文混合设计。与大多数长上下文基准仅支持英文不同，LongBench v2 包含大量中文任务，能够同时评测模型在两种语言下的长文档处理能力，对中文大模型的评测尤具参考价值。任务类型涵盖长文档问答、多文档汇总、长上下文代码理解等，部分任务需要模型在超过 100K token 的文档中定位关键信息并综合推理。

v2 相比 v1 的核心改进在于"任务真实性"——题目来源于实际的学术论文、法律文件、书籍和代码库，而非人工合成的填充文本，使模型难以通过表面匹配模式绕过真正的理解需求。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2024（v2） |
| 大小 | 待核实（v1 共约 4,750 条，v2 规模待更新） |
| 题目格式 | 多种（选择题 + 开放性问答） |
| 覆盖领域 | 长上下文、知识、推理 |
| 语言 | 多语言（中英文混合） |

## 当前状态

该基准处于 active 状态。饱和阈值设为 75%，当前主流模型在 v2 上的整体表现普遍低于 v1，说明难度提升有效延长了基准的区分生命周期。由于文档来源真实，污染风险低于合成类基准，但部分文档（如公开论文）仍可能出现在预训练语料中。

## 主要局限

- **开放性任务评测标准不统一**：部分任务使用 F1 或字符串匹配，部分依赖模型打分，不同评测配置下结果可比性有限。
- **中英文任务权重不对称**：中文和英文任务在数量和难度上的分布并不完全对等，导致整体分数对中英文能力的反映存在偏差。
- **计算成本较高**：超长上下文任务对显存和推理时间要求高，部分实验室难以完整复现全量评测。

## 相关页面

- [[RULER]]
- [[LongBench-v2]]
- [[MMLU]]
