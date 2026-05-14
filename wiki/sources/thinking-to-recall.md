---
title: "Thinking to Recall: How Reasoning Unlocks Parametric Knowledge in LLMs"
type: source
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
source_type: paper
url: "https://arxiv.org/abs/2603.09906"
ingested: "2026-05-14"
sources:
  - "https://arxiv.org/abs/2603.09906"
year: 2026
authors:
  - "Zorik Gekhman"
  - "Roee Aharoni"
  - "Eran Ofek"
  - "Mor Geva"
discusses:
  - "[[chain-of-thought]]"
  - "[[pass-at-k]]"
  - "[[hallucination-taxonomy]]"
  - "[[inference-time-scaling]]"
  - "[[capability-elicitation]]"
---

# Thinking to Recall: How Reasoning Unlocks Parametric Knowledge in LLMs

> 推理（Reasoning）不仅是解题工具，更通过"计算缓冲"和"事实激活"两种机制扩展模型参数化知识的可及边界。

## 核心贡献

- 证明开启推理可**大幅扩展模型参数化知识召回边界**，用 pass@k 曲线量化这一效果：在 Qwen3-32B 上 SimpleQA-Verified 的 pass@k 接近翻倍 [REF: Figure 1]
- 通过受控实验区分并验证两个关键机制：**计算缓冲效应（Computational Buffer Effect）**和**事实激活效应（Factual Priming）** [REF: §5]
- 设计大规模幻觉审计流水线（逐条验证每条推理轨迹中的每个中间事实，使用 Gemini-2.5-Flash 搜索增强验证），发现**推理中的事实幻觉会显著提升最终答案幻觉概率** [REF: §5.3]
- 展示可操作的推断时推理轨迹选择策略：优先选择无幻觉事实的轨迹，可直接提升模型准确率 [REF: §5.4]

## 主要 Claim

- 推理的收益主要来自**更好的参数化召回**而非复杂问题分解：SimpleQA-Verified 中 90%（903/1,000）的问题为单跳，且 Complex 子集与 Simple 子集的推理收益 Ω 在 95% 置信区间上无显著差异 [REF: §4 / Figure 3]
- **计算缓冲效应**实验：用无语义内容的"Let me think."重复填充替换推理轨迹（ON Dummy），在 SimpleQA-Verified 上仍使 pass@1 从 0.206 提升至 0.262，EntityQuestions 从 0.457 提升至 0.554 [REF: §5.1 / Figure 4]
- 计算缓冲效应存在**非单调扩展**：dummy 长度在 2,048 token（2¹¹）附近最优，超过 4,096（2¹²）后性能下降 [REF: §5.1 / Figure 5]
- **事实激活实验**：将推理轨迹替换为提取出的事实列表（OFF Facts），在无推理模式下也显著提升 pass@k，为事实激活假说提供强证据 [REF: §5.2 / Figure 6]
- 能力较弱的模型从推理中获益更多（Ω 更高），如 Qwen3-32B 的 Ω 高于 Gemini-2.5-Pro，说明弱模型具有更多"隐藏知识" [REF: Figure 2]

## 方法 / 数据集规模

- 模型：**Gemini-2.5-Flash、Gemini-2.5-Pro**（Google Research）、**Qwen3-32B**；均为支持 reasoning ON/OFF 切换的混合模型 [REF: §2]
- 数据集：**SimpleQA-Verified**（1,000 条，经过纠错的子集）和 **EntityQuestions**（4 种关系×250 条 = 1,000 条单跳问题） [REF: §2]
- 指标：**pass@k**（k 最大取 100，使用 Chen 2021 的无偏估计方法）；综合指标 **Ω**（线性加权平均推理 ON/OFF 的相对改善，赋予更大 k 更高权重） [REF: §2]
- 幻觉审计：对每个问题的每条采样轨迹中每个中间事实调用 Gemini-2.5-Flash（搜索增强）进行验证 [REF: §5.3]

## 主要实验结果

pass@k 关键数据点（以 Qwen3-32B + SimpleQA-Verified 为例）：
- Reasoning OFF pass@1 ≈ 低基线；Reasoning ON pass@k 在高 k 值时**接近翻倍** [REF: Figure 1]

计算缓冲效应（Gemini-2.5-Flash，SimpleQA-Verified）：
- OFF: pass@1 ≈ 0.206 → ON Dummy（无语义填充）: **0.262** → ON（完整推理）: 更高 [REF: §5.1]

EntityQuestions 上 ON Facts（从推理轨迹提取事实后重新回答）**与完整 ON 推理性能持平**，但计算量大幅降低 [REF: §5.2 / Figure 6]

## 局限性

- 研究聚焦于封闭域（closed-book）单跳问答，对开放式生成或多模态任务的泛化性待探索
- 事实激活依赖模型**自身**生成的事实，若幻觉率高则形成恶性循环（推理幻觉 → 答案幻觉）
- 混合模型中 reasoning ON/OFF 的训练数据比例不透明，可能引入 ON/OFF 偏置，论文通过对照实验进行了部分控制 [REF: §5.1]
- Ω 指标依赖 pass@1 到 pass@100 的完整曲线，实际部署中采样 100 次成本较高

## 相关页面

- [[chain-of-thought]]
- [[pass-at-k]]
- [[hallucination-taxonomy]]
- [[inference-time-scaling]]
- [[capability-elicitation]]
- [[test-time-compute]]
- [[self-consistency]]
