---
title: "AGIEval"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [knowledge, reasoning]
language: multilingual
year: 2023
authors: ["Zhong et al."]
arxiv_id: "2304.06364"
official_url: "https://github.com/microsoft/AGIEval"
license: "MIT"
size: 8816
format: multiple-choice
status: active
saturation_threshold: 0.90
sources: []
---

# AGIEval

> 基于人类权威考试（中国高考、SAT、LSAT、GRE、GMAT 等）的双语 AGI 能力评测基准。

## 概述

AGIEval 由 Zhong 等人于 2023 年提出（来自微软研究院，发表于 EMNLP 2023 findings）。该数据集的核心理念是：**人类设计的权威考试是评测 AGI 能力的天然基准**——这些考试经过专业设计和严格验证，已知对人类有效，且涵盖多种认知能力维度。

AGIEval 包含来自中英文权威考试的题目：
- **中文考试**：中国高考（语文、数学、英语）、中国司法考试、中国公务员考试（行测）
- **英文考试**：SAT（数学+阅读写作）、LSAT、GRE、GMAT

数据集共约 8,816 道题，其中中文约 3,722 道，英文约 5,094 道。题型包括多选题和少量开放式问答。

AGIEval 的独特价值在于：题目本身已经过权威机构的质量把控，且具有明确的现实意义（真实考试成绩的重要性）。与纯研究目的构建的基准相比，它更贴近人类对"智能"的直觉评判标准。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 数据量 | 约 8,816 题 |
| 格式 | 多选题（少量开放式） |
| 领域 | 知识、推理、语言理解 |
| 语言 | 中英双语 |
| 许可证 | MIT |
| 数据来源 | 中国高考、SAT、LSAT、GRE、GMAT 等 |

## SOTA 表现

顶尖大型语言模型（GPT-4、Claude 3 系列）在 AGIEval 英文子集上的准确率约为 75-85%，中文子集表现因领域而异。具体最新成绩见各模型官方技术报告。

## 主要挑战与局限

- **版权问题**：考试题目存在版权争议，部分来源受限
- **知识时效性**：部分题目反映特定年份的知识状态
- **题目类型不均**：不同子集的难度和格式差异较大
- **中英文能力差距**：模型在中英文子集上可能表现出较大差异
- **静态基准局限**：考试题目可能逐渐进入训练集（数据污染）

## 相关页面

- [[MMLU]]
- [[CMMLU]]
- [[C-Eval]]
- [[LogiQA]]
- [[ReClor]]
