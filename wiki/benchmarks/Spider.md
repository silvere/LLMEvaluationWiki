---
title: "Spider"
type: benchmark
publish: true
author_mode: llm
confidence: draft
as_of_date: "2026-05-14"
last_verified: "2026-05-14"
domain: [code]
language: en
year: 2018
authors: ["Tao Yu", "Rui Zhang", "Kai Yang", "Michihiro Yasunaga", "Dongxu Wang", "Zifan Li", "James Ma", "Irene Li", "Qingning Yao", "Shanelle Roman", "Zilin Zhang", "Dragomir Radev"]
arxiv_id: "1809.08887"
official_url: "https://yale-lily.github.io/spider"
license: "CC BY-SA 4.0"
size: 10181
format: code
status: active
saturation_threshold: 0.95
sources:
  - "https://arxiv.org/abs/1809.08887"
  - "https://yale-lily.github.io/spider"
---

# Spider

> 耶鲁大学发布的跨领域Text-to-SQL基准，包含10181个问题和对应SQL查询，跨越200个数据库和138个不同领域，是Text-to-SQL研究领域最重要的标准基准之一。

## 概述

Spider由Yu等人于2018年（Yale LILY实验室）发布，是Text-to-SQL任务的标志性基准。与早期Text-to-SQL数据集（如ATIS、WikiSQL）相比，Spider的最大特点是**跨数据库泛化**：测试集中的数据库和问题在训练时完全不可见，要求模型具备真正的泛化能力。

数据集包含10181个{问题, SQL查询}对，覆盖138个领域（体育、医疗、教育、商业等）的200个数据库，每个数据库平均有5.1个表和6.4列。SQL查询难度分为简单、中等、困难和额外困难四个级别，涵盖多表JOIN、子查询、聚合函数、GROUP BY等复杂SQL语句。

Spider的发布推动了整个Text-to-SQL领域的快速发展，催生了大量后续工作和数据集（如SParC、CoSQL、BIRD等）。

## 规格

| 属性 | 值 |
|------|-----|
| 总题量 | 10,181 道 |
| 数据库数量 | 200 个 |
| 覆盖领域数 | 138 个 |
| SQL难度级别 | 简单/中等/困难/额外困难 |
| 评测指标 | 精确集合匹配（Exact Match）/ 执行准确率（Execution Accuracy） |
| 数据来源 | 众包标注 |

## SOTA 表现

| 模型 | 开发集精确匹配 | 测试集精确匹配 |
|------|-------------|-------------|
| 顶级微调模型（2024） | ~90%+ | ~88%+ |
| GPT-4（zero-shot） | ~80% | ~75% |
| DAIL-SQL + GPT-4 | ~86.6% | ~83.6% |

注：随着LLM能力提升，Spider难度对顶级模型已接近饱和，更难的BIRD等基准逐渐取代其地位。

## 主要挑战与局限

- **逐渐饱和**：顶级模型在Spider上的准确率已超过85%，区分度下降，相关研究转向更难的基准。
- **数据库规模有限**：实际生产环境中数据库往往有数百个表和更复杂的结构，Spider的数据库规模相对简单。
- **评测指标局限**：精确匹配指标可能因SQL等价写法不同而错判正确答案，执行准确率更可靠但也存在边界情况。
- **数据污染**：Spider已发布多年，训练数据中大量包含Spider题目，影响zero-shot评测的可靠性。
- **领域分布**：训练集和测试集的领域分布不完全平衡。

## 相关页面

- [[BIRD]]
- [[InterCode]]
- [[HumanEval]]
