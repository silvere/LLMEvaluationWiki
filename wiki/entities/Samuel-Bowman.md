---
title: "Samuel R. Bowman"
type: entity
entity_type: person
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://cims.nyu.edu/~sbowman/"
  - "https://sleepinyourhat.github.io/"
  - "https://scholar.google.com/citations?user=kV9XRxYAAAAJ"
aliases:
  - Sam Bowman
  - Samuel Bowman
  - Samuel R Bowman
affiliation: "Anthropic（2023+，全职）· NYU CDS / CS（长期休假）"
position: "Member of Technical Staff, Anthropic · NYU Associate Professor（leave）"
education: ["Stanford PhD（语言学/CS）"]
research_focus:
  - Benchmark design
  - Scalable oversight
  - Natural language inference
  - AI safety evaluation
homepage: "https://sleepinyourhat.github.io/"
google_scholar: "https://scholar.google.com/citations?user=kV9XRxYAAAAJ"
domain:
  - entity
---

# Samuel R. Bowman

> NYU 数据科学与计算机科学副教授（长期 leave）；2023 起全职加入 Anthropic 做 technical AI safety。NLI / GLUE 类 NLU 评测的奠基者之一，近年转向 scalable oversight 与 GPQA 等 frontier reasoning 评测。

## 基本信息

- **所属机构**：Anthropic（全职，2023+）· NYU CDS / CS（长期休假）
- **职位**：Anthropic Member of Technical Staff；NYU 副教授（leave）
- **学历背景**：Stanford PhD（语言学 / 计算机科学）
- **链接**：[NYU 主页](https://cims.nyu.edu/~sbowman/) · [个人 blog](https://sleepinyourhat.github.io/) · [Google Scholar](https://scholar.google.com/citations?user=kV9XRxYAAAAJ)

## 评测领域主要贡献

**SNLI / MultiNLI / XNLI 奠基**：Stanford 博士期间主导构建 **SNLI**（2015，57万对句子）——NLP 历史上首个大规模自然语言推理数据集；后续扩展为 **MultiNLI**（2018，多体裁）、**XNLI**（2018，跨语言）。这套数据集成为 NLI 评测的事实标准，催生了关于"shortcut learning"、hypothesis-only baseline、annotation artifact 等评测可靠性议题。

**GLUE / SuperGLUE**：与 Alex Wang 等共同建立 [[GLUE]]（2018）和 [[SuperGLUE]]（2019），NLU 评测进入"多任务标准化"时代的里程碑。后续 [[BIG-bench]] / [[MMLU]] / [[HELM]] 都延续其多任务 leaderboard 范式。

**ANLI（Adversarial NLI）**：参与开发对抗性 NLI 数据集，通过迭代式 human-in-the-loop 构造模型无法走捷径的推理样本，开创"动态对抗评测"范式（影响后续 Dynabench 类项目）。

**[[GPQA]]（2023）**：与 David Rein、Julian Michael 等共同提出研究生级 Google-proof Q&A 评测；GPQA Diamond 子集成为 2024-26 frontier 模型的事实推理评测，与 [[FrontierMath]] / [[HLE]] 并列为 reasoning eval 顶峰。

**Scalable Oversight 评测范式**：在 NYU Alignment Research Group 主推「scalable oversight」议程——如何评测超过人类能力的 AI 行为，通过 debate、weak-to-strong supervision、AI-assisted human evaluation 等方法学构造可外推的评测协议。

**LLM 能力批评**：长期公开讨论 LLM 评测中的「捷径学习」「假性涌现」「Chain-of-Thought 的真实性」等问题；著有批评性综述 *Eight Things to Know about Large Language Models*（2023）。

**Anthropic Safety / Alignment 评测**：2023 全职加入 Anthropic，参与 Claude 系列 system card 中 RSP（Responsible Scaling Policy）评测的设计——尤其涉及 [[capability-elicitation]] / [[red-teaming]] 等 ASL-3/4 触发评测的协议工程化。

## 代表性工作

- **SNLI**（EMNLP 2015）
- **MultiNLI**（NAACL 2018）/ **XNLI**（EMNLP 2018）
- [[1804.07461|GLUE: A Multi-Task Benchmark]]（2018）
- [[1905.07830|SuperGLUE]]（2019）
- **ANLI**（ACL 2020）
- *GPQA: A Graduate-Level Google-Proof Q&A Benchmark*（COLM 2024 Spotlight）
- *Eight Things to Know about Large Language Models*（2023 批评性综述）

## 本 wiki 收录的该作者论文

<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:START -->
*共 3 篇（截至 2026-05-17，按发表年份倒序）*

- [[2311.12983|GPQA: A Graduate-Level Google-Proof Q&A Benchmark]]（2023）
- [[1905.07830|SuperGLUE: A Stickier Benchmark for General-Purpose Language Understanding Systems]]（2019）
- [[1804.07461|GLUE: A Multi-Task Benchmark and Analysis Platform for Natural Language Understanding]]（2018）
<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:END -->

## 相关页面

- [[Anthropic]]
- [[Julian-Michael]]
- [[Andrej-Karpathy]]
- [[GLUE]]
- [[SuperGLUE]]
- [[GPQA]]
- [[ANLI]]
- [[SNLI]]
- [[MultiNLI]]
- [[XNLI]]
