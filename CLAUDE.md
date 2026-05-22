# CLAUDE.md — LLMEvaluationWiki 操作经验手册

> 本文件是 Claude Code 针对此项目的经验积累，记录已踩过的坑、可靠流程和机制约束。
> 每次 session 结束后如有新发现，请在对应章节追加。

---

## 1. 项目快速上手

```
主仓库：  /Users/jingweisun/Code/LLMEvaluationWiki/
wiki 内容：wiki/（8 大目录）
静态站点：quartz/（Quartz v4 submodule）
构建输出：quartz/public/
本地预览：http://localhost:8083（python server PID 可能不固定，用 ps aux | grep 8083 确认）
```

### 常用命令（均从仓库根目录执行）

```bash
npm run build-index     # 重建 wiki/index.md（主页）
npm run fix-links       # 修复 sources/ 下中文 wikilink → 英文 slug
npm run check-all       # fix-links + validate + build-index + lint 全套检查
npm run validate        # 校验 frontmatter 必填字段
npm run lint            # 检查 wiki 规范

# Quartz 重建（耗时约 30s，必须在 quartz/ 目录内执行）
cd quartz && npx quartz build --directory ../wiki
```

### 服务器启停

```bash
# 查看当前服务器 PID
ps aux | grep wiki_server

# 重启服务器（旧 PID 替换实际值）
kill <PID>
python3 /tmp/wiki_server.py /Users/jingweisun/Code/LLMEvaluationWiki/quartz/public 8083 &
```

---

## 2. 已踩坑 — 必读

### 2.1 wiki_server.py 的 arXiv ID 404 问题

**现象**：`/sources/2404.07440` 返回 404，但 `2404.07440.html` 文件存在。

**根因**：`os.path.splitext("2404.07440")` 返回 `("2404", ".07440")`，脚本误以为已有扩展名，不走 `.html` fallback。

**修复**（`/tmp/wiki_server.py`）：
```python
# 错误写法
if not os.path.exists(path) and not os.path.splitext(path)[1]:

# 正确写法——直接判断 .html 是否存在
if not os.path.exists(path) and os.path.exists(path + ".html"):
```

**影响范围**：所有含点号的文件名（arXiv ID、版本号如 `v1.0`）都会触发此 bug。

---

### 2.2 build-index.ts 生成的 wikilink 格式

**现象**：侧边栏条目点击后 404。

**根因**：`[[完整标题]](path)` 中的 wikilink 部分用全标题，Quartz 按 slug（basename）解析，找不到匹配文件。此外，`[[wikilink]](path)` 这种格式会让 Quartz 把括号内路径当 markdown href，导致链接指向错误目录。

**正确格式**（当前 build-index.ts 已修复）：
```typescript
// 用文件 basename 作 slug，全标题作显示名
const slug = p.file.replace(/\.md$/, "").split("/").pop() ?? p.title;
const wikilink = slug === p.title ? `[[${slug}]]` : `[[${slug}|${p.title}]]`;
lines.push(`- ${wikilink}${cb}...`);  // 不要拼 (path)，否则 Quartz 会误用
```

---

### 2.3 index.md 必须放在 wiki/ 目录下

**现象**：Quartz build 提示 "missing index.md home page file"，首页 `index.html` 不生成。

**根因**：Quartz 使用 `--directory ../wiki` 构建，内容根目录是 `wiki/`，而 `build-index.ts` 原本写到仓库根目录 `LLMEvaluationWiki/index.md`。

**修复**：`scripts/build-index.ts` 中 `INDEX_PATH = join(WIKI_DIR, "index.md")`（已修复）。

---

### 2.4 wikilink 死链批量治理流程

全局死链扫描脚本（在 `wiki/` 目录执行）：

```python
import os, re, glob
from collections import Counter
wiki_dir = "."
known_slugs = set()
for path in glob.glob("**/*.md", recursive=True):
    known_slugs.add(os.path.splitext(os.path.basename(path))[0].lower())
# 也加载 aliases
alias_re = re.compile(r'aliases:\s*\n((?:  - .+\n)+)', re.MULTILINE)
for path in glob.glob("**/*.md", recursive=True):
    for m in alias_re.finditer(open(path).read()[:600]):
        for line in m.group(1).splitlines():
            a = line.strip().lstrip('- ').strip().lower()
            if a: known_slugs.add(a)
wikilink_re = re.compile(r'\[\[([^\]|#]+)(?:\|[^\]]*)?\]\]')
broken = Counter()
for path in glob.glob("**/*.md", recursive=True):
    for lnk in wikilink_re.findall(open(path).read()):
        slug = lnk.strip().lower().replace(" ", "-")
        if slug not in known_slugs and lnk.strip().lower() not in known_slugs:
            broken[lnk.strip()] += 1
for link, count in broken.most_common():
    print(f"{count:3d}x  [[{link}]]")
```

**常见修复手段**：
- 现有页 slug 不匹配 → 在目标页 frontmatter 加 `aliases: [wrong-slug]`
- 页面不存在但高频引用（≥5x）→ 创建 stub 页
- 已删除页的残留引用 → 批量 `re.sub` 移除 wikilink
- 中文显示名 → 要么加 alias，要么用 `[[english-slug|中文名]]` 格式

---

### 2.5 Quartz 搜索索引缓存

**现象**：搜索不到新页面。

**原因**：浏览器将 `contentIndex.json` 缓存在内存中，Quartz 重建后旧索引仍生效。

**解法**：在浏览器执行强制刷新 `Cmd+Shift+R`，或开 DevTools → Network → Disable cache。

---

### 2.6 synthesis/ 必须有 sources（§7 约束）

`build-index.ts` 在构建时会校验 `wiki/synthesis/*.md` 的 `sources:` 字段，若为空则退出 code 1。
草稿放 `private/synthesis-draft/`，审阅后再挪到 `wiki/synthesis/`。

---

### 2.7 搜索别名注入机制（SearchAliases Plugin）

**背景**：Quartz 默认搜索有三个系统性问题，导致搜「tau」搜不到 `tau-bench`、搜「kappa」搜不到 Cohen's κ：

1. encoder 只把 ASCII 空白和 CJK 当 token 分隔符——`-`、`(`、`)`、全角括号 `（）`、希腊字母都粘在 token 里
   - `"τ-bench (tau-bench)"` 被切成 `["τ-bench", "(tau-bench)"]`，搜「tau」时不是任何 token 的前缀
2. FlexSearch `tokenize: "forward"` 只做**字符前缀匹配**，不做子串匹配
3. frontmatter 的 `aliases` 字段**完全没进搜索索引**

实测影响面（658 篇）：title 含括号 119 篇（18%）+ title 含希腊字母 5 篇 + 全部 aliases 失效。

**解决方案**：自研 Quartz Transformer Plugin `SearchAliases`，在 build 时给每篇 markdown 末尾追加一行可见的「Also known as: ...」脚注，把 title / aliases / slug 的切分变体（去括号、按连字符切、希腊→ASCII）作为合法 markdown 注入。Description plugin 后续转 text 时一并进 content 索引，被 FlexSearch 索引到。

**关键文件**：
- `scripts/quartz-plugins/SearchAliases.ts` — Plugin 本体（~80 行）
- `quartz/quartz.config.ts` — 在 transformers 数组末尾加 `SearchAliases()`

**Token 生成规则**：
- 整串经 `normalize()`：所有切分标点 → 单空格（apostrophe `'` 不切，避免 `Cohen's` 被拆）
- 整串 `transliterateGreek()`：τ→tau, κ→kappa, α→alpha 等 24 个希腊字母
- 按空白/括号切（保留连字符）：`"MINT (Multi-turn INteractive Tool-use)"` → `["MINT", "Multi-turn", "INteractive", "Tool-use"]`
- 长度 < 2 的丢弃；与 title 完全相同的不重复进 alias 集合
- 相邻重复词去重：`tau bench tau bench` → `tau bench tau`

**希腊字母 ASCII 转写表**（学术常用 24 个）：
```
α→alpha β→beta γ→gamma δ→delta ε→epsilon ζ→zeta η→eta θ→theta
ι→iota κ→kappa λ→lambda μ→mu ν→nu ξ→xi ο→omicron π→pi
ρ→rho σ→sigma τ→tau υ→upsilon φ→phi χ→chi ψ→psi ω→omega
```

**写新 wiki 页时的注意事项**：
- 通常**不需要**手动维护 alias——Plugin 会从 title 自动生成 ASCII 变体和切分子词
- 仅当**title 完全是中文或缩写不直观**时，才在 frontmatter 加 `aliases:`（如 LLaMA 加 `aliases: [llama]`）
- 测试 token 生成：`npx tsx -e "import { generateSearchTokens } from './scripts/quartz-plugins/SearchAliases.ts'; console.log(generateSearchTokens('你的标题', [], 'slug'))"`

**验证搜索效果**：在主仓库根目录跑
```bash
cd quartz && npx quartz build --directory ../wiki  # 重建
# 然后用浏览器搜「tau」「bench」「kappa」「multi-turn」等关键词
```

**不解决的问题**（超出 Plugin 范围）：
- 「bench」这类过于通用的关键词，tau-bench 仍排不到 top（FlexSearch ranking 限制）
- 拼音搜索 / typo 容错 / 真正的子串匹配——需要替换 Search 组件，本期未做

**升级 quartz submodule 时**：
- Plugin 文件物理上在主仓库 `scripts/quartz-plugins/`，submodule 升级不会冲突
- 唯一需 cherry-pick 的是 `quartz/quartz.config.ts` 里的 2 行改动（import + transformers 数组里加 `SearchAliases()`）

---

## 3. 内容约定

### 3.1 文件命名

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| benchmarks/ | 官方名 PascalCase | `MT-Video-Bench.md`, `GSM8K.md` |
| concepts/ | kebab-case | `benchmark-saturation.md` |
| entities/ | PascalCase | `GPT-4.md`, `LLaMA.md` |
| sources/ | 论文 slug（标题 kebab）或 arXiv ID | `mt-video-bench.md`, `2404.07440.md` |

### 3.2 wikilink 规范

- **永远用英文 slug**，中文用 alias 或 `[[slug|中文名]]` 显示
- `[[slug]]` 按文件 basename 解析（`markdownLinkResolution: "shortest"`）
- 路径中的 `/` 不影响 Quartz 的 shortest 解析，可省略目录前缀

### 3.5 benchmark `sota` 字段（必读）

每个 benchmark 页 frontmatter **应当**有 `sota:` 字段记录**完整**模型/harness 得分排行（含冠军 + 历代梯队）。脚本读 frontmatter 渲染成正文 `<!-- AUTO-SOTA -->` 区块（"## 模型得分排行"），**前 3 名自动加 🥇🥈🥉**。

```yaml
sota:
  - score: "94.3%"            # 字符串保留原文格式（含 %、约、percentile 等）
    model: "Gemini-3.1-Pro"   # wiki/models/ 的 slug
    harness: null              # 裸模型则 null；agent benchmark 填 wiki/harnesses/ 的 slug
    date: "2025-12"            # 可选：YYYY-MM 或 YYYY-MM-DD
    source: "https://..."      # 可选：权威 URL
    notes: "Diamond subset"    # 可选：子集 / 推理模式 / 配置
```

**约束**：
- `sota` 列表长度上限 30（合并方案下，单表承载完整排行）
- `model` 必须存在于 `wiki/models/`；`harness` 若填则必须存在于 `wiki/harnesses/`
- 新建 benchmark 至少填 1 条；维护时**只编辑 frontmatter**，禁止手改 `<!-- AUTO-SOTA -->` 区块
- 旧的"## 主流模型得分"区块已被 `npm run prune-legacy-scores` 一次性清除，**不再使用**
- migrate-sota 检测到已存在 sota 时**默认 noop**（避免双键 bug）；强制重新迁移需先手动从 frontmatter 删 `sota:` 块

### 3.3 必填 frontmatter

```yaml
---
title: "..."
type: benchmark|concept|tool|leaderboard|entity|source|synthesis|industry
publish: true
confidence: draft|promoted
as_of_date: "YYYY-MM-DD"
last_verified: "YYYY-MM-DD"
sources: []          # source 类型必填，synthesis 必须非空
domain:
  - ...
---
```

### 3.4 entity 类型模板（人物 / 机构）

`type: entity` 进一步用 `entity_type` 区分：`person` / `org` / `model`。

#### 人物 (`entity_type: person`) 模板

```yaml
---
title: "Full Name"               # 显示名 = 真名（英文 / 中文混排允许）
type: entity
entity_type: person
publish: true
author_mode: llm
confidence: draft
as_of_date: "YYYY-MM-DD"
last_verified: "YYYY-MM-DD"
sources: ["https://homepage.example.org", "https://scholar.google.com/..."]
aliases:
  - English variants
  - 中文名

# 人物专有字段（强烈建议填写，validate 缺失只 warn）
affiliation: "Stanford University / OpenAI"
position: "Assistant Professor / Research Scientist / PhD"
education: ["MIT PhD (YYYY)", "Stanford BS (YYYY)"]
research_focus:
  - LLM evaluation
  - Alignment
homepage: "https://..."
google_scholar: "https://scholar.google.com/citations?user=..."
arxiv_id: "https://arxiv.org/a/..."
domain:
  - entity
---

# Full Name

> 一句话定位（含最重要的关键词让搜索能命中）

## 基本信息
- **所属机构**：...
- **职位**：...
- **学历背景**：...
- **主页 / Scholar**：[link](...)

## 评测领域主要贡献
（2-4 段，每段引一篇代表论文 [[arxiv-id|Title]]，让反向链接成立）

## 代表性工作
- [[xxxx.xxxx|Paper]] — 一句话归纳
- ...

## 本 wiki 收录的该作者论文
<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:START -->
（由 scripts/sync-author-backlinks.ts 自动维护，请勿手动编辑）
<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS:END -->

## 相关页面
- [[相关机构]] / [[同领域专家]] / [[相关 benchmark / concept]]
```

#### 关键约束
- **建页前必须用 WebSearch / agent-reach 核查**：affiliation / 职位 / 代表作年份。LLM 训练记忆有截止时间，研究者跳槽常见
- **不要假装有 Google Scholar / arXiv 链接**：核查不到就留空，不要编 URL
- **`<!-- AUTO-GENERATED-BY-SYNC-AUTHOR-BACKLINKS -->` 区块**由 `scripts/sync-author-backlinks.ts` 维护，手动编辑会被覆盖
- 人物页填 `aliases` 一定要含英中混合形式（让中文搜索者也能命中）

#### 半自动建页

```bash
npx tsx scripts/ingest-researcher.ts \
  --name "Jacob Steinhardt" \
  --affiliation "UC Berkeley" \
  --position "Assistant Professor" \
  --homepage "https://..." \
  --scholar "https://scholar.google.com/citations?user=..." \
  --focus "alignment, LLM evaluation"
```

生成 stub 后用户手工补「评测领域主要贡献」段，再跑 sync-author-backlinks。

---

### 3.5 benchmark 类型扩展模板（面向评测专业人员）

**动机**：原 benchmark 页模板（title / type / domain / authors / arxiv_id）只够「索引」用，但**真正做评测的工程师 / 研究员**需要知道：用几 shot？CoT 开不开？工具能用吗？分数是 accuracy 还是 pass@k？当前 SOTA 多少？还在饱和前吗？跨论文对比要注意什么坑？

为此 benchmark frontmatter 在原有字段基础上，**强烈建议**填以下 6 个新字段（validate-frontmatter 仅 warn 不阻断）：

```yaml
---
title: "MMLU"
type: benchmark
# ...原有字段照旧...

# === 新增：评测专业字段 ===
evaluation_protocol:
  default_shots: "5-shot"        # 0-shot / 5-shot / few-shot / agent-driven
  default_cot: false              # 默认是否启用 chain-of-thought
  tool_use: false                 # 是否允许工具调用
  scoring: "accuracy"             # accuracy / pass@k / Elo / Bradley-Terry / LLM-judge / % resolved
  isolation: null                 # 沙箱要求（agent benchmark 用，如 "Docker container per task"）

saturation_status: "saturated"    # active / saturated / deprecated（必填）
# 判定标准：
#   active = 顶级模型 < 90% 且区分度仍可观
#   saturated = 顶级模型 ≥ 90% 接近人类上限 / 头部模型差距 < 1-2 个百分点
#   deprecated = 已被强证明数据污染严重 或 被更好的 successor 完全取代

official_leaderboard: "https://..."  # 官方排行榜 URL（如有）
license: "MIT / CC-BY-4.0 / Apache-2.0 / 自有 / 待更新"

pitfalls:                          # 公平对比 / 复现注意事项（list）
  - "MMLU 选项位置偏差：模型偏好 A 答案，跨模型对比时建议 shuffled run"
  - "已知预训练数据污染（多项研究报告主流 base model 含相关测试集网页文本）"
  - "MMLU 子学科题量不均（每科 100-300 题），单科分数方差大"

sota:                              # 当前 SOTA（list，可写多个梯队）
  - score: "90.8%"
    model: "DeepSeek-R1"
    harness: null                  # agent benchmark 必填 scaffold 名
    notes: "5-shot, no CoT"
  - score: "90.2%"
    model: "GPT-4.1"
    harness: null
---
```

#### 字段约束 / 红线

- **`saturation_status` 必填**：让读者一眼判断该 benchmark 是否还值得跑。
- **`sota` 列表里每条必须带 `score + model`，并依赖 frontmatter 顶层 `as_of_date` 标记快照时间**：分数与时间强绑定，6 个月以上未刷新的 SOTA 视为过期。
- **`pitfalls` 至少 2 条**：评测专家页面的核心价值，少于 2 条说明该页未充分调研。
- **agent / code-patch / sandbox 类 benchmark `evaluation_protocol.isolation` 必填**：如 SWE-bench Verified、tau-bench、OSWorld。
- **`current_sota` 字段名不推荐**：使用 `sota` 列表（已在 SWE-bench-Verified / Chatbot-Arena 落地）。

#### 跨页面横向对比要求

凡是同类 benchmark（数学 / 代码 / 安全 / 长上下文 / 多模态 / agent），**都要在 `相关页面` 互链**，并由 synthesis/ 下的「选基准决策树」横向编排。

写好新 benchmark 页后验证：
```bash
npm run validate                    # 检查 frontmatter
cd quartz && npx quartz build --directory ../wiki   # 站点构建
```

---

### 3.6 synthesis 内容生成 SOP（必读）

**底层逻辑**：synthesis 不是「LLM 写一份新文档」，而是「**从已 grounded 的 atomic 单页 aggregate 出横向视角**」。原子事实只在单页 frontmatter 维护一份，横向对比 / pitfall rollup 由脚本自动派生，叠加 LLM 起草的决策树和编辑判断作为薄薄一层 opinion。

#### 三档内容 Tier（必须在 synthesis 页里区分）

| Tier | 类型 | 谁生成 | 标记方式 | 例子 |
|---|---|---|---|---|
| **Tier 1** | 框架 / 结构 | LLM 起草 | 「[Tier 1] LLM 起草，未审阅」声明 | 决策树形状、分类法、章节标题 |
| **Tier 2** | 事实 / 数字 | **必须 grounded** | marker 区块自动生成 + `derived_from` 字段 | 对比表、SOTA、saturation、pitfall list |
| **Tier 3** | 判断 / 推荐 | 编辑判断 | 每段标 `[opinion]` / `[Tier 3]` | 推荐组合、决策建议 |

**红线**：Tier 2 内容**不允许 LLM 直接写在 synthesis 页里**，必须从单页 frontmatter 派生（用 `scripts/build-synthesis-*.ts` 系列）。LLM 写完 Tier 1/3 后，留 marker 让脚本注入 Tier 2。

#### 三档 confidence（synthesis 升级路径）

```yaml
confidence: draft     # LLM 起草，未审阅。顶部必须挂 ⚠️ banner
confidence: reviewed  # 人工 spot-check 关键数字 + 决策树审阅
confidence: promoted  # 领域专家完整审阅 + 全部断言溯源
```

升级条件：
- `draft → reviewed`：至少 spot-check 5 处具体数字；决策树审阅一遍；推荐组合至少 3 名领域使用者反馈；保留 `[Tier]` 标记
- `reviewed → promoted`：所有断言追溯到 source URL 或 wiki 单页；编辑判断段独立标 `[opinion]`；至少 1 名领域专家全审

#### 自动 aggregation 脚本（已 ready）

| 脚本 | 输入 | 输出 |
|---|---|---|
| `scripts/build-synthesis-tables.ts` | 所有 `wiki/benchmarks/*.md` frontmatter，按 `domain` 分组 | synthesis 页 `<!-- AUTO-SYN-TABLE:domain=X:START -->` 区块 |
| `scripts/build-synthesis-pitfall-rollup.ts` | 所有 benchmark 的 `pitfalls:` 数组 | `benchmark-pitfalls-cheatsheet.md` 的 `<!-- AUTO-PITFALL-ROLLUP -->` 区块 |

**调用时机**：
- 新写 / 修改 benchmark 单页 frontmatter 后 → 跑两个脚本同步 synthesis
- 每季度 routine 全跑一次
- CI 钩子（未来）每个 PR 自动跑

#### 写新 synthesis 页时的步骤

1. **明确目标读者** 与 **核心问题**（如「数学评测选哪个」）—— 写在文件顶部
2. **frontmatter 加 `derived_from:` 字段** 列出依赖的单页
3. **顶部 banner**：`⚠️ Draft 状态：本页 X% 由 LLM 起草，对比表自动同步 grounded，决策树与推荐为编辑判断`
4. **加「数据来源与生成方法」section**：透明化每段内容的 Tier
5. **决策树 / 框架（Tier 1）**：LLM 起草，明确标
6. **对比表（Tier 2）**：留 `<!-- AUTO-SYN-TABLE:domain=X:START -->...:END -->` marker，跑脚本填充
7. **推荐组合（Tier 3）**：明确标 `[opinion]`
8. 跑 `npx tsx scripts/build-synthesis-tables.ts` + `build-synthesis-pitfall-rollup.ts` 同步
9. `npm run validate && cd quartz && npx quartz build --directory ../wiki` 验证

#### 红线 / 禁止操作

- ❌ **不允许在 synthesis 页直接写「具体数字 / SOTA」**，必须由 marker 注入或引用单页
- ❌ **不允许混用 Tier 1/2/3 而不标记**：读者必须能立即判断哪段是事实、哪段是 opinion
- ❌ **不允许声明 `confidence: reviewed / promoted` 而无审阅记录**（在 git commit 信息里说明审阅人 + 审阅日期）

---

### 3.7 评测对象 11 维度 taxonomy（dimension/subdimension 字段）

**动机**：当前 wiki 379 个 benchmark 一锅炖在 `benchmarks/`，缺乏「按评测对象类型」的二级索引。借鉴 LLM 评测圈通用的 A-K 分类（参考 artifact），引入 `dimension:` frontmatter 字段，让每页能被维度索引。

#### 维度定义（A-K + 3 横切）

| dimension | 名称 | 典型工具 |
|---|---|---|
| **A** | 基座模型/通用能力（含 Harness / Benchmark / Leaderboard） | MMLU / HellaSwag / lm-eval / HELM / Open LLM Leaderboard |
| **B** | Chat / Instruction-Following | Chatbot Arena / MT-Bench / AlpacaEval / IFEval / WildBench |
| **C** | RAG（评测 + retrieval + embedding） | RAGAs / TruLens / MTEB / BEIR / FinanceBench |
| **D** | Agent（tool-use / web-gui / software-eng / general） | AgentBench / GAIA / SWE-bench / WebArena / OSWorld / tau-bench |
| **E** | 视觉理解（VLM / LMM） | MMMU / MMBench / MathVista / Video-MME / VLMEvalKit |
| **F** | 视觉生成（T2I / T2V / I2V / preference / metric）—— **业务核心** | VBench / HEIM / GenEval / PickScore / FID / FVD |
| **G** | 音频 / 音乐生成 | AIR-Bench / AudioBench / VoiceBench / MusicBench / FAD |
| **H** | 代码能力 | HumanEval / LiveCodeBench / SWE-bench-Verified / BigCodeBench |
| **I** | 安全 / 对齐 / Red-teaming | HarmBench / JailbreakBench / WMDP / garak / PyRIT |
| **J** | 中文 | C-Eval / CMMLU / SuperCLUE / Xiezhi / CMB |
| **K** | Judge 校准 / Meta-evaluation | RewardBench / JudgeBench / PandaLM / Auto-J / Prometheus |
| **long-ctx** | 长上下文（横切，可能与其他维度共存） | RULER / NIAH / LongBench / InfiniteBench |
| **obs** | Observability / 商业评测平台（横切） | LangSmith / Langfuse / Phoenix / Braintrust / Patronus |
| **infra** | 评测基础设施（横切，非评测工具本身） | vLLM / SGLang / TGI / TensorRT-LLM |

#### subdimension（仅部分维度有）

```yaml
# A 维度
subdimension: harness | benchmark | leaderboard

# D Agent 维度
subdimension: tool-use | web-gui | software-eng | general

# F 视觉生成
subdimension: T2I | T2V | I2V | preference | metric

# I 安全
subdimension: red-team-tool | safety-benchmark | jailbreak | content-safety

# K Judge
subdimension: judge-model | judge-benchmark | reward-model
```

#### frontmatter 写法

```yaml
---
title: "RewardBench"
type: benchmark
dimension: K               # 必填（11 大档之一 + long-ctx/obs/infra）
subdimension: judge-benchmark  # 可选（适用维度填）
infrastructure: false      # 仅 infra 维度填 true（vLLM/SGLang 等）
legacy_note: ""            # AlpacaFarm 类标 "deprecated, 推荐 X 替代"
# ...原有字段...
---
```

#### 落地策略

1. **新 stub 必填 `dimension:`**（validate-frontmatter 强校验）
2. **已有 379 benchmark / 24 tools / 4 harnesses**：用 `scripts/backfill-dimensions.ts` 基于 `domain:` 字段批量映射，缺失只 warn 不阻断
3. **`scripts/build-synthesis-tables.ts`** 支持按 dimension 分组，自动生成 11 篇 dimension index synthesis 页
4. **不强制按 dimension 重组目录**：维度是 frontmatter 索引，目录结构保持 type-based（benchmarks/ / tools/ / harnesses/）；唯二例外是 `wiki/tools/judges/` + `wiki/tools/observability/` 子目录（K + obs 工具特别集中）

#### 红线

- ❌ **新 stub 缺 `dimension:` 字段** → validate-frontmatter 报 error（阻断 push）
- ❌ **dimension 值非法**（非 A-K / long-ctx / obs / infra）→ error
- ❌ **F 维度 stub 缺 `subdimension`** → warn（业务核心维度需要分组）

---

## 4. 已建立的关键缺失页（2026-05-14 补建）

以下 stub 页是此前多处引用但缺失而导致死链的，已补建：

- `concepts/benchmark-saturation.md` (24x 引用)
- `concepts/safety-eval-landscape.md` (19x 引用，alias: AI安全评测)
- `concepts/open-vs-closed-model-eval.md` (8x 引用)
- `benchmarks/MTEB.md`
- `entities/LLaMA.md` (alias: llama)
- `entities/GPT-4.md` (alias: gpt-4, InstructGPT)
- `entities/Claude.md` (alias: claude)
- `entities/Gemini.md` (alias: gemini)

**已添加 aliases 的现有页**：
- `concepts/benchmark-contamination.md` → alias: `data-contamination`
- `leaderboards/HuggingFace-Open-LLM-Leaderboard.md` → alias: `Open-LLM-Leaderboard`
- `concepts/multimodal-eval.md` → alias: `multimodal-evaluation`, `多模态评测`
- `concepts/llm-as-judge.md` → alias: `llm-as-judge-bias`
- `tools/BIG-bench-framework.md` → alias: `big-bench`, `BIG-Bench`

---

## 5. 禁止操作（红线）

- **不得手动编辑 `wiki/index.md`**，只能通过 `npm run build-index` 生成
- **不得将 synthesis/ 下无 sources 的页面推送到公网**（见 §2.6）
- **`private/` 和 `99-Meta/` 目录不对外渲染**（已在 `ignorePatterns` 中）
- **sources/ 文件内部人员姓名不得出现**（如阅读组成员名字）
- **不得修改 `quartz/` submodule 代码**，可改的 submodule 文件白名单（均为 Quartz 官方预留的 user override 口子）：
  - `quartz/quartz.config.ts` — 站点配置、plugins 注册
  - `quartz/quartz.layout.ts` — 页面布局/组件挑选
  - `quartz/quartz/styles/custom.scss` — 自定义 CSS 覆盖（上游永远不动此文件）
