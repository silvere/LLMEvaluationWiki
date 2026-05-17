---
title: "Benchmark 数据污染"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
aliases:
  - data-contamination
---

# Benchmark 数据污染

> 模型训练数据中包含评测集的题目或答案，导致评测分数虚高的现象。

## 定义

Benchmark 数据污染（Benchmark Contamination）是指在预训练或微调阶段，模型接触到了评测基准中的题目、选项或答案，使得模型在该 benchmark 上的表现超出其真实泛化能力。污染可以是直接的（训练集包含评测题目原文），也可以是间接的（训练集包含与评测高度相似的内容）。

## 重要性（在 LLM 评测中）

污染使得 benchmark 分数无法如实反映模型能力，导致研究者和用户做出错误的能力判断。实证研究表明，GSM8K 上的污染可使准确率虚高约 22.9%，MMLU 上可虚高约 19.0%。随着网络上公开 benchmark 数量增加，污染问题日益严重，部分 benchmark 已几乎失去区分意义。

## 主要方法/实现

**检测方法：**
- **n-gram 重叠检测**：计算评测题目与训练数据之间的 n-gram 重叠率，超过阈值视为疑似污染。
- **灰盒测试**：在不访问完整训练数据的情况下，通过对题目做轻微扰动（改变选项顺序、替换同义词）对比模型表现，若扰动后分数大幅下降则怀疑污染。
- **推理时去污染实验**：在推理时注入人工噪声或使用与训练时不同的题目格式，观察性能变化。

**防御方法：**
- **动态 Benchmark**：LiveBench 每月从最新竞赛和 arXiv 论文中采集新题目，使模型无法提前接触。
- **私有测试集**：评测机构持有不公开的测试集（如 UK AISI、METR 等），减少污染风险。
- **时间截断验证**：只评测模型训练截止日期后发布的题目。

## 局限与挑战

- 完全排除污染极为困难，大型预训练语料库往往无法完整审计。
- 检测方法依赖于访问训练数据，而多数商业模型不公开训练数据。
- 动态 benchmark 的维护成本高，题目质量难以稳定保证。

## 2026 年抗污染基准设计的新进展

针对静态 benchmark 终将污染的根本问题，近期出现一批**时间感知/动态更新/变体检测**的新基准与新方法：

- **时间感知评测**：[[2604.04815|LiveFact]]（Xu 等，2026-04）首个"时间感知"的假新闻检测基准——题目持续滚动更新，**每条题目都有发布时间戳**，可严格按"训练截止日期前 vs 后"分桶评测，从根本上排除污染。SOTA 模型在 cutoff 后"新鲜"题上 72.4%，与"陈旧"题分数差距显著。
- **数学家级证明（动态）**：[[2604.01754|LiveMathematicianBench]] 在持续更新的"数学家级"问题集上评测，前沿模型仅 43.5%，与 [[GSM8K]] / [[MATH]] / [[AIME]] 等静态/年度更新基准的高分形成强对比，是验证"高分 ≠ 未污染"的有力工具。
- **变体污染检测**：DVD (arXiv 2603.13619)（Detecting Variant Contamination）提出 robust 方法检测 benchmark variant contamination（"原题改写后泄露"），覆盖 n-gram 检测无法捕获的**语义级污染**。
- **MathArena 平台化**：[[2605.00674|Beyond Benchmarks: MathArena]] 把数学评测从"静态题集"升级为"持续运转的评测平台"，类似 Chatbot Arena 的实时对比模式，但题目动态更新。

## 相关页面

- [[LiveBench]] — 通过动态更新防污染的代表性 benchmark
- [[goodharts-law]] — 污染是 Goodhart 定律在评测中的典型表现
- [[benchmark-contamination]] — 本页

## 近期相关研究（arXiv 2026-05 自动入库）

> 以下为 ingest pipeline 筛出的高质量 LLM 评测论文（quality ≥18/25），自动关联到本页主题。

- [[2412.15194|MMLU-CF: A Contamination-free Multi-task Language Understanding Benchmark]] · Qihao Zhao 等 · score 21/25
- [[2406.18326|PaCoST: Paired Confidence Significance Testing for Benchmark Contamination Detection in Large Language Models]] · Huixuan Zhang 等 · score 18/25
- [[2311.09154|CLEAN-EVAL: Clean Evaluation on Contaminated Large Language Models]] · Wenhong Zhu 等 · score 18/25
