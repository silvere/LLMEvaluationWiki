/**
 * SearchAliases — Quartz Transformer Plugin
 *
 * 解决 Quartz 默认搜索的三个系统性问题：
 *   1. encoder 只把 ASCII 空白 / CJK 当分隔符，`-/()/（）`/希腊字母都粘在 token 里
 *   2. FlexSearch `tokenize: "forward"` 只做字符前缀匹配，不做子串匹配
 *   3. frontmatter 的 `aliases` 字段未被 contentIndex 索引
 *
 * 策略：在 Markdown AST 末尾追加一段「Also known as: …」可见脚注，
 *      把 title / aliases / slug 的切分变体（去括号、去连字符、希腊→ASCII）作为
 *      合法 markdown 内容注入。Description plugin 后续转 text 时一并进 content 索引。
 *
 * 接入：在 quartz.config.ts 的 transformers 数组末尾加 SearchAliases()。
 *      必须排在 FrontMatter() 之后（依赖 file.data.frontmatter）。
 */
import { QuartzTransformerPlugin } from "../../quartz/quartz/plugins/types"
import type { Root, Paragraph } from "mdast"
import type { VFile } from "vfile"
import { h } from "preact"

// 希腊字母 → ASCII 转写表（覆盖学术常用 22 个）
const GREEK_TO_ASCII: Record<string, string> = {
  α: "alpha", β: "beta", γ: "gamma", δ: "delta", ε: "epsilon",
  ζ: "zeta", η: "eta", θ: "theta", ι: "iota", κ: "kappa",
  λ: "lambda", μ: "mu", ν: "nu", ξ: "xi", ο: "omicron",
  π: "pi", ρ: "rho", σ: "sigma", τ: "tau", υ: "upsilon",
  φ: "phi", χ: "chi", ψ: "psi", ω: "omega",
}

// 拆分用的标点（保留为分隔符）。注意：故意不包含 `'` / `"` —— Cohen's 不该被切成 Cohen + s
const SPLIT_PUNCT = /[\s\-_/·,，;；:：()\[\]{}（）【】「」]+/g

function transliterateGreek(s: string): string {
  let out = ""
  for (const ch of s) {
    out += GREEK_TO_ASCII[ch.toLowerCase()] ?? ch
  }
  return out
}

/** 把所有切分标点替换成单空格、合并多空格、去首尾空白 */
function normalize(s: string): string {
  return s.replace(SPLIT_PUNCT, " ").replace(/\s+/g, " ").trim()
}

/** 去掉相邻重复词，比如 "tau bench tau bench" → "tau bench" */
function dedupeAdjacentWords(s: string): string {
  const words = s.split(" ")
  const out: string[] = []
  const seen = new Set<string>()
  for (const w of words) {
    const lw = w.toLowerCase()
    if (seen.has(lw)) continue
    seen.add(lw)
    out.push(w)
  }
  return out.join(" ")
}

function splitWords(s: string): string[] {
  return s.split(/\s+/).filter((w) => w.length >= 2)
}

/**
 * 输入 title / aliases / slug，输出去重的搜索 token 候选列表。
 * 顺序：长 token 在前（preview 优先展示完整短语），短 token 在后。
 *
 * 规则：
 *   - 原始字符串里的括号、连字符、下划线等切分标点统一规范成空格
 *   - 希腊字母逐字符 ASCII 转写（τ→tau，α→alpha 等）
 *   - 长度 < 2 的 token 丢弃
 *   - 与 title（规范前/规范后）完全相同的项不重复进 alias 集合
 */
export function generateSearchTokens(
  title: string,
  aliases: string[],
  slug: string,
): string[] {
  const out = new Set<string>()
  const sources = [title, ...aliases, slug]

  // 按空白/括号切（但保留连字符），用于把 "MINT (Multi-turn INteractive Tool-use)" 切成
  // ["MINT", "Multi-turn", "INteractive", "Tool-use"]，让带连字符的子词作为完整 token 注入
  const splitKeepHyphen = (s: string) =>
    s.split(/[\s()（）\[\]【】「」{},，;；:：]+/g).filter((w) => w.length >= 2)

  for (const raw of sources) {
    if (!raw) continue
    const trimmed = raw.trim()
    if (!trimmed) continue

    // 原形态片段（保留连字符）—— 让 "tau-bench"、"Multi-turn" 等作为完整 token 进索引
    for (const piece of splitKeepHyphen(trimmed)) {
      out.add(piece)
      const asciiPiece = transliterateGreek(piece)
      if (asciiPiece !== piece && asciiPiece.length >= 2) out.add(asciiPiece)
    }

    const normalized = dedupeAdjacentWords(normalize(trimmed))
    if (!normalized) continue
    const ascii = dedupeAdjacentWords(transliterateGreek(normalized))

    // 规范化后的多词短语（空格分隔）
    if (normalized.length >= 2) out.add(normalized)
    if (ascii !== normalized && ascii.length >= 2) out.add(ascii)

    // 切分子词
    for (const w of splitWords(normalized)) out.add(w)
    for (const w of splitWords(ascii)) out.add(w)
  }

  // 去掉与 title（原文或规范后）完全重复的整串，避免 footer 冗余
  const titleTrimmed = title.trim()
  out.delete(titleTrimmed)
  out.delete(normalize(titleTrimmed))

  // 长在前，短在后
  return Array.from(out).sort((a, b) => b.length - a.length || a.localeCompare(b))
}

interface PluginOptions {
  /** 是否在控制台打印每个文件生成的 token（调试用） */
  verbose?: boolean
}

export const SearchAliases: QuartzTransformerPlugin<PluginOptions> = (opts) => {
  const verbose = opts?.verbose ?? false
  return {
    name: "SearchAliases",
    markdownPlugins() {
      return [
        () => {
          return (tree: Root, file: VFile) => {
            const fm = file.data.frontmatter as
              | { title?: string; aliases?: unknown }
              | undefined
            if (!fm) return

            const title = String(fm.title ?? "")
            // aliases 可能是 string | string[] | undefined
            const rawAliases = fm.aliases
            const aliases: string[] = Array.isArray(rawAliases)
              ? rawAliases.map(String)
              : typeof rawAliases === "string"
              ? [rawAliases]
              : []

            // slug = 文件 basename（去扩展名）
            const stem = file.stem ?? ""
            const tokens = generateSearchTokens(title, aliases, stem)

            // 没东西可注入就跳过（如 title 等于 slug 且无 aliases 的简单页）
            if (tokens.length === 0) return

            // 跳过自动生成的 index 页
            if (stem === "index") return

            if (verbose) {
              // eslint-disable-next-line no-console
              console.log(`[SearchAliases] ${file.path}: ${tokens.join(", ")}`)
            }

            // 追加一个可见的「Also known as」段落到 AST 末尾
            const paragraph: Paragraph = {
              type: "paragraph",
              children: [
                {
                  type: "emphasis",
                  children: [
                    {
                      type: "text",
                      value: `Also known as: ${tokens.join(", ")}`,
                    },
                  ],
                },
              ],
            }
            tree.children.push(paragraph)
          }
        },
      ]
    },
    externalResources() {
      // 给左侧 Explorer 链接加 native title tooltip：hover 显示完整名称
      // （配合 custom.scss 里的 line-clamp 截断使用，截断仅是视觉，完整名靠 hover 显示）
      const script = `
        document.addEventListener("nav", () => {
          for (const a of document.querySelectorAll(".explorer-content a")) {
            if (!a.getAttribute("title")) a.setAttribute("title", a.textContent.trim())
          }
          for (const s of document.querySelectorAll(".explorer-content .folder-container .folder-title, .explorer-content .folder-container button span")) {
            if (!s.getAttribute("title")) s.setAttribute("title", s.textContent.trim())
          }
        })
      `
      return {
        additionalHead: [
          h("script", {
            key: "search-aliases-explorer-tooltip",
            dangerouslySetInnerHTML: { __html: script },
          }),
        ],
      }
    },
  }
}
