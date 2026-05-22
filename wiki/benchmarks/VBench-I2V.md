---
title: "VBench-I2V"
type: benchmark
dimension: F
subdimension: I2V
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
sources:
  - "https://arxiv.org/abs/2411.13503"
  - "https://github.com/Vchitect/VBench"
aliases:
  - VBench-I2V
  - VBench++
  - VBench-Plus-Plus
arxiv_id: "2411.13503"
official_url: "https://github.com/Vchitect/VBench"
license: "Apache-2.0"
org: "Shanghai AI Lab / Vchitect"
github_url: "https://github.com/Vchitect/VBench"
domain:
  - multimodal
  - video
---

# VBench-I2V（VBench++）

> [[VBench]] 的 image-to-video 扩展版本（VBench++，2024-11 arXiv）。在原 VBench 16 维度基础上**新增 video-image consistency + video-text consistency** 两类专门指标，专门评测 I2V 模型在保持输入图像一致性 + 跟随文本描述上的能力。

## 设计

- **基础**：继承 VBench 16 维度（subject identity / motion smoothness / temporal flickering / spatial relationship 等）
- **新增**：
  - **video-image consistency**：生成视频与输入图像的一致性（角色 / 场景 / 风格保持）
  - **video-text consistency**：生成视频与文本 prompt 的一致性
- **高质量 Image Suite**：自适应分辨率与宽高比
- **配套 leaderboard**：HuggingFace Space 持续更新

## 评测圈意义

- 与 SVD / Sora / Kling / Veo 等 I2V 模型 release 的标配评测
- 把「I2V 评测」从 ad-hoc demo 推到 systematic benchmark
- 与 [[VBench]] 共同覆盖 T2V + I2V 两条主线

## 已知 pitfall

- 16+ 维度复杂，单一总分容易掩盖弱项
- 评测脚本对硬件 / 视频长度敏感
- I2V 模型 release 节奏快，leaderboard 时常落后

## 相关页面

- [[VBench]]
- [[VBench-2.0]]
- [[EvalCrafter]]
- [[Shanghai-AI-Lab]]
- [[multimodal-eval]]
