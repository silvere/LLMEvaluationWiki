---
title: "FollowBench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [instruction-following]
language: en
year: 2023
authors: ["Jiang et al."]
arxiv_id: "2310.20410"
official_url: "https://github.com/YJiangcm/FollowBench"
license: "Apache-2.0"
size: 820
format: open-ended
status: active
saturation_threshold: 0.90
sources: []
---

# FollowBench

> 多约束指令跟随难度分级评测基准，通过递增约束数量系统测试模型的指令遵从能力。

## 概述

FollowBench 由 Jiang 等人于 2023 年提出，来自香港大学等机构。该基准专注于评测**多约束指令跟随**（multi-constraint instruction following）能力，其独特设计是通过**渐进式增加约束数量**来测试模型的指令遵从极限。

FollowBench 的核心创新在于**难度分级**机制：
- **Level 1**：1 个约束条件（如"用中文回答"）
- **Level 2**：2 个约束条件（如"用中文回答，不超过 100 字"）
- ...以此类推到 Level 5（5 个约束条件）

约束类型涵盖：
- **内容约束**：包含/排除特定词语、话题
- **格式约束**：字数限制、列表格式、段落结构
- **风格约束**：语气、语言、写作风格
- **结构约束**：标题、子标题等排版要求

数据集共约 820 个实例（按难度级别分布），每个实例都有明确的约束条件列表和自动化验证逻辑，使评测结果客观可复现。

FollowBench 的评测结果显示，随着约束数量增加，所有模型的遵从率都会显著下降，揭示了当前模型在多约束场景下的系统性局限。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 数据量 | 约 820 个实例 |
| 格式 | 开放式（约束验证） |
| 领域 | 指令跟随 |
| 语言 | 英文 |
| 许可证 | Apache-2.0 |
| 难度级别 | 5 级（1-5 个约束） |

## SOTA 表现

顶尖大型语言模型（GPT-4、Claude 3 等）在 Level 1-2 的约束跟随率约为 90%+，但在 Level 4-5 时显著下降。具体最新成绩见各模型官方报告及 GitHub 排行榜。

## 主要挑战与局限

- **约束定义细节**：部分约束的"满足"定义存在模糊性
- **约束组合爆炸**：不同约束的组合方式理论上是指数级的，当前数据集只覆盖有限组合
- **自动验证精度**：部分约束（如风格类）的自动化验证准确率有限
- **英文为主**：对多语言能力评测有限
- **规模较小**：820 个实例统计稳定性不足

## 相关页面

- [[IFEval]]
- [[FLASK]]
- [[AlpacaEval]]
- [[MT-Bench]]
- [[WildBench]]
