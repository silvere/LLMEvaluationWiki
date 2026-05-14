---
title: "HELM Leaderboard"
type: leaderboard
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# HELM Leaderboard

## 概述

HELM（Holistic Evaluation of Language Models）是斯坦福大学计算机研究与基础模型中心（CRFM）开发的综合性语言模型评测框架及排行榜。HELM 的设计哲学是对语言模型进行**全面、系统性的多维度评测**，而非单一能力衡量，旨在揭示模型在不同任务和指标下的完整能力画像。

## 评测维度

HELM 将评测指标分为两大类：

**核心能力指标**：
- 准确性（Accuracy）
- 校准性（Calibration）：模型对自身预测的置信度是否准确
- 鲁棒性（Robustness）：输入扰动下的性能稳定性
- 公平性（Fairness）：不同人群子集上的性能差异
- 偏见（Bias）：生成内容中的偏见程度

**场景覆盖**：
涵盖问答、信息检索、摘要、情感分析、毒性检测、代码生成、医疗、法律等 42 个场景，约 98 个评测指标。

## 与常规排行榜的不同

HELM 明确反对**单一数值排名**的做法。传统排行榜将所有指标加权平均为一个分数，HELM 认为这会掩盖重要的能力差异。HELM 排行榜展示各模型在每个维度的详细得分，鼓励用户根据自身需求选择关注的指标子集。

## HELM Classic 与 HELM Instruct

- **HELM Classic**：评测基础语言模型（非指令微调），侧重少样本学习能力
- **HELM Instruct**：针对指令微调模型的评测版本，任务设置更接近实际使用场景

## 排行榜特点

**优势**：
- 评测维度最为全面，提供多维度能力画像
- 框架完全开源，评测过程可复现
- 持续更新，纳入新的模型和评测场景
- 安全和偏见等非性能指标被系统性纳入

**局限性**：
- 评测规模庞大，运行完整评测的计算成本极高
- 部分评测场景设计偏学术，与实际使用相关性有限
- 信息更新速度相对较慢，最新模型可能未及时纳入

## 访问方式

- 官方排行榜：[crfm.stanford.edu/helm](https://crfm.stanford.edu/helm/)
- GitHub：[github.com/stanford-crfm/helm](https://github.com/stanford-crfm/helm)
- 论文：Liang et al., "Holistic Evaluation of Language Models"（arXiv: 2211.09110）
