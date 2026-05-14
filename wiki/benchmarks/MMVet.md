---
title: "MMVet"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
aliases:
  - MM-Vet v2
  - MMVet-v2
domain: [multimodal]
language: en
year: 2023
authors: ["Weihao Yu", "Zhengyuan Yang", "Linjie Li", "Jianfeng Wang", "Kevin Lin", "Zicheng Liu", "Xinchao Wang", "Lijuan Wang"]
arxiv_id: "2308.02490"
official_url: "https://github.com/yuweihao/MM-Vet"
license: ""
size: 218
format: open-ended
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2308.02490"
---

# MMVet：多模态集成能力评测基准

## 概述

MMVet 是 2023 年提出的多模态大模型综合能力评测基准，专注于评测模型在**复杂多步骤视觉任务**上的集成能力。它包含 **218 道**经过精心设计的开放式问题，要求模型综合运用多种视觉理解能力，并采用 **LLM-as-Judge**（GPT-4 评分）机制进行评估。

## 任务设计

MMVet 定义了 6 种核心视觉能力，并评测这些能力在不同组合下的集成表现：

**六大核心能力：**
1. **识别（Recognition）**：识别图像中的对象、文字、场景等
2. **OCR**：读取图像中的文字
3. **知识（Knowledge）**：基于视觉内容运用外部知识
4. **语言生成（Language Generation）**：生成连贯、相关的文字描述
5. **空间理解（Spatial Awareness）**：理解空间关系和位置
6. **数学推理（Math）**：基于视觉内容进行数值推理

**218 道题按能力组合分类**，形成 16 个子集，如：
- 纯识别（Recognition only）
- OCR + 知识
- 识别 + 数学
- 全能力综合等

这种组合设计使 MMVet 能够精确定位模型在哪种能力交叉点上存在短板。

## 评分机制

MMVet 使用 **GPT-4 作为评分模型（LLM-as-Judge）**：
- 将模型输出与标准答案一同提交给 GPT-4
- GPT-4 按 0–1 分进行连续评分（支持部分分）
- 总分为所有题目的平均 GPT-4 评分（0–100 满分）
- 这种机制允许评测自由文本答案，超越了精确匹配的局限

## 数据特点

- 218 道题全部由人工构建，无自动生成
- 每道题涉及至少一种以上的核心视觉能力
- 题目涵盖图像描述、视觉推理、文档理解、数学计算、常识问答等多种类型
- 提供 MMVet v2（2024），将题量扩展至 517 道

## 主要发现与局限

MMVet 的测评结果揭示了多模态集成能力的差异：
- 早期多模态模型（LLaVA-7B 等）得分约 30 分，GPT-4V 约 67 分
- OCR + 知识、空间 + 数学等复杂组合是所有模型的共同弱点
- LLM-as-Judge 评分与人类评分相关性高（r > 0.9），但存在 GPT-4 版本依赖问题

主要局限在于样本量仅 218 道，统计噪声较大；LLM-as-Judge 评分存在主观性，不同 GPT-4 版本可能给出不同分数；开放式评分难以复现，评测成本较高。

## 参考文献

Yu, W., Yang, Z., Li, L., et al. (2023). MM-Vet: Evaluating Large Multimodal Models for Integrated Capabilities. *arXiv:2308.02490*.
