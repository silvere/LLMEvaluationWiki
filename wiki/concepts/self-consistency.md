---
title: "自一致性（Self-Consistency）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 自一致性（Self-Consistency）

> 通过对同一问题进行多次独立采样生成多条推理路径，再取多数答案来提升 LLM 推理准确率的解码策略，Wang et al. 2022 年提出，arxiv: 2203.11171。

## 定义

自一致性（Self-Consistency）是对思维链提示的重要改进。核心思路：对复杂推理问题，正确答案通常可以通过多种不同的推理路径得出，而错误答案的路径各有不同；因此，多次采样后多数路径指向的答案更可能正确。

**流程**：
1. 用思维链提示对同一问题进行 k 次独立采样（高温度，如 0.7-1.0）
2. 每次采样得到一条完整的推理链和最终答案
3. 对最终答案进行多数投票（Majority Voting）
4. 多数答案作为最终预测

与简单的 greedy decoding 或 Pass@k 不同，自一致性不是选择任意一条路径，而是利用路径间的"一致性"作为质量信号。

## 重要性（在 LLM 评测中）

自一致性在 LLM 评测中的意义是双重的：

1. **性能上限评测**：自一致性（等价于 Oracle@k）代表了模型在给定 k 次机会时的性能上限，揭示模型"知道但不总能说对"的能力边界
2. **推理能力评测工具**：通过比较 SC 与 greedy 的差距，可以评估模型推理的随机性和不一致性
3. **评测成本权衡**：SC 需要 k 倍推理成本，评测时需说明使用了 SC 及 k 值，否则不同论文的结果不可比
4. **一致性作为质量代理指标**：推理路径一致性高的模型往往在更难的任务上也表现更好

## 主要方法/实现

**标准实现**：
```python
from collections import Counter

def self_consistency(model, prompt, k=40, temperature=0.7):
    answers = []
    for _ in range(k):
        output = model.generate(prompt, temperature=temperature)
        answer = extract_answer(output)  # 从推理链中提取最终答案
        answers.append(answer)
    # 多数投票
    most_common = Counter(answers).most_common(1)[0][0]
    return most_common
```

**答案聚合方式**：
- 精确字符串匹配（适合数学计算）
- 语义聚类后投票（适合开放式答案）
- LLM 辅助聚合（适合复杂格式答案）

**SC 在 GSM8K 上的效果**：greedy 约 56%（GPT-3 175B），SC (k=40) 约 74%，提升显著。

## 局限与挑战

- **推理成本**：k 倍计算成本，大规模评测时不实际
- **系统性错误不被修正**：若模型对某类问题总是以相同错误方式推理，多数投票无法纠正
- **答案空间不离散时失效**：对开放式生成任务，多数投票无法直接应用
- **与参考答案格式依赖**：答案提取的质量影响最终投票结果
- **代替不了真实理解**：高自一致性不等于模型真正理解了问题，可能只是多条路径共享同一系统性偏差

## 相关页面

- [[chain-of-thought-eval]] — 自一致性基于思维链的评测方法
- [[pass-at-k]] — 代码评测中的类似多次采样策略
- [[capability-elicitation]] — 通过自一致性提升能力展示
- [[in-context-learning]] — 自一致性通常结合 few-shot 使用
