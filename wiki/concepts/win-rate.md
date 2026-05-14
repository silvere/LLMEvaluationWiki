---
title: "胜率（Win Rate）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 胜率（Win Rate）

> 在成对比较评测中，模型 A 的回答被评判优于模型 B 的比例，是 Chatbot Arena 和 LLM-as-judge 评测体系的核心指标。

## 定义

胜率（Win Rate）量化了在 A vs B 的直接比较中，A 胜出的频率：

$$\text{WinRate}(A, B) = \frac{\text{A 胜出次数}}{\text{总比较次数（排除平局）}}$$

变体形式：
- **含平局版本**：Win Rate = (A 胜 + 0.5 × 平局) / 总次数
- **净胜率**（Net Win Rate）：Win% - Loss%
- **调整胜率**：控制 position bias 的 debiased win rate

胜率本质上是将质量评估从绝对评分（Likert）转化为相对偏好排序，绕过了标注者对绝对分数标定不一致的问题。

## 重要性（在 LLM 评测中）

胜率是当前 LLM 能力评测最重要的指标之一：

1. **Chatbot Arena 的基础**：LMSYS 的 Chatbot Arena 通过用户真实成对投票计算胜率，再转换为 ELO 评分，被认为是目前最贴近用户偏好的 LLM 排行榜
2. **LLM-as-judge 标准输出**：AlpacaEval、MT-Bench 等使用 GPT-4 作为裁判计算胜率，以 GPT-4 为基准线（50%）
3. **对齐目标直接衡量**：RLHF/DPO 优化的最终目标就是提升用户偏好胜率
4. **避免绝对分数校准问题**：不需要标注者对质量的绝对判断，只需相对偏好

## 主要方法/实现

**AlpacaEval 实现**：
```python
# 模型回答 A vs GPT-4 基准回答，用 GPT-4 裁判
# 计算 A 胜出比例作为主要指标
win_rate = sum(1 for result in judgments if result == "A") / len(judgments)
```

**ELO 转换**：当有多模型两两比较时，通过 ELO 评分系统将成对胜率转化为全局排名（见 [[elo-rating]]）。

**Bootstrap 置信区间**：对胜率估计值计算 95% CI，通常需要 ≥ 200 个成对比较才能得到稳定估计。

**Debiased Win Rate**：交换 A/B 显示顺序后重新评测，取两次结果的平均，消除 position bias 影响：
```
debiased_win_rate = (WR_A_first + (1 - WR_B_first)) / 2
```

## 局限与挑战

- **传递性假设**：胜率隐含 A>B, B>C → A>C 的传递性，但用户偏好不总是传递的（非传递性偏好）
- **裁判一致性**：LLM-as-judge 的胜率受裁判偏差影响大（verbosity bias、self-enhancement bias）
- **任务分布敏感**：胜率高度依赖对比任务的分布，不同 prompt 集合的胜率结果可能不同
- **平局处理争议**：不同研究对平局的处理方式不一致，影响跨研究比较
- **绝对质量不可见**：若 A 和 B 都是低质量回答，胜率仍会给出"赢家"，无法识别全面失败场景

## 相关页面

- [[elo-rating]] — 基于胜率的 ELO 评分系统
- [[preference-eval]] — 偏好评测综述
- [[llm-as-judge]] — LLM 裁判计算胜率的方法
- [[position-bias]] — 影响胜率的位置偏差
- [[verbosity-bias]] — 影响胜率的冗长偏差
