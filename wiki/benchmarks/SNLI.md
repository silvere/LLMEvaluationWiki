---
title: "SNLI"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning]
language: en
year: 2015
authors: ["Bowman et al."]
arxiv_id: "1508.05326"
official_url: "https://nlp.stanford.edu/projects/snli/"
license: "CC-BY-SA-4.0"
size: 570152
format: multiple-choice
status: saturated
saturation_threshold: 0.90
sources: []
---

# SNLI（Stanford Natural Language Inference）

> 斯坦福大学发布的首个大规模自然语言推理数据集，奠定了 NLI 研究范式的基础。

## 概述

SNLI 由 Bowman 等人于 2015 年提出（发表于 EMNLP 2015），来自斯坦福大学。这是 NLP 历史上第一个大规模的**自然语言推理**（NLI）数据集，其发布开创了以神经网络方法研究语义蕴含问题的新时代。

数据集来源于 Flickr30k 图像描述数据集：以图像描述作为前提，由众包工作者为每个前提分别写出蕴含、矛盾和中立三类假设句，形成约 570,000 个高质量句对。

三类关系定义：
- **蕴含**（entailment）：假设一定可以从前提推出
- **矛盾**（contradiction）：假设与前提不可能同时为真
- **中立**（neutral）：假设与前提既不矛盾也不相互蕴含

SNLI 的发布极大推动了 NLI 领域的研究，促使了 InferSent、decomposable attention 等注意力机制方法以及后来 BERT 等预训练模型在 NLI 任务上的突破。

然而，研究者发现 SNLI 存在严重的**标注偏差**（annotation artifacts），导致模型可以仅凭假设句的词汇特征（不看前提）达到较高准确率，这促使了后续 MultiNLI、SNLI-NLI-Hard 等改进数据集的出现。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2015 |
| 数据量 | 约 570,152 句对 |
| 格式 | 三分类（蕴含/矛盾/中立） |
| 领域 | 自然语言推理 |
| 语言 | 英文 |
| 许可证 | CC-BY-SA-4.0 |
| 数据来源 | Flickr30k 图像描述 + 众包 |

## SOTA 表现

顶尖模型在 SNLI 测试集上的准确率超过 93%，超越人类基线（约 88%）。数据集已高度饱和。

## 主要挑战与局限

- **高度饱和**：顶尖模型已超越人类水平，不再是区分性基准
- **标注偏差严重**：模型可通过假设句词汇特征（如"没有"表示矛盾）学到捷径
- **前提来源局限**：全部前提来自图像描述，语言风格较为单一
- **众包质量问题**：部分标注存在错误或主观性
- **已被 MultiNLI 取代**：作为主要 NLI 基准，MultiNLI 更具领域多样性

## 相关页面

- [[MultiNLI]]
- [[GLUE]]
- [[SuperGLUE]]
- [[FEVER]]
- [[BoolQ]]
