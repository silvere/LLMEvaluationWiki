---
title: "HaluEval"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [hallucination, knowledge]
language: en
year: 2023
authors: ["Li et al."]
arxiv_id: "2305.11747"
official_url: "https://github.com/RUCAIBox/HaluEval"
license: "MIT"
size: 35000
format: multiple-choice
status: active
saturation_threshold: 0.90
sources: []
---

# HaluEval

> 大规模幻觉评测基准，包含 35k 人工标注样本，系统评测语言模型在不同任务场景下的幻觉倾向。

## 概述

HaluEval 由 Li 等人于 2023 年提出，来自中国人民大学（发表于 EMNLP 2023）。该基准系统性地研究语言模型的**幻觉问题**（hallucination），构建了大规模的幻觉样本数据集，并提供了一套评测框架来衡量模型识别和避免幻觉的能力。

HaluEval 涵盖三种主要的幻觉场景：
1. **问答幻觉（QA Hallucination）**：模型在回答问题时生成不实信息（基于 HotpotQA 和 TriviaQA）
2. **对话幻觉（Dialogue Hallucination）**：多轮对话中生成不实陈述（基于 OpenDialKG）
3. **摘要幻觉（Summarization Hallucination）**：摘要中包含原文未提及的信息（基于 CNN/DM）

数据集构建方式：
- 使用 ChatGPT 生成带有幻觉的回答/摘要
- 由人工标注者验证和筛选，确保幻觉样本质量
- 最终形成约 35,000 个标注样本（含正负样本对）

评测任务要求模型区分正确回答和幻觉回答，或者在给定文档基础上判断生成内容是否存在幻觉。HaluEval 揭示了即使是 GPT-3.5/GPT-4 也难以可靠地识别所有类型的幻觉。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 数据量 | 约 35,000 样本 |
| 格式 | 幻觉识别（二分类） |
| 领域 | 幻觉检测 |
| 语言 | 英文 |
| 许可证 | MIT |
| 任务类型 | QA、对话、摘要 |

## SOTA 表现

顶尖大型语言模型在 HaluEval 的幻觉识别任务上准确率约为 65-80%，显示幻觉识别仍是具有挑战性的任务。具体成绩见原论文及 GitHub 排行榜。

## 主要挑战与局限

- **由 ChatGPT 生成幻觉样本**：幻觉类型可能主要反映 ChatGPT 的幻觉模式，不全面
- **二元标注局限**：实际幻觉是连续分布的，二元标注可能丢失细节
- **场景覆盖有限**：三类场景不覆盖所有 LLM 使用场景（如推理、代码等）
- **跨模型泛化性**：针对 ChatGPT 幻觉训练的检测器对其他模型幻觉的检测能力待验证
- **评测标准单一**：幻觉定义因任务类型而异，难以统一标准

## 相关页面

- [[TruthfulQA]]
- [[FActScore]]
- [[FEVER]]
- [[SimpleQA]]
- [[WiCE]]
