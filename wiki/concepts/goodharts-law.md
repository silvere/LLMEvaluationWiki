---
title: "Goodhart's Law 与评测"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
---

# Goodhart's Law 与评测

> 当一个指标成为优化目标，它就不再是好指标——这一规律在 LLM 评测中反复应验。

## 定义

Goodhart 定律由英国经济学家 Charles Goodhart 提出，原始表述针对货币政策，广泛引用版本为："当一个衡量标准成为目标，它就不再是一个好的衡量标准。"在 LLM 评测领域，这意味着：一旦某个 benchmark 被广泛用于比较和排名，模型开发者就会（有意或无意地）针对该 benchmark 优化，导致分数上升但真实能力未必提升，benchmark 的区分效度随之下降。

## 重要性（在 LLM 评测中）

这是 LLM 评测领域的核心系统性问题，影响整个评测生态的可信度。Andrej Karpathy 在 2025 年 3 月直言："存在评测危机。我真的不知道现在该看哪些指标。"

量化证据：
- Chatbot Arena 排行榜第 1 和第 10 名的 Elo 差距从 2023 年的 11.9% 缩小到 2025 年的 5.4%，顶部模型的排名区分度显著下降。
- 数据污染造成的分数虚高（GSM8K +22.9%，MMLU +19.0%）是 Goodhart 定律的直接体现。
- 主流 benchmark（如 MMLU）在业界大量使用后，区分最强模型的能力迅速减弱，顶部分数趋于饱和。

## 主要表现形式

- **benchmark 污染**：训练数据中包含评测题目，分数虚高（见 [[benchmark-contamination]]）。
- **格式优化**：模型针对评测格式（选择题、固定模板）调参，而非提升通用能力。
- **LLM-as-Judge 投机**：针对裁判模型的偏好（冗长偏差、风格偏好）优化输出，而非真正提升质量。
- **Arena 刷票**：针对 Chatbot Arena 的投票系统优化模型风格，吸引特定用户群偏好。

## 应对策略

- **动态 benchmark**：LiveBench 每月更新题目，减少针对性优化的时间窗口。
- **私有评测集**：政府和研究机构（如 UK AISI）持有不公开的测试集。
- **多维度综合评测**：HELM 等框架强调多维度评测，避免单一指标被过度优化。
- **评测多元化**：同时关注多个独立来源的评测结果，而非仅看单一榜单。

## 相关页面

- [[benchmark-contamination]] — Goodhart 定律最直接的体现
- [[LiveBench]] — 针对该问题的动态评测方案
- [[elo-rating]] — Arena 排名区分度下降的数据来源
