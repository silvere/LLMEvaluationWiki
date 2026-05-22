---
title: HLE
type: benchmark
publish: true
confidence: draft
as_of_date: '2026-05-19'
last_verified: '2026-05-22'
domain:
- knowledge
- reasoning
- science
- math
year: 2025
arxiv_id: '2501.14249'
status: active
sota:
- score: 64.7%
  model: Claude-Opus-4.7
  harness: null
  with_tools: true
  date: 2026-05
  source: https://llm-stats.com/benchmarks/humanity's-last-exam
  notes: Claude Mythos Preview，llm-stats 榜首（with tools / agent mode）
- score: 58.7%
  model: GPT-5
  harness: null
  with_tools: true
  date: 2026-05
  source: https://llm-stats.com/benchmarks/humanity's-last-exam
  notes: GPT-5.4 Pro，with tools
- score: 57.2%
  model: GPT-5.5
  harness: null
  with_tools: true
  date: 2026-05
  source: https://llm-stats.com/benchmarks/humanity's-last-exam
  notes: GPT-5.5 Pro，with tools
- score: 52.3%
  model: GLM-5.1
  harness: null
  with_tools: true
  date: 2026-04
  source: https://lushbinary.com/blog/glm-5-1-benchmarks-breakdown-swe-bench-pro-nl2repo-cybergym/
  notes: with tools，open-source 第二档
- score: 50.4%
  model: GLM-5
  harness: null
  with_tools: true
  date: 2026-02
  source: https://huggingface.co/zai-org/GLM-5
  notes: with tools，open-source 早期高分
- score: 50.2%
  model: Kimi-K2.5
  harness: null
  with_tools: true
  date: 2026-02
  source: https://artificialanalysis.ai/
  notes: Kimi K2 系列，with tools
- score: 48.1%
  model: Zoom-AI
  harness: null
  with_tools: false
  date: 2026-04
  source: https://www.zoom.com/en/blog/humanitys-last-exam-zoom-ai-breakthrough/
  notes: Zoom AI 自研，HLE full-set SOTA（no tools）
- score: 45.0%
  model: Claude-Opus-4
  harness: null
  with_tools: true
  date: 2025-08
  source: https://lushbinary.com/blog/glm-5-1-benchmarks-breakdown-swe-bench-pro-nl2repo-cybergym/
  notes: Claude Opus 4.6 (GLM-5.1 对比口径)
- score: 44.9%
  model: Kimi-K2
  harness: null
  with_tools: true
  date: 2025-11
  source: https://artificialanalysis.ai/
  notes: K2 Thinking，with tools
- score: 44.7%
  model: Gemini-3.1-Pro
  harness: null
  with_tools: false
  date: 2026-05
  source: https://pricepertoken.com/leaderboards/benchmark/hle
  notes: Gemini 3.1 Pro Preview，no tools，Artificial Analysis 榜首
- score: 44.3%
  model: GPT-5.5
  harness: null
  with_tools: false
  date: 2026-05
  source: https://artificialanalysis.ai/evaluations/humanitys-last-exam
  notes: GPT-5.5 xhigh，no tools
- score: 43.0%
  model: GPT-5.5
  harness: null
  with_tools: false
  date: 2026-05
  source: https://artificialanalysis.ai/evaluations/humanitys-last-exam
  notes: GPT-5.5 high，no tools
- score: 41.6%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2026-04
  source: https://pricepertoken.com/leaderboards/benchmark/hle
  notes: GPT-5.4，no tools
- score: 39.9%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2026-04
  source: https://pricepertoken.com/leaderboards/benchmark/hle
  notes: GPT-5.3 Codex，no tools
- score: 31.0%
  model: GLM-5.1
  harness: null
  with_tools: false
  date: 2026-03
  source: https://huggingface.co/zai-org/GLM-5.1
  notes: no tools，open-source
- score: 30.5%
  model: GLM-5
  harness: null
  with_tools: false
  date: 2026-02
  source: https://huggingface.co/zai-org/GLM-5
  notes: no tools
- score: 25%
  model: GPT-5
  harness: null
  with_tools: false
  date: 2025-08
  source: https://openai.com/index/introducing-gpt-5/
  notes: GPT-5 初版（with reasoning），已被 5.3/5.4/5.5 覆盖
- score: 18.8%
  model: Gemini-2.5-Pro
  harness: null
  with_tools: false
  date: 2025-06
  source: https://deepmind.google/
  notes: 已被 3.1 Pro 覆盖
dimension: A
subdimension: benchmark
---

# HLE

> Humanity's Last Exam（人类最后的考试），由 Scale AI 与数千名顶级学者协作构建的超高难度跨学科评测集，代表人类专业知识的最前沿，旨在测试 AI 是否接近超越人类专家水平。

> [!warning] 评测口径与效度边界（必读）
> - **with_tools / no_tools 是两个赛道**：with tools 顶部 64.7%（Claude Mythos）vs no tools 顶部 44.7%（Gemini 3.1 Pro）—— 约 20pt gap。跨模型比较前必须对齐 tool 配置。
> - **题目效度问题**：FutureHouse 2025-09 研究发现 HLE 化学/生物子集约 **30% 答案存在错误或歧义**（[Wikipedia](https://en.wikipedia.org/wiki/Humanity%27s_Last_Exam)），Scale AI 后续修正版本题数从 3000 调整到 2500，跨版本数字不直接可比。
> - **judge 选择敏感**：lushbinary 报告 GLM-5.1 用 GPT-5.2 vs 用 Claude 做 judge 时分数差异 3-5pt，引用具体分数必须看 evaluation harness。
> - **更新频率**：HLE 月级更新；本表 `last_verified: 2026-05-19`，数据基于 Artificial Analysis / llm-stats / pricepertoken 三方对照。

<!-- AUTO-LINKS:START -->

<!-- AUTO-SOTA:START -->

## 模型得分排行

> 完整模型得分排行（含 SOTA 与历代梯队）。由 `scripts/inject-sota-table.ts` 从 frontmatter `sota` 字段自动渲染，**按 score 自动降序**。维护：编辑 frontmatter，不要手改本表。

| # | 模型 | Tools | 分数 | 备注 | 时间 | 来源 |
|---|---|---|---|---|---|---|
| 🥇 | [[Claude-Opus-4.7]] | 🔧 with | 64.7% | Claude Mythos Preview，llm-stats 榜首（with tools / agent mode） | 2026-05 | [link](https://llm-stats.com/benchmarks/humanity's-last-exam) |
| 🥈 | [[GPT-5]] | 🔧 with | 58.7% | GPT-5.4 Pro，with tools | 2026-05 | [link](https://llm-stats.com/benchmarks/humanity's-last-exam) |
| 🥉 | [[GPT-5.5]] | 🔧 with | 57.2% | GPT-5.5 Pro，with tools | 2026-05 | [link](https://llm-stats.com/benchmarks/humanity's-last-exam) |
| 4 | [[GLM-5.1]] | 🔧 with | 52.3% | with tools，open-source 第二档 | 2026-04 | [link](https://lushbinary.com/blog/glm-5-1-benchmarks-breakdown-swe-bench-pro-nl2repo-cybergym/) |
| 5 | [[GLM-5]] | 🔧 with | 50.4% | with tools，open-source 早期高分 | 2026-02 | [link](https://huggingface.co/zai-org/GLM-5) |
| 6 | [[Kimi-K2.5]] | 🔧 with | 50.2% | Kimi K2 系列，with tools | 2026-02 | [link](https://artificialanalysis.ai/) |
| 7 | [[Zoom-AI]] | 🚫 no | 48.1% | Zoom AI 自研，HLE full-set SOTA（no tools） | 2026-04 | [link](https://www.zoom.com/en/blog/humanitys-last-exam-zoom-ai-breakthrough/) |
| 8 | [[Claude-Opus-4]] | 🔧 with | 45.0% | Claude Opus 4.6 (GLM-5.1 对比口径) | 2025-08 | [link](https://lushbinary.com/blog/glm-5-1-benchmarks-breakdown-swe-bench-pro-nl2repo-cybergym/) |
| 9 | [[Kimi-K2]] | 🔧 with | 44.9% | K2 Thinking，with tools | 2025-11 | [link](https://artificialanalysis.ai/) |
| 10 | [[Gemini-3.1-Pro]] | 🚫 no | 44.7% | Gemini 3.1 Pro Preview，no tools，Artificial Analysis 榜首 | 2026-05 | [link](https://pricepertoken.com/leaderboards/benchmark/hle) |
| 11 | [[GPT-5.5]] | 🚫 no | 44.3% | GPT-5.5 xhigh，no tools | 2026-05 | [link](https://artificialanalysis.ai/evaluations/humanitys-last-exam) |
| 12 | [[GPT-5.5]] | 🚫 no | 43.0% | GPT-5.5 high，no tools | 2026-05 | [link](https://artificialanalysis.ai/evaluations/humanitys-last-exam) |
| 13 | [[GPT-5]] | 🚫 no | 41.6% | GPT-5.4，no tools | 2026-04 | [link](https://pricepertoken.com/leaderboards/benchmark/hle) |
| 14 | [[GPT-5]] | 🚫 no | 39.9% | GPT-5.3 Codex，no tools | 2026-04 | [link](https://pricepertoken.com/leaderboards/benchmark/hle) |
| 15 | [[GLM-5.1]] | 🚫 no | 31.0% | no tools，open-source | 2026-03 | [link](https://huggingface.co/zai-org/GLM-5.1) |
| 16 | [[GLM-5]] | 🚫 no | 30.5% | no tools | 2026-02 | [link](https://huggingface.co/zai-org/GLM-5) |
| 17 | [[GPT-5]] | 🚫 no | 25% | GPT-5 初版（with reasoning），已被 5.3/5.4/5.5 覆盖 | 2025-08 | [link](https://openai.com/index/introducing-gpt-5/) |
| 18 | [[Gemini-2.5-Pro]] | 🚫 no | 18.8% | 已被 3.1 Pro 覆盖 | 2025-06 | [link](https://deepmind.google/) |

<!-- AUTO-SOTA:END -->

## 参考链接

- **arXiv 论文**: [https://arxiv.org/abs/2501.14249](https://arxiv.org/abs/2501.14249)

<!-- AUTO-LINKS:END -->

## 概述

HLE（Humanity's Last Exam）于 2025 年 1 月由 Scale AI 联合全球顶级学者发布，是迄今为止最具雄心的 AI 评测项目之一。基准的命名本身即是宣言：这将是人类专家知识所能设计的"最后一批"真正困难的考试题目——当 AI 突破这道关卡，意味着在专业知识广度上实质性超越人类专家。

HLE 的构建汇聚了来自数学、物理、化学、生物、医学、法律、历史、哲学、工程等数十个学科的 3000+ 名顶级学者，由这些领域专家亲自出题，确保每道题都处于各自学科的知识前沿。题目要求的知识深度通常在博士及以上水平，部分题目甚至代表当前学科研究边界。

发布初期的评测结果震惊 AI 社区：包括 o1、GPT-4o、Claude 3.5 Sonnet 在内的顶级模型准确率均低于 10%，其中多数模型在 3–7% 区间。这一结果有力地表明，尽管 AI 在常规学术测试上已接近饱和，但在真正前沿专业知识方面仍存在巨大差距。

HLE 同时包含多模态题目（含图表、化学式、数学符号等），部分题目需要跨学科推理（如结合物理知识解决生物问题）。

## 任务格式

- **题目总量**：约 3000 道（涵盖文本和多模态）
- **题目类型**：选择题（约 70%）+ 精确答案题（约 30%）
- **学科覆盖**：数学、物理、化学、生物、医学、法律、历史、哲学、计算机科学、工程等 50+ 学科
- **难度标准**：博士及以上水平；普通大学教授预估需数分钟至数十分钟/题
- **多模态比例**：约 15–20% 含图表或化学结构式
- **评估方式**：自动字符串匹配（精确答案题）+ LLM 裁判（部分选择题）

## 主要指标

- **整体准确率（Overall Accuracy）**：所有题目的选择正确率
- **学科分解分**：各学科子集的专项准确率
- **多模态题目准确率**：含图表题目的专项表现
- **人类专家基线**：约 80–90%（出题专家估计，因无系统测试数据）

## 局限性

- 题目来自志愿学者，出题质量和标准存在较大差异，部分题目可能存在歧义
- 评分高度依赖 LLM 裁判，而裁判模型本身可能在某些学科判断上不可靠
- "超难题"评测的解释性存疑：低准确率是因为题目确实前沿，还是题目本身设计不佳？

## 相关页面

- [[GPQA]]
- [[FrontierMath]]
- [[MMLU]]
- [[BBEH]]
- [[ARC-AGI1]]

