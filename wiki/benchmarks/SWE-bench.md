---
title: "SWE-bench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [code, agent]
language: en
year: 2023
authors: ["Carlos E. Jimenez", "John Yang", "Alexander Wettig", "Shunyu Yao", "Kexin Pei", "Ofir Press", "Karthik Narasimhan"]
arxiv_id: "2310.01848"
official_url: "https://www.swebench.com/"
license: "MIT"
size: 2294
format: code
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2310.01848"
  - "https://www.swebench.com/"
---

# SWE-bench

> 包含2294个来自真实GitHub仓库Issue修复任务的软件工程基准，要求模型在真实代码库中定位并修复bug，是评测AI系统实际软件工程能力的权威标准。

## 概述

SWE-bench由Jimenez等人于2023年发布，是AI代理（Agent）系统在软件工程领域最重要的评测基准之一。与代码生成基准（如HumanEval）不同，SWE-bench要求模型在一个真实的、大型的Python代码库中，理解Issue描述，定位相关代码，修改代码以修复问题，并通过已有的单元测试验证修复的正确性。

数据来源于GitHub上12个知名Python开源仓库（包括Django、Flask、NumPy、Pandas、SciPy等），每个任务对应一个真实的Pull Request，包含：问题描述（Issue文本）、正确的代码修改（ground truth patch）、以及用于验证的测试用例。

评测时，模型（或AI代理）需要从代码库的某个特定历史版本出发，生成一个代码patch，patch需能通过对应的测试用例。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 2,294 个任务 |
| 代码仓库数 | 12 个 Python 开源项目 |
| 评测方式 | 单元测试通过率（Resolved Rate） |
| 平均代码库规模 | 数万至数十万行代码 |
| 任务来源 | 真实GitHub Issue + Pull Request |
| 主要子集 | SWE-bench Full / SWE-bench Lite / SWE-bench Verified |

## SOTA 表现

| 模型/系统 | Resolved Rate（Full） |
|----------|--------------------|
| 顶级AI代理系统（2024-2025） | ~50-60% |
| SWE-agent + GPT-4（2024初） | ~12.5% |
| 无辅助直接生成 | <5% |

注：SWE-bench全集难度极高，推荐使用SWE-bench Verified子集获得更可靠的评测结果。

## 主要挑战与局限

- **代码库规模巨大**：模型需要在数万行代码中定位相关文件和函数，对上下文窗口和检索能力要求极高。
- **评测成本高昂**：每次评测需要搭建代码执行环境、运行测试套件，基础设施复杂。
- **任务分布不均**：12个仓库的难度和特点差异显著，整体结果受仓库构成影响。
- **测试用例局限**：部分任务的测试用例覆盖不完整，可能出现"通过测试但修复有误"的情况。
- **Full vs. Verified**：原始Full集中存在部分评测不可靠的任务，推荐使用Verified子集。

## 相关页面

- [[SWE-bench-Lite]]
- [[SWE-bench-Verified]]
- [[InterCode]]
- [[HumanEval]]
- [[CodeContests]]

## 近期相关研究（arXiv 2026-05 自动入库）

> 以下为 v3 ingest pipeline 筛出的高质量 LLM 评测论文（quality ≥18/25），自动关联到本页主题。

- [[2605.11006|An Execution-Verified Multi-Language Benchmark for Code Semantic Reasoning]] · score 21/25
- [[2603.24946|MobileDev-Bench: A Benchmark for Issue Resolution in Mobile Application Development]] · score 20/25
- [[2604.02729|IndustryCode: A Benchmark for Industry Code Generation]] · score 18/25
