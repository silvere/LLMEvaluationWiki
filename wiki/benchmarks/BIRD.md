---
title: "BIRD"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [code]
language: en
year: 2023
authors: ["Jinyang Li", "Binyuan Hui", "Ge Qu", "Jiaxi Yang", "Binhua Li", "Bowen Li", "Bailin Wang", "Bowen Qin", "Ruiying Geng", "Nan Huo", "Xuanhe Zhou", "Chenhao Ma", "Guoliang Li", "Kevin C.C. Chang", "Fei Huang", "Reynold Cheng", "Yongbin Li"]
arxiv_id: "2305.03111"
official_url: "https://bird-bench.github.io/"
license: ""
size: 12751
format: code
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2305.03111"
  - "https://bird-bench.github.io/"
---

# BIRD (BIg Bench for LaRge-scale Database Grounded Text-to-SQL Evaluation)

> 包含12751个SQL问题的大规模Text-to-SQL基准，使用真实业务数据库，难度和复杂度显著高于Spider，是当前最具挑战性的Text-to-SQL基准之一。

## 概述

BIRD由Li等人于2023年发布，旨在弥补Spider等基准与实际工业应用之间的差距。BIRD的核心特点是使用**真实的大规模数据库**：每个数据库包含真实业务数据，平均有3.33个表但包含大量数据行，使得模型需要理解数据的实际分布和业务含义才能生成正确的SQL。

BIRD涵盖11个不同业务领域（体育、区块链、教育、金融、医疗等），每个问题都标注了难度级别（简单/中等/困难/额外困难）。与Spider相比，BIRD的问题对数据库schema的理解要求更高，且涉及更多特定领域的业务逻辑。

BIRD引入了"外部知识"（External Knowledge）的概念：部分问题的解答需要结合数据库外的领域知识（如"高血压患者的血压阈值是多少"），使评测更贴近真实场景。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 12,751 道 |
| 数据库数量 | 95 个 |
| 覆盖领域 | 11 个业务领域 |
| SQL难度级别 | 简单/中等/困难/额外困难 |
| 数据库特点 | 真实业务数据，大规模 |
| 评测指标 | 执行准确率（EX）、有效效率分（VES） |
| 外部知识 | 支持（部分问题需要） |

## SOTA 表现

| 模型 | 开发集执行准确率 | 测试集执行准确率 |
|------|-------------|-------------|
| 顶级系统（2024-2025） | ~73-75% | ~70-72% |
| GPT-4 + few-shot | ~54.9% | ~54.6% |
| DAIL-SQL + GPT-4 | ~57.4% | ~55.9% |

注：与Spider相比，BIRD难度显著更高，模型表现差距更大，具有更好的区分度。

## 主要挑战与局限

- **数据库规模处理**：真实数据库含大量数据行，部分问题需要理解数据值分布，超出纯结构理解的范畴。
- **外部知识获取**：需要外部知识的问题对zero-shot模型构成额外挑战，且外部知识质量参差不齐。
- **评测成本高**：需要执行SQL并对比结果，数据库规模大时执行时间较长。
- **SQL方言差异**：BIRD使用SQLite，与MySQL、PostgreSQL等存在语法差异，影响在实际系统中的应用价值。
- **标注质量**：部分问题的参考SQL可能不是唯一正确答案，影响执行准确率指标的可靠性。

## 相关页面

- [[Spider]]
- [[InterCode]]
- [[HumanEval]]
