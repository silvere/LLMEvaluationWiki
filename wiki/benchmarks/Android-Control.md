---
title: "Android-Control"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - agent
  - multimodal
year: 2024
arxiv_id: "2406.03679"
status: active
---

# Android-Control

> Google 发布的 Android 设备控制数据集与基准，包含高层意图和低层操作两级指令，系统研究数据规模对 UI 控制 Agent 性能的影响。

## 概述

Android-Control 由 Google 研究团队（Wei Li、William Bishop、Alice Li、Chris Rawles 等）于 2024 年提出，论文"On the Effects of Data Scale on UI Control Agents"发表于 arXiv（2406.03679）。该工作的双重贡献在于：一方面构建了迄今为止任务多样性最高的 Android 设备控制数据集，另一方面系统性地研究了训练数据规模对 LLM/VLM agent 性能的影响规律。

数据集收录 15,283 条真实 Android 应用操作演示，覆盖 833 款应用、14,548 个不重复任务，每条演示都同时附有**高层指令**（high-level instruction，如"在美团上预订一家四川餐厅"）和**低层指令**（low-level instruction，如"点击第三个列表项"）。这种双层标注设计使研究者可以独立评测 agent 在自然语言意图理解与具体 UI 操作执行两个难度层次上的表现。

研究的核心发现是：在域内（in-domain）测试时，随着训练数据增加，细调模型性能可以可靠地提升，甚至可以超越零样本和少样本基线；但在域外（out-of-domain）测试时，尤其是高层指令任务，性能提升非常缓慢，仅靠增加数据量可能不足以实现鲁棒的跨应用泛化。

随后的工作（AndroidControl-Curated，2025）进一步指出原始数据集中存在歧义和事实错误，并通过数据净化创建了增强版本。

## 任务格式

- **演示总量**：15,283 条（覆盖 833 款 Android 应用）
- **唯一任务数**：14,548 个
- **题目类型**：序列操作任务（截图 + 指令 → 下一步操作预测）
- **评估方式**：动作准确率（action accuracy）；高层指令与低层指令分别评测
- **指令级别**：高层意图指令 + 低层 UI 操作指令（双标注）

## 主要指标

- **动作准确率（Action Accuracy）**：预测操作类型与目标 UI 元素是否正确；分域内/域外报告
- **高层 vs. 低层指令对比**：高层指令任务域外泛化性显著弱于低层指令任务

## 局限性

- 数据来源于特定演示采集流程，可能不完全覆盖真实用户操作的长尾分布
- 后续研究（AndroidControl-Curated）发现原始标注中存在一定比例的歧义和错误，降低了评测信度
- 静态截图 + 操作预测的设置无法评测 agent 在动态交互环境中的完整任务规划能力

## 相关页面

- [[agent-eval]]
- [[multimodal-eval]]
- [[SWE-bench-Verified]]
