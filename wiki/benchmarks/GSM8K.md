---
title: "GSM8K"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
domain: [math, reasoning]
language: en
year: 2021
authors: ["Cobbe et al."]
arxiv_id: ""
official_url: "https://github.com/openai/grade-school-math"
license: "MIT"
size: 8500
format: open-ended
status: saturated
saturation_threshold: 0.95
sources: [""]
---

# GSM8K（Grade School Math 8K）

> 小学数学文字题数据集，曾是衡量语言模型数学推理的主流基准，2024-2025 年顶级模型已达 95%+，完全饱和。

## 概述

GSM8K 由 OpenAI 的 Cobbe 等人于 2021 年发布，包含 8,500 道小学级别数学文字题（7,473 道训练集，1,319 道测试集）。每道题需要 2 至 8 步数学运算，使用自然语言描述情景，答案为整数或简单小数。题目来自人工撰写，确保多样性和无歧义性。

GSM8K 发布时针对的是当时语言模型在数学推理上的明显短板——彼时的模型即便在简单文字题上也频繁出错，该基准提供了一个难度适中、可量化追踪进步的评测平台。配合思维链提示（Chain-of-Thought），模型在 GSM8K 上的提升尤为显著，该数据集因此也成为研究和验证思维链技术效果的重要工具。

然而，GSM8K 随着模型能力的快速进步迅速走向饱和。2024-2025 年，顶级模型的准确率已超过 95%，测试集仅 1,319 道题的规模在这一水平下几乎没有统计区分力。目前 GSM8K 在前沿模型评测中已基本退居参考地位，更有挑战性的 MATH、AIME 等基准已成为数学推理评测的新主流。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2021 |
| 大小 | 8,500 题（训练集 7,473，测试集 1,319） |
| 题目格式 | 开放性数学文字题（open-ended） |
| 覆盖领域 | 数学、推理（小学数学，2-8 步运算） |
| 语言 | 英文 |
| 许可证 | MIT |

## SOTA 表现

- 顶级模型（2024-2025 年）：95%+（各主流前沿模型）

## 主要挑战与局限

- **完全饱和**：顶级模型准确率已超过 95%，测试集规模（1,319 题）在该分数区间已无法提供有效区分，继续将 GSM8K 作为主要数学评测指标意义有限。
- **数据污染风险高**：GSM8K 题目已公开多年，已知部分训练数据中包含原题或高度相似内容。研究表明，若将测试集题目稍加改写（数字变换、情景替换），部分模型的性能会有明显下滑，暗示高分中存在记忆成分。
- **难度不足**：原始设计面向小学数学，对于当前前沿模型来说难度远低于其实际能力边界，不适合用于评测数学推理的上限能力。建议改用 MATH 或 AIME。

## 饱和后的接替方向（2026 新基准）

GSM8K 完全饱和后，业界向**更难数学**和**领域数学**两个方向迁移：

- **数学家级证明草稿**：[[2604.01754|LiveMathematicianBench]]（He 等，2026-04）将评测从"题目计算"升级到"数学家级别推理与证明草稿"。前沿模型在 GSM8K 上 95%+ 的"高分"在这一基准上**坍缩至 43.5%**，证明 GSM8K 的高分**完全不代表数学推理上限**。
- **饱和区间的统计估计**：[[2605.11209|Measuring Five-Nines Reliability]] 证明在 99%+ 饱和区间，常规二项式估计需要 n ≈ 10⁷ 样本才能稳定区分模型——GSM8K 的 1319 题在此规模上**根本无法区分顶级模型**。详见 [[benchmark-saturation]]。
- **领域数学**：[[2410.04526|FAMMA]] 金融多模态多语言 QA；[[2602.17072|BankMathBench]] 银行数值推理。展示 GSM8K 上的高分**无法泛化**到金融等专业数值推理领域。

## 相关页面

- [[MATH]]
- [[AIME]]
- [[benchmark-saturation]]
- [[data-contamination]]

## 近期相关研究（arXiv 2026-05 自动入库）

> 以下为 ingest pipeline 筛出的高质量 LLM 评测论文（quality ≥18/25），自动关联到本页主题。

- [[2509.24210|BeyondBench: Contamination-Resistant Evaluation of Reasoning in Language Models]] · Gaurav Srivastava 等 · score 18/25
- [[2406.19314|LiveBench: A Challenging, Contamination-Limited LLM Benchmark]] · Colin White 等 · score 18/25
- [[2311.09154|CLEAN-EVAL: Clean Evaluation on Contaminated Large Language Models]] · Wenhong Zhu 等 · score 18/25

## 主流模型得分（来自 wiki/models/）

> 以下分数来自 wiki/models/ 中各模型的官方/技术报告数据（汇总自 model spec 页）。准确数字以模型方公布为准。

| 模型 | 分数 | 备注 |
|------|------|------|
| [[Qwen2.5-72B|Qwen2.5 系列（含 72B / Coder / Math / VL）]] | 约 95.8% |  |
