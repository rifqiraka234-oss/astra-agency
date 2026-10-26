"""Turn a built static site folder into one self-contained HTML file that opens from disk.

Every local file the page or its CSS points at (images, srcset candidates, video, poster, fonts, the mask SVG,
favicon) becomes a data URI. Stylesheets are inlined as <style>, scripts keep their attributes and order with their
code as a data URI src, so defer still behaves the same. Preload hints are dropped, the fonts are in the CSS already.

    python3 tools/bundle-site.py <site dir> <out.html>
"""
import base64, mimetypes, os, re, sys

SITE, OUT = os.path.abspath(sys.argv[1]), sys.argv[2]
mimetypes.add_type("font/woff2", ".woff2")
mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("image/svg+xml", ".svg")
mimetypes.add_type("video/webm", ".webm")
used, missing = set(), set()


def local(ref, base):
    ref = ref.strip().strip("'\"")
    if not ref or re.match(r"^(https?:|data:|mailto:|tel:|#|//|javascript:)", ref):
        return None
    ref = ref.split("#")[0].split("?")[0]
    # root absolute paths ("/media/x.jpg") mean the site folder, the way Netlify serves them
    path = os.path.normpath(os.path.join(SITE, ref.lstrip("/")) if ref.startswith("/") else os.path.join(base, ref))
    if not path.startswith(SITE):
        return None
    if not os.path.isfile(path):
        missing.add(os.path.relpath(path, SITE))
        return None
    return path


def data_uri(path):
    used.add(os.path.relpath(path, SITE))
    mt = mimetypes.guess_type(path)[0] or "application/octet-stream"
    return f"data:{mt};base64," + base64.b64encode(open(path, "rb").read()).decode()


def css_inline(css, base):
    def rep(m):
        p = local(m.group(1), base)
        return f'url("{data_uri(p)}")' if p else m.group(0)
    return re.sub(r"url\(\s*([^)]+?)\s*\)", rep, css)


html = open(os.path.join(SITE, "index.html"), encoding="utf-8").read()

# preload hints go, the CSS carries the fonts
html = re.sub(r"<link\b[^>]*\brel=\"?preload\"?[^>]*>\s*", "", html)

# stylesheets become <style>
def rep_css(m):
    href = re.search(r'href="([^"]+)"', m.group(0)).group(1)
    p = local(href, SITE)
    if not p:
        return m.group(0)
    used.add(os.path.relpath(p, SITE))
    return "<style>" + css_inline(open(p, encoding="utf-8").read(), os.path.dirname(p)) + "</style>"
html = re.sub(r"<link\b[^>]*\brel=\"?stylesheet\"?[^>]*>", rep_css, html)

# scripts keep their tag and attributes, the code moves into a data URI
def rep_js(m):
    p = local(m.group(2), SITE)
    if not p:
        return m.group(0)
    return m.group(1) + data_uri(p) + m.group(3)
html = re.sub(r'(<script\b[^>]*\bsrc=")([^"]+)("[^>]*>)', rep_js, html)

# inline style blocks and style attributes can carry url() too
html = re.sub(r"(<style[^>]*>)(.*?)(</style>)", lambda m: m.group(1) + css_inline(m.group(2), SITE) + m.group(3), html, flags=re.S)
html = re.sub(r'style="([^"]*url\([^"]*)"', lambda m: 'style="' + css_inline(m.group(1), SITE) + '"', html)

# every other attribute that points at a local file, srcset style lists included
def rep_attr(m):
    name, val = m.group(1), m.group(2)
    if "srcset" in name:
        parts = []
        for cand in val.split(","):
            bits = cand.strip().split()
            if not bits:
                continue
            p = local(bits[0], SITE)
            parts.append(" ".join([data_uri(p) if p else bits[0]] + bits[1:]))
        return f'{name}="{", ".join(parts)}"'
    p = local(val, SITE)
    return f'{name}="{data_uri(p)}"' if p else m.group(0)
html = re.sub(r'\b((?:data-)?(?:src|srcset|poster|href|data|xlink:href))="([^"]*)"', rep_attr, html)

open(OUT, "w", encoding="utf-8").write(html)
left = sorted(set(re.findall(r'["(]\s*/?((?:media|fonts|css|js)/[^"\s)]+)', html)))
print(f"wrote {OUT}, {os.path.getsize(OUT)/1e6:.1f} MB, {len(used)} files embedded")
print("local paths still in the page", left[:10] if left else "none")
print("referenced but missing", sorted(missing) if missing else "none")
