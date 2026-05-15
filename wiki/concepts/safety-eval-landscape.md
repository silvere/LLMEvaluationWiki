---
title: "安全评测全景"
type: concept
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
aliases:
  - safety-eval-landscape
  - AI安全评测
domain:
  - safety
---

# 安全评测全景

> LLM 安全评测的系统性概述，涵盖有害内容、越狱攻击、对齐失败等维度的主要基准与评测方法。

## 主要评测维度

### 有害内容生成
评测模型是否会输出有害、违法或不道德内容：
- [[HarmBench]] — 400+ 有害行为的红队测试基准
- [[ToxiGen]] — 面向少数族裔的隐性毒性语言评测

### 越狱攻击（Jailbreaking）
评测模型对提示注入和越狱攻击的抵抗能力：
- [[HarmBench]] 包含直接请求与越狱变体两类攻击

### 真实性与幻觉
- [[TruthfulQA]] — 检测模型是否会生成已知错误信息

### 偏见与公平性
评测模型在不同人口群体上的差异化表现。

## 评测方法论

- **Red Teaming** — 专家手工或自动化生成对抗性提示
- **自动评分**：使用 LLM-as-Judge 或分类器标注输出有害程度
- **人工评分**：针对细粒度安全判断，需人工标注

## 局限性

- 安全评测依赖有害行为的枚举，难以穷举所有攻击面
- 模型可能通过"安全训练过拟合"在特定基准上虚高得分（见 [[benchmark-gaming]]）

## 相关页面

- [[HarmBench]]
- [[TruthfulQA]]
- [[benchmark-contamination]]
- [[benchmark-gaming]]

## 近期相关研究（arXiv 2026-05 自动入库）

> 以下为 ingest pipeline 筛出的高质量 LLM 评测论文（quality ≥18/25），自动关联到本页主题。

- [[2504.16137|Virology Capabilities Test (VCT): A Multimodal Virology Q&A Benchmark]] · score 20/25
- [[2603.11987|LABSHIELD: A Multimodal Benchmark for Safety-Critical Reasoning and Planning in Scientific Laboratories]] · score 19/25
- [[2605.03242|Enhancing Agent Safety Judgment: Controlled Benchmark Rewriting and Analogical Reasoning for Deceptive Out-of-Distribution Scenarios]] · score 18/25
- [[2604.16980|Evaluating Multimodal LLMs for Inpatient Diagnosis: Real-World Performance, Safety, and Cost Across Ten Frontier Models]] · score 18/25
- [[2603.17145|REAL: Regression-Aware Reinforcement Learning for LLM-as-a-Judge]] · score 18/25
- [[2601.10165|Advancing Adaptive Multi-Stage Video Anomaly Reasoning: A Benchmark Dataset and Method]] · score 18/25
