#!/usr/bin/env python3
"""Scan wiki/ for dead [[wikilinks]]. Usage: python3 scripts/scan-dead-links.py"""
import os, re, glob, sys
from collections import Counter

wiki_dir = os.path.join(os.path.dirname(__file__), "..", "wiki")
os.chdir(wiki_dir)

known = set()
known_l = set()
for p in glob.glob("**/*.md", recursive=True):
    s = os.path.splitext(os.path.basename(p))[0]
    known.add(s); known_l.add(s.lower())

ar = re.compile(r'aliases:\s*\n((?:  - .+\n)+)', re.M)
for p in glob.glob("**/*.md", recursive=True):
    try:
        head = open(p).read()[:1500]
    except Exception:
        continue
    for m in ar.finditer(head):
        for line in m.group(1).splitlines():
            a = line.strip().lstrip("- ").strip().strip('"').strip("'")
            if a:
                known.add(a); known_l.add(a.lower())

wlr = re.compile(r'\[\[([^\]|#]+?)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]')
broken = Counter()
for p in glob.glob("**/*.md", recursive=True):
    try:
        c = open(p).read()
    except Exception:
        continue
    for lnk in wlr.findall(c):
        s = lnk.strip()
        sk = s.lower().replace(" ", "-")
        if s in known or s.lower() in known_l or sk in known_l:
            continue
        broken[s] += 1

print(f"Total: {sum(broken.values())} | unique: {len(broken)}")
for link, count in broken.most_common(30):
    print(f"  {count:3d}x [[{link}]]")
