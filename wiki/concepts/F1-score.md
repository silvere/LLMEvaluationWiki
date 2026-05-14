---
title: "F1 分数"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# F1 分数

> 精确率（Precision）与召回率（Recall）的调和平均数，在 LLM 评测中广泛用于信息抽取、问答和分类任务的质量衡量。

## 定义

F1 分数（F1-Score）是精确率与召回率的调和平均，在两者之间取平衡：

$$F1 = \frac{2 \times \text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}$$

其中：
- **精确率**：预测为正的样本中真正为正的比例（预测质量）
- **召回率**：真正为正的样本中被成功预测的比例（覆盖完整性）

调和平均的特性使得 F1 对极端值更敏感——若精确率为 1、召回率为 0，则 F1 = 0，而算术平均则为 0.5。

在 QA 评测（如 SQuAD）中，F1 通常在 token 级别计算：将预测和参考答案都分词，计算词汇重叠的精确率和召回率。

## 重要性（在 LLM 评测中）

F1 在 LLM 评测中的核心价值是处理"部分正确"的情况：

1. **QA 基准标准指标**：SQuAD、Natural Questions、TriviaQA 均同时报告 EM 和 F1，F1 捕捉部分正确答案
2. **信息抽取评测**：命名实体识别（NER）、关系抽取任务的标准指标，衡量抽取的实体/关系是否完整准确
3. **分类任务**：文本分类（尤其是多类别不均衡场景）使用宏 F1 或加权 F1
4. **平衡过/欠生成**：精确率惩罚冗余输出，召回率惩罚遗漏，F1 鼓励模型精准覆盖目标内容

## 主要方法/实现

**Token-level F1（QA 场景）**：
```python
from collections import Counter

def token_f1(prediction, ground_truth):
    pred_tokens = prediction.lower().split()
    truth_tokens = ground_truth.lower().split()
    common = Counter(pred_tokens) & Counter(truth_tokens)
    num_same = sum(common.values())
    if num_same == 0:
        return 0.0
    precision = num_same / len(pred_tokens)
    recall = num_same / len(truth_tokens)
    return 2 * precision * recall / (precision + recall)
```

**宏 F1 vs 微 F1 vs 加权 F1**：
- 宏 F1：各类别 F1 简单平均，对所有类别平等权重
- 微 F1：对所有样本聚合后计算，受多数类影响大
- 加权 F1：按类别样本数加权，适合不均衡数据集

**F-beta 变体**：`F_β = (1+β²) × P × R / (β²P + R)`，β > 1 偏向召回率，β < 1 偏向精确率。

## 局限与挑战

- **词汇级别的局限**：Token F1 同样无法识别同义词，"汽车"与"轿车"在 F1 中不匹配
- **对标准化敏感**：分词方式、大小写处理会影响结果
- **不适合排序任务**：当输出是排名列表而非集合时，F1 无法直接应用
- **多标签场景复杂**：多标签分类中 F1 的计算方式（样本级/标签级）需明确说明
- **对类别不均衡的误导性**：在极度不均衡数据集中，高 F1 可能掩盖对少数类的忽视

## 相关页面

- [[exact-match]] — 比 F1 更严格的指标
- [[ROUGE]] — 摘要评测中基于 F1 的指标
- [[benchmark-design]] — 选择合适评测指标的原则
- [[significance-testing]] — 判断 F1 差异是否统计显著
