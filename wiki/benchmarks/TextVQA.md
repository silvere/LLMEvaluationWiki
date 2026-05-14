---
title: "TextVQA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [multimodal]
language: en
year: 2019
authors: ["Amanpreet Singh", "Vivek Natarajan", "Meet Shah", "Yu Jiang", "Xinlei Chen", "Dhruv Batra", "Devi Parikh", "Marcus Rohrbach"]
arxiv_id: "1904.08920"
official_url: "https://textvqa.org"
license: ""
size: 45336
format: open-ended
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/1904.08920"
---

# TextVQA：文字感知视觉问答基准

## 概述

TextVQA 是 2019 年由 Meta AI（Facebook AI Research）提出的视觉问答基准，发表于 CVPR 2019。它专门评测模型**读取和推理图像中出现的文字**的能力，包含 **45,336 道**问题，来自 28,408 张自然场景图像。TextVQA 的提出揭示了传统 VQA 模型忽视图像内文字信息的重要局限，推动了 OCR 感知多模态研究方向的发展。

## 任务设计

TextVQA 的核心挑战在于：**正确回答问题必须先识别图像中的文字内容**。

图像来源于 OpenImages v3，场景涵盖：
- 商店招牌与广告牌（Signs & Billboards）
- 书籍封面（Book Covers）
- 商品包装（Product Packaging）
- 交通标志（Traffic Signs）
- 菜单、海报、证件等

问题类型示例：
- "What does the sign say?"（招牌写了什么？）
- "What year was this book published?"（这本书是哪年出版的？）
- "What is the name of the restaurant?"（这家餐厅叫什么名字？）

每道题平均有 **10 个人工标注答案**（由不同标注员提供），用于计算 VQA 准确率。

## 评分机制

TextVQA 采用标准 **VQA 准确率**计算方式：
- 预测答案与 10 个人工答案进行比较
- 准确率 = min(匹配答案数 / 3, 1)
- 对大小写和标点不敏感（规范化后匹配）

## 数据特点

- 训练集 34,602 道，验证集 5,000 道，测试集 5,734 道
- 每道题配有图像的 OCR Token 标注（来自 Rosetta OCR 系统）
- 提供带 OCR 辅助的标准评测协议，允许模型使用预处理的 OCR 结果
- 官方竞赛平台维护测试集标准答案

## 主要发现与局限

TextVQA 的发布对多模态研究产生了深远影响：
- 传统 VQA 模型（如 BottomUp）在 TextVQA 上准确率仅约 26%，远低于人类（85%）
- 引入 OCR Token 注意力机制（如 M4C 模型）可将准确率提升至 63% 以上
- GPT-4V 等大型模型已能达到接近人类的水平（75%+）

主要局限在于图像场景偏向英文自然场景，多语言文字识别覆盖有限；部分答案需要超出图像可见文字的常识补充。

## 参考文献

Singh, A., Natarajan, V., Shah, M., et al. (2019). Towards VQA Models That Can Read. *arXiv:1904.08920*. CVPR 2019.
