---
title: "Hao Zhang"
type: entity
entity_type: person
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-17"
last_verified: "2026-05-17"
sources:
  - "https://haozhang.ai/"
  - "https://cseweb.ucsd.edu/~haozhang/"
  - "https://hao-ai-lab.github.io/"
aliases:
  - Hao Zhang
affiliation: "UC San Diego（HDSI + CSE，Assistant Professor）· 前 UC Berkeley postdoc（与 Ion Stoica）"
position: "Assistant Professor, UCSD HDSI / CSE"
education: ["CMU PhD（CS，2014-2020，导师 Eric Xing）"]
research_focus:
  - ML systems
  - LLM serving
  - Evaluation infrastructure
homepage: "https://haozhang.ai/"
google_scholar: ""
domain:
  - entity
---

# Hao Zhang

> UCSD HDSI 助理教授；Hao AI Lab 创立者。vLLM / Chatbot Arena / Vicuna 等关键 LLM 基础设施与评测项目的共同主创。2026 Sloan Research Fellow。

## 基本信息

- **所属机构**：UC San Diego HDSI + CSE（affiliate）·Hao AI Lab Director ·前 UC Berkeley postdoc（2021-2023，与 Ion Stoica）
- **职位**：Assistant Professor, UCSD
- **学历背景**：CMU PhD（CS，2014-2020，advisor Eric Xing）
- **荣誉**：Sloan Research Fellow (2026) ·MIT TR35 China (2025) ·Google ML & Systems Award (2025) ·OSDI Best Paper (2021)
- **链接**：[主页](https://haozhang.ai/) · [UCSD 主页](https://cseweb.ucsd.edu/~haozhang/) · [Hao AI Lab](https://hao-ai-lab.github.io/)

## 评测领域主要贡献

**Chatbot Arena**（[[Chatbot-Arena]]）：作为共同作者发表 *Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference*（2024）。Chatbot Arena 用 pairwise human preference + Elo 排名构建动态评测平台，目前是全球最有影响力的 LLM 人偏好评测体系，已积累数百万投票。

**vLLM 服务引擎**（[[vLLM]]）：作为 vLLM 共同创建者，建立 LLM 服务的高吞吐、内存高效引擎（PagedAttention）。vLLM 是当前 evaluation pipeline（包括 [[LM-Evaluation-Harness]] / [[OpenCompass]]）最常用的推理后端之一。

**Vicuna 开源 LLM**：与 Lianmin Zheng、Wei-Lin Chiang 等共同发布 Vicuna 系列，是 ChatGPT 时代第一个广受认可的开源对话模型。Vicuna 评测协议（GPT-4-as-Judge + 80 题 MT-Bench 前身）启发了 [[MT-Bench]] / [[Arena-Hard-Auto]] 等 LLM-as-Judge 评测设计。

**FastVideo / DistServe**：进一步推进多模态推理 + 分布式服务，对未来视频生成评测、多模态 streaming 评测的基础设施支撑。

## 代表性工作

- Chatbot Arena（2024）
- vLLM（2023+）
- Vicuna（2023）
- FastVideo / DistServe
- *PagedAttention*（OSDI 2024，vLLM 论文）

## 本 wiki 收录的该作者论文

<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:START -->
*共 1 篇（截至 2026-05-17，按发表年份倒序）*

- [[2305.20050|Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena]]（2023）
<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:END -->

## 相关页面

- [[LMSYS-Org]]
- [[Ion-Stoica]]
- [[Lianmin-Zheng]]
- [[Wei-Lin-Chiang]]
- [[Chatbot-Arena]]
- [[vLLM]]
