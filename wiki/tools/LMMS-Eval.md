---
title: "LMMS-Eval"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# LMMS-Eval

## 概述

LMMS-Eval（Large Multimodal Models Evaluation）是一个开源多模态语言模型评测框架，发布于 2024 年。该框架在 EleutherAI 的 lm-evaluation-harness 架构基础上扩展，专门支持多模态（图文）评测任务，提供统一接口以支持 50 余个多模态基准测试。

## 核心特性

**兼容性设计**：
LMMS-Eval 采用与 lm-evaluation-harness 高度一致的 API 设计，降低了已使用文本评测框架的团队迁移到多模态评测的学习成本。模型接口、任务定义和评测配置遵循相同的规范。

**广泛的基准支持**：
框架内置超过 50 个多模态基准，涵盖：
- 视觉问答（VQA v2、GQA、TextVQA 等）
- 多模态推理（MMBench、MME、MMMU）
- 文档理解（DocVQA、ChartQA、InfoVQA）
- 视频理解（ActivityNet-QA、EgoSchema）
- 科学推理（ScienceQA）

**统一评测入口**：
```bash
python -m lmms_eval \
  --model llava \
  --model_args pretrained=liuhaotian/llava-v1.5-7b \
  --tasks mmbench,mmmu \
  --batch_size 1
```

## 支持的模型

LMMS-Eval 支持主流多模态模型的直接评测，包括 LLaVA 系列、InstructBLIP、Idefics、Qwen-VL、InternVL 等开源多模态模型。通过自定义 model wrapper 也可支持 GPT-4V、Claude 等闭源多模态模型的 API 调用。

## 使用场景

- **研究评测**：学术研究中快速对比不同多模态模型在多个基准上的性能
- **模型开发**：在训练迭代过程中评测多模态能力的变化
- **基准贡献**：开发者可贡献新的多模态基准到框架中

## 与 lm-evaluation-harness 的关系

LMMS-Eval 是 lm-evaluation-harness 在多模态方向的自然延伸。两个框架共享核心设计理念（任务注册、标准化评分、批处理等），LMMS-Eval 在此基础上增加了图像处理管道和多模态任务的输入输出规范。

## 访问方式

- GitHub：[github.com/EvolvingLMMs-Lab/lmms-eval](https://github.com/EvolvingLMMs-Lab/lmms-eval)
- 论文：Zhang et al., "LMMs-Eval: Reality Check on the Evaluation of Large Multimodal Models"（arXiv: 2407.12772）
