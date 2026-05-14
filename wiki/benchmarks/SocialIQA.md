---
title: "SocialIQA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning, knowledge]
language: en
year: 2019
authors: ["Sap et al."]
arxiv_id: "1904.09728"
official_url: "https://leaderboard.allenai.org/socialiqa/submissions/public"
license: "CC-BY-4.0"
size: 38000
format: multiple-choice
status: active
saturation_threshold: 0.90
sources: []
---

# SocialIQA（Social Intelligence QA）

> 基于社交互动场景的常识推理基准，测试模型对人类社会行为、意图和情感的理解能力。

## 概述

SocialIQA 由 Sap 等人于 2019 年提出（发表于 EMNLP 2019），专注于评测**社交智能**（social intelligence）——即对人类在社交场景中的行为、动机、情感和影响的理解能力。这是其区别于其他常识推理数据集的核心特点。

数据集利用 ATOMIC 知识图谱作为框架来构建题目。ATOMIC 包含了大量"if-then"形式的社交常识规则（如"如果某人做了X，他们可能想要Y"），SocialIQA 基于这些规则生成问题，并由众包工作者提供答案选项。

每道题包含一个情境（context）、一个关于该情境的问题（question），以及三个候选答案。问题类型包括：行为动机（motivation）、行为反应（reaction）、情感状态（emotion）等多种社交维度。

数据集共约 38,000 道题，分为训练集（33,410）、验证集（1,954）和测试集（约 2,000，标签不公开）。人类基线约为 88%。

SocialIQA 被广泛用于评测模型的社会常识理解能力，与 ATOMIC 相关研究紧密关联，也是推动社会常识推理研究的重要基准之一。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2019 |
| 数据量 | 约 38,000 题 |
| 格式 | 多选题（3 选 1） |
| 领域 | 社交常识、情感推理 |
| 语言 | 英文 |
| 许可证 | CC-BY-4.0 |
| 数据来源 | ATOMIC 知识图谱 + 众包 |

## SOTA 表现

顶尖大型语言模型在 SocialIQA 上的准确率已接近或超过人类基线（约 88%）。具体最新成绩见各模型官方技术报告及官方排行榜。

## 主要挑战与局限

- **ATOMIC 知识局限**：题目依赖 ATOMIC 图谱，可能不覆盖所有社交常识场景
- **文化背景偏差**：社交规范因文化而异，基于英语语料的题目可能不适用于其他文化
- **部分答案主观性强**：社交情境下的行为判断本身具有模糊性
- **测试集不公开**：需通过官方排行榜评测
- **大型模型趋近饱和**：当前模型已接近人类水平

## 相关页面

- [[CommonsenseQA]]
- [[HellaSwag]]
- [[PIQA]]
- [[COPA]]
- [[WinoGrande]]
