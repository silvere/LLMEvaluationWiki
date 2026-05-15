---
title: "Gecko"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - knowledge
  - reasoning
year: 2024
arxiv_id: "2403.20327"
status: active
---

# Gecko

> Google 提出的文本嵌入模型综合评测基准，覆盖检索、语义相似度、分类等多任务嵌入能力。

## 概述

Gecko 是 Google 于 2024 年提出的文本嵌入（Text Embedding）综合评测基准与模型框架。作为基准，Gecko 整合了来自 BEIR、MTEB 等现有评测套件的核心任务，同时引入了新设计的任务，全面评测文本嵌入模型在**检索（Retrieval）**、**语义相似度（STS）**、**重排序（Reranking）**、**文本分类（Classification）**、**聚类（Clustering）**等多任务场景下的向量表示质量。

Gecko 的命名来自同名的嵌入模型家族（Gecko Embedding Models），这些模型通过大型语言模型蒸馏的创新训练范式——利用 LLM 为训练数据生成合成的高质量正负样本对（FRet 框架：Few-Shot Retrieval Training），从而在模型规模较小（768M 参数）的情况下达到与更大规模嵌入模型相当或更优的性能。

在 MTEB 英文排行榜上，Gecko 在发布时以相对小的模型规模实现了 SOTA 水平，引发了业界对嵌入模型训练方法论（而非单纯扩大模型规模）的重新重视。

## 任务格式

- **评测任务类型**：信息检索（BM25/dense）、语义文本相似度（STS）、重排序、文本分类、聚类
- **数据集整合**：BEIR 检索基准（18 个数据集）+ MTEB 其他任务（56 个数据集）
- **规模**：覆盖 56+ 个数据集的综合评测套件
- **评测设置**：Zero-shot 和 few-shot 两种设置
- **多语言**：主要英文，部分任务包含多语言版本

## 主要指标

- **NDCG@10**（检索任务主指标）：Normalized Discounted Cumulative Gain，衡量检索排序质量
- **Spearman Correlation**（STS 任务）：与人类相似度判断的等级相关系数
- **Accuracy/F1**（分类任务）
- **V-measure**（聚类任务）：聚类同质性与完整性的调和平均
- **MTEB Average Score**：跨所有任务的平均得分（综合排名指标）

## 局限性

- MTEB 任务集本身的偏向性（英文为主，以学术和新闻领域为主）影响评测的普遍性
- 嵌入模型评测与下游任务性能之间的相关性并非完美
- 高维向量表示的可解释性问题在评测层面无法体现

## 相关页面

- [[FRAMES]]
- FRAMES
- [[MTEB]]
