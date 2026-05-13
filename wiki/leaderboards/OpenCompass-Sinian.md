---
title: "司南排行榜（OpenCompass Sinian）"
type: leaderboard
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
---

# 司南排行榜（OpenCompass Sinian）

> 上海 AI 实验室运营的中英双语 LLM 评测排行榜，基于 OpenCompass 框架。

## 基本信息

- **中文名**：司南
- **英文名**：OpenCompass Sinian
- **运营者**：上海人工智能实验室（Shanghai AI Lab）
- **技术后端**：OpenCompass 评测框架

## 定位与特点

司南排行榜是目前中国最主要的开源模型综合评测排行榜，专为中英双语场景设计，填补了 Hugging Face Open LLM Leaderboard 和 Chatbot Arena 在中文模型评测上的空白。

- **双语覆盖**：同时评测模型在中文和英文 benchmark 上的表现，适合评估中文原生模型的实际能力。
- **本土化任务**：包含针对中文语言特性、文化背景的专项评测任务，如中文阅读理解、中文逻辑推理等。
- **统一标准**：基于 OpenCompass 框架的标准化评测流程，保证结果的可复现性和跨模型可比性。

## 评测范围

司南覆盖多个中英双语 benchmark，具体包含的 benchmark 列表随版本更新（待核实具体版本）。评测维度通常包括：
- 语言理解与生成（中英文）
- 知识问答（中英文学科知识）
- 推理与数学
- 代码生成
- 安全与对齐（待核实）

## 对评测生态的影响

司南为国内外研究者提供了评测中文 LLM 的标准化平台，推动了中文模型开发的透明化竞争。国内主要模型（通义、文心、InternLM、ChatGLM 等）均参与司南评测，结果被广泛引用于学术论文和行业报告。

## 局限与挑战

- **国际影响力**：司南主要服务于中文 AI 社区，在国际学术圈的影响力有限。
- **同质化风险**：与 Hugging Face 榜单类似，随着模型针对司南 benchmark 优化，存在 Goodhart 效应风险。
- **更新节奏**：benchmark 套件的更新频率和防污染机制（待核实）。

## 相关页面

- [[opencompass]] — 技术后端框架
- [[Shanghai-AI-Lab]] — 运营机构
- [[HuggingFace-Open-LLM-Leaderboard]] — 主要国际对标排行榜
