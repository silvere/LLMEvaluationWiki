---
title: "dom 维度：领域专项 / Domain-specific"
type: synthesis
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-22"
last_verified: "2026-05-22"
review_status: "未审阅（LLM 起草 + 自动表）"
next_review_due: "2026-08-22"
sources:
  - "https://crfm.stanford.edu/helm/medhelm/"
  - "https://hazyresearch.stanford.edu/legalbench/"
derived_from: "wiki/{industry,benchmarks,papers}/*.md 的 frontmatter dimension=dom 聚合"
dimension: dom
domain:
  - other
---

# dom 维度：领域专项 / Domain-specific

> ⚠️ **Draft 状态**：本页 Tier 1 框架 + Tier 3 推荐为 LLM 起草未审阅；Tier 2 横向对比表由 `scripts/build-synthesis-tables.ts` 自动聚合。

## 覆盖范围（Tier 1 框架）

**dom 维度**覆盖按**应用领域**切分的专项评测，对应 wiki 中的 `wiki/industry/` 全部内容 + `benchmarks/` 中标 `dimension: dom` 的：

| subdimension | 含义 | 典型工具 |
|---|---|---|
| **medical** | 医疗 / 药物 / 生物 / 化学 | MedHELM / MedQA / PubMedQA / drug-discovery-eval / [[medical-eval]] |
| **legal** | 法律 / 专利 / 合规 | LegalBench / LawBench / [[legal-eval]] / patent-analysis-eval |
| **finance** | 金融 | FinBen / FinanceBench / [[financial-eval]] |
| **education** | 教育 / 学术写作 / 语言学习 | EduBench / E-Eval / [[education-eval]] / academic-writing-eval |
| **scientific** | 科学研究 / 数学奥赛 / 物理 / 社科 | SciBench / [[math-olympiad-eval]] / [[physics-eval]] / [[scientific-research-eval]] |
| **embedding-eval** | 文本嵌入与向量评测（亦可放 C 维度） | MTEB / MMTEB / BEIR / MIRACL |

## 决策入门段（Tier 1 LLM 起草 / opinion）

**领域专项评测的选型原则**：

1. **医疗**：[[medical-eval]] + MedHELM（Stanford）+ MedQA 三件套；高风险，必须 hallucination 检测
2. **法律**：LegalBench（多任务）+ LawBench（中文）+ [[legal-eval]] 综合；监管合规为先
3. **金融**：FinBen（学术）+ FinanceBench（业界，Patronus AI）+ [[financial-eval]] 实战
4. **教育**：跨学科多，EduBench / E-Eval 为主，配 [[language-learning-eval]]
5. **科学研究**：[[math-olympiad-eval]] / [[physics-eval]] 等子领域单独评

## 数据来源与生成方法

- **横向对比表**：从 `wiki/{industry,benchmarks,papers,tools}/*.md` frontmatter `dimension: dom` 自动聚合
- **决策入门**：LLM 起草，未审阅

<!-- AUTO-SYN-TABLE:dimension=dom:START -->

## dom 维度 领域专项 / Domain-specific（自动生成）

> 由 `scripts/build-synthesis-tables.ts` 从各单页 frontmatter `dimension:` 字段自动聚合。**维护方式：改各单页 frontmatter，不要手改本表。**

| Benchmark / Tool | 题量 | 年份 | 评测协议 | SOTA / 备注 | Saturation |
|---|---|---|---|---|---|
| [[patent-analysis-eval|专利AI评测]] | — | — | — | — | — |
| [[code-eval|代码与软件工程AI评测]] | — | — | — | — | — |
| [[code-review-eval|代码审查AI评测]] | — | — | — | — | — |
| [[information-extraction-eval|信息抽取评测]] | — | — | — | — | — |
| [[creative-writing-eval|创意写作评测]] | — | — | — | — | — |
| [[chemistry-eval|化学AI评测]] | — | — | — | — | — |
| [[medical-imaging-eval|医学影像AI评测（多模态）]] | — | — | — | — | — |
| [[medical-eval|医疗AI评测]] | — | — | — | — | — |
| [[compliance-eval|合规AI评测]] | — | — | — | — | — |
| [[multilingual-eval|多语言AI评测]] | — | — | — | — | — |
| [[academic-writing-eval|学术写作AI评测]] | — | — | — | — | — |
| [[customer-service-eval|客服AI评测]] | — | — | — | — | — |
| [[dialogue-systems-eval|对话系统评测]] | — | — | — | — | — |
| [[hallucination-eval|幻觉专项评测]] | — | — | — | — | — |
| [[psychological-eval|心理健康AI评测]] | — | — | — | — | — |
| [[instruction-following-eval|指令跟随专项评测]] | — | — | — | — | — |
| [[reasoning-eval|推理能力专项评测]] | — | — | — | — | — |
| [[recommendation-eval|推荐系统AI评测]] | — | — | — | — | — |
| [[education-eval|教育AI评测]] | — | — | — | — | — |
| [[math-olympiad-eval|数学竞赛 AI 评测]] | — | — | — | — | — |
| [[data-analysis-eval|数据分析AI评测]] | — | — | — | — | — |
| [[summarization-eval|文本摘要评测]] | — | — | — | — | — |
| [[document-understanding-eval|文档理解评测]] | — | — | — | — | — |
| [[accessibility-eval|无障碍AI评测]] | — | — | — | — | — |
| [[translation-eval|机器翻译评测]] | — | — | — | — | — |
| [[RAG-eval|检索增强生成评测]] | — | — | — | — | — |
| [[legal-eval|法律AI评测]] | — | — | — | — | — |
| [[physics-eval|物理AI评测]] | — | — | — | — | — |
| [[biology-eval|生物AI评测]] | — | — | — | — | — |
| [[knowledge-graph-eval|知识图谱AI评测]] | — | — | — | — | — |
| [[social-science-eval|社会科学AI评测]] | — | — | — | — | — |
| [[scientific-research-eval|科学研究AI评测]] | — | — | — | — | — |
| [[cybersecurity-eval|网络安全AI评测]] | — | — | — | — | — |
| [[autonomous-agents-eval|自主代理评测]] | — | — | — | — | — |
| [[drug-discovery-eval|药物发现AI评测]] | — | — | — | — | — |
| [[language-learning-eval|语言学习AI评测]] | — | — | — | — | — |
| [[software-debugging-eval|软件调试AI评测]] | — | — | — | — | — |
| [[financial-eval|金融AI评测]] | — | — | — | — | — |

_共 38 条，最后更新：2026-05-22_

<!-- AUTO-SYN-TABLE:dimension=dom:END -->

## 相关页面

- [[medical-eval]] · [[legal-eval]] · [[financial-eval]] · [[education-eval]] · [[scientific-research-eval]]
- [[dimension-A-foundation]]（通用能力评测）
- [[dimension-C-rag]]（嵌入评测 MTEB 同时挂 C）
- [[benchmark-pitfalls-cheatsheet]]
