---
title: "MT-Bench 评测实现"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# MT-Bench 评测实现

## 概述

MT-Bench（Multi-turn Benchmark）评测代码库是 UC Berkeley 发布的多轮对话评测实现，随 "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena" 论文（arXiv: 2306.05685）同时开源。该代码库不仅提供了 MT-Bench 基准本身的评测工具，还包含了 LLM-as-Judge 方法的参考实现，是该领域的里程碑式工作。

## MT-Bench 基准

MT-Bench 包含 80 道精心设计的多轮对话题目，覆盖 8 个能力类别：
- **写作**（Writing）：创意写作、文章编辑
- **角色扮演**（Roleplay）：多种角色情境
- **推理**（Reasoning）：逻辑和抽象推理
- **数学**（Math）：数学计算和证明
- **代码**（Coding）：代码编写和调试
- **知识提取**（Knowledge Extraction）：结构化信息提取
- **STEM**：科学技术工程类问题
- **人文社科**（Humanities）：历史、法律、哲学

每道题目分为两轮：第一轮提出问题，第二轮基于第一轮的回答进行追问，测试模型的多轮对话连贯性。

## LLM-as-Judge 实现

MT-Bench 代码库提供了当时最完整的 GPT-4 评判实现：

**单独评分模式（Single answer grading）**：
使用 GPT-4 对单个模型的回答进行 1-10 分打分，提供详细评分理由。

**成对比较模式（Pairwise comparison）**：
让 GPT-4 比较两个模型的回答，选择更好的一方。

**实验发现**：论文系统验证了以下关键发现：
1. GPT-4 评判与人类评判的一致性约为 80%，与人类评判者之间的一致性相当
2. GPT-4 存在"位置偏差"（倾向于选择先出现的回答）和"冗长偏差"（偏好更长的回答）
3. 这些偏差可以通过评测设计缓解（如随机化顺序、多次评判取平均）

## 代码结构

```
FastChat/
  fastchat/llm_judge/
    data/          # 80道MT-Bench题目
    gen_model_answer.py    # 生成模型回答
    gen_judgment.py        # GPT-4评判
    show_result.py         # 结果展示
```

## 历史影响

MT-Bench 代码库是 LLM-as-Judge 评测范式的奠基性实现，直接影响了 AlpacaEval、Arena-Hard、WildBench 等后续评测工作的设计。其揭示的"评判偏差"问题推动了 AlpacaEval 2.0 引入 Length-Controlled Win Rate 等改进方法。

## 访问方式

- GitHub：[github.com/lm-sys/FastChat/tree/main/fastchat/llm_judge](https://github.com/lm-sys/FastChat/tree/main/fastchat/llm_judge)
- 论文：Zheng et al., "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena"（NeurIPS 2023, arXiv: 2306.05685）
