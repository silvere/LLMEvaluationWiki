---
title: "SciBench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning, math]
language: en
year: 2023
authors: ["Xiaoxuan Wang", "Ziniu Hu", "Pan Lu", "Yanqiao Zhu", "Jieyu Zhang", "Satyen Subramaniam", "Arjun R. Loomba", "Shichang Zhang", "Yizhou Sun", "Wei Wang"]
arxiv_id: "2307.10635"
official_url: "https://scibench-ucla.github.io/"
license: ""
size: 295
format: open-ended
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2307.10635"
  - "https://scibench-ucla.github.io/"
---

# SciBench

> 包含295道来自大学物理、化学和数学教材的计算题，要求模型进行精确数值推理，用于评测大语言模型解决大学本科级别科学问题的能力。

## 概述

SciBench由Wang等人于2023年发布，题目来源于大学物理、物理化学、热力学等课程的标准教材（如Atkins物理化学、Serway物理学等），代表了本科理工科水平的计算推理难度。

与GSM8K或MATH等数学基准不同，SciBench的题目涉及具体的物理和化学定律应用，通常需要：理解物理量的单位和量纲、正确套用公式、进行多步数值计算、以及理解题目的物理意义。评测时采用精确数值匹配（允许一定误差容忍度）。

SciBench同时提供了"封闭书本"和"开放书本"两种评测模式，后者允许模型在提示中看到相关公式，用于分析模型的公式检索能力与推理能力的相对贡献。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 295 道 |
| 学科 | 物理学、物理化学、热力学、微积分 |
| 题目来源 | 大学教材（Atkins、Serway等） |
| 答案类型 | 数值（含单位） |
| 评测方式 | 数值精确匹配（容忍误差） |
| 评测模式 | 封闭书本 / 开放书本 |

## SOTA 表现

| 模型 | 封闭书本准确率 | 开放书本准确率 |
|------|-------------|-------------|
| GPT-4（CoT） | ~43% | ~48% |
| GPT-3.5（CoT） | ~28% | ~35% |

注：开放书本模式下模型表现通常好于封闭书本，但差距有限，说明公式检索不是主要瓶颈。

## 主要挑战与局限

- **数值精度要求高**：大学科学计算题通常需要精确到小数点后几位，模型的计算误差容易导致失分。
- **题量较小**：295道题量在统计上区分度有限，少量题目的表现波动可能影响整体排名。
- **单位处理复杂**：题目涉及多种物理单位（SI单位、CGS单位等），模型需要正确处理单位换算。
- **领域偏向**：以物理和化学为主，对生物、地球科学等其他理工学科覆盖不足。
- **计算工具使用**：真实科研中会使用计算器或软件，纯文本模型的纯计算能力与实际需求存在差距。

## 相关页面

- [[MATH]]
- [[GPQA]]
- [[OlympiadBench]]
- [[TheoremQA]]
- [[SciCode]]
