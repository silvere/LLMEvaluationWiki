---
title: "元评测（Meta-Evaluation）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources:
  - "Reiter, E., & Belz, A. (2009). An Investigation into the Validity of Some Metrics for Automatically Evaluating Natural Language Generation Systems. Computational Linguistics 2009."
  - "Gehrmann, S., et al. (2022). Repairing the Cracked Foundation: A Survey of Obstacles in Evaluation Practices for Generated Text. Journal of AI Research 2022."
---

# 元评测（Meta-Evaluation）

## 定义

**元评测（Meta-Evaluation）**是指对评测方法本身有效性的评估，即"评测评测者"——通过系统性研究检验一种评测指标或评测框架是否真正测量了其声称要测量的能力。元评测是确保评测实践科学性的基础性工作。

## 核心问题

元评测关注的核心问题包括：

1. **效度（Validity）**：评测指标是否测量了目标能力？（我们想测量"推理能力"，但实际测的是"格式遵循"吗？）
2. **信度（Reliability）**：评测结果是否可复现？不同评测者/系统能否得到一致结论？
3. **灵敏度（Sensitivity）**：评测方法能否区分能力水平接近的模型？
4. **鲁棒性（Robustness）**：评测结果是否对评测细节（提示变化、采样随机性）敏感？

## 主要研究方向

### 与人类判断的相关性（Correlation with Human Judgment）
检验自动评测指标（BLEU、ROUGE、BERTScore 等）与人工评测结果的相关性，是机器翻译和文本生成领域最核心的元评测方法（详见 [[correlation-with-human]]）。

### 基准有效性研究
- 检验基准是否真正测量了目标能力（如检验 NLI 数据集是否包含大量标注产物）
- MMLU-Redux 对 MMLU 标注错误的系统审查是典型的元评测工作

### LLM-as-Judge 的元评测
对"使用 GPT-4 作为评判者"这一做法的元评测研究包括：
- 位置偏差（position bias）：评判者偏好回答顺序更靠前的回答
- 冗长偏差（verbosity bias）：评判者偏好更长的回答
- 自我偏好（self-preference）：模型偏好与自身回答风格相似的回答
- 与人类评测的相关性分析

### 评测标准的一致性
- 不同标注者对同一样本的评分一致性（[[inter-annotator-agreement]]）
- 评测框架在不同运行之间的结果稳定性

## 在 LLM 时代的重要性

随着 LLM 能力快速发展，元评测的重要性愈发突出：

1. **基准饱和检测**：通过元评测判断某基准是否已接近人类上限，失去区分度
2. **新基准验证**：确保新构建的基准真正测量了目标能力，而非其他因素
3. **LLM 评判者的可靠性**：系统检验 LLM-as-judge 方法在不同任务和模型上的可靠性边界
4. **评测成本-效度权衡**：通过元评测找到自动评测与人工评测之间的最优平衡

## 典型元评测研究

| 研究 | 元评测对象 | 主要发现 |
|------|-----------|---------|
| Reiter & Belz (2009) | NLG 自动指标 | BLEU 与人类判断相关性低于预期 |
| Gururangan et al. (2018) | NLI 数据集 | SNLI 存在大量可利用的标注产物 |
| Gema et al. (2024) | MMLU 基准 | ~6% 题目存在标注错误 |
| Zheng et al. (2023) | LLM-as-Judge | GPT-4 评判存在系统性位置偏差 |

## 相关概念

- [[correlation-with-human]]：与人类判断相关性，核心元评测指标
- [[inter-annotator-agreement]]：评测一致性度量
- [[llm-as-judge]]：被元评测的重要评测方法
