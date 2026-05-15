---
title: "Agent 评测"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
---

# Agent 评测

> 评测 AI Agent 在多步骤、工具调用、真实环境任务中的完成能力。

## 定义

Agent 评测是指评估 AI 系统在需要规划、决策、工具使用和多轮交互的任务上的表现。与单次问答不同，Agent 任务通常包含：向外部环境（浏览器、代码执行器、文件系统等）发出动作、根据环境反馈调整策略、在多步骤序列中完成目标。

## 重要性（在 LLM 评测中）

随着 LLM 从"聊天机器人"向"能干活的 Agent"演进，Agent 评测成为衡量模型实际用途最直接的方式。代码修复（SWE-bench）、网页浏览（WebArena）、操作系统控制（OSWorld）等 benchmark 已成为衡量前沿模型实用价值的核心指标。截至 2025 年，相关 benchmark 已超过 50 个，但标准化程度仍然很低，结果跨研究难以比较。

## 主要方法/实现

**主要 Benchmark：**
- **SWE-bench / SWE-bench Verified**：给定 GitHub Issue，要求 Agent 自动修复代码。Verified 版本经人工核实，排除了约 5.2% 的虚假通过任务。
- **WebArena**：在真实网页环境中完成购物、信息查找等任务。
- **OSWorld**：在真实操作系统界面中执行用户指令。
- **τ-bench**：评测 Agent 在工具调用和 API 交互场景中的表现。
- **GAIA**：通用 AI Assistant 基准，测试综合信息检索和推理能力。

**评测指标：**
- **任务完成率**：最常用指标，但对部分完成缺乏区分度。
- **pass^k**：运行 k 次，至少通过一次算成功；衡量模型的最大潜力而非平均表现。
- **工具调用效率**：完成任务所需的工具调用次数、token 消耗。

## 局限与挑战

- **非确定性**：相同任务多次运行结果不同，需要多次运行取平均，成本高。
- **长期信用分配**：多步骤序列中难以判断哪一步的决策导致了最终失败。
- **工具/环境可变性**：外部 API、网页结构随时间变化，评测结果时效性短。
- **虚假通过**：SWE-bench 中 5.2% 的任务存在虚假通过问题，高估了实际修复率。
- **标准化缺失**：超过 50 个 benchmark 之间缺乏统一的任务格式、评分标准和难度分级。

## 自进化 Agent 与评测

[[agent-evolver]]（2026）提出了一个新范式：让 LLM 主导自身改进——自主发现训练环境、生成任务、采集轨迹、更新能力，形成无人工介入的闭环。这对评测提出了新挑战：自进化 Agent 的能力边界会随训练不断移动，静态 benchmark 的区分度会迅速失效，需要动态更新的任务分布来持续追踪其能力上限。

代码 Agent 方向的研究（[[td-scaling]]，2026）则发现训练轨迹的**多样性**比数量更具扩展性——高差异性的成功/失败轨迹比大量同质轨迹更有效地提升代码 Agent 性能。这改变了代码 Agent 训练数据的收集策略，也影响了性能提升的归因分析。

## 相关页面

- [[chain-of-thought]] — Agent 推理的核心机制
- [[process-reward-model]] — Agent 长序列任务的过程评估
- [[SWE-bench-Leaderboard]] — 代码 Agent 评测的标志性排行榜

## 近期相关研究（arXiv 2026-05 自动入库）

> 以下为 ingest pipeline 筛出的高质量 LLM 评测论文（quality ≥18/25），自动关联到本页主题。

- [[2604.02648|GBQA: A Game Benchmark for Evaluating LLMs as Quality Assurance Engineers]] · score 23/25
- [[2511.01833|TIR-Bench: A Comprehensive Benchmark for Agentic Thinking-with-Images Reasoning]] · score 21/25
- [[2410.04526|FAMMA: A Benchmark for Financial Domain Multilingual Multimodal Question Answering]] · score 21/25
- [[2602.21143|A Benchmark for Deep Information Synthesis]] · score 21/25
- [[2511.13095|BeDiscovER: The Benchmark of Discourse Understanding in the Era of Reasoning Language Models]] · score 20/25
- [[2409.13711|WebQuest: A Benchmark for Multimodal QA on Web Page Sequences]] · score 19/25
- [[2604.24645|K-MetBench: A Multi-Dimensional Benchmark for Fine-Grained Evaluation of Expert Reasoning, Locality, and Multimodality in Meteorology]] · score 19/25
- [[2603.12266|MM-CondChain: A Programmatically Verified Benchmark for Visually Grounded Deep Compositional Reasoning]] · score 19/25
- [[2603.11987|LABSHIELD: A Multimodal Benchmark for Safety-Critical Reasoning and Planning in Scientific Laboratories]] · score 19/25
- [[2602.17072|BankMathBench: A Benchmark for Numerical Reasoning in Banking Scenarios]] · score 19/25
- [[2604.10015|FinTrace: Holistic Trajectory-Level Evaluation of LLM Tool Calling for Long-Horizon Financial Tasks]] · score 18/25
- [[2601.16449|Emotion-LLaMAv2 and MMEVerse: A New Framework and Benchmark for Multimodal Emotion Understanding]] · score 18/25
- [[2405.07960|AgentClinic: a multimodal agent benchmark to evaluate AI in simulated clinical environments]] · score 18/25
- [[2605.03242|Enhancing Agent Safety Judgment: Controlled Benchmark Rewriting and Analogical Reasoning for Deceptive Out-of-Distribution Scenarios]] · score 18/25
- [[2605.09675|CodeClinic: Evaluating Automation of Coding Skills for Clinical Reasoning Agents]] · score 18/25
- [[2605.08904|OPT-BENCH: Evaluating the Iterative Self-Optimization of LLM Agents in Large-Scale Search Spaces]] · score 18/25
- [[2604.11201|CocoaBench: Evaluating Unified Digital Agents in the Wild]] · score 18/25
- [[2604.23539|MetaGAI: A Large-Scale and High-Quality Benchmark for Generative AI Model and Data Card Generation]] · score 18/25
- [[2603.29139|SciVisAgentBench: A Benchmark for Evaluating Scientific Data Analysis and Visualization Agents]] · score 18/25
- [[2603.22529|Ego2Web: A Web Agent Benchmark Grounded in Egocentric Videos]] · score 18/25
- [[2602.22273|FIRE: A Comprehensive Benchmark for Financial Intelligence and Reasoning Evaluation]] · score 18/25
