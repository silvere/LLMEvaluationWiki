---
title: "EntityQuestions"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [knowledge]
language: en
year: 2021
authors: ["Christopher Sciavolino", "Zexuan Zhong", "Jinhyuk Lee", "Danqi Chen"]
arxiv_id: "2109.08535"
official_url: "https://github.com/princeton-nlp/EntityQuestions"
license: "MIT"
size: 22779
format: open-ended
status: active
saturation_threshold: 0.85
sources:
  - "Sciavolino, C., et al. (2021). Simple Entity-Centric Questions Challenge Dense Retrievers. EMNLP 2021."
---

# EntityQuestions

## 概述

EntityQuestions 是由 Princeton NLP 于 2021 年发布的实体中心问答基准，专门用于测试语言模型和检索系统对**长尾实体（tail entity）**相关事实知识的掌握程度。该数据集揭示了密集检索（Dense Retrieval）系统在处理罕见实体时的系统性弱点。

## 动机与背景

大量开放域 QA 研究主要在 NaturalQuestions、TriviaQA 等通用数据集上进行，这些数据集中的问题倾向于涉及知名实体（如主要国家、著名人物），因此无法充分测试模型对长尾知识的处理能力。EntityQuestions 通过聚焦实体相关的简单事实问题（如"X 的 Y 是什么？"）来弥补这一空白。

## 数据构成

EntityQuestions 基于 Wikidata 关系三元组自动生成，覆盖 24 种常见关系类型（如出生地、国籍、职业、所属机构等），包含约 22,779 道测试问题：

| 子集类型 | 描述 |
|---------|------|
| 频繁实体 | 在维基百科中出现频率高的实体相关问题 |
| 罕见实体 | 在维基百科中出现频率低的实体相关问题 |

两个子集的问题结构相同，仅实体的知名度不同，从而可以直接量化模型在常见/罕见实体间的性能差异。

## 核心发现

该数据集揭示了以下重要现象：

1. **密集检索的长尾问题**：DPR（Dense Passage Retrieval）等密集检索器在罕见实体上的性能显著低于稀疏检索（BM25），而在常见实体上二者差距较小。这表明密集检索器对训练集中高频实体存在过拟合倾向。

2. **参数化知识的分布偏差**：直接以语言模型作为知识库（如 T5-QA 等）在长尾实体上的性能退化更为严重，揭示了参数化知识存储对数据分布的高度敏感性。

3. **混合检索的优势**：结合稀疏+密集检索的混合方案在长尾实体上表现更均衡。

## 评测指标

- **Exact Match（EM）**：与标准参考答案完全匹配率
- **Token F1**：词元级别的重叠度量

评测通常分别报告频繁实体和罕见实体上的指标，以分析分布差异。

## 重要意义

EntityQuestions 将**长尾知识评测**引入开放域 QA 研究，对评测实践有重要启示：

- 聚合指标（整体 EM/F1）可能掩盖模型在边缘案例上的严重失败
- 模型在主流基准上的高分不一定意味着对参数化知识的均匀掌握
- 基准构建需要考虑数据分布的代表性

## 局限性

- 问题结构简单（填空式），与真实用户查询存在差距
- 基于 Wikidata 模板生成，语言自然度有限
- 仅覆盖 Wikidata 中可表示的关系类型，存在知识图谱偏差

## 相关基准

- **LAMA**：测试语言模型参数化知识的填空基准
- **PopQA**：按实体流行度分层的开放域问答
- **TriviaQA**：包含大量实体事实的竞赛类问答
