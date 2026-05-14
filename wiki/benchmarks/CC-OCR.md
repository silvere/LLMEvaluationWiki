---
title: "CC-OCR"
type: benchmark
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
aliases:
  - CC_OCR
domain:
  - multimodal
  - multilingual
year: 2024
arxiv_id: "2412.02210"
status: active
---

# CC-OCR

> 由阿里巴巴达摩院发布的中文复杂场景 OCR 综合评测基准，覆盖文档理解、场景文字识别、手写体、表格等多类中文 OCR 任务，是评测多模态模型中文文字识别能力的全面标准。

## 概述

CC-OCR（Complex Chinese OCR，2024，阿里巴巴达摩院）是专注于**中文光学字符识别**（OCR）能力的多模态评测基准。随着 LLM 与视觉语言模型（VLM）的快速发展，传统 OCR 系统（如 PaddleOCR、Tesseract）逐步与 LLM 整合，但缺乏针对中文场景的系统性评测。

CC-OCR 涵盖了中文 OCR 的 4 大核心场景：
1. **文档场景**：扫描文档、PDF 文件的中文文字识别，包括多栏排版
2. **自然场景**：路牌、广告牌、店铺名称等真实场景文字识别
3. **手写体**：手写中文、行草书、竖排书写等挑战性场景
4. **表格与图表**：含文字的表格、票据、财务报表识别

基准同时覆盖"文字识别"（识别文字内容）和"文字理解"（基于识别内容回答问题）两个层次，后者更接近真实应用需求。

CC-OCR 补充了此前多模态 OCR 评测（如 OCRBench）在中文复杂场景覆盖上的不足，是评测国内多模态模型（Qwen-VL、InternVL、MiniCPM-V 等）OCR 能力的重要标准。

## 任务格式

- **题目总量**：约 7,000+ 张图片，覆盖多类场景
- **任务类型**：文字识别（精确输出）+ 文字理解（问答形式）
- **语言**：主要为中文，含少量中英混排场景
- **场景分类**：文档、场景、手写、表格 4 大类，每类含细分子类
- **评估方式**：字符级 F1 分数（识别任务）+ 准确率（理解任务）

## 主要指标

- **Overall Score**：跨全部场景类型的综合得分
- **Document OCR Accuracy**：文档场景识别精度
- **Scene Text Recognition**：自然场景文字识别率
- **Handwriting Recognition**：手写体识别准确率
- **Table OCR Score**：表格内容识别与理解得分

## 局限性

- 评测集中于中文场景，对英文或多语言混合 OCR 场景覆盖有限
- 手写体样本的多样性受采集来源限制，可能不代表全部方言区书写习惯
- 识别任务的字符级评分对输出格式敏感，LLM 可能因输出冗余文字被惩罚

## 相关页面

- [[OCRBench]]
- [[OCRBench-V2]]
- [[DocVQA]]
- [[ChartQA]]
- [[TextVQA]]
