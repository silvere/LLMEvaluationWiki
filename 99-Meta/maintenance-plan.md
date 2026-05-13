# LLMEvaluationWiki 维护规划

> 本文件是项目内常驻版本的维护规划。完整规划见规划文档历史（已归档）。

---

## 核心设计原则

1. **wiki 是复利资产**：每个新源进来，wiki 变得更密、更可靠
2. **AI 写，人审**：AI 负责 ingest/write/update，人负责裁决矛盾、推进 confidence
3. **客观中立**：批判必须基于已发表文献，不带厂商褒贬
4. **Schema 是宪法**：AGENTS.md 是 AI 操作的唯一规范，协同进化

---

## 技术架构

| 层 | 工具 | 说明 |
|----|------|------|
| 编辑环境 | Obsidian | wikilink、Dataview、本地预览 |
| 知识层 | wiki/（本 repo） | LLM 维护的结构化知识 |
| 原始材料 | raw/（private submodule） | 不公开，LLM 只读 |
| 发布 | Quartz v4 + Cloudflare Pages | 只发布 publish:true 页面 |
| CI | GitHub Actions | frontmatter 校验 + link check |

---

## 维护节奏

### 每周 ~1h（人工）

- 看 `log.md` 了解 AI 当周做了什么
- 处理 `confidence=draft` 队列（批量推 verified 或 reject）
- 查看 `## ⚠️ Overrides` contradiction-diff，裁决矛盾
- 给下周 1–3 个 source URL（`/ingest <url>`）

### 每月 ~1h（人工）

- 跑 `/lint`，处理所有 G/H 类硬性错误，记录 B/I 类警告
- 检查 P0 benchmark 覆盖进度（见下方 checklist）
- 检查饱和 benchmark（propose status active → saturated）
- commit 月度盘点日志到 log.md

### 每季度 ~2h（人工）

- 随机抽 10 个 confidence=promoted 页，对照最新论文核对
  - 准确率 < 90% → 相关页降级为 verified 重审
- 重读高引用 synthesis 页
- 决定是否调整 schema（更新 AGENTS.md）
- `git tag v0.x`

---

## AI 操作权限速查

| 操作 | 权限 |
|------|------|
| 新建 sources/ 摘要页 | ✅ 直接 commit（draft） |
| 追加 wiki 页段落 | ✅ 直接 commit |
| 新建 benchmarks/concepts/entities 等页 | ✅ 直接 commit（draft） |
| 新建 synthesis/ 页 | ⚠️ Propose only |
| 删除任何页 | ❌ 禁止 |
| 修改 status/schema | ⚠️ Propose only |
| confidence draft→verified | ❌ 只有人工 |
| 直接编辑 index.md | ❌ 禁止（脚本重建） |

---

## 内容路线图

### 0 阶段 v0.1（骨架）✅ 进行中

- [x] git repo 建立（公开 + 私有）
- [x] AGENTS.md（schema 层）
- [x] index.md / log.md 骨架
- [ ] scripts/（validate-frontmatter、build-index、lint-wiki）
- [ ] Quartz 配置 + 本地预览
- [ ] CI workflow

### 1 阶段 v0.2（内容种子）

- [ ] 双轨整合 2026-04 综述（手动骨架 + AI ingest 对照）
- [ ] P0 20 篇 benchmarks（见下方 checklist）
- [ ] ~15 篇 concepts
- [ ] ~10 篇 tools / entities / leaderboards
- [ ] 首次完整 lint

### 2 阶段 v0.3（综合页）

- [ ] synthesis/ 前沿议题 11 篇
- [ ] synthesis/ 批判与局限 7 篇

### 3 阶段 v1.0（发布）

- [ ] Quartz + Cloudflare Pages 上线
- [ ] 贡献指南

---

## P0 Benchmark Checklist（首期必做 20 篇）

- [ ] MMLU
- [ ] MMLU-Pro
- [ ] GPQA (Diamond)
- [ ] BBH
- [ ] GSM8K
- [ ] MATH
- [ ] AIME
- [ ] HumanEval / HumanEval+
- [ ] SWE-bench Verified
- [ ] LiveCodeBench
- [ ] MMMU
- [ ] RULER
- [ ] LongBench v2
- [ ] IFEval
- [ ] MT-Bench
- [ ] Chatbot Arena (LMSYS)
- [ ] HarmBench
- [ ] TruthfulQA
- [ ] SimpleQA
- [ ] C-Eval

---

## 风险清单（按严重度）

| 风险 | 防御机制 |
|------|---------|
| Confidently wrong pages | `confidence` 字段 + 季度抽检 |
| Context poisoning 级联 | contradiction-diff + override 需人审 |
| 评测半衰期 < 6 个月 | `as_of_date` + 90d banner + benchmark status |
| Schema drift | controlled vocabulary + CI 校验 |
| Citation 幻觉 | claim/citation 分字段 + link checker |
| Index 漂移 | 脚本重建，AI 禁止直接写 |
| draft 积压 | lint I 类告警（> 20 篇）|

---

## 验收标准

**短期（v0.2 收尾）**：
1. `/ingest` 5 篇核心源，平均触达 ≥ 5 页
2. `/lint` 0 硬性错误
3. Dataview 按 type/domain/year 分组可渲染
4. Quartz 只构建 publish:true 页

**长期（v0.3 后 6 个月）**：
5. 随机抽 10 页对照论文准确率 ≥ 90%
6. 连续 8 周 ingest，draft 不积压 > 20
7. AGENTS.md 已经过 ≥ 2 次协同进化
