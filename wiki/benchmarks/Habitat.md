---
title: "Habitat (Embodied AI Simulator)"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://github.com/facebookresearch/habitat-sim"
  - "https://github.com/facebookresearch/habitat-lab"
aliases:
  - Habitat
  - AI-Habitat
  - Habitat 2.0
  - Habitat-Sim
domain:
  - benchmark
  - agent
dimension: D
subdimension: general
---

# Habitat（AI Habitat）

> Meta FAIR / Facebook Reality Lab 2019 起开源的 embodied AI 仿真平台，由 Facebook Reality Lab 联合 Georgia Tech / SFU / Intel / Berkeley 维护。Habitat-Sim（C++ 高性能 3D 仿真，>10K FPS）+ Habitat-Lab（任务/agent 训练库）+ Habitat Challenge（年度竞赛）是 embodied navigation / manipulation 评测的事实标准。

<!-- AUTO-LINKS:START -->

## 参考链接

- **GitHub**: [https://github.com/facebookresearch/habitat-sim](https://github.com/facebookresearch/habitat-sim)
- **GitHub**: [https://github.com/facebookresearch/habitat-lab](https://github.com/facebookresearch/habitat-lab)

<!-- AUTO-LINKS:END -->

## 组成

- **Habitat-Sim**：高性能 3D 物理 + 渲染（>10K FPS on single GPU）；支持 Matterport3D / Replica / Gibson 等数据集
- **Habitat-Lab**：定义任务、配置 agent、训练 + benchmark
- **Habitat 2.0（2021）**：Home Assistant Benchmark（HAB）—— 整理房间、归置 grocery、布置餐桌等 mobile manipulation
- **Habitat 3.0（2023）**：human-robot collaboration 场景

## Habitat Challenge

- **PointNav / ObjectNav** —— 室内导航
- **Rearrangement** —— 物体重排
- 年度 CVPR 竞赛是 embodied AI 社区主要交流场

## 与其他 embodied benchmark 关系

- [[BEHAVIOR-1K]]（Stanford OmniGibson）：物理 fidelity 更高、任务更长 horizon
- Habitat 更早、生态更大、仿真速度更快

## 相关页面

- [[BEHAVIOR-1K]]
- [[Meta-AI]]
- [[agent-eval]]
- [[embodied-eval]]
