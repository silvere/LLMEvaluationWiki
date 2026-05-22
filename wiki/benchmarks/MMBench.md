---
title: MMBench
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- multimodal
language: en
year: 2023
authors:
- Yuan Liu
- Haodong Duan
- Yuanhan Zhang
- Bo Li
- Songyang Zhang
- Wangbo Zhao
- Yike Yuan
- Jiaqi Wang
- Conghui He
- Ziwei Liu
- Kai Chen
- Dahua Lin
arxiv_id: '2307.06281'
official_url: https://mmbench.opencompass.org.cn
license: ''
size: 3000
format: multiple-choice
status: active
saturation_threshold: 0.9
sources:
- https://arxiv.org/abs/2307.06281
dimension: E
sota:
- score: 95.8%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://mmbench.opencompass.org.cn
  notes: MMBench-EN top-1 accuracy
- score: 95.2%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://mmbench.opencompass.org.cn
  notes: MMBench-EN top-1 accuracy
- score: 94.8%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://mmbench.opencompass.org.cn
  notes: MMBench-EN top-1 accuracy
- score: 94.0%
  model: Qwen3.6
  harness: null
  with_tools: false
  date: 2026-04
  source: https://mmbench.opencompass.org.cn
  notes: MMBench-EN top-1 accuracy
- score: 86.5%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://mmbench.opencompass.org.cn
  notes: MMBench-EN, 2024 baseline
---

# MMBench：多模态理解细粒度评测基准

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Gemini-3.1-Pro]] | 🚫 no | 95.8% | MMBench-EN top-1 accuracy | 2026-03 | [link](https://mmbench.opencompass.org.cn) |
| 🥈 | [[Claude-Opus-4.7]] | 🚫 no | 95.2% | MMBench-EN top-1 accuracy | 2026-04 | [link](https://mmbench.opencompass.org.cn) |
| 🥉 | [[GPT-5]] | 🚫 no | 94.8% | MMBench-EN top-1 accuracy | 2025-09 | [link](https://mmbench.opencompass.org.cn) |
| 4 | [[Qwen3.6]] | 🚫 no | 94.0% | MMBench-EN top-1 accuracy | 2026-04 | [link](https://mmbench.opencompass.org.cn) |
| 5 | [[GPT-4o]] | 🚫 no | 86.5% | MMBench-EN, 2024 baseline | 2024-05 | [link](https://mmbench.opencompass.org.cn) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2307.06281](https://arxiv.org/abs/2307.06281)
- **官方主页**: [https://mmbench.opencompass.org.cn](https://mmbench.opencompass.org.cn)

<!-- AUTO-LINKS:END -->

## 概述

MMBench 是 2023 年由上海 AI Lab 联合多家机构提出的多模态理解评测基准。它的核心目标是从**细粒度能力维度**系统衡量视觉语言模型的综合理解水平，并通过与 ChatGPT 协同的答案匹配机制解决选项格式不一致问题。

## 任务设计

MMBench 包含约 **3000 道**多项选择题，覆盖 **20 个能力维度**，组织为三级能力树结构：

**一级维度（L1）：**
- 属性感知（Attribute Perception）
- 关系推理（Relation Reasoning）
- 常识推理（Commonsense Reasoning）
- 图像理解（Image Understanding）

**二级维度（L2，示例）：**
- 对象识别、颜色/材质/形状属性
- 空间关系、数量关系
- 物理规律常识、社会常识
- 场景理解、情感理解

这种层次化设计使评测结果可以精确指向模型在特定子能力上的短板。

## 评分机制

MMBench 采用**循环评估（Circular Evaluation）**策略：对同一道题的所有选项进行轮换排列，并要求模型在多轮变体中保持一致性。这一设计有效过滤了选项位置偏见（Position Bias），避免模型因倾向于选"A"而虚报高分。

答案匹配方面，由于不同模型输出格式各异，MMBench 引入 ChatGPT 作为解析器，将自由文本回答映射至标准选项，再进行精确匹配评分。

## 数据特点

- 题目来源于真实互联网图像，覆盖自然场景、表格、图表、漫画等多种类型
- 每道题均有标准四选一格式，选项构造考虑了干扰项的合理性
- 数据集分为验证集（val）和测试集（test），测试集标签不公开发布
- 支持中文版本（MMBench-CN），评测模型的中英双语理解能力

## 主要发现与局限

MMBench 的细粒度分析揭示了一些重要规律：
- 早期多模态模型在**属性感知**（尤其是颜色、材质）上优于关系推理
- **空间关系理解**是大多数模型的显著弱点
- 常识推理能力与语言模型底座的质量高度相关

主要局限在于题目数量相对有限（约 3000 道），且多项选择格式无法评估生成能力；循环评估策略虽然有效，但增加了推理开销。

## 参考文献

Liu, Y., Duan, H., Zhang, Y., et al. (2023). MMBench: Is Your Multi-modal Model an All-around Player? *arXiv:2307.06281*.
