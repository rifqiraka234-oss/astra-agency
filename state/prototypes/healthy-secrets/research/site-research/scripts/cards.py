"""For each portrait img on Über uns, find the smallest ancestor that also contains each name,
and report what else that ancestor contains, so name and face are paired only by containment.

usage: python3 -I cards.py <html_file>
"""
import sys
from html.parser import HTMLParser

VOID = {"img", "br", "meta", "link", "input", "hr", "source", "wbr", "area", "base", "col", "embed", "param", "track"}


class Node:
    def __init__(self, tag, attrs, parent):
        self.tag, self.attrs, self.parent, self.kids, self.text = tag, dict(attrs), parent, [], []


class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("root", [], None)
        self.cur = self.root
        self.skip = 0

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style"):
            self.skip += 1
            return
        n = Node(tag, attrs, self.cur)
        self.cur.kids.append(n)
        if tag not in VOID:
            self.cur = n

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self.skip -= 1
            return
        n = self.cur
        while n is not self.root and n.tag != tag:
            n = n.parent
        if n is not self.root:
            self.cur = n.parent

    def handle_data(self, d):
        if not self.skip and d.strip():
            self.cur.text.append(d.strip())


def alltext(n):
    out = list(n.text)
    for k in n.kids:
        out += alltext(k)
    return out


def walk(n):
    yield n
    for k in n.kids:
        yield from walk(k)


p = P()
p.feed(open(sys.argv[1], errors="replace").read())
imgs = [n for n in walk(p.root) if n.tag == "img" and n.attrs.get("alt") in ("Niki", "Leonie", "Stephanie")]
names = ["Leonie Walkner BSc.", "Dr. Stephanie Walkner", "Dr. Nikolaus Walkner"]
for im in imgs:
    print("\n=== img alt", im.attrs.get("alt"), "src", (im.attrs.get("src") or "")[:90])
    a, depth = im.parent, 0
    chain = []
    while a is not None:
        t = " ".join(alltext(a))
        hits = [nm for nm in names if nm in t]
        chain.append((depth, a.tag, a.attrs.get("id"), a.attrs.get("data-testid"), hits))
        if hits:
            break
        a, depth = a.parent, depth + 1
    for c in chain[-4:]:
        print("   ancestor", c)
    if a is not None:
        t = " ".join(alltext(a))
        n_imgs = sum(1 for x in walk(a) if x.tag == "img")
        print("   smallest container with a name:", a.tag, a.attrs.get("id"), "| names inside:", [nm for nm in names if nm in t], "| imgs inside:", n_imgs)
        print("   text:", t[:300])
