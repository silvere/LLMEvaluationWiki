---
title: "Wei-Lin Chiang（蔣維麟）"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Wei-Lin Chiang（蔣維麟）

> UC Berkeley 博士生（Ion Stoica 组），Chatbot Arena 和 LMSYS Org 核心开发者，FastChat 的主要作者之一。

## 基本信息

- **所属机构**：加州大学伯克利分校（UC Berkeley）计算机科学系
- **研究方向**：LLM 评测、LLM 系统、分布式机器学习
- **相关项目**：LMSYS Org、Chatbot Arena、FastChat、Vicuna

## 评测领域主要贡献

**Chatbot Arena（2023）**：Wei-Lin Chiang 是 Chatbot Arena 的核心开发者之一。Chatbot Arena 采用众包 Elo 评分机制，通过真实用户对两个匿名模型的比较投票，形成动态更新的 LLM 对话质量排行榜。其创新之处在于：使用真实用户的真实问题（而非预设评测集），采用统计严谨的 Elo/Bradley-Terry 模型计算分数，体现了人类偏好评测的规模化实现。

**FastChat**：作为主要开发者之一，FastChat 是支撑 Chatbot Arena 运行的开源服务框架，支持多模型部署和对比评测，被广泛用于研究环境中的模型部署和评测。

**Vicuna**：参与开发的 Vicuna 是基于 LLaMA 的开源指令微调模型，以 GPT-4 生成的对话数据微调而来，在 Chatbot Arena 中作为重要的开源基线模型，其 MT-Bench 和人类偏好评测结果推动了"如何评测微调模型质量"的讨论。

**LMSYS Org**：作为 LMSYS（Large Model Systems Organization）的核心成员，参与了 Chatbot Arena、MT-Bench、lm-sys 系列工作的组织和推动，推动了 UC Berkeley 系统研究与 LLM 评测的结合。

**统计方法论贡献**：Chatbot Arena 发表的论文详细讨论了 Elo 分数估计的统计特性、样本量需求和排名置信区间，为人类偏好评测的统计方法提供了重要参考。

## 代表性工作

- "Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference"（2023）
- FastChat 开源框架（主要开发者）
- Vicuna 开源模型
- LMSYS 系列评测研究

## 相关页面

- [[Chatbot-Arena]]
- [[LMSYS-Org]]
- 
- 
- [[MT-Bench]]
- [[Lianmin-Zheng]]
