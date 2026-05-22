---
title: "RewardBench"
type: benchmark
dimension: K
subdimension: judge-benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://arxiv.org/abs/2403.13787"
  - "https://github.com/allenai/reward-bench"
  - "https://allenai.org/blog/rewardbench-the-first-benchmark-leaderboard-for-reward-models-used-in-rlhf-1d4d7d04a90b"
  - "https://arxiv.org/html/2506.01937v1"
aliases:
  - RewardBench
  - Reward-Bench
  - RewardBench-2
arxiv_id: "2403.13787"
official_url: "https://github.com/allenai/reward-bench"
official_leaderboard: "https://huggingface.co/spaces/allenai/reward-bench"
license: "Apache-2.0"
org: "Allen Institute for AI (AI2)"
homepage: "https://allenai.org/"
github_url: "https://github.com/allenai/reward-bench"
domain:
  - safety
  - reasoning
---

# RewardBench

> [[AI2]] 2024-03 发布的**首个** reward model 评测基准（含 DPO 训练的隐式 RM）。评测维度：Chat / Chat Hard / Safety / Reasoning。RewardBench 2（2025-06）扩展到指令遵循 + 推理 + 安全多领域。是 RLHF / DPO 训练 pipeline 中 RM 选型的标准对照。

## 设计

- **任务**：4 大子集（Chat / Chat Hard / Safety / Reasoning）× 数千 prompt 对
- **指标**：RM 在 chosen vs rejected pair 上的偏好准确率
- **对象**：classic Bradley-Terry RM / DPO 隐式 RM / Sequence Classifier / LLM-as-judge
- **leaderboard**：HuggingFace Space 持续更新

## 评测圈意义

- 揭示主流 RM 在 reasoning / instruction-following 上的能力 ceiling
- 推动 RM 训练数据 + 架构 ablation（如 Skywork-Reward / InternLM-Reward / Llama-3.1-8B-Reward）
- 是 [[reward-modeling]] 研究的事实标准

## 已知 pitfall

- pair 由 GPT-4 / Claude 等强模型生成，RM 在 base model distillation 上有偏
- Chat Hard 子集争议（部分 pair 主观性强）
- RewardBench 1 已部分饱和，应改用 RewardBench 2

## 相关页面

- [[reward-modeling]]
- [[AI2]]
- [[RLHF]]
- [[Dan-Hendrycks]]
- [[JudgeBench]]
