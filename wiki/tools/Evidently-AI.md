---
title: "Evidently AI"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Evidently AI

## 概述

Evidently AI 是一个开源的机器学习和 LLM 监控与评测平台，起初专注于传统 ML 模型的数据漂移和性能监控，后扩展了对 LLM 输出质量监控的支持。Evidently 的核心理念是将模型监控内嵌到 MLOps 流程中，支持离线批量评测和在线实时监控两种模式。

## LLM 评测功能

**文本质量指标**：
Evidently 提供了一套面向 LLM 输出的文本质量指标：
- **文本长度和描述性统计**：回答长度分布、词汇多样性
- **语义相似度**：与参考答案的嵌入向量相似度
- **毒性得分**：基于分类模型检测有害内容
- **情感分析**：输出的情感极性分布

**LLM 评判集成**：
支持使用 OpenAI GPT 等 LLM 对输出质量进行自动评分，可自定义评分提示词和标准。

**RAG 质量监控**：
针对 RAG 系统的特定指标，包括检索相关性、答案忠实度等，与 RAGAs 的核心指标兼容。

## 核心使用模式

```python
from evidently import ColumnMapping
from evidently.report import Report
from evidently.metric_preset import TextEvals

report = Report(metrics=[
    TextEvals(column_name="response")
])

report.run(reference_data=reference_df, current_data=production_df)
report.show()
```

## 监控仪表盘

Evidently 提供完整的 Web 仪表盘（Evidently Cloud 或自托管），支持：
- 时序监控：追踪 LLM 输出质量随时间的变化
- 异常检测：发现输出质量的突然下降
- A/B 测试报告：比较不同模型版本或提示词策略

## 与其他工具的定位差异

- vs **LangSmith**：Evidently 更偏向 MLOps 监控，LangSmith 更偏向开发时调试
- vs **DeepEval**：Evidently 擅长生产监控，DeepEval 更适合开发阶段的单元测试式评测
- vs **Arize Phoenix**：两者功能相近，Evidently 拥有更成熟的传统 ML 监控能力，Arize Phoenix 在 LLM 追踪方面更专注

## 访问方式

- 官方网站：[evidentlyai.com](https://www.evidentlyai.com/)
- GitHub：[github.com/evidentlyai/evidently](https://github.com/evidentlyai/evidently)
- 安装：`pip install evidently`
