---
title: "CLongEval"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [long-context, reasoning, knowledge]
language: zh
year: 2024
authors: []
arxiv_id: "2403.03514"
official_url: "https://github.com/zexuanqiu/CLongEval"
license: "Apache-2.0"
size: 0
format: open-ended
status: active
saturation_threshold: 0.90
sources: []
---

# CLongEval

> 面向中文大型语言模型的长上下文理解评测基准，覆盖多种真实中文长文本场景。

## 概述

CLongEval 于 2024 年发布，专门针对**中文**语境下的长上下文理解能力评测。在 LongBench 等双语长文本基准之外，CLongEval 提供了更具中文特色的长文本任务，填补了中文长上下文评测的空白。

CLongEval 涵盖多种中文长文本场景，包括：
- **中文长篇文学作品阅读**：古典小说、现代文学的理解和问答
- **中文法律文书**：合同、法规等法律文档的理解
- **中文新闻聚合**：多篇新闻的跨文档推理
- **中文对话历史**：长对话上下文理解
- **中文专业报告**：研究报告、政府文件等

该基准不仅关注模型能否处理长文本（通过类似"大海捞针"的检索任务），更强调对中文长文本的**深层理解和推理能力**，包括信息整合、跨段落推理和知识关联等高级任务。

CLongEval 的发布配合了中文大型语言模型（如 Qwen、ChatGLM、Baichuan 等）对长上下文支持的快速扩展，为评测这些模型的中文长文本能力提供了工具。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2024 |
| 格式 | 开放式（问答、摘要等） |
| 领域 | 中文长文本理解 |
| 语言 | 中文 |
| 许可证 | Apache-2.0 |
| 上下文长度 | 多档位，覆盖 8k-128k tokens |

## SOTA 表现

中文长上下文模型（Qwen-Long、ChatGLM 等）在 CLongEval 上的表现见各模型官方报告及 GitHub 排行榜。

## 主要挑战与局限

- **中文特色内容**：对非中文背景模型存在固有劣势
- **古文理解难度**：中国古典文学对现代语言模型挑战较大
- **专业领域知识**：法律、政策等领域需要专业背景知识
- **评测标准化不足**：部分任务评测指标尚不统一
- **数据版权**：中文文学和法律文书的版权处理较为复杂

## 相关页面

- [[LongBench]]
- [[HELMET]]
- [[NeedleInAHaystack]]
- [[CMMLU]]
- [[AlignBench]]
