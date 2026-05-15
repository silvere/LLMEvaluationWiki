---
title: "What Makes a Reward Model a Good Teacher? An Optimization Perspective"
type: paper
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
source_type: paper
url: "https://arxiv.org/abs/2503.15477"
ingested: "2026-05-14"
sources:
  - "https://arxiv.org/abs/2503.15477"
year: 2025
authors:
  - "Noam Razin"
  - "Zixuan Wang"
  - "Hubert Strauss"
  - "Stanley Wei"
discusses:
  - "[[rlhf|RLHF]]"
  - "[[process-reward-model|reward-model]]"
  - "[[reward-hacking]]"
  - "[[RLHF|policy-gradient]]"
---

# What Makes a Reward Model a Good Teacher? An Optimization Perspective

> 证明奖励方差（而非准确率）是决定 RLHF 优化效率的关键因素

## 核心贡献

- 从优化理论视角证明：无论奖励模型的准确率多高，若其对初始策略诱导的奖励方差过低，则 RLHF 目标函数景观趋于平坦，策略梯度优化极其缓慢（Theorem 1）[REF: §3.2]
- 正式建立"高准确率 ≠ 好教师"的理论：构造证明存在完全准确（accuracy=1）的奖励模型，其优化速度任意慢于几乎完全不准确（accuracy ≤ 2/|Y|）的奖励模型（Theorem 2）[REF: §3.3]
- 证明奖励方差依赖于策略，因此对不同初始语言模型，最优奖励模型不同（Theorem 3），揭示了脱离语言模型独立评估奖励模型的根本局限 [REF: §3.4]
- 在最高 8B 参数规模的模型上进行实验验证，实证支持理论预测：奖励方差与训练奖励提升速率的 Spearman 相关系数达 1.000，Pearson 相关系数达 0.982 [REF: Table 2]

## 主要 Claim

- 奖励方差与训练奖励提升的 Pearson/Spearman 相关系数分别为 0.982/1.000，与真实奖励提升的 Pearson 为 0.834；而准确率单独与真实奖励提升的 Pearson 仅为 -0.283，无正相关性 [REF: Table 2]
- 在策略样本上准确率为 100% 但奖励方差极低（0.111）的奖励模型，其引导的真实奖励提升显著慢于方差为 0.630 的 100% on-policy 奖励模型 [REF: Table 1, Figure 2]
- 在某些情形下，使用代理奖励模型比直接用真实奖励优化效果更好，至少在前几个 epoch 内如此（真实奖励的奖励方差仅为 0.256）[REF: Figure 2]
- 奖励方差与准确率是相互独立的维度，同时考量二者（Reward Variance & Acc.）对真实奖励提升的 Pearson 相关系数为 0.940，优于单独使用任一指标 [REF: Table 2]
- 不同初始策略（Pythia-1B SFT、Llama-3.2-1B SFT、Llama-3.2-1B Instruct）的最优奖励模型不同，GRM-Llama-3.2-3B（RewardBench 90.9）并非对所有策略都最优 [REF: Figure 3]
- 准确率高的奖励模型通常更具 KL 效率：在相同真实奖励值处，其策略与初始策略的 KL 散度更低 [REF: §4.1.2]

## 方法 / 数据集规模

- 理论框架：分析一般自回归策略（Equation 2）和表格策略（Equation 3）下的梯度流，推导奖励最大化率的下界 [REF: §3.1, §3.2]
- 实验初始策略：Pythia-2.8B、Pythia-1B、Llama-3.2-1B SFT 版与 Instruct 版，最大 8B 参数规模 [REF: §4]
- 数据集：AlpacaFarm（用于 SFT），UltraFeedback（奖励模型训练与策略梯度步骤，80/20 划分）[REF: §4.1.1]
- 实验奖励模型：自训练 5 个不同 on-policy 比例（0%–100%）的奖励模型 + 完全准确低方差模型；公开模型 GRM-Llama-3.2-3B（RewardBench 90.9）、GRM-Gemma-2-2B（88.4）、RM-Tulu-V2-8B（74.5）、RM-Gemma-2B（65.4）[REF: §4.1.1, §4.2.1]
- 真实奖励代理：ArmoRM 模型充当实验中的 ground truth reward [REF: §4.1.1]
- 策略梯度算法：RLOO（每个 prompt 采样 10 条输出，训练 6 个 epoch）[REF: §4.1.1]

## 主要实验结果

- 100% on-policy 奖励方差 0.630 的奖励模型，6 个 epoch 后真实奖励提升约 0.15–0.20；奖励方差仅 0.111 的完全准确奖励模型提升趋近于 0 [REF: Figure 2]
- 在多初始策略实验中，最优奖励模型因策略而异；RM-Gemma-2B 奖励方差最高但准确率最低（65.4），代理奖励提升最大，但未转化为最高真实奖励提升 [REF: Figure 3, Table 10]
- 该论文已被 NeurIPS 2025 接受 [REF: §1 注脚]

## 局限性

- 部分理论结果（Theorem 2、3）在表格策略（tabular policy）假设下证明，对大型语言模型的精确适用性需进一步研究 [REF: §3.1]
- 实验使用高质量奖励模型（ArmoRM）模拟人类偏好，与真实人类标注场景有差距 [REF: §4.1.1]
- 奖励方差本身受奖励归一化方式影响，不同归一化方案可能影响可比性 [REF: §2.3]
- 分析主要针对 online policy gradient 场景；在 Best-of-N 等其他对齐方法中准确率的角色有所不同（Best-of-N 下完全准确模型始终最优）[REF: §3.3]

## 相关页面

- [[rlhf|RLHF]]
- [[process-reward-model|reward-model]]
- [[reward-hacking]]
- [[RLHF|policy-gradient]]
- [[process-reward-model|RewardBench]]
