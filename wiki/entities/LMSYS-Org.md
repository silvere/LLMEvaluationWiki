---
title: "LMSYS Org"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
---

# LMSYS Org

> UC Berkeley 发起的大模型系统研究组织，Chatbot Arena 和 MT-Bench 的创建者。

## 基本信息

- **全称**：Large Model Systems Organization
- **发起机构**：UC Berkeley
- **现状**：已转型为商业公司 Arena Intelligence Inc.，2025 年获得 1 亿美元融资，估值 6 亿美元

## 主要贡献

### Chatbot Arena
LMSYS 最具影响力的项目，通过匿名配对盲测收集用户偏好，已累计 600 万+ 投票（截至 2025 年）。Arena 排名被 OpenAI、Anthropic、Google 等主要 AI 公司广泛引用，是业界最受认可的人类偏好排行榜。详见 [[LMSYS-Chatbot-Arena]] 和 [[chatbot-arena-platform]]。

### MT-Bench
多轮对话评测 benchmark，用 GPT-4 作为裁判评分，是 LLM-as-Judge 方法的重要早期实践，推动了该评测范式的普及。详见 [[llm-as-judge]]。

### Vicuna
基于 LLaMA 的开源对话模型，是早期最强的开源 ChatGPT 替代品之一，也是 Chatbot Arena 建立初期的参照基准模型之一。

## 技术方法论演进

- 评分方法从在线 Elo 算法迁移到更稳定的 Bradley-Terry 模型。
- 2025 年提出 am-ELO（ICML 2025），同时估计模型分数和标注者可靠性。

## 对评测生态的影响

LMSYS 确立了"人类偏好"作为 LLM 质量衡量维度的行业共识，推动了配对盲测作为评测方法论的标准化。Arena 排名的广泛引用也带来了 Goodhart 定律风险：模型开发者开始针对 Arena 用户群的偏好优化。

## 相关页面

- [[LMSYS-Chatbot-Arena]] — 核心产品排行榜
- [[chatbot-arena-platform]] — 平台技术实现
- [[elo-rating]] — 底层排名算法
- [[llm-as-judge]] — MT-Bench 所用方法
