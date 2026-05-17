---
title: "Quoc V. Le"
type: entity
entity_type: person
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://research.google/people/quocle/"
  - "https://scholar.google.com/citations?user=vfT6-XIAAAAJ"
  - "https://en.wikipedia.org/wiki/Quoc_V._Le"
aliases:
  - Quoc Le
  - Quoc V Le
  - Le Viet Quoc
affiliation: "Google DeepMind (Google Fellow)"
position: "Google Fellow & Founding Member of Google Brain"
education: ["Stanford PhD（CS, advisor: Andrew Ng）"]
research_focus:
  - Seq2seq / encoder-decoder
  - AutoML / Neural Architecture Search
  - Self-supervised learning
  - LLM reasoning
homepage: "https://research.google/people/quocle/"
google_scholar: "https://scholar.google.com/citations?user=vfT6-XIAAAAJ"
domain:
  - entity
---

# Quoc V. Le

> Google DeepMind 的 Google Fellow；Google Brain 创始成员之一；深度学习领域的 prolific contributor（seq2seq、AutoML、CoT、scaling）。多项目影响 LLM 评测方法学与基准设计。

## 基本信息

- **所属机构**：Google DeepMind（Google Fellow，2023 Brain → DeepMind 重组后转入）
- **职位**：Google Fellow；Google Brain 创始成员
- **学历背景**：Stanford PhD（CS，导师 Andrew Ng）；越南河内国家大学 BS
- **链接**：[Google Research 主页](https://research.google/people/quocle/) · [Google Scholar](https://scholar.google.com/citations?user=vfT6-XIAAAAJ) · [Wikipedia](https://en.wikipedia.org/wiki/Quoc_V._Le)

## 评测领域主要贡献

**Chain-of-Thought 与 Self-Consistency**：与 Jason Wei、Denny Zhou 等共同推动 CoT prompting 和 Self-Consistency 系列论文（2022），是当前 [[AIME]] / [[GSM8K]] / [[MATH]] / [[MMLU-Pro]] 等推理评测主流报告范式的方法学奠基。

**Seq2seq 与 LSTM 评测**：合著 *Sequence to Sequence Learning with Neural Networks*（2014），把 encoder-decoder 范式从概念变成可评测的基线。这一架构与评测约定影响后续 [[BLEU]] / [[ROUGE]] / [[GLUE]] 等 NLP 评测的设计基线。

**AutoML / Neural Architecture Search**：主导 NAS 系列（NASNet、EfficientNet 等），定义 architecture search 的评测协议（搜索代价 + 最终精度 + transfer 性能）。

**Emergent Capabilities & PaLM 评测**：作为 PaLM / PaLM-2 项目核心，参与定义大模型在 [[BBH]] / [[MMLU]] / [[HumanEval]] 等多任务评测的报告组合。

**Deep Think IMO 金牌（2026）**：参与建议 Gemini Deep Think 在 2026 IMO（国际数学奥林匹克）达到金牌水平的工程评测路径——这是 reasoning 评测在 frontier 模型上的标志性事件。

## 代表性工作

- *Sequence to Sequence Learning with Neural Networks*（NeurIPS 2014）
- *Chain-of-Thought Prompting Elicits Reasoning in LLMs*（NeurIPS 2022，共同作者）
- *Self-Consistency Improves Chain of Thought*（ICLR 2023，共同作者）
- NASNet / EfficientNet 系列
- PaLM / PaLM-2 / Gemini 等模型评测协议参与

## 本 wiki 收录的该作者论文

<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:START -->
*共 4 篇（截至 2026-05-17，按发表年份倒序）*

- [[2201.11903|Chain-of-Thought Prompting Elicits Reasoning in Large Language Models]]（2022）
- [[2203.11171|Self-Consistency Improves Chain of Thought Reasoning in Language Models]]（2022）
- [[2110.14168|Finetuned Language Models Are Zero-Shot Learners]]（2021）
- [[2107.03374|Program Synthesis with Large Language Models]]（2021）
<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:END -->

## 相关页面

- [[Google-DeepMind]]
- [[Denny-Zhou]]
- [[Jason-Wei]]
- [[Yi-Tay]]
- [[chain-of-thought]]
- [[BBH]]
- [[MMLU]]
