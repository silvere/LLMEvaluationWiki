---
title: "BEHAVIOR-1K"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://arxiv.org/abs/2403.09227"
  - "https://github.com/StanfordVL/BEHAVIOR-1K"
aliases:
  - BEHAVIOR-1K
  - BEHAVIOR1K
domain:
  - benchmark
  - agent
dimension: D
subdimension: general
---

# BEHAVIOR-1K

> Stanford Vision and Learning Lab（[[Fei-Fei-Li]] 等）2022 推出、2024-03 v2 发布的 embodied AI benchmark：1,000 个日常家务任务（来自人类时间使用调查）+ 50 个场景 + 5,000+ 物体，搭配 OmniGibson 物理仿真。是「real-world transfer 友好的家务机器人」评测金标准，2025 NeurIPS 设 BEHAVIOR Challenge。

<!-- AUTO-LINKS:START -->

## 参考链接

- **arXiv**: [https://arxiv.org/abs/2403.09227](https://arxiv.org/abs/2403.09227)
- **GitHub**: [https://github.com/StanfordVL/BEHAVIOR-1K](https://github.com/StanfordVL/BEHAVIOR-1K)

<!-- AUTO-LINKS:END -->

## 设计

- **任务数**：1,000 个日常活动（cleaning / cooking / organizing 等）
- **场景**：50 个（house / garden / restaurant / office）
- **物体**：5,000+ 带物理与语义属性（rigid / deformable / liquid）
- **仿真**：OmniGibson —— rigid + deformable + liquid 物理 + 真实渲染
- **特色**：任务来源是「人类时间使用调查」，所以选的活动都是「人觉得机器人帮忙真有价值的」

## 评测意义

- Long-horizon + 复杂操作，目前 SOTA agent 远未解决
- 提供 sim-to-real 迁移研究（mobile manipulator 实测）
- 2025 NeurIPS BEHAVIOR Challenge 把它推为社区标准

## 相关页面

- [[Fei-Fei-Li]]
- [[Habitat]]
- [[agent-eval]]
- [[embodied-eval]]
