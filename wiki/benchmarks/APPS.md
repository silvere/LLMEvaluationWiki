---
title: "APPS"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [code]
language: en
year: 2021
authors: ["Dan Hendrycks", "Steven Basart", "Saurav Kadavath", "Mantas Mazeika", "Akul Arora", "Ethan Guo", "Collin Burns", "Samir Puranik", "Horace He", "Dawn Song", "Jacob Steinhardt"]
arxiv_id: "2105.09938"
official_url: "https://github.com/hendrycks/apps"
license: "MIT"
size: 10000
format: code
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2105.09938"
  - "https://github.com/hendrycks/apps"
---

# APPS (Automated Programming Progress Standard)

> 包含10000道来自编程竞赛网站的Python编程题，覆盖入门、面试和竞赛三个难度级别，是评测大语言模型代码生成能力的重要基准之一。

## 概述

APPS由Dan Hendrycks等人于2021年发布，旨在衡量语言模型生成能能够通过单元测试的Python代码的能力。题目来源于Codewars、AtCoder、Kattis等编程竞赛和练习平台，确保题目的真实性和多样性。每道题目均配有问题描述、测试用例和参考解答。

APPS的发布填补了当时代码评测基准中缺乏大规模、多难度覆盖的空白。相比其他代码基准，APPS题目难度跨度大，要求模型不仅能生成语法正确的代码，还需要通过严格的功能测试。评测时采用通过率（pass@k）作为主要指标，即在k次生成中至少一次通过所有测试用例的概率。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 10,000 道 |
| 难度级别 | 入门（Introductory）/ 面试（Interview）/ 竞赛（Competition） |
| 编程语言 | Python |
| 评测方式 | 测试用例通过率（pass@1, pass@5, pass@100） |
| 题目来源 | Codewars、AtCoder、Kattis 等平台 |
| 数据划分 | 训练集 5,000 道，测试集 5,000 道 |
| 每题测试用例 | 平均 21.2 个 |

## SOTA 表现

| 模型 | 入门 pass@1 | 面试 pass@1 | 竞赛 pass@1 |
|------|------------|------------|------------|
| GPT-4 | ~50% | ~25% | ~5% |
| 早期GPT-3（2021） | 0.2% | 0.0% | 0.0% |

注：随着模型迭代，入门级别题目的通过率已大幅提升，竞赛级别题目仍是挑战。

## 主要挑战与局限

- **难度跨度悬殊**：入门题目已逐渐被主流模型饱和，而竞赛级题目对当前最先进模型仍极具挑战，导致区分度下降。
- **执行环境依赖**：评测需要运行Python代码并对比测试输出，基础设施搭建较为复杂。
- **数据污染风险**：部分题目来源于公开平台，训练数据可能已包含这些题目及其解答。
- **评测成本高**：pass@k中k越大，需要生成的代码样本越多，计算开销显著。
- **偏向竞赛风格**：题目风格偏向算法竞赛，对工程实践能力的覆盖相对有限。

## 相关页面

- [[HumanEval]]
- [[MBPP]]
- [[CodeContests]]
- [[BigCodeBench]]
- [[LiveCodeBench]]
