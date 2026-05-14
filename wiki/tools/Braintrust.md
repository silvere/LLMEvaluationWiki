---
title: "Braintrust"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Braintrust

## 概述

Braintrust 是一个面向 AI 产品团队的评测和实验平台，提供 LLM 应用的 A/B 测试、自定义评分器、数据集管理和实验追踪等功能。Braintrust 定位于将 LLM 评测与产品开发流程深度整合，帮助团队在快速迭代中维持 AI 质量。

## 核心功能

**实验（Experiments）**：
Braintrust 的核心是实验管理——每次修改提示词、更换模型或调整参数，都作为一个独立实验记录，并与历史实验对比：
```python
import braintrust

@braintrust.traced
def run_llm(input):
    return openai_client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": input}]
    )

experiment = braintrust.init(project="my-project", experiment="v2-prompt")
experiment.log(
    input="What is AI?",
    output=run_llm("What is AI?"),
    scores={"accuracy": 0.9}
)
```

**评分器（Scorers）**：
支持多种评分方式：
- **LLM 评判**：使用 GPT-4 等模型按自定义标准评分
- **代码评分**：使用 Python 函数计算精确指标
- **人工评分**：在 Web UI 中进行人工标注

**数据集管理**：
- 从生产追踪中捕获真实输入输出对，构建评测数据集
- 支持数据集版本管理和团队共享
- 可标注期望输出用于有监督评测

**A/B 测试报告**：
直观展示不同实验版本在各评测指标上的差异，包括统计显著性分析。

## 适用团队

Braintrust 主要面向具有 AI 产品（而非纯研究）需求的工程团队：
- 产品迭代频繁，需要快速验证提示词和模型变更效果
- 需要在工程师、产品经理、AI 研究者之间共享评测结果
- 希望将评测嵌入现有 CI/CD 流程

## 与竞品的比较

- vs **LangSmith**：功能最为接近，Braintrust 在实验管理和 A/B 测试报告上更精细
- vs **Weights & Biases**：W&B 更侧重传统 ML 训练，Braintrust 专注于 LLM 应用评测
- vs **Arize Phoenix**：Phoenix 更侧重可观测性和追踪，Braintrust 更侧重评测实验管理

## 访问方式

- 官方网站：[braintrust.dev](https://www.braintrust.dev/)
- 文档：[braintrust.dev/docs](https://www.braintrust.dev/docs)
- 安装：`pip install braintrust`（Python SDK）或 `npm install braintrust`（TypeScript SDK）
