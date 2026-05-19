---
title: "Benchmark Pitfall 速查表（评测专家必读）"
type: synthesis
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://arxiv.org/abs/2309.03882"
  - "https://arxiv.org/abs/2402.01781"
  - "https://www.nist.gov/media/748456"
  - "https://arxiv.org/abs/2403.07974"
domain:
  - synthesis
  - methodology
---

# Benchmark Pitfall 速查表（评测专家必读）

> 目标读者：跑 LLM 评测 / 写评测论文 / 审阅他人评测结果时，本页是「常见陷阱清单」。每条 pitfall 给出现象 + 根因 + 缓解方案 + 参考来源。

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
