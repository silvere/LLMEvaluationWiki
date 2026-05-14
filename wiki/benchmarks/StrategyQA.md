---
title: "StrategyQA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning]
language: en
year: 2021
authors: ["Mor Geva", "Daniel Khashabi", "Elad Segal", "Tushar Khot", "Dan Roth", "Jonathan Berant"]
arxiv_id: "2101.02235"
official_url: "https://github.com/eladsegal/strategyqa"
license: "MIT"
size: 2780
format: binary
status: active
saturation_threshold: 0.90
sources:
  - "Geva, M., et al. (2021). Did Aristotle Use a Laptop? A Question Answering Benchmark with Implicit Reasoning Strategies. TACL 2021."
---

# StrategyQA

## 概述

StrategyQA 是由 Allen Institute for AI 和 Tel-Aviv University 于 2021 年发布的策略性问答基准。该基准专注于**隐式多步推理**（implicit multi-step reasoning）——问题本身不暗示推理路径，模型需要自行分解并推断回答策略。

## 核心设计理念

StrategyQA 的核心特点是"策略性"（strategy）：问题答案需要经过多个推理步骤，但这些步骤对回答者是**隐式的**，不像 HotpotQA 那样明确给出子问题。

典型示例：
> "Did Aristotle use a laptop?" → No（亚里士多德生活于公元前 384-322 年，而笔记本电脑在 20 世纪才发明）

回答此问题需要隐式地：(1) 知道亚里士多德的生存年代；(2) 知道笔记本电脑的发明时间；(3) 推断两者时序关系。

## 数据构成

| 分割 | 数量 |
|------|------|
| 训练集 | 2,290 |
| 测试集 | 490  |
| 合计  | 2,780 |

每道题目除答案（Yes/No）外，还附有：
- **推理分解（decomposition）**：标注者提供的分步推理链
- **证据段落**：支持每个子步骤的维基百科段落

## 任务格式

二元分类（是/否），输入为问题文本，不提供任何背景段落。模型必须依靠参数化知识（parametric knowledge）自行检索相关信息并完成推理。

## 评测挑战

1. **隐式推理**：不同于显式多跳问答，StrategyQA 要求模型主动规划推理路径
2. **知识密集型**：回答质量高度依赖模型存储的世界知识的广度和准确性
3. **逻辑多样性**：推理策略跨越时间比较、因果关系、分类归属等多种逻辑类型

## 与思维链（Chain-of-Thought）研究的关系

StrategyQA 是思维链提示（Chain-of-Thought Prompting）研究中的核心评测基准之一。Wei et al.（2022）的 CoT 论文中将其作为演示少样本推理提升效果的重要数据集。在 CoT 提示下，大型语言模型在 StrategyQA 上的表现可获得显著提升（相比直接答题），直接证明了链式推理的价值。

## 典型表现

- 人类准确率：约 87%
- GPT-3（direct prompting）：~65%
- GPT-3（Chain-of-Thought）：~73%
- 大型语言模型（GPT-4 级别）：接近或超过人类表现

## 局限性

- 数据量较小（2,780 题），统计显著性有限
- 二元格式（是/否）过于简化，无法评测开放式推理质量
- 问题构造存在一定的知识时效性问题（新事件可能改变答案）

## 相关基准

- **HotpotQA**：显式多跳问答，需跨多篇文档推理
- **MuSiQue**：减少捷径的多步推理问答
- **2WikiMultiHopQA**：两篇维基百科文档的多跳推理
