---
title: "Giskard"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Giskard

## 概述

Giskard 是一个开源 AI 质量评测平台，专注于检测 LLM 和机器学习模型中的**幻觉、偏见、提示注入攻击和有害内容**等质量问题。Giskard 定位为 AI 模型的"测试套件"，帮助企业在部署前系统性地发现和修复 AI 质量缺陷。

## 核心功能

**LLM 扫描（LLM Scan）**：
Giskard 的核心功能是对 LLM 应用进行自动化的全面扫描，自动生成测试用例并检测：

| 问题类型 | 说明 |
|---------|------|
| 幻觉与错误信息 | 模型生成不实内容 |
| 有害内容 | 仇恨言论、歧视、暴力内容 |
| 提示注入 | 用户通过特殊提示绕过系统指令 |
| 隐私泄露 | 训练数据中个人信息的意外泄露 |
| 刻板印象与偏见 | 对特定群体的不公平描述 |
| 不必要的拒绝 | 对合理请求的过度拒绝（过度对齐） |

**测试套件生成**：
自动生成针对模型特定用例的测试数据集，无需手动编写测试用例。

**集成支持**：
- 支持 LangChain、LlamaIndex 等主流 LLM 框架
- 提供 Python SDK 和 Web UI 两种使用方式
- 支持导出 CI/CD 集成的测试报告

## 使用示例

```python
import giskard
from giskard import Dataset, Model

giskard_model = giskard.Model(
    model=my_llm_function,
    model_type="text_generation",
    name="My RAG App",
    description="Customer support assistant",
    feature_names=["user_question"]
)

scan_results = giskard.scan(giskard_model)
scan_results.to_html("scan_report.html")
```

## 定位与特色

Giskard 的独特定位是**面向合规和风险管理的 AI 测试**。相较于侧重性能评测的工具（如 DeepEval），Giskard 更强调：
- AI 治理（AI Governance）和监管合规
- 自动化的漏洞发现，而非手动评测
- 可操作的改进建议

## 访问方式

- 官方网站：[giskard.ai](https://www.giskard.ai/)
- GitHub：[github.com/Giskard-AI/giskard](https://github.com/Giskard-AI/giskard)
- 安装：`pip install giskard`
