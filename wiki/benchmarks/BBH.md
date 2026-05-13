---
title: "BBH"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
domain: [reasoning, knowledge]
language: en
year: 2022
authors: ["Suzgun et al."]
arxiv_id: ""
official_url: "https://github.com/suzgunmirac/BIG-Bench-Hard"
license: ""
size: 6511
format: other
status: saturated
saturation_threshold: 0.90
sources: ["[[2026-04-llm-eval-landscape]]"]
---

# BBH（BIG-Bench Hard）

> 从 BIG-Bench 中筛选出最难的 27 个任务子集，专为评测思维链（Chain-of-Thought）推理能力而设计，2024 年后顶级模型已接近饱和。

## 概述

BBH 由 Suzgun 等人于 2022 年提出，其全称为 BIG-Bench Hard，是对 Google 主导的大型语言模型评测集 BIG-Bench 的聚焦子集。BIG-Bench 原本包含 200 余项多样化任务，但大量任务对早期语言模型来说并无区分力，要么过于简单、要么随机猜测即可蒙对。BBH 的做法是从中筛选出 27 个特定任务，选取标准是：这些任务在直接提示（few-shot direct prompting）下表现接近随机，但引入思维链提示（Chain-of-Thought prompting）后有显著提升，从而专门考察模型的推理链能力。

数据集共包含 6,511 道题，分布在 27 个子集中，涵盖逻辑推理、因果推断、时序推理、词语消歧、算法执行等多种推理类型。题目格式混合，部分为选择题，部分为开放性生成任务。BBH 在 2022-2023 年间被广泛用于评测思维链技术的有效性，也成为衡量模型推理进步的重要参照。

然而，随着 GPT-4、Claude 等顶级模型的出现，BBH 同样面临饱和问题。2024 年后，前沿模型在多个 BBH 子任务上的表现已接近天花板，整体得分逼近乃至超过 90% 阈值，区分力大幅下降。目前该基准更多作为历史参照使用，不再是最前沿模型的主要评测选项。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2022 |
| 大小 | 6,511 道题（27 个子任务） |
| 题目格式 | 混合（选择题 + 开放性生成） |
| 覆盖领域 | 推理、知识（逻辑推理、因果推断、时序推理等） |
| 语言 | 英文 |
| 许可证 | 待更新 |

## SOTA 表现

- 顶级模型（2024-2025 年）：待更新

## 主要挑战与局限

- **已接近饱和**：2024 年后，前沿模型在 BBH 整体得分上已接近 90% 阈值，多个子任务已无区分力。新的推理评测需求已转向 GPQA、AIME 等更难的基准。
- **任务异质性过高**：27 个子任务覆盖不同推理类型，将其聚合为单一总分会掩盖模型在不同推理能力上的差异，整体分数的解读需结合子任务分数分析。
- **CoT 提示依赖**：BBH 的设计前提是使用思维链提示方能体现模型能力，但不同框架下的 CoT 实现方式存在差异，使得跨机构评测结果的可比性受限。

## 相关页面

- [[MMLU]]
- [[GPQA]]
- [[benchmark-saturation]]
