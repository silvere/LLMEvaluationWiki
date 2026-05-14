---
title: "LangSmith Eval"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# LangSmith Eval

## 概述

LangSmith 是 LangChain 官方推出的 LLM 应用开发和评测平台，其评测（Eval）功能是 LangSmith 的核心组成部分。LangSmith Eval 提供了一套覆盖**追踪（tracing）→ 数据集管理 → 评测 → 监控**全链路的工具，专为使用 LangChain 构建的 LLM 应用设计，同时也支持非 LangChain 应用。

## 核心功能

**追踪与调试**：
LangSmith 自动记录 LLM 应用中的每一次链式调用，包括：
- 每一步的输入和输出
- Token 使用量和延迟时间
- 工具调用（Tool Use）的详细记录
- 错误和异常信息

**评测数据集管理**：
- 从追踪记录中直接捕获有趣的输入-输出对，构建评测数据集
- 支持人工标注"期望输出"
- 数据集版本管理，支持持续添加新用例

**自动化评测**：
```python
from langsmith import Client
from langsmith.evaluation import evaluate

client = Client()
evaluate(
    lambda inputs: my_llm_app(inputs["question"]),
    data="my-dataset",
    evaluators=[correctness_evaluator],
)
```

支持的评判方式：
- LLM-as-Judge（使用 GPT-4 等评判模型）
- 自定义 Python 评测函数
- 人工评测界面

**监控仪表盘**：
在生产环境中持续监控 LLM 应用的质量指标，支持设置质量告警。

## 与 LangChain 生态的集成

LangSmith 与 LangChain、LangGraph 深度集成：
- 只需设置 `LANGCHAIN_TRACING_V2=true` 环境变量即可自动开启追踪
- 评测结果可以直接在 LangSmith Web UI 中可视化
- 支持 LangGraph 的多步代理追踪

## 定价

LangSmith 提供免费套餐（有使用量限制）和付费企业版，免费套餐适合个人开发者和小型项目。

## 局限性

- 平台性质：LangSmith 是 SaaS 服务，数据存储在 LangChain 服务器（企业版支持私有部署）
- 与 LangChain 生态耦合较深，对非 LangChain 应用的集成相对复杂
- 评测功能偏向监控和调试，深度学术评测场景不如 DeepEval 等专用工具

## 访问方式

- 官方网站：[smith.langchain.com](https://smith.langchain.com/)
- 文档：[docs.smith.langchain.com](https://docs.smith.langchain.com/)
- 安装：`pip install langsmith`
