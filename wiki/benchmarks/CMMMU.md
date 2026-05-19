---
title: "CMMMU"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://arxiv.org/abs/2401.11944"
  - "https://cmmmu-benchmark.github.io/"
aliases:
  - CMMMU
  - Chinese MMMU
  - C-MMMU
domain:
  - benchmark
  - multimodal
---

# CMMMU（Chinese Massive Multi-discipline Multimodal Understanding）

> 2024-01 由 [[M-A-P]] 等团队发布的中文版 [[MMMU]]：12K 道大学考试/教材题，6 学科 30 子科目，39 类图像（图表、地图、乐谱、化学结构等）。是中文多模态大学级评测的事实标准，GPT-4V 仅 42% 准确率。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv**: [https://arxiv.org/abs/2401.11944](https://arxiv.org/abs/2401.11944)
- **项目主页**: [https://cmmmu-benchmark.github.io/](https://cmmmu-benchmark.github.io/)

<!-- AUTO-LINKS:END -->

## 设计

- **题量**：12,000 道（manually collected from 大学考试 / 习题册 / 教科书）
- **6 学科**：Art & Design / Business / Science / Health & Medicine / Humanities & Social Science / Tech & Engineering
- **30 子科目**
- **39 类图像**：charts / diagrams / maps / tables / 乐谱 / 化学结构等
- **协议**：严格 follow [[MMMU]] 的标注与评测范式

## 关键结果

- GPT-4V 仅 42% 准确率
- 中文 LMM（Qwen-VL / DeepSeek-VL / InternVL 等）有专项优化空间
- 与 [[MMMU]] 配合使用，揭示中英文多模态推理 gap

## 与其他中文评测关系

- [[C-Eval]] / [[CMMLU]] —— 纯文本中文
- [[CMMMU]] —— 中文 + 多模态
- [[MMMU]] —— 英文 + 多模态

## 相关页面

- [[MMMU]]
- [[M-A-P]]
- [[multimodal-eval]]
- [[C-Eval]]
- [[CMMLU]]
