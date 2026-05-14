---
title: "McEval"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - code
  - multilingual
year: 2024
arxiv_id: "2406.07436"
status: active
---

# McEval

> 覆盖 40 种编程语言的大规模多语言代码评测基准，包含 16K 测试样本和代码生成、解释、补全三大任务，填补 HumanEval 等基准几乎仅覆盖 Python 的评测盲区。

## 概述

McEval（Massively Multilingual Code Evaluation）于 2024 年 6 月发布，是目前覆盖编程语言最广的代码能力评测基准之一。该工作的核心动机是：现有代码评测基准（HumanEval、MBPP、HumanEval-X 等）几乎完全以 Python 为中心，即便覆盖多语言的版本（如 MultiPL-E）也是将 Python 题目机械翻译而来，导致数据多样性严重退化，无法真实反映各编程语言的惯用表达和典型使用场景。

McEval 覆盖 40 种编程语言，包括：主流通用语言（Python、Java、C++、JavaScript、Go、Rust 等）、系统编程语言（C、Assembly、COBOL 等）、科学计算语言（R、MATLAB、Julia 等）、函数式语言（Haskell、OCaml、Scheme 等）以及各类领域特定语言。所有题目均从真实开源代码库中提取，保留了各语言的原生习惯用法，而非翻译生成。

基准包含三大核心任务：
1. **多语言代码生成（Code Generation）**：给定函数签名和文档注释，生成对应实现，约 2K 样本（每语言约 50 题）
2. **多语言代码解释（Code Explanation）**：给定代码片段，生成自然语言描述，约 2K 样本
3. **多语言代码补全（Code Completion）**：包含多行补全（3K）、单行补全（3K）、跨度补全（4K）和轻量跨度补全（2K）四个子集，共约 12K 样本

此外，研究团队还基于 McEval 构建了 McEval-Instruct 多语言指令微调语料库，并训练了 mCoder 模型作为强基线。实验结果表明，闭源模型（GPT-4 系列）在众多低资源语言上对开源模型仍有显著优势，跨语言代码能力不均衡是当前代码 LLM 的普遍问题。

## 任务格式

- **总样本量**：约 16,000 个测试样本
- **覆盖语言**：40 种编程语言
- **任务类型**：
  - 代码生成（~2K，每语言~50题）
  - 代码解释（~2K）
  - 代码补全——多行/单行/跨度/轻量跨度（~12K）
- **评估方式**：
  - 代码生成：pass@k（单元测试执行）
  - 代码解释：BLEU-4、ROUGE-L、BERTScore
  - 代码补全：完全匹配率（Exact Match）和 BLEU
- **数据来源**：真实开源代码库，保留各语言原生习惯用法

## 主要指标

- **pass@1（代码生成）**：单次生成代码通过全部单元测试的比例，各语言分别报告
- **平均跨语言 pass@1**：40 种语言的平均生成准确率，用于模型整体排名
- **BLEU/ROUGE（代码解释）**：生成解释与参考解释的 n-gram 相似度

## 局限性

- 不同语言的样本量不均衡（每语言约 50 题），低资源语言的评测结果置信区间较大
- 代码解释任务使用词汇重叠指标，无法完全反映解释的语义准确性
- 40 种语言中部分为小众语言，对应的模型训练数据极为稀少，相关评测结果难以代表模型的实际使用价值

## 相关页面

- [[HumanEval]]
- [[MBPP]]
- [[MultiPL-E]]
- [[HumanEval-X]]
- [[FullStackBench]]
- [[BigCodeBench]]
