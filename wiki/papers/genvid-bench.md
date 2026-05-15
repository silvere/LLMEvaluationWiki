---
title: "GenVidBench: A Challenging Benchmark for AI-Generated Video Detection"
type: paper
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
source_type: paper
url: "https://arxiv.org/abs/2501.11340"
ingested: "2026-05-14"
sources:
  - "https://arxiv.org/abs/2501.11340"
year: 2026
authors:
  - "Zhenliang Ni"
  - "Qiangyu Yan"
  - "Mouxiao Huang"
  - "Tianning Yuan"
discusses:
  - "[[genvidbench|GenVidBench]]"
  - "[[multimodal-eval|ai-generated-video-detection]]"
  - "[[benchmark-design]]"
  - "[[multimodal-eval|deepfake-detection]]"
---

# GenVidBench: A Challenging Benchmark for AI-Generated Video Detection

> 构建首个 600 万级 AI 生成视频检测数据集，引入跨来源与跨生成器任务设置

## 核心贡献

- 提出 GenVidBench，包含 6,784,490 个视频样本，是目前规模最大的 AI 生成视频检测数据集；同时提供轻量版 GenVidBench-143k 供快速迭代 [REF: §Dataset Construction]
- 引入跨来源（cross-source）与跨生成器（cross-generator）任务：训练集与测试集的生成器完全不同，强制检测器学习生成器无关的特征 [REF: §Cross-Source and Cross-Generator Task]
- 为部分视频提供三维语义标注（对象类别、动作、位置），支持场景级细粒度分析与基准评估 [REF: §Content Analysis]
- 覆盖 11 种主流视频生成器（Pika、MuseV、SVD、Mora、CogVideo、Sora、Kling 等）及 2 个真实视频来源（Vript、HD-VG-130M），保证生成质量多样性 [REF: Table 2]

## 主要 Claim

- 同源训练测试时，VideoSwin-Tiny 在各子集的检测准确率均超过 97.40%；但跨生成器场景下（如训练 Pika、测试 SVD），准确率骤降至 54.66% [REF: Table 3]
- 跨来源测试的平均准确率（56.71%）低于同来源测试（61.81%），说明生成来源对检测器性能有显著影响 [REF: Table 4]
- 在 GenVidBench-6M 的跨生成器任务上，DeMamba 取得最高 Top-1 准确率 85.47%，其次是 MViTv2（80.45%）；Transformer 整体优于 CNN [REF: Table 5]
- Sora 生成的视频最难被检测，而 CogVideo 生成的视频最容易被识别（时序连续性较弱）[REF: §Results of Cross-Source and Cross-generator Task]
- 与其他数据集对比，SlowFast 在 NeuralTextures 上达 82.55%，在 GenVidBench 上仅为 70.06%，证明本数据集难度更高 [REF: Table 8]
- 植被类（Plants）场景专项任务中，TimeSformer 最优（75.09%），VideoSwin 最差（52.86%）[REF: Table 10]

## 方法 / 数据集规模

- 总视频数：6,784,490（GenVidBench-6M）；轻量版 143,400（GenVidBench-143k）[REF: Table 2]
- 训练集生成器：Pika、VideoCraftV2、ModelScope、T2V-Zero（每种约 167 万）；真实来源 Vript（约 42 万）[REF: Table 2]
- 测试集生成器：MuseV、SVD、Mora、CogVideo（每种 13,853）；真实来源 HD-VG-130M（13,853）；另含 Sora（51）和 Kling（264）[REF: Table 2]
- 分辨率范围：256×256（低质量）至 1920×1080（高清）；帧率 4–30 FPS [REF: Table 2]
- 语义标注维度：对象（10 类）、动作（6 类）、位置（7 类）[REF: Figure 2]
- 基线评测模型：I3D、SlowFast、TPN、TIN、TRN、TSM（CNN 系列）；TimeSformer、UniFormerV2、VideoSwin、MViTv2（Transformer 系列）；DeMamba（Mamba 架构）[REF: Table 5]

## 主要实验结果

- GenVidBench-6M 跨生成器任务最佳方法 DeMamba：Top-1 85.47%，F1 90.27%，AUROC 99.28% [REF: Table 5, Table 6]
- VideoSwin：Top-1 80.39%；TSM（最佳 CNN）：Top-1 73.88% [REF: Table 5]
- GenVidBench-143k 上 MViTv2 仍表现出色，但因训练集缩小，整体准确率低于 6M 版本 [REF: §Results on GenVidBench-143k]
- 真实视频（HD-VG-130M）检测准确率普遍超过 95%，假视频中 Sora 样本最难区分 [REF: Table 5]

## 局限性

- 数据集体量庞大，训练所需计算资源与时间开销显著（为此提供 143k 子集）[REF: §Overview of GenVidBench]
- Sora 和 Kling 在数据集中样本量极少（51 和 264 个），评估结果代表性有限 [REF: Table 2]
- 语义标注仅覆盖部分视频，全量标注尚不完整
- 跨生成器任务设定中检测准确率整体偏低，表明现有方法泛化能力不足，存在大量改进空间

## 相关页面

- [[genvidbench|GenVidBench]]
- [[multimodal-eval|ai-generated-video-detection]]
- [[multimodal-eval|deepfake-detection]]
- [[benchmark-design]]
