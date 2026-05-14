---
title: "FLoRes-200"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [multilingual]
language: multilingual
year: 2022
authors: ["Costa-jussà et al."]
arxiv_id: "2207.04672"
official_url: "https://github.com/facebookresearch/flores"
license: "CC-BY-SA-4.0"
size: 3001
format: other
status: active
saturation_threshold: 0.90
sources: []
---

# FLoRes-200

> 覆盖 200 种语言的大规模多语言机器翻译评测基准，每种语言包含相同的 1,000 个英文段落的翻译。

## 概述

FLoRes-200 由 Costa-jussà 等人于 2022 年提出（发表于 TACL 2022），来自 Meta AI Research。该数据集将原版 FLoRes-101（101 种语言）扩展到 200 种语言，是目前覆盖语言数量最多的机器翻译评测基准之一。

数据集构建方式：选取来自维基百科的 1,000 个英文段落（dev 集 997 + devtest 集 1,012），由专业翻译人员将其翻译为 200 种目标语言，并经过严格的翻译质量审核。所有语言的源文本相同，使得语言对之间的翻译质量可以直接比较。

FLoRes-200 的重要特点：
- **低资源语言覆盖**：包含大量非洲语言（如 Wolof、Yoruba、Zulu）、亚洲低资源语言（如 Khmer、Sinhala）和其他少数语言
- **双向翻译**：不仅支持从英文翻译到其他语言，还支持其他语言之间的相互翻译（通过英文中转或直接翻译）
- **统一评测**：使用 spBLEU（SentencePiece BLEU）作为主要评测指标，允许跨语言公平比较

FLoRes-200 广泛用于评测大型多语言模型（如 NLLB-200、GPT-4、mT5 等）的多语言翻译能力，是多语言 AI 研究的重要基础设施。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2022 |
| 数据量 | 1,012 个段落（devtest 集） |
| 格式 | 机器翻译评测（spBLEU） |
| 领域 | 多语言机器翻译 |
| 语言 | 200 种语言 |
| 许可证 | CC-BY-SA-4.0 |
| 发布机构 | Meta AI Research |

## SOTA 表现

Google 的 NLLB-200（No Language Left Behind）和 Meta 的多语言翻译系统在 FLoRes-200 上的平均 spBLEU 超过 35，高资源语言对可超过 50。大型语言模型（如 GPT-4）在高资源语言翻译上表现优秀，低资源语言上仍有差距。

## 主要挑战与局限

- **翻译质量不均**：200 种语言的翻译质量差异较大，低资源语言质量有限
- **领域偏向**：源文本来自维基百科，不代表口语、专业文本等其他领域
- **BLEU 指标局限**：BLEU 分数不能完全反映翻译质量，尤其对形态复杂语言
- **评测基础设施要求高**：200 种语言需要对应的分词和评测工具
- **低资源语言参考质量**：部分低资源语言的参考译文可能由非母语翻译者完成

## 相关页面

- [[MGSM]]
- [[MMLU]]
- [[AGIEval]]
