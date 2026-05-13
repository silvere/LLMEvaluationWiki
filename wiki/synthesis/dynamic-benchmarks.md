---
title: "动态 Benchmark 的兴起"
type: synthesis
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-13"
last_verified: "2026-05-13"
sources: ["[[2026-04-llm-eval-landscape]]"]
---

# 动态 Benchmark 的兴起

> 以持续更新题库来对抗污染和饱和，是当前评测领域最活跃的方法论演进方向。

## 核心问题

静态基准的根本缺陷——数据污染与快速饱和——催生了动态基准这一应对范式。动态基准的核心思路是：不固定测试集，而是持续引入新题，使模型无法通过记忆历史数据获得优势。这一策略在多个维度上取得了进展，但也带来了新的挑战。

LiveBench 是动态基准的代表性实现。它每月从最新数学竞赛、arXiv 论文、新闻等来源采集新问题，顶级模型在其上的分数很少超过 65%——这说明题目难度保持了有效的鉴别力。LiveBench 与 Chatbot Arena 排名的相关性在 0.88–0.91 之间，表明其与人类偏好判断有较强的对齐。LiveCodeBench 采用类似策略，持续从 LeetCode、AtCoder、Codeforces 收集新竞赛题目，为代码能力评测维持一个动态的题库。

在难度设计上，Humanity's Last Exam 代表了另一种思路：收录 2,500 道专家级题目，并动态移除已被模型答对的题目，以保持持续的鉴别力。这种"自适应清洗"机制使基准难度随模型能力提升而自动收紧。DyKnow 框架则聚焦知识时效性评测，其 ground truth 从 Wikidata 实时拉取，并为每道题标注 validity period，是将动态性与时效性结合的系统性尝试。

动态基准的代价是显而易见的：需要持续的人力资源投入来保证题目质量，跨时间段的分数不具备直接可比性，且题目难度校准随更新批次可能漂移。

## 代表性研究

**LiveBench**（持续更新）— 每月从数学竞赛、arXiv、新闻采集新题；顶级模型分数很少超过 65%；与 Chatbot Arena 排名相关性 0.88–0.91

**LiveCodeBench**（持续更新）— 持续从 LeetCode、AtCoder、Codeforces 收集新竞赛题，动态维护代码能力评测题库

**Humanity's Last Exam**（年份待核实）— 2,500 道专家级题目，动态移除被答对的题目以维持鉴别力

**DyKnow 框架**（年份待核实）— ground truth 从 Wikidata 实时拉取，标注 validity period，系统性处理知识时效性评测

## 对 Wiki 维护的启示

- 动态基准的评测数据引用必须注明具体月份快照，因为每次更新后历史分数与新分数不具直接可比性。
- 动态基准本身也有 `as_of_date` 风险：题目更新频率、来源质量和难度漂移都需要定期核查。

## 相关页面

- [[data-contamination]]（动态基准的核心驱动力）
- [[benchmark-saturation]]（动态基准对抗饱和的主要机制）
- [[goodharts-law-in-eval]]（动态更新是抵抗 Goodhart 效应的策略，但非完全解药）
