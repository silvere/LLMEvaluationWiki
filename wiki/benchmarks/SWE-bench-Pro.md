---
title: "SWE-bench Pro"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - code
  - agent
year: 2025
arxiv_id: "2509.16941"
status: active
---

# SWE-bench Pro

> 由 OpenAI 发布的企业级长周期软件工程任务评测基准，包含 1865 个来自 41 个真实代码仓库的复杂任务，旨在测试 AI agent 处理跨文件、跨模块长链推理任务的能力上限。

## 概述

SWE-bench Pro（2025，OpenAI）是 [[SWE-bench]] 系列的最新旗舰版本，专门面向**企业级长周期软件工程**场景设计。相比 SWE-bench Verified（500 个实例、任务相对独立）和 SWE-bench Lite（300 个实例、快速迭代导向），SWE-bench Pro 将挑战提升至全新量级。

**核心设计特点**：
- **规模扩大**：1,865 个任务实例，来自 41 个代码仓库（含公开、隐藏和企业合作伙伴私有仓库）
- **长周期任务**：任务需要跨多个文件、多个模块、多步骤推理，不再是单一函数级别的修复
- **企业级场景**：引入真实企业工程环境中的代码审查、功能迁移、技术债务清理等任务类型
- **难度上限**：最强 AI agent 的 Pass@1 仅约 23.3%，远低于 SWE-bench Verified 的饱和水平（顶尖 agent 已超 50%）

SWE-bench Pro 的发布时机恰逢 SWE-bench Verified 开始出现[[benchmark-saturation|饱和]]迹象，为软件工程 agent 能力提供了新的高阶评测标准，同时也揭示了当前最先进 coding agent 在真实复杂工程场景下的显著不足。

## 任务格式

- **任务总量**：1,865 个实例
- **仓库来源**：41 个代码仓库（跨 Python/JavaScript/TypeScript 等语言）
- **任务类型**：Bug 修复、功能实现、代码重构、技术债务清理
- **难度层次**：包含需要跨 5+ 文件修改的长周期任务
- **评估方式**：单元测试通过率（Pass@1），部分任务附加人工验证
- **仓库分类**：公开仓库 + 隐藏测试集 + 企业合作伙伴私有仓库

## 主要指标

- **Pass@1**：agent 一次尝试通过所有测试的成功率（当前 SOTA 约 23.3%）
- **File-Level Coverage**：任务中涉及文件数的分布统计
- **Task Complexity Score**：基于 PR 描述复杂度和代码变动规模的难度分类

## 局限性

- 部分测试集为私有（企业合作仓库），社区无法独立复现排行榜
- Pass@1 评估不考虑代码质量和可维护性，仅以测试通过为标准
- 2025 年 9 月发布，时间较新，社区基准线尚未充分建立

## 相关页面

- [[SWE-bench]]
- [[SWE-bench-Verified]]
- [[SWE-bench-Lite]]
- [[Multi-SWE-bench]]
- [[SWE-Lancer]]
- [[benchmark-saturation]]
