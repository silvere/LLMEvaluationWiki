---
title: "PandaLM"
type: tool
dimension: K
subdimension: judge-model
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://github.com/WeOpenML/PandaLM"
  - "https://arxiv.org/abs/2306.05087"
aliases:
  - PandaLM
arxiv_id: "2306.05087"
official_url: "https://github.com/WeOpenML/PandaLM"
license: "Apache-2.0"
cn_name: "PandaLM 评测器"
github_url: "https://github.com/WeOpenML/PandaLM"
domain:
  - dialog
---

# PandaLM

> 北大 / 西湖大学 2023-06 推出的开源 LLM judge。名字来自 "reProducible AND automated Language Model assessment"。基于 LLaMA fine-tune 而成的偏好判断模型，主打**复现性** + **自动化**。是 [[JudgeLM]] / [[Auto-J]] 这条路线的早期工作之一。

## 设计

- **基座**：LLaMA-7B fine-tune
- **训练**：GPT-3.5 蒸馏 + 人工标注的偏好数据
- **输出**：A/B/Tie 三档 + 简短理由
- **目标**：让本地 / 离线评测可复现，不依赖 OpenAI API

## 评测圈意义

- 是「开源 judge 模型」赛道的早期标杆
- 推动 reproducible LLM eval 概念
- 被 JudgeLM / Auto-J 后续工作对照

## 已知 pitfall

- 7B 基座能力有限，与 GPT-4 judge 一致率仅 ~70%
- 训练数据偏 GPT-3.5 风格
- 已被 [[JudgeLM]] / [[Prometheus]] 系列在准确率上超越

## 相关页面

- [[JudgeLM]]
- [[Auto-J]]
- [[Prometheus]]
- [[llm-as-judge]]
