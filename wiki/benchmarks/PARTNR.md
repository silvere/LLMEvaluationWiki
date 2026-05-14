---
title: "PARTNR"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - agent
  - reasoning
year: 2024
arxiv_id: "2411.00081"
status: active
---

# PARTNR

> Meta 发布的具身协作机器人任务规划评测基准，评测 AI 代理与人类（或另一个机器人代理）协同完成家庭场景中复杂物理任务的规划和执行能力。

## 概述

PARTNR（Planning and Reasoning for Tasks with Non-Rigid Requirements）由 Meta FAIR 于 2024 年发布，是具身 AI（Embodied AI）领域最具挑战性的协作任务基准之一。与传统机器人任务评测专注单智能体独立操作不同，PARTNR 专门评测**人机协作（Human-Robot Collaboration）和多智能体协调**场景。

PARTNR 基于 Meta 的 Habitat 3.0 仿真平台，构建了 100,000 个家庭场景任务，任务设定在真实感的 3D 室内环境中。代理（机器人）需要与人类或另一个机器人代理分工协作，完成如"准备晚餐"（需分工处理食材、摆放餐具、调整烹饪设备等子任务）这类需要多步骤、多角色协作的家庭任务。

PARTNR 的核心挑战在于：
1. **任务分解与分配**：合理拆分复合任务并决定人机分工
2. **动态重规划**：当搭档行为与预期不符时，实时调整自身计划
3. **不完整信息下的协调**：不同代理对环境状态的观察是局部的
4. **非刚性需求（Non-Rigid Requirements）**：任务没有唯一正确的完成路径，评测需要判断完成质量

## 任务格式

- **场景总数**：100,000 个家庭任务场景（含多样化室内布局）
- **协作模式**：人机协作（human-robot）+ 机器人间协作（robot-robot）
- **任务类型**：家务整理、物品移动、烹饪准备、房间布置
- **仿真平台**：Meta Habitat 3.0（包含 3D 物理仿真）
- **评估方式**：任务完成率 + 完成效率（步骤数/时间）+ 协作质量分

## 主要指标

- **任务成功率（Task Success Rate）**：完成任务的场景比例
- **协作效率（Collaboration Efficiency）**：相比单独完成的时间节省比例
- **规划质量分（Planning Quality）**：任务分配合理性和重规划及时性
- **人类满意度（Human Satisfaction）**：在人机协作模式下，人类对机器人行为的主观满意度

## 局限性

- 仿真环境与真实物理世界存在感知和控制差距（sim-to-real gap）
- 100,000 个场景的规模需要大量计算资源，评测成本高
- "非刚性需求"的评估标准主观性较强，不同评估者可能得出不同结论

## 相关页面

- [[ALFWorld]]
- [[AgentBench]]
- [[TheAgentCompany]]
- [[WebWalkerQA]]
