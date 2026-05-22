---
title: Needle in a Haystack (NIAH)
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-19'
last_verified: '2026-05-22'
sources:
- https://github.com/gkamradt/LLMTest_NeedleInAHaystack
- https://arxiv.org/abs/2504.04713
aliases:
- NIAH
- Needle-in-a-Haystack
- Needle in Haystack
- 大海捞针
domain:
- benchmark
- long-context
dimension: long-ctx
sota:
- score: 99.2%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://deepmind.google/technologies/gemini/
  notes: Needle-In-A-Haystack 1M token retrieval accuracy
- score: 99.0%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.anthropic.com/claude
  notes: NIAH 200K token retrieval accuracy
- score: 98.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://openai.com/gpt-5
  notes: NIAH 128K token retrieval accuracy
- score: 98.2%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: NIAH 128K retrieval
- score: 96.5%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: NIAH 128K retrieval, 2024 baseline
---

# Needle in a Haystack（NIAH）

> Greg Kamradt 提出的长上下文压力测试范式：把一句无关「针」（needle）藏到大段干扰文本（haystack）的随机深度位置，问模型能否准确召回。是 2023 起所有长上下文模型（GPT-4 Turbo / Claude 2.1 / Gemini 1.5 / Qwen2-Long 等）默认对比项。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Gemini-3.1-Pro]] | 🚫 no | 99.2% | Needle-In-A-Haystack 1M token retrieval accuracy | 2026-03 | [link](https://deepmind.google/technologies/gemini/) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 99.0% | NIAH 200K token retrieval accuracy | 2026-04 | [link](https://www.anthropic.com/claude) |
| 🥉 | [[GPT-5]] | 🚫 no | 98.5% | NIAH 128K token retrieval accuracy | 2025-09 | [link](https://openai.com/gpt-5) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 98.2% | NIAH 128K retrieval | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 96.5% | NIAH 128K retrieval, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **GitHub**: [https://github.com/gkamradt/LLMTest_NeedleInAHaystack](https://github.com/gkamradt/LLMTest_NeedleInAHaystack)
- **arXiv**: [https://arxiv.org/abs/2504.04713](https://arxiv.org/abs/2504.04713)

<!-- AUTO-LINKS:END -->

## 设计

- **任务**：长 prompt 末尾问一个仅靠「针」内容才能答对的问题
- **变量**：上下文长度（4K → 1M+）× 针深度（0% → 100%）
- **指标**：以矩阵形式可视化召回率（绿色=通过 / 红色=失败）

## 衍生与升级

- **Multi-Needle NIAH**：多个针位于不同深度，考验同时召回
- **Sequential-NIAH**（[[2504.04713]]，2025）：扩展到 8K-128K，提供 14K 训练样本，要求按顺序输出多个针
- **RULER**（[[RULER]]）：把 NIAH 系统化为 13 个长上下文子任务，是 NIAH 的正统学术化版本

## 与其他长上下文 benchmark 的关系

- [[RULER]] 是更全面的替代品（NIAH 仅是其中 4 个子任务）
- [[LongBench-v2]] 关注真实下游任务而非合成召回
- [[InfiniBench]] 关注 video / multimodal 长上下文

## 相关页面

- [[RULER]]
- [[LongBench-v2]]
- [[long-context-eval]]
