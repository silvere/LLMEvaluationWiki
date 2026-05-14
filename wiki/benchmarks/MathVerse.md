---
title: "MathVerse"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [multimodal, math]
language: en
year: 2024
authors: ["Renrui Zhang", "Dongzhi Jiang", "Yichi Zhang", "Haokun Lin", "Ziyu Guo", "Pengshuo Qiu", "Aojun Zhou", "Pan Lu", "Kai-Wei Chang", "Peng Gao", "Hongsheng Li"]
arxiv_id: "2403.14624"
official_url: "https://mathverse-cuhk.github.io"
license: ""
size: 2612
format: open-ended
status: active
saturation_threshold: 0.90
sources:
  - "https://arxiv.org/abs/2403.14624"
---

# MathVerse：数学图形视觉推理评测基准

## 概述

MathVerse 是 2024 年提出的数学视觉推理专项评测基准，专注于评测多模态模型理解和推理**数学图形**（几何图、函数图、统计图等）的能力。它包含 **2,612 道**题目，每道题设计了 **6 个变体子集**，用于精确区分模型依赖视觉信息与文字信息的程度。

## 任务设计

MathVerse 的核心创新是将每道数学题拆分为 **6 个输入变体**：

| 变体名称 | 问题文字 | 视觉条件描述 | 图像 |
|---------|---------|------------|------|
| Text Dominant (TD) | 完整 | 详细文字描述代替图像 | 无 |
| Text Lite (TL) | 完整 | 简要文字描述 | 无 |
| Text Only (TO) | 完整 | 无 | 无 |
| Vision Intensive (VI) | 简化 | 无 | 有 |
| Vision Dominant (VD) | 极简 | 无 | 有 |
| Vision Only (VO) | 无 | 无 | 有 |

通过对比不同变体的模型表现，可以精确分析模型究竟依赖视觉信息还是文字信息来完成推理，从而检测模型是否真正"看懂"了数学图形。

**数学内容覆盖：**
- 平面几何（三角形、圆、多边形）
- 立体几何（三维图形）
- 函数与图像
- 统计与概率
- 解析几何（坐标系）

## 评分机制

MathVerse 采用 **CoT Evaluation（思维链评估）**模式：
- 要求模型输出完整推理过程
- 使用 GPT-4 提取最终答案并与标准答案比对
- 对数值答案允许等价表达（如小数与分数等价）

## 数据特点

- 2,612 道核心题目，扩展为 6 个变体后共 15,672 道评测实例
- 图像来源于高质量数学教材，经人工验证
- 提供详细的题目类别标签（几何类型、难度级别）
- 支持 zero-shot 和 few-shot 两种评测协议

## 主要发现与局限

MathVerse 的 6 变体设计揭示了多模态模型数学推理的重要规律：
- 大多数模型在"Text Dominant"变体（详细文字描述代替图像）上表现最好，说明模型更依赖文字而非视觉
- 在"Vision Only"变体上，即使是 GPT-4V 准确率也显著下降，说明纯视觉数学推理仍是难题
- 专为数学视觉推理设计的模型（InternLM-XComposer 等）在 VO 变体上优势明显

主要局限在于 GPT-4 辅助评分引入成本和版本依赖；数学图形覆盖高中以下层次为主，缺乏大学数学场景；中文数学教材占比较高，可能影响英语模型表现。

## 参考文献

Zhang, R., Jiang, D., Zhang, Y., et al. (2024). MathVerse: Does Your Multi-modal LLM Truly See the Diagrams in Visual Math Problems? *arXiv:2403.14624*.
