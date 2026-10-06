#!/usr/bin/env python3
"""
Photo pipeline for Jake's Car Detailing.

Sources are Jake's own uploads from his Wix media library (kept in
scripts/source/, gitignored). Run `npm run photos` to regenerate everything in
public/photos and public/brand.

Every portfolio photo is a tall phone shot with the car in the lower half, so
each one gets two cuts built around the car's vertical centre (cy):
  {slug}-w{640,1280}.webp   4:3 landscape, car centred
  {slug}-t{480,960}.webp    4:5 portrait, car sitting low in the frame
The three working shots keep their full frame as well:
  {slug}-f{720,1080,1600}.webp
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts" / "source"
OUT = ROOT / "public" / "photos"
BRAND = ROOT / "public" / "brand"
OUT.mkdir(parents=True, exist_ok=True)
BRAND.mkdir(parents=True, exist_ok=True)

# slug -> (source file, cy = vertical centre of the car as a fraction of height)
PORTFOLIO = {
    "bmw-e46": ("04844a0d4c00413cb6ac441edff7d6de.jpg", 0.615),
    "corvette-c5": ("0637a8de83844419a0d8aec20feff7df.jpg", 0.575),
    "cybertruck": ("1c6aa003e349454b866d41b9ba30d544.jpg", 0.635),
    "chevy-ck": ("206288e83f0e42d8b5c75b419fdedd0e.jpg", 0.585),
    "defender": ("28e7beba78fa4ebf97deab6b3499f6e6.jpg", 0.683),
    "bmw-ix": ("5e0ae7b137de49b08db4e87262493241.jpg", 0.640),
    "audi-r8": ("5ee690566ca24e31af536d7c8dda3ac3.jpg", 0.675),
    "bmw-3-series": ("716546aaa7044e31969f3ed51daa9ebb.jpg", 0.600),
    "acura-tlx": ("8557c97d6f814f3cac9639e3ef54b5a1.jpg", 0.600),
    "discovery-sport": ("88a6c955772744528dd4faa518595b98.jpg", 0.625),
    "audi-rs3": ("a4dfb354f3e94ba2a01404b9e4ef51fa.jpg", 0.685),
    "bmw-m4": ("a56b843ebfbb4574ad951dea15f35601.jpg", 0.690),
    "huracan": ("adf4527b984d4597a8934b35e703ea58.jpg", 0.575),
    "mercedes-glc": ("bdbdc300fb0b4c62ba8877e5ac320d24.jpg", 0.620),
    "range-rover-sport": ("da218ef6c81741c88d5788bca2e9258e.jpg", 0.715),
    "jetta-gli": ("e312453c348c4b8884bead96d94d2ed9.jpg", 0.615),
    "granturismo": ("eb902e8279094e0e89c40a2638c0addf.jpg", 0.645),
    "audi-a5-cabriolet": ("f87d2f6342014b5b805d1027ac500cd6.jpg", 0.655),
}

# Working shots: slug -> (source, cy for the 4:3 cut, cy for the 4:5 cut)
WORKING = {
    "jake-rinse-huracan": ("fbdcf3f5d1ef455e94c6c594a07b06bd.jpg", 0.50, 0.55),
    "jake-dry-huracan": ("72be4c7c9d2f437ba68f6b375658f048.jpg", 0.52, 0.52),
    "jake-wash-rs3": ("d4324a47a4184e95a9e4f9b08223e39d.jpg", 0.475, 0.56),
}


def load(name: str) -> Image.Image:
    return ImageOps.exif_transpose(Image.open(SRC / name)).convert("RGB")


def cut(im: Image.Image, aspect: float, cy: float, anchor: float = 0.5) -> Image.Image:
    """Largest box of `aspect` (w/h) that fits, with the car's centre placed
    `anchor` of the way down the box."""
    w, h = im.size
    if w / h > aspect:
        cw, ch = int(round(h * aspect)), h
    else:
        cw, ch = w, int(round(w / aspect))
    x0 = (w - cw) // 2
    y0 = int(round(cy * h - anchor * ch))
    y0 = max(0, min(h - ch, y0))
    return im.crop((x0, y0, x0 + cw, y0 + ch))


def save(im: Image.Image, slug: str, tag: str, widths, quality=78):
    for width in widths:
        if width > im.width:
            # Never upscale: the largest rendition is the source width.
            width_out = im.width
        else:
            width_out = width
        height_out = int(round(im.height * width_out / im.width))
        out = im.resize((width_out, height_out), Image.LANCZOS)
        out.save(OUT / f"{slug}-{tag}{width}.webp", "WEBP", quality=quality, method=6)


def portfolio():
    for slug, (name, cy) in PORTFOLIO.items():
        im = load(name)
        save(cut(im, 4 / 3, cy), slug, "w", (640, 1280))
        save(cut(im, 4 / 5, cy, anchor=0.62), slug, "t", (480, 960))


def working():
    for slug, (name, cy_wide, cy_tall) in WORKING.items():
        im = load(name)
        save(im, slug, "f", (720, 1080, 1600), quality=80)
        save(cut(im, 4 / 3, cy_wide), slug, "w", (640, 1280))
        save(cut(im, 4 / 5, cy_tall), slug, "t", (480, 960))
    # The only interior photo Jake has published. Small source (514px wide),
    # so it is only ever shown small.
    im = load("69811baff2974cd1938855a88fbfec13.jpg")
    save(im, "granturismo-interior", "f", (514,), quality=84)
    save(cut(im, 4 / 5, 0.5), "granturismo-interior", "t", (480, 960), quality=84)


def logo():
    """Jake's logo is white lettering on a black card inside a white frame.
    Turn it into transparent artwork: alpha from brightness, colour kept (the
    lettering is white, the underline is blue)."""
    im = Image.open(SRC / "1d8bb2fc8e5a407cafd446f854fa01a3.png").convert("RGB")
    w, h = im.size
    px = im.load()

    def bright(x, y):
        return max(px[x, y])

    # Card bounds: step in from each edge until the pixels are dark.
    cx, cy = w // 2, h // 2
    left = next(x for x in range(w) if bright(x, cy // 3 + 60) < 40 and bright(x, cy) < 40)
    right = next(x for x in range(w - 1, -1, -1) if bright(x, cy // 3 + 60) < 40)
    top = next(y for y in range(h) if bright(left + 40, y) < 40)
    bottom = next(y for y in range(h - 1, -1, -1) if bright(left + 40, y) < 40)
    card = im.crop((left + 6, top + 6, right - 6, bottom - 6))
    cw, ch = card.size
    cpx = card.load()

    # Row bands that contain artwork.
    rows = [any(max(cpx[x, y]) > 70 for x in range(0, cw, 2)) for y in range(ch)]
    bands, start = [], None
    for y, on in enumerate(rows):
        if on and start is None:
            start = y
        if not on and start is not None:
            if y - start > 2:
                bands.append((start, y))
            start = None
    if start is not None:
        bands.append((start, ch))
    print("logo bands", bands, "card", card.size)

    def cols(y0, y1):
        xs = [x for x in range(cw) if any(max(cpx[x, y]) > 70 for y in range(y0, y1, 2))]
        return min(xs), max(xs) + 1

    def transparent(box, pad):
        x0, y0, x1, y1 = box
        x0, y0 = max(0, x0 - pad), max(0, y0 - pad)
        x1, y1 = min(cw, x1 + pad), min(ch, y1 + pad)
        crop = card.crop((x0, y0, x1, y1)).convert("RGBA")
        data = []
        for r, g, b, _ in crop.getdata():
            m = max(r, g, b)
            a = max(0, min(255, int((m - 24) * 255 / (215 - 24))))
            if m > 0:
                k = 255 / m
                r, g, b = min(255, int(r * k)), min(255, int(g * k)), min(255, int(b * k))
            data.append((r, g, b, a))
        crop.putdata(data)
        return crop

    # Bands, top to bottom: JAKE'S, CAR DETAILING, DETAILING DONE RIGHT, underline.
    name_band, sub_band = bands[0], bands[1]
    nx0, nx1 = cols(*name_band)
    sx0, sx1 = cols(*sub_band)
    lockup = transparent((min(nx0, sx0), name_band[0], max(nx1, sx1), sub_band[1]), 8)
    lockup.save(BRAND / "logo-lockup.png", optimize=True)
    small = lockup.resize((480, int(round(lockup.height * 480 / lockup.width))), Image.LANCZOS)
    small.save(BRAND / "logo-lockup-480.png", optimize=True)
    small.save(BRAND / "logo-lockup-480.webp", "WEBP", quality=92, method=6)

    all_x = [cols(*b) for b in bands]
    full = transparent((min(a for a, _ in all_x), bands[0][0], max(b for _, b in all_x), bands[-1][1]), 10)
    full.save(BRAND / "logo-full.png", optimize=True)
    print("lockup", lockup.size, "full", full.size)

    # Favicon: the J of JAKE'S on black. The lettering is italic, so the J
    # and the A overlap in plain columns. Shear the band upright, cut the J
    # at the first empty column, then shear it back.
    ny0, ny1 = name_band
    band = card.crop((nx0, ny0, nx1, ny1))
    bw, bh = band.size
    j = None
    for k in (0.30, 0.34, 0.38, 0.42, 0.26, 0.46):
        up = band.transform((bw + int(k * bh), bh), Image.AFFINE, (1, -k, 0, 0, 1, 0), Image.BICUBIC)
        upx = up.load()
        on = [any(max(upx[x, y]) > 70 for y in range(0, bh, 2)) for x in range(up.width)]
        first = next(i for i, v in enumerate(on) if v)
        gap = next((i for i in range(first + 10, up.width) if not on[i]), None)
        if gap is not None and gap - first < bw * 0.3:
            cutj = up.crop((first, 0, gap, bh))
            j = cutj.transform((cutj.width + int(k * bh), bh), Image.AFFINE, (1, k, -k * bh, 0, 1, 0), Image.BICUBIC)
            jpx = j.load()
            xs = [x for x in range(j.width) if any(max(jpx[x, y]) > 70 for y in range(bh))]
            j = j.crop((min(xs), 0, max(xs) + 1, bh))
            print("favicon shear", k, j.size)
            break
    if j is None:
        raise SystemExit("could not isolate the J for the favicon")
    for size, name in ((512, "icon-512.png"), (180, "apple-icon.png")):
        tile = Image.new("RGB", (size, size), (0, 0, 0))
        scale = (size * 0.6) / max(j.size)
        jj = j.resize((int(j.width * scale), int(j.height * scale)), Image.LANCZOS)
        tile.paste(jj, ((size - jj.width) // 2, (size - jj.height) // 2))
        tile.save(BRAND / name, optimize=True)


def og():
    """1200x630 share image: wide cut of the rinse shot, darkened on the left,
    with the logo lockup."""
    im = load("fbdcf3f5d1ef455e94c6c594a07b06bd.jpg")
    w, h = im.size
    ch = int(round(w * 630 / 1200))
    y0 = int(h * 0.285)
    base = im.crop((0, y0, w, y0 + ch)).resize((1200, 630), Image.LANCZOS).convert("RGBA")
    shade = Image.new("RGBA", (1200, 630), (0, 0, 0, 0))
    spx = shade.load()
    for x in range(1200):
        a = int(max(0, min(1, (760 - x) / 560)) ** 0.8 * 215)
        for y in range(630):
            spx[x, y] = (0, 0, 0, a)
    base = Image.alpha_composite(base, shade)
    lock = Image.open(BRAND / "logo-full.png").convert("RGBA")
    lw = 470
    lock = lock.resize((lw, int(round(lock.height * lw / lock.width))), Image.LANCZOS)
    base.alpha_composite(lock, (70, (630 - lock.height) // 2))
    base.convert("RGB").save(ROOT / "public" / "og-image.jpg", quality=86)


if __name__ == "__main__":
    portfolio()
    working()
    logo()
    og()
    total = sum(p.stat().st_size for p in OUT.glob("*.webp"))
    print(f"{len(list(OUT.glob('*.webp')))} photos, {total / 1e6:.1f} MB")
