---
title: "Meta AI"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Meta AI

> Meta 的 AI 研究部门，包含 FAIR（Fundamental AI Research），LLaMA 系列开源模型和 PyTorch 框架的主要开发者。

## 基本信息

- **性质**：Meta Platforms 旗下 AI 研究与产品部门
- **成立时间**：FAIR 成立于 2013 年；Meta AI 品牌整合于近年
- **总部**：美国门洛帕克
- **FAIR 负责人**：Yann LeCun（Chief AI Scientist）

## 主要贡献（评测相关）

Meta AI 在开源 LLM 评测生态中具有基础性地位。

**LLaMA 系列**：LLaMA（2023）、LLaMA 2（2023）、LLaMA 3（2024）等开源模型的发布，使研究社区能够在可控条件下对模型进行全面评测，包括微调实验、基准测试和对比研究，极大降低了学术评测的门槛。

**评测基准**：Meta 研究团队参与或主导了多个评测工作，包括 DynaBench（动态数据集评测平台）的早期开发，以及 MultiHop-RAG 等检索增强评测数据集的构建。

**OPT 评测报告**：OPT（2022）的发布附带了详细的评测日志和训练细节，是罕见的高透明度模型评测案例，成为开放评测文化的参照。

**PyTorch 生态**：作为 PyTorch 的主要维护方，Meta 为整个评测工具链的运行提供了基础框架。

## 代表性模型/产品

- **LLaMA 1 / 2 / 3 / 3.1**：开源大语言模型系列
- **OPT**：开源预训练语言模型（附完整评测日志）
- **Llama Guard**：内容安全评测专项模型
- **DynaBench**：动态数据集评测平台（与学术界合作）

## 对评测生态的影响

LLaMA 系列的开源化策略将评测研究的可及性提升到新层次。在此之前，大多数前沿模型仅通过 API 提供，研究者无法检查权重或进行深度评测。LLaMA 的开放使得越狱测试、权重解析、微调效果评测等研究大量涌现，丰富了评测方法论。

## 相关页面

- [[LLaMA]]
- [[Open-LLM-Leaderboard]]
- [[Hugging-Face]]
- [[DynaBench]]
