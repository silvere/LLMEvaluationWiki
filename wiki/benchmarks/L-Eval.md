---
title: "L-Eval"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [long-context, reasoning, knowledge]
language: en
year: 2023
authors: ["An et al."]
arxiv_id: "2307.11088"
official_url: "https://github.com/OpenLMLab/LEval"
license: "Apache-2.0"
size: 411
format: open-ended
status: active
saturation_threshold: 0.90
sources: []
---

# L-Eval

> 面向长文本理解的多领域评测基准，覆盖法律、金融、学术等专业领域，包含封闭式和开放式两类任务。

## 概述

L-Eval 由 An 等人于 2023 年提出，来自复旦大学 OpenLMLab。该基准专注于评测语言模型在**专业领域长文档**上的理解和推理能力，覆盖 20 个子任务，包含多种专业垂直领域。

L-Eval 的数据来源包括：
- **法律文本**：合同、判决书等长法律文档
- **金融文本**：年报、财务分析等金融文档
- **学术论文**：多领域学术文章
- **新闻文章**：长篇新闻报道
- **教育内容**：教科书章节等

评测任务分为两类：
- **封闭式任务（Closed-ended）**：多选题、事实抽取，使用准确率评测
- **开放式任务（Open-ended）**：摘要生成、问答，使用 GPT-4 Judge 或 ROUGE 评测

文档长度从数千 tokens 到数十万 tokens 不等，覆盖了当时主流模型的上下文限制边界，特别关注 **16k-32k token** 范围内的任务。

L-Eval 强调专业领域的深度理解，而非简单的关键词检索，这使其比纯合成长文本任务更具现实意义。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 数据量 | 411 道问题（测试集） |
| 格式 | 开放式 + 封闭式混合 |
| 领域 | 法律、金融、学术、新闻等 |
| 语言 | 英文 |
| 许可证 | Apache-2.0 |
| 子任务数 | 20 个 |

## SOTA 表现

顶尖长上下文模型（Claude 3 系列、GPT-4 Turbo）在 L-Eval 上的综合表现较好，但开放式任务仍具挑战性。具体最新成绩见各模型官方报告及 GitHub 排行榜。

## 主要挑战与局限

- **专业领域知识门槛**：法律、金融等领域需要背景知识才能评判答案质量
- **测试集规模小**：411 道题统计稳定性有限
- **开放式任务评测难**：依赖 GPT-4 Judge 或 ROUGE，均有其局限性
- **文档版权**：专业领域文档可能存在版权问题
- **长度分布极不均衡**：不同任务长度差异悬殊

## 相关页面

- [[LongBench]]
- [[SCROLLS]]
- [[HELMET]]
- [[QuALITY]]
- [[NeedleInAHaystack]]
