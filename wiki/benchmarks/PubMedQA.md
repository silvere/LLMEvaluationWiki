---
title: "PubMedQA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [knowledge, reasoning]
language: en
year: 2019
authors: ["Jin et al."]
arxiv_id: "1909.06146"
official_url: "https://pubmedqa.github.io/"
license: "MIT"
size: 273535
format: multiple-choice
status: active
saturation_threshold: 0.90
sources: []
---

# PubMedQA

> 基于生物医学研究论文摘要的问答基准，答案为 yes/no/maybe 三类，测试生物医学文献理解能力。

## 概述

PubMedQA 由 Jin 等人于 2019 年提出（发表于 EMNLP 2019）。该数据集利用 PubMed 生物医学研究论文的结构化摘要（包含研究目的、方法、结果、结论）来构建是非类问答任务。

数据集分为三部分：
- **PubMedQA-L（Labeled）**：1,000 个专家手工标注样本，是核心评测集
- **PubMedQA-U（Unlabeled）**：61,249 个无标注样本
- **PubMedQA-A（Artificially Generated）**：211,269 个机器生成样本（用于训练）

构建方式：从论文摘要中提取研究问题（通常是摘要标题），以摘要正文作为上下文，答案为 yes/no/maybe（对应于研究结论的三种可能态度）。

PubMedQA 要求模型理解生物医学研究文献的结构和逻辑，判断研究结论是否支持研究假设。人类专家在该任务上的准确率约为 78%，早期模型表现较低，当前大型模型已接近或超越人类专家水平。

该数据集是生物医学 NLP 研究的标准基准，常与 BioASQ、BLURB 等医学 NLP 套件一起使用。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2019 |
| 数据量 | 1,000（专家标注）+ 272,535（机器/无标注） |
| 格式 | 三分类（yes/no/maybe） |
| 领域 | 生物医学研究 |
| 语言 | 英文 |
| 许可证 | MIT |
| 数据来源 | PubMed 摘要 |

## SOTA 表现

顶尖大型语言模型在 PubMedQA（专家标注测试集）上的准确率超过 80%，部分接近 90%。具体最新成绩见各模型官方技术报告。

## 主要挑战与局限

- **三分类不均衡**：yes 类答案占多数，maybe 类较少，存在类别不均衡
- **maybe 类界定模糊**：研究结论的不确定性边界主观性强
- **领域专业性**：需要生物医学背景知识才能理解部分研究问题
- **评测集规模小**：专家标注集仅 1,000 题
- **知识时效性**：医学研究进展快，早期结论可能已被新研究推翻

## 相关页面

- [[MedQA]]
- [[MMLU]]
- [[LegalBench]]
- [[TruthfulQA]]
- [[HaluEval]]
