---
title: "2026 LLM 评测推荐组合（按场景）"
type: synthesis
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-19"
last_verified: "2026-05-19"
sources:
  - "https://lmarena.ai/"
  - "https://epoch.ai/benchmarks/"
  - "https://artificialanalysis.ai/"
  - "https://livecodebench.github.io/"
domain:
  - synthesis
  - methodology
---

# 2026 LLM 评测推荐组合（按场景）

> 目标读者：在 2026-05 当前节点要为某类模型 / 产品 / 安全场景选评测组合的研究员与产品 / 安全工程师。每个场景给出「必报 + 建议 + 严苛 ablation」三档。

## 通用原则（先看这里）

1. **多 benchmark 而非单分数**：单一 benchmark 都有被 hack 的风险
2. **混合饱和 + active 两类**：饱和 benchmark 作历史可比，active 作真实区分
3. **必报评测协议**：shot / CoT / tools / sampling / scaffold
4. **报告 frontmatter `as_of_date`**：分数与时间强绑定，6 个月以上未刷新视为过期
5. **同一指标三档对比**：典型场景模型 / 当前 SOTA / 你的模型

---

## 场景 1：通用 base / instruct LLM 发布

**必报基础线**（社区共识，论文标配）：
- **知识**：MMLU / MMLU-Pro
- **数学**：GSM8K + MATH-500
- **代码**：HumanEval+ / EvalPlus + MBPP+
- **推理**：BBH
- **多语言**：MMLU 各语种 + Multilingual MMLU
- **指令遵循**：IFEval
- **真实世界对话**：Chatbot Arena Elo（或对应 LMArena 子排行榜）

**建议加强**：
- LiveCodeBench（cutoff 后窗口）—— 防代码污染
- GPQA Diamond —— 研究生级推理
- TruthfulQA —— 防 hallucination
- BIG-Bench Hard
- MMLU-Pro 替代 MMLU（不饱和、更强区分）

**严苛 ablation**：
- FrontierMath（数学 frontier）
- HLE（Humanity's Last Exam）
- BBH-CoT-vs-Direct ablation
- 多语言 IFEval / mIFEval

---

## 场景 2：推理模型（o1 / R1 / Claude Thinking / QwQ 类）

**必报**：
- **AIME 2024 + 2025 + 2026**（maj@64）
- **MATH-500** + GSM8K（基线）
- **GPQA Diamond**
- **HumanEval+ / LiveCodeBench**
- **Chatbot Arena Hard prompts 子集 Elo**

**建议**：
- FrontierMath（真 frontier）
- HLE
- USAMO / IMO 形式化（最新一年）
- BIG-Bench Hard
- Self-consistency / best-of-N ablation 报告

**严苛**：
- miniF2F-Lean4 / PutnamBench（形式化证明）
- 私有 hold-out test set
- compute-matched comparison（同 FLOP 对照）

---

## 场景 3：代码 / agent / coding assistant

**必报**：
- **SWE-bench-Verified**（必须报 scaffold）
- **LiveCodeBench**（cutoff 后窗口）
- **HumanEval+ / EvalPlus** + **MBPP+**
- **MultiPL-E**（多语言代码）

**建议**：
- BigCodeBench / CRUXEval（代码理解 + bug detection）
- tau-bench-code（多轮 agent）
- Terminal-Bench（shell + file ops）
- SWE-bench Multimodal / Pro

**严苛**：
- SWE-bench Pro（更新 + 更难）
- OSWorld（OS-level agent）
- 私有 hold-out repo set
- mutation-strengthened test（参考 SWE-ABS）

---

## 场景 4：多模态模型（VLM / VLA）

**必报**：
- **MMMU**（英文）
- **MathVista**（多模态数学）
- **MMVet**（综合）
- **MMBench**（细分能力）

**建议**：
- CMMMU（中文多模态）
- DocVQA / ChartQA
- HallusionBench（多模态 hallucination）
- Video-MME（视频）
- InfiniBench（长视频）

**严苛**：
- VCR-Bench / Real-World VQA
- Embodied AI（Habitat / BEHAVIOR-1K）
- VLA-Bench / OpenVLA-Bench

---

## 场景 5：长上下文模型（128K+ context）

**必报**：
- **RULER**（13 子任务 / 长度档位）
- **NIAH**（needle in haystack 矩阵图）
- **LongBench v2**（真实下游任务）

**建议**：
- Sequential-NIAH（多针 + 顺序）
- ZeroSCROLLS
- Loong-Bench / LooGLE
- HELMET（长上下文多任务）

**严苛**：
- L-Eval（长文档真实任务）
- BABILong（长上下文推理）
- 私有 1M+ token 文档测试

---

## 场景 6：中文 / 中文优先模型（Qwen / DeepSeek / GLM / Yi / Kimi 类）

**必报**：
- **MMLU**（英文基线）
- **C-Eval** + **CMMLU**（中文知识）
- **AGIEval**（中英混合考试）
- **CMMMU**（中文多模态，若适用）

**建议**：
- GSM8K-Zh / Math-Chinese
- C-MTEB / TUDB（中文 retrieval / embedding）
- BBH-Chinese / SuperCLUE
- 中文 IFEval / FollowBench-Chinese

**严苛**：
- 中文文学 / 古文 / 方言专项
- 中文长文档（DuLeMon / LooGLE-Chinese）

---

## 场景 7：安全 / red-teaming

**必报**：
- **HarmBench**
- **AdvBench**
- **WMDP**（生物 / 化学 / 网络危险知识）
- **JailbreakBench**

**建议**：
- TruthfulQA / FActScore（hallucination）
- TrustLLM
- BBQ / DiscrimEval（bias）
- ASR @ jailbreak

**严苛**：
- METR 危险能力评测
- Anthropic / OpenAI red-team 报告
- Cyber capability eval（CyberSecEval）

---

## 场景 8：AI for Science / 科学 frontier

**必报**：
- **GPQA Diamond**
- **MATH** + AIME
- **CASP / AlphaFold 类**（蛋白质）
- **FrontierMath**

**建议**：
- HLE
- ChemBench / MoleculeNet
- BioLogic-Bench / PubMedQA
- SciBench / OmniScience

**严苛**：
- 私有领域专家 hold-out
- 实验验证（湿实验对照）

---

## 已知失效组合 / 不推荐

- ❌ 只报 MMLU + HumanEval：均饱和，无信息量
- ❌ Chatbot Arena 单一指标：用户群偏差，无法区分专业能力
- ❌ 任何 benchmark 不报评测协议
- ❌ Agent benchmark 不报 scaffold
- ❌ LLM-judge 不做 length-controlled
- ❌ AIME / GPQA 单次 run 报告（题量太小）
- ❌ 全部用模型 cutoff 之前的题（污染风险）

## 工具推荐

- **lm-evaluation-harness**：base / instruct 综合评测
- **OpenCompass**：中文友好的综合套件
- **HELM**：研究级综合 + 元数据
- **vLLM-evaluator** / **Inspect AI**（UK AISI）：安全 / agent 友好

## 维护节奏

- **每季度更新本页 sota 数据**
- **每年 1 月 + 7 月重新审视「饱和 vs active」分类**
- **新 frontier model 发布后 1 周内补 sota**

## 相关页面

- [[choose-math-benchmark]] · [[choose-code-benchmark]] · [[benchmark-pitfalls-cheatsheet]]
- [[Chatbot-Arena]] · [[MMLU]] · [[MMLU-Pro]] · [[GPQA]] · [[AIME]] · [[SWE-bench-Verified]] · [[LiveCodeBench]] · [[IFEval]]
- [[benchmark-saturation]] · [[evaluation-reproducibility-crisis]]
- [[safety-eval-landscape]]
