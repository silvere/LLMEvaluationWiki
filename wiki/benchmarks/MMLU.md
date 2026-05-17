---
title: "MMLU"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
domain: [knowledge, reasoning, multilingual]
language: en
year: 2020
authors: ["Hendrycks et al."]
arxiv_id: "2009.03300"
official_url: "https://github.com/hendrycks/test"
license: "MIT"
size: 15908
format: multiple-choice
status: saturated
saturation_threshold: 0.90
sources: [""]
---

# MMLU（Massive Multitask Language Understanding）

> 覆盖 57 个学科的多任务知识评测基准，曾是最广泛引用的综合知识评测标准，当前顶级模型已接近饱和。

## 概述

MMLU 由 [[Dan-Hendrycks|Dan Hendrycks]] 等人于 2020 年发布，目标是衡量语言模型在人类知识广度上的理解能力。它从初等数学、美国历史，到法律、医学、职业会计等专业领域，共覆盖 57 个不同学科，题目以 4 选项选择题形式呈现，总计 15,908 道题。

这一设计的核心理念是"多任务"——区别于单一领域基准，MMLU 试图评测模型在横跨人文、STEM、社会科学、专业技能等多个维度上的表现，并以此作为综合知识能力的代理指标。基准难度从初中水平到专业资格考试不等，低难度题验证基础理解，高难度题（如医师执照、律师资格类题目）评估专业知识深度。

MMLU 发布后迅速成为学术界和工业界最常引用的 LLM 综合能力基准之一。几乎所有主流模型发布时都会报告 MMLU 分数，这使其成为模型代际比较的重要参照点。然而，随着 GPT-4 等模型在 2023 年后成绩迅速提升，2024-2025 年的顶级模型已超过 88%，逼近该基准的实际天花板。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2020 |
| 大小 | 15,908 题（57 个学科） |
| 题目格式 | 4 选项选择题（multiple-choice） |
| 覆盖领域 | 知识、推理、多语言（57 学科跨 STEM/人文/社科/专业领域） |
| 语言 | 英文（含部分多语言扩展变体） |
| 许可证 | MIT |

## SOTA 表现

- 顶级模型（2024-2025 年）：88%+（各主流前沿模型，具体来源见各模型报告）
- 人类专家估计基准：约 89.8%（Hendrycks et al. 原始论文估算）

## 主要挑战与局限

- **接近饱和**：截至 2025 年，顶级模型分数已超过 88%，与人类专家估算上限（约 89.8%）差距极小，继续作为主要评测指标的区分度已大幅降低。建议以 MMLU-Pro 或 GPQA 作为更有区分力的替代。
- **数据污染风险**：MMLU 题目来自公开考试资料，且基准已存在多年，多个研究表明顶级模型训练数据中极可能包含原题或高度相似内容，导致分数虚高。
- **随机猜测基线较高**：4 选项选择题的随机基线为 25%，部分学科题目数量少（每科约 100-300 题），统计方差较大，单科分数的可靠性有限。

## 抗污染版与领域专家 QA 替代（2024–2026 新基准）

针对 MMLU 的污染与饱和问题，近期出现两条主线：**抗污染重制版**与**专家级领域 QA**：

- **去污染版 MMLU**：[[2412.15194|MMLU-CF]]（Qihao Zhao 等，2024-12）首次系统重建 MMLU 的"无污染"版本，通过对原 MMLU 题目进行新表述并验证未出现在预训练集中。提供与原 MMLU 可对比的研究基线。
- **清洁评估**：[[2311.09154|CLEAN-EVAL]]（Wenhong Zhu 等，2023-11）从评估方法论角度对受污染 LLM 提出"清洁评测"框架。
- **病毒学专家**：[[2504.16137|Virology Capabilities Test (VCT)]]（Jasper Götting 等）在病毒学专家 QA 上达 43.8% 准确率——超越 94% 病毒学家在其专长领域。证明 MMLU 的"研究生级别"标签**在真正专业领域已不足以衡量上限**。
- **金融多语言专业 QA**：[[2410.04526|FAMMA]]（Siqiao Xue 等）跨语言金融图表多模态推理，是 MMLU 不覆盖的专业领域。
- **税务结构化评估**：[[2604.08948|TaxPraBen]]（Gang Hu 等）提供结构化的税务专家 QA。
- **历史职业评估**：[[2604.24690|Can LLMs Act as Historians?]]（Lirong Gao 等）引入 ProHist-Bench，评估职业历史研究能力。
- **谈判推理**：[[2605.14537|Cattle Trade]]（Robert Müller 等）多 Agent 谈判推理——MMLU 完全不覆盖的对抗/互动推理能力。

## 相关页面

- [[MMLU-Pro]]
- [[GPQA]]
- [[benchmark-saturation]]
- [[data-contamination]]

## 近期相关研究（arXiv 2026-05 自动入库）

> 以下为 ingest pipeline 筛出的高质量 LLM 评测论文（quality ≥18/25），自动关联到本页主题。

- [[2412.15194|MMLU-CF: A Contamination-free Multi-task Language Understanding Benchmark]] · Qihao Zhao 等 · score 21/25
- [[2311.09154|CLEAN-EVAL: Clean Evaluation on Contaminated Large Language Models]] · Wenhong Zhu 等 · score 18/25

## 主流模型得分（来自 wiki/models/）

> 以下分数来自 wiki/models/ 中各模型的官方/技术报告数据（汇总自 model spec 页）。准确数字以模型方公布为准。

| 模型 | 分数 | 备注 |
|------|------|------|
| [[DeepSeek-R1|DeepSeek R1]] | 90.8% |  |
| [[GPT-4.1|GPT-4.1]] | 约 90.2% |  |
| [[GPT-4o|GPT-4o]] | 88.7% |  |
| [[Claude-3.5-Sonnet|Claude 3.5 Sonnet]] | 88.7% |  |
| [[DeepSeek-V3|DeepSeek V3 / V3.1]] | 88.5% |  |
| [[Claude-Opus-4|Claude Opus 4 / Opus 4.1]] | 约 88% | Pro |
| [[Kimi-K1.5|Kimi K1.5]] | 87.4% |  |
| [[Llama-3.3-70B|Llama 3.3 70B]] | 约 86% |  |
| [[Gemini-1.5-Pro|Gemini 1.5 Pro]] | 85.9% |  |
| [[Qwen2.5-72B|Qwen2.5 系列（含 72B / Coder / Math / VL）]] | 约 85.0% |  |
| [[Doubao-1.5-Pro|Doubao 1.5 Pro]] | 约 82% |  |
| [[Yi-Lightning|Yi-Lightning]] | 约 81% |  |
| [[Llama-4|Llama 4 (Maverick / Scout)]] | 约 80.5% | Pro (Maverick |
| [[Qwen3|Qwen3 系列（235B-A22B / 32B / Thinking）]] | 约 80% | Pro |
| [[Gemini-2.0-Flash|Gemini 2.0 Flash]] | 76.4% | Pro |
| [[DeepSeek-V3|DeepSeek V3 / V3.1]] | 75.9% | -Pro |
