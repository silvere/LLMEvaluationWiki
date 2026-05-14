---
title: "ReClor"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning]
language: en
year: 2020
authors: ["Yu et al."]
arxiv_id: "2002.04326"
official_url: "https://whyu.me/reclor/"
license: ""
size: 6138
format: multiple-choice
status: active
saturation_threshold: 0.90
sources: []
---

# ReClor（Reading Comprehension with Logical Reasoning）

> 来自 GMAT 和 LSAT 考试的阅读理解逻辑推理基准，专注于高难度逻辑分析能力。

## 概述

ReClor 由 Yu 等人于 2020 年提出（发表于 ICLR 2020），来自新加坡国立大学。数据集收集自 GMAT（研究生管理类入学考试）和 LSAT（法学院入学考试）中的逻辑推理题，这类题目在现实中被广泛用于评测人类的批判性思维和逻辑分析能力。

ReClor 的设计初衷是构建一个**真正具有挑战性**的逻辑推理基准。GMAT 和 LSAT 题目由专业出题人设计，经过严格校验，干扰项构造精巧，需要深层逻辑分析才能排除错误选项。

数据集共 6,138 道四选一多选题，分为训练集（4,638）、验证集（500）和测试集（1,000）。测试集分为 Easy 和 Hard 两个子集，Hard 子集更具挑战性，专门用于评测顶尖模型。

题目类型涵盖：论证假设（assumption）、结论推断（inference）、论证加强/削弱（strengthen/weaken）、方法识别（method）等多种 GMAT/LSAT 常见题型。

人类在 ReClor 上的准确率约为 63%（非专业考生），而在 Hard 子集上约为 57%，显示该任务对人类也颇具挑战。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2020 |
| 数据量 | 6,138 题 |
| 格式 | 多选题（4 选 1） |
| 领域 | 逻辑推理、批判性思维 |
| 语言 | 英文 |
| 数据来源 | GMAT、LSAT 真题 |

## SOTA 表现

顶尖大型语言模型在 ReClor 测试集上的准确率超过 90%，Hard 子集约 85%+。具体最新成绩见各模型官方技术报告及官方排行榜。

## 主要挑战与局限

- **版权问题**：题目来自商业考试，存在版权限制，扩展受限
- **考试偏向**：题目专注于 GMAT/LSAT 风格的论证分析，不代表所有逻辑推理类型
- **规模较小**：测试集仅 1,000 道题
- **文化背景**：部分论证场景具有英语语言国家背景
- **测试集分区有限**：Hard/Easy 划分粒度较粗

## 相关页面

- [[LogiQA]]
- [[MMLU]]
- [[AGIEval]]
- [[BBH]]
- [[ARC]]
