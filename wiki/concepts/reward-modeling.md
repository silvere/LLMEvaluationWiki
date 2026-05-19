---
title: "Reward Modeling 与评测"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources: []
aliases:
  - reward-modeling
  - Reward Modeling
  - Reward Model
  - RM
domain:
  - concept
  - alignment
---

# Reward Modeling（奖励建模）

> RLHF / RLAIF 训练 pipeline 的核心组件：用人类（或 AI）偏好数据训练一个 reward model（RM）来打分，RM 再驱动 PPO / DPO / GRPO 等 RL 更新。RM 自身的准确率、偏差、generalization 是评测 alignment quality 的关键瓶颈。

## 评测维度

- **Pairwise accuracy**：在 held-out 人类偏好对上的预测准确率
- **Calibration**：RM 分数与真实人类偏好概率的标定
- **Robustness**：对抗 prompt / 长 response / out-of-distribution 输入
- **Mode collapse**：RM 是否偏好特定风格（reward hacking 风险）

## 代表 benchmark

- **RewardBench** —— Allen AI 主导，最早系统化的 RM 评测套件
- **PPE（Preference Proxy Evaluations）** —— 检测 RM 在不同领域的偏置
- **Skywork-Reward** —— 中文 RM 评测

## 与 PRM（Process Reward Model）区分

- Outcome RM：对最终答案打分
- [[process-reward-model|PRM]]：对中间推理步骤逐步打分
- PRM 评测有专门 benchmark（PRMBench / MathShepherd）

## 评测圈意义

- RM 准确率天花板直接决定 RLHF 上限
- "**Reward Hacking**" 是 RM 评测最关注的失败模式（policy 学会刷分而非真好）
- DPO 等 RM-free 方法部分绕过 RM 评测的复杂性

## 相关页面

- [[process-reward-model]]
- [[RLHF]]
- alignment evaluation
- [[llm-as-judge]]
