---
title: "BigCodeBench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [code]
language: en
year: 2024
authors: ["Terry Yue Zhuo", "Minh Chien Vu", "Jenny Chim", "Han Hu", "Wenhao Yu", "Ratnadira Widyasari", "Imam Nur Bani Yusuf", "Haolan Zhan", "Junda He", "Indraneil Paul", "Simon Brunner", "Chen Gong", "Thong Hoang", "Armel Randy Zebaze", "Xiaoheng Hong", "Wen-Ding Li", "Jean Kaddour", "Ming Xu", "Zhihan Zhang", "Prateek Yadav", "Naman Jain", "Alex Gu", "Zhoujun Cheng", "Jiawei Liu", "Qian Liu", "Zijian Wang", "David Lo", "Binyuan Hui", "Niklas Muennighoff", "Daniel Fried", "Xiaoning Du", "Harm de Vries", "Leandro von Werra"]
arxiv_id: "2406.15877"
official_url: "https://bigcode-bench.github.io/"
license: "Apache 2.0"
size: 1140
format: code
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2406.15877"
  - "https://bigcode-bench.github.io/"
---

# BigCodeBench

> 包含1140道编程任务的大规模代码评测基准，涵盖139个Python库的实际调用场景，难度显著高于HumanEval，更贴近真实软件开发需求。

## 概述

BigCodeBench由BigCode社区的Zhuo等人于2024年发布，旨在弥补HumanEval、MBPP等早期代码基准在难度和多样性上的不足。其设计理念是模拟程序员在实际开发中的工作场景：需要调用第三方库、处理复杂API、完成有实际意义的功能模块。

BigCodeBench包含两个评测模式：
- **Complete**：补全函数签名和文档注释后的代码体
- **Instruct**：根据自然语言指令生成完整函数

题目覆盖的139个Python库包括：标准库（os、json、datetime等）、科学计算（NumPy、SciPy等）、数据处理（Pandas等）、网络（requests等）、密码学等多个领域。每道题目配有多个严格的单元测试，有效减少了"通过测试但功能有误"的情况。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 1,140 道 |
| 编程语言 | Python |
| 覆盖库数量 | 139 个 |
| 评测模式 | Complete / Instruct |
| 平均每题测试用例 | 5.6 个 |
| 难度定位 | 显著高于HumanEval |
| 版本 | BigCodeBench / BigCodeBench-Hard（更难子集） |

## SOTA 表现

| 模型 | Complete pass@1 | Instruct pass@1 |
|------|----------------|----------------|
| GPT-4o（2024） | ~61% | ~55% |
| Claude 3.5 Sonnet | ~58% | ~52% |
| 开源前沿模型 | ~50-55% | ~45-50% |

## 主要挑战与局限

- **执行环境复杂**：需要安装139个Python库并管理版本依赖，评测环境搭建成本高。
- **任务理解门槛高**：许多题目需要模型理解特定库的使用方式，纯粹的算法能力不足以解决。
- **评测时间较长**：题量大且每题需执行多个测试用例，完整评测耗时较多。
- **库版本依赖**：第三方库的API变化可能影响评测结果的一致性。
- **部分题目偏难**：对于小规模模型，通过率可能极低，区分度不足。

## 相关页面

- [[HumanEval]]
- [[MBPP]]
- [[DS-1000]]
- [[APPS]]
- [[LiveCodeBench]]
