---
title: "BERTScore"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# BERTScore

> 利用预训练 BERT 模型的上下文嵌入计算候选文本与参考文本之间语义相似度的评测指标，arxiv: 1904.09675。

## 定义

BERTScore 由 Zhang et al. 于 2019 年提出，核心思想是用 BERT（或其他预训练 Transformer）生成词级上下文向量，再通过贪婪最大匹配（greedy matching）计算候选文本与参考文本之间的相似度，得到精确率（P）、召回率（R）和 F1 三个分数。

计算流程：
1. 将候选文本和参考文本分别输入预训练模型，得到各 token 的上下文嵌入
2. 对候选文本每个 token，找参考文本中余弦相似度最高的 token（精确率方向）
3. 对参考文本每个 token，找候选文本中余弦相似度最高的 token（召回率方向）
4. 分别取平均得到 P 和 R，再计算 F1

可选 IDF 加权：对低信息量词（"的""是"等）降权，提升对内容词的敏感性。

## 重要性（在 LLM 评测中）

BERTScore 代表了从词形匹配到语义匹配的范式转变，是连接传统 n-gram 指标与神经网络评测方法的重要桥梁。相比 BLEU/ROUGE，BERTScore 与人类判断的相关性显著更高，在多项元评测（WMT 翻译评测、TAC 摘要评测）中表现更优。

在 LLM 评测实践中，BERTScore 常作为补充指标，与 ROUGE 联合报告，以平衡词汇覆盖率和语义相似度两个维度。

## 主要方法/实现

**骨干模型选择**：不同 NLP 任务应选择对应语言的合适模型。英文任务常用 `roberta-large`；多语言任务用 `xlm-roberta-large`；中文可使用 `bert-base-chinese`。

**rescale_with_baseline**：官方提供基线重缩放，将分数调整到 0-1 范围内更直观。

```python
from bert_score import score
P, R, F1 = score(
    cands=["候选文本"],
    refs=["参考文本"],
    lang="zh",
    rescale_with_baseline=True
)
```

**与 ROUGE 结合**：实践中常报告 ROUGE-L 和 BERTScore-F1，分别代表词汇覆盖和语义相似度。

## 局限与挑战

- **计算开销**：需要运行大型预训练模型，比 n-gram 方法慢数十倍，大规模评测时成本显著
- **参考文本依赖**：与 BLEU/ROUGE 同样需要高质量参考文本，无参考评测场景不适用
- **骨干模型偏差**：评测结果受所选骨干模型影响，不同模型间分数不可直接比较
- **事实性盲目**：BERTScore 衡量的是语义相似度而非事实准确性，幻觉内容只要措辞相近仍可得高分
- **细粒度区分度有限**：在高质量 LLM 输出之间，BERTScore 的区分度仍然有限

## 相关页面

- [[BLEU]] — n-gram 精确率指标
- [[ROUGE]] — n-gram 召回率指标
- [[factuality-eval]] — 事实性评测
- [[llm-as-judge]] — 基于 LLM 的语义评测替代方案
