---
title: "JudgeBench"
type: benchmark
dimension: K
subdimension: judge-benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://arxiv.org/abs/2410.12784"
  - "https://github.com/ScalerLab/JudgeBench"
  - "https://openreview.net/forum?id=G0dksFayVq"
aliases:
  - JudgeBench
  - Judge-Bench
arxiv_id: "2410.12784"
official_url: "https://github.com/ScalerLab/JudgeBench"
license: "Apache-2.0"
org: "ScalerLab"
github_url: "https://github.com/ScalerLab/JudgeBench"
domain:
  - reasoning
  - safety
---

# JudgeBench

> ICLR 2025 论文（arxiv 2410.12784）：评测 LLM-as-Judge 在**客观正确性**任务上的可靠性。亮点是把 hard reasoning / math / coding 数据集转化为 challenging response pair（pair 真值由数据集自身决定），区别于 MT-Bench / Chatbot Arena 等以人类偏好为真值的 benchmark。

## 设计

- **管道**：把现有难数据集 → 客观正确性 pair（chosen = 正确答案 / rejected = 模型常见错答）
- **覆盖**：knowledge / reasoning / math / coding
- **判断对象**：prompted judges / fine-tuned judges / multi-agent judges / reward models
- **结果**：GPT-4o 等顶级模型仅略好于随机猜测，说明 judge 任务远未解决

## 评测圈意义

- 揭示「judge 准确率」与「judge 偏好」之间的鸿沟
- 推动 [[RewardBench]] → JudgeBench 的范式升级（从人类偏好 → 客观正确性）
- 配合 [[LLMBar]] / [[reward-modeling]] 形成 judge 评测三件套

## 已知 pitfall

- pair 难度高，judge 可能拒绝判断（refusal 率影响分数）
- 与 RewardBench 不可直接对比（不同任务定义）
- 真值依赖原数据集质量（math 类相对干净，knowledge 类有歧义）

## 相关页面

- [[RewardBench]]
- [[llm-as-judge]]
- [[reward-modeling]]
- [[Chatbot-Arena]]
