---
title: BiGGen-Bench
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- reasoning
- instruction-following
- knowledge
- agent
language: en
year: 2024
authors:
- Kim, Seungone et al.
arxiv_id: '2406.05761'
official_url: https://github.com/prometheus-eval/prometheus-eval/tree/main/BiGGen-Bench
license: Apache-2.0
size: 765
format: open-ended
status: active
saturation_threshold: 0.9
sources: []
dimension: D
subdimension: general
sota:
- score: 92.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://github.com/prometheus-eval/prometheus-eval
  notes: BiGGen-Bench instruction-following score
- score: 91.2%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://github.com/prometheus-eval/prometheus-eval
  notes: score
- score: 90.5%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://github.com/prometheus-eval/prometheus-eval
  notes: score
- score: 89.8%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: score
- score: 85.5%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://github.com/prometheus-eval/prometheus-eval
  notes: score, 2024 baseline
---

# BiGGen-Bench

> 面向大型语言模型通用生成能力的综合评测基准，覆盖 9 个核心能力维度，采用 Prometheus 评分系统进行细粒度评测。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2406.05761](https://arxiv.org/abs/2406.05761)
- **官方主页**: [https://github.com/prometheus-eval/prometheus-eval/tree/main/BiGGen-Bench](https://github.com/prometheus-eval/prometheus-eval/tree/main/BiGGen-Bench)

<!-- AUTO-LINKS:END -->

## 概述

BiGGen-Bench 由 Kim 等人于 2024 年提出（来自 KAIST 和首尔大学等机构，发表于 NeurIPS 2024）。该基准旨在全面评测大型语言模型的**通用生成能力**（general generation capabilities），而非专注于某一特定任务。

BiGGen-Bench 定义了 9 个核心能力维度：
1. **指令跟随（Instruction Following）**：精确遵循复杂指令
2. **规划（Planning）**：制定步骤化方案和计划
3. **推理（Reasoning）**：多步逻辑和数学推理
4. **精炼（Refinement）**：基于反馈改进输出
5. **安全（Safety）**：拒绝有害请求和内容
6. **代码（Code）**：编写和调试程序
7. **数学（Math）**：解决数学问题
8. **检索（Grounding）**：基于给定信息生成答案
9. **工具使用（Tool Use）**：使用外部工具和 API

数据集共 765 道实例，每个维度约 85 个实例，每道题包含详细的任务描述、评分标准和参考答案。

评测系统使用 **Prometheus**（基于 LLM 的开源评测模型）作为 Judge，而非依赖专有 API（如 GPT-4），降低了评测成本并提高了可复现性。每道题提供 5 分制的细粒度评分标准（rubric），使评测更加客观。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2024 |
| 数据量 | 765 道实例 |
| 格式 | 开放式（Prometheus 评分） |
| 领域 | 多维度通用能力 |
| 语言 | 英文 |
| 许可证 | Apache-2.0 |
| 评分方式 | Prometheus Judge（1-5 分） |
| 能力维度 | 9 个 |

## SOTA 表现

顶尖大型语言模型（GPT-4o、Claude 3.5 Sonnet、Gemini 1.5 Pro 等）在 BiGGen-Bench 的平均分约为 3.5-4.5/5。具体各维度成绩见原论文及 GitHub 排行榜。


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 92.5% | BiGGen-Bench instruction-following score | 2025-09 | [link](https://github.com/prometheus-eval/prometheus-eval) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 91.2% | score | 2026-04 | [link](https://github.com/prometheus-eval/prometheus-eval) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 90.5% | score | 2026-03 | [link](https://github.com/prometheus-eval/prometheus-eval) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 89.8% | score | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 85.5% | score, 2024 baseline | 2024-05 | [link](https://github.com/prometheus-eval/prometheus-eval) |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **Prometheus Judge 精度**：开源 Judge 模型的评分一致性不如 GPT-4
- **规模较小**：765 道实例统计稳定性有限
- **维度边界模糊**：9 个维度之间存在重叠（如推理和数学）
- **英文单一**：不覆盖多语言能力
- **评分标准主观性**：细粒度 rubric 的设计存在主观判断

## 相关页面

- [[FLASK]]
- [[MT-Bench]]
- [[ArenaHard]]
- [[AlpacaEval-2.0]]
- [[WildBench]]
