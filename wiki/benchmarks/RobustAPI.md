---
title: "RobustAPI"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - agent
  - reasoning
year: 2024
arxiv_id: ""
status: active
---

# RobustAPI

> 专注于工具调用鲁棒性的评测基准，测试 LLM 在 API 参数不完整、描述歧义、工具失效等干扰条件下正确调用工具的能力。

## 概述

RobustAPI 于 2024 年发布，针对现有工具调用（tool use / function calling）评测基准在"理想条件"下测试这一局限性。主流工具调用评测（如 ToolBench、API-Bank 等）通常假设 API 描述完整、参数定义清晰、工具调用总能成功，而真实应用场景中工具调用往往面临各类干扰：API 文档不完整、参数名称歧义、工具调用返回错误、多工具依赖链中间步骤失败等。

RobustAPI 系统性地引入了多种鲁棒性测试维度：**参数缺失**（required parameters missing from API description）、**描述歧义**（ambiguous tool descriptions with similar functionality）、**工具失效**（tool call returns error or invalid response）、**多工具协调**（multi-step tool chains with potential failure propagation）等。评测对象包括模型在这些干扰下能否正确识别问题、降级处理、或向用户请求澄清。

该基准揭示了当时（2024年）主流 LLM 在工具调用鲁棒性上的显著短板：大多数模型在工具描述不完整或调用失败时会产生幻觉调用或静默失败，而非采取合理的降级策略。RobustAPI 对于评测以 agent 形式部署的 LLM 具有重要实践价值。

## 任务格式

- 格式：工具调用任务（function calling / tool use），含干扰条件
- 干扰类型：参数缺失、描述歧义、工具失效、多工具链断裂
- 评测方式：自动化 API 执行验证 + 行为分析

## 主要指标

- **工具调用成功率**：正确调用工具并获得预期结果的比率
- **鲁棒性分数**：在干扰条件下相对于理想条件的性能保持率
- **错误处理质量**：遇到工具失效时的降级行为评分

## 局限性

- **覆盖 API 域有限**：测试的工具类型和领域覆盖相对固定，难以全面代表真实应用场景的 API 多样性
- **评测框架依赖性**：鲁棒性干扰的引入方式对测试结果影响大，不同实现的可重复性有待验证
- **论文信息有限**：发布时间较新，公开文献和社区复现数量相对有限

## 相关页面

- [[API-Bank]]
- [[ToolBench]]
- [[AgentBench]]
- [[BFCL]]
- [[τ-bench]]
