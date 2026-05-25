---
title: "中文 LLM 评测（Chinese LLM Evaluation）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-15"
last_verified: "2026-05-15"
sources: []
aliases:
  - chinese-evaluation
  - 中文评测
---

# 中文 LLM 评测（Chinese LLM Evaluation）

> 针对中文语言能力、文化理解和安全合规的大模型专项评测体系。

## 核心挑战

中文评测面临独特的挑战：汉字形态多样、语义歧义、文化背景依赖（成语、典故）、以及中文特有的安全合规要求（涉及政治敏感内容的处理）。直接使用英文 benchmark 翻译的方式存在文化偏差和表达不自然问题。

## 主要评测方向

- **知识与推理**：以 C-Eval、CMMLU 为代表的多任务学习评测
- **对话与指令跟随**：中文 MT-Bench 变体、CLEVA
- **安全与对齐**：SafetyPrompts、中文 jailbreak 测试集
- **角色扮演与对话**：CharacterEval（中文角色扮演专项）

## 代表性 benchmark

- [[C-Eval]] — 13948 题，52 个学科的中文知识评测
- [[CMMLU]] — 11528 题，67 个学科
- [[CLEVA]] — 中文 LLM 综合评测平台，覆盖 31 任务
- [[CharacterEval]] — 1785 个中文角色扮演对话场景

## 相关页面

- [[benchmark-design]]
- [[safety-eval-landscape|安全评测]]
- [[llm-as-judge]]
