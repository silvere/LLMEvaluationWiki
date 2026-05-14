---
title: "Microsoft Research"
type: entity
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Microsoft Research

> 微软全球研究部门，在小型高效语言模型（Phi 系列）和 LLM 评测方法上有重要贡献，并通过 Azure OpenAI 合作关系深度参与前沿模型的评测与部署。

## 基本信息

- **性质**：微软（Microsoft）旗下研究部门
- **成立时间**：1991 年
- **总部**：美国雷德蒙德（多地分布）
- **规模**：千人以上研究人员

## 主要贡献（评测相关）

**Phi 系列小型语言模型**：Microsoft Research 发布的 Phi-1（2023）、Phi-1.5、Phi-2、Phi-3 等小型模型以远低于参数量预期的基准得分著称，挑战了"参数量决定能力"的假设。Phi-3-mini（3.8B 参数）在 MMLU 等评测上达到与 GPT-3.5 相当的水平，推动了"数据质量 vs. 数据规模"在评测框架中的讨论。

**WizardLM / WizardCoder**：微软研究院相关团队开发的指令微调增强方法，在 MT-Bench 和 HumanEval 等评测上取得显著成绩，是评测微调方法的重要参照。

**HELM 参与**：微软研究人员参与了斯坦福 HELM 评测框架的构建。

**GLUE / SuperGLUE 贡献**：微软研究院研究员参与了 GLUE 和 SuperGLUE 基准的早期构建，这些基准奠定了后来 LLM 评测范式的基础。

**DeepSpeed**：微软开源的大规模训练优化框架，虽非直接评测工具，但作为训练基础设施，影响了大量开源模型的实际性能表现。

## 代表性模型/产品

- **Phi 系列（Phi-1 至 Phi-4）**：高效小型语言模型
- **Azure OpenAI Service**：GPT-4 等模型的企业级 API 服务
- **DeepSpeed**：大规模训练优化框架
- **WizardLM**：指令微调增强模型系列

## 对评测生态的影响

Phi 系列模型的持续发布，使"小模型 + 高质量数据"成为评测研究的独立课题，推动了对训练数据构成和评测污染问题的深入分析。Azure OpenAI 的商业部署也为 LLM 在企业场景中的实际效果评测提供了大规模真实数据。

## 相关页面

- 
- [[GLUE]]
- [[SuperGLUE]]
- [[MT-Bench]]
- [[Stanford-CRFM]]
