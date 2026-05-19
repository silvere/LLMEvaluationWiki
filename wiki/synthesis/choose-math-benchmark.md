---
title: "如何选择数学评测基准（决策树）"
type: synthesis
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://arxiv.org/abs/2103.03874"
  - "https://artificialanalysis.ai/evaluations/aime"
  - "https://epoch.ai/benchmarks/frontier-math"
  - "https://lmarena.ai/"
domain:
  - synthesis
  - math
  - reasoning
---

# 如何选择数学评测基准（决策树）

> 目标读者：在 LLM 评测中需要决定「我该跑哪个数学 benchmark」的工程师与研究员。本页给出 2026-05 当前可用的主流数学评测对比、选型决策树，以及各 benchmark 的关键 pitfall。

## TL;DR — 一句话决策

| 你的场景 | 推荐 benchmark | 理由 |
|---|---|---|
| 小学到高中数学综合能力（base model 训练效果） | [[GSM8K]] + [[MATH]]-500 | 已饱和但**仍是社区共识基线**，几乎所有论文都报 |
| 竞赛级 / 推理模型 ablation | [[AIME]] 2025-2026 + [[OmniMATH]] | 题量大 / 难度高 / 污染少 |
| frontier 模型最难题 / 是否「数学 AGI」 | [[FrontierMath]] | 数学家出题、保密、目前 o3 仅 ~25% |
| 中文数学 | [[CMMLU]]-math / [[C-Eval]]-math / GSM8K-Zh | 中文 base model 必报 |
| 形式化数学 / 证明 | miniF2F / ProofNet / PutnamBench | Lean / Coq 等形式语言 |
| 数学多模态（图、公式渲染） | [[MathVista]] / We-Math | 配合视觉理解 |

## 决策树

```
你要评测的是 base LLM 还是 reasoning model？
│
├── base LLM（GPT-4o / Claude / Gemini Pro / Llama / Qwen base）
│   │
│   ├── 想报「公认基线」给学术圈看 → GSM8K (8.5K 题) + MATH-500 (Hendrycks)
│   ├── 想测中文能力 → 加 C-Eval-math + CMMLU-math + GSM8K-Zh
│   └── 想测多模态数学（含图） → MathVista
│
└── reasoning model（o1 / R1 / Claude Thinking / QwQ）
    │
    ├── 主流对照 → AIME 2024+2025+2026（multi-seed maj@64）
    ├── 测「无法靠记忆」的真难度 → FrontierMath（每月新题、私有 test set）
    ├── 大题量验证 → OmniMATH（200K 题）/ Olympiads
    ├── 形式化证明 → miniF2F-Lean4 / PutnamBench（形式化基准）
    └── 想报最难分数 → HMMT（Harvard-MIT Math Tournament）
```

## 横向对比表

| Benchmark | 题量 | 类型 | 当前 SOTA（2026-05） | 饱和 | 污染 | 推荐协议 |
|---|---|---|---|---|---|---|
| **[[GSM8K]]** | 8,500 | 小学应用题 | ~98%（多家） | ✅ 饱和 | ✅ 严重 | 仅作历史基线参考 |
| **[[MATH]] / MATH-500** | 12,500 / 500 | 高中竞赛 | 97.3%（R1） | ✅ 饱和 | ✅ 严重 | 仅作基线 |
| **[[AIME]]** | 30/年 | AIME 竞赛 | ~98%（Doubao Seed maj@64） / ~90% pass@1 | ⚠️ 部分饱和 | ⚠️ 2024 题污染 | **multi-seed + maj@N + 报年份** |
| **[[FrontierMath]]** | ~300 | 研究级数学 | o3 ~25% | ❌ 完全未饱和 | ✅ 保密 | 信任 official 评测 |
| **OmniMATH** | 200K+ | 奥赛 + 综合 | ~75-85% | ❌ active | ⚠️ 部分 | pass@1 |
| **miniF2F-Lean4** | 488 | 形式化证明 | ~60-70% | ❌ active | ✅ 干净 | Lean compile 验证 |
| **MathVista** | 6,141 | 多模态数学 | ~75% | ❌ active | ⚠️ 部分 | 多模态 0-shot |
| **HLE-math 子集** | ~500 | 终极人类考试 | <10% | ❌ frontier | ✅ 保密 | 与 FrontierMath 类似 |

## 各 benchmark 关键 pitfall（评测专家必读）

### GSM8K / MATH-500
- **饱和到 97%+**，单一分数已无区分度
- 2024 起多个研究证实主流 base model 训练语料含原题（[[benchmark-contamination]]）
- 用法：只作为「这模型对数学完全没用」的最低基线

### AIME（2024-2026）
- **年份混淆**：「AIME 88%」无意义，必须明示哪一年 / pass@1 还是 maj@64
- 题量极小（每套 15 题），单次 run 方差 5-10pt，**必须 multi-seed + majority-vote**
- AIME 2024 已被部分训练语料抓取，2025-2026 题相对干净
- 推理模型默认 maj@N（N=16/32/64），普通 LLM 0-shot CoT，跨论文比较前必看协议

### FrontierMath（Epoch AI）
- 数学家秘密出题、test set 不公开
- 顶级模型 o3 ~25%，是当前真正的 frontier 数学评测
- 题目分级别：T1（普通研究生题）/ T2（专业研究方向）/ T3（fields 级难题）
- 缺点：闭源运营，独立复现困难

### miniF2F / ProofNet / PutnamBench
- 不评测数值答案而是**形式化证明**（Lean / Coq）
- 要 LLM 生成可编译证明，验证比 exact-match 严格
- DeepSeek-Prover / AlphaProof 等专门优化的模型才能拿高分

### MathVista
- 多模态：图表读数 + 几何 + 函数图像
- 与纯文本数学 benchmark 互补，单看不够

## 推荐组合（2026-05）

**通用 LLM 发布报告**：GSM8K + MATH-500 + MMLU-math + AIME 2024 maj@1

**推理模型对照**：AIME 2024 maj@64 + AIME 2025 + GPQA + FrontierMath + HLE

**中文模型**：上面 + C-Eval-math + CMMLU-math + GSM8K-Zh

**多模态模型**：上面 + MathVista + We-Math

**最严格 ablation**：FrontierMath（私有）+ AIME 2026（最新）+ miniF2F-Lean4

## 已知失效组合 / 不推荐

- ❌ 只报 GSM8K：已饱和，无信息量
- ❌ 只报 AIME 单次 pass@1：方差大，结论不可信
- ❌ AIME 不报年份：跨论文无法比较
- ❌ 不区分 MATH / MATH-500：分数差异 5-10pt
- ❌ 不报 sampling 协议（pass@1 vs maj@N）：差异巨大

## 相关页面

- [[GSM8K]] · [[MATH]] · [[AIME]] · [[FrontierMath]] · [[MMLU]] · [[GPQA]]
- [[benchmark-saturation]] · [[benchmark-contamination]]
- [[inference-time-scaling]]
- [[choose-code-benchmark]]
- [[benchmark-pitfalls-cheatsheet]]
