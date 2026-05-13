---
title: "LMSYS Chatbot Arena"
type: leaderboard
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
---

# LMSYS Chatbot Arena

> 基于用户盲测配对投票的 LLM 排行榜，业界人类偏好评测的事实标准。

## 基本信息

- **运营者**：LMSYS Org（现 Arena Intelligence Inc.）
- **网址**：lmarena.ai（原 chat.lmsys.org）
- **评测类型**：人类偏好，配对盲测
- **投票规模**：截至 2025 年累计 600 万+ 投票

## 评分机制

用户与两个匿名模型同时对话，对话结束后选择更好的一方（或平局），随后揭晓模型身份。收集的配对偏好数据通过 Bradley-Terry 模型估计每个模型的实力分数（Elo 形式呈现）。

- **早期**：在线 Elo 算法，存在顺序敏感问题
- **现在**：Bradley-Terry 模型，更稳定可靠
- **最新进展（ICML 2025）**：am-ELO，同时估计模型得分和标注者可靠性

技术实现详见 [[chatbot-arena-platform]]。

## 行业地位

Arena 排名是 LLM 发布时被引用最广泛的排行榜，OpenAI、Anthropic、Google 等公司发布新模型时均将 Arena 排名作为重要参考指标。Arena 第一名被视为"最强通用聊天模型"的市场认可。

## 关键数据

- 第 1 和第 10 名的 Elo 差距：从 2023 年的 **11.9%** 缩小到 2025 年的 **5.4%**，顶部模型差距正在收窄，排名区分度下降。
- 融资情况：2025 年 Arena Intelligence Inc. 获 1 亿美元融资，估值 6 亿美元。

## 局限与挑战

- **投票操纵风险**：开放参与机制存在被组织刷票的可能，Arena 已承认存在此问题。
- **用户偏差**：参与者以技术社区用户为主，提问类型偏向代码、知识问答，覆盖不了专业领域长尾任务。
- **Goodhart 问题**：模型开发者开始针对 Arena 用户偏好（流畅措辞、Markdown 格式等）优化，而非真实能力。
- **评测成本**：需要大量人类投票，新模型上线后到获得足够可靠分数需要较长时间。

## 相关页面

- [[LMSYS-Org]] — 运营团队
- [[chatbot-arena-platform]] — 平台技术实现
- [[elo-rating]] — 排名算法
- [[human-preference-eval]] — 方法论背景
- [[goodharts-law]] — Arena 排名本身成为优化目标的问题
