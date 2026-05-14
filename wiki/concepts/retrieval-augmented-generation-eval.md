---
title: "RAG 评测（Retrieval-Augmented Generation Evaluation）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# RAG 评测（Retrieval-Augmented Generation Evaluation）

> 评测检索增强生成系统的独特方法体系，需同时评估检索质量和生成质量，以及两者的协同效果，面临不同于纯生成式评测的独特挑战。

## 定义

检索增强生成（RAG）系统由检索器（Retriever）和生成器（Generator）两部分组成，评测需覆盖三个层次：

1. **检索质量**：检索器能否找到与问题相关的文档片段
2. **生成质量**：生成器能否基于检索结果生成准确、有用的回答
3. **端到端质量**：整个 RAG 系统能否正确回答用户问题

**RAG 特有的评测场景**：
- 检索到错误信息时模型的行为（是否盲信还是识别矛盾）
- 检索到部分相关文档时的答案质量
- 多文档综合推理能力
- 无法检索到相关信息时是否正确拒答

## 重要性（在 LLM 评测中）

随着 RAG 成为工业界 LLM 应用的主流架构，RAG 评测的重要性急剧上升：

1. **与纯 LLM 评测不可互换**：RAG 系统失败可能来自检索失败或生成失败，标准基准无法定位问题
2. **知识边界的评测挑战**：RAG 专门用于扩展 LLM 的知识边界，评测需反映这一目标
3. **幻觉的来源分析**：RAG 中的幻觉可能是"凭空生成"（与纯 LLM 相同）或"忠实性幻觉"（无视检索结果），需区分
4. **实际部署质量信号**：RAG 评测结果比标准基准更接近实际企业部署的质量

## 主要方法/实现

**检索评测指标**：
- Recall@k：相关文档出现在前 k 个检索结果中的比例
- Mean Reciprocal Rank（MRR）：第一个相关结果的排名倒数均值
- NDCG@k：归一化折扣累积增益

**生成评测指标**（RAGAS 框架）：
- **Faithfulness**（忠实性）：回答与检索上下文的一致程度
- **Answer Relevance**（答案相关性）：回答与问题的相关程度
- **Context Precision**：检索到的上下文中相关内容的密度
- **Context Recall**：答案中的内容是否能从上下文中找到依据

**端到端评测数据集**：
- Natural Questions、TriviaQA（闭卷变开卷）
- MS-MARCO、HotpotQA（多跳 RAG 推理）
- RGB（Retrieval-augmented Generation Benchmark）

## 局限与挑战

- **黄金检索结果定义困难**：什么算"足够好"的检索结果无明确标准
- **忠实性 vs 正确性冲突**：回答忠实于检索结果但检索结果本身错误时如何评测
- **闭域 vs 开域**：企业知识库（闭域）和通用网络检索（开域）的评测方法差异显著
- **LLM-based 指标的循环性**：用 LLM 评测忠实性时，评测者和被评测者都是 LLM，存在系统性偏差
- **动态知识库**：知识库更新后历史评测结果可能不再反映当前系统质量

## 相关页面

- [[needle-in-haystack-concept]] — 长上下文检索能力评测
- [[hallucination-taxonomy]] — RAG 中的幻觉类型区分
- [[factuality-eval]] — 事实性评测在 RAG 场景的应用
- [[llm-as-judge]] — RAGAS 等 RAG 评测框架的评测方法
- [[tool-use-eval]] — RAG 可视为特殊的工具使用场景
