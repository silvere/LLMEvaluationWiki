---
title: "Devin"
type: harness
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
developer: "Cognition AI"
official_url: "https://www.cognition.ai/"
github: ""
arxiv_id: ""
license: "proprietary"
supported_benchmarks:
  - "[[SWE-bench]]"
  - "[[SWE-bench-Verified]]"
sources:
  - "https://www.cognition.ai/"
  - "https://www.cognition.ai/blog/introducing-devin"
domain:
  - agent
  - code
dimension: A
subdimension: harness
---

# Devin

> Cognition AI 推出的闭源 autonomous software engineer agent。2024-03 发布时是首个声称在 SWE-bench 上达到 13.86% (no-assist) 的端到端 agent，引发了"AI software engineer"赛道的资本与产品讨论。

## 基本信息

- **开发方**：Cognition AI
- **首次发布**：2024-03-12
- **形态**：闭源商业产品，提供完整的 IDE / 浏览器 / 终端 / shell 沙箱
- **特色**：long-horizon planning + 失败自恢复

## 设计要点

- 完全闭源，技术细节不公开，外界主要通过 demo 视频和官方 blog 了解
- 在 [[SWE-bench]] 上的 13.86% 是 2024 早期最高水平，但后续被 SWE-agent / OpenHands 等开源 harness 超越
- 后续 Cognition 团队聚焦于产品化（Devin GA），不再频繁发布 benchmark 数字

## 应用 benchmark

- [[SWE-bench]] / [[SWE-bench-Verified]]

## 备注

本页为 stub。Devin 是商业闭源产品，benchmark 评测数字主要来自官方 blog；社区无法独立复现。
