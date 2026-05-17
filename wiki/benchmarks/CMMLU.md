---
title: "CMMLU"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [knowledge, reasoning]
language: zh
year: 2023
authors: ["Li et al."]
arxiv_id: "2306.09212"
official_url: "https://github.com/haonan-li/CMMLU"
license: "CC-BY-NC-4.0"
size: 11528
format: multiple-choice
status: active
saturation_threshold: 0.90
sources: []
---

# CMMLU（Chinese Massive Multitask Language Understanding）

> 覆盖 67 个中文学科领域的多任务语言理解基准，是中文版 MMLU 的重要对应基准。

## 概述

CMMLU 由 Li 等人于 2023 年提出，旨在系统评测大型语言模型对中国文化背景和专业知识的掌握程度。作为 MMLU 的中文对应基准，CMMLU 在设计上充分考虑了中国特色内容：不仅翻译了部分通用知识题，还专门收集了具有中国特色的学科内容，如中国历史、中国法律、中医、中国文学等。

数据集共 11,528 道四选一多选题，覆盖 67 个学科领域，分为以下几大类：
- **STEM**：数学、物理、化学、生物等
- **人文社科**：历史、地理、政治、哲学等
- **中国特色**：中国历史、中国文学、中医、中国法律等
- **其他**：职业技能、常识等

CMMLU 的题目以纯中文写作，避免了直接翻译带来的语义损失，更准确地反映了模型的中文知识能力。与 C-Eval 类似，CMMLU 已成为评测中文大型语言模型的核心基准之一。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 数据量 | 11,528 题 |
| 格式 | 多选题（4 选 1） |
| 领域 | 多学科知识 |
| 语言 | 中文 |
| 许可证 | CC-BY-NC-4.0 |
| 覆盖学科 | 67 个 |

## SOTA 表现

顶尖中文大型语言模型（如 GPT-4、Claude 3、Qwen 系列、Baidu 文心等）在 CMMLU 上的平均准确率已超过 80%，部分模型接近 90%。具体最新成绩见各模型官方技术报告及相关排行榜。

## 主要挑战与局限

- **中国特色内容偏向**：对非中国背景的模型存在固有不利
- **数据污染风险**：广泛使用可能导致题目进入训练集
- **非商业许可限制**：CC-BY-NC-4.0 不允许商业使用
- **静态快照问题**：知识题目反映特定时间点的知识状态
- **部分题目翻译来源**：少数题目可能源自英文题目的翻译，文化代表性有限

## 相关页面

- [[MMLU]]
- [[C-Eval]]
- [[AGIEval]]
- [[AlignBench]]
- [[MMLU-Pro]]

## 主流模型得分（来自 wiki/models/）

> 以下分数来自 wiki/models/ 中各模型的官方/技术报告数据（汇总自 model spec 页）。准确数字以模型方公布为准。

| 模型 | 分数 | 备注 |
|------|------|------|
| [[Doubao-1.5-Pro|Doubao 1.5 Pro]] | 约 88.3% |  |
