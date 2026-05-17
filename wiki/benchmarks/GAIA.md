---
title: "GAIA (General AI Assistants)"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [agent, reasoning]
language: en
year: 2023
authors: ["Grégoire Mialon", "Clémentine Fourrier", "Craig Swift", "Thomas Wolf", "Yann LeCun", "Thomas Scialom"]
arxiv_id: "2311.12983"
official_url: "https://huggingface.co/datasets/gaia-benchmark/GAIA"
license: "CC BY-NC 4.0"
size: 466
format: open-ended
status: active
saturation_threshold: 0.85
sources:
  - "Mialon, G., et al. (2023). GAIA: A Benchmark for General AI Assistants. ICLR 2024."
---

# GAIA

## 概述

GAIA（General AI Assistants）是由 Meta AI Research 和 [[Hugging-Face|Hugging Face]] 于 2023 年提出的通用 AI 助手评测基准，旨在测试 AI 系统作为**真实世界任务助手**的综合能力。GAIA 的核心理念是：一个真正有用的 AI 助手应当能够处理需要**多步骤规划、工具使用、网络检索、文件处理**等组合能力的现实任务。

## 设计理念

GAIA 的独特之处在于其"反常识"的难度设定：

- **对人类简单，对 AI 困难**：GAIA 的题目对具备搜索和工具使用能力的人类来说相对直接（人类平均准确率约 92%），但对当时的顶级 AI 模型极具挑战（GPT-4 with plugins 约 15%）。
- **真实世界锚定**：所有问题来自真实的信息需求，答案有明确的、可验证的正确答案。

## 数据构成

GAIA 包含 466 道题目，按难度分为三个等级：

| 难度等级 | 描述 | 数量 |
|---------|------|------|
| **Level 1** | 单步工具调用可解决 | ~165 |
| **Level 2** | 需要 2-5 步工具调用和推理 | ~230 |
| **Level 3** | 需要多步规划和复杂工具组合 | ~71 |

题目类型涵盖：网络搜索、PDF/表格读取、图像分析、代码执行、多文件处理等。

## 典型任务示例

- "在这份 PDF 财报的第 3 页，表格中第 2 季度的营收比第 1 季度增长了多少百分比？"（需要文件读取+计算）
- "找出 2023 年诺贝尔物理学奖得主在获奖前最后一篇论文的发表日期"（需要搜索+信息过滤）
- "从这张地图图片中识别出所有标注的城市，并按纬度从北到南排序"（需要视觉理解+地理知识）

## 评测方法

GAIA 使用**精确字符串匹配**或程序化等价判断（如数字比较、日期格式归一化）来验证答案。这种设计避免了 LLM-as-Judge 的主观性，确保评测结果可重复。答案通常为简短的事实性回答（数字、名称、日期等）。

## 当前挑战与进展

| 模型/系统 | Level 1 | Level 2 | Level 3 | 总体 |
|-----------|---------|---------|---------|------|
| 人类基线 | ~95% | ~90% | ~85% | ~92% |
| GPT-4 (2023) | ~36% | ~11% | ~0% | ~15% |
| 顶级 Agent (2024-2025) | ~70%+ | ~40%+ | ~10%+ | ~40%+ |

随着智能体（Agent）框架的快速发展，2024-2025 年间顶级系统的 GAIA 得分有了显著提升，但与人类水平仍有较大差距。

## 重要意义

GAIA 将评测重心从"知识问答"转向"任务完成能力"，代表了从静态知识评测向**智能体能力评测**的范式转变：

1. 推动了 ReAct、AutoGPT、OpenAI Assistants 等 AI Agent 框架的系统性评测
2. 提供了真实人类基线对比，使"人类水平"有了具体量化参照
3. 其答案可自动验证的设计为大规模 Agent 评测提供了方法论参考

## 局限性

- 数据量较小（466 题），可能存在较大方差
- 问题分布可能随时间失效（如依赖当前网页内容）
- 难度分级有一定主观性

## 相关基准

- **WebArena**：真实 Web 浏览环境中的任务完成评测
- **AgentBench**：多任务智能体综合评测
- **τ-bench**：真实 API 工具调用场景评测
