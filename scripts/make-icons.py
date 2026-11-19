"""
Render the dot-matrix "G." mark to favicon/app icons.

    python scripts/make-icons.py

Writes public/favicon.svg, logo.png (512), favicon-32.png, apple-touch-icon.png (180).
Geometry mirrors src/data/logo.ts.
"""
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent / "public"
COLS, ROWS = 13, 10
INK, PAPER, RED = (11, 11, 11), (242, 241, 236), (225, 6, 0)


def on(x, y):
    top = y <= 1 and x <= 9
    left = x <= 1
    bottom = y >= 8 and x <= 9
    right = 8 <= x <= 9 and 5 <= y <= 7
    tab = 5 <= y <= 6 and 5 <= x <= 9
    return x <= 9 and (top or left or bottom or right or tab)


def dots():
    for y in range(ROWS):
        for x in range(COLS):
            if on(x, y):
                yield x, y, "ink"
            elif x >= 11 and y >= 8:
                yield x, y, "red"


def png(size, path, pad=0.14, bg=INK, fg=PAPER, radius=0.4):
    S = size * 4  # supersample
    img = Image.new("RGB", (S, S), bg)
    d = ImageDraw.Draw(img)
    inner = S * (1 - 2 * pad)
    u = inner / COLS
    ox = S * pad
    oy = (S - u * ROWS) / 2
    for x, y, kind in dots():
        cx, cy = ox + (x + 0.5) * u, oy + (y + 0.5) * u
        r = u * radius
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=RED if kind == "red" else fg)
    img.resize((size, size), Image.LANCZOS).save(path)


def svg(path):
    circles = "".join(
        f'<circle cx="{x + 0.5}" cy="{y + 0.5}" r="0.42" fill="{"#E10600" if k == "red" else "#F2F1EC"}"/>'
        for x, y, k in dots()
    )
    path.write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1.5 -3 16 16">'
        '<rect x="-1.5" y="-3" width="16" height="16" rx="2" fill="#0B0B0B"/>'
        f"{circles}</svg>\n"
    )


if __name__ == "__main__":
    svg(ROOT / "favicon.svg")
    png(512, ROOT / "logo.png")
    png(32, ROOT / "favicon-32.png", pad=0.06, radius=0.46)
    png(180, ROOT / "apple-touch-icon.png")
    print("icons written")
