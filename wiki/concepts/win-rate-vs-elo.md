---
title: "胜率与 Elo 分数"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources:
  - "Chiang, W.L., et al. (2024). Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference. ICML 2024."
  - "Elo, A.E. (1978). The Rating of Chessplayers, Past and Present."
---

# 胜率与 Elo 分数

## 概念定义

在 LLM 偏好评测（尤其是 Chatbot Arena）中，**胜率（Win Rate）**和 **Elo 分数**是两种常用的模型排名指标，二者均基于成对比较（pairwise comparison）数据，但计算方法和适用场景有所不同。

## 胜率（Win Rate）

**胜率**是最直观的成对评测指标，定义为在与其他模型的所有比较中，该模型被评判者偏好的比例：

$$\text{Win Rate} = \frac{\text{胜利次数} + 0.5 \times \text{平局次数}}{\text{总比较次数}}$$

- **优点**：计算简单、直观易懂，不依赖任何统计假设
- **缺点**：高度依赖比较对手的强弱（若大量对手为弱模型，胜率虚高）；当不同模型间的比较次数不均衡时，无法直接比较不同模型的胜率

## Elo 分数

**Elo 评分系统**源自国际象棋排名，核心思想是将每次比较结果用于更新参赛者的分数，同时考虑对手的当前强度。在 LLM 评测中：

$$E_A = \frac{1}{1 + 10^{(R_B - R_A)/400}}$$

其中 $E_A$ 是模型 A 在与模型 B 对比时的预期胜率，$R_A$、$R_B$ 是当前 Elo 分数。

每次比较后，分数按以下方式更新：
$$R_A' = R_A + K(S_A - E_A)$$

其中 $K$ 为更新步长（K-factor），$S_A$ 为实际结果（1=胜，0.5=平，0=负）。

- **优点**：通过迭代更新校正了对手强度的影响，可处理非均衡的比较分布
- **缺点**：结果受 K 值选取、初始分数设定和比较顺序影响；需要较多比较次数才能稳定收敛

## Chatbot Arena 中的应用

Chatbot Arena 同时报告胜率和 Elo 分数，但以 **Bradley-Terry 模型**（Elo 的广义化版本）拟合数据，通过最大似然估计计算每个模型的"强度参数"，而非直接迭代更新。

在实践中，二者的差异体现在：
- **模型覆盖差异**：若某模型主要与弱模型比较，其胜率会虚高，但 Elo 会通过弱对手强度折扣进行修正
- **新模型加入**：Elo 系统的历史数据会影响新模型的收敛速度；Arena 定期重新计算所有历史数据的 Elo 以保证一致性
- **解读差异**：胜率为绝对偏好比例，更易于直接解读；Elo 为相对强度排名，适合建立完整的排序

## 实践建议

| 场景 | 推荐指标 |
|------|---------|
| 快速比较少量模型 | 胜率 |
| 大量模型的全局排名 | Elo |
| 需解释给非技术受众 | 胜率 |
| 样本量不均衡时 | Elo |
