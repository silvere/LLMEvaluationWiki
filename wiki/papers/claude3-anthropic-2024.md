---
title: "Claude 3 Model Card"
type: paper
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
source_type: report
url: "https://www.anthropic.com/claude-3-model-card"
arxiv_id: ""
authors: ["Anthropic"]
published: "2024-03-04"
ingested: "2026-05-14"
license: "Anthropic Model Card"
discusses: ["[[Claude|Claude 3]]", "[[RLHF|Constitutional AI]]", "[[safety-eval-landscape|安全评测]]", "[[multimodal-eval|多模态模型]]", "[[capability-vs-alignment|对齐]]"]
sources:
  - "https://www.anthropic.com/claude-3-model-card"
---

# Claude 3 Model Card

> Anthropic 发布 Claude 3 系列（Haiku、Sonnet、Opus）模型卡，描述三个能力梯度的多模态模型，Opus 在多项基准上与 GPT-4 持平或超越，并详细介绍安全评测方法。

## 核心主张
- [CLAIM]: Claude 3 分为 Haiku（最快）、Sonnet（平衡）、Opus（最强）三个版本，满足不同性能/成本需求，均支持视觉输入。
- [CLAIM]: Claude 3 Opus 在 MMLU（5-shot）上约为 86.8%，GPQA Diamond 约为 50.4%，HumanEval 约为 84.9%，在多个专业推理任务上超过或持平 GPT-4 Turbo。
- [CLAIM]: 安全训练基于 Constitutional AI 和 RLHF，模型卡中报告了在 Anthropic 内部安全评测集、TruthfulQA 和越狱测试上的表现。
- [CLAIM]: Claude 3 的上下文窗口为 200K tokens，显著超过同期竞争模型，且在"needle in a haystack"长上下文测试中有效利用率高。

## 方法论摘要

安全评测方法包括：红队测试、ASL-2/ASL-3 安全承诺框架评估、幻觉评测（大海捞针测试）。能力评测使用标准 few-shot 协议，部分任务使用 CoT。模型架构细节未完整公开。

## 数据与结果

- 上下文窗口：200,000 tokens
- Claude 3 Opus MMLU（5-shot）：约 86.8%
- GPQA Diamond：约 50.4%（GPT-4：39.5%）
- HumanEval：约 84.9%
- Needle-in-a-haystack（100K tokens）：检索准确率接近 100%
- GSM8K：约 95.0%

## 局限与争议

- 模型架构和训练数据未完整公开，独立验证受限。
- 安全承诺框架（ASL）目前以自我评估为主，缺乏第三方审计。
- 基准成绩使用内部评测流程，与外部独立评测结果存在一定差异。
- 200K 上下文的实际利用效率在复杂多文档任务上仍有待评估。

## 相关 wiki 页

- [[Claude|Claude 3]]
- [[RLHF|Constitutional AI]]
- [[safety-eval-landscape|安全评测]]
- [[multimodal-eval|多模态模型]]
- [[GPQA]]
- [[CLongEval|长上下文评测]]
