---
title: BBEH
type: benchmark
publish: true
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- reasoning
- knowledge
year: 2025
arxiv_id: '2502.19187'
status: active
dimension: A
subdimension: benchmark
sota:
- score: 85.2%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://huggingface.co/datasets/google/BBEH
  notes: BBEH hard tasks accuracy (BIG-Bench Extra Hard)
- score: 83.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.anthropic.com/claude
  notes: BBEH accuracy
- score: 82.0%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://deepmind.google/technologies/gemini/
  notes: BBEH accuracy
- score: 80.5%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: BBEH accuracy
- score: 75.5%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: BBEH accuracy, 2024 baseline
---

# BBEH

> Big-Bench Extra Hard（BBEH），BIG-Bench Hard 的升级版，通过更复杂的任务变体和更严格的评分机制，专为测试前沿 LLM 的极限推理能力而设计。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[GPT-5]] | 🚫 no | 85.2% | BBEH hard tasks accuracy (BIG-Bench Extra Hard) | 2025-09 | [link](https://huggingface.co/datasets/google/BBEH) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 83.5% | BBEH accuracy | 2026-04 | [link](https://www.anthropic.com/claude) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 82.0% | BBEH accuracy | 2026-03 | [link](https://deepmind.google/technologies/gemini/) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 80.5% | BBEH accuracy | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 75.5% | BBEH accuracy, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2502.19187](https://arxiv.org/abs/2502.19187)

<!-- AUTO-LINKS:END -->

## 概述

BBEH（Big-Bench Extra Hard）由 Google DeepMind 于 2025 年发布，是对 2022 年 BIG-Bench Hard（BBH）的重要升级。随着 GPT-4、Gemini 1.5、Claude 3 等前沿模型在 BBH 上的得分已接近饱和（>80%），原版 BBH 已丧失对顶级模型的区分能力，BBEH 应运而生。

BBEH 对 BBH 的 23 个原有任务进行了系统性"难度升级"：
- **更长推理链**：将 3–5 步推理扩展至 7–12 步
- **更复杂的组合推理**：要求同时处理多个约束条件
- **更难的计数和空间推理**：引入三维场景、更大规模的排列组合
- **抗捷径设计**：专门针对已知的 LLM 启发式偏捷径进行对抗性设计

同时，BBEH 引入了 5 个全新任务类型，包括复杂因果推理、多跳数学文字题和程序跟踪（Program Tracing）。评测结果显示，即使是 Gemini 1.5 Ultra 等最先进模型，在 BBEH 上的平均得分也仅在 40–50% 区间，有效恢复了基准的区分度。

## 任务格式

- **任务数量**：23 个原 BBH 升级版 + 5 个新任务，共 28 个子任务
- **类型**：选择题 + 精确字符串匹配（自由格式输出）
- **推理类型**：算法推理、逻辑推理、空间推理、因果推理、数学推理
- **评估方式**：精确匹配，对 CoT 推理过程不作要求但鼓励
- **规模**：每子任务 250 道，共约 7000 题

## 主要指标

- **整体平均准确率（Overall Accuracy）**：28 个子任务的简单平均
- **子任务分解分**：各推理类型的专项表现
- **与 BBH 的性能差距**：衡量难度升级的有效性
- **思维链增益（CoT Gain）**：有无 CoT 提示的性能差

## 局限性

- "难度升级"方式以任务复杂化为主，可能偏向测试工作记忆而非深层推理能力
- 新任务设计尚未经过大规模用户验证，任务有效性有待社区检验
- 与 BBH 保持形式一致性限制了任务类型多样性的扩展空间

## 相关页面

- [[BBH]]
- [[ARC-AGI1]]
- [[HLE]]
- [[GPQA]]
