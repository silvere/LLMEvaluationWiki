---
title: "MMLU-Redux"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
domain:
  - knowledge
  - reasoning
language: "en"
year: 2024
status: "active"
arxiv_id: "2406.04127"
---

# MMLU-Redux

> 对 MMLU 原始题目进行人工重新标注后的精纯版本，修正了约 4% 的标注错误，提供更可靠的知识评测基线。

## 概述

MMLU-Redux 是对原始 MMLU（Massive Multitask Language Understanding）数据集的重新标注版本。研究者对 MMLU 的 3,000 道题（30 个科目各 100 题）进行了系统性人工审查，发现约 4.03% 的题目存在错误（模糊题干、错误答案、多个正确选项等），并予以修正。

修正后的版本提供了更严格的基准，对当前排行靠前的模型（尤其是接近人类水平的模型）评测差异可达 2–3 个百分点。

## 相关页面

- [[MMLU]] — 原始基准
- [[benchmark-contamination]] — MMLU 污染问题讨论
- [[benchmark-design]] — 标注质量对基准可靠性的影响
