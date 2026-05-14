---
title: "CHAIR"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain:
  - multimodal
  - vision
year: 2018
arxiv_id: ""
status: active
---

# CHAIR

> 量化图像描述模型幻觉对象比例的评测指标，是视觉语言模型幻觉评测的基础方法之一。

## 概述

CHAIR（Caption Hallucination Assessment with Image Relevance）由 Rohrbach 等人于 EMNLP 2018 论文《Object Hallucination in Image Captioning》中提出，是专门用于评测图像描述（image captioning）模型幻觉现象的度量指标。传统自动评测指标（CIDEr、METEOR、SPICE 等）缺乏对生成内容与图像实际内容一致性的直接检验，CHAIR 通过比对生成文本中出现的对象与图像实际标注对象，量化"幻觉对象"（模型描述中存在但图像中实际不存在的物体）的比例。

CHAIR 主要在 MSCOCO 数据集上使用，利用 COCO 的像素级目标标注作为地面真值。该指标无需人工参与，可自动化大规模评测，因此在 VLM 幻觉研究中被广泛沿用。随着多模态大语言模型的快速发展，CHAIR 被扩展应用于 LLaVA、InstructBLIP、mPLUG-Owl 等大型视觉语言模型的幻觉评测，成为 VLM 安全性与可信性评测的重要基础指标。

CHAIR 包含两个互补的子指标：CHAIR_s（句子级）和 CHAIR_i（实例级），分别从不同粒度衡量幻觉程度。其核心贡献在于揭示了即使 SPICE 等语义指标评分较高的模型，也可能存在严重的幻觉对象生成问题，从而将幻觉评测从隐性变为显性可量化。

## 任务格式

- 评测对象：图像描述生成（image captioning）模型或视觉语言模型的自由文本输出
- 输入：模型对 COCO 图像的生成描述文本（通常为单句或短段落）
- 地面真值：COCO 目标检测/实例分割标注（80 个物体类别）
- 计算流程：从生成文本中提取名词/物体词 → 映射到 COCO 类别词汇表 → 与图像标注对比 → 统计幻觉比例
- 无需额外人工标注，可在标准 COCO 验证集/测试集上自动运行

## 主要指标

- **CHAIR_s**（Sentence-level）：生成描述中包含至少一个幻觉对象的句子比例，取值 0–1，越低越好
- **CHAIR_i**（Instance-level）：生成描述中全部提及对象中属于幻觉对象的比例，取值 0–1，越低越好
- 两个指标通常同时报告，分别衡量句子和对象实例两个粒度的幻觉频率

## 局限性

- 评测词汇表受限于 COCO 的 80 个物体类别，对于长尾类别、抽象概念或属性型幻觉（如颜色、数量错误）无法检测
- 词汇映射依赖基于规则的同义词/词根匹配，在细粒度或详细描述中容易出现漏报或误报
- 指标聚焦于对象层面，不能检测空间关系幻觉（如"猫在桌子左边"）、属性幻觉（如"红色的车"实为蓝色）等更复杂的幻觉类型
- 随着 VLM 生成更长、更详细的描述，CHAIR 的误报率上升——对象词可能出现在非存在性陈述（如否定句）中，但仍被计为幻觉
- 不适用于非 COCO 分布的图像或视频理解场景

## 相关页面

- [[HallusionBench]]
- [[POPE]]
- [[multimodal-eval]]
- [[llm-as-judge]]
