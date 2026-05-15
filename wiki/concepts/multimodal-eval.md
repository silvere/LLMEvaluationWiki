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

## 相关页面

- [[benchmark-contamination]] — 多模态数据污染检测更困难
- [[Dan-Hendrycks]] — MMMU 的共同作者之一
- [[multimodal-eval]] — 本页

## 近期相关研究（arXiv 2026-05 自动入库）

> 以下为 ingest pipeline 筛出的高质量 LLM 评测论文（quality ≥18/25），自动关联到本页主题。

- [[2410.08474|SPORTU: A Comprehensive Sports Understanding Benchmark for Multimodal Large Language Models]] · score 26/25
- [[2511.01833|TIR-Bench: A Comprehensive Benchmark for Agentic Thinking-with-Images Reasoning]] · score 21/25
- [[2410.12564|FTII-Bench: A Comprehensive Multimodal Benchmark for Flow Text with Image Insertion]] · score 21/25
- [[2410.04526|FAMMA: A Benchmark for Financial Domain Multilingual Multimodal Question Answering]] · score 21/25
- [[2506.04280|Evaluating MLLMs with Multimodal Multi-image Reasoning Benchmark]] · score 20/25
- [[2504.16137|Virology Capabilities Test (VCT): A Multimodal Virology Q&A Benchmark]] · score 20/25
- [[2412.15574|J-EDI QA: Benchmark for deep-sea organism-specific multimodal LLM]] · score 19/25
- [[2409.13711|WebQuest: A Benchmark for Multimodal QA on Web Page Sequences]] · score 19/25
- [[2604.24645|K-MetBench: A Multi-Dimensional Benchmark for Fine-Grained Evaluation of Expert Reasoning, Locality, and Multimodality in Meteorology]] · score 19/25
- [[2604.15994|ReactBench: A Benchmark for Topological Reasoning in MLLMs on Chemical Reaction Diagrams]] · score 19/25
- [[2603.12266|MM-CondChain: A Programmatically Verified Benchmark for Visually Grounded Deep Compositional Reasoning]] · score 19/25
- [[2603.11987|LABSHIELD: A Multimodal Benchmark for Safety-Critical Reasoning and Planning in Scientific Laboratories]] · score 19/25
- [[2511.12263|CrossVid: A Comprehensive Benchmark for Evaluating Cross-Video Reasoning in Multimodal Large Language Models]] · score 18/25
- [[2510.24816|Perception, Understanding and Reasoning, A Multimodal Benchmark for Video Fake News Detection]] · score 18/25
- [[2601.16449|Emotion-LLaMAv2 and MMEVerse: A New Framework and Benchmark for Multimodal Emotion Understanding]] · score 18/25
- [[2405.07960|AgentClinic: a multimodal agent benchmark to evaluate AI in simulated clinical environments]] · score 18/25
- [[2605.09675|CodeClinic: Evaluating Automation of Coding Skills for Clinical Reasoning Agents]] · score 18/25
- [[2604.24690|Can LLMs Act as Historians? Evaluating Historical Research Capabilities of LLMs via the Chinese Imperial Examination]] · score 18/25
- [[2604.16980|Evaluating Multimodal LLMs for Inpatient Diagnosis: Real-World Performance, Safety, and Cost Across Ten Frontier Models]] · score 18/25
- [[2603.29139|SciVisAgentBench: A Benchmark for Evaluating Scientific Data Analysis and Visualization Agents]] · score 18/25
- [[2603.22529|Ego2Web: A Web Agent Benchmark Grounded in Egocentric Videos]] · score 18/25
- [[2602.23649|AudioCapBench: Quick Evaluation on Audio Captioning across Sound, Music, and Speech]] · score 18/25
- [[2604.18584|MathNet: a Global Multimodal Benchmark for Mathematical Reasoning and Retrieval]] · score 18/25
- [[2602.22273|FIRE: A Comprehensive Benchmark for Financial Intelligence and Reasoning Evaluation]] · score 18/25
- [[2601.10649|MINERVA-Cultural: A Benchmark for Cultural and Multilingual Long Video Reasoning]] · score 18/25
- [[2601.10165|Advancing Adaptive Multi-Stage Video Anomaly Reasoning: A Benchmark Dataset and Method]] · score 18/25
