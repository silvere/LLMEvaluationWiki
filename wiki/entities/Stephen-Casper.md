---
title: "Stephen Casper"
type: entity
entity_type: person
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://stephencasper.com/"
  - "https://scholar.google.com/citations?user=zaF8UJcAAAAJ"
aliases:
  - Cas Casper
  - Stephen "Cas" Casper
affiliation: "MIT EECS（Algorithmic Alignment Group, advisor Dylan Hadfield-Menell）· Harvard Berkman Klein Center Fellow"
position: "PhD Researcher (final year) · MATS / ERA / GovAI 导师"
education: ["MIT PhD candidate（EECS）", "Harvard BA"]
research_focus:
  - AI safety
  - Red teaming
  - Capability evaluation
  - Latent adversarial training
  - Technical governance
homepage: "https://stephencasper.com/"
google_scholar: "https://scholar.google.com/citations?user=zaF8UJcAAAAJ"
domain:
  - entity
---

# Stephen Casper

> MIT EECS PhD（终篇阶段）于 Dylan Hadfield-Menell 的 Algorithmic Alignment Group；Harvard Berkman Klein Center fellow。AI 安全评测、红队评测、对抗鲁棒性测度方面高产的批判性研究者。

## 基本信息

- **所属机构**：MIT EECS（Algorithmic Alignment Group）·Harvard Berkman Klein Center
- **职位**：PhD researcher（最后一年）；MATS / ERA / GovAI 导师
- **导师**：Dylan Hadfield-Menell
- **链接**：[主页](https://stephencasper.com/) · [Google Scholar](https://scholar.google.com/citations?user=zaF8UJcAAAAJ)

## 评测领域主要贡献

**对齐评测批判**：长期发声指出当前主流对齐评测（行为打分、preference learning）的局限：模型在表面通过评测但 internal weight 可被轻易 tamper 出有害行为，挑战「评测通过即对齐」的工业惯例。这条批判线推动 [[capability-elicitation]] / latent adversarial evaluation 等新方法论。

**Model Tampering Attacks for Capability Evaluation**：提出通过对模型权重做小幅 tampering 来评估 capability 的方法，论证模型 weight 可被轻易"激活"出 hidden capability，对 [[HarmBench]] / [[WMDP]] 等 dangerous capability 评测协议的稳健性提出关键挑战。

**Red Teaming Methodology**：合著 *Red Teaming Deep Neural Networks with Feature Synthesis Tools*（NeurIPS 2023），把红队评测从「人工 prompt」升级为「自动化 feature 合成」，推动 [[red-teaming]] 评测自动化范式。

**A Safe Harbor for AI Evaluation and Red Teaming**：共同提出独立 AI 评测和红队工作应在法律和政策框架下获得豁免保护，这一框架被多个国家 AISI 引用，是评测合规化的关键政策文件。

## 代表性工作

- *Red Teaming Deep Neural Networks with Feature Synthesis Tools*（NeurIPS 2023）
- *A Safe Harbor for AI Evaluation and Red Teaming*（2024 政策报告）
- Tampering Attacks for Capability Evaluation 系列工作
- Latent Adversarial Training 系列

## 本 wiki 收录的该作者论文

<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:START -->
*（截至 2026-05-17，本 wiki 暂未收录 Stephen Casper 作为作者的论文）*
<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:END -->

## 相关页面

- [[MIT-CSAIL]]
- [[Andy-Zou]]
- [[Center-for-AI-Safety]]
- [[HarmBench]]
- [[red-teaming]]
- [[safety-eval-landscape]]
