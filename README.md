# LLMEvaluationWiki

中文 LLM 评测知识库。基于 [Karpathy LLM Wiki 范式](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)，由 AI agent 持续维护的结构化复利知识库。

## 导读

- **[AGENTS.md](./AGENTS.md)** — AI 操作手册（schema 规范、ingest SOP、操作权限边界）
- **[index.md](./index.md)** — 全量目录（由脚本自动生成）
- **[log.md](./log.md)** — 变更审计日志

## 目录结构

```
wiki/
├── benchmarks/    评测集（MMLU、SWE-bench 等）
├── concepts/      评测范式、能力维度、统计方法学
├── tools/         评测工具链（lm-eval-harness、OpenCompass 等）
├── leaderboards/  榜单规则页
├── entities/      机构、关键研究者、模型厂商
├── sources/       每个 raw 源的摘要页
├── synthesis/     跨切面综合（前沿议题 / 批判 / 实战手册）
└── industry/      行业垂类（代码 / 医疗 / 法律 / 金融 / 教育）

raw/               原始素材（private submodule，不公开）
scripts/           维护脚本（index 重建 / frontmatter 校验 / lint）
99-Meta/           项目元文档（维护规划、术语表、时间线）
```

## 三个核心操作

| 命令 | 作用 |
|------|------|
| `/ingest <source>` | 读源 → 写 sources/ 摘要 → 更新相关 wiki 页 → 重建 index → append log |
| `/query <question>` | 查 wiki → 综合答案 → 有价值时回填 synthesis/ |
| `/lint` | 检查矛盾 / 过期 / 孤儿页 / schema 错误 / 死链 / draft 积压 |

详见 [AGENTS.md](./AGENTS.md)。

## 维护制度

- **每周 ~1h**：审 draft 队列 + 决定下周 ingest 优先级
- **每月 ~1h**：跑 lint + 检查 benchmark 饱和情况
- **每季 ~2h**：随机抽 10 页核对准确率 + 更新 schema

详见 [99-Meta/maintenance-plan.md](./99-Meta/maintenance-plan.md)。

## 原始素材

`raw/` 是独立的私有 submodule（`LLMEvaluationWiki-raw`），包含论文 PDF、榜单快照、博客全文归档。不随本 repo 公开。

```bash
# 首次 clone 后同步 raw（需有私有 repo 权限）
git submodule update --init
```

## 许可与声明

wiki 内容客观中立，严格引用一手文献。benchmark 数据引用时标注来源快照日期。详见 [99-Meta/license-and-disclaimer.md](./99-Meta/license-and-disclaimer.md)。
