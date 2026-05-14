---
title: "ALFWorld"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [agent]
language: en
year: 2021
authors: ["Mohit Shridhar", "Xingdi Yuan", "Marc-Alexandre Côté", "Yonatan Bisk", "Adam Trischler", "Matthew Hausknecht"]
arxiv_id: "2010.03768"
official_url: "https://alfworld.github.io"
license: "MIT"
size: 3553
format: open-ended
status: active
saturation_threshold: 0.85
sources:
  - "Shridhar, M., et al. (2021). ALFWorld: Aligning Text and Embodied Environments for Interactive Learning. ICLR 2021."
---

# ALFWorld

## 概述

ALFWorld 是由微软研究院等机构于 2021 年发布的家庭任务代理评测基准，全名 Alfred Language World，将文字游戏（TextWorld）与视觉具身仿真环境（ALFRED）进行语义对齐。ALFWorld 旨在研究语言对齐（text-to-action）在具身任务规划中的效果，测试代理能否将自然语言目标转化为正确的动作序列。

## 双模式设计

ALFWorld 的核心创新在于同一套任务可在两种模式下运行：

1. **文字游戏模式（TextWorld）**：代理通过文本命令（"pick up apple"、"go to fridge"）与环境交互，观测为文本描述
2. **视觉仿真模式（ALFRED）**：代理在 AI2-THOR 3D 仿真家庭环境中操作，观测为 RGB 图像

两种模式语义等价，允许在文字游戏中训练后迁移到视觉环境，研究跨模态迁移能力。

## 任务类型

ALFWorld 包含 6 类家庭任务，共 **3,553 个训练场景**和 **140+ 测试场景**：

| 任务类型 | 示例 |
|---------|------|
| Pick & Place | 把苹果放到桌子上 |
| Look at Object in Light | 在台灯下检查书本 |
| Clean & Place | 清洗后放入冰箱 |
| Heat & Place | 加热后放到餐桌 |
| Cool & Place | 冷却后放到架子上 |
| Pick Two & Place | 把两支铅笔放进杯子 |

任务以高层自然语言描述（如"找一个干净的叉子放进微波炉"），代理需规划出包含子目标导航和物体操作的完整动作序列。

## 评测指标

- **任务成功率（Task Success Rate）**：主要指标，判断最终状态是否满足目标条件
- **子目标完成率**：评测规划中间步骤的完成情况
- **步骤效率**：完成任务所用步骤数与最优解的比率

## 在 LLM 代理研究中的地位

ALFWorld 是将大型语言模型用于代理规划的重要早期实验平台：

- **ReAct**（Yao et al., 2022）在 ALFWorld 上展示了将推理（think）与行动（act）交替的效果，成为 LLM Agent 范式的重要工作之一，ALFWorld 是其核心评测环境
- **SayCan**（Ahn et al., 2022）等具身 AI 论文将 ALFWorld 作为语言条件规划的基础实验
- 推动了"将 LLM 作为规划器"（LLM-as-Planner）研究路线的形成

## 局限性

- 家庭场景有限，任务多样性不足
- 视觉模式与真实机器人操作仍有较大差距（仿真器偏差）
- 文字游戏模式的抽象化程度可能高估代理的真实能力
- 随着 LLM 能力提升，测试集规模偏小导致评测区分度下降

## 相关基准

- **ScienceWorld**：科学实验仿真，同样基于 TextWorld
- **Embodied Agent (E.A.)**：视觉具身代理评测
- **AgentBench**：多任务综合代理评测
- **WebArena**：Web 浏览任务代理评测
