---
title: "Multilingual MMBench"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
  - multilingual
year: 2024
arxiv_id: "2406.16125"
status: active
---

# Multilingual MMBench

> MMBench 的多语言扩展版本，将标准 MMBench 评测题目翻译至多种语言，评测多模态模型的跨语言视觉理解能力。

## 概述

Multilingual MMBench 于 2024 年发布，是在原始 MMBench（英文多模态评测基准）基础上构建的多语言扩展版本。该基准将 MMBench 的评测题目系统性地翻译至多种语言（包括中文、阿拉伯语、法语、德语、印地语、西班牙语等），以评测多模态大语言模型在不同语言环境下的视觉理解能力是否一致。

Multilingual MMBench 的核心价值在于揭示多模态模型的**语言一致性**问题：同一道视觉题目以不同语言提问时，模型是否能给出同等准确的答案？研究表明，大多数多模态模型在非英语语言下表现显著下降，尤其是低资源语言。

该基准覆盖 MMBench 的全部能力维度（包括感知、推理、知识等子任务），允许直接比较模型在英文与其他语言下的性能差距。

## 任务格式

- 基于 MMBench 题目，翻译至 10+ 种语言
- 多选题（MCQ），与原版 MMBench 格式一致
- 每种语言覆盖 MMBench 全部或大部分题目
- 支持跨语言性能对比分析

## 主要指标

- **各语言准确率**：每种语言下的 MMBench 准确率，主要指标
- **跨语言性能差距**：相对于英文版本的准确率下降幅度

## 局限性

- 翻译质量直接影响评测有效性，机器翻译可能引入语义偏差，尤其对低资源语言。
- 部分视觉内容（如英文标牌、英文文档图像）在非英语语境下存在天然语言不一致，题目设计有待改进。
- 当前覆盖的语言数量有限，未能涵盖所有主要非英语语言。

## 相关页面

- [[XBench]]
- [[CLUEWSC]]
- [[AlignBench]]
