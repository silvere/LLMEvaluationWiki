---
title: "InterCode"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [code, agent]
language: en
year: 2023
authors: ["John Yang", "Akshara Prabhakar", "Karthik Narasimhan", "Shunyu Yao"]
arxiv_id: "2306.14898"
official_url: "https://intercode-benchmark.github.io/"
license: "MIT"
size: 0
format: code
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2306.14898"
  - "https://intercode-benchmark.github.io/"
---

# InterCode

> 交互式代码执行评测框架，支持SQL和Bash两类任务，要求AI代理通过多轮交互执行代码、观察结果并迭代改进，模拟真实编程工作流。

## 概述

InterCode由Yang等人于2023年发布，是一个专注于**交互式代码执行**的评测框架，与传统的一次性代码生成评测（如HumanEval）不同。InterCode模拟了程序员真实的编程工作流：执行代码、观察输出、根据反馈修改代码，通过多轮交互逐步解决问题。

InterCode包含两个主要任务集：
- **InterCode-SQL**：基于Spider数据集，要求代理通过交互式SQL执行查询数据库
- **InterCode-Bash**：Shell命令执行任务，要求代理通过Bash命令完成文件系统操作

评测框架的核心特点是**有状态的交互**：代理在每一轮可以执行代码并获得执行结果，然后决定是否继续修改。这与纯文本问答基准有本质区别，更接近AI代理系统的实际应用场景。

## 规格

| 属性 | 值 |
|------|-----|
| 任务类型 | SQL查询 / Bash命令执行 |
| 基础数据集 | Spider（SQL）/ 自定义（Bash） |
| 交互轮数限制 | 可配置，通常3-5轮 |
| 评测环境 | Docker容器（隔离执行） |
| 评测指标 | 任务完成率 / 执行结果正确率 |

## SOTA 表现

| 模型 | SQL 任务成功率 | Bash 任务成功率 |
|------|-------------|--------------|
| GPT-4（ReAct框架） | ~55% | ~40% |
| GPT-3.5（ReAct框架） | ~40% | ~25% |

注：具体数字以论文和官网为准，交互式任务的评测指标定义对结果影响较大。

## 主要挑战与局限

- **评测环境复杂**：需要Docker容器来隔离代码执行环境，增加了评测的基础设施要求。
- **交互策略依赖**：模型在不同交互策略（ReAct、Plan-and-Execute等）下表现差异显著，使得评测结果难以直接比较。
- **任务完成标准模糊**：特别是Bash任务，"完成"的标准有时不唯一，影响评测一致性。
- **覆盖范围有限**：目前仅支持SQL和Bash两类任务，不覆盖其他编程语言或开发工具。
- **可重复性挑战**：交互式评测的状态管理和环境一致性难以保证，不同评测环境下结果可能存在差异。

## 相关页面

- [[SWE-bench]]
- [[Spider]]
- [[BIRD]]
- [[HumanEval]]
