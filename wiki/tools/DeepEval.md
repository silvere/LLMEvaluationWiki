---
title: "DeepEval"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# DeepEval

## 概述

DeepEval 是一个开源 LLM 评测框架，使用 Python 编写，专为 LLM 应用（包括 RAG 系统、对话代理、文本生成等）的质量评估设计。其设计哲学是为 LLM 应用提供类似 pytest 的测试体验，让开发者能够像编写单元测试一样编写 LLM 评测用例。

## 核心评测指标

**RAG 系统评测**：
- **忠实度（Faithfulness）**：生成答案是否忠于检索到的上下文
- **答案相关性（Answer Relevancy）**：回答是否切题
- **上下文精确率（Contextual Precision）**：检索到的上下文是否准确
- **上下文召回率（Contextual Recall）**：是否检索到了所有相关信息

**通用 LLM 评测**：
- **幻觉检测（Hallucination）**：识别模型虚构的内容
- **毒性检测（Toxicity）**：检测有害或不适当内容
- **偏见检测（Bias）**：识别输出中的偏见内容
- **摘要质量（Summarization）**：摘要的完整性和准确性
- **G-Eval**：基于 GPT-4 自定义评测标准的通用评分

## 使用方式

```python
from deepeval import evaluate
from deepeval.metrics import AnswerRelevancyMetric
from deepeval.test_case import LLMTestCase

test_case = LLMTestCase(
    input="What is the capital of France?",
    actual_output="Paris",
)
metric = AnswerRelevancyMetric(threshold=0.7)
evaluate([test_case], [metric])
```

DeepEval 支持与 pytest 集成，可将评测直接嵌入 CI/CD 流程：
```bash
deepeval test run test_llm.py
```

## 特色功能

- **Confident AI 集成**：官方配套的 Web UI 平台，可视化评测结果和趋势
- **Red Teaming**：内置红队测试功能，自动生成对抗性输入
- **Dataset 管理**：支持评测数据集的版本管理和共享
- **多模型支持**：支持 OpenAI、Anthropic、Cohere、本地模型等多种后端

## 与其他工具的比较

相较于 promptfoo（更侧重 CI/CD 集成和配置式测试），DeepEval 提供了更丰富的内置评测指标，特别是 RAG 评测指标。与 RAGAs 相比，DeepEval 覆盖范围更广（不限于 RAG 场景）。

## 访问方式

- GitHub：[github.com/confident-ai/deepeval](https://github.com/confident-ai/deepeval)
- 文档：[docs.confident-ai.com](https://docs.confident-ai.com/)
- 安装：`pip install deepeval`
