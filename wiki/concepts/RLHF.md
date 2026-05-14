---
title: "人类反馈强化学习（RLHF）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 人类反馈强化学习（RLHF）

> 通过收集人类偏好数据训练奖励模型，再以奖励模型引导策略优化的 LLM 对齐方法，是 InstructGPT 和 ChatGPT 的核心技术。

## 定义

RLHF（Reinforcement Learning from Human Feedback）流程：

1. **监督微调（SFT）**：在人工示范数据上微调基础 LLM，得到初始对话模型
2. **奖励模型训练（RM）**：收集成对比较数据（人类标注哪个回答更好），训练奖励模型学习人类偏好
3. **RL 策略优化**：用 PPO（Proximal Policy Optimization）等 RL 算法优化 LLM，最大化奖励模型分数，同时用 KL 散度惩罚防止偏离 SFT 基线太远

InstructGPT（Ouyang et al., 2022）和 ChatGPT 的成功使 RLHF 成为 LLM 对齐的工业标准，后续被 Llama 2、Claude 等广泛采用。

## 重要性（在 LLM 评测中）

RLHF 深刻影响 LLM 评测的每个维度：

1. **评测目标转变**：RLHF 后的模型优化目标是人类偏好而非损失，评测也应对齐到偏好评测（胜率、排名）
2. **困惑度失效**：经过 RLHF 的模型 PPL 可能升高，但实际质量显著提升，说明 PPL 不能评测 RLHF 效果
3. **奖励模型质量评测**：RM 的准确性（与真实人类偏好的对齐）是 RLHF 质量的关键，需单独评测
4. **产生评测挑战**：RLHF 引入了谄媚、奖励黑客等新问题，催生了大量新评测需求

## 主要方法/实现

**数据收集**：标注者对同一 prompt 的多个回答进行成对偏好标注，Bradley-Terry 模型将成对比较转换为分数。

**RM 训练**：
```python
# 奖励模型损失（Bradley-Terry 格式）
loss = -torch.log(torch.sigmoid(reward_chosen - reward_rejected))
```

**PPO 训练目标**：
$$\text{objective} = \mathbb{E}[r_\theta(x, y)] - \beta \cdot D_{KL}[\pi_\theta || \pi_{ref}]$$

**评测指标**：
- RM 在留存验证集的偏好预测准确率
- 人工评测的 helpfulness/harmlessness 胜率 vs SFT 基线
- MT-Bench/AlpacaEval 作为代理指标

## 局限与挑战

- **标注者偏见放大**：奖励模型会学习并放大标注者的偏见（性别、文化、政治偏见）
- **奖励过度优化**：长时间 RL 训练后奖励分数高但实际质量下降（奖励黑客）
- **成本高昂**：高质量人类偏好数据极昂贵，扩展性受限
- **评测分布偏移**：RM 训练分布外的情境（长尾任务）偏好预测不可靠
- **DPO/RLAIF 竞争**：更简单的对齐方法（DPO）在很多场景效果可比，RLHF 的必要性受质疑

## 相关页面

- [[DPO]] — RLHF 的简化替代方案
- [[reward-hacking]] — RLHF 的核心风险
- [[sycophancy]] — RLHF 产生的谄媚问题
- [[preference-eval]] — 评测 RLHF 效果的偏好评测
- [[constitutional-AI]] — 不依赖大量人工标注的替代对齐方法
