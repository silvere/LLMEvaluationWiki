---
title: "VideoScaffold: Elastic-Scale Visual Hierarchies for Streaming Video Understanding in MLLMs"
type: paper
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
source_type: paper
url: "https://arxiv.org/abs/2512.22226"
ingested: "2026-05-14"
sources:
  - "https://arxiv.org/abs/2512.22226"
year: 2025
authors:
  - "Naishan Zheng"
  - "Jie Huang"
  - "Qingpei Guo"
  - "Feng Zhao"
discusses:
  - "[[multimodal-eval]]"
  - "[[Video-MME|video-understanding]]"
  - "[[multimodal-eval|streaming-video]]"
  - "[[CLongEval|long-video-understanding]]"
---

# VideoScaffold: Elastic-Scale Visual Hierarchies for Streaming Video Understanding in MLLMs

> 面向流式长视频理解的动态表示框架，通过弹性尺度事件分割（EES）和分层事件整合（HEC）在保持时序连贯性的同时实现高效多尺度视频理解。

## 核心贡献

- 提出 VideoScaffold，一个面向流式视频理解的统一框架，通过弹性事件粒度自适应匹配视频时长，同时保持精细视觉语义，解决现有离线静态策略（稀疏采样、帧压缩、聚类）在连续视频流上产生碎片化或过压缩输出的问题。[REF: Abstract, §1]
- 提出 Elastic-Scale Event Segmentation（EES）：受认知科学事件分割理论（Event Segmentation Theory）启发，采用下一帧预测机制（next-frame prediction）在零样本、流式兼容的方式下动态细化事件边界，构建多粒度层次结构。[REF: §3.2]
- 提出 Hierarchical Event Consolidation（HEC）：利用 EES 生成的层次结构，通过关键帧识别（essential element identification）和跨层聚合（cross-layer aggregation）生成兼具局部细节与全局语义的分层事件表示。[REF: §3.3]
- VideoScaffold 为即插即用（plug-and-play）模块化设计，可无缝扩展现有图像型 MLLM 至连续视频理解；在离线和流式基准上均达到 SOTA。[REF: §1, §4.3]

## 主要 Claim

- 在短视频 QA 基准（ActivityNet-QA、MSVD-QA、MSRVTT-QA）上，VideoScaffold（7B）在可比数据规模下超越所有基线，包括参数量更大的 LLaMA-VID（13B）。[REF: Table 1]
- 在长视频基准 LV-Bench（视频时长超 1 小时）上，VideoScaffold 在所有 7B 规模基线中表现最佳，且性能与使用 70B 语言模型的 LLaVA-OneVision 相当。[REF: §4.3]
- 在 MLVU 基准上，VideoScaffold 使用 60 帧即超越仅使用 2048 帧的 MovieChat 和使用 1000 帧的 MA-LMM，证明弹性层次表示相比大规模帧采样更高效。[REF: §4.3, Table 2]
- 在流式视频基准 StreamingBench 实时视觉理解子集中，VideoScaffold 在现有流式 MLLM 中取得最高平均分，优于在更大规模数据集上训练的 VideoLLM-online。[REF: §4.3, Table 4]
- 消融实验显示，EES 的弹性层次结构对长视频尤为关键：禁用多层次后，长视频性能明显下降，而短视频影响有限。[REF: §4.4, Table 5]
- 边界阈值 ε = 0.4、3 层事件层级时性能最优，过小导致过度分割，过大导致语义合并，表明分层结构与阈值的联合优化至关重要。[REF: §4.4, Table 6]

## 方法 / 数据集规模

- 视觉编码器：EVA-CLIP；语言骨干：Vicuna-7B。训练分两阶段（对齐 + 指令调优），均冻结视觉编码器。[REF: §4.1]
- 对齐阶段数据：LLaVA-filtered CC3M（图像字幕）+ WebVid-2.5M（视频字幕）；指令调优：LLaVA-665K + ActivityNet 衍生问答数据集。[REF: §4.1]
- 全程使用 60 帧输入；对比方法中：MovieChat 使用 2048 帧，MA-LMM 使用 1000 帧。[REF: Table 2]
- EES 使用余弦距离量化预测误差触发事件边界；HEC 利用最高预测误差帧作为语义锚点，通过交叉注意力完成段内聚合与跨层聚合。[REF: §3.2, §3.3]
- StreamingBench 评测使用实时视觉理解子集；VideoMME 评测同时报告有/无字幕两种设置。[REF: §4.2]

## 主要实验结果

**短视频 QA（零样本，7B 模型）**

| 模型 | ActivityNet Acc | MSVD Acc | MSRVTT Acc | LV-Bench Overall |
|------|----------------|----------|------------|-----------------|
| VideoScaffold | 48.9 | 72.5 | 58.4 | 31.5 |
| LLaMA-VID (13B) | 47.5 | 70.0 | 58.9 | 25.5 |
| Chat-UniVi (7B) | 45.8 | 65.0 | 54.6 | 23.9 |

[REF: Table 1]

**MLVU 长视频基准（60 帧 vs 竞品）**

| 模型 | 帧数 | M-Avg | G-Avg |
|------|------|-------|-------|
| VideoScaffold | 60 | 3.58 | — |
| MovieChat | 2048 | 2.31 | — |
| MA-LMM | 1000 | 3.22 | — |

[REF: Table 2]

**StreamingBench（流式 MLLM，实时视觉理解子集）**

- VideoScaffold（LLaVA-SFT + Ours）整体得分 41.0，优于 VideoLLM-online（34.5）和 Flash-VStream（25.9）。[REF: Table 4]

## 局限性

- 模型基于 Vicuna-7B 语言骨干，在更大规模语言模型上的扩展性尚待验证。
- 训练数据规模远小于 LLaVA-OneVision 等强基线，直接对比存在数据规模不对等的问题。
- 弹性分割阈值 ε 与事件层级数量需要针对不同视频领域进行超参数调优。
- 当前框架主要针对视觉模态，对音频、字幕等辅助信息的整合未在本文中讨论。

## 相关页面

- [[multimodal-eval]]
- [[Video-MME|video-understanding]]
- [[multimodal-eval|streaming-video]]
- [[CLongEval|long-video-understanding]]
