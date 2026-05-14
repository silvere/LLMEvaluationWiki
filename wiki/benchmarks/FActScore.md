---
title: "FActScore"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [hallucination, knowledge]
language: en
year: 2023
authors: ["Min et al."]
arxiv_id: "2305.14251"
official_url: "https://github.com/shmsw25/FActScore"
license: "MIT"
size: 500
format: open-ended
status: active
saturation_threshold: 0.90
sources: []
---

# FActScore（Factual precision in Atomized Statements Score）

> 用于评测语言模型生成文本中事实准确性的原子级评测框架，以生物传记生成为主要测试场景。

## 概述

FActScore 由 Min 等人于 2023 年提出，来自华盛顿大学（发表于 EMNLP 2023）。该框架提供了一种系统性评测 LLM 生成内容**事实准确率**的方法，特别解决了长文本生成中的幻觉（hallucination）检测问题。

FActScore 的核心方法论：
1. **原子化分解**：将生成文本分解为最小的事实性声明（atomic facts），如"爱因斯坦出生于 1879 年"
2. **逐条验证**：用外部知识源（默认为 Wikipedia）验证每条原子事实是否正确
3. **计算分数**：FActScore = 正确原子事实数 / 总原子事实数

主要评测场景是**人物传记生成**：给定一个（可能知名度较低的）人物名称，要求模型生成该人物的传记，再用 FActScore 评测生成内容的事实准确率。

测试集包含约 500 个人物名称，覆盖知名度不同的人物（避免模型对著名人物的过拟合）。FActScore 可以使用多种验证方式：检索系统 + NLI 模型、GPT-4 等。

FActScore 的重要发现是：即使是最强的语言模型（GPT-4），在生成较少知名人物的传记时，仍有相当比例的幻觉事实，揭示了 LLM 在知识边界处的系统性局限。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 数据量 | 约 500 个人物名称 |
| 格式 | 开放式（传记生成 + 原子事实验证） |
| 领域 | 事实准确性、幻觉检测 |
| 语言 | 英文 |
| 许可证 | MIT |
| 验证来源 | Wikipedia |

## SOTA 表现

顶尖模型（GPT-4、Claude 3 等）在 FActScore 上的平均分约为 70-80%（即约 20-30% 的原子事实存在错误或不支持），较低知名度人物的得分更低。具体见原论文及相关研究。

## 主要挑战与局限

- **知识来源局限**：仅依赖 Wikipedia，无法验证 Wikipedia 之外的事实
- **原子化分解不一致**：不同工具或方法分解出的原子事实粒度不同
- **验证系统准确率**：NLI 模型验证本身存在错误
- **场景局限**：主要测试传记生成，不代表所有生成场景
- **计算成本高**：原子化分解 + 逐条检索验证耗时较多

## 相关页面

- [[TruthfulQA]]
- [[HaluEval]]
- [[FEVER]]
- [[SimpleQA]]
- [[NaturalQuestions]]
