---
title: "人工评测协议（Human Evaluation Protocol）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 人工评测协议（Human Evaluation Protocol）

> 标准化的人类评测流程设计，规范标注任务设计、标注者招募与培训、质量控制和结果统计分析，确保人工评测结果可靠、可复现、可比较。

## 定义

人工评测协议（Human Evaluation Protocol）是系统化的评测设计框架，覆盖评测全生命周期：

1. **任务设计**：评测维度定义、评分量表选择（Likert vs 成对比较）、指南撰写
2. **标注者招募**：资质要求（语言能力、领域知识）、招募渠道（众包 vs 专家）
3. **培训与校准**：标注者培训材料、试标注、讨论会议对齐理解
4. **数据分发**：分批方式、重复标注比例（用于 IAA 计算）、样本随机化
5. **质量控制**：陷阱题（gold questions）、动态过滤低质量标注者
6. **结果统计**：IAA 计算、聚合方式（多数投票/平均分）、统计显著性检验

## 重要性（在 LLM 评测中）

严格的人工评测协议是 LLM 评测可信度的基础：

1. **RLHF 数据质量**：人工偏好标注的质量直接决定奖励模型质量，进而影响整个对齐训练
2. **基准黄金标准**：大量 LLM 基准（如 TruthfulQA 的真实性判断）最终依赖人工评测验证
3. **自动评测的校准**：LLM-as-judge 等自动评测方法需要用人工评测结果进行对比验证
4. **可复现性**：协议不清晰的人工评测无法被其他研究者复现，降低研究可信度

## 主要方法/实现

**标注指南设计原则**：
- 每个评测维度的定义需清晰，包含边界案例示例
- 区分"理解难的题"（标注者知识不足）和"标注难的题"（任务本身模糊）
- 提供高/中/低质量样本示例，帮助标注者校准绝对标准

**质量控制示例**：
```python
# 陷阱题质量控制
GOLD_QUESTIONS = {
    "question_id_001": "HELPFUL",  # 答案明显好的样本
    "question_id_002": "UNHELPFUL",  # 答案明显差的样本
}

def filter_annotator(annotator_results, gold_answers, threshold=0.8):
    gold_acc = sum(
        annotator_results[qid] == gold_answers[qid]
        for qid in GOLD_QUESTIONS
        if qid in annotator_results
    ) / len(GOLD_QUESTIONS)
    return gold_acc >= threshold
```

**最小样本量指南**：
- 单指标单模型对比：≥ 200 个样本
- 报告置信区间：≥ 500 个样本
- 多维度评测：各维度分别满足上述要求

**报告规范（ACL 推荐）**：方法部分应包含：标注者数量及背景、每样本标注者数量、IAA 指标及数值、标注者报酬/激励方式。

## 局限与挑战

- **专家 vs 众包的权衡**：专家标注质量高但成本高；众包成本低但质量控制复杂
- **标注疲劳**：长时间标注后质量下降，需限制每批次工作量
- **文化偏见**：来自特定文化/地区的标注者可能对某些内容有系统性偏见
- **标注漂移**：随时间推移，标注者对标准的理解可能改变，需定期重新校准
- **标注费率与质量**：报酬过低降低质量，但缺乏研究者间的报酬标准

## 相关页面

- [[inter-annotator-agreement]] — 评测标注质量的核心指标
- [[Likert-scale]] — 人工评测中常用的评分量表
- [[crowdsourcing-eval]] — 众包评测的具体实践
- [[preference-eval]] — 成对偏好评测的协议设计
- [[automated-eval-vs-human]] — 人工与自动评测的互补关系
