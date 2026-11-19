"""
Render the "G." mark to favicon/app icons.

    python scripts/make-icons.py

Writes public/favicon.svg, logo.png (512), favicon-32.png, apple-touch-icon.png (180).

The large icons use the full 13x10 dot-matrix mark (geometry mirrors
src/data/logo.ts). Browser tabs draw the favicon at 16px, where those dots blur
into grey, so the tab icons use a coarse pixel "G." on a 2-unit grid instead:
every edge lands on a whole pixel at 16px and 32px.
"""
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent / "public"
COLS, ROWS = 13, 10
INK, PAPER, RED = (11, 11, 11), (242, 241, 236), (225, 6, 0)

# Tab mark: 7x6 cells of 2 units, offset (1, 2) inside a 16x16 tile.
TAB_G = [
    "#####..",
    "#......",
    "#..##..",
    "#...#..",
    "#...#..",
    "#####.r",
]
TAB_OX, TAB_OY, CELL = 1, 2, 2


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


def tab_cells():
    for y, row in enumerate(TAB_G):
        for x, c in enumerate(row):
            if c != ".":
                yield TAB_OX + x * CELL, TAB_OY + y * CELL, c == "r"


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


def tab_png(size, path):
    """Pixel-exact: 32px = 2px per unit, no resampling."""
    k = size // 16
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=3 * k, fill=INK)
    for x, y, red in tab_cells():
        d.rectangle([x * k, y * k, (x + CELL) * k - 1, (y + CELL) * k - 1], fill=RED if red else PAPER)
    img.save(path)


def svg(path):
    cells = "".join(
        f'<rect x="{x}" y="{y}" width="{CELL}" height="{CELL}" fill="{"#E10600" if red else "#F2F1EC"}"/>'
        for x, y, red in tab_cells()
    )
    path.write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">'
        '<rect width="16" height="16" rx="3" fill="#0B0B0B" shape-rendering="geometricPrecision"/>'
        f"{cells}</svg>\n"
    )


if __name__ == "__main__":
    svg(ROOT / "favicon.svg")
    png(512, ROOT / "logo.png")
    tab_png(32, ROOT / "favicon-32.png")
    png(180, ROOT / "apple-touch-icon.png")
    print("icons written")
