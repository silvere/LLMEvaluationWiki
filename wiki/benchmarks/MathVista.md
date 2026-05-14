---
title: "MathVista"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [multimodal, math]
language: en
year: 2023
authors: ["Pan Lu", "Hritik Bansal", "Tony Xia", "Jiacheng Liu", "Chunyuan Li", "Hannaneh Hajishirzi", "Hao Cheng", "Kai-Wei Chang", "Michel Galley", "Jianfeng Gao"]
arxiv_id: "2310.02255"
official_url: "https://mathvista.github.io"
license: ""
size: 6141
format: multiple-choice
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2310.02255"
---

# MathVista：数学视觉推理综合评测基准

## 概述

MathVista 是 2023 年由 UCLA、微软研究院等机构联合提出的数学视觉推理评测基准，荣获 **NeurIPS 2023 数据集与基准赛道**亮点论文。它聚焦于评测大模型在**数学推理与视觉感知**交叉领域的能力，包含 **6,141 道**来自不同数学场景的视觉题目。

## 任务设计

MathVista 整合了来自 **31 个现有数据集**及新采集样本的题目，按任务类型分为：

**数学推理类型：**
- 算术推理（Arithmetic Reasoning）
- 代数推理（Algebraic Reasoning）
- 几何推理（Geometry Reasoning）
- 统计推理（Statistical Reasoning）
- 科学计算（Scientific Reasoning）
- 逻辑推理（Logical Reasoning）

**视觉场景类型：**
- 抽象图形（Abstract Diagram）
- 函数图像（Function Plot）
- 几何图形（Geometry Figure）
- 自然图像（Natural Image）
- 表格（Table）
- 科学图表（Scientific Figure）
- 数字图像（Number Image）

题目格式混合**多项选择（Multiple Choice）**和**自由作答（Free-form）**，分别占约 55% 和 45%。

## 评分机制

- 多项选择题：精确匹配
- 自由作答题：数值提取后精确比对，支持等价数值形式（如 1/2 = 0.5）
- 使用 GPT-4 辅助答案提取和规范化，提升评分鲁棒性

## 数据特点

- 题目覆盖小学至大学程度数学知识
- 每道题均标注了所需视觉感知能力（是否依赖图像）和数学推理类型
- 通过 **testmini** 子集（1,000 道）支持快速评估
- 2024 年发布 MathVista v2，新增更多题目类型

## 主要发现与局限

MathVista 发布时的测评结果表明：
- 即使是 GPT-4V 在 MathVista 上的准确率（约 49.9%）也远低于人类（60.3%），显示任务难度较高
- 几何推理和统计推理是所有模型的共同难点
- 大多数模型在**自由作答**题上表现显著弱于多项选择题
- 纯语言模型（无视觉）在该基准上准确率极低，验证了视觉信息的不可替代性

主要局限在于部分几何题依赖图形精度，图像质量会影响评测公平性；自由作答的数值提取在极端答案格式下存在误判风险。

## 参考文献

Lu, P., Bansal, H., Xia, T., et al. (2023). MathVista: Evaluating Mathematical Reasoning of Foundation Models in Visual Contexts. *arXiv:2310.02255*. NeurIPS 2023.
