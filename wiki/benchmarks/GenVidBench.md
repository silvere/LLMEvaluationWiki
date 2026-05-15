---
title: "GenVidBench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
language: "en"
year: 2025
status: "active"
arxiv_id: "2501.11340"
sources:
  - "[[genvid-bench]]"
domain:
  - multimodal
  - safety
task: "AI-generated-video-detection"
---

# GenVidBench

> 迄今规模最大的 AI 生成视频检测基准，包含 6,784,490 个视频样本，采用跨来源与跨生成器设置，覆盖 11 种主流生成器

## 概述

GenVidBench 是专为 AI 生成视频检测（fake video detection）任务设计的大规模评测基准。随着 Sora、Kling 等视频生成模型的快速发展，AI 生成视频的视觉质量已接近真实拍摄素材，给内容平台审核和媒体可信度带来严峻挑战。GenVidBench 以 678 万级别的样本量和跨来源/跨生成器的任务设定，构成迄今为止最大规模、最具挑战性的视频真伪检测数据集。

## 规格

| 指标 | 数值 |
|------|------|
| 总视频数（6M 完整版）| 6,784,490 |
| 总视频数（143k 轻量版）| 143,400 |
| 覆盖生成器数量 | 11 种 |
| 真实视频来源 | 2 种（Vript、HD-VG-130M） |
| 语义标注维度 | 3（对象、动作、位置）|
| 任务类型 | 跨生成器二分类检测 |

## 核心设计特点

### 跨来源与跨生成器设置

数据集将训练集与测试集的生成器完全分开：
- **训练集生成器**：Pika、VideoCraftV2、ModelScope、T2V-Zero（各约 167 万视频）；真实来源 Vript
- **测试集生成器**：MuseV、SVD、Mora、CogVideo（各约 13,853）；真实来源 HD-VG-130M；另含 Sora（51）、Kling（264）

同时，训练集内的视频对（来自同一提示/图像的不同生成器输出）与测试集视频对内容相同，防止检测器仅靠内容差异区分真假。

### 语义内容标注

对部分视频提供三维语义标注：
- 对象类别（10 类）：人物、动物、建筑、自然、植物、卡通、食物、游戏、交通工具、其他
- 动作（6 类）：静止姿势、持物、主动参与、观察感知、展示呈现、其他
- 位置（7 类）：室内居住、城镇、交通基础设施、运动休闲场所、特定地标、自然景观、其他

### 轻量子集

GenVidBench-143k 从 678 万视频中代表性采样，适合计算资源有限时的快速模型迭代。

## 主要基线结果

### GenVidBench-6M 跨生成器任务（Table 5）

| 方法 | 类型 | Top-1 准确率 |
|------|------|-------------|
| DeMamba | Mamba | 85.47% |
| MViTv2-S | Transformer | 80.45% |
| VideoSwin | Transformer | 80.39% |
| TSM | CNN | 73.88% |
| I3D | CNN | 60.21% |

- 真实视频（HD-VG-130M）检测准确率普遍超过 95%
- Sora 生成视频最难检测；CogVideo 生成视频相对容易识别

### 同源 vs. 跨生成器对比（Table 3）

- 同源训练测试：各子集准确率均超过 97.40%
- 跨生成器（如训练 Pika、测试 SVD）：准确率骤降至 54.66%

## 局限性

- 数据集体量巨大，训练所需计算资源与时间开销显著（因此提供 143k 轻量版）
- Sora 和 Kling 的测试集样本量极少（51 和 264），评估结果代表性有限
- 语义标注仅覆盖部分视频，全量标注尚未完成
- 跨生成器任务整体准确率偏低，说明现有方法泛化能力不足，仍有大量改进空间

## 相关页面

- [[genvid-bench]] — 对应论文 source 页
- genvid-bench — 对应论文 source 页
- benchmark-design
- [[benchmark-design]]
