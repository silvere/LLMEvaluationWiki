---
title: "AgentBench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [agent]
language: en
year: 2023
authors: ["Xiao Liu", "Hao Yu", "Hanchen Zhang", "Yifan Xu", "Xuanyu Lei", "Hanyu Lai", "Yu Gu", "Yuxian Gu", "Hangliang Ding", "Kai Men", "Kejuan Yang", "Shudan Zhang", "Xiang Deng", "Aohan Zeng", "Zhiyuan Liu", "Yuxiao Dong", "Jie Tang"]
arxiv_id: "2308.03688"
official_url: "https://llmbench.ai/agent"
license: "Apache 2.0"
size: 1091
format: open-ended
status: active
saturation_threshold: 0.80
sources:
  - "Liu, X., et al. (2023). AgentBench: Evaluating LLMs as Agents. ICLR 2024."
---

# AgentBench

## 概述

AgentBench 是由清华大学等机构于 2023 年提出的综合性智能代理（LLM Agent）评测基准，通过 **8 个不同环境**系统评测大型语言模型作为自主代理的综合能力。AgentBench 是首个对多种代理场景进行统一规范化评测的基准之一，揭示了开源 LLM 与商业 API 模型之间的显著能力差距。

## 评测环境（8 个任务）

| 环境 | 类型 | 描述 |
|------|------|------|
| **OS** | 操作系统 | Bash 命令行任务完成 |
| **DB** | 数据库 | SQL 查询与数据操作 |
| **KG** | 知识图谱 | SPARQL/图查询任务 |
| **Digital Card Game** | 策略游戏 | 卡牌游戏决策 |
| **Lateral Thinking** | 横向思维 | 创意推理谜题 |
| **House Holding** | 具身任务 | ALFWorld 家务任务 |
| **Web Shopping** | Web 操作 | 在线购物任务完成 |
| **Web Browsing** | Web 操作 | Mind2Web Web 浏览任务 |

## 评测设计

- **统一框架**：所有任务使用统一的 LLM-环境交互 API，模型通过结构化消息与各环境交互
- **多轮交互**：每个任务需要多轮动作-观测循环，测试长程决策能力
- **总题数**：约 1,091 个测试实例

## 核心发现

AgentBench 的重要发现：

1. **顶级模型与其他模型的巨大差距**：GPT-4 的综合代理得分约为 4.11（满分约 10），而大多数开源模型（LLaMA-2、Vicuna 等）得分低于 1.0，差距超过 4 倍。

2. **任务间迁移有限**：在特定任务类型表现好的模型并不一定在其他任务上表现好，代理能力是多维度的。

3. **长上下文管理至关重要**：多轮交互积累的上下文长度是区分代理能力的关键因素。

4. **推理能力 ≠ 代理能力**：在 MMLU 等知识型基准上表现出色的模型，在代理任务上不一定优秀。

## 与单一任务代理基准的对比

| 特点 | AgentBench | WebArena | ScienceWorld | GAIA |
|------|-----------|----------|--------------|------|
| 任务多样性 | 8 类 | 1 类 | 1 类 | 1 类 |
| 环境类型 | 混合 | Web | 文字游戏 | 开放 |
| 评测系统化 | 高 | 中 | 中 | 低 |
| 任务难度 | 中等 | 高 | 中 | 高 |

## 局限性

- 8 个任务仍不能穷举所有代理场景（如多模态代理、代码执行代理等）
- 部分任务（如横向思维谜题）的评测标准存在主观性
- 随着 LLM 能力快速发展，部分任务可能迅速饱和

## 相关基准

- **GAIA**：真实世界助手任务评测
- **WebArena**：深度 Web 浏览代理评测
- **τ-bench**：真实 API 工具调用代理评测
- **ToolBench**：工具使用专项评测
