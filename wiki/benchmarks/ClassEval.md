---
title: "ClassEval"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - code
year: 2023
arxiv_id: "2308.01861"
status: active
---

# ClassEval

> 面向类级别（class-level）Python 代码生成的评测基准，包含 100 个手工构建的 Python 类，评测模型在处理跨方法依赖和复杂类结构时的代码生成能力。

## 概述

ClassEval 由 Du 等人于 2023 年发布，针对现有代码基准（HumanEval、MBPP 等）只测试独立函数生成这一局限性而设计。现实软件工程中，绝大多数代码以类（class）为组织单元，方法之间存在共享状态和相互调用，但函数级评测完全无法捕捉这一复杂性。

ClassEval 包含 100 个手工精心设计的 Python 类，涵盖从数学工具、字符串处理到数据结构实现等多个领域，每个类平均包含约 33.1 行代码、5 个方法、2 个字段。每个类配有完整的规格文档（docstring）和测试套件，共 410 组测试方法。

评测发现，即使是 GPT-4 在类级别代码生成上的 pass@1 也仅约 65%，显著低于其在函数级别（HumanEval）上的表现，揭示了模型在处理跨方法状态管理和类结构设计时存在的系统性挑战。ClassEval 同时测试"按方法逐一生成"和"一次性生成整个类"两种模式，前者通常效果更好。

## 任务格式

- 格式：Python 类代码生成（class-level code generation）
- 数据规模：100 个类，410 组测试方法
- 输入：类的规格说明（docstring + 方法签名），模型生成完整类实现
- 测试方式：执行单元测试（unittest），通过率计算

## 主要指标

- **pass@1**：单次采样通过全部单元测试的比率，分别报告类级别（class-level）和方法级别（method-level）通过率

## 局限性

- **数据集规模较小**：仅 100 个类，子领域分布有限，统计置信度受限
- **Python 单语言**：仅覆盖 Python，无法评测跨语言代码生成能力
- **任务分布偏工具类**：题目偏向工具库和算法实现，对业务逻辑类、GUI 类等场景覆盖不足

## 相关页面

- [[HumanEval]]
- [[MBPP]]
- [[SWE-bench]]
- [[BigCodeBench]]
- [[MultiPL-E]]
