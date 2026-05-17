---
title: "Denny Zhou"
type: entity
entity_type: person
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://dennyzhou.github.io/"
  - "https://scholar.google.com/citations?user=UwLsYw8AAAAJ"
  - "https://www.linkedin.com/in/denny-zhou-7695487"
aliases:
  - 周登勇
  - Dengyong Zhou
affiliation: "Google DeepMind"
position: "Research Scientist, Founder of Reasoning Team（Google Brain → DeepMind / Gemini）"
education: ["中国科学技术大学 PhD"]
research_focus:
  - LLM reasoning
  - Chain-of-Thought
  - Self-consistency
  - Emergent capabilities
homepage: "https://dennyzhou.github.io/"
google_scholar: "https://scholar.google.com/citations?user=UwLsYw8AAAAJ"
domain:
  - entity
---

# Denny Zhou（周登勇）

> Google DeepMind Research Scientist；Google Brain 推理团队（Reasoning Team）创始人，现并入 Gemini 团队。LLM 推理评测的核心方法奠基者之一（Chain-of-Thought、Self-Consistency、Least-to-Most prompting 等）。

## 基本信息

- **所属机构**：Google DeepMind（前 Google Brain，2023 重组并入 DeepMind）
- **职位**：Research Scientist；Reasoning Team 创始人
- **学历背景**：中国科学技术大学 PhD
- **链接**：[主页](https://dennyzhou.github.io/) · [Google Scholar](https://scholar.google.com/citations?user=UwLsYw8AAAAJ) · [LinkedIn](https://www.linkedin.com/in/denny-zhou-7695487)

## 评测领域主要贡献

**Chain-of-Thought (CoT) prompting**：与 Jason Wei、Maarten Bosma、Brian Ichter 等合作的奠基性论文 *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models*（2022），证明让 LLM 生成中间推理步骤可以显著提升数学、常识推理任务的准确率。这是 [[AIME]]、[[GSM8K]]、[[MATH]]、[[MMLU-Pro]] 等推理评测当前主流报告形式（pass@1 with CoT）的方法学起点。

**Self-Consistency**：提出通过多次采样推理路径并投票得到更可靠答案的方法（*Self-Consistency Improves Chain of Thought Reasoning*, 2022），是当前 [[GPQA]]、[[FrontierMath]] 等高难度评测中 majority voting / best-of-N 等指标的方法学基础。

**Least-to-Most Prompting**：提出分解复杂问题为简单子问题的方法（*Least-to-Most Prompting Enables Complex Reasoning*, 2022），影响后续 multi-hop 推理评测设计。

**Emergent capabilities**：与 Jason Wei 等共同推动「涌现能力」（emergent abilities）的评测讨论框架，影响 scaling law 评测论述的方向。

**2026 最新观点**：在公开演讲中指出 "Transformers can solve any problem if they can make as many reasoning steps as needed"，强调 test-time compute 是推理评测的新维度——这与 [[inference-time-scaling]] / o1-style reasoning 评测高度共振。

## 代表性工作

- *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models*（NeurIPS 2022）
- *Self-Consistency Improves Chain of Thought Reasoning in Language Models*（ICLR 2023）
- *Least-to-Most Prompting Enables Complex Reasoning in Large Language Models*（ICLR 2023）
- *Emergent Abilities of Large Language Models*（TMLR 2022，共同作者）
- *Take a Step Back: Evoking Reasoning via Abstraction in Large Language Models*（2023）

## 本 wiki 收录的该作者论文

<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:START -->
*共 3 篇（截至 2026-05-17，按发表年份倒序）*

- [[2201.11903|Chain-of-Thought Prompting Elicits Reasoning in Large Language Models]]（2022）
- [[2206.07682|Emergent Abilities of Large Language Models]]（2022）
- [[2203.11171|Self-Consistency Improves Chain of Thought Reasoning in Language Models]]（2022）
<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:END -->

## 相关页面

- [[Google-DeepMind]]
- [[Jason-Wei]]
- [[chain-of-thought]]
- [[inference-time-scaling]]
- [[AIME]]
- [[GSM8K]]
