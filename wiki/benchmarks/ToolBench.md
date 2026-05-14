---
title: "ToolBench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [agent]
language: en
year: 2023
authors: ["Yujia Qin", "Shengding Hu", "Yankai Lin", "Weize Chen", "Ning Ding", "Ganqu Cui", "Zheni Zeng", "Yufei Huang", "Chaojun Xiao", "Chi Han", "Yi Ren Fung", "Yusheng Su", "Huadong Wang", "Cheng Qian", "Rundong Pan", "Yuqi Liang", "Xingyao Wang", "Ruobing Xie", "Jie Zhou", "Maosong Sun", "Zhiyuan Liu"]
arxiv_id: "2307.16789"
official_url: "https://github.com/OpenBMB/ToolBench"
license: "Apache 2.0"
size: 126486
format: open-ended
status: active
saturation_threshold: 0.75
sources:
  - "Qin, Y., et al. (2023). ToolLLM: Facilitating Large Language Models to Master 16000+ Real-world APIs. ICLR 2024."
---

# ToolBench

## 概述

ToolBench（又称 ToolLLM 配套基准）是由清华大学 OpenBMB 团队于 2023 年发布的大规模工具使用能力评测基准，通过 **RapidAPI** 平台接入超过 16,000 个真实世界 API，评测 LLM 在多步骤工具调用场景下完成复杂任务的能力。ToolBench 是目前规模最大的真实 API 工具使用基准之一。

## 数据构成

ToolBench 包含约 126,486 个问题-解决方案对，按照工具复杂度分为三个层次：

| 层次 | 描述 | 规模 |
|------|------|------|
| **I1**（单工具） | 仅使用单个 API 的工具调用 | ~37k |
| **I2**（同类别多工具） | 使用同类别下多个 API 协同 | ~84k |
| **I3**（跨类别多工具） | 跨类别的多 API 复杂组合 | ~~5k |

覆盖的 API 类别包括：金融、天气、地图、社交媒体、电商、新闻、运动、娱乐等 49 个大类。

## 核心组件

1. **数据收集**：使用 ChatGPT 自动构造（指令+解决方案），经过人工质量过滤
2. **DFSDT 推理算法**：深度优先搜索决策树（Depth First Search-based Decision Tree），用于生成树状工具调用路径
3. **ToolEval 评测器**：基于 ChatGPT 的自动评测器，评估解决方案的可通过率（Pass Rate）和偏好胜率（Win Rate）

## 评测指标

- **Pass Rate**：解决方案是否可通过验证（工具调用返回合理结果且回答了问题）
- **Win Rate**：与 ChatGPT（text-davinci-003）标准解答相比的胜率，通过 GPT-4 评判

## 配套模型：ToolLLaMA

基于 ToolBench 训练数据，研究团队微调了 ToolLLaMA-2-7B 模型，在工具使用任务上达到接近 ChatGPT 的性能，证明了数据集用于能力注入的价值。

## 技术挑战

ToolBench 的难点包括：

1. **工具选择**：从 16,000+ API 中识别出当前任务最相关的工具
2. **参数推断**：根据 API 文档和用户请求正确填充调用参数
3. **错误处理**：在工具返回错误或非预期结果时进行路径回退和重规划
4. **多步推理**：将复杂请求分解为多个连续工具调用的有序序列

## 局限性

- **API 时效性**：RapidAPI 上的 API 会随时间变化，可能导致历史解决方案失效
- **评测自动化偏差**：使用 ChatGPT 评判质量，可能存在系统性偏差
- **分布偏斜**：单工具任务数量远多于跨类别多工具任务，难度分布不均
- **真实场景差距**：API 调用通过 HTTP 模拟，与真实生产环境存在差距

## 相关基准

- **API-Bank**：API 调用能力评测，规模较小但更精准
- **MINT**：多轮反馈工具使用评测
- **τ-bench**：真实业务场景工具调用评测
- **AgentBench**：综合代理能力评测
