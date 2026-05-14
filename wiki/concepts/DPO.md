---
title: "直接偏好优化（DPO）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 直接偏好优化（DPO）

> 无需显式训练奖励模型即可从人类偏好数据对齐 LLM 的方法，将 RLHF 的两阶段流程简化为单阶段监督学习，Rafailov et al. 2023 年提出，arxiv: 2305.18290。

## 定义

DPO（Direct Preference Optimization）基于关键数学洞察：在 RLHF 的 PPO 优化问题的闭式解中，奖励函数可以用策略模型和参考模型的 log 概率比值来表示。因此，可以跳过奖励模型训练，直接在成对偏好数据上优化策略模型。

DPO 损失函数：

$$\mathcal{L}_{DPO} = -\mathbb{E}_{(x, y_w, y_l)}\left[\log \sigma\left(\beta \log \frac{\pi_\theta(y_w|x)}{\pi_{ref}(y_w|x)} - \beta \log \frac{\pi_\theta(y_l|x)}{\pi_{ref}(y_l|x)}\right)\right]$$

其中 y_w 为偏好回答，y_l 为非偏好回答，β 为温度超参数，π_ref 为参考模型（通常是 SFT 模型）。

直觉：DPO 增大偏好回答相对于参考模型的 log 概率，同时降低非偏好回答的 log 概率。

## 重要性（在 LLM 评测中）

DPO 对评测的影响体现在多个层面：

1. **民主化对齐**：大大降低了对齐训练的技术门槛，使学术界和小团队能够在开源模型上进行对齐实验，产出了大量可评测的对齐模型
2. **评测新问题**：DPO 有独特的失效模式（如长度退化、分布崩溃），需要专门的评测协议
3. **基准建设**：DPO 产生的模型被广泛用于对齐评测基准（AlpacaEval、MT-Bench）的参考线
4. **RLHF vs DPO 比较**：需要公平评测两种对齐方法的质量差异，促进了评测方法标准化

## 主要方法/实现

**训练流程**：
```python
# DPO 损失计算
def dpo_loss(policy_chosen_logps, policy_rejected_logps,
             ref_chosen_logps, ref_rejected_logps, beta=0.1):
    chosen_rewards = beta * (policy_chosen_logps - ref_chosen_logps)
    rejected_rewards = beta * (policy_rejected_logps - ref_rejected_logps)
    loss = -F.logsigmoid(chosen_rewards - rejected_rewards).mean()
    return loss
```

**DPO 变体**：
- **IPO**（Identity Preference Optimization）：修正 DPO 理论假设中的问题
- **KTO**（Kahneman-Tversky Optimization）：不需要成对数据，只需单独的好/坏标注
- **SimPO**：去除参考模型，通过长度归一化简化计算

**评测关注点**：
- 训练后模型是否存在长度退化（回答变得更长/更短）
- 是否保持基础模型的能力（在通用基准上是否退步）
- 对齐效果是否超过 SFT 基线

## 局限与挑战

- **分布外泛化弱**：DPO 在训练分布内表现好，但在分布外提示上可能退化
- **超参数敏感**：β 值选择显著影响结果，需针对具体任务调优
- **长度偏差**：部分研究发现 DPO 训练后模型输出长度发生系统性变化
- **离线优化局限**：DPO 是离线方法，无法利用训练过程中的在线反馈，可能比 PPO 收敛到更差的局部最优
- **数据质量依赖**：与 RLHF 同样依赖偏好数据质量，低质量标注直接影响对齐效果

## 相关页面

- [[RLHF]] — DPO 旨在替代的复杂对齐流程
- [[constitutional-AI]] — 另一种减少人工标注的对齐方法
- [[preference-eval]] — 评测 DPO 效果的偏好评测
- [[reward-hacking]] — DPO 也存在类似的过度优化问题
- [[sycophancy]] — DPO 对谄媚问题的影响
