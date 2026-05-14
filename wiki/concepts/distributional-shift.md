---
title: "分布偏移（Distributional Shift）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources:
  - "Quinonero-Candela, J., et al. (2009). Dataset Shift in Machine Learning. MIT Press."
  - "Koh, P.W., et al. (2021). WILDS: A Benchmark of in-the-Wild Distribution Shifts. ICML 2021."
---

# 分布偏移（Distributional Shift）

## 定义

**分布偏移（Distributional Shift / Distribution Shift）**是指机器学习模型训练时所使用数据的概率分布，与该模型在实际部署或评测时所遇到数据的概率分布之间存在差异的现象。分布偏移是导致模型在测试/部署环境中性能下降的主要原因之一。

## 主要类型

### 协变量偏移（Covariate Shift）
输入特征的分布发生变化（$P_{train}(X) \neq P_{test}(X)$），但给定输入的条件标签分布不变（$P(Y|X)$ 相同）。

**NLP 示例**：情感分析模型在电影评论上训练，在产品评论上测试——词汇分布不同，但"正面/负面"的含义相同。

### 标签偏移（Label Shift / Prior Shift）
标签的边际分布发生变化（$P_{train}(Y) \neq P_{test}(Y)$）。

**NLP 示例**：训练集中正负样本各 50%，测试集中正样本占 80%，导致基于先验的预测策略失效。

### 概念漂移（Concept Drift）
给定输入的条件标签分布发生变化（$P_{train}(Y|X) \neq P_{test}(Y|X)$），通常因时间推移或语境变化而产生。

**NLP 示例**："云计算"在 2008 年和 2023 年的语义已大相径庭，在旧数据上训练的模型对该词的理解可能不符合现在的用法。

## 在 LLM 评测中的体现

### 领域偏移
LLM 在通用互联网文本上预训练，但评测基准（如医疗、法律领域专业题）覆盖的语域与训练分布差异较大，可能导致性能被低估（不公平的困难）或被高估（若评测数据恰好与预训练重叠）。

### 时间偏移
模型的训练数据有截止日期，而评测集可能包含截止日期后的事件和知识，形成时间维度的分布偏移。LiveBench 等动态基准专门利用这一点来减少数据污染。

### 格式偏移
模型在特定提示格式和输出格式上经过微调，换用不同评测框架（如不同的 few-shot 示例格式、不同的任务描述方式）会引入格式层面的分布偏移。

## 评测中的处理方式

- **分布外评测集**（OOD sets）：WILDS 等基准专门构造了分布偏移场景
- **领域适应基准**：包含多领域数据，报告各领域分数而非统一平均分
- **时间戳分析**：报告按数据时间划分的性能，量化时间偏移的影响
- **鲁棒性基准**：通过最小扰动测试（如添加噪声、改变格式）评测模型对轻微分布偏移的敏感度

## 与捷径学习的关系

分布偏移和捷径学习密切相关：捷径学习的危害只有在**分布偏移发生时**才会充分暴露——在与训练集同分布的测试集上，基于捷径的预测可能仍然正确；只有当分布偏移导致捷径不再有效时，模型的能力短板才会被揭露。

## 相关概念

- [[out-of-distribution-generalization]]：在分布偏移下仍保持良好性能的能力
- [[shortcut-learning]]：利用训练分布特有捷径的学习行为
- [[benchmark-contamination]]：训练-测试分布重叠的特殊形式
