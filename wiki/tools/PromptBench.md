---
title: "PromptBench"
type: tool
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# PromptBench

## 概述

PromptBench 是一个专注于**提示鲁棒性（prompt robustness）**评测的开源框架，于 2023 年发布（arXiv: 2306.04528）。该框架的核心问题是：当输入提示词发生微小扰动时，语言模型的性能是否保持稳定？PromptBench 通过系统性地测试模型对各类对抗性提示（adversarial prompts）的抵抗能力，揭示了当时主流模型在提示鲁棒性方面的显著脆弱性。

## 研究背景

早期研究发现，LLM 对提示词的微小变化（如拼写错误、大小写变化、同义词替换）高度敏感，即"提示脆弱性"（prompt brittleness）问题。PromptBench 系统化地研究这一现象，发现即使是 ChatGPT 等强模型也会因为提示中的微小扰动而损失超过 20% 的性能。

## 攻击类型

PromptBench 实现了多种文本层面的对抗性攻击：

**字符级攻击**：
- TextBugger：字符替换、插入、删除
- DeepWordBug：基于重要性的字符扰动

**词语级攻击**：
- BERT-Attack：替换为语义相近但形式不同的词
- TextFooler：保持语义的词语替换

**句子级攻击**：
- StressTest：添加无关噪声句子
- CheckList：多种语言学变换

## 评测指标

- **准确率**：对抗性提示下的任务准确率
- **鲁棒性得分**：相对于原始提示的性能保留比例
- **攻击成功率**：使模型性能下降的攻击比例

## PromptBench v2（Unified LLM Evaluation）

2024 年，PromptBench 演进为更通用的 LLM 评测库（promptbench），除鲁棒性测试外，还支持多种标准基准的评测，成为统一的 LLM 评测接口：

```python
import promptbench as pb
model = pb.LLMModel(model='gpt-4')
dataset = pb.DatasetLoader.load_dataset('sst2')
prompt = pb.Prompt("Classify: {content}")
```

## 适用场景

- 发布模型前的鲁棒性压力测试
- 研究不同提示工程策略的稳定性
- 比较不同模型对输入噪声的敏感程度

## 访问方式

- GitHub：[github.com/microsoft/promptbench](https://github.com/microsoft/promptbench)
- 论文：Zhu et al., "PromptBench: Towards Evaluating the Robustness of Large Language Models on Adversarial Prompts"（arXiv: 2306.04528）
- 安装：`pip install promptbench`
