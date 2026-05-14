---
title: "WildChat"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [alignment, safety]
language: en
year: 2024
authors: ["Wenting Zhao", "Xiang Ren", "Jack Hessel", "Claire Cardie", "Yejin Choi", "Yuntian Deng"]
arxiv_id: "2405.01470"
official_url: "https://huggingface.co/datasets/allenai/WildChat-1M"
license: "AI2 ImpACT License (Low Risk)"
size: 1000000
format: open-ended
status: active
saturation_threshold: 0.80
sources:
  - "Zhao, W., et al. (2024). WildChat: 1M ChatGPT Interaction Logs in the Wild. ICLR 2024."
---

# WildChat

## 概述

WildChat 是由 Allen Institute for AI 等机构于 2024 年发布的大规模真实用户对话数据集，包含约 **100 万条真实用户与 ChatGPT（GPT-3.5/GPT-4）的交互记录**。数据收集自一个提供免费 ChatGPT API 访问的平台，用户在使用前同意数据收集条款。WildChat 是目前规模最大、覆盖用例最广的真实用户对话数据集之一。

## 数据特征

### 规模与多样性
- **对话总数**：约 1,000,000 条
- **语言覆盖**：超过 68 种语言（英语约 52%，中文约 16%，俄语约 7%）
- **用户请求类型**：创意写作、代码、翻译、问答、角色扮演、内容生成等

### 元数据
每条对话附有丰富的元数据：
- 使用的模型版本（GPT-3.5/GPT-4）
- 时间戳
- 地理位置信息（州/国级别，已匿名化）
- 毒性/有害内容分类标签
- IP 哈希（用于识别重复用户，已匿名化）

## 用于评测的价值

WildChat 在 LLM 评测中的主要价值体现在：

1. **指令分布研究**：分析真实世界中用户对 LLM 提出的请求类型分布，揭示实验室构造数据与真实使用场景的差距。

2. **安全内容分析**：数据集中约 2.4% 的对话涉及潜在有害或违反政策的请求，为安全对齐研究提供了宝贵的真实案例库，可用于 red-teaming 和有害内容检测的评测。

3. **多语言评测**：覆盖 68 种语言的真实请求，可用于测试多语言模型在低资源语言上的实际表现。

4. **比较评测基础**：作为 WildBench 等基于真实对话构造的评测基准的数据来源，WildChat 为"真实场景"评测提供了素材。

## WildBench 关联

基于 WildChat，研究者进一步构建了 **WildBench v2**：从 WildChat 中筛选多样化的真实用户请求，使用 GPT-4 作为评委，对不同 LLM 的回答质量进行成对比较评测，更接近真实用户体验。

## 局限性

- **采样偏差**：用户群体为愿意通过非官方平台访问 ChatGPT 的用户，可能不代表全体 ChatGPT 用户
- **隐私风险**：尽管已匿名化，部分用户输入可能包含个人信息
- **时效性**：数据集代表特定时期的用户行为模式，可能随 LLM 能力变化而过时
- **非评测集**：WildChat 本身更多作为分析/训练数据集，直接用于评测需要额外筛选和标注

## 相关数据集与基准

- **ShareGPT**：用户主动共享的 ChatGPT 对话，规模较小但质量较高
- **LMSYS-Chat-1M**：LMSYS 平台收集的 100 万对话
- **WildBench**：基于 WildChat 构建的对话质量评测基准
