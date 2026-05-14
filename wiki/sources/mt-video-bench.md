---
title: "MT-Video-Bench: A Holistic Video Understanding Benchmark for Evaluating Multimodal LLMs in Multi-Turn Dialogues"
type: source
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
source_type: paper
url: "https://arxiv.org/abs/2510.17722"
ingested: "2026-05-14"
sources:
  - "https://arxiv.org/abs/2510.17722"
year: 2026
authors:
  - "Yaning Pan"
  - "Qianqian Xie"
  - "Guohui Zhang"
  - "Jiaheng Liu"
discusses:
  - "[[multimodal-eval]]"
  - "[[multi-turn-eval]]"
  - "[[Video-MME|video-understanding]]"
  - "[[benchmark-design]]"
---

# MT-Video-Bench: A Holistic Video Understanding Benchmark for Evaluating Multimodal LLMs in Multi-Turn Dialogues

> 首个系统评测多模态 LLM 多轮视频对话能力的综合基准，涵盖 1,000 个对话、5,887 个 QA 对及 6 项能力维度。

## 核心贡献

- 提出 MT-Video-Bench，填补现有视频评测基准仅支持单轮 QA 的空白，将评测扩展到多轮对话场景，同时关注感知性（Perceptivity）与交互性（Interactivity）两大能力类别。[REF: §1]
- 设计 6 项精确定义的评测能力（Object Reference、Memory Recall、Content Summary、Answer Refusal、Topic Shifting、Proactive Interaction），覆盖真实人机对话的核心挑战。[REF: §3.1]
- 构建半自动化数据标注流水线，结合 PySceneDetect、YOLOv11 目标检测、Gemini-2.5-Flash 字幕生成与 Gemini-2.5-Pro 多轮对话生成，并经双人工核验，最终生成 1,000 条高质量多轮对话。[REF: §3.2]
- 对 24 个开源/闭源 MLLM 进行系统测评，揭示当前模型在多轮视频对话中的显著性能差距与局限性。[REF: §4]

## 主要 Claim

- 最强闭源模型 Gemini-2.5-Pro 的整体准确率仅为 76.95%，绝大多数开源模型低于 60%，仅 Qwen3-VL 系列例外。[REF: Table 2]
- Content Summary（CS）是最易掌握的任务，顶级模型成功率常超过 90%；Answer Refusal（AR）是普遍瓶颈，即便最强模型也难以准确识别知识边界。[REF: §4.2]
- 随场景数量从 1–5 增加到超过 20 个，即便顶级模型 Gemini-2.5-Pro 的性能也出现累计约 13% 的持续下降，揭示模型在长程时间依赖推理上的薄弱。[REF: §4.3]
- "Think"推理模式在所有模型规模上均带来显著的性能提升，例如 InternVL3.5-38B（Think）明显优于其 No Think 版本。[REF: §4.2]
- 自预测上下文与黄金上下文之间存在显著差距，显示出早期错误累积引发的"级联效应"（cascade effect）。[REF: §4.3]
- 对话轮次从 5 到 8 轮增加时，所有模型性能普遍下降，InternVL3.5-8B（No Think）表现最为敏感，从 57.18 跌至 34.63。[REF: §4.3]

## 方法 / 数据集规模

- 数据集：1,000 个多轮对话，5,887 个 QA 对；平均每个视频 43.61 个 QA 对，平均每轮对话 5.89 轮。[REF: Table 1, §3.3]
- 视频来源：从 YouTube 等平台手动收集 200 个视频，涵盖 Movie、TV、Sports、Knowledge、Life Record 5 大类别。[REF: §3.2, §3.3]
- 对话轮次分布：每个多轮对话包含 5 至 8 轮，平均 5.89 轮。[REF: §3.3]
- 评测方法：使用 Gemini-2.5-Flash 构建每个 QA 对的 5 个 yes/no 检查清单问题（checklist），以准确率作为最终得分。[REF: §3.4]
- 人工协议验证：随机抽取 120 个样本，Gemini-2.5-Flash 评估与人工判断的 Spearman/Kendall-Tau/Pearson 相关系数分别为 95.25/87.48/97.01。[REF: Table 3]
- 输入设置：大多数模型统一采样 128 帧，长边不超过 720 像素。[REF: §4.1]

## 主要实验结果

| 模型 | 整体 | OR | MR | CS | AR | TS | PI |
|------|------|----|----|----|----|----|----|
| Gemini-2.5-Pro | 76.95 | 71.63 | 72.45 | 93.71 | 57.74 | 89.67 | 76.50 |
| Gemini-2.5-Flash | 69.90 | 64.07 | 67.23 | 92.45 | 47.50 | 83.17 | 64.98 |
| Qwen3-VL-32B-Thinking | 68.57 | 58.50 | 59.11 | 93.21 | 52.93 | 81.72 | 65.93 |
| Qwen3-VL-8B-Thinking | 65.98 | 54.78 | 58.21 | 90.97 | 45.35 | 78.01 | 68.59 |
| Qwen3-VL-4B-Thinking | 62.96 | 52.18 | 55.26 | 91.37 | 41.67 | 72.00 | 65.31 |
| InternVL3.5-8B (Think) | 58.36 | 50.70 | 51.58 | 73.83 | 38.83 | 68.74 | 66.47 |

[REF: Table 2]

## 局限性

- 数据规模相对有限（1,000 个对话），难以全面覆盖所有边缘场景。
- 视频来源局限于公开平台（YouTube 等），可能存在分布偏差。
- 评测依赖 Gemini-2.5-Flash 构建的检查清单，对 Proactive Interaction 等高交互性任务的自动化评分存在主观性。
- 当前基准主要覆盖英语内容，跨语言场景下的泛化性尚未验证。

## 相关页面

- [[mt-video-bench|MT-Video-Bench]]
- [[multimodal-eval]]
- [[multi-turn-eval]]
- [[Video-MME|video-understanding]]
- [[benchmark-design]]
