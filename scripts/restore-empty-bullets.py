#!/usr/bin/env python3
"""
恢复 Session G 死链清零留下的空 bullet。

策略：
  1. 找出所有含 `^- *$` 空 bullet 的文件
  2. 取每个文件首次 commit 的原版（用 git log --diff-filter=A）
  3. 逐行对比当前版 vs 原版，找出对应的 `- [[X]]` → `- ` 退化
  4. 把空 bullet 替换为纯文字「X」（去 `[[ ]]`，对带 `|` 的 wikilink 取显示文字）

用法:
  python3 scripts/restore-empty-bullets.py --dry-run    # 预览
  python3 scripts/restore-empty-bullets.py              # 写入
"""

from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path
from typing import Optional

ROOT = Path(__file__).resolve().parent.parent
WIKI = ROOT / "wiki"

EMPTY_BULLET_RE = re.compile(r"^- *$")
WIKILINK_RE = re.compile(r"\[\[([^\]]+)\]\]")


def wikilink_to_text(s: str) -> str:
    """`[[slug|显示名]]` → `显示名`；`[[slug]]` → `slug`"""
    def repl(m):
        inner = m.group(1)
        if "|" in inner:
            return inner.split("|", 1)[1].strip()
        return inner.strip()
    return WIKILINK_RE.sub(repl, s)


def find_create_commit(filepath: Path) -> Optional[str]:
    """取文件首次 commit 的 hash。"""
    rel = filepath.relative_to(ROOT)
    out = subprocess.run(
        ["git", "log", "--all", "--diff-filter=A", "--format=%h", "--follow", "--", str(rel)],
        cwd=ROOT, capture_output=True, text=True,
    )
    hashes = out.stdout.strip().splitlines()
    return hashes[-1] if hashes else None


def get_original(filepath: Path, commit: str) -> Optional[str]:
    rel = filepath.relative_to(ROOT)
    out = subprocess.run(
        ["git", "show", f"{commit}:{rel}"],
        cwd=ROOT, capture_output=True, text=True,
    )
    if out.returncode != 0:
        return None
    return out.stdout


def restore_file(filepath: Path, dry_run: bool) -> tuple[int, list[str]]:
    """返回 (replaced_count, changes_preview)"""
    text = filepath.read_text(encoding="utf-8")
    cur_lines = text.splitlines(keepends=False)

    # 找出所有空 bullet 行号
    empty_indices = [i for i, l in enumerate(cur_lines) if EMPTY_BULLET_RE.match(l)]
    if not empty_indices:
        return 0, []

    commit = find_create_commit(filepath)
    if not commit:
        return 0, [f"  ⚠️  无法找到 {filepath.name} 的创建 commit，跳过"]

    orig = get_original(filepath, commit)
    if not orig:
        return 0, [f"  ⚠️  无法取 {filepath.name} 原版（commit {commit}），跳过"]

    orig_lines = orig.splitlines(keepends=False)

    # 对齐策略：以空 bullet 所在行附近 ±5 行为锚点，找原版对应行
    # 简化：假设原版行数和当前行数相同（Session G 只删内容、没删行）
    # 如果行数差异 > 5，跳过
    if abs(len(orig_lines) - len(cur_lines)) > 5:
        return 0, [f"  ⚠️  {filepath.name} 行数差异大（orig {len(orig_lines)} vs cur {len(cur_lines)}），跳过"]

    changes = []
    new_lines = list(cur_lines)
    replaced = 0

    for i in empty_indices:
        # 在原版相同行号 ± 3 范围内找一个 `- [[...]]` 或 `- xxx` 行
        candidate = None
        for offset in range(0, 4):
            for j in (i - offset, i + offset) if offset else (i,):
                if 0 <= j < len(orig_lines):
                    line = orig_lines[j]
                    if re.match(r"^- +\S", line):  # 非空 bullet
                        candidate = line
                        break
            if candidate:
                break

        if not candidate:
            changes.append(f"  · 行 {i+1}: 原版无对应内容，将删除")
            new_lines[i] = None  # 标记删除
            replaced += 1
            continue

        # 把候选行的 wikilink 转纯文字
        body = candidate[2:].strip()  # 去掉 "- "
        body_text = wikilink_to_text(body)
        new_lines[i] = f"- {body_text}"
        changes.append(f"  · 行 {i+1}: {candidate}  →  - {body_text}")
        replaced += 1

    # 应用：过滤掉标记删除的 None
    final_lines = [l for l in new_lines if l is not None]
    new_text = "\n".join(final_lines)
    # 保留文件末尾换行（如果原本有）
    if text.endswith("\n") and not new_text.endswith("\n"):
        new_text += "\n"

    if not dry_run and new_text != text:
        filepath.write_text(new_text, encoding="utf-8")

    return replaced, changes


def main() -> int:
    dry_run = "--dry-run" in sys.argv

    # 找全站含空 bullet 的文件
    files_with_empty = []
    for md in WIKI.rglob("*.md"):
        text = md.read_text(encoding="utf-8")
        if any(EMPTY_BULLET_RE.match(l) for l in text.splitlines()):
            files_with_empty.append(md)

    print(f"扫描到 {len(files_with_empty)} 个文件含空 bullet")
    if dry_run:
        print("(DRY-RUN 模式，不写入文件)")
    print()

    total_replaced = 0
    affected_files = 0
    for filepath in sorted(files_with_empty):
        replaced, changes = restore_file(filepath, dry_run)
        if replaced > 0:
            affected_files += 1
            total_replaced += replaced
            print(f"📝 {filepath.relative_to(ROOT)}  ({replaced} 处)")
            for c in changes:
                print(c)

    print()
    print(f"=== 合计：{affected_files} 个文件，{total_replaced} 处空 bullet 已{'预览' if dry_run else '恢复'} ===")
    return 0


if __name__ == "__main__":
    sys.exit(main())
