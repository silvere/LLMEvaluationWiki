---
title: "ScienceQA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [multimodal, knowledge]
language: en
year: 2022
authors: ["Pan Lu", "Swaroop Mishra", "Tony Xia", "Liang Qiu", "Kai-Wei Chang", "Song-Chun Zhu", "Oyvind Tafjord", "Peter Clark", "Ashwin Kalyan"]
arxiv_id: "2209.09513"
official_url: "https://scienceqa.github.io"
license: ""
size: 21208
format: multiple-choice
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2209.09513"
---

# ScienceQA：多学科科学视觉问答基准

## 概述

ScienceQA 是 2022 年由 UCLA 等机构提出的多模态科学问答数据集，发表于 NeurIPS 2022。它包含 **21,208 道**多学科科学选择题，其中约 48% 配有图像，覆盖自然科学、社会科学和语言科学三大领域，是首个大规模附有**解题讲解链（Lecture & Explanation）**的多模态科学问答基准。

## 任务设计

ScienceQA 的题目来自美国 1–8 年级科学教科书，覆盖以下科目：
- **自然科学**：生命科学、物理科学、地球与空间科学
- **社会科学**：地理、历史、文化
- **语言科学**：语言与阅读理解

每道题包含：
- 问题文本（Question）
- 可选图像（Context Image，约 48% 有图）
- 选项（2–5 个答案选项）
- **讲解（Lecture）**：背景知识说明
- **解析（Solution/Explanation）**：逐步推导正确答案

这种附带讲解链的设计使 ScienceQA 成为**思维链（Chain-of-Thought）推理**研究的重要基准。

## 数据特点

- 总计 21,208 道题，划分为训练集（12,726）、验证集（4,241）、测试集（4,241）
- 图像类型多样：科学示意图、地图、图表、实验场景图等
- 每道题均有主题标签（Topic）、年级标签（Grade Level）和学科标签
- 支持纯文本推理、视觉推理及多模态推理三种实验设置的对比分析

## 评分机制

采用标准多项选择准确率，自动化评分，无需人工评判。可分别统计含图像题和纯文本题的准确率，便于分析视觉能力对整体表现的贡献。

## 主要发现与局限

ScienceQA 的原始论文提出了 **Multimodal-CoT（多模态思维链）**方法，展示了引入图像上下文后思维链推理能力的显著提升。后续研究表明：
- 附带解析（Explanation）的 few-shot 提示能有效提升模型准确率
- 含图像题对模型提出了更高要求，尤其是科学示意图的理解
- 大型语言模型（GPT-4 系列）在该基准上接近或超越人类水平（约 90%）

主要局限在于题目来源于教材，与真实世界科学推理场景有一定距离；部分题目可通过常识直接作答，无需理解图像。

## 参考文献

Lu, P., Mishra, S., Xia, T., et al. (2022). Learn to Explain: Multimodal Reasoning via Thought Chains for Science Question Answering. *arXiv:2209.09513*. NeurIPS 2022.
