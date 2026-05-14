---
title: "与人类判断的相关性（Correlation with Human Judgment）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources:
  - "Callison-Burch, C., et al. (2006). Re-evaluating the Role of BLEU in Machine Translation Research. EACL 2006."
  - "Freitag, M., et al. (2022). Results of the WMT22 Metrics Shared Task. WMT 2022."
---

# 与人类判断的相关性

## 定义

**与人类判断的相关性（Correlation with Human Judgment）**是评测自动评测指标有效性的核心标准，衡量自动指标给出的分数排名与人类评估者判断之间的一致程度。如果一个自动指标与人类判断高度相关，则认为它是有效的代理指标；相关性低则说明指标测量的不是人类真正关心的维度。

## 测量方法

### 系统级相关性（System-level Correlation）
计算不同系统的自动指标分数与人类评测分数之间的相关系数，通常使用：
- **Pearson 相关系数**（r）：线性相关强度
- **Spearman 等级相关系数**（ρ）：排名一致性
- **Kendall's τ**：成对比较中的排名一致性

系统级相关性通常较高（BLEU 在系统级约 0.9+），因为它平均了大量样本的噪声。

### 句子/样本级相关性（Sentence-level Correlation）
对每个单独样本计算相关性，挑战性更大（BLEU 在句子级约 0.3-0.5）。

### 段落/文档级（Document-level）
介于两者之间。

## 主要应用场景

### 机器翻译指标评测
WMT Metrics Shared Task 每年评测各种翻译自动指标与 MQM 人工评测的相关性，是该领域的权威参考：
- BLEU（n-gram 重叠）与人类判断相关性：系统级约 0.9，句子级较低
- COMET（基于预训练模型）：系统级 > 0.95，句子级也显著优于 BLEU
- GEMBA-MQM（GPT-4 作为评判者）：在近年竞赛中达到顶尖水平

### LLM 生成质量评测
MT-Bench、Chatbot Arena 等研究验证了 GPT-4-as-judge 与人类偏好的相关性：
- GPT-4 评判与人类判断的一致率约 80-85%
- 人类之间的一致率约 81%，说明 GPT-4 评判接近人类内部一致性上限

### 摘要与文本生成
ROUGE 指标与人类质量判断的相关性长期被质疑（尤其在内容质量维度），推动了 BERTScore、QAEval 等更好的替代指标发展。

## 影响相关性的因素

1. **评测粒度**：系统级 > 文档级 > 句子级，粒度越细相关性越难保证
2. **任务类型**：翻译类任务（有参考答案）比开放生成类（主观性高）更容易达到高相关性
3. **人类评测质量**：若人类评测本身标注一致性低，自动指标与之高相关也无意义
4. **分布范围**：若被比较系统的质量差异较大（如将差系统与顶尖系统比较），相关性往往虚高

## 注意事项

- **高相关不等于高精度**：系统级高相关可能掩盖了指标在个别样本上的大量错误
- **域依赖性**：在翻译任务中高度相关的指标，在其他生成任务中可能表现不同
- **人类评测标准问题**：使用不同人工评测协议（如 DA vs. MQM）作为"金标准"，自动指标的相关性结论可能不同

## 相关概念

- [[Pearson-correlation]]：最常用的线性相关系数
- [[Spearman-correlation]]：排名相关系数
- [[Kendall-tau]]：成对比较排名一致性
- [[meta-evaluation]]：相关性分析是元评测的核心工具
