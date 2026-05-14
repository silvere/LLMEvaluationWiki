---
title: "Agent Leaderboard"
type: leaderboard
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Agent Leaderboard

## 概述

AI 代理（Agent）能力排行榜是评测大语言模型在**自主任务执行**场景中综合能力的新兴排行榜类别。与传统问答或代码生成评测不同，代理评测要求模型在多步骤任务中持续规划、调用工具、处理环境反馈，并最终完成目标。该领域目前尚无单一权威排行榜，以下介绍主要代理评测基准及相关排名情况。

## 主要代理评测基准

**WebArena / VisualWebArena**：
- 评测模型在浏览器环境中完成真实网页任务的能力（如网上购物、信息搜索、表单填写）
- VisualWebArena 增加了图像内容的处理要求

**SWE-bench**：
- 评测模型作为软件工程代理解决真实 GitHub Issue 的能力
- 是目前代理评测中最广泛参考的基准之一

**AgentBench**：
- 覆盖 8 种代理任务环境（操作系统、数据库、知识图谱、数字游戏等）
- 提供综合代理能力的多维度评测

**GAIA**：
- 由 Meta 和 HuggingFace 联合发布
- 包含需要多步骤工具使用才能解决的真实世界问题
- 分为三个难度级别

**τ-bench**：
- 评测模型在真实客服和零售场景中的代理任务表现
- 强调与用户和数据库系统的交互能力

## 代理评测的核心挑战

1. **任务定义复杂**：代理任务往往开放性强，难以设计客观评分标准
2. **环境依赖**：评测结果依赖具体的工具和环境配置，复现成本高
3. **随机性**：多步骤执行中的随机性导致同一模型重复运行结果差异较大
4. **效率与效果**：优秀代理不仅需要最终成功，还需要高效（步骤少、成本低）

## 排行榜现状

代理能力排行榜目前处于分散状态，各基准维护独立的排名。AgentBench、WebArena、SWE-bench 等各自维护排行榜，尚未出现像 Chatbot Arena 那样广泛认可的综合代理能力排名。随着代理应用的快速普及，统一的代理评测框架和排行榜是社区的重要需求。

## 关键趋势

- 具备工具调用能力的模型在代理任务上显著优于基础模型
- 长上下文能力对多步骤代理任务至关重要
- 多模态能力在网页代理等视觉交互场景中日益重要

## 参考资源

- AgentBench：[github.com/THUDM/AgentBench](https://github.com/THUDM/AgentBench)
- GAIA：[huggingface.co/spaces/gaia-benchmark/leaderboard](https://huggingface.co/spaces/gaia-benchmark/leaderboard)
- WebArena：[webarena.dev](https://webarena.dev/)
- τ-bench：[github.com/sierra-research/tau-bench](https://github.com/sierra-research/tau-bench)
