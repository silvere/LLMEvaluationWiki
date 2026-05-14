---
title: "Trends in Machine Learning Hardware and Computing"
type: source
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
source_type: report
url: "https://epochai.org/blog/trends-in-machine-learning-hardware-and-computing"
arxiv_id: ""
authors: ["Epoch AI", "Pablo Villalobos", "Jaime Sevilla", "Anson Ho", "Tamay Besiroglu", "Lennart Heim", "Marius Hobbhahn"]
published: "2023-01-01"
ingested: "2026-05-14"
license: "Epoch AI Research"
discusses: ["[[scaling-laws|计算趋势]]", "[[scaling-laws|扩展定律]]", "[[scaling-laws|训练成本]]", "[[scaling-laws|算力增长]]"]
sources:
  - "https://epochai.org/blog/trends-in-machine-learning-hardware-and-computing"
---

# Trends in Machine Learning Hardware and Computing

> Epoch AI 系统分析 AI 训练计算量的历史增长趋势，发现从 2010 年代起训练算力约每 6 个月翻倍，并量化了现代大型模型的训练成本和算力需求变化。

## 核心主张
- [CLAIM]: 从 2010 年代中期到 2022 年，前沿 AI 模型的训练计算量约每 6 个月翻倍（历史上早期约每 2 年翻倍，与摩尔定律接近，后期加速明显）。
- [CLAIM]: 大型语言模型的训练计算成本从 GPT-2（2019，约$4万）到 GPT-3（2020，约$460万）到 GPT-4 估计（2023，约$1亿+），呈指数增长趋势。
- [CLAIM]: 算法效率的提升（相同性能所需计算量减少）与算力增长共同驱动模型能力提升，Epoch AI 估计算法效率每年提升约 2-3 倍（基于特定任务）。
- [CLAIM]: 当前训练计算增长速度超过推理计算降价速度，导致模型训练与部署的成本不对称性持续扩大。

## 方法论摘要

Epoch AI 维护 ML 训练 run 数据库（基于公开论文和报告），记录每次重要训练 run 的 FLOP 数量（通过参数量、数据量和计算效率估算）。时间序列分析拟合增长曲线，区分"前 AlexNet 时代"、"深度学习时代"和"大型语言模型时代"三个阶段。

## 数据与结果

- 2010-2022 年前沿模型算力增长速率：约 4-5 个月翻倍
- GPT-3 训练估计 FLOP：约 3×10²³
- PaLM（540B）训练估计 FLOP：约 2.5×10²⁴
- Chinchilla（70B）训练 FLOP：约 5.8×10²³
- 算力增长 vs. 摩尔定律：超过摩尔定律约 2-3 倍（依时段）
- 注：具体数字依估算方法和数据来源有一定不确定性

## 局限与争议

- 训练 FLOP 数量依赖论文报告或估算，闭源模型数据不确定性大。
- "算法效率"的测量依赖特定基准（如 ImageNet），在 LLM 上的类比存在局限。
- 增长趋势的外推需假设基础设施投资持续，宏观经济变化可能打断趋势。
- Epoch AI 的部分估算与其他来源（Amodei 等）存在差异。

## 相关 wiki 页

- [[scaling-laws|计算趋势]]
- [[scaling-laws|扩展定律]]
- [[scaling-laws|训练成本]]
- [[benchmark-design|Chinchilla定律]]
- [[scaling-laws|GPU算力]]
