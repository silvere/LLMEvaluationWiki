---
title: "如何选择代码评测基准（决策树）"
type: synthesis
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://arxiv.org/abs/2107.03374"
  - "https://arxiv.org/abs/2403.07974"
  - "https://www.swebench.com/verified.html"
  - "https://www.nist.gov/media/748456"
domain:
  - synthesis
  - code
---

# 如何选择代码评测基准（决策树）

> 目标读者：在 LLM 评测中需要决定「我该用哪个 code benchmark」的工程师与研究员。本页给出 2026-05 当前可用的主流代码评测对比、选型决策树与各 benchmark 的关键 pitfall。代码评测正从「函数级 pass@k」过渡到「仓库级 agent」，跨代差异很大。

## TL;DR — 一句话决策

| 你的场景 | 推荐 benchmark | 理由 |
|---|---|---|
| 验证模型「能写函数」 | [[HumanEval]] + [[MBPP]] / EvalPlus | 经典基线、所有论文都报，但**已饱和** |
| 防止训练污染、要时间真实 | [[LiveCodeBench]] | 每月新题，按模型 cutoff 过滤 |
| 仓库级 / Agent 评测 | [[SWE-bench-Verified]] | 500 题人工筛真实 issue |
| 长 horizon coding agent | tau-bench-code / Terminal-Bench / SWE-bench-Pro | 多步骤、需 sandbox |
| 代码理解（非生成） | CodeXGLUE / BigCodeBench-Lite | 综合任务 |
| 中文代码 | MultiPL-E / CodeFuseEval | 多语言 + 中文注释 |
| 安全 / 漏洞修复 | SecurityEval / CyberSecEval | 包含 CVE 类任务 |

## 决策树

```
你要测的是什么？
│
├── 单函数级代码生成
│   │
│   ├── 要历史可比（论文标配）→ HumanEval + MBPP（已饱和、慎用）
│   ├── 要更严格 unit test → HumanEval+ / EvalPlus
│   ├── 要防污染时间过滤 → LiveCodeBench（标注题目发布日期）
│   └── 要多语言 → MultiPL-E（HumanEval × 18 语言）
│
├── 仓库级 / Agent 编程
│   │
│   ├── 主流对照 → SWE-bench-Verified 500 题
│   ├── 想测长 horizon → SWE-bench-Multimodal / Pro / OpenHands-Agent
│   ├── 要含 shell / 文件操作 → Terminal-Bench / OSWorld
│   └── 多轮工具调用 → tau-bench-code
│
├── 代码理解（非生成）
│   │
│   ├── 综合 → BigCodeBench / CodeXGLUE
│   └── bug detection / 推理 → CRUXEval / RepoBench
│
└── 安全相关
    │
    ├── 漏洞引入率 → SecurityEval / SafeCoder
    └── 安全 + 攻防 → CyberSecEval
```

## 横向对比表

| Benchmark | 单位 | 题量 | 当前 SOTA（2026-05） | 饱和 | 污染 | 评测成本 |
|---|---|---|---|---|---|---|
| **[[HumanEval]]** | 函数 | 164 | 95.1%（Claude Sonnet 4）/ 93.1%（GPT-5.4） | ✅ 饱和 | ✅ 严重 | $0.1-1 |
| **HumanEval+** | 函数 | 164 | ~85-90% | ⚠️ 部分饱和 | ⚠️ 部分 | $0.5-2 |
| **MBPP / MBPP+** | 函数 | 974 / 399 | ~93% | ✅ 饱和 | ⚠️ 部分 | $0.5-2 |
| **[[LiveCodeBench]]** | 函数 | 600+（持续） | 91.7%（Gemini-3-Pro，cutoff 后） | ❌ active | ✅ 干净（时间过滤） | $1-5 |
| **[[SWE-bench-Verified]]** | 仓库 | 500 | ~80%（Gemini 3.1 Pro / DeepSeek V4-Pro，scaffold 敏感） | ❌ active | ⚠️ NIST 报告 unintended solutions | $50-200/run |
| **SWE-bench-Pro** | 仓库 | ~700 | <60% | ❌ active | ✅ 较干净 | $100-300/run |
| **tau-bench-code** | Agent | 100+ | ~50-60% | ❌ active | ✅ 干净 | $20-100 |
| **Terminal-Bench** | shell | 200+ | ~40-60% | ❌ active | ✅ 干净 | $10-50 |
| **BigCodeBench** | 复杂函数 | 1140 | ~50-65% | ❌ active | ⚠️ 部分 | $5-20 |
| **MultiPL-E** | 多语言函数 | 164×18 | ~60-85%（语言依赖） | ⚠️ 部分饱和 | ⚠️ 部分 | $2-10 |

## 各 benchmark 关键 pitfall（评测专家必读）

### HumanEval / HumanEval+
- **样本量只有 164 题**，pass@1 单次 run 方差 1-2pt
- HumanEval 已在公开训练语料数年，**所有主流 base model 几乎确定见过**，分数虚高
- 与 MBPP 有 10+ 题重叠，不可独立采样
- **pass@1 vs pass@10 差距 5-15pt**，跨论文比较前必须看 k
- 应替换为：HumanEval+ / EvalPlus（更多 unit test）

### LiveCodeBench
- **必须报告时间窗**：「LiveCodeBench 80%」无意义，必须说「2024-08 之后题目 80%」
- 题目持续更新，不同时间快照分数不可对比
- 数据来源 LeetCode/AtCoder/CodeForces，工程任务代表性有限
- 设计核心是「cutoff 后题分数 vs cutoff 内题分数」差距 → 污染检测

### SWE-bench Verified
- **Verified ≠ Full ≠ Lite**：500 / 2,294 / 300 三个子集分数不可直接对比，常被混淆
- **NIST 报告 unintended solutions**：Agent 读 `.git` 历史复制 patch、修改测试代码、加 test-specific shortcut（[NIST 报告](https://www.nist.gov/media/748456)）；2026 SWE-ABS 论文 mutation-strengthened test 下 19.78% patch 失效
- **Scaffold 敏感度极高**：同一基础模型用 SWE-agent / OpenHands / Aider / Devin 差异 15-20pt，跨论文必须报 scaffold
- 500 题全部 Python 开源仓库，对其他语言 / 闭源 / 非 bug 任务代表性有限
- 单次跑全集 ~$50-200

### tau-bench / Terminal-Bench / OSWorld
- 多轮 agent + 工具调用，单次 trajectory 可能 50+ 步
- 评测成本是 HumanEval 类的 10-100 倍
- 对 scaffold + 系统 prompt 敏感

### BigCodeBench
- 任务包含真实 Python 库调用（pandas/numpy/sklearn），更接近工程
- 不饱和但分数普遍偏低，区分度仍可观

## 推荐组合（2026-05）

**通用 LLM 发布报告**：HumanEval+ + MBPP+ + LiveCodeBench（cutoff 后窗口）+ MultiPL-E

**代码模型专项**：上面 + BigCodeBench + CRUXEval + SWE-bench-Verified（scaffold = SWE-agent）

**Agent / coding assistant**：SWE-bench-Verified + Terminal-Bench + tau-bench-code + OSWorld

**最严格 ablation**：LiveCodeBench（按月切窗）+ SWE-bench-Pro + 私有持有 hold-out set

## 已知失效组合 / 不推荐

- ❌ 只报 HumanEval：完全饱和，无信息量
- ❌ SWE-bench Verified 不报 scaffold：跨论文不可比
- ❌ LiveCodeBench 不报时间窗：可能拿模型 cutoff 内的题虚高
- ❌ 把 SWE-bench Lite 分数和 Verified 分数对照：不同集合不可比
- ❌ pass@1 vs pass@10 混在一起：差距 5-15pt

## 相关页面

- [[HumanEval]] · [[LiveCodeBench]] · [[SWE-bench-Verified]] · [[MBPP]] · [[BigCodeBench]]
- [[tau-bench]] · [[OSWorld]] · [[AgentBench]]
- [[benchmark-saturation]] · [[benchmark-contamination]]
- [[choose-math-benchmark]]
- [[benchmark-pitfalls-cheatsheet]]
