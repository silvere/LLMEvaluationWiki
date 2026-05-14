---
title: "能力激发（Capability Elicitation）"
type: concept
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
sources: []
---

# 能力激发（Capability Elicitation）

> 通过设计不同 prompt 策略、解码方式和评测协议，最大化展示 LLM 在特定任务上的真实能力上限的方法论。

## 定义

能力激发（Capability Elicitation）关注的核心问题是：模型在特定任务上的最佳可能表现是什么？区别于日常评测中测量"平均表现"或"默认设置下的表现"，能力激发旨在找到能充分展示模型潜力的最优条件。

能力激发的主要手段：
- **Prompt 策略**：Few-shot、Chain-of-Thought、Self-Consistency、思维链变体
- **解码策略**：提高温度增加多样性（Pass@k）、beam search 提升质量
- **分解策略**：将复杂任务分解为子任务，分步求解
- **角色指令**：给模型特定角色（"你是专业的数学家"）
- **工具使用**：允许调用外部计算器/搜索等工具

## 重要性（在 LLM 评测中）

能力激发是 LLM 评测方法论的基础问题之一：

1. **评测真实能力上限**：未经激发的默认评测可能严重低估模型能力（如不使用 CoT 评测推理）
2. **安全评测关键**：发现潜在危险能力需要主动激发，若只用默认方式评测可能遗漏危险能力
3. **基准公平性**：不同模型对相同激发策略的响应程度不同，需标准化激发条件
4. **研究一致性**：两篇论文使用不同激发策略的结果无法直接比较

## 主要方法/实现

**激发效果阶梯**（以推理任务为例）：
```
默认 zero-shot → +few-shot → +CoT → +自一致性 (k=40) → +工具
  60%           75%         85%      92%               95%
```

**系统性激发测试框架**：
```python
# 对同一任务应用多种激发策略，报告最优结果和条件
strategies = [
    zero_shot_eval,
    few_shot_eval(k=5),
    chain_of_thought_eval,
    self_consistency_eval(k=40),
]
results = {name: evaluate(strategy, test_set) 
           for name, strategy in strategies}
```

**安全能力激发**：Anthropic、DeepMind 等在发布模型前会主动尝试多种激发策略来发现危险能力，这与标准性能评测中的激发目标相同但方向相反（寻找上限而非寻找缺陷）。

**Few-shot 示例优化**：用验证集选择最优 k 个示例，而非随机选取，可显著提升激发效果。

## 局限与挑战

- **激发边界不清**：理论上无限制的 prompt 工程可以持续提升性能，"真实上限"无法完全确定
- **过度激发的公平性问题**：若仅对特定模型进行精细激发优化，比较不公平
- **计算成本**：自一致性等方法消耗大量计算，不适合日常评测
- **激发 vs 训练数据差异**：激发效果高度依赖模型预训练数据与激发格式的匹配程度
- **安全对齐与能力激发的张力**：部分有用能力可能被安全过滤器限制，区分"真实能力被对齐阻碍"与"真实能力不存在"是重要研究问题

## 相关页面

- [[in-context-learning]] — 能力激发的核心技术
- [[self-consistency]] — 通过多次采样激发推理能力
- [[chain-of-thought-eval]] — 思维链作为推理能力激发方法
- [[prompt-sensitivity]] — 能力激发与提示敏感性的关系
- [[zero-shot-evaluation]] — 激发前的基线测量
