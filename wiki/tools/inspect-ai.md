---
title: "Inspect AI（UK AI Safety Institute）"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
---

# Inspect AI（UK AI Safety Institute）

> 英国 AI Safety Institute 开发的开源安全评测框架，专注前沿模型安全性和能力评估。

## 基本信息

- **全称**：Inspect AI
- **开发者**：UK AI Safety Institute（AISI）
- **性质**：开源，英国政府背景
- **主要用途**：前沿模型安全评测、能力评测（危险能力、越狱抵抗等）

## 功能与特点

- **政府级评测**：Inspect AI 是 UK AISI 对前沿模型进行官方评估的技术基础设施，实际用于评测 OpenAI、Anthropic、Google 等公司的前沿模型。
- **安全导向设计**：框架内置对危险能力（CBRN 知识获取、网络攻击辅助等）和安全边界（越狱抵抗、有害内容生成）的评测支持。
- **开源透明**：与商业评测平台不同，Inspect AI 代码公开，外部研究者可复现和审计评测方法。
- **可扩展性**：支持自定义评测任务、工具调用场景（Agent 评测）、多轮对话评测。

## 代表性应用

UK AISI 2026 年的大规模评估中，利用 Inspect AI 框架对 22 个前沿模型发起约 180 万次攻击测试，覆盖红队测试、越狱尝试等多种攻击方式，结果表明每个被测模型都被成功攻破。这是已知规模最大的政府主导前沿模型安全评测项目之一。

## 局限与挑战

- **专注安全**：框架主要针对安全评测设计，对能力 benchmark（如数学推理、代码生成等）的支持相对次要。
- **访问限制**：UK AISI 持有的私有测试集不公开，保证了评测的抗污染性，但也限制了外部复现。
- **生态规模**：相比 EleutherAI Harness 和 OpenCompass，社区贡献的 benchmark 插件数量较少。

## 相关页面

- [[UK-AISI]] — 开发机构
- [[red-teaming]] — Inspect AI 的主要应用场景
- [[agent-eval]] — Inspect AI 支持的评测方向之一
