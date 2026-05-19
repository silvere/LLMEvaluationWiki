---
title: "Long Range Arena (LRA)"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://arxiv.org/abs/2011.04006"
aliases:
  - LRA
  - Long-Range Arena
  - Long Range Arena
domain:
  - benchmark
  - long-context
---

# Long Range Arena（LRA）

> 2020-11 由 Google Research（[[Yi-Tay]] / Mostafa Dehghani 等）发布的高效 Transformer 评测套件：1K–16K token 序列，6 个任务覆盖文本 / 图像 / 数学表达式 / 路径检索等多模态。系统对比 Reformer / Linformer / Linear / Sinkhorn / Performer / Synthesizer / Sparse / Longformer 等 10 种长序列模型，是 2020-2023 高效 Transformer 研究的事实基准。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv**: [https://arxiv.org/abs/2011.04006](https://arxiv.org/abs/2011.04006)

<!-- AUTO-LINKS:END -->

## 设计（6 任务）

- **ListOps** —— 嵌套数学表达式（最长 2K）
- **Text** —— IMDb byte-level 分类
- **Retrieval** —— ACL 文献匹配
- **Image** —— CIFAR-10 像素级分类
- **Pathfinder** —— 图像中连通路径
- **Pathfinder-X** —— Pathfinder 16K 版（绝大多数模型在此 fail）

## 影响

- 几乎所有高效 attention 论文（Mamba / S4 / RWKV / RetNet 等）都在 LRA 上对比
- Pathfinder-X 是 S4 / SSM 系列证明 Mamba 类模型优势的关键场景

## 衰退与替代

- 现代 long-context LLM 用 [[NIAH]] / [[RULER]] / [[LongBench-v2]] 等更复杂的下游任务
- LRA 仍是「高效 attention 架构 ablation」的标准对照表

## 相关页面

- [[Yi-Tay]]
- [[RULER]]
- [[NIAH]]
- [[long-context-eval]]
