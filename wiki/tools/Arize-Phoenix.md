---
title: "Arize Phoenix"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Arize Phoenix

## 概述

Arize Phoenix 是 Arize AI 开源的 LLM 可观测性（observability）和评测平台，专注于 LLM 应用的**追踪、调试和评测**全链路可视化。Phoenix 采用 OpenTelemetry 标准进行追踪，支持所有主流 LLM 框架，并提供浏览器端的交互式分析界面。

## 核心能力

**LLM 追踪（Tracing）**：
Phoenix 基于 OpenInference 标准（兼容 OpenTelemetry）记录 LLM 应用的完整执行链路：
- 每次 LLM 调用的 Prompt 和响应
- Embedding 操作和向量检索结果
- 工具调用链路
- 延迟和 Token 消耗

**评测（Evaluation）**：
内置多种评测模板，可对追踪数据进行批量评测：
- **幻觉检测**（Hallucination）
- **回答相关性**（Q&A Correctness）
- **毒性检测**（Toxicity）
- **检索评测**（Retrieval Relevance）

所有评测使用 LLM-as-Judge 方式，通过可配置的评测提示词实现。

**嵌入可视化**：
Phoenix 提供向量嵌入的二维可视化（UMAP 降维），帮助开发者直观分析检索失败的根因——如检索结果与问题的语义距离过大。

## 快速上手

```python
import phoenix as px
from phoenix.otel import register

# 启动 Phoenix 服务
session = px.launch_app()

# 注册追踪
tracer_provider = register(project_name="my-rag-app")

# 追踪将自动发送到 Phoenix
```

## 框架兼容性

Phoenix 支持的框架包括：
- LangChain / LangGraph
- LlamaIndex
- OpenAI SDK
- Anthropic SDK
- DSPy
- Haystack

## 部署方式

- **本地模式**：在 Jupyter Notebook 中启动，适合开发调试
- **自托管服务器**：Docker 部署，适合团队共用
- **Arize Cloud**：商业 SaaS 版本，功能更完整

## 与 LangSmith 的比较

Phoenix 和 LangSmith 功能高度重叠，主要区别：
- Phoenix 完全开源，可完全自托管（数据不离开内部）
- LangSmith 与 LangChain 生态集成更深，易用性稍好
- Phoenix 基于开放标准（OpenTelemetry），框架无关性更强

## 访问方式

- 官方网站：[phoenix.arize.com](https://phoenix.arize.com/)
- GitHub：[github.com/Arize-ai/phoenix](https://github.com/Arize-ai/phoenix)
- 安装：`pip install arize-phoenix`
