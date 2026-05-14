---
title: "Scale SEAL Leaderboard"
type: leaderboard
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Scale SEAL Leaderboard

## 概述

Scale SEAL（Safety, Evaluations and Alignment Labs）Leaderboard 由 Scale AI 旗下的安全评测团队维护，专注于评测大语言模型在**安全能力和对齐质量**方面的综合表现。该排行榜的核心特点是通过**隐私红队测试**（private red-teaming）来评估模型的安全性，而非公开的标准化测试集。

## 评测方法

Scale SEAL 的评测方式与大多数公开排行榜有本质区别：

**隐私评测集**：测试用例不公开，旨在防止模型针对性训练（即防止"刷榜"），确保评测结果反映模型的真实安全能力。

**红队测试维度**：
- 越狱抵抗（Jailbreak Resistance）：对各类提示注入和越狱攻击的防御能力
- 有害内容拒绝（Harmful Content Refusal）：对生成危害内容请求的拒绝准确性
- 指令跟随安全性：在执行合理指令的同时拒绝不合理请求的平衡能力
- 幻觉检测：生成内容的事实准确性

**专家团队**：评测由经过专业训练的人类红队专家执行，而非纯自动化工具。

## 排行榜特点

**优势**：
- 隐私评测集防止针对性优化，评测结果更可信
- 专业红队测试覆盖真实攻击场景
- Scale AI 具有丰富的数据标注和人类评测经验
- 定期更新，跟踪新模型的安全能力变化

**局限性**：
- 评测过程不透明，外部机构难以复现或验证
- 隐私性导致社区无法批评或改进评测设计
- Scale AI 是商业公司，存在利益冲突的潜在担忧
- 覆盖模型数量相对有限

## 在安全评测生态中的位置

Scale SEAL 与 AI Safety Institute（AISI）的评测、Anthropic 内部红队评测等形成"专业封闭评测"阵营，与 TrustLLM、SafetyBench 等开放基准形成对照。封闭评测的核心价值在于防止"安全刷分"，但开放性不足是其长期面临的批评。

## 访问方式

- 官方页面：[scale.com/leaderboard](https://scale.com/leaderboard)
- SEAL 安全排行榜：[scale.com/research/seal](https://scale.com/research/seal)
