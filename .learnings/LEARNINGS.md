# LLMEvaluationWiki — Learnings 沉淀

## [BEST_PRACTICE-20260515-001] arXiv 批量论文质量评估：本地 PDF 解析优于外部 API

**Priority**: High
**Status**: Validated（v3 成功跑通 820 候选→100 下载→90 入库）
**Area**: scripts/arxiv-ingest-*

**Summary**: 批量评估学术论文质量时，**不要依赖** Semantic Scholar / OpenAlex 这类有严格限流的外部 API。改用**本地 PDF 解析 + 多维度信号融合**。

**Details**:
- v2 用 Semantic Scholar 拿 citation/affiliation：免费版 100 req/5min，3.5s 延迟 + 重试也会把 100 篇论文拖到 30+ 分钟，且数据缺失率高（新论文未入库 / 限流返回 empty）。最终 0 篇 excellent。
- v3 砍掉所有外部 API，纯本地评估：
  - **元数据预筛**（title 命中 benchmark/evaluation + abstract 含 LLM 名字）
  - **PDF 头部正则**识别机构（顶级实验室 acknowledgment 通常在首页）
  - **LLM 多样性**（统计 PDF 全文中提及的不同模型数）
  - **引用数量**（数 references 章节的 `[N]` 或编号条目）
  - **venue**（PDF 头部命中 NeurIPS/ICLR 等关键词）
  - **rigor**（表格数 + 定量结果 + 引用数）
  - **页数惩罚**（< 6 页扣分）
- 综合分满分 25，阈值 12 给出合理筛选率（90/100 通过）。

**Suggested Action**:
- 后续任何"批量学术质量评估"任务，优先沿用 `scripts/arxiv-ingest-v3.py` 模式：单一数据源（arXiv）+ 本地 PDF 解析。
- 仅在需要绝对引用数（如做 meta-review）时再调外部 API，并加缓存。
- 关键代码片段：`parse_pdf()` 提取信号 + `quality_score()` 融合（见 v3 行 173-260）。

---

## [CORRECTION-20260515-002] Python stdout 在 background 任务里必须 line-buffered

**Priority**: Medium
**Status**: Fixed
**Area**: scripts/

**Summary**: `python3 scripts/foo.py &` 时 stdout 被重定向到文件 → 默认 block buffered → `print()` 即便完成也看不到输出。Monitor 工具收不到事件，外人以为脚本死了。

**Details**:
- v2 跑了 8 分钟 stdout 0 字节，让我误判脚本卡死直接 kill 掉。实际可能只是 buffer 没刷。
- 解决方案三件套：
  1. `sys.stdout.reconfigure(line_buffering=True)` 在脚本开头
  2. `print(..., flush=True)` 在每个关键节点
  3. 启动时加 `PYTHONUNBUFFERED=1` 环境变量

**Suggested Action**: 任何要 backgrounded + monitored 的 Python 脚本，**必须**三件套全上。

---

## [BEST_PRACTICE-20260515-003] sources/ 入库的 frontmatter 字段约定

**Priority**: Medium
**Status**: Validated
**Area**: wiki/sources/

**Summary**: 自动生成的 source 文件必须包含 `quality_score` + `score_breakdown` 字段，便于人审时快速判断保留/删除。

**Details**:
v3 在 source frontmatter 加入：
```yaml
quality_score: 24
score_breakdown: "meta=6 lab=T1(6) llms=5(3) venue=5 kw=70(2) rigor=2 pages=69"
pages: 69
```
正文末尾打印评分明细块，明确展示分数来源。

**Suggested Action**: 后续自动生成内容（不只 sources，benchmarks/concepts 也一样）都遵循"打分透明化"原则，便于后续审阅和清理低质量页。

---

## [CORRECTION-20260515-004] "导入 wiki" ≠ 写 source 文件，而是建立**双向关联**

**Priority**: High
**Status**: Validated
**Area**: scripts/arxiv-ingest-*

**Summary**: 用户语境下"导入到 wiki"的含义被我误解了。仅在 `wiki/papers/` 写一个 source 文件**不算导入**——必须：
1. 严格按质量筛选（用户原话："质量好的再导入"，即 ≥18 分而非 ≥12 分）
2. 在相关主题页（benchmarks/concepts/industry）**追加反向 wikilink**
3. 若新论文 claim 与现有 wiki 内容冲突，**主动纠正/补强**正文段落

**Details**:
- v3 第一轮把 90/100 都"导入"了——分数门槛 12 偏松；实际"质量好的"应是 ≥18（24 篇）
- 双向关联是"导入"的核心动作——单向 source→topic 不够，要 topic→source 也加上
- 实施方式：扫所有 source 的「相关 Wiki 页面」章节 → 反向构建 slug→sources 映射 → 在每个 topic 页末尾追加「## 近期相关研究（arXiv ...）」章节
- 正文补强是"纠正"的实质：把新论文的具体数据/论点写进主题段落而非只列在末尾

**Suggested Action**:
- v3+ 脚本应默认产出"高分（≥18）入 wiki/papers/ + 反向关联到 topic 页"两件套
- 仅写文件不算 done，必须验证反向关联存在
- 关键代码片段：`scripts/arxiv-ingest-v3.py` 应增加 stage 5b（反向关联生成），目前是手动 python 完成的，下次应内置

---

## [CORRECTION-20260515-005] 物理目录命名要直观：sources/ → papers/

**Priority**: Medium
**Status**: Validated（已重命名）
**Area**: wiki/

**Summary**: `wiki/sources/` 含义模糊（source 是"原始文献"还是"信息来源"？），用户实际希望看到 **papers** 这个直观分类。直接 rename + frontmatter type 调整，比保留命名+改 build-index 显示更彻底。

**Details**:
- 之前 wiki/sources/ 92 篇全是论文（83 arxiv + 9 非 arxiv）。一个目录混合"论文"和"其他来源"是反模式
- 重命名 wiki/sources → wiki/papers + frontmatter `type: source` → `type: paper`，连带改：
  - `scripts/build-index.ts` TYPE_ORDER 加 paper
  - `scripts/validate-frontmatter.ts` TYPE_REQUIRED 加 paper
  - `scripts/arxiv-ingest-v3.py` WIKI_SOURCES 路径
  - `raw/papers/_index.csv` source_page 字段批量替换
- 之后未来若有"其他类型 source"（博客、技术报告等），可重建 wiki/sources/ 但仅留非论文类

**Suggested Action**: 目录/类型命名遵循"扫一眼能看懂"原则。"sources" 太抽象，"papers"/"blogs"/"reports" 更直接。后续若加新 source 类型，按子类型建独立目录。

---

## [BEST_PRACTICE-20260515-006] backgrounded shell 后 pwd 会留在子目录，验证用绝对路径

**Priority**: Medium
**Status**: Validated（吃过亏）
**Area**: 任何多目录脚本

**Summary**: `cd quartz && ...` 完成后 shell 会留在 quartz/ 子目录，下一次 `ls raw/` 会找不到，让人误判数据丢失。**任何"用户校验数据是否真实存在"的命令，必须用绝对路径。**

**Details**:
- 这一轮被用户质疑"PDF 在哪？"时，我下意识 `ls raw/papers/` 返回 "No such file or directory"——差点误导用户以为数据丢失
- 根因：上一条命令 `cd quartz && npx quartz build` 把 shell cwd 留在 quartz/，相对路径解析错位
- 修复：用 `realpath` 或绝对路径 `ls /Users/jingweisun/Code/LLMEvaluationWiki/raw/papers/`

**Suggested Action**:
- 验证类命令（用户问"X 在哪""有多少"），统一用 `realpath` + 绝对路径
- 任何 `cd X && ...` 之后，下一条独立验证命令前显式 `cd $ROOT`
