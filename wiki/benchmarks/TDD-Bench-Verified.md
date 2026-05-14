---
title: "TDD-Bench Verified"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - code
  - agent
year: 2024
arxiv_id: ""
status: active
---

# TDD-Bench Verified

> 测试驱动开发代理评测基准，评测 AI 代理遵循 TDD（Test-Driven Development）范式——先写测试再实现功能——完成真实软件工程任务的能力。

## 概述

TDD-Bench Verified 于 2024 年发布，针对软件工程中重要但长期被忽视的测试驱动开发（TDD）实践进行专项评测。TDD 是专业软件工程的重要方法论：先编写描述期望行为的测试用例（Red 阶段），再实现使测试通过的代码（Green 阶段），最后重构优化（Refactor 阶段）。

与 SWE-bench（给定 Issue 直接写修复代码）不同，TDD-Bench Verified 要求代理显式遵循 TDD 流程：
1. 阅读功能需求（文字描述或用户故事）
2. 首先生成测试用例（可运行、一开始会失败）
3. 然后编写使测试通过的最小实现代码
4. 最后进行代码重构（确保测试仍然通过）

"Verified"标注指基准中的每个任务都经过人工验证，确保参考答案和测试用例的正确性。基准的核心洞察是：当前 AI 代码生成工具（包括 GitHub Copilot、Cursor 等）普遍跳过测试编写步骤，直接生成实现代码，与专业工程实践不符。TDD-Bench Verified 专门测试代理是否能改变这一模式。

## 任务格式

- **任务来源**：真实 GitHub 功能请求和用户故事
- **TDD 阶段要求**：测试编写（Red）→ 实现（Green）→ 重构（Refactor）
- **评估方式**：测试正确性（先失败后通过）+ 实现正确性 + 重构质量
- **编程语言**：Python、JavaScript/TypeScript 为主
- **规模**：数百个经人工验证的任务
- **执行环境**：隔离测试容器，自动运行测试套件

## 主要指标

- **TDD 流程遵循率（TDD Compliance Rate）**：正确按先测试后实现顺序执行的比例
- **测试质量分（Test Quality Score）**：生成的测试用例的覆盖率和有效性
- **实现正确率（Implementation Correctness）**：最终代码通过测试套件的比例
- **整体 TDD 成功率**：三个阶段全部正确完成的任务比例

## 局限性

- TDD 工作流的评测要求代理按特定顺序输出（先测试后代码），限制了灵活推理
- "重构"阶段的质量评估主观性强，难以自动化
- 基准中的任务粒度相对较小，与真实项目中 TDD 的复杂程度仍有差距

## 相关页面

- [[SWE-bench]]
- [[Multi-SWE-bench]]
- [[BigCodeBench]]
- [[TheAgentCompany]]
