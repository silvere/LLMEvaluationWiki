---
title: "MME-CoT"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
  - reasoning
year: 2025
arxiv_id: "2502.09621"
status: active
---

# MME-CoT

> 首个系统评测多模态大模型链式思考（Chain-of-Thought）推理质量、鲁棒性和效率的综合基准，发表于 ICML 2025，揭示反思机制与推理效率之间的深层权衡。

## 概述

MME-CoT 由 Jiang 等研究者提出，论文"MME-CoT: Benchmarking Chain-of-Thought in Large Multimodal Models for Reasoning Quality, Robustness, and Efficiency"于 2025 年 2 月发表于 arXiv（2502.09621），并被 ICML 2025 正式接收。这是多模态 CoT 评测领域第一项综合性研究，填补了现有多模态基准对推理过程评估的空白。

随着 o1/o3 等推理模型和 Kimi k1.5 等带反思机制（reflection）的多模态模型的崛起，多模态 CoT 质量评测变得尤为重要。现有多模态基准（如 MME、MMBench）仅评估最终答案的正确性，无法区分"正确但推理过程错误"与"推理过程正确且答案正确"两种情况。MME-CoT 通过三个新颖指标——推理质量（reasoning quality）、鲁棒性（robustness）和效率（efficiency）——系统地评测模型在生成 CoT 过程中的各个维度。

基准覆盖六大领域：数学（math）、科学（science）、OCR、逻辑推理（logic）、时空推理（space-time）和通用场景（general scenes），题目要求模型给出包含详细推理步骤的完整回答。研究发现：（1）带反思机制的模型（如 Kimi k1.5）在 CoT 质量上显著优于 GPT-4o；（2）对感知密集型（perception-heavy）任务使用 CoT 提示词往往会降低模型性能，可能引发"过度思考"（overthinking）；（3）虽然带反思机制的模型 CoT 质量高，但在正常回答和自我纠错阶段均存在显著效率低下问题。

## 任务格式

- **覆盖领域**：6 个（数学、科学、OCR、逻辑、时空推理、通用场景）
- **题目类型**：要求生成完整 CoT 推理过程的视觉问答
- **评估方式**：三维度评估——推理质量（细粒度推理步骤评分）、鲁棒性（对提示词扰动的稳定性）、效率（token 消耗与正确率比值）
- **答案格式**：需包含分步推理过程（step-by-step reasoning）+ 最终答案

## 主要指标

- **推理质量得分（Reasoning Quality）**：细粒度评估每步推理是否正确、相关
- **鲁棒性（Robustness）**：对不同 CoT 提示词变体的性能稳定性
- **效率（Efficiency）**：每单位 token 消耗获得的正确率
- **综合排名**：带反思机制模型（Kimi k1.5）> GPT-4o；感知任务上 CoT 可能适得其反

## 局限性

- 推理质量的细粒度评分依赖 LLM-as-judge，可能引入评判偏差
- "过度思考"现象的定义和量化方式尚未有统一标准
- 六大领域主要覆盖结构化推理场景，对开放式视觉问答（如常识推理、图像描述）覆盖有限

## 相关页面

- [[multimodal-eval]]
- [[llm-as-judge]]
- [[inference-time-scaling]]
- [[MMMU]]
