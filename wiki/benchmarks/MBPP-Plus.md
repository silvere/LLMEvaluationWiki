---
title: "MBPP+"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [code]
language: en
year: 2023
authors: ["Jiawei Liu", "Chunqiu Steven Xia", "Yuyao Wang", "Lingming Zhang"]
arxiv_id: "2305.01210"
official_url: "https://github.com/evalplus/evalplus"
license: "Apache 2.0"
size: 974
format: code
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2305.01210"
  - "https://github.com/evalplus/evalplus"
  - "https://evalplus.github.io/leaderboard.html"
---

# MBPP+

> EvalPlus团队发布的MBPP增强版本，通过自动化方法为MBPP的每道题目大幅增加测试用例，揭示原版MBPP评测的虚高问题，提供更严格可靠的代码生成评测。

## 概述

MBPP+由Liu等人于2023年作为EvalPlus框架的一部分发布，与HumanEval+同时推出。研究发现，原版MBPP每道题目仅有1-3个测试用例，导致许多功能实际有误的代码也能通过测试，使得模型在原版MBPP上的表现存在系统性虚高。

EvalPlus使用LLM生成额外的测试用例，再通过参考解答验证这些测试用例的正确性，为MBPP的974道题目平均增加了数十倍的测试覆盖。实验表明，当使用MBPP+评测时，许多模型的通过率显著下降（通常降低10-20个百分点），表明原版MBPP的评测确实存在不严格的问题。

MBPP+与HumanEval+共同构成EvalPlus评测框架，已被广泛用于严格的代码生成基准比较。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 974 道（与MBPP相同） |
| 编程语言 | Python |
| 测试用例增量 | 原版1-3个 → 平均数十个 |
| 测试用例生成方式 | LLM生成 + 参考解答验证 |
| 评测框架 | EvalPlus |
| 评测指标 | pass@1（MBPP+标准） |

## SOTA 表现

| 模型 | MBPP pass@1（原版） | MBPP+ pass@1 |
|------|-----------------|-------------|
| GPT-4o | ~87% | ~74% |
| Claude 3.5 Sonnet | ~85% | ~72% |
| GPT-3.5 | ~70% | ~57% |

注：MBPP与MBPP+之间普遍存在10-15个百分点的差距，反映了原版测试用例不充分的问题。

## 主要挑战与局限

- **测试用例质量依赖LLM**：虽经参考解答验证，但LLM生成的测试用例仍可能存在错误或覆盖不均。
- **与原版评测的可比性**：MBPP+与原版MBPP的分数不可直接比较，给跨时间的性能追踪带来困难。
- **过度严格的可能性**：极大量的测试用例是否带来了不合理的严格性，仍存在讨论。
- **边界情况偏重**：LLM生成的额外测试用例可能过于集中在边界情况，影响评测分布代表性。

## 相关页面

- [[MBPP]]
- [[HumanEval]]
- [[BigCodeBench]]
- [[LiveCodeBench]]
