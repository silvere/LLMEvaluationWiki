---
title: "MME"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [multimodal]
language: en
year: 2023
authors: ["Chaoyou Fu", "Peixian Chen", "Yunhang Shen", "Yulei Qin", "Mengdan Zhang", "Xu Lin", "Zhenling Jiang", "Wenbing Zeng", "Shaohui Lin", "Rongrong Ji", "Caifeng Shan", "Xing Sun"]
arxiv_id: "2306.13394"
official_url: "https://github.com/BradyFU/Awesome-Multimodal-Large-Language-Models/tree/Evaluation"
license: ""
size: 2194
format: multiple-choice
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2306.13394"
---

# MME：多模态大模型综合评测基准

## 概述

MME（Multimodal Large Language Model Evaluation）是 2023 年由 Fu 等人提出的多模态大语言模型综合评测基准。它是最早系统化评测多模态大模型（如 GPT-4V、LLaVA 等）的基准之一，在学术界被广泛引用，成为多模态模型对比分析的标准参照。

## 任务设计

MME 包含 **14 个子任务**，分为两大类别：

**感知能力（Perception）：**
- 存在性判断（Existence）
- 计数（Count）
- 位置理解（Position）
- 颜色识别（Color）
- 海报理解（Poster）
- 名人识别（Celebrity）
- 场景理解（Scene）
- 地标识别（Landmark）
- 艺术品理解（Artwork）
- OCR 文字识别

**认知能力（Cognition）：**
- 常识推理（Commonsense Reasoning）
- 数值计算（Numerical Calculation）
- 文字翻译（Text Translation）
- 代码推理（Code Reasoning）

所有问题均采用**是/否（Yes/No）二元问答**格式，每道题由一张图像和一个封闭式问题构成。这种设计避免了开放式回答导致的评分歧义，使得评分完全自动化。

## 评分机制

MME 对每个子任务计算**准确率分数**，同时设计了精准度（Accuracy+）指标——要求模型对同一图像的正/负样本均答对方可得分，以此减少随机猜测带来的虚高分数。

各子任务分数加总后分别计算感知总分（最高 1600 分）和认知总分（最高 800 分），最终汇报两个维度的综合得分。

## 数据特点

- 数据集规模约 **2194 道**问答对
- 图像来源广泛，涵盖自然场景、文档、艺术品、卫星图等多种类型
- 所有标注由人工完成，质量较高
- 问题设计避免了语言先验（Language Prior）对答案的干扰

## 主要发现与局限

MME 在发布之初揭示了多模态模型的几个共性问题：
1. **语言先验干扰**：部分模型倾向于回答"Yes"，与实际视觉内容无关
2. **认知能力薄弱**：代码推理、数值计算等高阶任务对早期模型挑战极大
3. **跨模态一致性差**：同一场景下正负样本的表现差异显著

主要局限在于二元是/否格式过于简单，无法全面考察自由生成能力；随着模型进步，部分子任务已出现饱和迹象。

## 参考文献

Fu, C., Chen, P., Shen, Y., et al. (2023). MME: A Comprehensive Evaluation Benchmark for Multimodal Large Language Models. *arXiv:2306.13394*.
