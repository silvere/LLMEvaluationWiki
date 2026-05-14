---
title: "BLEU 分数"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# BLEU 分数

> 基于 n-gram 精确率的机器翻译自动评测指标，通过比较机器译文与参考译文的 n-gram 重叠率来量化翻译质量。

## 定义

BLEU（Bilingual Evaluation Understudy）由 Papineni et al. 于 2002 年提出，是机器翻译领域最广泛使用的自动评测指标。其核心思想是：高质量译文应与人工参考译文共享大量 n-gram（连续词序列）。

BLEU 分数计算步骤：
1. 计算候选译文与参考译文的 1-gram 至 4-gram 修正精确率（Clipped Precision）
2. 对四个精确率取加权几何平均（通常等权重）
3. 乘以简短惩罚因子（Brevity Penalty），防止模型通过生成极短译文获得虚假高分

最终分数范围为 0 到 1（常乘以 100 表示为百分比），越高表示与参考译文越相似。

## 重要性（在 LLM 评测中）

BLEU 在 LLM 评测中的重要性体现在两个层面：一是历史基准层面，大量早期 NLP 论文和翻译系统使用 BLEU 作为主要指标，理解 BLEU 是读懂文献的前提；二是局限性认知层面，BLEU 的诸多缺陷推动了 BERTScore、COMET 等更先进指标的诞生，理解 BLEU 的局限有助于选择合适的评测工具。

在对比不同 LLM 翻译能力时，BLEU 仍被用于快速粗筛，但很少作为唯一决策依据。

## 主要方法/实现

**标准 BLEU**：sacrebleu 库提供标准化实现，避免不同预处理方式导致分数不可比。

**多参考 BLEU**：允许与多个参考译文比较，取每个 n-gram 在所有参考中的最大匹配数，提升评测稳健性。

**句子级 vs 语料库级**：原始 BLEU 设计用于语料库级评测，句子级 BLEU 方差较大，通常需要加平滑（smoothing）。

```python
# 使用 sacrebleu 计算
import sacrebleu
refs = [["参考译文一"], ["参考译文二"]]
hyp = ["候选译文"]
bleu = sacrebleu.corpus_bleu(hyp, refs)
```

## 局限与挑战

- **语义盲目性**：只匹配词形，无法识别同义词替换（"汽车"≠"轿车"），语义相近但措辞不同的好译文得分偏低
- **词序敏感性不足**：修正精确率对词序变化不敏感，结构混乱的译文仍可能获得较高分
- **参考译文依赖**：分数严重依赖参考译文风格，单一参考时尤为明显
- **与人类判断相关性有限**：多项研究发现 BLEU 与人类偏好的相关性在句子级约为 0.3-0.5，远低于 COMET 等神经网络指标
- **不可跨语言/领域比较**：不同语言对或领域的 BLEU 分数不具可比性

## 相关页面

- [[ROUGE]] — 摘要评测的类似 n-gram 指标
- [[BERTScore]] — 语义化替代方案
- [[METEOR]] — 结合词干/同义词的改进指标
- [[benchmark-validity]] — 评测指标效度问题
