---
title: "Few-shot / Zero-shot 评测"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: []
---

# Few-shot / Zero-shot 评测

> 通过控制提示中示例数量来评测模型在不同上下文学习条件下的能力。

## 定义

- **Zero-shot 评测**：提示中不提供任何任务示例，直接要求模型完成任务。测试模型依靠预训练知识和指令理解能力的表现。
- **Few-shot 评测**：提示中提供 k 个"输入 → 输出"示例（k 通常为 1、5、25 等），模型通过上下文学习（in-context learning）推断任务格式和规则后作答。k 的具体数值需在论文中明确标注。

## 重要性（在 LLM 评测中）

shot 数量对评测分数的影响显著，是导致不同研究结果不可比的主要来源之一。相同任务、相同模型，在 0-shot 和 5-shot 下可能出现 5-20 个百分点的差异。因此，评测标准化要求研究者在报告结果时必须说明所用 shot 数，并优先遵循 benchmark 官方推荐配置。

## 主要方法/实现

- **固定 shot 数**：MMLU 通常使用 5-shot，HellaSwag 常用 10-shot，各 benchmark 有惯例设置。
- **示例选取策略**：随机从训练集抽取、选取与测试问题最相似的示例（检索式）、手工精选代表性示例。
- **格式敏感性测试**：在不同 shot 数下运行同一模型，分析性能曲线，评估模型对上下文学习的依赖程度。

## 局限与挑战

- **不可比性**：不同团队对同一 benchmark 采用不同 shot 数，导致分数无法横向对比，这是评测领域标准化不足的典型问题。
- **示例质量敏感**：few-shot 性能对示例质量和排列顺序敏感，不同示例集可能导致几个百分点的差异。
- **上下文窗口限制**：shot 数受模型最大上下文长度约束，长问题场景下无法使用高 shot 数。
- **指令微调模型的特殊性**：经过指令微调的模型在 zero-shot 下通常表现更好，few-shot 示例有时反而干扰其原有的指令跟随格式。

## 相关页面

- [[chain-of-thought]] — 与 few-shot CoT 密切相关
- [[benchmark-contamination]] — few-shot 示例本身也可能造成信息泄露
- [[lm-evaluation-harness]] — 统一管理各 benchmark 的 shot 数配置
