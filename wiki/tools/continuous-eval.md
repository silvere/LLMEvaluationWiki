---
title: "continuous-eval"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# continuous-eval

## 概述

continuous-eval 是由 Galileo（AI 可观测性公司）开发的开源持续评测框架，专为 RAG 系统和 LLM 应用管道（pipeline）设计。其核心特色是将评测内嵌到 LLM 应用的开发迭代流程中，支持对 RAG 管道各个组成环节进行精细化评测。

## 核心设计理念

"持续评测"的含义是：在 LLM 应用的**每次迭代**中自动运行评测，而非仅在上线前进行一次性评测。这类似于软件开发中的持续集成（CI）概念——每次更改提示词、更换模型或调整检索策略，都应该有量化指标来衡量变化效果。

## RAG 管道评测

continuous-eval 针对 RAG 系统的各个环节提供专项评测指标：

**文档检索阶段**：
- Precision@K：前 K 个检索结果中相关文档的比例
- Recall@K：相关文档被检索出的比例
- Mean Reciprocal Rank（MRR）

**生成阶段**：
- 忠实度（Faithfulness）：答案是否基于检索内容
- 答案相关性（Answer Relevance）
- 答案完整性（Answer Completeness）

**端到端评测**：
- 答案正确性（Answer Correctness）：对比参考答案
- 答案一致性：相同问题多次回答的一致程度

## 评测流水线

```python
from continuous_eval.metrics import PrecisionRecallF1
from continuous_eval.evaluators import EvaluationRunner

pipeline = EvaluationRunner(
    pipeline=[retrieval_eval, generation_eval],
    metrics=[PrecisionRecallF1()],
)
results = pipeline.run(dataset)
```

## 与 Galileo 平台的集成

continuous-eval 是开源独立使用的框架，同时也可与 Galileo 的商业 LLM Studio 平台集成，获得更完整的可视化和团队协作功能。

## 与同类工具的比较

- vs **RAGAs**：两者指标体系相近，continuous-eval 更强调管道各环节的分离评测
- vs **DeepEval**：continuous-eval 更专注于 RAG，DeepEval 覆盖更广泛的 LLM 评测场景
- 三者均支持与 CI/CD 系统集成，但框架成熟度和社区活跃度存在差异

## 访问方式

- GitHub：[github.com/relari-ai/continuous-eval](https://github.com/relari-ai/continuous-eval)
- 文档：[docs.relari.ai](https://docs.relari.ai/)
- 安装：`pip install continuous-eval`
