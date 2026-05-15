---
title: "推理时扩展（Inference-Time Scaling）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 推理时扩展（Inference-Time Scaling）

> 在推理阶段增加计算量以提升模型输出质量的技术范式，与训练时扩展互补。

## 定义

推理时扩展（Inference-Time Scaling，也称 Test-Time Compute Scaling）是指在不改变模型参数的前提下，通过在推理阶段投入更多计算资源来提升输出质量的一类方法。与传统的训练时扩展（增大模型/数据/算力）不同，推理时扩展在模型已训练完成后仍能带来性能增益。

主要实现方式包括：
- **多次采样（Best-of-N）**：生成多个候选答案并用奖励模型选取最优
- **自一致性（Self-Consistency）**：多次生成并通过多数投票选择答案
- **思维链（Chain-of-Thought）**：生成中间推理步骤，增加总token数
- **树搜索/MCTS**：构建推理树并搜索最优路径
- **过程奖励模型（PRM）引导搜索**：在每一步推理后评分并剪枝

## 重要性（在 LLM 评测中）

推理时扩展对评测产生了深远影响：

1. **评测条件标准化挑战**：同一模型在不同推理预算下性能差异显著，使横向比较更加复杂
2. **"o1效应"**：OpenAI o1系列模型通过大量推理时计算在数学/代码等任务上大幅超越前代，开辟了新的扩展维度
3. **成本-性能曲线**：不同推理时计算量对应不同性能水平，评测报告需标注推理配置
4. **新型评测需求**：需要评测模型在固定计算预算下的最优表现，而非固定推理方式

## 主要方法/实现

- **Best-of-N + Verifier**：生成N个答案，用外部验证器（如数学符号引擎）选最优
- **Process Reward Model（PRM）**：对每个推理步骤评分，引导搜索方向
- **MCTS-based reasoning**：AlphaGo类搜索用于LLM推理，如AlphaZero for Code
- **Sequential revision**：模型反复修改答案，直到满足质量条件

## 推理对参数知识的解锁效应

[[thinking-to-recall]]（2026）从一个新维度揭示了推理时扩展的意义：开启推理不仅改变了模型的推理路径，还**大幅扩展了参数化知识的召回边界**——存储在权重中但在关闭推理时无法触达的正确答案，通过推理过程可以被"解锁"。这对评测有直接启示：在关闭推理 vs 开启推理两种配置下，模型的知识评测结果不可直接比较，必须作为独立的评测条件报告。

## 局限与挑战

- **计算成本高**：推理时扩展会成倍增加API调用成本和延迟
- **评测标准不统一**：不同基准对推理时计算的处理方式不一致
- **过度思考风险**：更多推理步骤有时导致正确答案被覆盖（overthinking）
- **验证器瓶颈**：高质量过程奖励模型本身难以获取

## 相关页面

- [[process-reward-model]]
- [[self-consistency]]
- [[chain-of-thought]]
- [[scaling-laws]]
- [[calibration]]

## 近期相关研究（arXiv 2026-05 自动入库）

> 以下为 ingest pipeline 筛出的高质量 LLM 评测论文（quality ≥18/25），自动关联到本页主题。

- [[2410.08474|SPORTU: A Comprehensive Sports Understanding Benchmark for Multimodal Large Language Models]] · score 26/25
- [[2511.01833|TIR-Bench: A Comprehensive Benchmark for Agentic Thinking-with-Images Reasoning]] · score 21/25
- [[2506.04280|Evaluating MLLMs with Multimodal Multi-image Reasoning Benchmark]] · score 20/25
- [[2409.13711|WebQuest: A Benchmark for Multimodal QA on Web Page Sequences]] · score 19/25
- [[2604.23178|Judging the Judges: A Systematic Evaluation of Bias Mitigation Strategies in LLM-as-a-Judge Pipelines]] · score 19/25
- [[2604.12379|Beyond Output Correctness: Benchmarking and Evaluating Large Language Model Reasoning in Coding Tasks]] · score 19/25
- [[2510.24816|Perception, Understanding and Reasoning, A Multimodal Benchmark for Video Fake News Detection]] · score 18/25
- [[2605.09997|GraphInstruct: A Progressive Benchmark for Diagnosing Capability Gaps in LLM Graph Generation]] · score 18/25
- [[2603.17145|REAL: Regression-Aware Reinforcement Learning for LLM-as-a-Judge]] · score 18/25
- [[2601.10165|Advancing Adaptive Multi-Stage Video Anomaly Reasoning: A Benchmark Dataset and Method]] · score 18/25
