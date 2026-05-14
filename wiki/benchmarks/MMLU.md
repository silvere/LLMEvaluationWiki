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

MMLU 由 Dan Hendrycks 等人于 2020 年发布，目标是衡量语言模型在人类知识广度上的理解能力。它从初等数学、美国历史，到法律、医学、职业会计等专业领域，共覆盖 57 个不同学科，题目以 4 选项选择题形式呈现，总计 15,908 道题。

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

## 相关页面

- [[MMLU-Pro]]
- [[GPQA]]
- [[benchmark-saturation]]
- [[data-contamination]]
