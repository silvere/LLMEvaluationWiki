---
title: "ARC（对齐研究中心）"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# ARC（对齐研究中心）

ARC（Alignment Research Center，对齐研究中心）是由 Paul Christiano 于2021年创立的 AI 安全研究机构，总部位于美国加利福尼亚州。ARC 的核心使命是开发可扩展的 AI 对齐技术，并评测当前和未来 AI 系统的能力与安全属性。

## 创始背景

Paul Christiano 曾是 OpenAI 的研究员，在 RLHF（来自人类反馈的强化学习）技术的早期发展中发挥了重要作用。离开 OpenAI 后，他创立 ARC 专注于更长期的对齐研究问题，特别是如何在 AI 能力快速提升的环境下保持对 AI 系统的有效监督。

## ARC Evals（能力评测部门）

ARC 设有专门的能力评测部门（后独立为 METR——Model Evaluation and Threat Research），专注于评测前沿 AI 模型是否具备某些潜在危险能力：

- **自主复制能力**（Autonomous Replication）：模型是否能在无人监督的情况下自我复制或获取资源
- **欺骗能力**（Deceptive Alignment）：模型是否能识别评测场景并策略性地调整行为
- **危险信息辅助**：模型是否能为生物武器或网络攻击提供实质性帮助

ARC Evals 与 Anthropic、OpenAI 等前沿模型开发商合作，在重大模型发布前进行红队测试（Red Teaming），其评测结果被纳入模型安全评估报告。

## 学术贡献

ARC 开发了多个对齐研究领域的核心概念，包括 Debate（辩论式对齐）、Amplification（放大监督）等方法论框架。这些框架不仅是技术方案，也为如何评测 AI 系统的诚实性和可信度提供了理论基础。

## 在 LLM 评测生态中的地位

ARC（及其衍生的 METR）代表了 LLM 评测从"性能基准"向"安全能力审计"转型的重要方向，推动政府和监管机构将能力评测纳入 AI 治理框架。
