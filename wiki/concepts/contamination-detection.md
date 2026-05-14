---
title: "污染检测（Contamination Detection）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 污染检测（Contamination Detection）

> 检测模型训练数据是否包含测试集内容的技术方法总论，是保证基准评测有效性的重要质量控制手段。

## 定义

训练集污染（Training Data Contamination）指评测基准的测试集内容出现在 LLM 的预训练数据中，导致模型已"见过"测试题，评测分数虚高而无法反映真实泛化能力。污染检测（Contamination Detection）是识别这种情况的技术方法集合。

污染的主要来源：
- 网络爬取数据（Common Crawl 等）涵盖了公开发布的基准数据集
- 评测数据集的 GitHub 仓库、学术论文被包含在训练数据中
- 有意在测试集上进行微调（泄露或作弊行为）

## 重要性（在 LLM 评测中）

污染检测是维护基准评测生态可信度的基础：

1. **排行榜可信度**：未经污染检测的排行榜结果无法区分"真实能力"与"数据记忆"
2. **基准寿命**：公开基准越流行，其被爬取进训练数据的概率越高，越需要动态更新
3. **研究再现性**：不同模型的训练数据组成不同，污染程度不同，导致比较结果不可靠
4. **合规与诚信**：高风险 AI 系统的评测需要对污染风险进行尽职调查

## 主要方法/实现

**n-gram 重叠检测**（见 [[n-gram-contamination]]）：
- 计算测试题与训练数据的 n-gram 重叠率
- 设定阈值（如 13-gram 完全匹配）判定污染
- GPT-4 技术报告使用此方法检测 HumanEval 污染

**成员推断攻击**（见 [[membership-inference]]）：
- 通过模型在文本上的困惑度、logit 分布等特征判断是否见过该文本

**Min-K% 概率法**（见 [[min-k-contamination]]）：
- 基于最低概率 token 的统计特征检测污染

**语义等价测试**：
- 将测试题改写为语义等价但措辞不同的版本（paraphrase）
- 若改写版本性能大幅下降，提示存在字面记忆污染

**动态基准设计**：从源头预防污染（见 [[dynamic-benchmarks-concept]]）。

## 局限与挑战

- **训练数据不透明**：大多数商业模型不公开完整训练数据，外部检测只能依赖黑盒方法
- **污染程度量化困难**：检测到重叠不等于确定性能影响，少量污染的影响可能微小
- **改写污染更难检测**：若训练数据包含测试题的同义改写版本，n-gram 方法无效
- **误报风险**：自然语言中的 n-gram 重叠可能是巧合，特别是短 n-gram
- **标准缺失**：目前缺乏行业统一的污染检测标准和报告规范

## 相关页面

- [[n-gram-contamination]] — n-gram 重叠检测方法
- [[min-k-contamination]] — 概率统计检测方法
- [[membership-inference]] — 成员推断攻击
- [[benchmark-contamination]] — 污染问题的综述
- [[leaderboard-contamination]] — 榜单级别的污染风险
- [[dynamic-benchmarks-concept]] — 防污染的动态基准
