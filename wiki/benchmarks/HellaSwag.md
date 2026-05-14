---
title: "HellaSwag"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning]
language: en
year: 2019
authors: ["Zellers et al."]
arxiv_id: "1905.07830"
official_url: "https://rowanzellers.com/hellaswag/"
license: "MIT"
size: 70000
format: multiple-choice
status: saturated
saturation_threshold: 0.90
sources: []
---

# HellaSwag

> 基于完形填空风格的常识推理基准，要求模型从四个选项中选出最合理的句子续写。

## 概述

HellaSwag 由 Rowan Zellers 等人于 2019 年提出，发表于 ACL 2019。其核心贡献在于引入了 **adversarial filtering**（对抗过滤）技术：通过训练一个鉴别器来筛除人类容易辨别但机器难以区分的干扰项，从而让题目对人类简单、对模型困难。

数据集来源于两个领域：ActivityNet Captions（视频描述）和 WikiHow（步骤说明文本）。每道题给出一个场景或动作的开头描述，模型需要从四个选项中选择最符合逻辑的续写句。人类在该任务上的准确率约为 95%，而早期模型（如 BERT）只有约 40% 的准确率，形成明显的"人机差距"。

随着大型语言模型的发展，HellaSwag 上的顶尖成绩已超过 95%，被认为已接近饱和状态。尽管如此，它依然是语言模型综合评测套件（如 Open LLM Leaderboard）中的核心组成部分，被广泛用于模型能力的横向比较。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2019 |
| 数据量 | 约 70,000 题（验证集约 10,000） |
| 格式 | 多选题（4 选 1） |
| 领域 | 常识推理 |
| 语言 | 英文 |
| 许可证 | MIT |
| 数据来源 | ActivityNet Captions、WikiHow |

## SOTA 表现

当前顶尖模型（GPT-4、Claude 3 系列、Gemini Ultra 等）在 HellaSwag 上的准确率均超过 95%，与人类基线持平或超越。具体最新成绩见各模型官方技术报告。

## 主要挑战与局限

- **已趋于饱和**：顶尖模型准确率已达人类水平，区分度下降
- **领域受限**：题目来源主要为 ActivityNet 和 WikiHow，覆盖场景有限
- **数据污染风险**：广泛使用导致训练集泄露的可能性增加
- **对抗过滤时效性**：其对抗样本是针对 BERT 时代模型设计的，对更强模型的挑战性已大幅降低
- **语言单一**：仅覆盖英文，不适用于多语言能力评测

## 相关页面

- [[MMLU]]
- [[ARC]]
- [[WinoGrande]]
- [[CommonsenseQA]]
- [[PIQA]]
