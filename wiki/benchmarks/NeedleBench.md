---
title: "NeedleBench"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - long-context
  - multilingual
year: 2024
arxiv_id: "2407.11963"
status: active
aliases:
  - NeedleBench
---

# NeedleBench

> 面向中文长文本的"大海捞针"（Needle-in-Haystack）评测基准，系统评估大语言模型在超长上下文中定位和检索关键信息的能力。

## 概述

NeedleBench 由上海 AI 实验室于 2024 年发布，是专为中文设计的长上下文检索评测框架。其核心灵感来自 Needle-in-a-Haystack（NIH）测试范式：在大量无关背景文本（"干草堆"）中嵌入关键信息片段（"针"），要求模型准确检索。

不同于英文社区的原版 NIH 测试，NeedleBench 系统化扩展了挑战维度：支持从 4K 到 1024K token 的上下文长度梯度，并引入多针（Multi-Needle）场景——要求模型同时定位和整合多个分散的关键信息，模拟更真实的长文档阅读理解需求。

NeedleBench 采用中文原生语料作为背景文本，避免翻译带来的语言质量问题，更真实地反映中文大模型的实际长上下文处理能力。基准还配套了 OpenCompass 评测框架，便于社区复现和批量测评。

该基准揭示了一个普遍现象：即使声称支持 128K+ 上下文的模型，在上下文中段（而非末尾）插入关键信息时，检索准确率也会显著下降，即"上下文遗忘中间"问题（Lost in the Middle）。

## 任务格式

- **单针任务（Single-Needle）**：在指定位置嵌入一条关键事实，要求模型回答相关问题
- **多针任务（Multi-Needle）**：同时嵌入多条相关信息片段，要求模型整合后回答
- **上下文长度**：4K、8K、16K、32K、64K、128K、256K、512K、1024K token 梯度
- **插入位置**：评测关键信息在文档开头、中间、末尾时的性能差异
- **评估方式**：基于规则或 LLM 裁判的关键信息命中率

规模：覆盖 9 个长度档位 × 多个插入位置 × 单针/多针组合，数百个测试样本。

## 主要指标

- **检索准确率（Recall Accuracy）**：模型是否准确找到并复述"针"信息
- **位置鲁棒性（Position Robustness）**：不同位置插入时的性能一致性
- **多针整合分（Multi-Needle Integration）**：多针场景下信息整合的完整度
- 结果通常以热力图（位置 × 长度）可视化，直观展示性能衰减模式

## 局限性

- 主要面向中文，英文迁移性有限；英文 NIH 测试有更成熟生态
- "大海捞针"属于人工构造任务，与真实长文档问答（如法律合同分析）存在分布差距
- 多针场景的"针"数量和分布方式影响较大，不同实现间可比性须注意

## 相关页面

- [[CLongEval]]
- [[RULER]]
- [[LongBench]]
- [[LongVideoBench]]
