---
title: "Prometheus 2"
type: tool
dimension: K
subdimension: judge-model
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://arxiv.org/abs/2405.01535"
  - "https://github.com/prometheus-eval/prometheus-eval"
  - "https://aclanthology.org/2024.emnlp-main.248/"
  - "https://huggingface.co/prometheus-eval"
aliases:
  - Prometheus
  - Prometheus-2
  - Prometheus-7B
  - Prometheus-8x7B
arxiv_id: "2405.01535"
official_url: "https://github.com/prometheus-eval/prometheus-eval"
license: "Apache-2.0"
org: "KAIST AI / Prometheus-Eval"
github_url: "https://github.com/prometheus-eval/prometheus-eval"
domain:
  - dialog
---

# Prometheus 2

> KAIST AI 2024-05 推出的开源专用 LLM judge（EMNLP 2024）。两档：7B（Mistral 基座）+ 8×7B（Mixtral 基座）。支持 direct assessment（单点评分）+ pairwise ranking 两种模式 + 自定义评测 rubric。是当前开源 judge 综合能力最强档之一。

## 关键指标

- 与 GPT-4-1106 在 5 点 Likert 量表上 Pearson 相关 **0.6-0.7**
- 与人类判断在多个 pairwise benchmark 上 **72%-85% 一致率**
- 支持用户自定义 rubric（业务定制友好）

## 设计要点

- 由 7B Prometheus 1 + 8×7B 升级而来
- 训练数据：GPT-4 蒸馏 + 多样化 rubric
- 推理后端可用 vLLM / SGLang 加速

## 评测圈意义

- 商业平台（Confident-AI / Patronus 等）常用作开源替代 GPT-4 judge
- 解决「judge 依赖 OpenAI API」的开源痛点
- 是 [[RAGAs]] / [[DeepEval]] 等评测框架的可选 judge

## 已知 pitfall

- 在客观正确性任务（math/code）上仍输给 GPT-4
- rubric 设计质量直接决定输出质量
- 8×7B 推理成本不低（需 4×A100 起）

## 相关页面

- [[JudgeLM]]
- [[Auto-J]]
- [[RewardBench]]
- [[llm-as-judge]]
- [[DeepEval]]
