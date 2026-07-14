#!/usr/bin/env node
// scripts/rasterize-og.mjs
// One-shot rasterizer: hand-authored 1200x630 PNG OG image for Colibrii Labs.
// Uses only Node built-ins (zlib + buffer) — NO new npm deps.
// Output: public/og-image.png (matches public/og-image.svg design intent).
// Run: node scripts/rasterize-og.mjs
import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const W = 1200;
const H = 630;

// ---------- canvas (RGBA) ----------
const buf = Buffer.alloc(W * H * 4);
const setPx = (x, y, r, g, b, a = 255) => {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const i = (y * W + x) * 4;
  buf[i] = r; buf[i + 1] = g; buf[i + 2] = b; buf[i + 3] = a;
};
const getPx = (x, y) => {
  const i = (y * W + x) * 4;
  return [buf[i], buf[i + 1], buf[i + 2], buf[i + 3]];
};
const blendPx = (x, y, r, g, b, a) => {
  if (x < 0 || y < 0 || x >= W || y >= H || a <= 0) return;
  const [dr, dg, db] = getPx(x, y);
  const sa = a / 255;
  setPx(
    x, y,
    Math.round(r * sa + dr * (1 - sa)),
    Math.round(g * sa + dg * (1 - sa)),
    Math.round(b * sa + db * (1 - sa)),
    255
  );
};

// ---------- colors ----------
const hex = (h) => {
  const v = parseInt(h.replace("#", ""), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
};
const lerp = (a, b, t) => a + (b - a) * t;
const lerpRGB = (c1, c2, t) => [
  Math.round(lerp(c1[0], c2[0], t)),
  Math.round(lerp(c1[1], c2[1], t)),
  Math.round(lerp(c1[2], c2[2], t)),
];

const BG_A = hex("#f8f9fc");
const BG_B = hex("#eef1f8");
const BG_C = hex("#f0f2ff");
const BLUE = hex("#2563eb");
const INDIGO = hex("#6366f1");
const PINK = hex("#ec4899");
const SLATE_900 = hex("#0f172a");
const SLATE_500 = hex("#475569");
const SLATE_400 = hex("#94a3b8");

// ---------- background gradient (diagonal 4-stop) ----------
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const t = (x / W + y / H) / 2;
    let c;
    if (t < 0.3) c = lerpRGB(BG_A, BG_B, t / 0.3);
    else if (t < 0.6) c = lerpRGB(BG_B, BG_C, (t - 0.3) / 0.3);
    else c = lerpRGB(BG_C, BG_A, (t - 0.6) / 0.4);
    setPx(x, y, c[0], c[1], c[2]);
  }
}

// ---------- top accent bar (4px gradient) ----------
const barGrad = (x) => {
  const t = x / W;
  if (t < 0.5) return lerpRGB(BLUE, INDIGO, t / 0.5);
  return lerpRGB(INDIGO, PINK, (t - 0.5) / 0.5);
};
for (let y = 0; y < 4; y++) {
  for (let x = 0; x < W; x++) {
    const c = barGrad(x);
    setPx(x, y, c[0], c[1], c[2]);
  }
}

// ---------- decorative orbs (soft circles) ----------
const orb = (cx, cy, radius, color, opacity) => {
  for (let y = Math.max(0, cy - radius); y < Math.min(H, cy + radius); y++) {
    for (let x = Math.max(0, cx - radius); x < Math.min(W, cx + radius); x++) {
      const d = Math.hypot(x - cx, y - cy);
      if (d < radius) {
        const falloff = 1 - d / radius;
        const a = Math.round(255 * opacity * falloff * falloff);
        blendPx(x, y, color[0], color[1], color[2], a);
      }
    }
  }
};
orb(900, 200, 250, BLUE, 0.04);
orb(300, 450, 200, INDIGO, 0.03);
orb(1050, 500, 180, PINK, 0.03);

// ---------- bottom accent bar (20px @ 30%) ----------
for (let y = 610; y < 630; y++) {
  for (let x = 0; x < W; x++) {
    const c = barGrad(x);
    blendPx(x, y, c[0], c[1], c[2], Math.round(255 * 0.3));
  }
}

// ---------- 5x7 bitmap font (uppercase A-Z, 0-9, punctuation) ----------
// Each glyph: 7 rows x 5 cols; 1 = pixel on.
const F = {
  A: "01110|10001|10001|11111|10001|10001|10001",
  B: "11110|10001|10001|11110|10001|10001|11110",
  C: "01111|10000|10000|10000|10000|10000|01111",
  D: "11110|10001|10001|10001|10001|10001|11110",
  E: "11111|10000|10000|11110|10000|10000|11111",
  F: "11111|10000|10000|11110|10000|10000|10000",
  G: "01111|10000|10000|10011|10001|10001|01111",
  H: "10001|10001|10001|11111|10001|10001|10001",
  I: "11111|00100|00100|00100|00100|00100|11111",
  J: "00001|00001|00001|00001|00001|10001|01110",
  K: "10001|10010|10100|11000|10100|10010|10001",
  L: "10000|10000|10000|10000|10000|10000|11111",
  M: "10001|11011|10101|10101|10001|10001|10001",
  N: "10001|11001|10101|10011|10001|10001|10001",
  O: "01110|10001|10001|10001|10001|10001|01110",
  P: "11110|10001|10001|11110|10000|10000|10000",
  Q: "01110|10001|10001|10001|10101|10010|01101",
  R: "11110|10001|10001|11110|10100|10010|10001",
  S: "01111|10000|10000|01110|00001|00001|11110",
  T: "11111|00100|00100|00100|00100|00100|00100",
  U: "10001|10001|10001|10001|10001|10001|01110",
  V: "10001|10001|10001|10001|10001|01010|00100",
  W: "10001|10001|10001|10101|10101|11011|10001",
  X: "10001|10001|01010|00100|01010|10001|10001",
  Y: "10001|10001|01010|00100|00100|00100|00100",
  Z: "11111|00001|00010|00100|01000|10000|11111",
  "0": "01110|10001|10011|10101|11001|10001|01110",
  "1": "00100|01100|00100|00100|00100|00100|01110",
  "2": "01110|10001|00001|00010|00100|01000|11111",
  "3": "11110|00001|00001|01110|00001|00001|11110",
  "4": "00010|00110|01010|10010|11111|00010|00010",
  "5": "11111|10000|11110|00001|00001|10001|01110",
  "6": "01110|10000|10000|11110|10001|10001|01110",
  "7": "11111|00001|00010|00100|01000|01000|01000",
  "8": "01110|10001|10001|01110|10001|10001|01110",
  "9": "01110|10001|10001|01111|00001|00001|01110",
  " ": "00000|00000|00000|00000|00000|00000|00000",
  ".": "00000|00000|00000|00000|00000|00000|00100",
  ",": "00000|00000|00000|00000|00000|00100|01000",
  "-": "00000|00000|00000|01110|00000|00000|00000",
  "·": "00000|00000|00000|00100|00000|00000|00000",
  ":": "00000|00100|00000|00000|00000|00100|00000",
  "/": "00001|00010|00010|00100|01000|01000|10000",
  "+": "00000|00100|00100|11111|00100|00100|00000",
  "&": "01100|10010|10010|01100|10101|10010|01101",
};

const drawChar = (ch, x, y, size, colorFn) => {
  const g = F[ch] || F[ch?.toUpperCase?.()] || F[" "];
  const rows = g.split("|");
  for (let ry = 0; ry < 7; ry++) {
    for (let rx = 0; rx < 5; rx++) {
      if (rows[ry][rx] === "1") {
        for (let dy = 0; dy < size; dy++) {
          for (let dx = 0; dx < size; dx++) {
            const px = x + rx * size + dx;
            const py = y + ry * size + dy;
            const c = colorFn ? colorFn(px, py) : [0, 0, 0];
            blendPx(px, py, c[0], c[1], c[2], 255);
          }
        }
      }
    }
  }
};

const drawText = (text, x, y, size, colorFn, tracking = 1) => {
  const charW = 5 * size + tracking * size;
  let cx = x;
  for (const ch of text) {
    drawChar(ch, cx, y, size, colorFn);
    cx += charW;
  }
};

// gradient color callback for headline (blue → indigo → pink, horizontal)
const headlineGrad = (x, y) => {
  const t = Math.max(0, Math.min(1, (x - 70) / 700));
  if (t < 0.5) return lerpRGB(BLUE, INDIGO, t / 0.5);
  return lerpRGB(INDIGO, PINK, (t - 0.5) / 0.5);
};
const solid = (c) => () => c;

// ---------- rounded rectangle (filled, with stroke) ----------
const roundRect = (x, y, w, h, r, fill, fillOpacity, stroke, strokeOpacity) => {
  for (let py = y; py < y + h; py++) {
    for (let px = x; px < x + w; px++) {
      // corner test
      let inside = true;
      let edge = false;
      const corners = [
        [x + r, y + r], [x + w - r, y + r],
        [x + r, y + h - r], [x + w - r, y + h - r],
      ];
      const inCorner = (cx, cy) => (px < cx) !== (px >= cx - 0) && (py < cy) !== (py >= cy - 0);
      // simple: check if inside any rounded corner region
      for (const [cx, cy] of corners) {
        const xc = px < cx && (px >= x && px < x + r);
        const xc2 = px >= cx && (px >= x + w - r && px < x + w);
        const yc = py < cy && (py >= y && py < y + r);
        const yc2 = py >= cy && (py >= y + h - r && py < y + h);
        if ((xc || xc2) && (yc || yc2)) {
          const d = Math.hypot(px - cx, py - cy);
          if (d > r) inside = false;
          else if (d > r - 1.5) edge = true;
        }
      }
      // straight edges
      if (inside) {
        if (px === x || px === x + w - 1 || py === y || py === y + h - 1) edge = true;
      }
      if (inside) {
        blendPx(px, py, fill[0], fill[1], fill[2], Math.round(255 * fillOpacity));
      }
      if (inside && edge && stroke) {
        blendPx(px, py, stroke[0], stroke[1], stroke[2], Math.round(255 * strokeOpacity));
      }
    }
  }
};

// ---------- compose text content ----------
// Headline: "COLIBRII LABS"
drawText("COLIBRII LABS", 80, 130, 8, headlineGrad, 1);
// Subtitle: "AI OBSERVATORY - COSTA RICA"
drawText("AI OBSERVATORY - COSTA RICA", 80, 230, 4, solid(SLATE_900), 1);
// Description lines
drawText("REAL-TIME STRATEGIC AI INTELLIGENCE", 80, 320, 3, solid(SLATE_500), 1);
drawText("20 COUNTRIES  25+ SOURCES  10 ALGORITHMS", 80, 360, 3, solid(SLATE_500), 1);

// ---------- 4 stat badges (rounded rects) ----------
const badges = [
  { x: 80,  w: 160, fill: BLUE,   label: "CAPI-CR INDEX",  value: "20 COUNTRIES" },
  { x: 260, w: 160, fill: INDIGO, label: "LIVE DATA",      value: "4 APIS" },
  { x: 440, w: 180, fill: PINK,   label: "WEF 2026",       value: "RISK DATA" },
  { x: 640, w: 180, fill: BLUE,   label: "DIMENSIONS",     value: "6 CAPI-CR" },
];
for (const b of badges) {
  roundRect(b.x, 420, b.w, 55, 10, b.fill, 0.08, b.fill, 0.3);
  drawText(b.label, b.x + 12, 432, 2, solid(b.fill), 1);
  drawText(b.value, b.x + 12, 455, 2, solid(SLATE_900), 1);
}

// ---------- URL ----------
drawText("COLIBRIILABS.AI", 80, 555, 3, solid(SLATE_400), 1);
// CR mark (text-based, no emoji rasterization)
drawText("CR", 1100, 555, 4, solid(BLUE), 1);

// ---------- PNG encode ----------
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
})();
const crc32 = (data) => {
  let c = 0xffffffff;
  for (let i = 0; i < data.length; i++) c = crcTable[(c ^ data[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, "ascii");
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
};

// IHDR
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(H, 4);
ihdr[8] = 8;   // bit depth
ihdr[9] = 6;   // color type RGBA
ihdr[10] = 0;  // compression
ihdr[11] = 0;  // filter
ihdr[12] = 0;  // interlace

// IDAT: filter byte 0 per row + RGBA
const raw = Buffer.alloc(H * (W * 4 + 1));
for (let y = 0; y < H; y++) {
  raw[y * (W * 4 + 1)] = 0;
  buf.copy(raw, y * (W * 4 + 1) + 1, y * W * 4, (y + 1) * W * 4);
}
const idat = deflateSync(raw, { level: 9 });

const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const png = Buffer.concat([
  signature,
  chunk("IHDR", ihdr),
  chunk("IDAT", idat),
  chunk("IEND", Buffer.alloc(0)),
]);

const outPath = resolve(__dirname, "..", "public", "og-image.png");
writeFileSync(outPath, png);
console.log(`Wrote ${outPath} (${png.length} bytes, ${W}x${H})`);
