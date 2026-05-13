# AGENTS.md — LLMEvaluationWiki AI 操作手册

> 这是给所有 AI agent（Claude Code、Codex、其他工具）的"宪法"。
> 每次 ingest/query/lint 之前，AI 必须读这份文档，确保行为符合规范。

---

## 1. 项目定位

**LLMEvaluationWiki** 是一个 AI agent 持续维护的结构化 LLM 评测知识库，基于 Karpathy LLM Wiki 范式构建。

- **核心理念**：wiki 是复利资产，每个新源进来，wiki 变得更密更可靠
- **人类职责**：筛选源、提问、审稿、裁决矛盾
- **AI 职责**：写、更新、发现矛盾、维护交叉引用
- **内容立场**：客观中立 + 严格引用，不带厂商褒贬，批判必须基于已发表文献

---

## 2. 目录布局规则

```
wiki/benchmarks/    每个评测集一篇。文件名用官方名（MMLU.md、SWE-bench.md）
wiki/concepts/      评测范式、能力维度、统计概念。每个独立概念一篇
wiki/tools/         评测工具链（harness、框架）。每个工具一篇
wiki/leaderboards/  榜单规则页（排名规则 + 历次快照引用）。每个榜单一篇
wiki/entities/      机构、关键研究者、模型厂商。每个实体一篇
wiki/sources/       每篇 raw/ 源对应一个摘要页。slug = arxiv_id 或 域名-YYYY-MM-DD
wiki/synthesis/     跨切面综合分析。每个议题一篇
wiki/industry/      行业垂类。每个行业一篇

raw/papers/         论文 PDF，按 arxiv_id.pdf 命名
raw/leaderboards/   榜单 JSON 快照，YYYY-MM-DD/源名.json
raw/articles/       博客/news 全文归档
raw/reports/        机构报告（AI Index、HELM 年报等）
raw/assets/         所有截图/图表本地化（LLM 不能可靠读远程图）
```

**分类边界判断**：
- 同一 benchmark 有对应工具（如 lm-eval-harness 跑 MMLU）→ benchmark 和 tool 各一篇，互相引用
- 某榜单同时有规则和定期快照 → 规则放 `leaderboards/`，快照放 `raw/leaderboards/`
- 某研究者是 benchmark 作者 → `entities/` 有其人物页，`benchmarks/` 页面引用

---

## 3. Frontmatter Schema（强制）

所有 wiki/ 下的 markdown 文件必须包含以下 frontmatter。AI 不允许省略任何必填字段。

### 3.1 通用必填字段

```yaml
---
title: ""                  # 页面标题（与文件名对应）
type: benchmark            # 见 §3.4 controlled vocabulary
publish: true              # 控制 Quartz 是否构建（true | false）
author_mode: llm           # llm | human | mixed
confidence: draft          # draft | verified | promoted
as_of_date: YYYY-MM-DD     # ingest 日期或最近重写日期
last_verified: YYYY-MM-DD  # 最近一次人审/对源核对日期
sources: []                # wikilinks 列表，必须至少有一个来源
---
```

### 3.2 benchmark 专用字段

```yaml
domain: []                 # 见 §3.4 controlled vocabulary
language: en               # en | zh | multilingual | other
year: 2020                 # 首次发布年份
authors: []                # 主要作者列表
arxiv_id: ""               # arXiv ID（如 2009.03300），无则留空
official_url: ""           # 官方仓库或论文页面
license: ""                # 数据集许可证（MIT、CC BY 等）
size: 0                    # 题目/样本数量
format: multiple-choice    # multiple-choice | open-ended | code | dialog | other
status: active             # active | saturated | contaminated | deprecated
saturation_threshold: 0.90 # 触发"接近饱和"banner 的 SOTA 分数线
```

### 3.3 source 专用字段

```yaml
source_type: paper         # paper | blog | report | leaderboard-snapshot | talk
url: ""                    # 原始 URL
arxiv_id: ""               # 如有
authors: []
published: YYYY-MM-DD      # 原始发布日期
ingested: YYYY-MM-DD       # 进入本 wiki 的日期
license: ""                # 原文许可证（arXiv non-exclusive、CC BY 等）
discusses: []              # 本源讨论到的 wiki 页面 wikilinks
```

### 3.4 Controlled Vocabulary（固定枚举值，不允许其他写法）

**type**：
`benchmark` | `concept` | `tool` | `leaderboard` | `entity` | `source` | `synthesis` | `industry`

**status**（benchmark 专用）：
`active` | `saturated` | `contaminated` | `deprecated`

**author_mode**：
`llm` | `human` | `mixed`

**confidence**：
`draft` | `verified` | `promoted`

**domain**（benchmark 可多选）：
`knowledge` | `reasoning` | `math` | `code` | `long-context` | `instruction-following` |
`multimodal` | `safety` | `hallucination` | `bias-fairness` | `efficiency` |
`retrieval` | `agent` | `multilingual` | `dialog` | `other`

---

## 4. 命名规范

- 文件名：kebab-case（`swe-bench-verified.md`，`lm-evaluation-harness.md`）
- benchmark 文件名用**官方名**（大小写保留，连字符替换空格：`MMLU.md`、`GPQA-Diamond.md`）
- source slug：arxiv_id 优先（`2009.03300.md`），无 arXiv 则用 `域名-YYYY-MM-DD.md`
- leaderboard 快照：`raw/leaderboards/YYYY-MM-DD/source-name.json`

---

## 5. Wikilink 规范

- 第一次在页面中提及某概念/工具/实体，必须加 `[[]]` 链接
- 同一页面内同一概念只链接**第一次出现**，后续不重复
- 引用论文格式：`[作者 年份](arxiv_id)` 加 wikilink 到 sources 页（如 `[[2009.03300]]`）
- 榜单数据必须带快照日期：如"截至 2026-03-01，MMLU 最高分 92.3%（来源：[[lmsys-chatbot-arena-2026-03-01]]）"

---

## 6. 三个核心操作

### 6.1 `/ingest <source-path-or-url>`

**完整步骤**（缺任何一步都不完整）：

```
步骤 1. 读源
  - 本地文件：直接读（PDF 先读文本再看图）
  - URL：抓取全文并存到 raw/<type>/<slug>（LLM 不可靠读远程图，图必须下载到 raw/assets/）

步骤 2. 写 wiki/sources/<slug>.md
  - frontmatter：source_type、url、authors、published、ingested（今天日期）、license、discusses
  - 正文结构（必须按此顺序）：
    ## 核心主张（每条 claim 独立一行，格式：`- [CLAIM]: <陈述> [REF: 章节或页码]`）
    ## 方法论摘要
    ## 数据与结果（数字必须精确，来源必须引用）
    ## 局限与争议（作者自己承认的 + 外部批评）
    ## 相关 wiki 页
  - author_mode: llm, confidence: draft

步骤 3. 识别并列出本源涉及的 benchmarks/concepts/entities/leaderboards

步骤 4. 更新相关 wiki 页
  - 有对应页面：追加新发现的段落（标注来源），不改写已有内容
  - 无对应页面：新建，author_mode: llm, confidence: draft
  - 规则：每段追加内容末尾必须有 `> — 来源：[[source-slug]]`

步骤 5. 输出 contradiction-diff（关键步骤，不可省略）
  - 对比本次 ingest 与 wiki 现有 claim
  - 若发现冲突，以以下格式输出：
    ## ⚠️ Overrides（需人工裁决）
    | 位置 | 既有 claim | 新源 claim | 新源引用 |
    |------|------------|------------|---------|
  - 若无冲突，输出：## ✅ 无 contradiction

步骤 6. 调用 build-index（scripts/build-index.ts）重建 index.md
  - AI 不允许直接编辑 index.md

步骤 7. append log.md
  格式（严格遵守，方便 grep）：
  ## [YYYY-MM-DD] ingest | <source title> | touched: N pages | overrides: M claims | draft: K pages
```

**注意事项**：
- 引用幻觉防御：所有 claim 必须绑定具体来源（页码或章节），禁止散文式引用
- 图片：远程图片必须下载到 `raw/assets/<slug>-<描述>.png`，wikilink 引用本地路径
- 触达页数：记录实际数字，目标是 5+ 页；低于 5 页时检查是否该新建相关页面

### 6.2 `/query <question>`

```
步骤 1. 读 index.md 找相关页
步骤 2. 读相关 wiki 页（引用具体页面 + 行号）
步骤 3. 综合答案，格式：
  答案正文
  ---
  引用：[[page1]]:L23、[[page2]]:L45

步骤 4. 判断是否值得回填
  - 若答案覆盖了多个页面的综合视角且尚无对应 synthesis 页 → propose 新建 wiki/synthesis/<slug>.md
  - Propose 格式：提交一份草稿，confidence: draft，等人工确认后再 commit
```

### 6.3 `/lint`

运行 `npm run lint`（即 `scripts/lint-wiki.ts`），检查以下内容：

```
A. 矛盾：同一 benchmark 在两页有不一致的数字或 status
B. 过时：last_verified > 90 天 → 页面顶部自动加 ⚠️ banner
C. 孤儿页：无入链（被任何页面的 wikilink 引用）
D. 缺页：某 claim 提到的 benchmark/concept 没有对应 wiki 页
E. 缺交叉引用：页面间应有但缺失的 wikilink
F. 数据缺口：可通过 web search 补充的数字（如 benchmark SOTA 分数）
G. Frontmatter 错误：必填字段缺失 / controlled vocabulary 违规
H. 死链：外部 URL 不可达（HTTP 非 200）
I. Draft 积压：confidence=draft 页面数 > 20 时告警
J. Status drift：benchmark status=active 但 last_verified > 90 天且 as_of_date > 180 天
```

lint 必须 0 错误才允许发布（G、H 类为硬性，其余为警告）。

---

## 7. AI 操作权限边界

| 操作 | AI 权限 | 说明 |
|------|---------|------|
| 新建 `wiki/sources/` 摘要页 | ✅ 直接 commit | 必须 confidence=draft |
| 在已有 wiki 页**追加**段落 | ✅ 直接 commit | 追加内容标注来源 |
| 新建 `wiki/benchmarks/`、`wiki/entities/`、`wiki/concepts/`、`wiki/tools/`、`wiki/leaderboards/`、`wiki/industry/` 页 | ✅ 直接 commit | 必须 confidence=draft |
| 新建 `wiki/synthesis/` 页 | ⚠️ Propose only | 输出草稿文本，等人工确认 |
| 删除任何整页 | ❌ 禁止 | 必须人工操作 |
| 修改 frontmatter `status` 字段 | ⚠️ Propose only | 输出建议，等人工确认 |
| `confidence: draft → verified/promoted` | ❌ 禁止 | 只有人工审稿后才能推进 |
| 修改 `AGENTS.md` 或任何 schema 文件 | ⚠️ Propose only | 输出建议，等人工确认 |
| 直接编辑 `index.md` | ❌ 禁止 | 只能调用 build-index 脚本 |
| 直接编辑 `log.md` 以外的新增 | ✅ append only | 只允许 append，不允许修改已有条目 |

---

## 8. 写作风格指南

- **语言**：中文优先，专有名词（benchmark 名、人名、机构名）保留英文原名
- **立场**：客观中立，不使用"领先"、"最强"、"颠覆"等评价性词汇
- **数字**：精确引用，必须标注测量条件（shot 数、prompt 格式、日期、模型版本）
- **批判**：必须基于已发表文献，格式为"[作者 年份] 指出……"，不允许无来源批评
- **厂商中立**：不对厂商产品做正面或负面评价，只呈现公开数据和文献
- **长度**：benchmark 页 500–1500 字，concept 页 300–800 字，source 摘要页 300–600 字
- **截图/图表**：必须下载到 raw/assets/，引用本地路径，标注来源和截取日期

---

## 9. 引用规范

```
论文引用：[Hendrycks et al. 2020](https://arxiv.org/abs/2009.03300)（[[2009.03300]]）
榜单数据：截至 2026-03-01（数据来源：[[lmsys-arena-2026-03-01]]）
博客/报告：[标题](URL)（[[source-slug]]），作者，发布日期
```

**许可证安全**：
- arXiv 论文：可引用内容和数字，不可全文转载
- benchmark 题面：仅举例引用，不批量转贴（版权归原作者）
- 截图：注明来源和截取日期，仅用于说明性目的

---

## 10. 合规约束

- 引用许可证（arXiv non-exclusive / MIT / CC BY 等）必须记录在 source frontmatter
- 如数据有竞争性使用禁止条款，在 source 页面顶部注明
- 不记录任何未公开数据、内部测试数字
- 如对某机构/产品有批评性内容，必须来自同行评审文献或公开争议记录

---

## 11. AGENTS.md 协同进化

本文件是协同进化的（Karpathy 原话：CLAUDE.md 由人和 LLM 共同演化）。
- AI 发现规则有矛盾或缺失 → 在 `/query` 结果末尾或 `/lint` 输出末尾，以 **Propose AGENTS.md 修订** 格式提出
- 人工确认后，AI 更新本文件并在 log.md 记录：`## [日期] schema-update | <修改内容>`
- 每季度回顾时检查本文件是否仍与实际使用一致

---

*最后更新：2026-05-13（v0.1 初版）*
