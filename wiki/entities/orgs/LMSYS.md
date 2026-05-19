---
title: "LMSYS Org"
type: entity
entity_type: org
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://www.lmsys.org/about/"
  - "https://lmarena.ai/"
  - "https://news.lmarena.ai/series-a/"
  - "https://en.wikipedia.org/wiki/LMArena"
aliases:
  - LMSYS
  - LMSYS-Org
  - LMSYS Org
  - Large Model Systems Organization
  - LMArena
  - Arena Intelligence
  - Arena.ai
homepage: "https://www.lmsys.org/"
domain:
  - entity
---

# LMSYS Org / LMArena（Large Model Systems Organization）

> 2023 起源于 UC Berkeley / Stanford / UCSD / CMU / MBZUAI 多校联盟，2024-09 注册为非营利组织。2025-05 完成 $100M 种子轮融资（a16z + UC Investments 领投），估值 $600M；2026-01 完成 $150M Series A（Felicis + UC Investments 领投），估值 $1.7B，并将组织品牌正式更名为 **Arena**。旗下 [[Chatbot-Arena]] / SGLang / FastChat / Vicuna 是 LLM 评测与服务领域最具影响力的开源项目。

## 商业化与规模（2026-05 核实）

- **2025-05**：$100M Seed，估值 $600M（a16z + UC Investments 领投）
- **2025-09**：首款商业产品发布
- **2025-12**：年化营收 (annualized run rate) 突破 $30M
- **2026-01**：$150M Series A，估值 $1.7B（Felicis + UC Investments 领投）
- **2026-01**：品牌由 LMSYS / LMArena 统一更名为 **Arena**
- **当前规模**：月活用户 500万+，覆盖 150 国，月对话量 60M+
- **累计投票**：6M+ 真人对战投票，覆盖 400+ 模型

## 旗舰项目

- **[[Chatbot-Arena]]（lmarena.ai → arena.ai）**：community-driven LLM 评测平台
- **[[Arena-Hard-Auto]]**：从 Arena 数据 distill 出来的 500 题自动评测，~89% 与 Arena 排名相关
- **MT-Bench**：早期 multi-turn 评测，是 LLM-as-Judge 方法早期重要实践（推动 [[llm-as-judge]] 范式普及）
- **SGLang**：高性能 LLM 推理引擎（[[Lianmin-Zheng]] / Ying Sheng 主导）
- **FastChat**：早期开源 chat 训练 / serving / eval 一体框架
- **Vicuna**：基于 LLaMA 的早期开源对话模型，Arena 建立期参照基准

## 评测方法论演进

- 评分方法从 online Elo 迁移到更稳定的 **Bradley-Terry 模型**
- 2025 提出 **am-ELO**（ICML 2025）—— 同时估计模型分数与标注者可靠性
- 推动「LLM 评测应该靠人类对战，而不是 multi-choice」的方法论
- 与 OpenAI / Anthropic / Google / xAI 等 frontier lab 紧密合作

## 评测圈影响 + 风险

- **正向**：确立「人类偏好」作为 LLM 质量衡量维度的行业共识，配对盲测成为评测方法论标准
- **Goodhart 风险**：Arena 排名被广泛引用后，模型开发者开始针对 Arena 用户群偏好优化（如 Llama 3.1 405B 据传专门微调以优化 Arena 风格）
- **用户群偏差**：参与对战的用户以英语母语 / 技术背景为主，对中文 / 长尾语种 / 专业领域代表性不足

## 核心成员

- [[Lianmin-Zheng]] / [[Hao-Zhang]] / [[Ion-Stoica]] / Wei-Lin Chiang / Tianle Cai 等

## 相关页面

- [[Chatbot-Arena]]
- [[Arena-Hard-Auto]]
- [[Lianmin-Zheng]]
- [[Hao-Zhang]]
- [[Ion-Stoica]]
- UC Berkeley

<!-- AUTO-RELATED:START -->

## 自动关联

> 以下由 `scripts/inject-entity-related.ts` 自动维护——基于 `wiki/models/` 的 `developer` 字段与 `wiki/entities/` 的 `entity_type` 字段。手动编辑会被覆盖。

### 同类机构

- [[xAI|xAI]]
- [[Zhipu-AI|智谱AI（Zhipu AI）]]
- [[Tsinghua-NLP|Tsinghua NLP Lab]]
- [[Stanford-CRFM|Stanford CRFM]]
- [[Shanghai-AI-Lab|上海人工智能实验室（上海 AI 实验室）]]
- [[SJTU|Shanghai Jiao Tong University (SJTU)]]
- [[Reka|Reka AI]]
- [[Princeton-AI|Princeton CITP / AI Research]]

<!-- AUTO-RELATED:END -->
