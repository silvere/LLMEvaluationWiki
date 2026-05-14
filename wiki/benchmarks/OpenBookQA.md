---
title: "OpenBookQA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [knowledge, reasoning]
language: en
year: 2018
authors: ["Mihaylov et al."]
arxiv_id: "1809.02789"
official_url: "https://allenai.org/data/open-book-qa"
license: "Apache-2.0"
size: 5957
format: multiple-choice
status: active
saturation_threshold: 0.90
sources: []
---

# OpenBookQA

> 模拟开卷考试的科学常识问答基准，要求模型结合核心科学事实与广泛背景知识进行推理。

## 概述

OpenBookQA 由 Mihaylov 等人于 2018 年提出（发表于 EMNLP 2018），来自 Allen Institute for AI。该数据集的独特设计理念是模拟"开卷考试"场景：每道题都与 1,329 个核心科学事实（"教科书"）之一相关联，但仅凭这些事实无法直接回答问题，还需要结合广泛的常识背景知识进行二跳推理。

例如，核心事实是"太阳给地球提供能量"，但问题可能是"植物从哪里获取生长所需的能量？"——这需要学生同时了解光合作用的常识才能回答。

数据集共约 5,957 道四选一多选题，分为训练集（4,957）、验证集（500）和测试集（500）。每道题均标注了对应的核心科学事实以及解题所需的额外常识。

OpenBookQA 的设计精心之处在于显式区分了"书本知识"和"常识推理"两个维度，为理解模型的知识获取机制提供了独特视角。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2018 |
| 数据量 | 约 5,957 题 |
| 格式 | 多选题（4 选 1） |
| 领域 | 科学知识、常识推理 |
| 语言 | 英文 |
| 许可证 | Apache-2.0 |
| 发布机构 | Allen Institute for AI (AI2) |

## SOTA 表现

当前顶尖大型语言模型在 OpenBookQA 上的准确率已超过 90%。具体最新成绩见各模型官方技术报告。

## 主要挑战与局限

- **规模较小**：测试集仅 500 道题，统计置信度有限
- **需要二跳推理**：必须结合核心事实与背景常识，对模型推理链要求较高
- **科学领域受限**：仅覆盖初级自然科学，不涵盖其他知识领域
- **知识来源固定**：核心事实集固定，可能存在覆盖盲区
- **大型模型趋近饱和**：当前模型已能较好应对此级别的科学题目

## 相关页面

- [[ARC]]
- [[MMLU]]
- [[CommonsenseQA]]
- [[SciQ]]
- [[PIQA]]
