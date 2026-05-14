---
title: "GPT-4 Technical Report"
type: source
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
source_type: report
url: "https://openai.com/research/gpt-4"
arxiv_id: ""
authors: ["OpenAI"]
published: "2023-03-15"
ingested: "2026-05-14"
license: "OpenAI Technical Report"
discusses: ["[[GPT-4|GPT-4]]", "[[multimodal-eval|多模态模型]]", "[[rlhf|RLHF]]", "[[capability-vs-alignment|对齐]]", "[[safety-eval-landscape|安全评测]]"]
sources:
  - "https://openai.com/research/gpt-4"
---

# GPT-4 Technical Report

> OpenAI 发布 GPT-4 技术报告，描述其多模态大语言模型在学术基准和专业考试上的能力，以及安全对齐工作，但未披露模型规模和训练细节。

## 核心主张
- [CLAIM]: GPT-4 是多模态模型，可接受图像和文本输入，输出文本，在视觉理解任务上优于 GPT-3.5。
- [CLAIM]: GPT-4 在多项标准化专业考试中表现突出：Bar Exam（律师资格）约达第 90 百分位，SAT Math 约达第 89 百分位，GRE 各部分均在较高百分位。
- [CLAIM]: 在 MMLU 上，GPT-4 准确率约为 86.4%（5-shot），显著超过 GPT-3.5 的约 70%。
- [CLAIM]: GPT-4 的安全训练（基于 RLHF 和 Rule-Based Reward Models）使其在 TruthfulQA 和有害内容拒绝上明显优于 GPT-3.5，但报告指出模型仍可能产生幻觉和错误推理。

## 方法论摘要

报告未公开模型架构、参数量、训练数据规模及计算成本（出于竞争和安全考量）。安全评测包括红队测试（约 50 名专家参与）和自动化评测。多模态能力通过 VQA、图表理解等任务验证。专业考试使用官方真题或模拟题。

## 数据与结果

- MMLU（5-shot）：约 86.4%（GPT-3.5：约 70%）
- Bar Exam：约第 90 百分位（GPT-3.5：约第 10 百分位）
- SAT Math：约第 89 百分位
- TruthfulQA（MC2）：GPT-4 约 59%（GPT-3.5 约 47%）
- HumanEval（代码）：约 67%（GPT-3.5：约 48%）

## 局限与争议

- 报告刻意不披露模型规模、架构和训练数据，被研究界批评为缺乏透明度。
- 专业考试成绩使用模拟题，与真实考试场景的差异未评估。
- 多模态评测数据有限，视觉推理能力边界不清晰。
- 幻觉问题在报告中被承认但未定量评估。

## 相关 wiki 页

- [[GPT-4|GPT-4]]
- [[multimodal-eval|多模态模型]]
- [[MMLU]]
- [[capability-vs-alignment|对齐]]
- [[safety-eval-landscape|安全评测]]
