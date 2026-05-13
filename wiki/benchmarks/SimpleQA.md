---
title: "SimpleQA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
domain: [hallucination, knowledge]
language: en
year: 2024
authors: ["OpenAI"]
arxiv_id: ""
official_url: "https://openai.com/research/simpleqa"
license: ""
size: 4326
format: multiple-choice
status: active
saturation_threshold: 0.80
sources: ["[[2026-04-llm-eval-landscape]]"]
---

# SimpleQA

> OpenAI 设计的事实性问答基准，用于测试模型在有明确答案的问题上的幻觉程度，GPT-4o 仅得 38.2%。

## 概述

SimpleQA 由 OpenAI 于 2024 年发布，目标是建立一个衡量大语言模型"事实幻觉"（factual hallucination）程度的简洁基准。与 TruthfulQA 测试模型是否重复常见错误信念不同，SimpleQA 的重点是：对于有唯一明确答案的事实性问题，模型能否给出正确回答，还是会自信地编造错误答案？

基准共包含 4,326 道题，每道题都经过人工核实，确保答案明确、唯一且可验证。题目类型涵盖历史事件、科学常识、人物信息、地理数据等，问题措辞刻意设计为简短直接，避免歧义。评测时，正确回答得分，拒绝作答（如回答"我不确定"）部分得分，错误回答不得分。

SimpleQA 发布时的核心发现是：即使是最强的 GPT-4o 模型，在这批"简单"事实问题上的准确率也仅为 38.2%，说明当前顶级模型在事实可靠性上仍有显著缺口，模型的高置信度输出中包含大量幻觉。这一结果对"模型是否知道自己不知道"（calibration）的研究具有重要参考价值。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2024 |
| 大小 | 4,326 道题 |
| 题目格式 | 简短开放性问答（明确可验证答案） |
| 覆盖领域 | 幻觉、知识 |
| 语言 | 英文 |

## 当前状态

该基准处于 active 状态。饱和阈值设为 80%。GPT-4o 的已知得分为 38.2%，为该基准的早期基线数据点；其他主流模型的对比数据以各自发布报告为准。由于题目有唯一标准答案，评判简单可靠。污染风险主要来自题目中的事实本身可能出现在训练数据中，但因问题问法多样，机械记忆的帮助有限。

## 主要局限

- **题目来源局限于英文知识域**：4,326 道题的知识背景以英语世界的历史、文化、科学为主，对其他语言文化背景的事实覆盖不足。
- **"简单"界定存在争议**：部分题目对人类而言也未必容易，"SimpleQA"的命名可能误导对基准难度的预期。
- **不覆盖推理型幻觉**：基准仅测试单步事实提取，无法捕捉模型在多步推理过程中逐步积累的幻觉错误。

## 相关页面

- [[TruthfulQA]]
- [[hallucination-evaluation]]
- [[MMLU]]
