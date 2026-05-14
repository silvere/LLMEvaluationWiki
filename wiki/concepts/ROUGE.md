---
title: "ROUGE 指标"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# ROUGE 指标

> 面向摘要任务的自动评测指标族，通过计算机器摘要与参考摘要的 n-gram 或最长公共子序列召回率来量化摘要质量。

## 定义

ROUGE（Recall-Oriented Understudy for Gisting Evaluation）由 Lin 于 2004 年提出，是自动摘要评测的标准指标。与 BLEU 侧重精确率不同，ROUGE 以召回率为导向，衡量参考摘要中有多少内容被机器摘要覆盖。

主要变体：
- **ROUGE-N**：n-gram 召回率，ROUGE-1（unigram）和 ROUGE-2（bigram）最常用
- **ROUGE-L**：基于最长公共子序列（LCS），不要求连续匹配，对词序更宽容
- **ROUGE-S**：基于跳跃二元组（skip-bigrams），允许词间存在间隔
- **ROUGE-W**：加权最长公共子序列，对连续匹配给予更高权重

实践中通常同时报告 ROUGE-1、ROUGE-2 和 ROUGE-L 的 F1 值（兼顾精确率与召回率）。

## 重要性（在 LLM 评测中）

ROUGE 是评测 LLM 摘要能力的基准指标，在学术论文中广泛用于对比不同模型（如 GPT-4、Claude、Llama 等）的摘要质量。CNN/DailyMail、XSum 等摘要基准的排行榜均以 ROUGE 为主要指标。

评测 LLM 时，ROUGE-1/ROUGE-2 适合评测内容覆盖率，ROUGE-L 适合评测流畅性和结构相似性。但随着 LLM 生成质量提升，ROUGE 分数的区分度正在下降，促使研究者转向 BERTScore 或 GPT-based 评测。

## 主要方法/实现

**标准实现**：`rouge-score` Python 库提供官方实现；`datasets` 库中也有集成版本。

**多参考 ROUGE**：对多个参考摘要分别计算后取最大值，常见于 CNN/DailyMail 数据集评测。

**中文 ROUGE**：需先进行分词处理（jieba/pkuseg），否则字符级 ROUGE-1 实际上是字符召回率。

```python
from rouge_score import rouge_scorer
scorer = rouge_scorer.RougeScorer(['rouge1', 'rouge2', 'rougeL'])
scores = scorer.score("参考摘要文本", "生成摘要文本")
```

## 局限与挑战

- **召回率偏向**：倾向于奖励包含大量参考词汇但冗长啰嗦的摘要
- **语义盲目性**：与 BLEU 同样无法识别同义词，语义相近但措辞不同的优质摘要得分偏低
- **参考译文瓶颈**：依赖高质量参考摘要；抽象式摘要（abstractive）与参考的词汇重叠天然低于抽取式摘要
- **与人类判断相关性有限**：特别是对于 LLM 生成的高质量摘要，ROUGE 往往无法区分细微的质量差异
- **长度敏感性**：摘要长度变化会系统性影响 ROUGE 分数，跨系统比较时需控制长度

## 相关页面

- [[BLEU]] — 翻译评测的精确率导向指标
- [[BERTScore]] — 语义化评测替代方案
- [[factuality-eval]] — 事实性评测（ROUGE 无法检测幻觉）
- [[automated-eval-vs-human]] — 自动评测与人工评测对比
