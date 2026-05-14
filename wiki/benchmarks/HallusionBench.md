---
title: "HallusionBench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [multimodal, hallucination]
language: en
year: 2023
authors: ["Tianrui Guan", "Fuxiao Liu", "Xiyang Wu", "Ruiqi Xian", "Zongxia Li", "Xiaoyu Liu", "Xijun Wang", "Lichang Chen", "Furong Huang", "Yaser Yacoob", "Gedas Bertasius", "Mohamed Elhoseiny", "Ser-Nam Lim", "Dinesh Manocha"]
arxiv_id: "2310.14566"
official_url: "https://github.com/tianyi-lab/HallusionBench"
license: ""
size: 1129
format: multiple-choice
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2310.14566"
---

# HallusionBench：视觉语言幻觉系统评测基准

## 概述

HallusionBench 是 2023 年提出的专门针对视觉语言模型（VLM）**幻觉（Hallucination）**问题的评测基准。它包含 **1,129 对**视觉问题，通过精心设计的图像-问题配对揭示模型在视觉感知与语言先验之间的冲突，是幻觉评测领域的重要基准。

## 任务设计

HallusionBench 的核心设计理念是构造两类对抗性问题：

**视觉依赖问题（Visual Dependent, VD）：**
- 答案完全依赖于对图像的正确感知
- 涉及颜色、形状、数量、空间关系等视觉属性
- 设计了"原始图"与"修改图"的配对，修改图通过微调（如改变颜色、裁剪）使答案改变

**视觉补充问题（Visual Supplement, VS）：**
- 问题本身可通过常识或语言先验回答，但图像提供了修正信息
- 测试模型是否能正确整合视觉信息覆盖错误的语言先验

评测时分析两种典型错误：
1. **语言幻觉（Language Hallucination）**：忽视视觉信息，依赖语言先验作答
2. **视觉幻觉（Visual Hallucination）**：对图像的感知本身不准确

## 评分机制

HallusionBench 使用三个核心指标：
- **准确率（Accuracy per Question Pair）**：需要对同一图像-问题对的两个变体（原始/修改）均答对
- **幻觉率（Hallucination Rate）**：在特定条件下答错的比例
- **一致性（Consistency）**：模型在语义等价问题上的答案稳定性

## 数据特点

- 1,129 对问答，覆盖视觉幻觉的多个子类别
- 图像精心设计，确保修改前后人类均能正确回答
- 采用是/否二元问答格式，便于精确分析错误模式
- 提供细粒度的子类别分析（颜色、形状、计数等）

## 主要发现与局限

HallusionBench 的测评结果揭示了多模态模型幻觉问题的普遍性：
- 即使是最先进的模型（GPT-4V）在 HallusionBench 上的表现也显著低于人类
- 语言先验对视觉感知的干扰在所有测试模型中均有体现
- 视觉修改（如颜色替换）往往能"欺骗"模型，使其给出与原图相同的错误答案

主要局限在于数据集规模较小（1,129 对），可能带来统计噪声；二元问答格式限制了对复杂幻觉类型的评测深度。

## 参考文献

Guan, T., Liu, F., Wu, X., et al. (2023). HallusionBench: An Advanced Diagnostic Suite for Entangled Language Hallucination and Visual Illusion in Large Vision-Language Models. *arXiv:2310.14566*.
