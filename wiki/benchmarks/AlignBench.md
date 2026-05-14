---
title: "AlignBench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [reasoning, knowledge, instruction-following]
language: zh
year: 2023
authors: ["Liu et al."]
arxiv_id: "2311.18743"
official_url: "https://github.com/THUDM/AlignBench"
license: "Apache-2.0"
size: 683
format: open-ended
status: active
saturation_threshold: 0.90
sources: []
---

# AlignBench

> 面向中文大型语言模型对齐能力的多维度评测基准，采用 LLM-as-Judge 自动评分。

## 概述

AlignBench 由 Liu 等人于 2023 年提出，来自清华大学（发表于 ACL 2024）。该基准专门针对中文大型语言模型的**对齐能力**（alignment），即模型能否遵循人类指令、安全可靠地完成中文任务。

AlignBench 包含 683 道精心设计的中文开放式问题，覆盖 8 个评测维度：
1. **基础能力**：数学计算、代码生成等
2. **中文语言能力**：中文写作、翻译等
3. **知识理解**：各学科知识问答
4. **逻辑推理**：演绎、归纳推理
5. **创意写作**：故事创作等
6. **专业能力**：法律、医学等专业领域
7. **角色扮演**：对话和角色模拟
8. **安全合规**：有害内容规避

评分采用 GPT-4 作为 judge，对每道题的回答给出 1-10 分的评分，并提供打分理由。这种 LLM-as-Judge 方法避免了传统准确率指标对开放式生成任务评测的局限。

AlignBench 是当前中文大型语言模型综合评测的重要基准，与 MT-Bench 的中文版功能类似，但覆盖维度更为全面。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 数据量 | 683 道问题 |
| 格式 | 开放式（LLM-as-Judge 评分） |
| 领域 | 多维度综合能力 |
| 语言 | 中文 |
| 许可证 | Apache-2.0 |
| 评分方式 | GPT-4 Judge（1-10 分） |

## SOTA 表现

顶尖中文大型语言模型（GPT-4、Claude 3、Qwen 系列等）在 AlignBench 上的综合得分超过 8 分（满分 10 分）。具体最新成绩见各模型官方技术报告及 GitHub 排行榜。

## 主要挑战与局限

- **依赖 GPT-4 评分**：Judge 本身的偏见可能影响评测结果，成本也较高
- **规模较小**：683 道题统计稳定性有限
- **评分主观性**：开放式任务的评分标准难以完全客观
- **GPT-4 可能偏向自身风格**：Judge 可能偏向与 GPT-4 输出风格相似的答案
- **文化局限性**：中文特定内容对国际模型可能不公平

## 相关页面

- [[CMMLU]]
- [[C-Eval]]
- [[MT-Bench]]
- [[AlpacaEval]]
- [[ArenaHard]]
