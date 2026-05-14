---
title: "Holmes-VAU"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - video
  - multimodal
  - safety
year: 2024
arxiv_id: "2412.06171"
status: active
---

# Holmes-VAU

> 由浙江大学等机构发布的长视频异常理解基准 HIVAU-70k，包含超过 70,000 条多粒度标注，覆盖片段级、事件级和视频级三个层次，用于评测多模态 LLM 对视频中异常行为的识别、定位与解释能力（arXiv:2412.06171，CVPR 2025 Highlight）。

## 概述

Holmes-VAU（Towards Long-term Video Anomaly Understanding at Any Granularity）是一个专为长视频异常理解设计的综合性基准与方法框架，于 2024 年 12 月发布于 arXiv（arXiv:2412.06171），并被 CVPR 2025 评为 Highlight 论文。该工作由浙江大学 pipixin321 团队主导，代码和数据已在 GitHub 开源。

传统视频异常检测（Video Anomaly Detection，VAD）方法通常只给出帧级异常分数，缺乏对异常的语义解释和细粒度时序定位。Holmes-VAU 的核心贡献在于将异常理解提升到"理解"层面：不仅检测异常发生的时间点，还要求模型用自然语言描述异常内容、识别异常类型、解释异常原因。

为支撑这一目标，研究团队构建了 HIVAU-70k 数据集，采用半自动标注引擎（结合人工视频分割与 LLM 递归自由文本标注），在片段级（Clip-level）、事件级（Event-level）和视频级（Video-level）三个粒度提供超过 70,000 条多层次标注。同时，研究团队提出了异常聚焦时序采样器（Anomaly-focused Temporal Sampler，ATS），使多模态 LLM 能够在长视频中高效聚焦于异常密集区域。

## 任务格式

- **数据规模**：HIVAU-70k，超过 70,000 条多粒度标注
- **标注粒度（三层次）**：
  - 片段级（Clip-level）：短视频片段的异常分类和描述
  - 事件级（Event-level）：单一异常事件的时序边界和语义解释
  - 视频级（Video-level）：整段视频的异常总结和综合理解
- **标注方式**：半自动化标注引擎——人工完成视频时序分割，LLM 递归生成自由文本描述，再经人工审核修正
- **评测任务类型**：
  - 异常分类（Anomaly Classification）
  - 时序定位（Temporal Localization）
  - 异常描述生成（Anomaly Description Generation）
  - 问答（QA）
- **视频来源**：主流视频异常检测数据集（UCF-Crime、ShanghaiTech 等）及新增标注视频

## 主要指标

- **AUC（Area Under Curve）**：帧级异常检测的 ROC 曲线下面积，用于评测时序异常定位精度
- **文本生成质量**：ROUGE、BLEU、CIDEr 等指标评估异常描述生成的语言质量
- **QA 准确率**：多粒度问答任务的正确率
- **多粒度联合评估**：三个标注粒度的综合表现，评估模型在不同时间尺度上的理解能力

**关键发现**：
- 多粒度指令数据显著提升了多模态 LLM 对视频异常的理解能力
- ATS 在不牺牲精度的前提下大幅降低了长视频处理的计算开销
- 现有通用视频 LLM 在细粒度时序异常定位上仍明显落后于专门训练的模型

## 局限性

- **标注质量依赖 LLM**：半自动标注引擎使用 LLM 生成描述，可能引入 LLM 本身的幻觉或偏差
- **场景多样性受限**：主要基于监控视频场景，对其他场景（医疗、工业、交通等）的泛化能力未经充分验证
- **长视频处理成本高**：即便使用 ATS，处理超长视频（>10 分钟）的计算成本仍然较高
- **主观性标注**：异常的定义在不同文化和场景下存在主观性，标注一致性难以完全保证
- **开放式生成评估**：自由文本描述的自动评估与人工评估之间仍存在较大差距

## 相关页面

- [[multimodal-eval]]
- [[HarmBench]]
- [[safety-eval-landscape]]
- [[llm-as-judge]]
