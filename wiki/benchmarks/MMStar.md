---
title: "MMStar"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [multimodal]
language: en
year: 2024
authors: ["Guowei Chen", "Lewei Yao", "Zhipeng Hu", "Kaipeng Zhang", "Yu Qiao", "Ping Luo", "Wenqi Shao"]
arxiv_id: "2403.20330"
official_url: "https://github.com/MMStar-Benchmark/MMStar"
license: ""
size: 1500
format: multiple-choice
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2403.20330"
---

# MMStar：精选高质量多模态评测基准

## 概述

MMStar 是 2024 年提出的高质量多模态基准，通过严格的筛选流程从现有多模态基准中提取 **1,500 道**确实需要视觉理解才能作答的题目。其设计核心是消除两类常见问题：**无需视觉即可回答的题目**和**数据集污染（Data Leakage）**，确保每道题都能真实反映模型的多模态能力。

## 任务设计

MMStar 从 6 个现有多模态基准（MMBench、SEEDBench、MMMU、MathVista、AI2D、HallusionBench）中筛选题目，经过以下过滤流程：

**过滤标准：**
1. **视觉必要性检查**：使用纯语言模型（GPT-4）尝试在不看图像的情况下作答，排除正确率高于随机的题目
2. **数据污染检查**：通过语言模型对题目的先验知识判断，排除可能已被训练集收录的题目
3. **难度筛选**：排除过于简单（准确率接近 100%）和过于困难（无法区分模型差异）的题目
4. **人工质检**：最终由人工审核保留题目的质量

**评测维度（6 大类）：**
1. 粗粒度感知（Coarse Perception）
2. 细粒度感知（Fine-grained Perception）
3. 实例推理（Instance Reasoning）
4. 逻辑推理（Logical Reasoning）
5. 数学推理（Math Reasoning）
6. 科学与技术（Science & Technology）

## 评分机制

标准多项选择准确率，每道题四个选项，完全自动化评分，无需 LLM 辅助。

## 数据特点

- 共 1,500 道题，每个维度 250 道，分布均匀
- 所有题目均验证为"视觉必要题"——纯语言模型无法超过随机准确率
- 数据集相对精简，推理成本低，适合快速评测
- 每道题附有原始来源基准信息，便于溯源分析

## 主要发现与局限

MMStar 的研究揭示了现有多模态基准的重要问题：
- 现有主流多模态基准中，**30-70% 的题目无需视觉即可获得较高得分**
- 在 MMStar 上，各模型的相对排名与在其他基准上存在明显差异，说明原有基准存在评测偏差
- 即使是最强的多模态模型，在 MMStar 上也有显著提升空间

主要局限在于数据集规模仅 1,500 道，统计可靠性有限；从现有基准二次筛选的方式可能引入筛选偏差；1,500 道题难以全面覆盖多模态能力的所有维度。

## 参考文献

Chen, G., Yao, L., Hu, Z., et al. (2024). Are We on the Right Way for Evaluating Large Vision-Language Models? *arXiv:2403.20330*.
