---
title: Multi-SWE-bench
type: benchmark
publish: true
confidence: draft
as_of_date: '2026-05-14'
last_verified: '2026-05-22'
domain:
- code
- agent
year: 2025
arxiv_id: '2504.02605'
status: active
dimension: H
sota:
- score: 42.5%
  model: Claude-Opus-4.7
  harness: OpenHands
  with_tools: true
  date: 2026-04
  source: https://multi-swe-bench.github.io
  notes: multi-repo multi-language resolution rate
- score: 40.2%
  model: GPT-5
  harness: OpenHands
  with_tools: true
  date: 2025-09
  source: https://multi-swe-bench.github.io
  notes: multi-repo multi-language resolution rate
- score: 38.5%
  model: Gemini-3.1-Pro
  harness: OpenHands
  with_tools: true
  date: 2026-03
  source: https://multi-swe-bench.github.io
  notes: multi-repo multi-language resolution rate
- score: 35.8%
  model: DeepSeek-V4-Pro
  harness: OpenHands
  with_tools: true
  date: 2026-02
  source: https://multi-swe-bench.github.io
  notes: multi-repo multi-language resolution rate
---

# Multi-SWE-bench

> 多语言软件工程基准，将 SWE-bench 扩展至 Python 之外的 7 种编程语言，评测 AI 代理跨语言修复真实 GitHub Issue 的能力。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Harness | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|---|
| 🥇 | [[Claude-Opus-4.7]] | [[OpenHands]] | 🔧 with | 42.5% | multi-repo multi-language resolution rate | 2026-04 | [link](https://multi-swe-bench.github.io) |
| 🥈 | [[GPT-5]] | [[OpenHands]] | 🔧 with | 40.2% | multi-repo multi-language resolution rate | 2025-09 | [link](https://multi-swe-bench.github.io) |
| 🥉 | [[Gemini-3.1-Pro]] | [[OpenHands]] | 🔧 with | 38.5% | multi-repo multi-language resolution rate | 2026-03 | [link](https://multi-swe-bench.github.io) |
| 4 | [[DeepSeek-V4-Pro]] | [[OpenHands]] | 🔧 with | 35.8% | multi-repo multi-language resolution rate | 2026-02 | [link](https://multi-swe-bench.github.io) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2504.02605](https://arxiv.org/abs/2504.02605)

<!-- AUTO-LINKS:END -->

## 概述

Multi-SWE-bench 于 2025 年发布，是对原版 SWE-bench（专注 Python）的多语言扩展。其动机明确：全球软件工程实践高度多语言化，仅评测 Python 修复能力无法全面反映代码代理的实际工程能力。

基准覆盖 **Java、TypeScript、JavaScript、Go、Rust、C、C++** 共 7 种语言，每种语言从 GitHub 顶级开源仓库中精心筛选真实 Issue 和对应修复提交（PR），共计约 1632 个实例。选择标准与 SWE-bench 一致：Issue 必须有明确的单一修复提交，且修复可通过测试套件自动验证。

Multi-SWE-bench 的构建揭示了跨语言代理能力的显著差异：在 Python 上表现优秀的代理往往在 Rust、C 等系统编程语言上大幅下滑。这暗示当前代码代理的能力高度依赖训练数据的语言分布，通用代码理解能力仍待提升。

基准还配套了多语言评测框架（MultiSWE-eval），支持统一 Docker 环境下的跨语言自动测试，降低了复现门槛。

## 任务格式

- **总实例数**：约 1632 个（各语言 ~200 个）
- **覆盖语言**：Python、Java、TypeScript、JavaScript、Go、Rust、C、C++
- **任务形式**：给定 Issue 描述 + 代码仓库，要求生成修复补丁（patch）
- **评估方式**：补丁通过官方测试套件的比例（pass@1）
- **执行环境**：语言专属 Docker 容器，预装依赖
- **数据来源**：GitHub 高星开源项目的真实 Issue–PR 对

## 主要指标

- **Resolved Rate（解决率）**：补丁通过所有相关测试的实例比例
- **跨语言分解分**：8 种语言的分项解决率
- **语言泛化分（Language Generalization）**：各语言相对 Python 的性能保留比例
- **无效补丁率**：语法错误或无法运行的补丁比例

## 局限性

- 部分语言（如 Rust、C）的 Issue 数量相对较少，统计结论稳定性较低
- 跨语言 Docker 环境配置复杂，评测基础设施成本显著高于单语言基准
- 以"通过现有测试"为标准，可能遗漏无测试覆盖的正确修复（假阴性）

## 相关页面

- [[SWE-bench]]
- [[SWE-Lancer]]
- [[BigCodeBench]]
- [[TheAgentCompany]]
