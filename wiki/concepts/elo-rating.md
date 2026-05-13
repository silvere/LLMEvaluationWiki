---
title: "Elo 评分与 Bradley-Terry 模型"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
---

# Elo 评分与 Bradley-Terry 模型

> 将竞技体育中的配对比较排名方法引入 LLM 评测，用以从人类投票数据中估计模型相对实力。

## 定义

Elo 评分系统最初由匈牙利裔物理学家 Arpad Elo 设计，用于国际象棋选手排名。其核心思想是：每次比赛结果都会更新双方分数，胜者从败者处获得积分，积分变动幅度取决于双方实力差距。Bradley-Terry 模型是 Elo 的统计学推广，使用最大似然估计从全量配对数据中联合拟合所有模型的实力参数。

## 重要性（在 LLM 评测中）

Chatbot Arena 使用配对盲测（用户不知道对话是哪个模型生成的）收集偏好数据，Elo/Bradley-Terry 分数成为业界最广泛引用的人类偏好排名指标。相比直接打分，配对比较对标注者的要求更低，一致性也更高。

## 主要方法/实现

- **在线 Elo**：每场比赛结束后立即更新双方分数，实现简单，但对比赛顺序敏感，早期分数不稳定。
- **Bradley-Terry 模型**：离线批量估计，利用全部历史数据联合优化，结果更稳定、可复现性更好。LMSYS 已从在线 Elo 迁移到 Bradley-Terry 模型。
- **am-ELO（ICML 2025）**：在 Bradley-Terry 基础上同时估计模型分数和标注者可靠性，减少低质量投票的干扰。

## 局限与挑战

- **顺序敏感性**：在线 Elo 的分数依赖比赛顺序，相同的比赛结果以不同顺序输入可能得到不同排名。
- **冷启动问题**：新模型刚加入时比赛场次少，分数方差大。
- **投票操纵**：Arena 的开放投票机制存在被组织刷票的风险。
- **Arena 第 1 与第 10 名 Elo 差距**：从 2023 年的 11.9% 缩小到 2025 年的 5.4%，顶部模型实力差距正在收窄，排名区分度下降。

## 相关页面

- [[LMSYS-Chatbot-Arena]] — Elo/Bradley-Terry 的主要应用场景
- [[human-preference-eval]] — 偏好数据的收集方式
- [[goodharts-law]] — 排名系统本身成为优化目标带来的问题
