---
title: "Jacob Hilton"
type: entity
entity_type: person
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://www.alignment.org/author/jacob/"
  - "https://www.jacobh.co.uk/"
  - "https://scholar.google.com/citations?user=WyKvz7EAAAAJ"
aliases:
  - Jacob Hilton
affiliation: "Alignment Research Center (ARC)"
position: "President & Executive Director, ARC"
education: ["PhD（组合集合论）"]
research_focus:
  - RLHF
  - Truthfulness evaluation
  - Mechanistic interpretability
  - Scaling laws for RL
homepage: "https://www.jacobh.co.uk/"
google_scholar: "https://scholar.google.com/citations?user=WyKvz7EAAAAJ"
domain:
  - entity
---

# Jacob Hilton

> Alignment Research Center（ARC）总裁兼执行总监；前 OpenAI alignment team 核心成员，共同主导 InstructGPT / WebGPT / TruthfulQA 等 RLHF 与真实性评测早期工作。

## 基本信息

- **所属机构**：Alignment Research Center（ARC）
- **职位**：President & Executive Director
- **学历背景**：组合集合论 PhD；曾任 Jane Street 量化研究
- **链接**：[ARC 主页](https://www.alignment.org/author/jacob/) · [个人主页](https://www.jacobh.co.uk/) · [Google Scholar](https://scholar.google.com/citations?user=WyKvz7EAAAAJ)

## 评测领域主要贡献

**InstructGPT / RLHF 实战奠基**：在 OpenAI alignment team 期间共同主导 InstructGPT（ChatGPT 前身）的训练，是 RLHF 在大模型上的工程化奠基。后续 [[rlhf]] / [[Chatbot-Arena]] / [[MT-Bench]] 等基于人类偏好的评测都以此为方法学起点。

**WebGPT 与真实性评测**：参与 [[TruthfulQA]] 与 WebGPT 工作，定义大模型在「主动检索 + 引用」场景下的真实性评测协议；这条路径直接演化为后续 RAG 评测的方法学基础。

**RL Scaling Laws & Overoptimization**：研究 RL 训练的 scaling laws 以及 reward model 过度优化（reward hacking）的量化测度——这是当前 Process Reward Model（[[process-reward-model]]）、[[Reward Hacking 评测]]、[[BFCL]] 工具调用评测中各种 reward signal 偏差讨论的源头。

**ARC 评测理论团队**：与 Paul Christiano、Mark Xu 共同推进 [[ARC-Alignment]] 的 [[eliciting-latent-knowledge|ELK]] 议程，把对齐评测从行为黑盒走向白盒理解。

## 代表性工作

- InstructGPT（OpenAI 2022）
- WebGPT（2021）
- TruthfulQA 工作
- ARC ELK 系列报告

## 本 wiki 收录的该作者论文

<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:START -->
*共 2 篇（截至 2026-05-17，按发表年份倒序）*

- [[2203.02155|Training language models to follow instructions with human feedback]]（2022）
- [[2309.05463|TruthfulQA: Measuring How Models Mimic Human Falsehoods]]（2021）
<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:END -->

## 相关页面

- [[ARC-Alignment]]
- [[Paul-Christiano]]
- [[Long-Ouyang]]
- [[rlhf]]
- [[TruthfulQA]]
- [[process-reward-model]]
