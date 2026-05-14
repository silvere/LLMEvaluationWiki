---
title: "CommonsenseQA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [knowledge, reasoning]
language: en
year: 2019
authors: ["Talmor et al."]
arxiv_id: "1811.00937"
official_url: "https://www.tau-nlp.org/commonsenseqa"
license: "MIT"
size: 12247
format: multiple-choice
status: active
saturation_threshold: 0.90
sources: []
---

# CommonsenseQA

> 基于 ConceptNet 知识图谱构建的五选一常识推理问答基准。

## 概述

CommonsenseQA 由 Talmor 等人于 2019 年提出（发表于 NAACL 2019）。数据集利用 ConceptNet 知识图谱作为构建框架：从 ConceptNet 中选取一个概念作为问题中心，再找出与该概念相关的三个子概念作为干扰项种子，由众包工作者针对目标概念编写五选一的问题。

该构建方式确保了干扰项之间具有语义相关性，无法通过简单的词频统计或浅层语义匹配解题，必须依赖真正的常识知识。例如，对于"你去哪里可以找到大量的书？"，选项包括图书馆、书店、阁楼等多个合理答案，但有且仅有一个最佳答案。

CommonsenseQA 共约 12,247 道题，分为训练集（9,741）、验证集（1,221）和测试集（1,140）。测试集标签不公开，通过官方排行榜评测。人类基线约为 89%。

该数据集被广泛用于 NLP 研究和语言模型评测，尤其在常识知识和推理领域。随着大型语言模型的进步，最佳模型的表现已接近人类水平。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2019 |
| 数据量 | 约 12,247 题 |
| 格式 | 多选题（5 选 1） |
| 领域 | 常识知识、推理 |
| 语言 | 英文 |
| 许可证 | MIT |
| 数据来源 | ConceptNet + 众包 |

## SOTA 表现

顶尖大型语言模型在 CommonsenseQA 上的准确率已超过 90%，接近人类基线（约 89%）。具体最新成绩见各模型官方技术报告及官方排行榜。

## 主要挑战与局限

- **ConceptNet 覆盖局限**：知识来源受限于 ConceptNet 的知识体系，可能存在文化偏差
- **测试集不公开**：需通过官方提交评测，不便于快速研究迭代
- **部分题目有歧义**：在众包过程中，部分问题和答案存在主观性
- **五选一但部分选项明显错误**：在某些情况下干扰项质量参差不齐
- **大型模型趋近饱和**：当前大型语言模型已接近或超越人类水平

## 相关页面

- [[HellaSwag]]
- [[WinoGrande]]
- [[PIQA]]
- [[SocialIQA]]
- [[COPA]]
