---
title: "Mistral AI"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Mistral AI

> 法国 AI 公司，以高效率开源模型著称，由前 DeepMind 和 Meta 研究员于 2023 年创立。

## 基本信息

- **性质**：营利性 AI 公司
- **成立时间**：2023 年 4 月
- **总部**：法国巴黎
- **联合创始人**：Arthur Mensch、Guillaume Lample、Timothée Lacroix
- **规模**：百人级别

## 主要贡献（评测相关）

Mistral AI 的核心贡献在于证明了在较小参数量下可以达到或超越更大模型的评测基准得分，推动了"参数效率"这一维度在 LLM 评测中的重要性。

**Mistral 7B**（2023）在发布时于多个基准（MMLU、HellaSwag、ARC 等）上超越同规模甚至更大规模的开源模型，引发了对"模型大小 vs. 评测分数"关系的重新审视。其采用的滑动窗口注意力（SWA）和分组查询注意力（GQA）在推理效率上的优势，也为评测中的"成本-效能"权衡提供了新数据点。

**Mixtral 8x7B**（2023）作为混合专家（MoE）架构的开源实现，在 MT-Bench 和 MMLU 等基准上与 LLaMA 2 70B 及 GPT-3.5 比肩，成为 MoE 架构评测的重要参照。

Mistral 模型的完全开源（Apache 2.0 许可）策略，使研究者可以进行无限制的评测和复现实验。

## 代表性模型/产品

- **Mistral 7B**：高效小型开源基础模型
- **Mixtral 8x7B / 8x22B**：混合专家架构开源模型
- **Mistral Large / Medium / Small**：商业闭源模型系列
- **Codestral**：代码生成专项模型

## 对评测生态的影响

Mistral 的模型系列刷新了小参数量模型的评测上限预期，使"以小博大"成为评测领域的持续研究方向。其对完全开源（公开权重+代码）的坚持，也在开源社区中形成了与半开放模型的对比参照。

## 相关页面

- 
- [[Open-LLM-Leaderboard]]
- 
- [[MT-Bench]]
