---
title: "AdvBench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [safety]
language: en
year: 2023
authors: ["Andy Zou", "Zifan Wang", "J. Zico Kolter", "Matt Fredrikson"]
arxiv_id: "2307.15043"
official_url: "https://github.com/llm-attacks/llm-attacks"
license: "MIT"
size: 500
format: open-ended
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2307.15043"
---

# AdvBench：对抗性越狱攻击评测基准

## 概述

AdvBench 是 2023 年由 Zou 等人随论文《Universal and Transferable Adversarial Attacks on Aligned Language Models》提出的安全评测数据集，发表于 NeurIPS 2023。它包含 **500 条**有害指令，分为两个子集，是目前最广泛引用的越狱攻击与防御研究基准之一。

## 数据设计

AdvBench 包含两个子集：

**有害行为（Harmful Behaviors）：**
- 250 条有害行为描述，每条要求模型执行特定的危险操作
- 示例类别：合成危险物质、黑客攻击、暴力指令、诈骗话术等
- 每条行为附有一个**目标字符串（Target String）**，表示理想的有害回应开头
- 目标字符串通常以"Sure, here is how to..."或"Of course, I can help with..."开始

**有害字符串（Harmful Strings）：**
- 250 条直接有害文本字符串
- 要求攻击方法能让模型生成这些原始有害内容
- 内容覆盖仇恨言论、暴力描述、违法信息等

**主要用途：**
AdvBench 最初用于评测**GCG（Greedy Coordinate Gradient）自动对抗攻击**的成功率，后被广泛用作越狱攻击研究的标准测试集。

## 评分机制

AdvBench 没有统一的单一评分标准，常见评测方式包括：
- **关键词匹配**：检查模型输出是否包含目标字符串或拒绝标志词（"I'm sorry"等）
- **人工评估**：人工判断模型是否真实执行了有害指令
- **分类器评分**：使用 Llama Guard 等安全分类器判断输出是否有害
- **攻击成功率（ASR）**：在给定攻击策略下，成功使模型输出有害内容的比例

## 数据特点

- 500 条指令全部覆盖"模型应拒绝执行"的危险类别
- 数据集设计简洁，便于直接用于快速安全评测
- 已被 JailbreakBench、HarmBench 等后续基准引用和扩展
- 提供 MIT 开源许可证，方便学术使用

## 主要发现与局限

AdvBench 在发布时揭示了严重的安全问题：
- GCG 攻击可对 Llama-2、Vicuna 等多个主流模型实现 80%+ 的攻击成功率
- 自动生成的对抗后缀具有跨模型迁移性
- 商业模型（ChatGPT、Claude 2）对 GCG 攻击有更强抵抗力，但并非无懈可击

主要局限在于数据集规模较小（仅 500 条），统计可靠性有限；目标字符串定义较为随意，评测不同攻击策略时比较性较弱；关键词匹配评分方式容易被规避（模型可先输出有害内容后再补充警告）。

## 参考文献

Zou, A., Wang, Z., Kolter, J. Z., & Fredrikson, M. (2023). Universal and Transferable Adversarial Attacks on Aligned Language Models. *arXiv:2307.15043*. NeurIPS 2023.
