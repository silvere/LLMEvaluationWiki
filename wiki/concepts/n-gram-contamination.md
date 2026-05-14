---
title: "n-gram 重叠污染检测"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# n-gram 重叠污染检测

> 通过计算测试集文本与训练数据之间的 n-gram 字符串匹配程度来检测训练数据污染的方法，是最直接的白盒污染检测技术。

## 定义

n-gram 重叠污染检测基于直觉：若某测试题的文字内容出现在训练数据中，则可以通过查找相同或高度相似的 n-gram（连续字符序列）来发现污染。

**常用形式**：
- **固定 n-gram 匹配**：检测长度为 n 的连续 token 序列是否在训练数据中出现（如 n=13）
- **最长公共子串**：计算测试题与最接近训练文档的最长公共子串长度
- **ROUGE-L 相似度**：用 ROUGE-L 衡量测试题与训练数据中最相似文档的相似度
- **滑动窗口搜索**：在训练数据中搜索包含测试题特定片段的文档

GPT-4 技术报告使用 13-gram 匹配检测测试集污染；Llama 2 报告使用 8-gram 重叠率。

## 重要性（在 LLM 评测中）

n-gram 污染检测是评测报告的标准组成部分：

1. **行业基本规范**：主流 LLM 技术报告（GPT-4、Llama 2、PaLM 2）均包含 n-gram 污染分析
2. **直接可解释**：发现完全匹配的 n-gram 是最直观的污染证据，便于向非技术受众说明
3. **离线可扩展**：可以在训练数据上预构建索引（倒排索引/后缀数组），实现快速查询
4. **基准设计参考**：新基准发布时需对已知的预训练语料库进行污染扫描

## 主要方法/实现

**基于字符串搜索**：
```python
def check_ngram_contamination(test_text, train_corpus, n=13):
    """检查测试文本的 n-gram 是否出现在训练语料中"""
    test_tokens = test_text.lower().split()
    
    if len(test_tokens) < n:
        return False
    
    for i in range(len(test_tokens) - n + 1):
        ngram = ' '.join(test_tokens[i:i+n])
        if ngram in train_corpus_index:  # 预构建的倒排索引
            return True
    return False
```

**大规模实践**：
- 使用 Elasticsearch 或 BM25 在训练语料中检索与测试题最相似的文档
- 对训练数据建立基于 MinHash 的局部敏感哈希（LSH）加速近似匹配
- 设定去除阈值：超过 X% token 重叠则标记为"可能污染"

**报告格式**：通常报告"被标记为污染的测试样本比例"以及去除污染样本后的性能变化。

## 局限与挑战

- **阈值主观性**：n 的选择（8 vs 13 vs 20）影响检测结果，行业无统一标准
- **改写污染盲区**：若训练数据对测试题进行了同义词替换或句式改写，n-gram 方法完全失效
- **概念层次污染**：模型可能记忆了同类型题目的解题思路，n-gram 无法检测这种"软污染"
- **计算成本**：对万亿级别训练语料的搜索在工程上非常昂贵
- **误报**：自然语言中常见短语的随机重叠可能产生误报，n 过小时尤为严重

## 相关页面

- [[contamination-detection]] — 污染检测综述
- [[min-k-contamination]] — 基于模型概率的替代检测方法
- [[membership-inference]] — 更通用的成员推断方法
- [[BLEU]] — n-gram 匹配在翻译评测中的应用（同源概念）
- [[benchmark-contamination]] — 污染对评测的整体影响
