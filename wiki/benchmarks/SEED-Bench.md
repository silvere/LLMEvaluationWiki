---
title: "SEED-Bench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [multimodal]
language: en
year: 2023
authors: ["Bohao Li", "Rui Wang", "Guangzhi Wang", "Yuying Ge", "Yixiao Ge", "Ying Shan"]
arxiv_id: "2307.16125"
official_url: "https://github.com/AILab-CVC/SEED-Bench"
license: ""
size: 19242
format: multiple-choice
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2307.16125"
---

# SEED-Bench：多模态生成模型理解能力评测

## 概述

SEED-Bench 是 2023 年由腾讯 AI Lab 提出的多模态基准，全称为 **Seed Evaluation Benchmark**。它专注于评测多模态生成模型（Multimodal Generative Models）的综合理解能力，包含约 **19,242 道**多项选择题，覆盖图像和视频两种模态。

## 任务设计

SEED-Bench 设计了 **12 个评测维度**，分为图像理解和视频理解两大部分：

**图像理解（9 个维度）：**
1. 场景理解（Scene Understanding）
2. 实例识别（Instance Identity）
3. 实例属性（Instance Attributes）
4. 实例位置（Instance Location）
5. 实例计数（Instances Counting）
6. 空间关系（Spatial Relation）
7. 实例交互（Instance Interaction）
8. 视觉推理（Visual Reasoning）
9. 文本理解（Text Understanding）

**视频理解（3 个维度）：**
10. 动作识别（Action Recognition）
11. 动作预测（Action Prediction）
12. 过程理解（Procedure Understanding）

这种涵盖静态图像和动态视频的双模态设计，是 SEED-Bench 区别于同类基准的主要特点。

## 数据构建

SEED-Bench 的题目由 **人类标注员**精心构建，并通过严格的质量审核流程筛选：
- 所有题目均为四选一格式，标注了唯一正确答案
- 图像来源于 CC3M 等公开数据集，视频来源于 Kinetics-400 等视频数据集
- 通过人工审核排除有歧义或依赖常识而非视觉的题目
- SEED-Bench-2 版本进一步扩展至 27 个维度，题量增至 24,000 道

## 评分机制

采用标准准确率评分，分别汇报各维度及总体准确率。由于完全基于多项选择，评分全自动、无需人工或 LLM 辅助判断，可复现性强。

## 主要发现与局限

SEED-Bench 的早期测评揭示：
- **视频理解**（尤其是动作预测和过程理解）是所有被测模型的共同弱点
- 文字理解能力在不同模型间差异显著
- 开源模型与商业模型（GPT-4V）在视觉推理上存在明显差距

主要局限在于多项选择格式无法充分评估自由生成和开放性推理能力；视频题目仅截取关键帧，对时序建模能力的考察深度有限。

## 参考文献

Li, B., Wang, R., Wang, G., et al. (2023). SEED-Bench: Benchmarking Multimodal LLMs with Generative Comprehension. *arXiv:2307.16125*.
