---
title: "METR（Model Evaluation and Threat Research）"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# METR（Model Evaluation and Threat Research）

> 美国非营利机构，专注于评测 AI 模型的自主性能力和潜在危险性，为前沿模型的第三方安全评估提供方法论和实施。

## 基本信息

- **性质**：非营利 AI 安全评测机构
- **成立时间**：2023 年（前身为 ARC Evals，隶属于 Alignment Research Center）
- **总部**：美国加利福尼亚州
- **负责人**：Beth Barnes
- **规模**：数十人

## 主要贡献（评测相关）

METR 的核心专长是对 AI 模型的"危险能力"进行独立第三方评测，这是一个与传统 NLP 基准评测性质不同的评测方向。

**自主性任务评测**：METR 开发了评测 LLM 自主执行任务能力（如自主计算机操作、长期任务规划、自我复制等）的评测框架，这些能力被认为与 AI 安全风险直接相关。

**TASK Suite / METR Evals**：METR 构建了专用于测试模型自主能力的任务集合，涵盖"能否自主完成软件工程项目"、"能否自主获取资源"等任务。

**第三方评测服务**：METR 为 Anthropic、OpenAI 等前沿模型实验室提供独立的危险能力评测，并参与制定相关实验室的 Responsible Scaling Policy（RSP）中的评测标准和触发阈值。

**SWE-bench 相关**：METR 的研究与 SWE-bench 等现实软件工程任务评测高度关联，SWE-bench 测试模型在真实 GitHub 问题上的修复能力。

**政策影响**：METR 的评测框架被 UK AISI、美国政府 AI 安全报告等政策文件引用，成为 AI 能力评测政策化的重要推动力。

## 代表性工作

- **METR Task Standard**：危险任务评测标准框架
- **Autonomy Evaluation**：模型自主性能力评测方法
- **第三方红队评测（Frontier Model Evals）**

## 对评测生态的影响

METR 将评测从"模型能做什么好事"扩展到"模型会带来什么风险"，推动了 AI 危险能力评测这一新评测类别的形成。其第三方独立评测模式为其他 AI 安全机构提供了组织形态参照，也是 Anthropic、OpenAI 等机构 RSP 政策中明确指定的评测合作方。

## 相关页面

- [[AI安全评测]]
- [[UK-AISI]]
- [[Anthropic]]
- [[SWE-bench]]
- [[危险能力评测]]
