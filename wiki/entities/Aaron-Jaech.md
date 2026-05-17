---
title: "Aaron Jaech"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources: []
aliases:
  - Aaron Jaech
domain:
  - entity
---

# Aaron Jaech

> OpenAI 研究员，o1 / o3 推理模型项目核心成员之一；推理模型评测方法论（reasoning-only evaluation, test-time compute scaling）的代表实践者。

## 基本信息

- **所属机构**：OpenAI（前 Microsoft Research）
- **研究方向**：Reasoning models / Test-time scaling / RL for reasoning
- **学历背景**：University of Washington 博士（NLP）

## 评测领域主要贡献

**o1 / o3 推理评测协议**：参与 OpenAI o1 / o3 模型的评测设计，包括「pass@1 with reasoning tokens」「best-of-N consensus」等推理模型专有指标的工程化；推动 [[AIME]]、[[GPQA]]、[[FrontierMath]] 等高难度评测在前沿模型评测语境下的地位上升。

**Test-Time Compute Scaling Laws**：在 OpenAI 内部博客及多个公开演讲中介绍「以推理 token 预算换取准确率」的 scaling law 形态；这是 2024-25 评测范式从「模型大小 vs 准确率」转向「计算 vs 准确率」的关键工程化推动。

**RL Training & Eval 协同**：将 RL 训练信号与 eval benchmark 的难度分布对齐，研究 reward hacking 等评测偏差在 reasoning 模型中的新表现。

## 代表性工作

- o1 / o1-preview / o1-mini 评测发布
- o3 / o3-mini 评测协议
- 测试时计算 scaling 系列演讲

## 相关页面

- [[OpenAI]]
- [[inference-time-scaling]]
- [[process-reward-model]]
- [[AIME]]
- [[FrontierMath]]
- [[GPQA]]
