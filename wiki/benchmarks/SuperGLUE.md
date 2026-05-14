---
title: "SuperGLUE"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning, knowledge]
language: en
year: 2019
authors: ["Wang et al."]
arxiv_id: "1905.07830"
official_url: "https://super.gluebenchmark.com/"
license: "Multiple"
size: 0
format: multiple-choice
status: saturated
saturation_threshold: 0.90
sources: []
---

# SuperGLUE

> GLUE 的升级版，包含 8 个更具挑战性的 NLP 任务，推动了语言理解研究的进一步深化。

## 概述

SuperGLUE 由 Wang 等人于 2019 年提出（发表于 NeurIPS 2019），在 GLUE 于 2019 年初迅速饱和后推出。SuperGLUE 包含 8 个更困难的任务，旨在为研究社区提供一个持续有挑战性的评测平台。

SuperGLUE 包含的 8 个子任务：
1. **BoolQ** - 是非问答（来自 Google 搜索）
2. **CB** - 三元蕴含（CommitmentBank）
3. **COPA** - 因果推理（Choice of Plausible Alternatives）
4. **MultiRC** - 多句子阅读理解
5. **ReCoRD** - 阅读理解中的常识推理
6. **RTE** - 文本蕴含识别（扩展版）
7. **WiC** - 词义消歧（Words in Context）
8. **WSC** - Winograd Schema 挑战

SuperGLUE 还引入了专家验证的人类基线（约 89.8 分），并要求模型在所有任务上进行宏平均。

尽管设计更具挑战性，但随着 GPT-3、T5 等大型模型的出现，SuperGLUE 也在 2021 年前后趋于饱和，顶尖模型超越人类水平。这表明传统 NLU 基准已难以区分当代大型语言模型的能力差异。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2019 |
| 任务数量 | 8 个子任务 |
| 格式 | 分类/问答（按任务不同） |
| 领域 | 通用语言理解 |
| 语言 | 英文 |
| 许可证 | 各任务许可证不同 |

## SOTA 表现

SuperGLUE 已趋于饱和，顶尖大型语言模型均超越人类基线（约 89.8 分）。已不再作为有效的区分性基准。

## 主要挑战与局限

- **趋于饱和**：大型语言模型时代前已被超越
- **任务格式多样但有限**：8 个任务无法全面覆盖语言理解的各个维度
- **部分任务规模小**：CB（250 训练样本）、COPA（400 训练样本）等规模极小
- **英文单一**：不适用于多语言能力评测
- **已成历史性基准**：当前研究已转向 MMLU、BBH 等更具挑战性的基准

## 相关页面

- [[GLUE]]
- [[BoolQ]]
- [[COPA]]
- [[MultiNLI]]
- [[MMLU]]
