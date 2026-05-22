---
title: TextVQA
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- multimodal
language: en
year: 2019
authors:
- Amanpreet Singh
- Vivek Natarajan
- Meet Shah
- Yu Jiang
- Xinlei Chen
- Dhruv Batra
- Devi Parikh
- Marcus Rohrbach
arxiv_id: '1904.08920'
official_url: https://textvqa.org
license: ''
size: 45336
format: open-ended
status: active
saturation_threshold: 0.9
sources:
- https://arxiv.org/abs/1904.08920
dimension: E
sota:
- score: 90.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://textvqa.org
  notes: accuracy (text recognition in images)
- score: 90.2%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://textvqa.org
  notes: accuracy
- score: 89.5%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://textvqa.org
  notes: accuracy
- score: 88.8%
  model: Qwen3.6
  harness: null
  with_tools: false
  date: 2026-04
  source: https://textvqa.org
  notes: accuracy
- score: 85.0%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://textvqa.org
  notes: accuracy, 2024 baseline
---

# TextVQA：文字感知视觉问答基准

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Claude-Opus-4.7]] | 🚫 no | 90.5% | accuracy (text recognition in images) | 2026-04 | [link](https://textvqa.org) |
| 🥈 | [[Gemini-3.1-Pro]] | 🚫 no | 90.2% | accuracy | 2026-03 | [link](https://textvqa.org) |
| 🥉 | [[GPT-5]] | 🚫 no | 89.5% | accuracy | 2025-09 | [link](https://textvqa.org) |
| 4 | [[Qwen3.6]] | 🚫 no | 88.8% | accuracy | 2026-04 | [link](https://textvqa.org) |
| 5 | [[GPT-4o]] | 🚫 no | 85.0% | accuracy, 2024 baseline | 2024-05 | [link](https://textvqa.org) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/1904.08920](https://arxiv.org/abs/1904.08920)
- **官方主页**: [https://textvqa.org](https://textvqa.org)

<!-- AUTO-LINKS:END -->

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
