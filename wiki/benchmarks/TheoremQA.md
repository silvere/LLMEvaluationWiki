---
title: "TheoremQA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning, math]
language: en
year: 2023
authors: ["Wenhu Chen", "Ming Yin", "Max Ku", "Pan Lu", "Yixin Wan", "Xueguang Ma", "Jianyu Xu", "Xinyi Wang", "Tony Xia"]
arxiv_id: "2305.12524"
official_url: "https://github.com/wenhuchen/TheoremQA"
license: ""
size: 800
format: multiple-choice
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2305.12524"
  - "https://github.com/wenhuchen/TheoremQA"
---

# TheoremQA

> 包含800道需要应用科学定理求解的问题集，涵盖数学、物理、电子工程、金融等多个领域，结合选择题和开放式问答，评测模型将抽象定理应用于具体问题的能力。

## 概述

TheoremQA由Chen等人于2023年发布，专注于评测语言模型能否理解并正确应用科学定理解决实际问题。题目涵盖的定理范围广泛，包括：数学（傅里叶变换、贝叶斯定理等）、物理学（牛顿定律、热力学定律等）、电子工程（信号处理、电路理论等）、金融学（Black-Scholes模型等）。

TheoremQA与MMLU等知识问答基准的主要区别在于：MMLU测试的是概念知识的记忆，而TheoremQA测试的是将理论知识应用于具体计算或推理场景的能力。题目格式包括多选题和开放式数值/表达式答案，评测难度较高。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 800 道 |
| 覆盖领域 | 数学、物理、电子工程、金融 |
| 题目格式 | 多选题 + 开放式数值/表达式答案 |
| 定理覆盖数 | 350+ 个定理 |
| 评测方式 | 精确匹配 / 数值近似匹配 |

## SOTA 表现

| 模型 | 准确率 |
|------|-------|
| GPT-4（CoT） | ~51% |
| GPT-3.5（CoT） | ~29% |
| PaLM-2 | ~35% |

注：TheoremQA对现有模型仍具有较大挑战，顶级模型准确率约50%左右。

## 主要挑战与局限

- **定理应用 vs. 知识记忆**：区分模型是真正理解并应用了定理，还是通过模式匹配从训练数据中检索解法，较为困难。
- **题量有限**：800道题在某些子领域（如金融）的题量偏少，统计结果可靠性有限。
- **领域不均衡**：电子工程类题目比例较高，对不擅长该领域的模型存在偏差。
- **混合格式评测复杂**：多选题和开放式问答混合，不同格式对模型的要求和评测方法不同。
- **数值计算依赖**：许多题目需要精确计算，纯语言模型（不使用代码工具）存在天然劣势。

## 相关页面

- [[MATH]]
- [[SciBench]]
- [[GPQA]]
- [[MMLU]]
- [[ARB]]
