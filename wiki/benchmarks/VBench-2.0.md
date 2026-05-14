---
title: "VBench-2.0"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
year: 2025
arxiv_id: "2503.21755"
status: active
---

# VBench-2.0

> VBench 升级版，新增人物可信度、物理合理性、创意生成等高阶维度的视频生成评测。

## 概述

VBench-2.0 是上海 AI 实验室等机构于 2025 年发布的 VBench 升级版本，针对新一代高质量视频生成模型（如 Sora、Kling 2.0、Vidu 等）提出了更高层次的评测维度。VBench 1.0 聚焦于视频质量和语义一致性等基础维度，而 VBench-2.0 进一步引入了**人物可信度**（Face Naturalness、Human Action Quality）、**物理合理性**（Physics Plausibility）、**创意能力**（Creative Generation）等更具挑战性的高阶评测维度。

VBench-2.0 的动机来自于：随着 T2V 模型能力的快速提升，VBench 1.0 的多个维度已趋于饱和（部分模型接近满分），需要更难的评测维度来区分顶级模型之间的差异。新版本特别关注模型生成人物相关内容的质量——这是用户最敏感、最关注的领域，也是当前模型失败最频繁的场景（如手部畸形、人脸扭曲等）。

VBench-2.0 与 VBench 1.0 保持向后兼容，在原有 16 个维度基础上新增 10+ 个高阶维度，为下一阶段视频生成研究提供更严格的评测标准。

## 任务格式

- **新增维度**（重点）：人脸自然度、人体动作质量、物理合理性、创意理解、时序因果推理
- **兼容原有维度**：保留 VBench 1.0 全部 16 个维度
- **规模**：新增约 1000+ 个高难度评测提示词
- **评测工具**：新增专用人脸/人体质量评估模型、物理合理性判断模型
- **人工基准**：高难度任务配套专家级人工评分基线

## 主要指标

- **Human Fidelity Score**（人物可信度）：人脸自然度 + 人体动作质量综合得分
- **Physics Plausibility Score**（物理合理性）：视频内物理交互的合理性评分
- **Creative Score**（创意得分）：模型对抽象/隐喻性提示词的创意解读质量
- 兼容 VBench 1.0 全部 16 维度得分和综合分

## 局限性

- 高阶维度的自动化评测难度更高，指标设计更依赖强力视觉理解模型
- 物理合理性等维度的金标准仍难以精确定义
- 发布时间较新，社区采用率和跨模型对比案例仍在积累中

## 相关页面

- [[VBench]]
- [[EvalCrafter]]
- [[ChronoMagic-Bench]]
- [[VideoGen-Eval 1.0]]
