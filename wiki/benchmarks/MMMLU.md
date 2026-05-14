---
title: "MMMLU"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [knowledge, multilingual]
language: en
year: 2024
authors: []
arxiv_id: ""
official_url: "https://huggingface.co/datasets/openai/MMMLU"
license: ""
size: 0
format: multiple-choice
status: active
saturation_threshold: 0.90
sources:
  - "https://huggingface.co/datasets/openai/MMMLU"
---

# MMMLU (Multilingual Massive Multitask Language Understanding)

> MMLU的多语言版本，将原版英文题目翻译为多种主要语言，用于评测大语言模型在非英语语言上的知识理解和推理能力。

## 概述

MMMLU是对Hendrycks等人原版MMLU（Massive Multitask Language Understanding）的多语言扩展，由OpenAI发布于Hugging Face平台。原版MMLU包含57个学科领域的约14,000道英文选择题，覆盖从小学到专业资格考试的广泛知识范围。

MMMLU将这些题目翻译为多种主要语言（包括中文、西班牙语、法语、德语、日语等），采用机器翻译结合人工校正的方式，旨在评测：
1. 模型在非英语语言上的知识理解能力
2. 不同语言之间的性能差距
3. 多语言模型在跨语言泛化上的表现

通过对比同一模型在不同语言版本上的得分，可以量化模型的"英语偏向"（English-centricity）程度。

## 规格

| 属性 | 值 |
|------|-----|
| 基础数据集 | MMLU（57个领域，~14,000道题） |
| 覆盖语言 | 多种主要语言（具体数量以最新版为准） |
| 题目格式 | 四选一选择题 |
| 翻译方式 | 机器翻译 + 人工校正 |
| 评测指标 | 各语言准确率 |

注：MMMLU的具体覆盖语言数量和版本信息以Hugging Face官方页面为准。

## SOTA 表现

| 模型 | 英文 MMLU | 中文 | 西班牙语 |
|------|---------|------|---------|
| GPT-4o | ~88% | ~83% | ~85% |
| Claude 3.5 Sonnet | ~88% | ~82% | ~84% |

注：非英语语言得分通常低于英语版本，差距因语言和领域而异。

## 主要挑战与局限

- **翻译质量影响**：机器翻译可能引入歧义或错误，部分专业术语在翻译后失去准确含义。
- **文化偏见**：原版MMLU题目基于英语语境和西方文化，翻译后仍保留原有的文化假设。
- **低资源语言覆盖不足**：目前主要覆盖高资源语言，对少数民族语言和低资源语言覆盖有限。
- **评测与应用场景差距**：翻译版本不能完全反映模型在该语言的"原生"知识理解能力。
- **与MMLU的重叠**：对于英语强模型，MMMLU提供的信息增量主要体现在非英语子集。

## 相关页面

- [[MMLU]]
- [[MMLU-Pro]]
- [[C-Eval]]
- [[BBH]]
