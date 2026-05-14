---
title: "ML-Bench"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - code
year: 2024
arxiv_id: "2311.09835"
status: active
---

# ML-Bench

> 评测 LLM 基于真实机器学习代码库执行 ML 任务的综合代码生成基准。

## 概述

ML-Bench 是 2024 年（arXiv 预印于 2023 年底）提出的机器学习代码生成评测基准，专注于评测 LLM 在真实 ML 代码库语境下完成机器学习任务的能力。与通用代码生成基准（HumanEval、MBPP）不同，ML-Bench 要求模型理解并正确调用真实的 ML 框架（PyTorch、TensorFlow、Hugging Face Transformers、scikit-learn 等）的 API 接口，完成模型训练、推理、数据处理等实际 ML 工作流。

ML-Bench 包含 9641 个任务实例，来自 GitHub 上 18 个热门 ML 开源仓库的 README 和文档，每个任务提供详细的自然语言要求和参考解决方案。基准分为两个评测设置：**ML-Bench-GitHub**（基于完整仓库上下文）和 **ML-Bench-Quarter**（仅提供部分上下文），测试模型在不同信息量下的代码生成能力。

ML-Bench 的难点在于：模型不仅需要生成语法正确的代码，还需要正确理解特定 ML 框架的 API 语义、遵循 ML 工作流的最佳实践，并处理复杂的依赖关系和超参数配置。

## 任务格式

- **输入**：机器学习任务的自然语言描述 + 相关代码仓库上下文（README、代码文件）
- **输出**：可执行的 Python ML 代码（训练脚本、推理代码、数据处理等）
- **规模**：9641 个任务，来自 18 个 ML 开源仓库
- **评测执行**：真实执行代码，验证程序正确运行（无报错，输出符合预期）
- **设置**：GitHub 完整上下文 vs. Quarter 部分上下文

## 主要指标

- **Executability**（可执行率）：生成代码能够无错误运行的比例
- **Pass@k**（功能通过率）：k 次生成中至少一次完全正确的概率
- **API Correctness**：正确调用 ML 框架 API 的比例
- 按 ML 框架（PyTorch/TF/HF/sklearn）和任务类型分类报告

## 局限性

- ML 代码执行环境配置复杂，依赖特定版本的 ML 框架
- 评测代价高，每个实例需要实际训练/推理过程，耗时较长
- ML 框架版本更迭快，部分旧版 API 调用方式可能已废弃

## 相关页面

- [[Effibench]]
- [[SWE-bench]]
- [[FullStackBench]]
- [[DS-1000]]
