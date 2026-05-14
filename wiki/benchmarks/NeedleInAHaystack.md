---
title: "Needle In A Haystack"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [long-context, retrieval]
language: en
year: 2023
authors: ["Kamradt, Gregory"]
arxiv_id: ""
official_url: "https://github.com/gkamradt/LLMTest_NeedleInAHaystack"
license: "MIT"
size: 0
format: open-ended
status: active
saturation_threshold: 0.90
sources: []
---

# Needle In A Haystack（大海捞针）

> 将特定信息片段（"针"）嵌入长文档（"草堆"）的不同位置，测试模型在长上下文中的信息检索能力。

## 概述

Needle In A Haystack（NIAH）由 Gregory Kamradt 于 2023 年底创建，是评测大型语言模型**长上下文检索能力**的最流行测试之一。尽管方法简单，但该测试揭示了许多模型在长文本中"遗忘"关键信息的问题，引发了广泛关注。

测试方法：
1. 将一段简短的特定信息（"针"，needle）嵌入一段很长的无关文本（"草堆"，haystack）中
2. 改变两个变量：**文档总长度**（如 1k 到 128k tokens）和**针的位置**（文档开头、中间、末尾）
3. 询问模型关于"针"的具体内容
4. 记录模型在不同"长度 × 位置"组合下的准确率，绘制热图

原始版本使用 Paul Graham 的文章作为"草堆"，插入的"针"是关于特定城市（旧金山）最好披萨店的虚构信息。

热图结果通常显示：模型在文档开头和末尾的检索表现较好，但在中间位置（尤其是长文档的中间）表现明显下降，称为"中间遗失"（Lost in the Middle）现象。

该测试已被多个机构扩展，包括：多语言版本、多针版本（Multi-Needle）、中文版本等。尽管是合成测试，其结果与真实任务性能有一定相关性。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 格式 | 开放式（信息检索） |
| 领域 | 长上下文检索 |
| 语言 | 英文（有多语言扩展） |
| 许可证 | MIT |
| 评测维度 | 文档长度 × 针的位置 |

## SOTA 表现

最新的长上下文模型（Gemini 1.5 Pro 支持 1M tokens、Claude 3 系列支持 200k tokens）在标准 NIAH 测试（128k tokens 以内）上已能达到接近 100% 的准确率。但在更长文档（1M tokens 级别）上仍有挑战。

## 主要挑战与局限

- **合成性质**：真实任务中的信息分布比单一"针"更复杂
- **任务过于简单**：只需检索字面信息，不测试推理或整合能力
- **草堆文本单一**：原版使用固定文章，可能存在记忆效应
- **无法区分理解和检索**：模型可能通过模式匹配而非理解完成任务
- **多针场景更难**：多个相关信息片段的同时检索更接近真实但测试较少

## 相关页面

- [[RULER]]
- [[LongBench]]
- [[HELMET]]
- [[L-Eval]]
- [[QuALITY]]
