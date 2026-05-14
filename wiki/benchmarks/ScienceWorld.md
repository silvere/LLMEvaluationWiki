---
title: "ScienceWorld"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [agent, reasoning]
language: en
year: 2022
authors: ["Ruoyao Wang", "Peter Jansen", "Marc-Alexandre Côté", "Prithviraj Ammanabrolu"]
arxiv_id: "2203.07540"
official_url: "https://github.com/allenai/ScienceWorld"
license: "Apache 2.0"
size: 30
format: open-ended
status: active
saturation_threshold: 0.75
sources:
  - "Wang, R., et al. (2022). ScienceWorld: Is Your Agent Smarter than a 5th Grader? EMNLP 2022."
---

# ScienceWorld

## 概述

ScienceWorld 是由 Allen Institute for AI 于 2022 年提出的科学实验仿真代理评测环境，旨在测试 AI 代理在**交互式科学实验场景**中执行小学水平科学实验的能力。与纯文本问答不同，ScienceWorld 要求代理通过顺序动作操作虚拟实验室环境来完成实验任务。

## 环境设计

ScienceWorld 基于文字游戏框架（TextWorld）构建，提供包含以下元素的虚拟实验室环境：

- **实验器材**：加热板、冰箱、量杯、化学品、温度计等
- **生物模型**：植物生命周期、动物分类等
- **物理模型**：导电性、热传导、相变等
- **化学模型**：混合实验、燃烧等

代理通过自然语言命令（如"把铜线放入电路"、"用加热板加热烧杯"）与环境交互。

## 任务设计

共包含 **30 个任务类型**，对应小学科学课程的核心概念：

| 类别 | 示例任务 |
|------|---------|
| 生命科学 | 找出哪种土壤最适合植物生长 |
| 物理学 | 测试哪些材料可以导电 |
| 化学 | 通过加热使固体变为液体 |
| 地球科学 | 识别不同天气条件的特征 |

每个任务类型有多个变体（不同材料、不同环境参数），总评测场景超过 1,000 个。

## 评测指标

- **任务完成分数（0-100）**：基于完成实验目标的进度给分，支持部分完成
- **标准化分数**：与随机代理基线对比的归一化得分
- **效率**：完成任务所需步骤数

## 挑战性

ScienceWorld 对代理的挑战包括：

1. **因果推理**：需要理解科学概念的因果链（加热→熔化→液体）
2. **长程规划**：完成一个实验通常需要 20-50 步
3. **常识知识整合**：需要结合科学知识制定实验策略
4. **探索与利用**：需要系统性地测试不同材料或条件

## 典型表现

| 代理类型 | 平均得分 |
|---------|---------|
| 随机代理 | ~0% |
| DRRN（强化学习） | ~20% |
| ScienceWorld-GPT（零样本） | ~5-10% |
| 人类专家 | ~85%+ |

## 与其他代理基准的定位

ScienceWorld 的独特性在于将科学推理（需要领域知识和实验方法论）嵌入交互式物理仿真中，区别于：

- **ALFWorld**：家务任务，不需要科学推理
- **WebArena**：真实 Web 操作，不涉及物理实验
- **GAIA**：信息检索型，不需要动作序列规划

## 局限性

- 文字游戏界面与真实实验环境差距较大
- 30 个任务类型覆盖范围有限
- 仅覆盖小学科学课程，难度上限较低
- 随着 LLM 能力提升，简单任务已趋近饱和

## 相关基准

- **ALFWorld**：家庭任务文字游戏+机器人仿真
- **NetHack**：复杂规则集的文字游戏代理评测
- **AgentBench**：多任务综合代理评测
