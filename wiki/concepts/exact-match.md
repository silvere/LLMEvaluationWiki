---
title: "精确匹配率（Exact Match）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 精确匹配率（Exact Match）

> 要求模型预测与参考答案完全一致（字符串相等）的评测指标，是最严格也最客观的问答类任务评测方式。

## 定义

精确匹配（Exact Match，EM）是最简单直接的自动评测指标：预测答案与参考答案完全相同则得 1 分，否则得 0 分。在问答数据集（如 SQuAD、TriviaQA）中，通常在比较前进行标准化处理：小写转换、去除冠词（a/an/the）、去除标点、压缩空格。

$$\text{EM} = \frac{1}{N} \sum_{i=1}^{N} \mathbf{1}[\text{normalize}(\hat{y}_i) = \text{normalize}(y_i)]$$

对于有多个参考答案的数据集（如 SQuAD 提供多个人工标注答案），预测与任意一个参考匹配即得分。

## 重要性（在 LLM 评测中）

EM 在 LLM 评测中有独特价值：

1. **客观性无可置疑**：无需判断标准，无偏差，完全可复现，是评测结果可信度的基准
2. **多项选择/填空基准的核心**：MMLU、ARC、HellaSwag 等广泛使用的基准本质上都是 EM 变体——答案是固定选项（A/B/C/D）
3. **阅读理解基准标准**：SQuAD 系列、Natural Questions 等均以 EM 为主指标
4. **污染检测辅助**：当模型在 EM 上表现异常高时，可能是训练集污染的信号

## 主要方法/实现

**SQuAD 风格标准化**：
```python
import re, string

def normalize_answer(s):
    s = s.lower()
    s = re.sub(r'\b(a|an|the)\b', ' ', s)
    s = ''.join(ch for ch in s if ch not in string.punctuation)
    return ' '.join(s.split())

def exact_match(prediction, ground_truth):
    return normalize_answer(prediction) == normalize_answer(ground_truth)
```

**多项选择提取**：LLM 输出可能包含冗余解释，需先从输出中提取选项字母（正则或 LLM-based 提取），再与正确选项比较。

**EM vs F1 联合报告**：SQuAD 同时报告 EM 和 Token-level F1，EM 衡量完全正确率，F1 衡量部分匹配程度，两者互补。

## 局限与挑战

- **过度严格**："北京"与"北京市"语义相同但 EM 得 0，对开放式生成任务不公平
- **表达多样性惩罚**：正确但措辞不同的答案（同义词、不同时态）被错误判为失败
- **不适用开放式生成**：摘要、翻译、创意写作等任务答案不唯一，EM 完全不适用
- **标准化依赖**：不同的标准化规则会导致分数差异，跨研究比较需注意预处理一致性
- **多项选择的格式依赖**：LLM 有时输出格式不符合预期（如"选项A"而非"A"），需要鲁棒的答案提取

## 相关页面

- [[F1-score]] — 更宽松的部分匹配指标
- [[pass-at-k]] — 代码评测中的类似严格判定
- [[benchmark-design]] — 选择合适评测粒度的设计原则
- [[prompt-sensitivity]] — 提示格式变化对 EM 结果的影响
