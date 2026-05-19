---
title: "IFEval"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
domain: [instruction-following]
language: en
year: 2023
authors: ["Jeffrey Zhou", "Tianjian Lu", "Swaroop Mishra", "Siddhartha Brahma", "Sujoy Basu", "Yi Luan", "Denny Zhou", "Le Hou"]
arxiv_id: "2311.07911"
official_url: "https://github.com/google-research/google-research/tree/master/instruction_following_eval"
official_leaderboard: "https://benchlm.ai/instruction-following"
license: "Apache-2.0"
size: 541
format: programmatic-verifiable
saturation_status: saturated
sources:
  - "https://arxiv.org/abs/2311.07911"
  - "https://github.com/google-research/google-research/tree/master/instruction_following_eval"
evaluation_protocol:
  default_shots: "0-shot"
  default_cot: false
  tool_use: false
  scoring: "Prompt-level / Instruction-level accuracy（strict & loose 两套指标）"
pitfalls:
  - "**Strict vs Loose 模式分数差 10-15pt**：strict 严格匹配格式（如字数 ≥400），loose 容忍轻微违反；跨论文必须确认是哪个"
  - "Prompt-level vs Instruction-level：一个 prompt 可有多条指令，Prompt-level 要求**全部**满足，Instruction-level 是平均通过率，分数有 5-10pt 差异"
  - "饱和：顶级模型 ≥90%（Claude Mythos Preview / GPT-5.4 / Grok 4.20 等），区分度低；应配合 AdvancedIF / MultiIF / FollowBench"
  - "指令类型固定 25 种（写 N 字、含关键词、避免字母 'C' 等），覆盖工程价值有限，对 jailbreak / 长指令 / 多 turn 不评测"
  - "对 verifier 实现敏感（Python 字数统计 vs LLM judge 差异），不同评测框架（lm-eval-harness / official）的实现细节稍异"
sota:
  - score: "100.0%"
    model: "Kimi-K2.5"
    harness: null
    notes: "Reasoning 模式（BenchLM 2026-04）"
  - score: "100.0%"
    model: "Grok-4.3"
    harness: null
    notes: "Multi-agent 4.20 设置"
  - score: "97.1%"
    model: "Grok-4.3"
    harness: null
    notes: "4.20 单 agent"
---

# IFEval（Instruction Following Evaluation）

> 用可程序化验证的具体指令测试模型的精确遵循能力，客观衡量模型对格式和内容约束的执行准确性。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | 分数 | 备注 |
|---|---|---|---|
| 🥇 | [[Kimi-K2.5]] | 100.0% | Reasoning 模式（BenchLM 2026-04） |
| 🥈 | [[Grok-4.3]] | 100.0% | Multi-agent 4.20 设置 |
| 🥉 | [[Grok-4.3]] | 97.1% | 4.20 单 agent |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2311.07911](https://arxiv.org/abs/2311.07911)
- **官方主页**: [https://github.com/google-research/google-research/tree/master/instruction_following_eval](https://github.com/google-research/google-research/tree/master/instruction_following_eval)

<!-- AUTO-LINKS:END -->

## 概述

IFEval 于 2023 年由 Google 团队发布，全称 Instruction Following Evaluation。其设计动机来自一个实际痛点：模型能否准确遵循用户给出的具体格式或内容要求？这类能力在实际应用中至关重要，但评测难度在于"答案质量"本身难以客观衡量。IFEval 的解决方案是：专门选择那些"遵没遵循"可以用程序自动验证的指令。

基准共包含 541 条指令，涵盖 25 类指令类型，例如"回答必须用大写字母开头"、"段落数量恰好为 3 段"、"回答中不得包含关键词 X"、"以特定短语结尾"等。这些约束均可通过正则表达式或简单的文本解析程序判断是否被满足，无需人工主观评分，评测过程完全客观可重复。

IFEval 的评测指标分两个粒度：Prompt 级别（整道题所有指令全部满足才算通过）和 Instruction 级别（统计单条指令的满足率）。两个指标共同反映模型在精确执行复合约束方面的能力。

## 规格

| 属性 | 值 |
|------|-----|
| 发布年份 | 2023 |
| 大小 | 541 条指令（25 类指令类型） |
| 题目格式 | 开放性（程序化验证指令是否被遵循） |
| 覆盖领域 | 指令遵循 |
| 语言 | 英文 |

## 当前状态

该基准处于 active 状态。饱和阈值设为 90%，当前顶级模型在 Prompt 级别准确率上已有显著提升，但在复合多重约束的场景下仍存在失误（具体数值以各模型报告为准）。由于题目数量较少，排行榜上的细微差距统计意义有限。

## 主要局限

- **指令类型覆盖范围窄**：25 类指令类型主要集中在格式约束（长度、结构、关键词等），缺乏对内容层面（如"不得推荐任何品牌"）或逻辑层面约束的覆盖。
- **题目数量少，方差较大**：541 条指令的规模偏小，单次评测结果受随机性影响较大，两个模型之间的微小分数差异不一定有统计意义。
- **不覆盖多轮场景**：所有测试均为单轮指令，无法评测模型在多轮对话中持续遵循指令的能力。

## 相关页面

- [[MT-Bench]]
- [[Chatbot-Arena]]
- [[IFEval]]
