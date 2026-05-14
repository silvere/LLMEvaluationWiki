---
title: "MT-Video-Bench"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
language: "en"
year: 2025
status: "active"
arxiv_id: "2510.17722"
sources:
  - "[[mt-video-bench]]"
domain:
  - multimodal
  - dialog
task: "video-understanding"
---

# MT-Video-Bench

> 首个专注于多轮对话场景的视频理解综合评测基准，包含 1,000 个对话、5,887 个 QA 对，从感知性与交互性两大维度系统评估多模态 LLM 的视频理解能力。

## 概述

MT-Video-Bench（Multi-Turn Video Benchmark）是 2026 年初提出的视频理解评测基准，由 Fudan University、Nanjing University（NJU-LINK）、USTC 与 Kuaishou Technology 联合构建。不同于 [[Video-MME]] 等以单轮问答为主的视频评测基准，MT-Video-Bench 模拟真实人机交互场景，要求模型在连续多轮对话中保持上下文一致性、处理话题转换并展现主动交互能力。

论文 arXiv 链接：https://arxiv.org/abs/2510.17722（v2，2026-01-09）  
代码与数据：https://github.com/NJU-LINK/MT-Video-Bench

## 数据集规模

| 指标 | 数值 |
|------|------|
| 多轮对话总数 | 1,000 个 |
| QA 对总数 | 5,887 个 |
| 平均 QA 数/视频 | 43.61 个 |
| 平均对话轮次 | 5.89 轮 |
| 对话轮次范围 | 5–8 轮 |
| 视频原始来源 | 200 个视频（YouTube 等平台） |
| 视频类别数 | 5 大类别 |

## 任务维度

MT-Video-Bench 将评测任务组织为两大维度，共 6 项核心能力：

### 感知性（Perceptivity）

面向视频内容的基础理解与上下文整合能力：

- **Object Reference（OR）**：模型能否正确解析隐式指代和代词，将其映射到视频中的特定实体或人物。
- **Memory Recall（MR）**：在多轮对话中检索并整合历史对话信息，以维持推理连续性与对话一致性的能力。
- **Content Summary（CS）**：将视频内容与对话内容压缩为简洁、全面的摘要，同时保持语义忠实度。

### 交互性（Interactivity）

面向对话质量和自适应能力的高阶评测：

- **Answer Refusal（AR）**：识别不可回答的问题并明确拒绝，而不产生幻觉内容的能力。
- **Topic Shifting（TS）**：在用户发起话题转换时，保持连贯性与相关性的自适应能力。
- **Proactive Interaction（PI）**：当检测到用户兴趣降低时，通过澄清或提供新见解主动维持对话的能力。

## 主要实验结果（整体准确率 %）

| 模型 | 整体 | OR | MR | CS | AR | TS | PI |
|------|------|----|----|----|----|----|----|
| **Gemini-2.5-Pro** | **76.95** | 71.63 | 72.45 | 93.71 | 57.74 | 89.67 | 76.50 |
| Gemini-2.5-Flash | 69.90 | 64.07 | 67.23 | 92.45 | 47.50 | 83.17 | 64.98 |
| Doubao-Seed-1.6 | 67.40 | 53.82 | 57.20 | 93.21 | 55.57 | 81.30 | 63.30 |
| Qwen3-VL-32B-Thinking | 68.57 | 58.50 | 59.11 | 93.21 | 52.93 | 81.72 | 65.93 |
| Qwen3-VL-32B-Instruct | 67.84 | 55.57 | 59.94 | 91.40 | 50.48 | 82.88 | 66.80 |
| InternVL3.5-38B (Think) | 58.50 | 52.03 | 48.51 | 77.39 | 37.84 | 67.87 | 67.34 |
| Qwen3-VL-8B-Thinking | 65.98 | 54.78 | 58.21 | 90.97 | 45.35 | 78.01 | 68.59 |
| Qwen3-VL-4B-Thinking | 62.96 | 52.18 | 55.26 | 91.37 | 41.67 | 72.00 | 65.31 |

数据来源：[REF: Table 2]

## 关键发现

1. **闭源模型占优，差距正在收窄**：Gemini-2.5-Pro 保持领先，但 Qwen3-VL-32B-Thinking 已超越 Doubao-Seed-1.6。
2. **任务难度差异显著**：CS 最易（顶级模型成功率常超 90%），AR 是普遍瓶颈（即便最强模型也难以识别知识边界）。
3. **Think 模式持续有效**：推理模式在所有模型规模上均带来显著性能提升。
4. **场景复杂度影响感知精度**：场景数量从 1–5 增至超过 20，Gemini-2.5-Pro 累计下降约 13%。
5. **级联效应明显**：黄金上下文与自预测上下文之间的显著差距揭示早期错误的传播问题。

## 局限性

- 数据规模（1,000 个对话）相对有限，难以覆盖所有边缘场景。
- 视频主要来源于英语内容平台，跨语言泛化性未经验证。
- 自动化评分依赖 Gemini-2.5-Flash 构建检查清单，对高交互性任务（尤其是 PI）的评估存在一定主观性。

## 相关页面

- [[mt-video-bench]] — 对应论文 source 页
- [[multimodal-eval]] — 多模态评测综述
- [[multi-turn-eval]] — 多轮对话评测方法
- [[Video-MME]] — 视频理解单轮评测基准
- [[benchmark-design]] — 基准设计方法论
