---
title: "garak"
type: tool
dimension: I
subdimension: red-team-tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://github.com/NVIDIA/garak"
  - "https://docs.garak.ai/"
aliases:
  - garak
  - NeMo-Guardrails-garak
official_url: "https://github.com/NVIDIA/garak"
license: "Apache-2.0"
org: "NVIDIA"
github_url: "https://github.com/NVIDIA/garak"
domain:
  - safety
---

# garak

> NVIDIA 维护的开源 LLM 漏洞扫描器。「Nessus for LLMs」哲学——**静态 corpus 大量 prompt 自动扫描**已知漏洞类型（prompt injection / data leakage / toxicity / jailbreak 等）。与 [[PyRIT]] 互补（PyRIT 偏动态调查、garak 偏批量扫描）。

## 设计

- **probe 库**：数百个预制 probe（每个 probe = 一类已知攻击向量）
- **静态 corpus**：每个 probe 配置大量 prompt
- **detector**：自动判定响应是否中招
- **配套**：buff（攻击后处理）+ harness（多模型对比）

## 评测圈意义

- LLM release 前的 baseline 漏洞扫描（CI/CD 友好）
- 与 [[PyRIT]] / [[promptfoo]] 形成红队工具三件套
- 被 Databricks / Hugging Face 等平台集成

## 已知 pitfall

- 仅检测**已知**漏洞类型，对 novel attack 无能
- 静态 prompt 易被模型针对性训练防御
- 与 [[PyRIT]] 互补但不可相互替代

## 相关页面

- [[PyRIT]]
- [[promptfoo]]
- [[Petri]]
- [[Giskard]]
- [[HarmBench]]
- [[safety-eval-landscape]]
