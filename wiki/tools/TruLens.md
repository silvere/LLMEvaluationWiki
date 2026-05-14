---
title: "TruLens"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# TruLens

## 概述

TruLens 是由 Truera（现已更名为相关产品）开发的 LLM 应用评测和可观测性工具，开源发布于 GitHub。TruLens 结合了**评测（evaluation）**和**追踪（tracing）**两种功能，不仅可以评测 LLM 应用的输出质量，还可以记录应用运行过程中的每一步中间结果，便于调试和持续优化。

## 核心功能

**RAG Triad 评测框架**：
TruLens 提出了"RAG Triad"三角评测体系，专为 RAG 系统设计：
- **Answer Relevance**：最终答案是否回答了用户问题
- **Context Relevance**：检索到的上下文是否与问题相关
- **Groundedness**：答案是否有上下文支撑（即忠实度）

三个指标共同构成 RAG 质量的完整视图——只有三项都通过才意味着 RAG 系统真正运作良好。

**追踪与记录**：
TruLens 通过 `@instrument` 装饰器自动记录 LLM 应用各组件的输入输出，包括：
- LLM 调用的 prompt 和 response
- 检索器返回的上下文内容
- 中间推理步骤

**可视化 Dashboard**：
内置 Streamlit 仪表盘，支持：
- 按评测指标筛选和排序运行记录
- 查看失败案例的详细追踪链路
- 跨版本对比性能变化

## 使用示例

```python
from trulens_eval import Tru, TruChain
from trulens_eval.feedback import Groundedness

tru = Tru()
groundedness = Groundedness()

tru_recorder = TruChain(
    chain,
    app_id="rag_v1",
    feedbacks=[groundedness]
)

with tru_recorder as recording:
    response = chain("What is photosynthesis?")

tru.get_leaderboard()
```

## 与 RAGAs 的比较

TruLens 和 RAGAs 在 RAG 评测指标上高度重叠，主要区别在于：
- TruLens 内置了更强的追踪功能，适合调试复杂 LLM 应用
- RAGAs 更聚焦于评测指标本身，与 LangChain/LlamaIndex 生态集成更紧密
- TruLens 提供可视化仪表盘，更适合非技术人员查看评测结果

## 访问方式

- GitHub：[github.com/truera/trulens](https://github.com/truera/trulens)
- 文档：[trulens.org/docs](https://www.trulens.org/docs/)
- 安装：`pip install trulens-eval`
