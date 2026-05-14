---
title: "Min-K% 概率法"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# Min-K% 概率法

> 通过分析文本中最低概率 token 的统计特征来检测文本是否在 LLM 训练集中的无监督成员推断方法，Shi et al. 2023 年提出，arxiv: 2310.16789。

## 定义

Min-K% 由 Shi et al. (2023) 提出，用于检测预训练语言模型的训练集成员（即该文本是否被模型见过）。核心观察：

- **训练集内文本**：模型对文本中大多数 token 的预测概率较高，但某些"困难" token 的概率仍然较低
- **训练集外文本**：模型对文本整体的预测概率可能都较低，包括最低 k% 的 token

因此，通过计算文本中概率最低的 k% token 的平均对数概率，可以区分成员（member）和非成员（non-member）：

$$\text{Min-K\%}(x) = \frac{1}{|S|} \sum_{i \in S} \log p_\theta(x_i | x_{<i})$$

其中 S 是 token 对数概率中最低 k% 的下标集合。

关键直觉：若文本在训练集中，即使是"困难" token 模型也见过，最低概率 token 不会太低；若文本从未见过，最低概率 token 会非常低。

## 重要性（在 LLM 评测中）

Min-K% 解决了 LLM 训练集不透明背景下的污染检测难题：

1. **黑盒适用性**：只需要模型的 token 概率输出，不需要训练数据访问权限（仅限白盒或灰盒场景）
2. **基准污染检测**：WikiMIA（论文提出的基准）在多个 LLM 上验证了 Min-K% 的检测能力
3. **版权检测应用**：可用于检测特定书籍、论文是否被模型记忆，辅助版权纠纷
4. **训练透明度压力**：提供了可量化的污染检测工具，推动模型开发者进行更完整的数据记录

## 主要方法/实现

**实现步骤**：
```python
import torch

def min_k_percent(model, tokenizer, text, k=20):
    inputs = tokenizer(text, return_tensors="pt")
    with torch.no_grad():
        outputs = model(**inputs, labels=inputs["input_ids"])
    
    # 获取每个 token 的对数概率
    logits = outputs.logits
    log_probs = torch.nn.functional.log_softmax(logits, dim=-1)
    token_log_probs = log_probs[0, :-1].gather(
        1, inputs["input_ids"][0, 1:].unsqueeze(-1)
    ).squeeze()
    
    # 取最低 k% 的平均值
    k_count = max(1, int(len(token_log_probs) * k / 100))
    min_k_probs = torch.topk(token_log_probs, k_count, largest=False).values
    return min_k_probs.mean().item()
```

**阈值设定**：通过已知成员/非成员样本集校准阈值，通常用 ROC-AUC 评估检测器质量。

**WikiMIA 基准**：论文构建的评测集，以 Wikipedia 2023 年后的文章作为非成员，2017 年前的文章作为（可能的）成员。

## 局限与挑战

- **白盒依赖**：需要访问模型的 token 概率，对真正的闭源 API 仅部分适用
- **对记忆程度敏感**：仅检测被高度记忆的文本，低频出现的文本可能误判为非成员
- **时间分布外移**：模型发布后产生的文本天然是非成员，利用时间截点的基准可能过于简单
- **k 超参数选择**：k 的最优值因文本类型和模型不同而变化
- **对抗性规避**：通过轻微改写可以规避 Min-K% 检测，不能检测同义改写污染

## 相关页面

- [[contamination-detection]] — 污染检测方法综述
- [[membership-inference]] — 更广泛的成员推断方法
- [[n-gram-contamination]] — 基于文本匹配的补充检测方法
- [[perplexity]] — Min-K% 基于的困惑度概念
- [[benchmark-contamination]] — 污染对基准的影响
