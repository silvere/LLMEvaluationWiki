---
title: "All-Angles-Bench"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
  - reasoning
year: 2025
arxiv_id: "2504.15280"
status: active
---

# All-Angles-Bench

> 专注于多视角三维场景理解的 MLLM 评测基准，通过来自 EGO4D-EXO 和 EgoHumans 的真实多视角场景，系统揭示现有模型在跨视角对应推理上的能力缺口。

## 概述

All-Angles-Bench 由 Chenyu Wang 等研究者提出，论文"Seeing from Another Perspective: Evaluating Multi-View Understanding in MLLMs"于 2025 年 4 月提交至 arXiv（2504.15280）。该基准针对一个在现有评测中被大量忽视的问题：当模型需要整合来自不同摄像机角度的视觉信息时，其理解能力会发生怎样的变化？

多视角理解是真实世界感知的核心需求。在自动驾驶、机器人操控、AR/VR 等应用中，系统必须能从不同视点下识别同一物体、判断相对位置关系、估计摄像机姿态。然而，现有 MLLM 评测（如 MMBench、MMMU）几乎全部基于单一视点图像，无法评估跨视角一致性推理能力。All-Angles-Bench 通过使用来自 EGO4D-EXO 和 EgoHumans 数据集的真实多摄像机同步拍摄场景，系统性地填补了这一评测空白。

基准包含 2,132 道经人工精心标注的多视角问答题，覆盖 90 个多样化真实场景，设计了 6 类核心任务。对 27 款主流 MLLM 的实验显示，在摄像机姿态估计任务上，人类标注者达到 88.9% 准确率，而 Gemini-2.0-Flash、Qwen2.5-VL-72B、InternVL2.5-38B 等顶级模型落后超过 50 个百分点。研究揭示了两类核心失败模式：跨视角对应关系建立失败（weak cross-view correspondence）和粗粒度摄像机姿态估计失败（poor coarse camera pose estimation）。

## 任务格式

- **问答对总量**：2,132 道（经人工标注验证）
- **场景数量**：90 个多样化真实世界场景（来源：EGO4D-EXO、EgoHumans）
- **题目类型**：视觉问答（选择题）
- **评估方式**：准确率（Accuracy）；与人类表现对比；跨视角一致性配对评测
- **6 类任务**：物体计数（counting）、属性识别（attribute identification）、相对距离（relative distance）、相对方向（relative direction）、操作任务（manipulation）、摄像机姿态估计（camera pose estimation）

## 主要指标

- **各任务准确率**：6 类任务分别报告；摄像机姿态估计对模型挑战最大（顶级 MLLM 约 40%，人类 88.9%）
- **整体准确率**：27 款模型的综合排名

## 局限性

- 数据来源于 EGO4D-EXO 和 EgoHumans 两个特定数据集，场景以室内和人物活动为主，对户外、工业等场景覆盖不足
- 题目由 MLLM 自动生成后经人工验证，初始问题质量可能受 MLLM 生成偏差影响
- 基准聚焦于静态多视角理解，尚未涵盖时序动态多视角（视频流）的推理场景

## 相关页面

- [[multimodal-eval]]
- [[LEGO-Puzzles]]
- [[MMMU]]
