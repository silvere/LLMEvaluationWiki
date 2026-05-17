---
title: "Noam Brown"
type: entity
entity_type: person
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://noambrown.github.io/"
  - "https://scholar.google.com/citations?user=RLDbLcUAAAAJ"
aliases:
  - Noam Brown
  - polynoamial
affiliation: "OpenAI（2023+，前 FAIR / 前 CMU PhD）"
position: "Research Scientist"
education: ["CMU PhD（CS，导师 Tuomas Sandholm）"]
research_focus:
  - Multi-step reasoning
  - Self-play
  - Game-theoretic AI
  - Test-time compute scaling
homepage: "https://noambrown.github.io/"
google_scholar: "https://scholar.google.com/citations?user=RLDbLcUAAAAJ"
domain:
  - entity
---

# Noam Brown

> OpenAI Research Scientist；o1 推理模型的 foundational contributor。从扑克 AI（Libratus / Pluribus）到 Diplomacy AI（CICERO），把 game-theoretic reasoning 范式带入 LLM 推理评测——其「20 秒思考相当于 100,000× 数据」论断是 inference-time scaling 评测范式的标志性表述。

## 基本信息

- **所属机构**：OpenAI（2023 起）
- **职位**：Research Scientist
- **学历背景**：CMU PhD（CS，导师 Tuomas Sandholm）
- **链接**：[主页](https://noambrown.github.io/) · [Google Scholar](https://scholar.google.com/citations?user=RLDbLcUAAAAJ) · [X (@polynoamial)](https://x.com/polynoamial)

## 评测领域主要贡献

**Libratus / Pluribus 扑克 AI 评测**：CMU 期间与导师 Tuomas Sandholm 共同建立 Libratus（heads-up no-limit poker）和 Pluribus（multi-player）—— 首个在不完全信息博弈中击败人类顶级职业选手的 AI。Libratus 获 Marvin Minsky Medal，Pluribus 登上 Science 封面。这些工作建立了「Human vs Machine」对弈评测的工程协议。

**CICERO Diplomacy AI**：在 FAIR（Meta）期间共同主导 CICERO——首个在 Diplomacy 这种需要自然语言谈判 + 战略博弈的游戏中达到人类水平的 AI。CICERO 评测协议结合自然语言对话评测和战略决策评测，是后续 agent 评测（[[tau-bench]] / [[OSWorld]]）的概念前身。

**o1 推理模型奠基**：2023 加入 OpenAI 后，作为 o1 / "strawberry" 项目的 foundational contributor，把 search + self-play + multi-step reasoning 的方法学带入 LLM。其 TED AI 演讲名句 "20 seconds of thinking worth 100,000x more data" 成为 [[inference-time-scaling]] 评测范式的简明表达。

**Test-Time Compute Evaluation**：推动「以推理 token 预算换准确率」的评测协议成型，影响 o1 / o3 / Gemini Deep Think 系列在 [[AIME]] / [[GPQA]] / [[FrontierMath]] 上的报告范式（multi-budget pass@1 + best-of-N）。

## 代表性工作

- *Superhuman AI for heads-up no-limit poker: Libratus*（Science 2017）
- *Superhuman AI for multiplayer poker: Pluribus*（Science 2019）
- *CICERO: Human-Level Play in Diplomacy*（Science 2022）
- o1 / o3 推理模型评测协议
- TED AI Conference 2024 keynote on test-time compute

## 本 wiki 收录的该作者论文

<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:START -->
*（截至 2026-05-17，本 wiki 暂未收录 Noam Brown 作为作者的论文）*
<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:END -->

## 相关页面

- [[OpenAI]]
- [[Mark-Chen]]
- [[Aaron-Jaech]]
- [[inference-time-scaling]]
- [[AIME]]
- [[GPQA]]
- [[agent-eval]]
