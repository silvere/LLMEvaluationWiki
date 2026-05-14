---
title: "标注产物（Annotation Artifacts）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources:
  - "Gururangan, S., et al. (2018). Annotation Artifacts in Natural Language Inference Data. NAACL 2018."
  - "Poliak, A., et al. (2018). Hypothesis Only Baselines in Natural Language Inference. *SEM 2018."
---

# 标注产物（Annotation Artifacts）

## 定义

**标注产物（Annotation Artifacts）**是指在数据集标注过程中，标注者无意中引入的系统性规律或语言模式，这些模式与标签高度相关，使得模型可以仅利用这些捷径（而非真正理解任务）来答对题目。

## 经典案例：NLI 数据集

Gururangan et al.（2018）和 Poliak et al.（2018）通过著名的**仅假设基线（hypothesis-only baseline）**实验，揭示了 SNLI 和 MultiNLI 中广泛存在的标注产物：

仅给模型看**假设（hypothesis）**，不提供前提（premise），模型即可达到远超随机基线的准确率：
- SNLI 上仅假设基线准确率：~67%（随机为 33%）
- MultiNLI 上：约 53-67%

这意味着标注者在撰写假设时留下了系统性规律：
- **蕴含类假设**：通常是对前提的释义，倾向于更短、更直接的句子
- **矛盾类假设**：常包含否定词（"not"、"no"、"never"）
- **中立类假设**：通常引入新话题，包含额外细节

## 产生原因

标注产物的产生通常源于标注者的写作习惯和认知策略：

1. **写作捷径**：标注者为了快速完成任务，形成了规律性的写作模式
2. **语言直觉**：不同类别的句子在语言特征上本就有一定倾向（如矛盾句更需要显式否定）
3. **众包环境**：大规模众包标注中，标注者之间的个体差异被平均掉，共同偏好被放大
4. **任务定义影响**：任务说明本身可能隐含了特定的写作规范

## 影响范围

标注产物不仅存在于 NLI 数据集，在多种 NLP 任务中均有发现：

| 任务 | 产物类型 |
|------|---------|
| 自然语言推理（NLI） | 否定词、句子长度、词汇与前提重叠 |
| 阅读理解（QA） | 问题词与文章中特定段落的词汇匹配 |
| 事实核查 | 主语实体的先验真假倾向 |
| 情感分析 | 特定词汇的情感极性倾向 |

## 检测方法

- **消融基线**：移除部分输入（如仅看假设），测试性能下降幅度
- **对比集（Contrast Sets）**：对测试样本进行最小化扰动，检测模型鲁棒性
- **特征重要性分析**：通过 LIME、SHAP 等方法分析模型最依赖的特征

## 对评测的影响

标注产物的存在意味着：
- 在含有大量产物的数据集上取得高分，不代表模型真正掌握了任务能力
- 模型的"成功"可能建立在**捷径学习（shortcut learning）**而非真正泛化
- 需要使用经过产物清理或设计避免产物的数据集进行评测

## 相关概念

- [[shortcut-learning]]：模型利用标注产物进行推断
- [[distributional-shift]]：产物在分布转移下失效
- [[out-of-distribution-generalization]]：在无产物的新数据上的泛化
