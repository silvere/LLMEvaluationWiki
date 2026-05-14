---
title: "成员推断攻击（Membership Inference Attack）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 成员推断攻击（Membership Inference Attack）

> 判断特定数据点是否被用于训练目标机器学习模型的攻击方法，可用于评测隐私泄露风险和检测训练集污染。

## 定义

成员推断攻击（Membership Inference Attack，MIA）最初由 Shokri et al. (2017) 提出，目标是：给定一个黑盒或白盒访问的机器学习模型，判断特定输入样本是否存在于该模型的训练数据中。

在 LLM 场景中，MIA 的直觉依据：
- 模型对训练集中的样本通常有更高的预测置信度（更低的损失）
- 过拟合程度越高，训练集成员的损失越低，MIA 越容易
- 现代大型 LLM 存在大量的"记忆"（memorization）现象

主要方法类型：
1. **损失阈值法**：若模型对输入的交叉熵损失低于阈值，判定为成员
2. **影子模型法**：训练多个"影子模型"学习成员/非成员的损失分布差异
3. **Min-K% 概率法**：基于最低概率 token 特征（[[min-k-contamination]]）
4. **Likelihood Ratio Attack（LiRA）**：更精确的对比方法，与同架构参考模型的 likelihood 比较

## 重要性（在 LLM 评测中）

MIA 在 LLM 评测中具有双重意义：

1. **污染检测工具**：作为 [[contamination-detection]] 的方法之一，判断测试集是否在训练数据中
2. **隐私评测**：衡量 LLM 对训练数据的隐私保护程度，个人数据是否被可识别地记忆
3. **记忆化分析**：研究模型规模与记忆程度的关系，为防止训练数据泄露提供量化依据
4. **合规评估**：GDPR 等隐私法规要求防止个人数据被不当记忆，MIA 提供量化风险评估

## 主要方法/实现

**简单损失阈值**：
```python
def mia_loss_threshold(model, tokenizer, text, threshold=-2.0):
    """对数损失低于阈值则判定为成员"""
    inputs = tokenizer(text, return_tensors="pt")
    with torch.no_grad():
        loss = model(**inputs, labels=inputs["input_ids"]).loss
    return (-loss.item() > threshold)  # 对数概率高于阈值则为成员
```

**LiRA（Likelihood Ratio Attack）**：
```python
# 比较目标模型与参考模型的 log-likelihood 比值
def lira_score(target_model, ref_model, text):
    ll_target = -get_loss(target_model, text)
    ll_ref = -get_loss(ref_model, text)
    return ll_target - ll_ref  # 差值越大，越可能是训练成员
```

**评测指标**：MIA 攻击的成功率用 ROC-AUC 评估，随机猜测对应 AUC = 0.5，AUC 越高说明模型对训练数据的记忆越严重。

## 局限与挑战

- **大模型的低 MIA 成功率**：现代 LLM 在极大数据量上训练，记忆程度相对降低，MIA 成功率通常接近随机
- **需要参考模型**：LiRA 等强方法需要访问同架构的参考模型，实践中不总可用
- **成员定义模糊**：若训练数据有重复，同一文本出现多次，"成员"的定义需明确
- **数据分布偏移**：训练数据和测试数据来自不同分布时，分布差异可能被误判为成员差异
- **只能检测记忆，不能证明无污染**：MIA 失败不能排除软污染（同类型数据见过但未逐字记忆）

## 相关页面

- [[contamination-detection]] — 污染检测综述
- [[min-k-contamination]] — MIA 的特定变体方法
- [[n-gram-contamination]] — 文本匹配互补方法
- [[benchmark-contamination]] — 评测集污染的整体问题
- [[perplexity]] — MIA 方法中使用的困惑度概念
