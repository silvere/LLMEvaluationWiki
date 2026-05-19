---
title: "Embodied AI 评测"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources: []
aliases:
  - embodied-eval
  - embodied AI evaluation
  - 具身评测
domain:
  - concept
---

# Embodied AI 评测

> 在 3D 物理仿真或真实机器人上评测 agent 完成导航、操作、家务任务的能力。与纯文本 LLM 评测最大的区别是 **sim-to-real gap**、**长 horizon 任务**、**多模态感知-控制环路**。代表 benchmark：[[Habitat]] / [[BEHAVIOR-1K]] / AI2-THOR / VirtualHome / RoboArena。

## 评测维度

- **Navigation**：PointNav / ObjectNav / Visual Navigation
- **Manipulation**：rearrangement / pick-and-place / 长 horizon assembly
- **Instruction Following**：自然语言 → 具身行动序列
- **Sim-to-Real**：仿真训练 + 真实机器人测试的迁移成功率
- **Multi-Agent / 人机协作**：[[Habitat]] 3.0 起的重要扩展

## 与 LLM agent 评测的关系

- LLM agent（[[agent-eval]]）：纯软件环境（浏览器、API）
- Embodied：3D 物理 + 视觉 + 控制
- 桥梁：VLA / OpenVLA / RT-2 等 Vision-Language-Action 模型

## 代表 benchmark

- **[[Habitat]]**：Meta 主导，仿真速度快、生态大
- **[[BEHAVIOR-1K]]**：Stanford 主导，1,000 个家务任务，长 horizon
- **AI2-THOR / RoboTHOR**：AI2 主导
- **CALVIN / RLBench**：tabletop manipulation

## 相关页面

- [[agent-eval]]
- [[Habitat]]
- [[BEHAVIOR-1K]]
- [[multimodal-eval]]
