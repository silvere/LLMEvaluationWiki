---
title: "模型卡（Model Card）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 模型卡（Model Card）

> 随模型发布的标准化文档，描述模型的用途、性能、局限和伦理考量，由 Mitchell et al. 2019年提出。

## 定义

模型卡（Model Card）是一种随机器学习模型发布的简短文档，旨在标准化地报告模型的：
- **预期用途**：适合哪些任务和人群
- **训练数据**：数据来源、规模、时间范围
- **评测结果**：在各基准上的性能，按人群/场景分组
- **局限性**：已知的性能下降场景、偏见和风险
- **伦理考量**：公平性评估、潜在危害

模型卡概念由 Mitchell et al.（2019）在论文"Model Cards for Model Reporting"中提出，已成为负责任AI发布的行业实践之一。

## 重要性（在 LLM 评测中）

模型卡对LLM评测生态的影响：

1. **标准化评测报告**：促使各机构采用统一格式报告评测结果，便于横向比较
2. **透明度要求**：主流AI公司（Anthropic、Google、Meta等）在发布模型时均提供模型卡
3. **分组公平性评测**：模型卡要求报告不同人群子群体的性能差异，推动了公平性评测的发展
4. **文档化评测条件**：明确记录评测时使用的prompt格式、shot数、评测时间，提高可复现性

## 主要方法/实现

- **Hugging Face Model Card标准**：Hugging Face平台推广了结构化模型卡格式，现有数十万模型卡
- **Google Model Card Toolkit**：提供自动生成模型卡的工具
- **Anthropic模型卡**：Claude系列每次发布均附带详细模型卡，包含安全评测结果
- **Meta LLaMA模型卡**：开源模型卡的代表，记录了详细的预训练数据和评测条件

## 局限与挑战

- **标准不统一**：不同机构的模型卡格式和详细程度差异很大
- **自我报告偏差**：模型卡由开发者自己撰写，存在选择性报告的风险
- **更新滞后**：模型更新后模型卡往往未同步更新
- **关键信息缺失**：训练数据细节、强化学习配置等常以"商业敏感"为由省略

## 相关页面

- [[Margaret-Mitchell]]
- [[benchmark-design]]
- [[human-eval-protocol]]
- 
- [[capability-vs-alignment]]
