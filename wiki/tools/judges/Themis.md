---
title: "Themis"
type: tool
dimension: K
subdimension: judge-model
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://aclanthology.org/2024.emnlp-main.891/"
aliases:
  - Themis
  - Themis-Eval
license: "Apache-2.0"
domain:
  - dialog
---

# Themis

> EMNLP 2024 发表的 reference-free NLG 评测语言模型。亮点：**不需要参考答案**也能给出可解释评分（区别于 BLEU / ROUGE 等 reference-based 指标），适合开放生成任务。

## 设计

- **reference-free**：不需要 gold answer，仅基于 prompt + 模型输出评分
- **多维度评测**：连贯性、相关性、事实性、流畅性等可配置维度
- **interpretable**：输出评分 + 理由

## 评测圈意义

- 解决「开放生成任务没有标准答案」的评测痛点
- 与 [[Prometheus]] / [[Auto-J]] 形成 reference-free judge 子赛道
- 适合 summarization / dialog generation / story generation 等场景

## 已知 pitfall

- reference-free 评分主观性强，跨域可靠性有限
- 仍需要 prompt engineering 调 rubric
- 学术工具，工程化程度低于 Prometheus

## 相关页面

- [[Prometheus]]
- [[Auto-J]]
- [[llm-as-judge]]
