---
title: "AgentEvolver: Towards Efficient Self-Evolving Agent System"
type: source
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
source_type: paper
url: "https://arxiv.org/abs/2511.10395"
ingested: "2026-05-14"
sources:
  - "https://arxiv.org/abs/2511.10395"
year: 2025
authors:
  - "Yunpeng Zhai"
  - "Shuchang Tao"
  - "Cheng Chen"
  - "Zhaoyang Liu"
discusses:
  - "[[agent-eval]]"
  - "[[RLHF|reinforcement-learning-from-llm]]"
  - "[[agent-eval|self-improvement]]"
  - "[[agent-eval|appworld]]"
---

# AgentEvolver: Towards Efficient Self-Evolving Agent System

> 提出三机制自进化 Agent 框架，通过自问询、自导航、自归因使 LLM Agent 无需人工构建训练数据即可在工具调用环境中持续高效自我提升。

## 核心贡献

- 提出 AgentEvolver，一个以 LLM 语义理解与推理能力驱动自主 Agent 学习的自进化系统，系统性解决 RL 驱动 Agent 开发的三大瓶颈：训练数据构建成本高、探索效率低、样本利用率差。[REF: Abstract, §1]
- 提出**自问询（Self-Questioning）**机制：通过好奇心驱动的环境探索自动生成训练任务（含参考解）并按用户偏好过滤，替代人工构建任务数据集；实验显示仅 100 条合成样本即可使 7B 模型在 AppWorld 上 avg@8 从 1.8% 提升至 23.2%。[REF: §3, §7.3]
- 提出**自导航（Self-Navigating）**机制：通过经验复用（experience reuse）、混合策略滚出（experience-mixed rollout）和选择性增强（selective boosting）改善探索效率，在自问询基础上 avg@8 进一步提升至 26.3%（7B）和 45.4%（14B）。[REF: §4, Table 1]
- 提出**自归因（Self-Attributing）**机制：利用 LLM 对轨迹中每个步骤贡献进行事后二元归因（GOOD/BAD），构建密集过程奖励信号，与稀疏结果奖励融合，实现更精细的样本效率优化。[REF: §5, Table 1]

## 主要 Claim

- AgentEvolver（7B 整体）在 AppWorld 上 avg@8 为 32.4%（基线 Qwen2.5-7B 仅 1.8%），best@8 为 51.2%（基线 5.6%），绝对提升分别为 +30.6% 和 +45.6%。[REF: Table 1]
- AgentEvolver（14B 整体）在 AppWorld 上 avg@8 为 48.7%（基线 18.0%），best@8 为 69.4%（基线 31.4%）。[REF: Table 1]
- 三个机制互为补充、相互增益：自问询贡献最大的初始提升，自导航提升探索效率，自归因提升样本效率，三者合力优于任意子集。[REF: §7.2]
- 合成数据（ptrain）与人工标注原始数据（ptarget）在 AppWorld 上性能接近（7B avg@8: 23.2% vs 16.1%），混合数据（phybrid）则完全超越纯原始数据（43.6% vs 37.5%）。[REF: Table 2]
- 自问询模块具有较高的数据合成效率：100 条样本即达到较高性能，扩大至 200/500 条时持续改善，增益逐渐递减。[REF: §7.3.2]
- 14B AgentEvolver 在 AppWorld 与 BFCL v3 两项基准上综合 avg@8 为 57.6%，优于参数量更大的 Qwen3-32B（未配备 AgentEvolver）。[REF: Figure 1, Table 1]

## 方法 / 数据集规模

- 主干模型：Qwen2.5-7B-Instruct 和 Qwen2.5-14B-Instruct。[REF: §7.1.2]
- 基线：Vanilla GRPO（仅使用稀疏终端奖励，无 AgentEvolver 机制）。[REF: §7.1.2]
- 训练配置：学习率 1×10⁻⁶，batch size 32，每次策略更新 40 epoch，KL 惩罚系数 0.001；8 张 NVIDIA A100（80GB）GPU。[REF: §7.1.3]
- 评测基准：AppWorld（多步 API 调用，报告 Task Goal Completion / TGC）和 BFCL v3 多轮子集（状态检查 + 响应检查双重验证）；轨迹最大截断 30 步。[REF: §7.1.1]
- 评测协议：avg@8（8 次独立滚出的平均 TGC）和 best@8（8 次中最优 TGC）。[REF: §7.1.1]
- 探索 Agent 使用 Qwen-Plus（高温采样），任务合成使用 Qwen-Plus，LLM Judge 使用 Qwen3-235B-A22B，归因 Judge 使用 Qwen-Max。[REF: §7.1.3]
- AppWorld 探索步数：广度探索 Nb=3，深度探索 Nd=17；BFCL 对应 Nb=3，Nd=27。[REF: §7.1.3]

## 主要实验结果

**AppWorld + BFCL v3 综合结果（avg@8 / best@8，%）**

| 模型 | AppWorld avg@8 | AppWorld best@8 | BFCL avg@8 | BFCL best@8 | 整体 avg@8 |
|------|---------------|----------------|------------|-------------|-----------|
| Qwen2.5-7B（零样本） | 1.8 | 5.6 | 29.8 | 42.4 | 15.8 |
| +Questioning | 23.2 | 40.3 | 49.0 | 60.6 | 36.1 |
| +Questioning&Navigating | 26.3 | 43.1 | 53.3 | 61.0 | 39.8 |
| +Questioning&Attributing | 25.7 | 43.7 | 56.8 | 65.3 | 41.3 |
| **AgentEvolver-7B** | **32.4** | **51.2** | **57.9** | **69.0** | **45.2** |
| Qwen2.5-14B（零样本） | 18.0 | 31.4 | 41.6 | 54.1 | 29.8 |
| **AgentEvolver-14B** | **48.7** | **69.4** | **66.5** | **76.7** | **57.6** |

[REF: Table 1]

## 局限性

- 当前实验以 Qwen2.5-7B/14B 为基础，在其他架构（如 LLaMA、Mistral）上的泛化性尚未验证。
- 自进化系统对探索 Agent（Qwen-Plus）和 LLM Judge（Qwen3-235B-A22B、Qwen-Max）的质量有较强依赖，推理成本较高。
- 目标漂移（goal drift）风险：Agent 可能优化代理指标而非真实任务目标，论文中尚未系统讨论安全性与可控性机制。
- 自归因依赖 LLM 的推理能力进行步骤贡献评估，在超出 LLM 知识边界的高度专业化任务上可靠性存疑。
- 实验规模（8 个 A100 GPU）相对有限，更大规模下的扩展行为有待探索。

## 相关页面

- [[agent-eval]]
- [[RLHF|reinforcement-learning-from-llm]]
- [[agent-eval|self-improvement]]
- [[agent-eval|appworld]]
