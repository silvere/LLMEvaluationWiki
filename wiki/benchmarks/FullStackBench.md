---
title: "FullStackBench"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - code
year: 2024
arxiv_id: "2412.00535"
status: active
---

# FullStackBench

> 覆盖前端、后端、数据库、DevOps 全栈技术栈的多语言代码生成综合评测基准。

## 概述

FullStackBench 是 2024 年底发布的全栈代码生成评测基准，旨在全面评测 LLM 在完整软件工程技术栈中的代码能力。与现有代码基准主要聚焦于 Python 算法题不同，FullStackBench 覆盖了 **16 种编程语言**（Python、JavaScript、TypeScript、Java、C++、Go、Rust、SQL、HTML/CSS 等）和 **4 大技术领域**（前端开发、后端开发、数据库操作、DevOps/系统脚本），是迄今覆盖技术栈最广的代码评测基准。

FullStackBench 包含 3374 个编程任务，每个任务均有严格的功能测试用例验证，任务设计来自真实的软件工程场景（如实现 REST API、编写数据库迁移脚本、处理 Web 表单验证等），而非纯算法竞赛题。

基准还特别纳入了对**代码安全性**的考量，部分任务中包含安全陷阱（如 SQL 注入、XSS 漏洞），评测模型是否会生成存在安全漏洞的代码，将代码正确性与安全意识结合评测。

## 任务格式

- **输入**：自然语言编程任务描述（英文/中文双语），含技术栈要求
- **输出**：目标语言的代码实现
- **规模**：3374 个任务，16 种编程语言，4 大技术领域
- **评测执行**：真实运行单元测试，验证代码功能正确性
- **语言分布**：Python（~30%）、JavaScript/TS（~20%）、Java（~15%）、其他 16 种语言共 35%

## 主要指标

- **Pass@1**（功能通过率）：一次生成通过所有测试用例的概率
- 按编程语言分类报告得分
- 按技术领域（前端/后端/数据库/DevOps）分类报告
- **Security Pass Rate**：涉及安全场景任务的安全代码生成比例

## 局限性

- 测试用例覆盖度参差不齐，部分任务的测试集不够全面
- 多语言评测依赖对应语言的执行环境，配置较为复杂
- 真实全栈开发涉及框架组合和架构决策，单文件代码生成难以完全模拟

## 相关页面

- [[SWE-bench]]
- [[ML-Bench]]
- [[Effibench]]
- [[CanItEdit]]
