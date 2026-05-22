---
title: "Needle in a Haystack (NIAH)"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://github.com/gkamradt/LLMTest_NeedleInAHaystack"
  - "https://arxiv.org/abs/2504.04713"
aliases:
  - NIAH
  - Needle-in-a-Haystack
  - Needle in Haystack
  - 大海捞针
domain:
  - benchmark
  - long-context
dimension: long-ctx
---

# Needle in a Haystack（NIAH）

> Greg Kamradt 提出的长上下文压力测试范式：把一句无关「针」（needle）藏到大段干扰文本（haystack）的随机深度位置，问模型能否准确召回。是 2023 起所有长上下文模型（GPT-4 Turbo / Claude 2.1 / Gemini 1.5 / Qwen2-Long 等）默认对比项。

<!-- AUTO-LINKS:START -->

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
