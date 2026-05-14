---
title: "HELMET"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [long-context, reasoning, retrieval]
language: en
year: 2024
authors: ["Yen et al."]
arxiv_id: "2410.02694"
official_url: "https://github.com/princeton-nlp/HELMET"
license: "MIT"
size: 0
format: open-ended
status: active
saturation_threshold: 0.90
sources: []
---

# HELMET（How to Evaluate LLMs on Extended Text）

> 全面的长上下文语言模型评测套件，覆盖多种应用场景和长度档位，提供系统性长文本能力分析。

## 概述

HELMET 由 Yen 等人于 2024 年提出，来自普林斯顿大学（发表于 ICLR 2025）。该基准的核心目标是提供一个**系统性、全面性**的长上下文评测框架，解决当前长文本评测碎片化、缺乏统一标准的问题。

HELMET 包含多种任务类别，覆盖不同的长文本应用场景：
- **检索型任务（Recall）**：关键信息检索，类似"大海捞针"
- **多文档 QA**：跨文档推理问答
- **摘要生成**：长文本摘要
- **RAG 任务**：检索增强生成
- **代码补全**：长代码上下文补全
- **合成任务**：专门设计的长文本能力探针任务

HELMET 的重要设计原则是**长度可控**：每个任务都支持多种上下文长度档位（如 1k、2k、4k、8k、16k、32k、64k、128k tokens），使研究者可以系统分析模型能力随上下文长度的变化趋势。

另一个独特之处是，HELMET 同时包含了**合成任务**和**真实任务**，使得评测结果既具有可控性（合成任务）又具有实际意义（真实任务）。研究发现，合成任务（如 RULER）与真实任务性能之间的相关性并不总是很高，强调了两类评测的互补价值。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2024 |
| 格式 | 开放式（多任务混合） |
| 领域 | 长上下文理解 |
| 语言 | 英文 |
| 许可证 | MIT |
| 长度档位 | 1k - 128k tokens |
| 发布机构 | 普林斯顿大学 |

## SOTA 表现

顶尖长上下文模型（Gemini 1.5 Pro、Claude 3 系列、GPT-4 Turbo 等）在 HELMET 不同任务和长度档位上的表现见各模型官方报告及 GitHub 排行榜。

## 主要挑战与局限

- **评测成本极高**：覆盖多个长度档位 × 多个任务的评测计算成本极大
- **任务异质性**：不同任务的评测指标不同，聚合困难
- **英文单一**：目前主要覆盖英文任务
- **模型上下文限制**：较小的模型无法完成长度较大的任务
- **评测时效性**：基准相对新，社区积累数据较少

## 相关页面

- [[RULER]]
- [[LongBench]]
- [[NeedleInAHaystack]]
- [[SCROLLS]]
- [[QuALITY]]
