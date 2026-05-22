---
title: "PyRIT"
type: tool
dimension: I
subdimension: red-team-tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://github.com/Azure/PyRIT"
  - "https://azure.github.io/PyRIT/"
aliases:
  - PyRIT
  - Python Risk Identification Tool
official_url: "https://github.com/Azure/PyRIT"
license: "MIT"
org: "Microsoft"
github_url: "https://github.com/Azure/PyRIT"
domain:
  - safety
---

# PyRIT（Python Risk Identification Tool）

> Microsoft 2024 开源的 LLM 红队**结构化攻击编排框架**。设计哲学：让攻击者 LLM + 评测 LLM 之间编排多轮对抗对话，覆盖 enterprise 红队 ~80% 工作流。亮点是 attacker 和 evaluator 都是 LLM，可灵活注入业务 prompt。

## 设计

- **核心抽象**：orchestrator（流程）+ target（被测模型）+ attacker（攻击 LLM）+ scorer（评分 LLM）
- **多种攻击模式**：single-turn / multi-turn / red-team conversation / crescendo / 等
- **配套 prompt 库**：常见 harm 类型的种子 prompt
- **可观测**：所有 attack trace 落库可追溯

## 评测圈意义

- Microsoft 主推，企业红队事实标准之一
- 与 [[garak]] 哲学不同：PyRIT 偏深度调查 / garak 偏批量扫描
- 被广泛集成进 Azure AI Safety 产品

## 已知 pitfall

- 上手曲线较陡（需要理解多个抽象层）
- 自定义 attacker LLM 需要谨慎调（坏 attacker = 没攻击）
- enterprise scope 偏大，individual researcher 用着重

## 相关页面

- [[garak]]
- [[promptfoo]]
- [[Petri]]
- [[Giskard]]
- [[HarmBench]]
- [[safety-eval-landscape]]
