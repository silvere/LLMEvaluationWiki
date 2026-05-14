---
title: "LogiQA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning]
language: multilingual
year: 2020
authors: ["Liu et al."]
arxiv_id: "2007.08124"
official_url: "https://github.com/lgw863/LogiQA-dataset"
license: ""
size: 8678
format: multiple-choice
status: active
saturation_threshold: 0.90
sources: []
---

# LogiQA

> 基于中国国家公务员考试逻辑推理题的双语（中英文）逻辑推理评测基准。

## 概述

LogiQA 由 Liu 等人于 2020 年提出（发表于 IJCAI 2020）。数据集来源于中国国家公务员考试（行政职业能力测验）的逻辑推理题目，经过专业翻译后形成中英双语版本。

每道题给出一段文字描述，要求从四个选项中选出逻辑上正确的推论或判断。题目类型涵盖多种逻辑推理形式：
- **演绎推理**（deductive reasoning）
- **归纳推理**（inductive reasoning）
- **批判性思维**（critical thinking）
- **数量推理**（quantitative reasoning）
- **因果推理**（causal reasoning）

数据集共 8,678 道题，分为训练集（7,376）、验证集（651）和测试集（651）。中英文版本同时发布，使其成为评测中文逻辑推理能力的少数基准之一。

LogiQA 是评测语言模型逻辑推理能力的重要基准，常被用于与 ReClor 进行对比研究。后续还发布了 LogiQA 2.0 版本（扩展了数据量和题型）。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2020 |
| 数据量 | 8,678 题 |
| 格式 | 多选题（4 选 1） |
| 领域 | 逻辑推理 |
| 语言 | 中英双语 |
| 数据来源 | 中国国家公务员考试题目 |

## SOTA 表现

顶尖大型语言模型在 LogiQA 英文版上的准确率超过 80%，中文版略有差异。具体最新成绩见各模型官方技术报告。

## 主要挑战与局限

- **翻译质量**：从中文翻译的题目可能存在语义偏差
- **文化背景偏向**：题目来自中国公务员考试，带有特定的文化和社会背景
- **逻辑形式多样**：不同类型的逻辑推理难度不均
- **测试集较小**：仅 651 道测试题，统计置信度有限
- **部分题目较难界定标准答案**：逻辑推理本身有时存在多种合理解读

## 相关页面

- [[ReClor]]
- [[MMLU]]
- [[BBH]]
- [[AGIEval]]
- [[ARC]]
