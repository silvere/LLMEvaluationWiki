---
title: "MINT (Multi-turn INteractive Tool-use)"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [agent]
language: en
year: 2023
authors: ["Xingyao Wang", "Zihan Wang", "Jiateng Liu", "Yangyi Chen", "Lifan Yuan", "Hao Peng", "Heng Ji"]
arxiv_id: "2309.10691"
official_url: "https://github.com/xingyaoww/mint-bench"
license: "MIT"
size: 586
format: open-ended
status: active
saturation_threshold: 0.80
sources:
  - "Wang, X., et al. (2023). MINT: Evaluating LLMs in Multi-turn Interaction with Tools and Language Feedback. ICLR 2024."
---

# MINT

## 概述

MINT（Multi-turn INteractive Tool-use）是由 UIUC 等机构于 2023 年提出的多轮交互工具使用评测基准，专注于测试 LLM 在**反馈驱动**的多轮交互中使用工具（代码执行器、搜索引擎等）完成任务的能力。MINT 的核心创新在于引入了**语言反馈机制**，允许人类或 LLM 模拟器在任务执行过程中提供自然语言纠正信号。

## 核心设计

MINT 评测框架的独特之处：

1. **工具辅助**：代理可调用 Python 代码执行器和搜索引擎，测试工具调用的准确性
2. **语言反馈**：在代理出错时，反馈器（人类或 LLM）提供自然语言纠正，代理需根据反馈修正行为
3. **多轮交互**：通过 k 轮反馈循环（通常 k=5）测试代理的自我纠错能力

```
代理 → 执行工具 → 获得结果/反馈 → 调整策略 → [重复 k 轮]
```

## 任务来源

MINT 整合了多个现有基准的题目，并将其重构为工具辅助的交互式格式：

| 来源 | 类型 | 数量 |
|------|------|------|
| MATH | 数学推理 | ~100 |
| HumanEval | 代码生成 | ~70 |
| MBPP | 代码生成 | ~100 |
| GSM8K | 数学推理 | ~100 |
| ALFWorld | 具身任务 | ~70 |
| HotpotQA | 多跳问答 | ~100 |
| FEVER | 事实核查 | ~46 |

合计约 586 道题目。

## 评测指标

- **成功率（Success Rate @k）**：在 k 轮反馈内完成任务的比例
- **Turn 效率**：平均完成任务所需反馈轮数
- **工具使用准确率**：调用正确工具和参数的比例

## 核心发现

1. **语言反馈显著提升性能**：允许 5 轮反馈后，GPT-4 在所有任务上的平均成功率比零轮反馈提升约 15-30 个百分点。

2. **工具使用能力分化明显**：不同 LLM 在利用工具反馈的能力上差异显著，较小的模型往往无法有效利用纠错反馈。

3. **任务类型决定工具依赖度**：数学和代码任务受益于代码执行工具最多，知识密集型任务受益于搜索工具。

## 与其他基准的区别

MINT 与 ToolBench、API-Bank 等工具使用基准的区别在于：
- **交互性**：MINT 专注于多轮反馈循环，而非单轮工具调用
- **纠错能力**：评测代理从错误中学习恢复的能力
- **综合任务**：跨推理、代码、知识多种任务类型

## 局限性

- 反馈质量高度依赖反馈器（人类或 GPT-4）的质量
- 总题量（586）相对较少
- 工具集有限（主要是代码执行器和搜索），不覆盖其他类型 API

## 相关基准

- **τ-bench**：真实业务 API 调用的多轮代理评测
- **ToolBench**：16k 真实 API 工具调用评测
- **InterCode**：代码执行交互代理评测
