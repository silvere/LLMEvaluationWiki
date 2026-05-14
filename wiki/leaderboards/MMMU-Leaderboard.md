---
title: "MMMU Leaderboard"
type: leaderboard
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# MMMU Leaderboard

## 概述

MMMU（Massive Multitask Multimodal Understanding）Leaderboard 是多模态大语言模型在**专业知识理解**能力上的权威排行榜。MMMU 基准由来自多所顶级高校的研究团队构建，要求模型综合运用图像理解和专业领域知识来回答大学水平的问题，是多模态评测领域最具挑战性的基准之一。

## 基准设计

MMMU 包含约 11,500 道来自 6 大学科领域、30 个子学科的专业问题：

| 学科大类 | 示例子学科 |
|---------|-----------|
| 艺术与设计 | 设计、绘画、音乐 |
| 商科 | 会计、经济、金融 |
| 科学 | 生物、化学、物理、数学 |
| 健康与医学 | 医学影像、药学 |
| 人文与社会科学 | 历史、心理学、法律 |
| 技术与工程 | 计算机科学、电子工程 |

题目类型包括多选题（多数）和开放式问题，许多问题需要理解图表、示意图、显微镜图像、乐谱等专业图像内容。

## 评测难度

MMMU 的关键特点是其**专业性**：许多问题即使是受过高等教育的人类也难以回答，需要特定领域的专业知识。早期多模态模型在 MMMU 上的准确率约为 50%（接近随机猜测水平），而优秀的人类专家表现约为 88%。顶级多模态模型现已达到 60-70% 以上的准确率。

## 排行榜特点

**优势**：
- 任务难度高，对顶级多模态模型有强区分度
- 专业领域覆盖广泛，全面评测知识广度
- 评测标准明确，结果可复现
- 是多模态能力评测领域的重要里程碑基准

**局限性**：
- 主要为英文题目，对中文多模态能力无直接评测
- 随着模型整体能力提升，部分简单题目存在饱和趋势
- 题目固定，存在数据污染风险
- 专业领域分布不均衡

## MMMU-Pro

2024 年推出的 MMMU-Pro 进一步提高了难度：增加了更多干扰选项（从4选1到10选1），并引入了"视觉推理"模式，要求模型从图像本身推理答案而非依赖文字提示。

## 访问方式

- 官方网站：[mmmu-benchmark.github.io](https://mmmu-benchmark.github.io/)
- HuggingFace：mmmu/MMMU 数据集
- 论文：Yue et al., "MMMU: A Massive Multi-discipline Multimodal Understanding and Reasoning Benchmark"（CVPR 2024）
