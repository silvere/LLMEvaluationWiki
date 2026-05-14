---
title: "METEOR"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# METEOR

> 结合精确率、召回率与词序惩罚的机器翻译评测指标，通过词干匹配和同义词匹配改进了 BLEU 的语义局限性。

## 定义

METEOR（Metric for Evaluation of Translation with Explicit ORdering）于 2005 年由 Banerjee 和 Lavie 提出，后经多次版本迭代。其设计目标是弥补 BLEU 的两大缺陷：忽视召回率和无法处理词形变化。

计算步骤：
1. **词对齐**：在候选译文和参考译文之间建立词级对齐，支持三种匹配方式：精确匹配、词干匹配（stemming）、同义词匹配（WordNet）
2. **精确率与召回率**：计算对齐词对占候选译文/参考译文的比例
3. **调和平均 Fmean**：以 9:1 的权重偏向召回率（F_mean = 10PR / (R + 9P)）
4. **词序惩罚**：基于对齐词块的碎片化程度施加惩罚，惩罚非连续的词对齐
5. **最终分数**：Score = F_mean × (1 - Penalty)

## 重要性（在 LLM 评测中）

METEOR 在早期机器翻译系统评测（WMT 评测）中与 BLEU 并列作为官方指标，其与人类判断的相关性普遍优于 BLEU，尤其在句子级评测中表现更稳健。

对于 LLM 评测，METEOR 的同义词匹配能力使其在词汇多样性高的生成任务中更公平；其偏向召回率的设计也更适合评测内容覆盖完整性。在翻译、摘要等任务的多指标报告中，METEOR 仍是常见选项。

## 主要方法/实现

**METEOR 1.5**：引入释义匹配（paraphrase matching），进一步扩展对齐范围。

**多语言扩展**：官方支持英语、德语、法语、西班牙语等，通过替换语言资源（词干器、同义词词典）适配不同语言；中文适配需额外工作。

```python
# 使用 NLTK 计算 METEOR
from nltk.translate.meteor_score import meteor_score
import nltk
nltk.download('wordnet')

reference = "the cat sat on the mat".split()
hypothesis = "a cat is sitting on a mat".split()
score = meteor_score([reference], hypothesis)
```

**与 BLEU 互补**：实践中常同时报告 BLEU 和 METEOR，BLEU 侧重精确率，METEOR 侧重召回率和语义覆盖。

## 局限与挑战

- **语言资源依赖**：同义词匹配依赖 WordNet 等外部资源，对低资源语言支持有限
- **计算复杂度**：词对齐过程比 n-gram 匹配更耗时，大规模评测时效率较低
- **超参数敏感**：词序惩罚系数和 F_mean 权重的设定会影响结果，不同版本分数不可比
- **中文支持弱**：中文缺少成熟的 METEOR 实现，通常需要字符级 BLEU 替代
- **被神经网络指标超越**：BERTScore、COMET 等指标与人类判断相关性更高，METEOR 的使用逐渐减少

## 相关页面

- [[BLEU]] — METEOR 旨在改进的基础指标
- [[ROUGE]] — 摘要评测的类似指标
- [[BERTScore]] — 更先进的语义相似度指标
- [[inter-annotator-agreement]] — 评测指标与人类判断的相关性验证
