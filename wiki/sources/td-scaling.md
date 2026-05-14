---
title: "Beyond Quantity: Trajectory Diversity Scaling for Code Agents"
type: source
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
source_type: paper
url: "https://arxiv.org/abs/2602.03219"
ingested: "2026-05-14"
sources:
  - "https://arxiv.org/abs/2602.03219"
year: 2026
authors:
  - "Guhong Chen"
  - "Chenghao Sun"
  - "Cheng Fu"
  - "Qiyao Wang"
discusses:
  - "[[agent-eval]]"
  - "[[tool-use-eval]]"
  - "[[scaling-laws]]"
  - "[[benchmark-design]]"
---

# Beyond Quantity: Trajectory Diversity Scaling for Code Agents

> 提出 TDScaling 框架：通过轨迹多样性扩展（而非数量扩展）训练 Code Agent，以更少数据达到更高性能上限。

## 核心贡献

- 证明**轨迹多样性扩展（Diversity Scaling）比数量扩展（Quantity Scaling）具有更高的性能上限**，并在多个基准测试上实验验证 [REF: §4.3]
- 提出 **Business Cluster 采样机制**，将 MCP 生态组织为语义集群，将工具覆盖范围最大化为最大覆盖问题（Maximum Coverage Problem），避免冗余 API 的随机采样 [REF: §3.1]
- 设计**蓝图驱动的多智能体合成范式**（Blueprint-then-Execute），通过预先生成逻辑拓扑来锚定轨迹结构，降低幻觉风险 [REF: §3.2]
- 引入**领域熵（Domain Entropy）、推理模式熵（Reasoning Mode Entropy）和累计动作复杂度（CAC）**三维度量化驱动自适应演化，防止模式坍缩 [REF: §3.4]

## 主要 Claim

- 在相同数据预算（5,000 样本）下，TDScaling 让 Qwen3-Coder-30B-A3B 在 BFCL Multi-turn 达到 40.44%，超越数量扩展基线方法（APIGen-MT: 27.25%，TOUCAN: 37.03%，Simia: 23.22%） [REF: Table 1]
- 仅用 **500 个样本**，TDScaling 使 Qwen3-Coder-30B-A3B 在 BFCL Multi-turn 达到 36.66%，超过参数量大得多的 Qwen3-Coder-480B-A35B-Instruct（35.91%） [REF: Table 1]
- 多个对比基线表现出**逆向扩展（Inverse Scaling）**——增加更多同质数据反而导致性能下降；TDScaling 保持正向扩展 [REF: Figure 4]
- TDScaling 是唯一在所有编程 Agent 指标上取得综合正提升的方法（Overall +4.00%），而 APIGen-MT、TOUCAN、Simia 均出现不同程度的**负迁移（Negative Transfer）** [REF: Table 2]
- 与基线相比，TDScaling 数据集实现更高的推理模式熵（Hmode: 8.97 vs. 5.42）和领域熵（Hdom: 4.25 vs. 2.15） [REF: Figure 3]
- 沙盒化 Code Tool 作为正则化器，消融实验显示去掉后 BIRD 从 43.83% 下降至 41.58% [REF: Table 3]

## 方法 / 数据集规模

- 原始工具定义池：**30,000 条 MCP 合规工具定义** [REF: §4.1]
- 经贪心采样后选出 **6,944 个高质量 Business Cluster**，保留真实世界逻辑依赖 [REF: §4.1]
- 使用 **Qwen3-Max** 作为教师模型合成复杂工具使用轨迹 [REF: §4.1]
- 主干模型：**Qwen3-Coder-30B-A3B-Instruct** 和 Qwen3-30B-A3B-Instruct；使用 Megatron-LM BF16 精度训练 [REF: §4.1]
- 评测规模：双维度——通用工具使用（BFCL Augmented Multi-Turn、τ²-Bench）+ 编程 Agent 任务（RebenchT、CodeCI、BIRD） [REF: §4.1]

## 主要实验结果

| 模型 / 方法 | BFCL (Multi-turn) | TAU (Avg) | Average |
|---|---|---|---|
| GPT-5 | 43.75% | — | 68.69% |
| Claude-Sonnet-4 | 54.75% | — | 55.91% |
| Qwen3-Coder-480B-A35B-Instruct | 35.91% | — | 51.85% |
| APIGen-MT (5k) | 27.25% | — | 42.81% |
| TDScaling (500 样本) | 36.66% | — | 48.99% |
| TDScaling (5,000 样本) | **40.44%** | — | **52.47%** |

[REF: Table 1]

编程 Agent 任务（Coding & Agent Benchmarks）：TDScaling Overall = **34.99%**（+4.00% vs. 基线 30.99%）[REF: Table 2]

## 局限性

- 拟公开发布框架和数据集，但需受许可证、隐私及内部政策约束，部分组件可能无法完全公开 [REF: Abstract 脚注]
- 通用非代码任务（对话、推理等）上的多样性扩展迁移性未在本文验证
- Business Cluster 采样和蓝图合成依赖大型教师模型（Qwen3-Max），计算成本较高

## 相关页面

- [[agent-eval]]
- [[tool-use-eval]]
- [[scaling-laws]]
- [[benchmark-design]]
- [[inference-time-scaling]]
