import { createDeflateRaw } from 'zlib';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function uint32BE(n) {
  const b = Buffer.allocUnsafe(4);
  b.writeUInt32BE(n, 0);
  return b;
}

function crc32(buf) {
  let crc = 0xffffffff;
  const table = CRC_TABLE;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    t[n] = c;
  }
  return t;
})();

function pngChunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const dataBytes = Buffer.isBuffer(data) ? data : Buffer.from(data);
  const len = uint32BE(dataBytes.length);
  const crcInput = Buffer.concat([typeBytes, dataBytes]);
  const crcBytes = uint32BE(crc32(crcInput));
  return Buffer.concat([len, typeBytes, dataBytes, crcBytes]);
}

function deflateSync(buf) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const d = createDeflateRaw({ level: 9 });
    d.on('data', c => chunks.push(c));
    d.on('end', () => resolve(Buffer.concat(chunks)));
    d.on('error', reject);
    d.end(buf);
  });
}

async function generatePNG(size) {
  const width = size;
  const height = size;
  const pixels = new Uint8Array(width * height * 4);

  function setPixel(x, y, r, g, b, a = 255) {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const i = (y * width + x) * 4;
    pixels[i] = r; pixels[i+1] = g; pixels[i+2] = b; pixels[i+3] = a;
  }

  function blend(x, y, r, g, b, a) {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const i = (y * width + x) * 4;
    const aa = a / 255;
    pixels[i]   = Math.round(pixels[i]   * (1 - aa) + r * aa);
    pixels[i+1] = Math.round(pixels[i+1] * (1 - aa) + g * aa);
    pixels[i+2] = Math.round(pixels[i+2] * (1 - aa) + b * aa);
    pixels[i+3] = Math.min(255, pixels[i+3] + a);
  }

  function fillCircle(cx, cy, radius, r, g, b, a = 255) {
    const r2 = radius * radius;
    for (let py = Math.max(0, Math.ceil(cy - radius)); py <= Math.min(height - 1, Math.floor(cy + radius)); py++) {
      for (let px = Math.max(0, Math.ceil(cx - radius)); px <= Math.min(width - 1, Math.floor(cx + radius)); px++) {
        const dx = px - cx, dy = py - cy;
        const d2 = dx * dx + dy * dy;
        if (d2 <= r2) {
          // Anti-aliased edge
          const dist = Math.sqrt(d2);
          const alpha = dist > radius - 1 ? Math.round((radius - dist) * 255) : a;
          blend(px, py, r, g, b, Math.max(0, Math.min(255, alpha)));
        }
      }
    }
  }

  function fillRect(x, y, w, h, r, g, b, a = 255) {
    for (let py = Math.max(0, y); py < Math.min(height, y + h); py++) {
      for (let px = Math.max(0, x); px < Math.min(width, x + w); px++) {
        setPixel(px, py, r, g, b, a);
      }
    }
  }

  function roundedRect(x0, y0, w, h, rad, r, g, b, a = 255) {
    // Fill body
    fillRect(x0 + rad, y0, w - 2 * rad, h, r, g, b, a);
    fillRect(x0, y0 + rad, rad, h - 2 * rad, r, g, b, a);
    fillRect(x0 + w - rad, y0 + rad, rad, h - 2 * rad, r, g, b, a);
    // Corners
    fillCircle(x0 + rad, y0 + rad, rad, r, g, b, a);
    fillCircle(x0 + w - rad, y0 + rad, rad, r, g, b, a);
    fillCircle(x0 + rad, y0 + h - rad, rad, r, g, b, a);
    fillCircle(x0 + w - rad, y0 + h - rad, rad, r, g, b, a);
  }

  const s = size;
  const cx = s / 2;
  const cy = s / 2;
  const rad = Math.round(s * 0.22); // rounded corners

  // ── Background: rich football green ──────────────────────────
  roundedRect(0, 0, s, s, rad, 0x00, 0x68, 0x37, 255); // #006837

  // ── Subtle diagonal stripes ───────────────────────────────────
  for (let d = -s; d < s * 2; d += Math.round(s * 0.12)) {
    for (let py = 0; py < s; py++) {
      for (let px = 0; px < s; px++) {
        if (Math.abs(px - py - d) < Math.round(s * 0.015)) {
          blend(px, py, 255, 255, 255, 12);
        }
      }
    }
  }

  // ── Gold banner strip at top ──────────────────────────────────
  const bannerH = Math.round(s * 0.18);
  roundedRect(0, 0, s, bannerH + rad, rad, 0xC9, 0xA2, 0x27, 255); // gold
  fillRect(0, bannerH, s, rad, 0xC9, 0xA2, 0x27, 255);

  // ── White football in center ──────────────────────────────────
  const ballCY = Math.round(s * 0.60);
  const ballR = Math.round(s * 0.26);
  fillCircle(cx, ballCY, ballR, 0xff, 0xff, 0xff, 255);

  // Classic hexagon/pentagon patches on ball
  const patchR = Math.round(ballR * 0.20);
  const patchDist = Math.round(ballR * 0.46);
  // Center patch
  fillCircle(cx, ballCY, patchR, 0x1a, 0x2e, 0x1a, 255);
  // Ring of 5 patches
  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
    const px = cx + Math.round(patchDist * Math.cos(angle));
    const py = ballCY + Math.round(patchDist * Math.sin(angle));
    fillCircle(px, py, patchR, 0x1a, 0x2e, 0x1a, 255);
  }
  // Second ring of 5 smaller patches
  const patch2R = Math.round(ballR * 0.13);
  const patch2Dist = Math.round(ballR * 0.82);
  for (let i = 0; i < 5; i++) {
    const angle = (i * 2 * Math.PI / 5);
    const px = cx + Math.round(patch2Dist * Math.cos(angle));
    const py = ballCY + Math.round(patch2Dist * Math.sin(angle));
    fillCircle(px, py, patch2R, 0x1a, 0x2e, 0x1a, 180);
  }

  // ── "26" text on gold banner (pixel art style) ────────────────
  // Simple block digit rendering
  const digitH = Math.round(bannerH * 0.55);
  const digitW = Math.round(digitH * 0.55);
  const digitY = Math.round((bannerH - digitH) / 2);
  const textStr = '2026';
  const totalW = textStr.length * (digitW + Math.round(digitW * 0.25));
  let digitX = Math.round((s - totalW) / 2);

  for (const ch of textStr) {
    drawDigit(ch, digitX, digitY, digitW, digitH);
    digitX += digitW + Math.round(digitW * 0.25);
  }

  function drawDigit(ch, x, y, w, h) {
    const r = 0x1a, g = 0x2e, b = 0x1a;
    const sw = Math.max(2, Math.round(w * 0.2)); // stroke width
    if (ch === '2') {
      fillRect(x, y, w, sw, r, g, b);
      fillRect(x + w - sw, y, sw, Math.round(h * 0.5), r, g, b);
      fillRect(x, Math.round(y + h * 0.45), w, sw, r, g, b);
      fillRect(x, Math.round(y + h * 0.5), sw, Math.round(h * 0.5), r, g, b);
      fillRect(x, y + h - sw, w, sw, r, g, b);
    } else if (ch === '0') {
      fillRect(x, y, w, sw, r, g, b);
      fillRect(x, y + h - sw, w, sw, r, g, b);
      fillRect(x, y, sw, h, r, g, b);
      fillRect(x + w - sw, y, sw, h, r, g, b);
    } else if (ch === '6') {
      fillRect(x, y, w, sw, r, g, b);
      fillRect(x, y, sw, h, r, g, b);
      fillRect(x, Math.round(y + h * 0.45), w, sw, r, g, b);
      fillRect(x + w - sw, Math.round(y + h * 0.45), sw, Math.round(h * 0.55), r, g, b);
      fillRect(x, y + h - sw, w, sw, r, g, b);
    }
  }

  // Build scanlines
  const scanlines = Buffer.allocUnsafe(height * (1 + width * 4));
  const pixBuf = Buffer.from(pixels.buffer);
  for (let y = 0; y < height; y++) {
    scanlines[y * (1 + width * 4)] = 0;
    pixBuf.copy(scanlines, y * (1 + width * 4) + 1, y * width * 4, (y + 1) * width * 4);
  }

  const compressed = await deflateSync(scanlines);
  const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.allocUnsafe(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; ihdrData[9] = 6; ihdrData[10] = 0; ihdrData[11] = 0; ihdrData[12] = 0;

  return Buffer.concat([
    PNG_SIGNATURE,
    pngChunk('IHDR', ihdrData),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

const outDir = join(__dirname, '..', 'public', 'icons');
mkdirSync(outDir, { recursive: true });

console.log('Generating icons...');
const [png192, png512] = await Promise.all([generatePNG(192), generatePNG(512)]);
writeFileSync(join(outDir, 'icon-192.png'), png192);
console.log('✓ icon-192.png');
writeFileSync(join(outDir, 'icon-512.png'), png512);
console.log('✓ icon-512.png');
