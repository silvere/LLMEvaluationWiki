---
title: "Benchmark Pitfall 速查表（评测专家必读）"
type: synthesis
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
review_status: "未审阅（LLM 起草 + 自动 rollup）"
next_review_due: "2026-08-19"
sources:
  - "https://arxiv.org/abs/2309.03882"
  - "https://arxiv.org/abs/2402.01781"
  - "https://www.nist.gov/media/748456"
  - "https://arxiv.org/abs/2403.07974"
derived_from: "所有 wiki/benchmarks/*.md frontmatter 的 pitfalls 字段（由 build-synthesis-pitfall-rollup.ts 聚合）"
domain:
  - synthesis
  - methodology
---

# Benchmark Pitfall 速查表（评测专家必读）

> ⚠️ **Draft 状态**：本页有两层内容——「按主题分类的 pitfall 手册」（LLM 起草，未审阅）+「自动聚合区块」（由 `scripts/build-synthesis-pitfall-rollup.ts` 从各 benchmark 单页 frontmatter 抓取，每条带来源页）。后者数据 grounded，前者结构合理但可能有遗漏。

> 目标读者：跑 LLM 评测 / 写评测论文 / 审阅他人评测结果时，本页是「常见陷阱清单」。每条 pitfall 给出现象 + 根因 + 缓解方案 + 参考来源。

## 数据来源与生成方法

- **「Pitfall 跨页聚合」section（[AUTO-PITFALL-ROLLUP] 区块）**：由脚本从各 benchmark 单页 frontmatter 的 `pitfalls:` 字段抓取，按关键词聚类，**每条 grounded 到来源页**。改各 benchmark 页 frontmatter 即可同步本节。
- **下面 1-12 节按主题分类的手册**：LLM 起草 + 部分外部 source（arXiv 2309.03882 / 2402.01781 / NIST 报告等），**未经领域专家正式审阅**。可能与自动聚合区块有重叠或遗漏。

<!-- AUTO-PITFALL-ROLLUP:START -->

## Pitfall 跨页聚合（自动生成）

> 由 `scripts/build-synthesis-pitfall-rollup.ts` 从各 benchmark 单页 frontmatter `pitfalls:` 字段聚合，按关键词聚类。**维护方式：改各 benchmark 页 frontmatter，不要手改本节。**

_扫描 379 个 benchmark，含 pitfalls 字段的 9 页，共 45 条 pitfall。_

### 数据污染 / 训练泄漏（7 条）

- 预训练数据污染：MMLU 题目大量源于公开考试 / Wikipedia，主流 base model 训练语料几乎确认包含相关网页（[[MMLU|MMLU]]）
- 训练数据污染严重：MATH 已在公开训练语料数年，所有主流 base model 几乎确定见过（[[MATH|MATH]]）
- **必须报告时间窗**：'LiveCodeBench 80%' 没意义，必须说 '2024-08 之后题目 80%'，否则无法排除污染（[[LiveCodeBench|LiveCodeBench]]）
- 模型 cutoff 内的题分数会被记忆污染，cutoff 后题分数显著下降——这正是 LiveCodeBench 的设计核心（[[LiveCodeBench|LiveCodeBench]]）
- 确认污染：HumanEval 已在公开训练语料数年，所有主流 base model 几乎确定见过，分数虚高（参考 LiveCodeBench 论文 2403.07974）（[[HumanEval|HumanEval]]）
- **年份混淆**：'AIME 88%' 没意义。AIME 2022 / 2023 / 2024 / 2025 / 2026 每年新题，污染程度不同，必须明确报告年份（[[AIME|AIME]]）
- 题目从 2024-02 起被部分 LLM 训练语料抓取（AoPS 网站爬取），2024 年题分数虚高；2025-2026 题相对干净（[[AIME|AIME]]）

### 饱和 / 区分度（6 条）

- 饱和：顶级模型已 ≥90%（接近人类专家 89.8%）单一分数无区分度，必须搭配 MMLU-Pro / GPQA（[[MMLU|MMLU]]）
- 尚未饱和：顶级模型 ~80-85%（DeepSeek-R1 84%，Claude Opus 4.6 ~82%），仍有区分度，是当前 MMLU 类替代首选（[[MMLU-Pro|MMLU-Pro]]）
- 饱和：MATH-500 顶级模型 ≥97%（DeepSeek-R1 97.3%），无区分度，应替换为 [[AIME]] / [[FrontierMath]]（[[MATH|MATH]]）
- 饱和：顶级模型 ≥90%（Claude Mythos Preview / GPT-5.4 / Grok 4.20 等），区分度低；应配合 AdvancedIF / MultiIF / FollowBench（[[IFEval|IFEval]]）
- 完全饱和：顶级模型 pass@1 ≥ 93%（GPT-5.4 93.1% / Claude Sonnet 4 95.1%）；继续报告 HumanEval 已无区分度（[[HumanEval|HumanEval]]）
- 饱和：Diamond 从 2024-09 o1 77% → 2026-02 Gemini 3.1 Pro 94.1% / Claude Opus 4.7 94.2%，已超 PhD 专家 65%（[[GPQA|GPQA]]）

### 子集 / variant 混淆（13 条）

- Verified ≠ Full ≠ Lite：常被混淆。Verified 500 题、Full 2,294 题、Lite 300 题，分数不可直接对比（[[SWE-bench-Verified|SWE-bench Verified]]）
- 成本：完整跑 SWE-bench Verified 一次 ~$50-200（视 agent / 模型），无法快速 ablation（[[SWE-bench-Verified|SWE-bench Verified]]）
- 57 学科题量不均（100-300 题/科），单科方差大，不可逐子集比较（[[MMLU|MMLU]]）
- 跨论文常混淆 MMLU / MMLU-CF / MMLU-Redux / MMLU-Pro，对比前必须确认 variant（[[MMLU|MMLU]]）
- **10 选项 vs MMLU 4 选项**：随机基线 10% vs 25%，分数与 MMLU 不可直接对比，常被混淆（[[MMLU-Pro|MMLU-Pro]]）
- MMLU-Pro 引入更多推理密集题，对 CoT 启用与否敏感（CoT 与非 CoT 差距 5-15pt），跨论文比较必须确认协议（[[MMLU-Pro|MMLU-Pro]]）
- **MATH ≠ MATH-500**：原 MATH 12,500 题、MATH-500 是 OpenAI o1 引入的 500 题子集，分数差异较大，跨论文必须确认（[[MATH|MATH]]）
- 中文报告时常把 MATH-500 误称为 MATH，跨语言对比前必须确认 variant（[[MATH|MATH]]）
- 题目持续更新（约每月），不同时间快照的分数不可直接对比，引用时必须说明 leaderboard 版本（[[LiveCodeBench|LiveCodeBench]]）
- Prompt-level vs Instruction-level：一个 prompt 可有多条指令，Prompt-level 要求**全部**满足，Instruction-level 是平均通过率，分数有 5-10pt 差异（[[IFEval|IFEval]]）
- 应替换为：HumanEval+ / EvalPlus（更多测试用例）/ LiveCodeBench / SWE-bench-Verified（[[HumanEval|HumanEval]]）
- 三个子集分数不可对比：Main 448 / Diamond 198 / Extended 546，论文常默认报告 Diamond（[[GPQA|GPQA]]）
- 题目数量小（Diamond 仅 198），单次评测分数波动 ±1-2pt 是常态，建议多 seed 平均（[[GPQA|GPQA]]）

### 选项位置偏差（2 条）

- 选项位置偏差：模型偏好 A 选项（arXiv 2309.03882 实证），跨模型对比建议 shuffled-options run（[[MMLU|MMLU]]）
- 选项位置偏差同 MMLU 类问题（4-way MCQ 共有缺陷）（[[GPQA|GPQA]]）

### Scaffold / harness 敏感（3 条）

- Agent 框架（SWE-agent / OpenHands / Aider）的 scaffolding 选择对分数影响巨大，跨论文对比时必须报告 scaffold（[[SWE-bench-Verified|SWE-bench Verified]]）
- 答案提取脚本敏感：模型输出 \boxed{...} 还是末行答案差异大，不同评测框架（lm-evaluation-harness / OpenAI eval）的提取规则不一致（[[MATH|MATH]]）
- 对 verifier 实现敏感（Python 字数统计 vs LLM judge 差异），不同评测框架（lm-eval-harness / official）的实现细节稍异（[[IFEval|IFEval]]）

### 题量小 / 统计方差（5 条）

- 14 学科分布不均（如 'engineering' 与 'philosophy' 题量差大），分子科目分数信噪比有限（[[MMLU-Pro|MMLU-Pro]]）
- 样本量太小（164 题），统计噪声大，单次 run 1-2 个百分点波动很常见（[[HumanEval|HumanEval]]）
- 题目数量极小（每年 15 题 × 2 套 = 30 题），单次 run 方差 5-10pt，必须 multi-seed + majority-vote（[[AIME|AIME]]）
- 推理模型 vs 非推理模型评测协议不同：o1 / DeepSeek-R1 / Claude Thinking 默认 maj@64，普通 LLM 默认 0-shot CoT 单 run，跨论文比较前必须看 sampling 协议（[[AIME|AIME]]）
- Doubao Seed 2.0 98.3% 等高分需确认是哪一年题 + 何种采样协议（Doubao-Seed 报告 maj@64）（[[AIME|AIME]]）

### 评测协议默认值分歧（2 条）

- 答案提取脚本敏感：CoT 输出多样格式，不同评测框架的解析规则不一致（[[MMLU-Pro|MMLU-Pro]]）
- **Strict vs Loose 模式分数差 10-15pt**：strict 严格匹配格式（如字数 ≥400），loose 容忍轻微违反；跨论文必须确认是哪个（[[IFEval|IFEval]]）

### 其他（7 条，未归类）

- 5.2%（NIST 评估）任务存在 unintended solutions：Agent 通过读取 .git 历史 / 修改测试代码 / 添加 test-specific shortcut 通过测试而非真解 issue（NIST 报告：https://www.nist.gov/media/748456）（[[SWE-bench-Verified|SWE-bench Verified]]）
- SWE-ABS 论文（2026）报告：top-30 leaderboard agent 共 11,041 个 patch 中 19.78% 在强化测试套件下失败，提示 unit test 强度仍不足（[[SWE-bench-Verified|SWE-bench Verified]]）
- 数据来源 LeetCode/AtCoder/CodeForces，仍以英文 + 算法竞赛风格为主，对工程任务代表性不足（应结合 SWE-bench）（[[LiveCodeBench|LiveCodeBench]]）
- 指令类型固定 25 种（写 N 字、含关键词、避免字母 'C' 等），覆盖工程价值有限，对 jailbreak / 长指令 / 多 turn 不评测（[[IFEval|IFEval]]）
- 与 MBPP 题目重叠（10+ 题），跨 benchmark 不可独立采样（[[HumanEval|HumanEval]]）
- pass@1 vs pass@10 区别巨大（顶级模型 pass@10 比 pass@1 高 5-15pt），跨论文比较前必须看 k（[[HumanEval|HumanEval]]）
- 已逐渐被 [[HLE]]（Humanity's Last Exam）/ [[FrontierMath]] 等 frontier benchmark 替代（[[GPQA|GPQA]]）

_最后更新：2026-05-19_

<!-- AUTO-PITFALL-ROLLUP:END -->

## 1. 数据污染（contamination）

| 现象 | 解释 | 缓解 |
|---|---|---|
| 模型 base 训练后 MMLU / HumanEval / GSM8K 飙高，但下游真实表现一般 | 测试集网页 / GitHub 仓库已在预训练语料中 | 用 [[LiveCodeBench]]（时间过滤）/ MMLU-CF / [[FrontierMath]]（保密） |
| Fine-tune 后某 benchmark 单独飙升 30+pt 但其他不变 | 训练数据直接含题或近镜像题（accidental or intentional） | n-gram 重叠检测；hold-out 子集；交叉 benchmark 验证 |
| 在 cutoff 之前的题分数 >> cutoff 之后 | 训练时见过题（LiveCodeBench 用此判定） | 始终报告 cutoff 时间 + 切窗分数 |

参考：[[benchmark-contamination]] / arXiv 2402.01781 / [[2412.15194|MMLU-CF]]

## 2. 选项位置偏差（MCQ position bias）

| 现象 | 解释 | 缓解 |
|---|---|---|
| gpt-3.5-turbo A 位置 67.2% vs D 位置 60.9%（差 6.3pt） | 模型偏好特定选项（A 居多） | **shuffled-options run**（5-10 次随机化）+ 报告平均 + std |
| 同一题改变选项顺序，模型答案改变 | LLM 不真理解选项内容，部分匹配训练分布 | 检查 majority vote、avg over permutations |

参考：arXiv 2309.03882 "Large Language Models Are Not Robust Multiple Choice Selectors"

## 3. 采样协议混淆（pass@k vs maj@N vs Elo）

| 现象 | 解释 | 缓解 |
|---|---|---|
| HumanEval pass@1 vs pass@10 差距 5-15pt | k 不同结果完全不可比 | **必须报 k**；推理模型默认 pass@1 |
| AIME 推理模型 maj@64 vs 非推理 pass@1 不可比 | sampling 协议差异 | 写「maj@N」/「pass@k」/「single greedy」 |
| Chatbot Arena Elo vs MT-Bench score | 完全不同分数空间 | 跨指标对比无意义 |
| pass@1 之间 5-15pt 差距可能源自温度 / top-p / seed | 抽样随机性 | greedy（T=0）或 multi-seed average |

参考：[[2107.03374|Codex / HumanEval paper]]

## 4. Benchmark 版本 / 子集混淆

| 现象 | 解释 | 缓解 |
|---|---|---|
| 「我们在 SWE-bench 上达到 80%」（其实是 Verified 500） | SWE-bench Full 2,294 / Verified 500 / Lite 300 分数不可比 | 必须明示 variant |
| GPQA Main 448 vs Diamond 198 vs Extended 546 | 三个子集难度梯度 | 默认 Diamond，但要明示 |
| MATH 12,500 vs MATH-500 vs MATH-lvl-5 | 不同子集 | 必须明示 |
| MMLU / MMLU-Pro / MMLU-CF / MMLU-Redux 全混用 | 4 个 variant 分数差异 5-15pt | 明示版本 |

## 5. Scaffold / Harness 依赖（Agent benchmark）

| 现象 | 解释 | 缓解 |
|---|---|---|
| 同一基础模型 SWE-agent 65% vs OpenHands 55% vs Aider 40% | scaffold 决定上下文管理、工具调用、retry 策略 | **必须报告 scaffold + 工具集** |
| OSWorld GPT-4o 25-50%（不同 scaffold） | 浏览器 agent 框架差异 | 同上 |
| tau-bench 同模型不同 harness 差 10-20pt | tool registration / retry 策略 | 同上 |

## 6. 评测者 / Judge 偏差

| 现象 | 解释 | 缓解 |
|---|---|---|
| GPT-4 judge 偏好 GPT-4 自己输出 | self-preference bias | 用多个 judge ensemble / human spot-check |
| Chatbot Arena 用户群偏英语 / 技术背景 | 投票分布有偏 | 看子集 Elo（如 Chinese-only / Hard prompts） |
| Long response > short response 在 LLM-judge 下 win rate 高（与长度相关） | length bias | 报告 length-controlled win rate（Arena-Hard 标配） |
| AlpacaEval LLM-judge 与 Chatbot Arena 排名相关性 ~70% | judge 自身能力上限 | 多 benchmark 交叉 |

参考：[[llm-as-judge]] / Arena-Hard "length-controlled win rate"

## 7. 题目数量 / 统计方差

| 现象 | 解释 | 缓解 |
|---|---|---|
| AIME 30 题，单 run pass@1 方差 5-10pt | 小样本统计噪声 | multi-seed + maj@N |
| GPQA Diamond 198 题，±1-2pt 是常态 | 同上 | 多次评测取均值 |
| HumanEval 164 题，单次 run 1-2pt 波动 | 同上 | greedy（T=0）减少 noise |
| MMLU 子学科 100-300 题，单科方差大 | 同上 | 不要比子学科分数 |

## 8. 评测协议「默认值」分歧

| 现象 | 解释 | 缓解 |
|---|---|---|
| 「MMLU 默认 5-shot 无 CoT」是 lm-eval-harness 约定，但部分论文用 0-shot CoT | 没有真正的「默认」 | 必须报告完整协议 |
| GSM8K 默认 8-shot CoT vs 0-shot CoT 差 20+pt | CoT 启用与否影响巨大 | 明示 |
| IFEval Strict vs Loose 模式差 10-15pt | strict 严格匹配格式，loose 容忍 | 明示 |
| HumanEval 0-shot vs 1-shot 差 10pt | few-shot 例子内容影响 | 明示 |

## 9. 工具 / 检索 / 思维链开关

| 现象 | 解释 | 缓解 |
|---|---|---|
| Code interpreter 启用 vs 关闭：MATH 差 30pt | 工具 = 计算器 | 明示是否允许工具 |
| Self-consistency / best-of-N 启用 vs 关闭：MATH 差 5-15pt | 推理时 scaling | 明示 sampling |
| RAG 启用 vs 关闭：知识 QA 差 10-20pt | 检索增强 | 明示 |
| Long context vs RAG：长上下文任务上不同模型表现差异大 | 检索 vs prefill | 明示 |

参考：[[inference-time-scaling]] / [[chain-of-thought]]

## 10. Goodhart 定律 / benchmark hacking

| 现象 | 解释 | 缓解 |
|---|---|---|
| Llama 3.1 405B 据传专门微调 Arena 风格（emoji / 长回复） | 优化某 benchmark 牺牲泛化 | 多 benchmark 交叉 |
| 某模型 MMLU 飙升但 MMLU-Pro 没动 | 训练数据含 MMLU 特定题 | 看「未训练 benchmark」 |
| SWE-bench Verified 80% 但 unit test mutation 后 60% | unit test 不够强壮 | SWE-ABS / 强化测试套件 |
| Arena 第 1 名换人快、tournament rank 不稳 | 排名敏感于活跃模型集 | 看长期趋势 + 子集 |

参考：[[benchmark-saturation]] / arXiv 2402.01781 "When Benchmarks are Targets"

## 11. 多语言 / 跨文化偏差

| 现象 | 解释 | 缓解 |
|---|---|---|
| MMLU 英文 87% vs 中文 70%（同一模型） | base model 英语主导 | 跨语言 benchmark 必报 |
| 中文报告引用 MMLU 时混入 CMMLU/C-Eval | variant 混乱 | 明示 |
| 多语言 IFEval 没有，模型实际多语言能力被高估 | 评测覆盖不足 | 用 MultiIF / mIFEval |

## 12. 数据集 license / 可重复性

| 现象 | 解释 | 缓解 |
|---|---|---|
| FrontierMath 闭源运营 | 不能本地复现 | 信任 official report |
| AIME 题目版权归 MAA | 不能商业使用 | 仅学术评测 |
| SWE-bench 部分仓库 GPL | 商业模型训练注意 | 看 license |
| Chatbot Arena 票不开放 | 不能独立复现 Elo | 信任 LMArena |

## 综合最佳实践 checklist

跑评测前过这 10 条：

1. ☐ 我报告的是哪个 benchmark **variant**？
2. ☐ 是哪一次 **快照 / 时间窗**？
3. ☐ 采样协议是 pass@1 / pass@k / maj@N？
4. ☐ 是否启用 CoT / tools / RAG？
5. ☐ 多少 shot？few-shot example 来源？
6. ☐ 是 LLM-judge 评？哪个 judge？length-controlled？
7. ☐ Agent 评测：scaffold 是？工具集是？
8. ☐ 已知该 benchmark 是否被该模型 cutoff 之前的数据见过？
9. ☐ 题量 < 200 是否做了 multi-seed？
10. ☐ 我的协议是否能让别人独立复现？

## 相关页面

- [[benchmark-contamination]] · [[benchmark-saturation]] · [[evaluation-reproducibility-crisis]]
- [[llm-as-judge]] · [[inference-time-scaling]]
- [[choose-math-benchmark]] · [[choose-code-benchmark]]
- [[chain-of-thought]]
