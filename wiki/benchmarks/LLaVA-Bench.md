---
title: "LLaVA-Bench"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
  - dialog
year: 2023
arxiv_id: "2304.08485"
status: active
---

# LLaVA-Bench

> 评测视觉指令跟随能力的早期多模态基准，通过 GPT-4 评分衡量模型回应多样化视觉问题的质量。

## 概述

LLaVA-Bench（Large Language and Vision Assistant Benchmark）由 UW-Madison 和 Microsoft Research 于 2023 年随 LLaVA 模型一同发布。它是最早采用**视觉指令跟随（Visual Instruction Following）**范式的多模态评测基准之一，通过开放式对话问题和 GPT-4 评分来衡量模型理解图像并进行自然对话的能力。

LLaVA-Bench 包含两个子集：In-the-Wild（来自互联网的真实图像）和 COCO（来自 COCO 数据集的图像）。每张图像配有 3 类问题（对话型、细节描述型、复杂推理型），通过模拟多轮对话评测模型的指令理解和回应质量。

作为 LLaVA 系列的官方评测工具，LLaVA-Bench 在 2023 年多模态大模型快速发展期间被广泛使用，是评测视觉对话能力的重要早期基准，奠定了后续诸多多模态基准的设计范式。

## 任务格式

- **子集组成**：
  - LLaVA-Bench (In-the-Wild)：60 张真实图像，共 180 道问题
  - LLaVA-Bench (COCO)：90 张 COCO 图像，共 270 道问题
- **问题类型**：对话（Conversation）、细节描述（Detail Description）、复杂推理（Complex Reasoning）
- **问题格式**：开放式指令/问题，模型生成自由文本回答
- **评分方式**：GPT-4 将模型回答与参考答案（GPT-4 自身生成）对比，给出 1-10 分的相对得分
- **评分归一化**：以 GPT-4 自身回答作为满分基准（100 分），其他模型得分为相对百分比

## 主要指标

- **相对得分（Relative Score）**：以 GPT-4 回答为 100 分，其他模型的相对得分百分比
- **子集细分**：In-the-Wild 和 COCO 子集分别报告
- **问题类型细分**：对话、细节描述、复杂推理三类分别报告

## 局限性

- 测试集规模很小（仅 150-270 道题），随机波动较大
- GPT-4 评分存在位置偏差（倾向于给第一个回答更高分）和自我偏好问题
- 以 GPT-4 自身回答作为满分基准，评测分数随 GPT-4 版本变化而漂移

## 相关页面
- [[MMBench]]
- [[MMHal-Bench]]
- [[AlpacaEval]]
