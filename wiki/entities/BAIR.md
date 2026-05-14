---
title: "BAIR（Berkeley AI Research）"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# BAIR（Berkeley AI Research）

BAIR（Berkeley Artificial Intelligence Research）是加州大学伯克利分校（UC Berkeley）的人工智能研究实验室，由来自计算机科学系、统计系等多个院系的教授联合组成。BAIR 以基础研究与工程实践并重著称，在强化学习、机器人学、计算机视觉和自然语言处理领域均有重要贡献。

## 对 LLM 评测生态的核心贡献

**Chatbot Arena / LMSYS**：BAIR 与 LMSYS 组织联合推出的 Chatbot Arena 是目前影响力最大的 LLM 对话质量众包评测平台。该平台采用匿名 A/B 对比模式，收集用户的相对偏好投票，并通过 Elo 评分系统生成动态排行榜。Chatbot Arena 的方法论将人类偏好信号引入 LLM 排名体系，是 RLHF 时代最具代表性的评测范式之一。

**vLLM**：BAIR 团队开发的 vLLM 是基于 PagedAttention 机制的高效 LLM 推理引擎，已成为学术界和工业界 LLM 服务的主流选择。vLLM 的广泛采用使得标准化推理效率评测成为可能。

**Vicuna**：BAIR、CMU 和 UCSD 联合开源的 Vicuna 是早期重要的指令微调开源模型，基于 LLaMA 训练，曾在 GPT-4 评测中取得较高相对得分，推动了开源模型评测研究的普及。

**RAFT / Gorilla**：BAIR 团队还参与了 API 调用能力评测研究，Gorilla 项目专门评测 LLM 选择和调用外部 API 的能力，是 Tool Use 评测领域的早期工作。

## 学术影响

BAIR 的研究人员包括 Ion Stoica、Pieter Abbeel、Dawn Song、Ken Goldberg 等知名教授。实验室维护活跃的博客（bair.berkeley.edu/blog），定期发布研究进展，在 LLM 评测方法论和开源工具链方面持续产出有影响力的成果。
