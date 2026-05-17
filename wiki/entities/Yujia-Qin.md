---
title: "Yujia Qin"
type: entity
entity_type: person
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://yujia-qin.github.io/"
  - "https://scholar.google.com/citations?user=njm-G8wAAAAJ"
aliases:
  - 秦禹嘉
  - Yujia Qin
affiliation: "Tsinghua University 校友 / OpenBMB / 工业界（毕业 2024）"
position: "Researcher（LLM/VLM-based agents）"
education: ["清华大学 PhD（2024，CS，advisor 刘知远）", "清华大学 BS（2020，EE，advisor 吴及）"]
research_focus:
  - LLM agents
  - Tool use evaluation
  - Multi-agent systems
homepage: "https://yujia-qin.github.io/"
google_scholar: "https://scholar.google.com/citations?user=njm-G8wAAAAJ"
domain:
  - entity
---

# Yujia Qin（秦禹嘉）

> 清华 NLP Lab 与 OpenBMB 系研究者（2024 PhD），ToolLLM / ToolBench 的主创作者。中国 LLM 评测圈在「tool use / agent eval」方向最重要的青年研究者之一。

## 基本信息

- **所属机构**：Tsinghua University 校友 / OpenBMB（开源）/ 工业界
- **职位**：Researcher（LLM/VLM-based agents 方向）
- **学历背景**：清华大学 PhD（2024，CS，advisor 刘知远）；清华大学 BS（2020，EE，advisor 吴及）
- **链接**：[主页](https://yujia-qin.github.io/) · [Google Scholar](https://scholar.google.com/citations?user=njm-G8wAAAAJ)

## 评测领域主要贡献

**ToolLLM / ToolBench**（[[2307.16789]]）：与团队共同建立 ToolBench——首个大规模工具学习评测套件，覆盖 RapidAPI Hub 的 16,464 个真实 RESTful API（跨 49 类）。基于此训练 ToolLLaMA，在工具调用任务上达到与 ChatGPT 相当水平。ICLR 2024 spotlight。

**Tool Learning 评测范式奠基**：把 tool-use evaluation 从「单 API call」推向「multi-step 真实 API 组合」——影响后续 [[BFCL]] / [[StableToolBench]] / [[tau-bench]] 等 agent + tool 评测的设计思路。

**StableToolBench**：与团队进一步推出 StableToolBench，解决 ToolBench 在 API endpoint 漂移时的评测不稳定性问题，是「dynamic benchmark stabilization」的代表实践。

**OpenBMB 工具生态**：参与 OpenBMB 开源团队的多个项目，把 tool-use 训练数据和评测协议公开，对中文 LLM 评测开源生态有显著贡献。

## 代表性工作

- [[2307.16789|ToolLLM: Facilitating LLMs to Master 16000+ Real-world APIs]]（ICLR 2024 Spotlight）
- StableToolBench
- 多个 OpenBMB 开源工具评测项目

## 本 wiki 收录的该作者论文

<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:START -->
*共 1 篇（截至 2026-05-17，按发表年份倒序）*

- [[2307.16789|ToolLLM: Facilitating Large Language Models to Master 16000+ Real-world APIs]]（2023）
<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:END -->

## 相关页面

- [[Tsinghua-NLP]]
- [[Maosong-Sun]]
- [[Shunyu-Yao]]
- [[tau-bench]]
- [[BFCL]]
- [[agent-eval]]
