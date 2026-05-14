---
title: "API-Bank"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [agent]
language: en
year: 2023
authors: ["Minghao Li", "Feifan Song", "Bowen Yu", "Haiyang Yu", "Zhoujun Li", "Fei Huang", "Yongbin Li"]
arxiv_id: "2304.08244"
official_url: "https://github.com/AlibabaResearch/DAMO-ConvAI/tree/main/api-bank"
license: "Apache 2.0"
size: 2138
format: open-ended
status: active
saturation_threshold: 0.80
sources:
  - "Li, M., et al. (2023). API-Bank: A Comprehensive Benchmark for Tool-Augmented LLMs. EMNLP 2023."
---

# API-Bank

## 概述

API-Bank 是由阿里巴巴达摩院于 2023 年发布的 API 调用能力综合评测基准，旨在系统性地评测大型语言模型在工具增强（tool-augmented）场景下的三个层次能力：**调用计划**（是否需要调用 API）、**API 检索**（找到正确的 API）和 **API 调用**（正确填充参数并执行）。

## 设计理念

API-Bank 将工具使用能力解构为三个递进层次：

| 层次 | 任务 | 描述 |
|------|------|------|
| **Level 1** | 调用判断 | 判断当前请求是否需要调用外部 API |
| **Level 2** | API 检索与调用 | 从候选列表中选择正确 API 并填充参数 |
| **Level 3** | 计划与调用 | 将复杂请求分解为多步 API 调用序列并执行 |

## 数据构成

API-Bank 包含 73 种 API（涵盖搜索、天气、时间、地图、金融等类别）和约 2,138 条测试样本：

- **对话样本**：多轮对话场景中的 API 调用测试
- **单轮样本**：独立的 API 调用请求
- **多步样本**：需要顺序调用多个 API 的复杂任务

每个样本包含用户请求、可用 API 列表（含文档说明）、标准调用序列和期望回答。

## 评测指标

- **调用准确率（Call Accuracy）**：API 选择和参数填充均正确的比例
- **计划准确率（Plan Accuracy）**：多步调用中每一步均正确的比例
- **应答质量（Response Quality）**：最终自然语言回答的信息准确性

## 与 ToolBench 的对比

| 维度 | API-Bank | ToolBench |
|------|----------|-----------|
| API 数量 | 73 种 | 16,000+ |
| 评测层次 | 三层递进 | 单层综合 |
| 多步推理 | 支持 | 支持 |
| 评测粒度 | 细粒度（三层） | 整体（Pass Rate）|
| 场景多样性 | 有限 | 极丰富 |

## 核心发现

1. **Level 1（调用判断）**：主流 LLM 在简单场景下表现较好，但在"不需要调用 API 也能回答"的场景下容易产生过度调用。

2. **Level 2（API 选择）**：当候选 API 语义相似时，LLM 容易混淆，错误率显著上升。

3. **Level 3（多步规划）**：需要 3 步以上调用的任务对所有模型都构成显著挑战，GPT-4 以外的模型成功率普遍较低。

## 意义

API-Bank 通过三层次解构揭示了工具使用能力的内部结构，帮助研究者精准定位模型在哪个子能力上存在瓶颈，而非仅获得一个整体成功率分数。这一细粒度评测框架对工具增强 LLM 的研究具有重要参考价值。

## 局限性

- 73 种 API 的覆盖范围相对有限
- 仅包含中文和英文，多语言覆盖不足
- 数据集规模（2,138 条）相对较小，高难度子集的统计显著性有限

## 相关基准

- **ToolBench**：大规模（16k API）真实工具调用评测
- **MINT**：多轮反馈工具使用评测
- **τ-bench**：真实业务场景 API 调用代理评测
