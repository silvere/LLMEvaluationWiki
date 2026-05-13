---
title: "Goodhart's Law 在评测中的体现"
type: synthesis
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: ["[[2026-04-llm-eval-landscape]]"]
---

# Goodhart's Law 在评测中的体现

> 当基准分数成为优化目标，它就不再反映真实能力——这是 LLM 评测生态当前面临的核心困境。

## 核心问题

Goodhart's Law 原始表述是："当一个指标成为目标，它就不再是好指标。"这一规律在 LLM 评测中以多种形态反复出现。最直接的体现是基准分数与用户真实偏好的分离：benchmark 上表现更优的 Model A，在实际用户偏好中只有 38% 的选择率，而 62% 的用户反而偏好 benchmark 分数更低的 Model B。分数高与效果好之间的脱节，是 Goodhart 效应的典型征兆。

这一困境已经引发了业内公开的信任危机。Andrej Karpathy 在 2025 年 3 月明确表示："存在评测危机。我真的不知道现在该看哪些指标。"来自 Chatbot Arena 排行榜的数据也反映出同样的趋势：第 1 名和第 10 名模型的 Elo 差距从 2023 年的 11.9% 压缩到 2025 年的 5.4%。这种压缩一方面反映了模型能力的整体提升，另一方面也说明当前的排名指标越来越难以区分真实的能力差距。

数据污染本质上是 Goodhart 效应的一种表现形式：当模型的训练目标包含（或泄漏）测试集时，测试集就从衡量能力的工具变成了被优化的目标，从而失去测量意义（见 [[data-contamination]]）。而基准饱和（见 [[benchmark-saturation]]）则是 Goodhart 效应的终态——当所有顶级模型都被迫优化同一批基准，分数区间收窄直至失去判别力。

## 代表性研究

**Model A vs. Model B 用户偏好研究**（年份待核实）— benchmark 更优的 Model A 在实际用户偏好中仅获 38% 选择率

**Karpathy 2025 年 3 月评论**（2025）— "存在评测危机。我真的不知道现在该看哪些指标。"提供业内人士对评测失效的直接声明

**Chatbot Arena Elo 差距分析**（持续更新）— 第 1 名与第 10 名 Elo 差距从 2023 年 11.9% 缩小至 2025 年 5.4%

## 对 Wiki 维护的启示

- 本 Wiki 在引用排行榜数据时应同时记录评测日期和当时的竞争密度，历史 Elo 差距数据随时间失去可比性。
- 新基准页面应设计"反 Goodhart 观察"字段，记录该基准是否已出现分数与真实能力脱节的迹象。

## 相关页面

- [[data-contamination]]（污染是 Goodhart 效应的直接机制）
- [[benchmark-saturation]]（饱和是 Goodhart 效应的终态）
- [[dynamic-benchmarks]]（动态基准是抵抗 Goodhart 效应的主要策略）
- [[llm-as-judge-bias]]（评判偏差加剧指标失效）
