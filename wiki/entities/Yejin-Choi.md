---
title: "Yejin Choi（崔叶真）"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Yejin Choi（崔叶真）

> 华盛顿大学计算机科学系教授，Allen Institute for AI 高级研究员，常识推理评测领域的核心贡献者，HellaSwag 和 WinoGrande 等基准的相关研究者。

## 基本信息

- **所属机构**：华盛顿大学（University of Washington）计算机科学系；Allen Institute for AI (AI2)
- **职位**：教授（Brett Helsel 讲席）；AI2 高级研究员
- **研究方向**：常识推理、自然语言理解、知识表示、LLM 评测
- **荣誉**：MacArthur Fellowship 获得者（2022）

## 评测领域主要贡献

**HellaSwag（2019）**：Yejin Choi 团队（Zellers et al.）发布的 HellaSwag 是常识情境推理评测的代表性数据集。其创新在于采用"对抗性过滤"（adversarial filtering）方法构建干扰项，使模型难以通过语言统计特征猜测答案，从而更真实地评测模型的情景理解能力。HellaSwag 已成为所有主流开源 LLM 排行榜的标准测试之一。

**WinoGrande（2019）**：参与发布的 WinoGrande 是大规模 Winograd Schema Challenge 数据集，包含 44,000 个常识推理问题，同样使用对抗性过滤保证评测质量，是测试模型常识代词消歧能力的标准基准。

**ATOMIC / COMET**：Choi 团队构建的 ATOMIC 常识知识图谱（覆盖因果、时序、心理状态等关系）以及基于此训练的 COMET 模型，为评测 LLM 的常识知识表示和推理提供了基础资源。

**对抗性数据集方法论**：Choi 团队在对抗性数据集构建方法（AF-框架，adversarial filtering）上的系统研究，影响了 LLM 评测集设计中对"数据集偏差"的防范方法。

**VCR（Visual Commonsense Reasoning）**：视觉常识推理评测集，要求模型不仅答题还需给出理由，推动了多模态 LLM 评测的发展。

## 代表性工作

- HellaSwag（2019）
- WinoGrande（2019）
- ATOMIC 常识知识图谱系列
- COMET 常识推理模型
- VCR 视觉常识推理基准

## 相关页面

- [[HellaSwag]]
- [[WinoGrande]]
- 常识推理评测
- [[AI2]]
- 对抗性数据集
