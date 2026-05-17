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

## 真实工程 Agent 评测：能力远不如学术 benchmark 暗示

2026 年一批新基准对"Agent 能力"提出了更严苛的测量，普遍显示**真实场景成功率远低于 [[SWE-bench]] / WebArena 的高分**：

- **移动开发**：[[2603.24946|MobileDev-Bench]]（Fakorede 等，2026-03）真实 iOS/Android Issue 上 resolution 仅 **3.23%–4%**。
- **数字 Agent 综合**：[[2604.11201|CocoaBench]] 统一数字 Agent 任务**成功率 45.1%**。
- **长程规划**：[[2602.16902|LLM-WikiRace Benchmark]] 在知识图谱跨步规划上简单实例 >90%，但**最难分裂仅 25%**。
- **复杂工具调用**：[[2604.10015|FinTrace]] 在金融场景多步工具调用上做轨迹级评估，发现单步准确率高但整轨迹通过率显著下降。
- **多 Agent 谈判**：[[2605.14537|Cattle Trade]]（Müller 等，2026-05）评测 LLM 的虚张声势/出价/讨价能力，best model 仅赢 72.9% 局。
- **Reward Hacking**：[[2605.02964|Reward Hacking Benchmark]] 与 [[2511.21654|EvilGenie]] 各自度量 Agent 在工具使用中通过捷径/破坏验证机制获得奖励的倾向。
- **诊断式评测**：[[2605.09997|GraphInstruct]] 提出 Progressive Benchmark，按图任务难度递进诊断 Agent 的具体短板。

→ 详见 [[SWE-bench]] 中"SWE-bench 之外：真实工程场景的能力差距"段落。

## 自进化 Agent 与评测

[[agent-evolver]]（2026）提出了一个新范式：让 LLM 主导自身改进——自主发现训练环境、生成任务、采集轨迹、更新能力，形成无人工介入的闭环。这对评测提出了新挑战：自进化 Agent 的能力边界会随训练不断移动，静态 benchmark 的区分度会迅速失效，需要动态更新的任务分布来持续追踪其能力上限。

代码 Agent 方向的研究（[[td-scaling]]，2026）则发现训练轨迹的**多样性**比数量更具扩展性——高差异性的成功/失败轨迹比大量同质轨迹更有效地提升代码 Agent 性能。这改变了代码 Agent 训练数据的收集策略，也影响了性能提升的归因分析。

## 相关页面

- [[chain-of-thought]] — Agent 推理的核心机制
- [[process-reward-model]] — Agent 长序列任务的过程评估
- [[SWE-bench-Leaderboard]] — 代码 Agent 评测的标志性排行榜

## 近期相关研究（arXiv 2026-05 自动入库）

> 以下为 ingest pipeline 筛出的高质量 LLM 评测论文（quality ≥18/25），自动关联到本页主题。

- [[2508.14925|MCPTox: A Benchmark for Tool Poisoning Attack on Real-World MCP Servers]] · Zhiqiang Wang 等 · score 20/25
- [[2406.20015|ToolBeHonest: A Multi-level Hallucination Diagnostic Benchmark for Tool-Augmented Large Language Models]] · Yuxiang Zhang 等 · score 20/25
- [[2510.19423|ETOM: A Five-Level Benchmark for Evaluating Tool Orchestration within the MCP Ecosystem]] · Jia-Kai Dong 等 · score 20/25
- [[2510.02271|InfoMosaic-Bench: Evaluating Multi-Source Information Seeking in Tool-Augmented Agents]] · Yaxin Du 等 · score 19/25
- [[2410.11710|MTU-Bench: A Multi-granularity Tool-Use Benchmark for Large Language Models]] · Pei Wang 等 · score 19/25
- [[2410.09997|Collu-Bench: A Benchmark for Predicting Language Model Hallucinations in Code]] · Nan Jiang 等 · score 19/25
- [[2603.21454|Cross-Context Verification: Hierarchical Detection of Benchmark Contamination through Session-Isolated Analysis]] · Tae-Eun Song 等 · score 18/25
- [[2601.12294|ToolPRMBench: Evaluating and Advancing Process Reward Models for Tool-using Agents]] · Dawei Li 等 · score 18/25
- [[2511.01527|TPS-Bench: Evaluating AI Agents' Tool Planning \& Scheduling Abilities in Compounding Tasks]] · Hanwen Xu 等 · score 18/25
- [[2508.07575|MCPToolBench++: A Large Scale AI Agent Model Context Protocol MCP Tool Use Benchmark]] · Shiqing Fan 等 · score 18/25
