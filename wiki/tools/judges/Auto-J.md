---
title: "Auto-J"
type: tool
dimension: K
subdimension: judge-model
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://arxiv.org/abs/2310.05470"
  - "https://github.com/GAIR-NLP/auto-j"
aliases:
  - Auto-J
  - AutoJ
arxiv_id: "2310.05470"
official_url: "https://github.com/GAIR-NLP/auto-j"
license: "Apache-2.0"
org: "GAIR-NLP (SJTU)"
github_url: "https://github.com/GAIR-NLP/auto-j"
domain:
  - dialog
---

# Auto-J

> 上海交大 GAIR Lab（[[Pengfei-Liu]] 团队）2023-10 推出的 13B 开源 generative judge。覆盖 58 个真实用户场景，输出 pairwise 判断 + 单点评分 + 详细理由。亮点是「真实用户场景」训练分布——query 来自真实用户而非合成。

## 设计

- **基座**：LLaMA-2-13B fine-tune
- **训练数据**：人工 query + GPT-4 生成回答 + 评分理由
- **覆盖**：58 个场景（写作、咨询、翻译、问答、推理、coding 等）
- **三种评测模式**：pairwise / single-point / 多维度细评分

## 评测圈意义

- 首个明确按「真实用户场景」训练的开源 judge
- 推动「judge 应该理解任务多样性」的方法论
- 配合 [[PandaLM]] / [[JudgeLM]] 形成早期开源 judge 三件套

## 已知 pitfall

- 评分理由可能过长（吞吐慢于 [[JudgeLM]]）
- 跨语言能力有限
- 在客观正确性任务（math/code）上偏差大

## 相关页面

- [[Pengfei-Liu]]
- [[JudgeLM]]
- [[PandaLM]]
- [[Prometheus]]
- [[llm-as-judge]]
