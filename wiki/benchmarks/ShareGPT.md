---
title: "ShareGPT"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [dialog]
language: en
year: 2023
authors: ["Domino Starr (Community)"]
arxiv_id: ""
official_url: "https://sharegpt.com"
license: "CC BY 4.0"
size: 90000
format: open-ended
status: active
saturation_threshold: 0.80
sources:
  - "Chiang, W.L., et al. (2023). Vicuna: An Open-Source Chatbot Impressing GPT-4 with 90%* ChatGPT Quality. LMSYS Blog."
---

# ShareGPT

## 概述

ShareGPT 是一个用户自发共享 ChatGPT 对话的社区平台和数据集。用户通过 ShareGPT Chrome 插件将自己认为有价值的 ChatGPT 对话一键分享至公共平台，形成了早期规模最大的人类-GPT 对话公开数据集。该数据集被广泛用于训练开源指令跟随模型，并在一定程度上影响了 LLM 评测基准的构建。

## 数据特征

常用版本（ShareGPT52K 等清洗后版本）包含约 **9 万条对话**，原始抓取数据更多：

- **对话轮次**：包含多轮对话，平均约 5-6 轮
- **语言**：以英语为主，混有其他语言
- **内容类型**：编程辅助、写作、解释概念、问题解决、创意生成等
- **质量**：用户主动分享意味着内容偏向高质量或有趣的对话，代表性存在偏差

## 训练用途

ShareGPT 数据集在开源 LLM 训练中具有里程碑意义：

- **Vicuna**（2023 年）：UC Berkeley 等团队基于 ShareGPT 约 7 万条对话对 LLaMA 进行指令微调，得到 Vicuna-13B，宣称达到 ChatGPT 性能的 90%，引发学界广泛关注
- **WizardLM、Alpaca 等系列**：大量早期开源指令模型将 ShareGPT 作为核心训练数据或对齐参考
- **FastChat 平台**：Chatbot Arena 早期评测的底层框架使用了 ShareGPT 格式数据

## 作为评测参考的价值

尽管 ShareGPT 本身不是标准评测集，但在 LLM 研究中发挥了以下评测相关作用：

1. **对话质量基线**：Vicuna 等模型基于 ShareGPT 训练后，将其与 ChatGPT/GPT-4 的对话输出作为评测比较的质量参考点（GPT-4-as-judge 评测框架）

2. **指令覆盖分析**：研究者通过分析 ShareGPT 的指令类型分布（如代码/写作/推理的比例）来理解真实用户需求，为构建更具代表性的评测基准提供依据

3. **格式标准化**：ShareGPT 对话格式（`human`/`assistant` 交替轮次）成为事实上的多轮对话标准格式，被 LLM 训练框架广泛采用

## 数据质量问题

ShareGPT 作为评测参考数据时存在显著局限：

- **选择偏差**：用户分享的对话往往是 ChatGPT 表现较好的案例，不代表失败模式
- **过时性**：数据主要来自 ChatGPT 早期版本（GPT-3.5），随 API 迭代逐渐失去时效性
- **重复内容**：存在大量相似指令（如"解释 X 是什么"），多样性有限
- **版权争议**：对话内容的版权归属存在法律不确定性

## 相关数据集

- **WildChat**：更大规模（100 万对话）的真实用户交互数据集
- **LMSYS-Chat-1M**：Chatbot Arena 平台收集的 100 万条对话
- **OpenAssistant**：社区众包构建的人工标注多轮对话数据集
