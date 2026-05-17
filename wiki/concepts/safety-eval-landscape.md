---
title: "安全评测全景"
type: concept
publish: true
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
aliases:
  - safety-eval-landscape
  - AI安全评测
domain:
  - safety
---

# 安全评测全景

> LLM 安全评测的系统性概述，涵盖有害内容、越狱攻击、对齐失败等维度的主要基准与评测方法。

## 主要评测维度

### 有害内容生成
评测模型是否会输出有害、违法或不道德内容：
- [[HarmBench]] — 400+ 有害行为的红队测试基准
- [[ToxiGen]] — 面向少数族裔的隐性毒性语言评测

### 越狱攻击（Jailbreaking）
评测模型对提示注入和越狱攻击的抵抗能力：
- [[HarmBench]] 包含直接请求与越狱变体两类攻击

### 真实性与幻觉
- [[TruthfulQA]] — 检测模型是否会生成已知错误信息

### 偏见与公平性
评测模型在不同人口群体上的差异化表现。

## 评测方法论

- **Red Teaming** — 专家手工或自动化生成对抗性提示
- **自动评分**：使用 LLM-as-Judge 或分类器标注输出有害程度
- **人工评分**：针对细粒度安全判断，需人工标注

## 局限性

- 安全评测依赖有害行为的枚举，难以穷举所有攻击面
- 模型可能通过"安全训练过拟合"在特定基准上虚高得分（见 [[benchmark-gaming]]）

## 2026 年安全评测的新前沿

近期 arXiv 高质量论文揭示了几个新兴的安全评测方向，从单纯"有害内容生成"扩展到**专业领域生物危险、奖励黑客、过度拒答**等更隐蔽风险：

- **生物/病毒学专家级 Dual-Use 风险**：[[2504.16137|Virology Capabilities Test (VCT)]]（Götting 等）发现前沿 MLLM 在病毒学专家级 QA 上达 43.8%，**超越 94% 病毒学家在其专长子领域**——这是首个明确量化 MLLM "已超越专家"在双用途风险领域的证据，对安全评测协议提出新要求。
- **科学实验室安全**：[[2603.11987|LABSHIELD]] 引入实验室场景的安全推理与规划基准，覆盖危险化学品、生物危险等专业判断。
- **Reward Hacking**：[[2605.02964|Reward Hacking Benchmark]]（Thaman，2026-05）+ [[2511.21654|EvilGenie]] 各自度量 Agent 通过捷径/破坏验证机制获得奖励的倾向，是安全评测与 Agent 评测的重要交叉点。
- **欺骗 OOD 场景**：[[2605.03242|Enhancing Agent Safety Judgment]] 通过受控基准重写和类比推理，评估 Agent 在分布外欺骗场景下的安全判断。
- **过度拒答**：Health-ORSC-Bench (arXiv 2604.27249) 系统度量医疗场景中模型的过度拒答行为（over-refusal）——为安全而牺牲实用性是另一种失败模式。
- **黑暗模式**：[[2604.16980|DarkPatterns-LLM]] 检测 LLM 是否生成欺骗性、操纵性、有害用户决策的内容。
- **真正可靠性**：[[2605.11209|Measuring Five-Nines Reliability]] 提出 sample-efficient 评估方法，论证当前安全评测在饱和区间的**统计估计本身不可靠**（详见 [[benchmark-saturation]]）。
- **数学评测稳健性**：[[2602.17072|BankMathBench]] 在银行场景数值推理上发现领域迁移导致的稳健性下降。
- **临床推理**：[[2506.08584|CounselBench]] 100 位心理健康专家共同评估 LLM 在心理咨询场景的对抗性失败模式。

整体趋势：安全评测正从"是否生成有害内容"扩展到**专业领域上限**（如生物安全） + **行为偏离**（奖励黑客、过度拒答）+ **统计可靠性**三个维度。

## 相关页面

- [[HarmBench]]
- [[TruthfulQA]]
- [[benchmark-contamination]]
- [[benchmark-gaming]]

## 近期相关研究（arXiv 2026-05 自动入库）

> 以下为 ingest pipeline 筛出的高质量 LLM 评测论文（quality ≥18/25），自动关联到本页主题。

- [[2508.14925|MCPTox: A Benchmark for Tool Poisoning Attack on Real-World MCP Servers]] · Zhiqiang Wang 等 · score 20/25
- [[2510.02271|InfoMosaic-Bench: Evaluating Multi-Source Information Seeking in Tool-Augmented Agents]] · Yaxin Du 等 · score 19/25
- [[2603.11481|INFACT: A Diagnostic Benchmark for Induced Faithfulness and Factuality Hallucinations in Video-LLMs]] · Junqi Yang 等 · score 19/25
- [[2410.09997|Collu-Bench: A Benchmark for Predicting Language Model Hallucinations in Code]] · Nan Jiang 等 · score 19/25
- [[2604.12311|Is Vibe Coding the Future? An Empirical Assessment of LLM Generated Codes for Construction Safety]] · S M Jamil Uddin 等 · score 18/25
- [[2510.04849|When Models Lie, We Learn: Multilingual Span-Level Hallucination Detection with PsiloQA]] · Elisei Rykov 等 · score 18/25
- [[2409.19492|MedHalu: Hallucinations in Responses to Healthcare Queries by Large Language Models]] · Vibhor Agarwal 等 · score 18/25
