---
title: "Minerva"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [math, reasoning]
language: en
year: 2022
authors: ["Aitor Lewkowycz", "Anders Andreassen", "David Dohan", "Ethan Dyer", "Henryk Michalewski", "Vinay Ramasesh", "Ambrose Slone", "Cem Anil", "Imanol Schuster", "Sylvain Gelly", "Oriol Vinyals", "Yarin Gal", "Behnam Neyshabur"]
arxiv_id: "2206.14858"
official_url: ""
license: ""
size: 0
format: open-ended
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2206.14858"
  - "https://ai.googleblog.com/2022/06/minerva-solving-quantitative-reasoning.html"
---

# Minerva

> Google Research于2022年发布的定量推理评测框架，通过在MATH和OCWCourses等数据集上评测数学与科学定量推理能力，同时也指代同名的专门训练模型。

## 概述

"Minerva"既指Google Research于2022年发布的专用数学推理模型，也指该论文中使用的评测方法论。Lewkowycz等人在论文"Solving Quantitative Reasoning Problems with Language Models"中展示了通过在大量科学文献（arXiv论文等）上继续预训练，可以显著提升模型在定量推理任务上的表现。

论文中用于评测Minerva模型的主要基准包括：
- **MATH**：Hendrycks等人的数学推理基准
- **OCWCourses**：来自MIT OpenCourseWare的大学级别STEM课程题目
- **MMLU-STEM子集**：MMLU中理工科相关题目

Minerva的评测框架特点在于：使用"maj@k"（多数投票）策略，即从k个采样结果中选取最频繁的答案，这一策略后来被广泛应用于数学推理评测中。

## 规格

| 属性 | 值 |
|------|-----|
| 主要评测集 | MATH、OCWCourses、MMLU-STEM |
| 评测策略 | greedy@1、maj@32、maj@256 |
| 模型规模 | 8B、62B、540B 参数 |
| 预训练数据 | 120B arXiv + Math Web Pages tokens |

## SOTA 表现（论文报告）

| 模型 | MATH 准确率 | OCWCourses 准确率 |
|------|-----------|----------------|
| Minerva 540B（maj@256） | 50.3% | 35.1% |
| Minerva 540B（greedy） | 33.6% | 27.7% |
| PaLM 540B（greedy） | 8.8% | 15.4% |

注：上述为2022年论文数据，现代模型（如o1）在MATH上已大幅超越。

## 主要挑战与局限

- **模型而非独立基准**：Minerva更多作为一个研究工作而非可复用基准被引用，评测集本身（如OCWCourses）并非专门为Minerva设计。
- **推理成本高**：maj@256策略需要对每道题采样256次，计算成本极高。
- **数据集老化**：OCWCourses等评测集已逐渐被更具挑战性的基准取代。
- **局限于数值计算**：评测重点在于数值和符号计算，对于纯逻辑推理或证明类题目覆盖有限。

## 相关页面

- [[MATH]]
- [[MATH500]]
- [[MMLU]]
- [[SciBench]]
- [[TheoremQA]]
