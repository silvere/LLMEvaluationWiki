---
title: "GPQA"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
domain: [knowledge, reasoning, science]
language: en
year: 2023
authors: ["David Rein", "Betty Li Hou", "Asa Cooper Stickland", "Jackson Petty", "Richard Yuanzhe Pang", "Julien Dirani", "Julian Michael", "Samuel R. Bowman"]
arxiv_id: "2311.12022"
official_url: "https://github.com/idavidrein/gpqa"
official_leaderboard: "https://epoch.ai/benchmarks/gpqa-diamond"
license: "CC-BY-4.0"
size: 448
format: multiple-choice
saturation_status: saturated
sources:
  - "https://arxiv.org/abs/2311.12022"
  - "https://epoch.ai/benchmarks/gpqa-diamond"
evaluation_protocol:
  default_shots: "0-shot 或 5-shot"
  default_cot: true
  tool_use: false
  scoring: "accuracy (4-way MCQ)"
pitfalls:
  - "三个子集分数不可对比：Main 448 / Diamond 198 / Extended 546，论文常默认报告 Diamond"
  - "饱和：Diamond 从 2024-09 o1 77% → 2026-02 Gemini 3.1 Pro 94.1% / Claude Opus 4.7 94.2%，已超 PhD 专家 65%"
  - "选项位置偏差同 MMLU 类问题（4-way MCQ 共有缺陷）"
  - "题目数量小（Diamond 仅 198），单次评测分数波动 ±1-2pt 是常态，建议多 seed 平均"
  - "已逐渐被 [[HLE]]（Humanity's Last Exam）/ [[FrontierMath]] 等 frontier benchmark 替代"
sota:
  - score: "94.3%"
    model: "Gemini-3.1-Pro"
    harness: null
    notes: "Diamond"
  - score: "90.1%"
    model: "DeepSeek-V4-Pro"
    harness: null
    notes: "Diamond"
  - score: "86.2%"
    model: "GLM-5.1"
    harness: null
    notes: "Diamond"
  - score: "86.0%"
    model: "GLM-5"
    harness: null
    notes: "Diamond"
  - score: "约 85-88%"
    model: "GPT-5"
    harness: null
    notes: "Diamond"
  - score: "87.7%"
    model: "o3"
    harness: null
    notes: "Diamond"
  - score: "84.0%"
    model: "Gemini-2.5-Pro"
    harness: null
    notes: "Diamond"
  - score: "约 78%"
    model: "Claude-3.7-Sonnet"
    harness: null
    notes: "Diamond"
  - score: "78.0%"
    model: "o1"
    harness: null
    notes: "Diamond"
  - score: "约 77.3%"
    model: "Doubao-Seed-1.6"
    harness: null
    notes: "Diamond"
  - score: "约 75.1%"
    model: "Kimi-K2"
    harness: null
    notes: "Diamond"
  - score: "71.5%"
    model: "DeepSeek-R1"
    harness: null
    notes: "Diamond"
  - score: "约 70%"
    model: "Qwen3"
    harness: null
    notes: "thinking"
  - score: "约 69.8%"
    model: "Llama-4"
    harness: null
    notes: "Diamond (Maverick"
  - score: "65.0%"
    model: "Claude-3.5-Sonnet"
    harness: null
    notes: "Diamond"
  - score: "62.1%"
    model: "Gemini-2.0-Flash"
    harness: null
    notes: "Diamond"
  - score: "约 59%"
    model: "DeepSeek-V3"
    harness: null
    notes: "Diamond"
  - score: "53.6%"
    model: "GPT-4o"
    harness: null
    notes: "Diamond"
---

# GPQA（Graduate-Level Google-Proof Q&A）

> 由领域专家设计的研究生级别选择题，即使借助搜索引擎也难以作答，非专家人类准确率约 34%。

<!-- AUTO-LINKS:START -->

## 参考链接

- **官方主页**: [https://github.com/idavidrein/gpqa](https://github.com/idavidrein/gpqa)

<!-- AUTO-LINKS:END -->

## 概述

GPQA 由 Rein 等人于 2023 年发布，设计初衷是构建一个真正难以通过信息检索手段绕过的高难度评测基准。"Google-proof"是其核心设计哲学——题目由生物学、物理学、化学等领域的在职研究人员或博士生撰写，问题本身需要深度领域理解，无法仅凭搜索关键词找到现成答案。

数据集共包含 448 道题，其中最受关注的子集为 Diamond 子集，包含 198 道经过严格筛选的最高难度题目。Diamond 子集的筛选标准包括：至少两位领域专家能够独立答对，且非专家的有限研究条件下答对率极低。实测数据显示，在允许使用互联网的条件下，非专家人类的准确率约为 34%，仅略高于 4 选项随机基线（25%），充分体现了题目的难度壁垒。

GPQA 的核心价值在于评测模型是否真正掌握了研究生级别的科学知识，还是仅依赖模式匹配和检索增强。该基准在前沿模型的能力评估中具有重要地位，被广泛用于衡量模型向专家级知识推理演进的进展。由于题目难度极高，当前尚未出现明显的饱和迹象。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 大小 | 448 题总计（Diamond 子集 198 题） |
| 题目格式 | 4 选项选择题（multiple-choice） |
| 覆盖领域 | 知识、推理（生物学、物理学、化学等研究生级别科学） |
| 语言 | 英文 |
| 许可证 | 待更新 |

## SOTA 表现

- 非专家人类（允许使用互联网）：约 34%
- 顶级模型（2024-2025 年）：待更新


<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | 分数 | 备注 |
|---|---|---|---|
| 🥇 | [[Gemini-3.1-Pro]] | 94.3% | Diamond |
| 🥈 | [[DeepSeek-V4-Pro]] | 90.1% | Diamond |
| 🥉 | [[GLM-5.1]] | 86.2% | Diamond |
| 4 | [[GLM-5]] | 86.0% | Diamond |
| 5 | [[GPT-5]] | 约 85-88% | Diamond |
| 6 | [[o3]] | 87.7% | Diamond |
| 7 | [[Gemini-2.5-Pro]] | 84.0% | Diamond |
| 8 | [[Claude-3.7-Sonnet]] | 约 78% | Diamond |
| 9 | [[o1]] | 78.0% | Diamond |
| 10 | [[Doubao-Seed-1.6]] | 约 77.3% | Diamond |
| 11 | [[Kimi-K2]] | 约 75.1% | Diamond |
| 12 | [[DeepSeek-R1]] | 71.5% | Diamond |
| 13 | [[Qwen3]] | 约 70% | thinking |
| 14 | [[Llama-4]] | 约 69.8% | Diamond (Maverick |
| 15 | [[Claude-3.5-Sonnet]] | 65.0% | Diamond |
| 16 | [[Gemini-2.0-Flash]] | 62.1% | Diamond |
| 17 | [[DeepSeek-V3]] | 约 59% | Diamond |
| 18 | [[GPT-4o]] | 53.6% | Diamond |

<!-- AUTO-SOTA:END -->

## 主要挑战与局限

- **数据集规模较小**：总共仅 448 题，Diamond 子集 198 题，单次评测的统计误差较大，不同评测运行之间分数波动可观，需多次运行取均值以提升可靠性。
- **题目来源的专家偏差**：题目由特定领域的研究人员撰写，覆盖范围集中在自然科学（生物、物理、化学），对数学、工程、人文等领域的覆盖相对有限，所得分数对"研究生水平知识"的代表性存在一定偏差。
- **评测成本高**：题目涉及高度专业知识，人工核实和构建新题需要昂贵的领域专家时间投入，数据集扩展困难，难以快速增大规模以弥补统计局限。

## 专家级 QA 的扩展前沿（2026）

GPQA 之外，多项新基准从不同专业领域填补"研究生级"评测覆盖：

- **病毒学专家级 QA**：[[2504.16137|Virology Capabilities Test (VCT)]]（Götting 等，2024-04）发现前沿 MLLM 在病毒学专家 QA 上 43.8% 准确率——**超越 94% 病毒学家在其专长子领域**。这是首个明确量化 MLLM 在专业领域"已超越专家"的证据，对 GPQA 类专家基准的难度设计提出反向挑战。
- **金融多语言多模态 QA**：[[2410.04526|FAMMA]] 在金融领域引入图表/多语言/专家级问答评测，弥补了 GPQA 偏自然科学的覆盖空白。
- **历史专业研究**：[[2604.24690|ProHist-Bench]] 首个职业历史研究能力评测框架。
- **化学/生物实验室安全**：[[2603.11987|LABSHIELD]] 实验室场景的多模态安全推理与规划，覆盖危险化学品、生物危险等专业判断。

## 相关页面

- [[MMLU]]
- [[MMLU-Pro]]
- [[benchmark-saturation]]
- [[data-contamination]]

## 近期相关研究（arXiv 2026-05 自动入库）

> 以下为 ingest pipeline 筛出的高质量 LLM 评测论文（quality ≥18/25），自动关联到本页主题。

- [[2410.04526|FAMMA: A Benchmark for Financial Domain Multilingual Multimodal Question Answering]] · score 21/25
- [[2504.16137|Virology Capabilities Test (VCT): A Multimodal Virology Q&A Benchmark]] · score 20/25

