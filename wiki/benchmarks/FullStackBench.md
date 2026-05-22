---
title: FullStackBench
type: benchmark
publish: true
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- code
year: 2024
arxiv_id: '2412.00535'
status: active
dimension: H
sota:
- score: 82.5%
  model: Claude-Opus-4.7
  harness: null
  with_tools: false
  date: 2026-04
  source: https://huggingface.co/datasets/ByteDance-Seed/FullStackBench
  notes: FullStackBench pass@1 (full-stack code generation)
- score: 81.2%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-09
  source: https://huggingface.co/datasets/ByteDance-Seed/FullStackBench
  notes: pass@1
- score: 80.0%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-03
  source: https://huggingface.co/datasets/ByteDance-Seed/FullStackBench
  notes: pass@1
- score: 78.5%
  model: DeepSeek-V4-Pro
  harness: null
  with_tools: false
  date: 2026-02
  source: https://deepseek.com
  notes: pass@1
- score: 72.0%
  model: GPT-4o
  harness: null
  with_tools: false
  date: 2024-05
  source: https://openai.com/gpt-4o
  notes: pass@1, 2024 baseline
---

# FullStackBench

> 覆盖前端、后端、数据库、DevOps 全栈技术栈的多语言代码生成综合评测基准。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Claude-Opus-4.7]] | 🚫 no | 82.5% | FullStackBench pass@1 (full-stack code generation) | 2026-04 | [link](https://huggingface.co/datasets/ByteDance-Seed/FullStackBench) |
| 🥈 | [[GPT-5]] | 🚫 no | 81.2% | pass@1 | 2025-09 | [link](https://huggingface.co/datasets/ByteDance-Seed/FullStackBench) |
| 🥉 | [[Gemini-3.1-Pro]] | 🚫 no | 80.0% | pass@1 | 2026-03 | [link](https://huggingface.co/datasets/ByteDance-Seed/FullStackBench) |
| 4 | [[DeepSeek-V4-Pro]] | 🚫 no | 78.5% | pass@1 | 2026-02 | [link](https://deepseek.com) |
| 5 | [[GPT-4o]] | 🚫 no | 72.0% | pass@1, 2024 baseline | 2024-05 | [link](https://openai.com/gpt-4o) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2412.00535](https://arxiv.org/abs/2412.00535)

<!-- AUTO-LINKS:END -->

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
