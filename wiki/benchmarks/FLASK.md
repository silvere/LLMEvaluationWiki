---
title: "FLASK"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [instruction-following, reasoning, safety]
language: en
year: 2023
authors: ["Ye et al."]
arxiv_id: "2307.10928"
official_url: "https://github.com/kaistAI/FLASK"
license: "Apache-2.0"
size: 1740
format: open-ended
status: active
saturation_threshold: 0.90
sources: []
---

# FLASK（Fine-grained Language Model Evaluation based on Alignment SKill Sets）

> 基于 12 个细粒度技能维度的语言模型综合评测框架，支持人工和 LLM-as-Judge 两种评测方式。

## 概述

FLASK 由 Ye 等人于 2023 年提出，来自韩国科学技术院（KAIST）。该框架的核心贡献是将语言模型的能力分解为 **12 个细粒度技能维度**，每道题都标注了评测所需的具体技能，实现了比传统"宏观平均"更精细的能力分析。

FLASK 定义的 12 个技能维度：
1. **逻辑正确性**（Logical Correctness）
2. **忠实度**（Faithfulness）
3. **有用性**（Helpfulness）
4. **指令跟随**（Instruction Following）
5. **无害性**（Harmlessness）
6. **推理步骤质量**（Reasoning Steps）
7. **元认知**（Metacognition）
8. **事实正确性**（Factuality）
9. **信息量**（Informativeness）
10. **稳健性**（Robustness）
11. **完整性**（Completeness）
12. **简洁性**（Conciseness）

数据集包含约 1,740 个实例，来源于多个现有指令数据集，并通过 GPT-4 标注每道题涉及的技能维度。评测支持两种模式：
- **人工评测**：招募专业标注者按技能维度打分
- **LLM 自动评测**：使用 GPT-4 作为 Judge，按技能维度分别打分

FLASK 对理解模型在各个能力维度上的表现差异具有重要价值，可以帮助研究者识别模型的具体弱点。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 数据量 | 约 1,740 个实例 |
| 格式 | 开放式（LLM-as-Judge 多维度评分） |
| 领域 | 多维度综合能力 |
| 语言 | 英文 |
| 许可证 | Apache-2.0 |
| 评分维度 | 12 个技能维度 |

## SOTA 表现

各模型在不同技能维度上的表现各有差异。顶尖模型（GPT-4、Claude 3 等）在大多数维度上表现优秀。具体数据见原论文及 GitHub 排行榜。

## 主要挑战与局限

- **维度间相关性**：12 个维度并非完全独立，可能存在共线性
- **依赖 GPT-4 评分**：自动评测模式的可靠性受限于 GPT-4 的评判能力
- **技能定义主观性**：12 个维度的定义和边界存在主观性
- **评测成本**：每道题需要在 12 个维度上分别打分，成本较高
- **覆盖范围**：1,740 个实例可能不足以覆盖所有场景

## 相关页面

- [[MT-Bench]]
- [[AlpacaEval]]
- [[WildBench]]
- [[FollowBench]]
- [[IFEval]]
