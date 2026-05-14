---
title: "SafetyBench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [safety]
language: en
year: 2023
authors: ["Zhexin Zhang", "Leqi Lei", "Lindong Wu", "Rui Sun", "Yongkang Huang", "Chong Long", "Xiao Liu", "Xuanyu Lei", "Jie Tang", "Minlie Huang"]
arxiv_id: ""
official_url: "https://github.com/thu-coai/SafetyBench"
license: "Apache 2.0"
size: 11435
format: multiple-choice
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2309.07045"
---

# SafetyBench：中英双语安全能力综合评测基准

## 概述

SafetyBench 是 2023 年由清华大学提出的大规模中英双语安全评测基准。它包含 **11,435 道**多项选择题，覆盖 **7 个安全类别**，是专门为中文大语言模型安全性评测设计的系统性基准之一，同时提供英文版本支持跨语言对比。

## 任务设计

SafetyBench 将安全能力划分为 **7 个核心类别**：

1. **攻击性语言（Offensive Language）**：识别和拒绝生成攻击性、辱骂性内容
2. **歧视（Discrimination）**：识别基于种族、性别、宗教等维度的歧视内容
3. **有害信息（Harmful Information）**：拒绝提供危险、非法行动的指导信息
4. **身体健康（Physical Health）**：避免提供危害人体健康的医疗/化学建议
5. **精神健康（Mental Health）**：处理自杀、自伤等心理健康敏感话题
6. **隐私与财产（Privacy & Property）**：保护个人隐私和财产安全
7. **伦理与道德（Ethics & Morality）**：遵循基本伦理和法律准则

**题目格式：**
每道题为多项选择（通常为 4 选 1），要求模型选出最安全、最合规的回答选项，而非简单判断有害/无害。这种设计更贴近模型在实际使用中的决策场景。

## 评分机制

标准多项选择准确率，分别统计：
- 各安全类别准确率
- 中文整体准确率
- 英文整体准确率
- 中英文综合准确率

## 数据特点

- 11,435 道题，中文约 6,000 道，英文约 5,400 道
- 全部经过人工构建和审核，质量可控
- 覆盖法律法规、社会规范、伦理道德等多维度安全知识
- 测试集标签不公开，通过官方平台提交评测
- 专门针对中国法律、文化背景设计，适合评测面向中国用户的模型

## 主要发现与局限

SafetyBench 的评测揭示了中文模型与英文模型在安全性上的差异：
- 专门面向中国用户训练的模型在中文安全题目上优势明显
- 通用多语言模型（如 GPT-4）在英文安全题上表现更好
- 精神健康和有害信息类别是所有模型的主要难点
- 安全知识（识别有害内容）与安全行为（在实际生成中拒绝执行）之间存在差距

主要局限在于多项选择格式无法直接评测生成行为；部分题目的"最安全回答"定义受中国文化和法律背景影响；可能不适合直接评测非中文场景的模型。

## 参考文献

Zhang, Z., Lei, L., Wu, L., et al. (2023). SafetyBench: Evaluating the Safety of Large Language Models. *arXiv:2309.07045*.
