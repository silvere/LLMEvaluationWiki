---
title: "Process Reward Model (PRM)"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
---

# Process Reward Model (PRM)

> 对推理链的每一个中间步骤进行打分的奖励模型，而非只评价最终答案。

## 定义

Process Reward Model（过程奖励模型，PRM）是一种对模型输出的推理过程逐步评分的机制。与 Outcome Reward Model（结果奖励模型，ORM）不同，ORM 只判断最终答案是否正确，而 PRM 对推理链的每一步独立给出分数，能够识别"最终答案正确但中间推理有误"或"早期推理出错导致最终错误"等情况。

## 重要性（在 LLM 评测中）

o1 类（具备显式推理过程）模型的兴起使 PRM 的重要性大幅提升。评测这类模型时，仅看最终答案可能遗漏推理过程中的关键缺陷——模型可能通过错误路径"碰巧"得到正确答案（也称"虚假推理"）。PRM 为推理质量提供更细粒度的评估信号，也被用于强化学习训练中的过程监督（Process Supervision），引导模型学习正确的推理策略而非结果猜测。

## 主要方法/实现

- **人工逐步标注**：标注者对每个推理步骤手工标记"正确/错误/不确定"，质量最高但成本极高。OpenAI PRM800K 数据集包含约 80 万条步骤级标注。
- **自动化 PRM 训练**：使用 Monte Carlo 搜索或 best-of-N 采样自动估计每步的正确概率，降低标注成本。
- **PRM 作为评测工具**：在评测推理模型时，用 PRM 分数衡量推理链质量；在 Best-of-N 选择中，用 PRM 从多条候选推理链中挑选最优解。

## 奖励模型作为优化导师

近期研究（[[reward-model-teacher]]，2026）从优化视角重新定义了 RM 的角色：好的奖励模型不仅要能"打分评判"，更要为策略优化提供**平滑、连续且梯度性质良好**的信号。该视角强调 RM 的光滑性（smoothness）和单调性，以确保强化学习过程的稳健收敛，而非只关注打分准确率。这对 PRM 的设计目标提出了新要求：步骤分数不只是"对/错"二值判断，而是对优化器有导向性的连续值。

## 局限与挑战

- **标注成本极高**：逐步标注比只标注最终答案需要多 5-10 倍的人工投入，难以大规模扩展。
- **步骤划分歧义**：推理链的"步骤"边界定义不明确，不同标注者的划分方式可能不一致。
- **泛化能力有限**：在特定数学推理数据上训练的 PRM 往往难以泛化到代码、科学推理等其他领域。
- **对齐问题**：PRM 可能奖励形式正确但实质错误的推理步骤（即过度关注格式而非实质）。

## PRM 在工具使用 Agent 上的延伸（2026）

PRM 原本面向"线性推理链"，但 Agent 时代提出新挑战：多步工具调用的过程评估、Reward Hacking 风险：

- **ToolPRMBench**：[[2601.12294|ToolPRMBench]]（Dawei Li 等，2026-01）首个评估 PRM 在 tool-using Agent 上的基准，发现现有数学推理 PRM **几乎完全无法迁移**到工具使用过程评估——步骤定义、状态空间、奖励信号都不同。
- **代码推理质量的过程评估**：[[2604.12379|CodeRQ-Bench]]（Yuangang Li，2026-04）从"代码是否通过测试"扩展到"代码推理质量"（注释、变量命名、控制流清晰度三大维度），是 PRM 在代码领域的延伸应用场景。
- **Reward Hacking 的过程暴露**：[[2605.02964|Reward Hacking Benchmark]]（Kunvar Thaman，2026-05）+ [[2511.21654|EvilGenie]] 证明仅看 outcome reward 会奖励"通过捷径"的 Agent；PRM 提供了在中间步骤暴露 hacking 行为的可能性。

## 相关页面

- [[chain-of-thought]] — CoT 推理链是 PRM 的评分对象
- [[agent-eval]] — Agent 任务中的长序列决策需要类 PRM 的过程评估
- [[calibration]] — PRM 的步骤分数本身也需要校准

## 近期相关研究（arXiv 2026-05 自动入库）

> 以下为 ingest pipeline 筛出的高质量 LLM 评测论文（quality ≥18/25），自动关联到本页主题。

- [[2601.12294|ToolPRMBench: Evaluating and Advancing Process Reward Models for Tool-using Agents]] · Dawei Li 等 · score 18/25
