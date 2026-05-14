---
title: "捷径学习（Shortcut Learning）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources:
  - "Geirhos, R., et al. (2020). Shortcut Learning in Deep Neural Networks. Nature Machine Intelligence 2020."
  - "McCoy, T., et al. (2019). Right for the Wrong Reasons: Diagnosing Syntactic Heuristics in Natural Language Inference. ACL 2019."
---

# 捷径学习（Shortcut Learning）

## 定义

**捷径学习（Shortcut Learning）**是指机器学习模型利用训练数据中与标签相关但在真实任务中不具泛化性的**统计捷径**，而非学习任务背后真正的因果机制，来拟合训练集的现象。模型找到了"捷径"，在训练和同分布测试集上表现良好，但在分布转移的数据上性能显著下降。

## 在 NLP 中的典型表现

### 自然语言推理（NLI）
McCoy et al.（2019）在 HANS 数据集中证明，在 SNLI 上取得高分的 BERT 模型会系统性地使用以下错误启发：
- **词汇重叠启发**：假设和前提有大量词汇重叠时，预测为蕴含
- **子序列启发**：假设是前提的子序列时，预测为蕴含
- **命名短语包含**：假设中的名词短语是前提的子集时，预测为蕴含

### 情感分析
模型学到特定词汇（"great"="正面"，"terrible"="负面"）的偏好，而非理解整体语境，在带有反讽或复杂情感表达的样本上失败。

### 视觉问答（VQA）
模型学到"这是什么颜色？→ 答案往往是某几种常见颜色"的统计先验，即使不看图像也能取得较高准确率。

## 为何捷径学习会发生

1. **最小化经验风险原理**：模型的优化目标是最小化训练误差，任何能减少误差的规律都会被利用，无论其是否真正理解任务
2. **训练数据中的系统性偏差**：标注产物、数据收集偏差等导致捷径与标签系统相关
3. **归纳偏置匹配**：某些捷径（如词汇重叠）恰好与模型架构的归纳偏置高度匹配

## 检测方法

- **挑战集**（Challenge Sets）：构造仅靠捷径无法正确回答的样本，如 HANS、PAWS
- **分布外评测**（OOD evaluation）：在不含训练集偏差的新数据上评测
- **消融分析**：移除已知的捷径特征，观察性能下降程度
- **最简基线测试**：用仅利用捷径的简单模型作为基线，若差距小则说明捷径学习严重

## 对 LLM 评测的影响

对于大型语言模型，捷径学习问题更为复杂：
- **规模缓解**：更大的模型倾向于学习更多样化的特征，减少对单一捷径的依赖
- **上下文依赖**：LLM 可能对不同的提示格式展示截然不同的行为，部分行为来自提示中的捷径
- **评测公平性**：若基准中存在系统性捷径，高分模型的真实能力仍可能被高估

## 相关概念

- [[annotation-artifacts]]：标注产物是捷径的重要来源
- [[distributional-shift]]：捷径在分布转移下失效
- [[out-of-distribution-generalization]]：克服捷径的终极目标
- [[benchmark-gaming]]：故意利用捷径的极端形式
