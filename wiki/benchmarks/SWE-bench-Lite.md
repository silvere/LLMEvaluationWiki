---
title: "SWE-bench Lite"
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
size: 300
format: code
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2310.01848"
  - "https://www.swebench.com/"
---

# SWE-bench Lite

> SWE-bench的300道精选子集，筛选了"易于确认"（self-contained）的任务，降低了评测成本同时保持了基准的代表性，是最常用的SWE-bench评测变体之一。

## 概述

SWE-bench Lite是从原版SWE-bench的2294个任务中筛选出的300个任务子集，由SWE-bench原作者团队发布。筛选标准为"self-contained"（自包含）任务：即修复所需的信息主要包含在Issue描述和相关代码文件中，不依赖外部数据库、网络资源或复杂的环境配置。

引入Lite子集的主要动机是：完整SWE-bench的评测成本极高（需要搭建环境、执行大量测试），导致许多研究团队无法负担完整评测。300道任务在保持代表性的同时，将评测成本降低到可接受水平。

Lite子集涵盖原始12个仓库，并在各仓库之间保持了较均衡的任务分布。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 300 道（从2294道中筛选） |
| 代码仓库数 | 12 个 Python 开源项目 |
| 筛选标准 | 自包含任务，降低评测歧义 |
| 评测方式 | 单元测试通过率（Resolved Rate） |
| 与Full版关系 | 子集，同源代码库 |

## SOTA 表现

| 模型/系统 | Resolved Rate |
|----------|--------------|
| 顶级AI代理系统（2024-2025） | ~50-65% |
| SWE-agent + GPT-4（2024初） | ~18.1% |
| Devin（Cognition，2024） | ~13.86%（首次公开报告） |

注：Lite子集由于筛选了相对明确的任务，通过率通常高于Full集。

## 主要挑战与局限

- **选择偏差**：筛选"易于确认"的任务本身引入了偏差，Lite集可能低估了软件工程任务的真实难度。
- **仍需执行环境**：虽然比Full集便宜，但仍需完整的代码执行和测试环境，门槛不低。
- **代表性问题**：300道任务对某些仓库的覆盖较少，统计方差比Full集更大。
- **排行榜快速变化**：随着AI代理系统快速迭代，Lite集的排名变化非常频繁，需关注最新结果。
- **与Verified的关系**：SWE-bench Verified是另一个质量更高的子集，与Lite有所重叠但不完全相同。

## 相关页面

- [[SWE-bench]]
- [[SWE-bench-Verified]]
- [[InterCode]]
- [[HumanEval]]
