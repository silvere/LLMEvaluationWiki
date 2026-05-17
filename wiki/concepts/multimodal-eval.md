---
title: "多模态评测"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
aliases:
  - multimodal-evaluation
  - 多模态评测
---

# 多模态评测

> 评测模型理解和推理图像、视频、音频等非文本输入能力的评测分支。

## 定义

多模态评测（Multimodal Evaluation）针对大型多模态模型（Large Multimodal Model，LMM）设计，测试模型处理超出纯文本范围的输入的能力，包括图像理解、图文问答、视频内容分析、文档图像解析、数学图形推理等任务。随着 GPT-4V、Claude 3、Gemini 等多模态模型的普及，这一评测方向已成为前沿模型评测的核心组成部分。

## 重要性（在 LLM 评测中）

多模态能力的评测揭示了当前 LMM 与人类的显著差距。MMMU-Pro 作为严苛的大学级多学科视觉理解 benchmark，将模型准确率压降至 16.8%-26.9%，远低于人类水平。在数学视觉推理领域，MATH-V 数据表明 LMM 平均得分约 30.39 分，而人类基准为 68.82 分，差距超过 38 个百分点。这说明多模态推理仍是当前模型的显著弱点。

## 主要方法/实现

- **图文问答（Visual Question Answering，VQA）**：给定图像和问题，要求模型生成答案。MMBench、SeedBench 等采用此格式。
- **文档理解**：解析包含表格、图表、公式的文档图像，如 DocVQA。
- **视频问答**：理解视频片段内容并回答问题，如 EgoSchema、MVBench。
- **数学图形推理**：解读几何图形、数学函数图像并推理，如 MATH-V。
- **感知与推理分层**：将"看到什么"（感知）和"基于所见推理"（推理）分开评测，以定位模型失败的阶段。

**代表性 Benchmark：**
- MMMU（大学级多学科多模态理解）
- MMMU-Pro（MMMU 的加强版）
- MATH-V（数学视觉推理）
- MMBench、SeedBench（综合视觉能力）
- [[MT-Video-Bench]]（多轮对话视频理解，1000 对话 / 5887 QA，2026）
- [[LVOmniBench]]（长时音视频全模态理解，275 视频 10-90 分钟，2026）

## 局限与挑战

- **模态鸿沟（Modality Gap）**：模型在纯文本任务上表现远优于视觉任务，即使内容等价；MMMU-Pro 最直观地量化了这一差距。
- **评测集构建成本高**：图像标注比文本标注成本高得多，高质量多模态数据集稀缺。
- **视频评测复杂性**：视频理解涉及时序推理，评测指标和数据集标准尚不统一。[[MT-Video-Bench]] 引入了多轮对话维度，[[LVOmniBench]] 进一步加入了长时（>10分钟）+音频联合理解。
- **污染风险**：训练数据中的图像-文本对可能覆盖评测集，污染检测比纯文本更难。

## 2026 年 MLLM 评测的关键发现

新一批 arXiv 高质量论文（≥18/25）进一步细化了 MLLM 的能力边界，几乎一致地显示**多模态模型在专业领域显著弱于人类**：

- **学术造假取证（顶级 T1 lab）**：[[2603.25089|THEMIS]]（Ma 等，2026-03，60+ 页）4000+ 真实撤稿案例上，**SOTA GPT-5 仅 56.15%**，证明现有 MLLM 在视觉欺诈推理上远未达到专家水平。
- **感知 vs. 认知解耦**：[[2509.11101|Seeing is Not Understanding]] 系统量化"看到 ≠ 理解"——同样的视觉刺激下，MLLM 感知准确但认知推理跌穿底线，暗示当前主流评测高估了视觉能力。
- **体育理解**：[[2410.08474|SPORTU]]（多模态体育理解，2024-10）最高 71%，但仍远低于人类。
- **图文混排理解**：[[2410.12564|FTII-Bench]]（Flow Text with Image Insertion）评估模型在文中插图任务上的图文对齐能力。
- **金融多模态 QA**：[[2410.04526|FAMMA]] 跨语言金融图表推理；[[2602.22273|FIRE]] 综合金融图表理解。
- **多图推理**：[[2506.04280|Multimodal Multi-image Reasoning Benchmark]] 测试模型在多图比对/串联推理上的表现。
- **病毒学专业**：[[2504.16137|Virology Capabilities Test (VCT)]]（Götting 等，2024-04）MLLM 在病毒学专家级 QA 上达 43.8% 准确率——**超越 94% 人类专家在其专长领域的表现**，凸显 MLLM 在某些专业领域已具备超人能力。
- **视觉异常推理**：[[2601.10165|Adaptive Multi-Stage Video Anomaly Reasoning]] 提出分阶段推理评测。
- **历史研究**：[[2604.24690|Can LLMs Act as Historians?]] 引入 ProHist-Bench 评估职业历史研究能力。
- **数学视觉**：[[2604.18584|MathNet]] 全球多模态数学推理与检索。

整体趋势：MLLM 在**通用感知任务**接近 SOTA，但在**领域专家任务**和**感知→认知链路**仍是显著短板。

## 相关页面

- [[benchmark-contamination]] — 多模态数据污染检测更困难
- [[Dan-Hendrycks]] — MMMU 的共同作者之一
- [[multimodal-eval]] — 本页

## 近期相关研究（arXiv 2026-05 自动入库）

> 以下为 ingest pipeline 筛出的高质量 LLM 评测论文（quality ≥18/25），自动关联到本页主题。

- [[2508.06530|What Makes "Good" Distractors for Object Hallucination Evaluation in Large Vision-Language Models?]] · Ming-Kun Xie 等 · score 19/25
