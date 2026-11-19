"""
Portrait treatment for the hero: cut out the subject, turn everything silver-grey,
and recolour the tie to the site's signal red (keeping its shading).

    python scripts/process-portrait.py [src] [out-basename]

Defaults: public/me.jpg -> public/portrait-cutout.{png,webp}
Needs: rembg, Pillow, numpy, scipy.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from rembg import new_session, remove
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "public" / "me.jpg"
OUT = Path(sys.argv[2]) if len(sys.argv) > 2 else ROOT / "public" / "portrait-cutout"

# Tie seed (fraction of width/height) — a point sitting on the navy tie.
TIE_SEED = (0.51, 0.59)
RED = np.array([225, 6, 0], dtype=np.float32)  # --red #E10600


def cutout(img: Image.Image) -> np.ndarray:
    session = new_session("isnet-general-use")
    out = remove(
        img,
        session=session,
        post_process_mask=True,
    )
    return np.asarray(out.convert("RGBA"))[..., 3]


# Hand-traced tie outline in me.jpg pixel coords (956x956). The lower half is
# sunlit and the upper half in shadow, so no single colour threshold catches it;
# the polygon bounds the tie and colour refines its edges inside that bound.
TIE_POLY = [
    (482, 483), (503, 480), (509, 495), (515, 540), (519, 580), (518, 620),
    (511, 660), (502, 700), (495, 745), (488, 764), (438, 764), (450, 700),
    (461, 660), (469, 620), (474, 580), (478, 540), (481, 505),
]


def tie_mask(rgb: np.ndarray, alpha: np.ndarray) -> np.ndarray:
    from PIL import ImageDraw

    H, W = alpha.shape
    sx, sy = W / 956, H / 956
    poly = Image.new("L", (W, H), 0)
    ImageDraw.Draw(poly).polygon([(x * sx, y * sy) for x, y in TIE_POLY], fill=255)
    inside = np.asarray(poly) > 0

    hsv = np.asarray(Image.fromarray(rgb).convert("HSV")).astype(np.float32)
    h = hsv[..., 0] * 360 / 255
    s = hsv[..., 1] / 255
    v = hsv[..., 2] / 255
    navy = ((h > 185) & (h < 265) & (s > 0.22)) | (v < 0.3)
    mask = inside & navy
    mask = ndimage.binary_closing(mask, iterations=3)
    mask = ndimage.binary_fill_holes(mask) & ndimage.binary_dilation(inside, iterations=2)
    soft = Image.fromarray((mask * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.0))
    return np.asarray(soft).astype(np.float32) / 255


def silver(rgb: np.ndarray) -> np.ndarray:
    f = rgb.astype(np.float32) / 255
    lum = 0.2126 * f[..., 0] + 0.7152 * f[..., 1] + 0.0722 * f[..., 2]
    # Contrast S-curve, then lift blacks a touch (matte, not crushed).
    lum = np.clip((lum - 0.5) * 1.22 + 0.5, 0, 1)
    lum = lum * lum * (3 - 2 * lum) * 0.55 + lum * 0.45
    lum = 0.05 + lum * 0.93
    # Cool metallic tint.
    tint = np.array([0.985, 0.995, 1.02], dtype=np.float32)
    return np.clip(lum[..., None] * tint, 0, 1), lum


def main():
    img = Image.open(SRC).convert("RGB")
    rgb = np.asarray(img)
    alpha = cutout(img)
    tie = tie_mask(rgb, alpha)
    grey, lum = silver(rgb)

    # Tie: red carrying the original luminance as shading.
    shade = np.clip(lum / max(np.percentile(lum[tie > 0.5], 85), 1e-3) if (tie > 0.5).any() else lum, 0, 1.25)
    red = np.clip((RED / 255)[None, None, :] * (0.35 + 0.75 * shade[..., None]), 0, 1)
    out = grey * (1 - tie[..., None]) + red * tie[..., None]

    rgba = np.dstack([(out * 255).astype(np.uint8), alpha])
    # Trim to the subject's bounding box.
    ys, xs = np.nonzero(alpha > 8)
    rgba = rgba[ys.min(): ys.max() + 1, xs.min(): xs.max() + 1]
    im = Image.fromarray(rgba, "RGBA")
    im.save(OUT.with_suffix(".png"), optimize=True)
    im.save(OUT.with_suffix(".webp"), quality=86, method=6)
    print("tie px:", int((tie > 0.5).sum()), "size:", im.size)


if __name__ == "__main__":
    main()
