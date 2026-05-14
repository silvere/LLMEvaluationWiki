---
title: "测试时计算（Test-Time Compute）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 测试时计算（Test-Time Compute）

> 在模型推理/测试阶段投入额外计算资源以提升性能的方法总称，与训练时计算扩展相对。

## 定义

测试时计算（Test-Time Compute，TTC）是指在模型推理阶段通过增加计算量来改善输出质量的技术集合。这一概念与[[inference-time-scaling]]（推理时扩展）高度重叠，强调的是"计算投入"这一视角。

核心思想：给定固定的模型权重，仍可通过在推理时投入更多计算（采样更多、搜索更广、思考更深）来逼近或超越更大参数量模型的性能。

## 重要性（在 LLM 评测中）

测试时计算的兴起改变了LLM评测的基本假设：

- **计算等价性问题**：相同模型在不同TTC下表现差异显著，"公平比较"需要控制推理计算量
- **成本-性能Pareto前沿**：TTC扩展提供了一个新的优化维度，性能不再单纯由参数量决定
- **"思考模型"的评测挑战**：OpenAI o1、DeepSeek-R1等"reasoning model"大量使用TTC，其评测需特殊处理（如报告thinking tokens数量）
- **基准失效风险**：若基准题目较简单，无限TTC可让任何模型达到近满分，降低区分度

## 主要方法/实现

- **Best-of-N采样**：生成N个答案，用验证器选最优，是最简单的TTC方法
- **自一致性（Self-Consistency）**：多次生成+多数投票，适用于有明确答案的任务
- **思维链扩展（Extended CoT）**：允许更长的推理链，o1/R1系列核心方法
- **束搜索（Beam Search）**：保留多个部分生成路径并延伸
- **蒙特卡洛树搜索（MCTS）**：探索推理树，用rollout估计节点价值

## 局限与挑战

- **评测标准混乱**：不同论文报告TTC配置不一，难以跨文献比较
- **成本爆炸**：高TTC场景下推理成本可达标准推理的数十到数百倍
- **任务适用性**：TTC对有明确正确答案的任务（数学/代码）效果显著，对开放性生成任务提升有限
- **验证器依赖**：高效TTC搜索需要可靠的过程或结果验证器

## 相关页面

- [[inference-time-scaling]]
- [[process-reward-model]]
- [[self-consistency]]
- [[scaling-laws]]
- [[emergent-capabilities]]
