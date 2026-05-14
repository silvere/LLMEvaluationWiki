---
title: "HumanEvalPack"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [code]
language: en
year: 2023
authors: ["Niklas Muennighoff", "Qian Liu", "Armel Zebaze", "Qinkai Zheng", "Binyuan Hui", "Terry Yue Zhuo", "Swayam Singh", "Xiangru Tang", "Leandro von Werra", "Shayne Longpre"]
arxiv_id: "2308.07124"
official_url: "https://github.com/bigcode-project/bigcode-evaluation-harness"
license: "Apache 2.0"
size: 984
format: code
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2308.07124"
  - "https://github.com/bigcode-project/bigcode-evaluation-harness"
---

# HumanEvalPack

> BigCode项目发布的多语言代码评测包，将HumanEval扩展至6种编程语言，并增加代码修复（Fix）和代码解释（Explain）两类新任务，全面评测模型的多维代码能力。

## 概述

HumanEvalPack由Muennighoff等人于2023年随OctoCoder模型论文发布，是BigCode开源代码模型社区的评测框架组件之一。在HumanEval-X的基础上，HumanEvalPack进一步将评测任务从单纯的代码生成扩展到三类任务：

1. **HumanEvalSynthesize**（代码生成）：根据函数签名和文档生成代码，与原版HumanEval相同。
2. **HumanEvalFix**（代码修复）：给定含bug的代码，识别并修复错误。
3. **HumanEvalExplain**（代码解释）：生成代码的自然语言描述，再根据描述重新生成代码，验证理解能力。

支持的编程语言包括：Python、JavaScript、Java、Go、C++、Rust。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 164 道 × 6 种语言 = 984 个 |
| 编程语言 | Python、JavaScript、Java、Go、C++、Rust |
| 评测任务 | 代码生成 / 代码修复 / 代码解释 |
| 评测指标 | pass@1（功能正确性） |
| 所属项目 | BigCode / OctoPack |

## SOTA 表现

| 模型 | Synthesize pass@1 (Python) | Fix pass@1 (Python) |
|------|--------------------------|-------------------|
| GPT-4 | ~90% | ~85% |
| OctoCoder-15B | ~46% | ~35% |
| InstructCodeT5+ | ~35% | ~28% |

注：代码修复和代码解释任务普遍比代码生成更难。

## 主要挑战与局限

- **代码修复难度评估**：提供的bug难度分布不均，简单错误和复杂逻辑错误混杂。
- **代码解释评测的间接性**："生成描述再重新生成代码"的评测方式并非直接测量理解能力。
- **Rust覆盖较新**：Rust作为相对较新的语言，模型训练数据中的覆盖度低于其他语言。
- **与HumanEval-X的关系**：HumanEvalPack和HumanEval-X均基于HumanEval扩展，两者有一定重叠但来自不同团队。
- **任务一致性**：三类任务使用相同题目但难度差异显著，跨任务比较意义有限。

## 相关页面

- [[HumanEval]]
- [[HumanEval-X]]
- [[MBPP]]
- [[BigCodeBench]]
