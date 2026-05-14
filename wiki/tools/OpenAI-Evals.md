---
title: "OpenAI Evals"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# OpenAI Evals

## 概述

OpenAI Evals 是 OpenAI 官方开源的评测框架，用于评测 GPT 系列模型以及兼容 OpenAI API 格式的其他模型。该框架于 2023 年初开源，除提供基础评测基础设施外，也是一个社区共建的评测任务集合，任何人都可以贡献新的评测任务。

## 框架设计

**核心组件**：
- **Eval**：评测任务的定义，包含数据集、评测方式和评分逻辑
- **Completion Function**：模型调用接口，支持 OpenAI API 和自定义后端
- **Registry**：评测任务注册系统，通过 YAML 配置文件注册新任务

**内置评测类型**：
- `basic`：基于字符串匹配的精确评测
- `model-graded`：使用另一个模型对输出进行评分（early LLM-as-judge 实现）
- `custom`：通过 Python 代码实现自定义评测逻辑

## 评测任务库

OpenAI Evals 仓库包含数百个由社区贡献的评测任务，涵盖：
- 数学推理和逻辑推理
- 代码生成
- 文本分类和信息提取
- 多语言理解
- 知识问答（各学科领域）

## 使用方式

```bash
pip install evals
# 运行内置评测
oaieval gpt-4 test-basic
# 注册自定义评测
# 在 evals/registry/evals/ 目录创建 YAML 配置
```

## 历史意义

OpenAI Evals 于 2023 年发布时是最早被广泛使用的 LLM 评测开源框架之一，其"model-graded eval"的思路预示了后来 LLM-as-Judge 方法的兴起。社区贡献模式也影响了后续评测框架的设计思路。

## 局限性与现状

- 框架设计相对简单，缺乏复杂评测流程的支持
- 主要针对 OpenAI 的模型优化，对其他模型支持有限
- 社区贡献的评测任务质量参差不齐
- 后续出现了更完善的替代框架（如 lm-evaluation-harness、DeepEval）

## 访问方式

- GitHub：[github.com/openai/evals](https://github.com/openai/evals)
- 安装：`pip install evals`
