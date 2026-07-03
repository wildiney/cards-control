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

// Draw a simple football-themed icon
async function generatePNG(size) {
  const width = size;
  const height = size;

  // RGBA pixel buffer
  const pixels = new Uint8ClampedArray(width * height * 4);

  function setPixel(x, y, r, g, b, a = 255) {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const i = (y * width + x) * 4;
    pixels[i] = r; pixels[i+1] = g; pixels[i+2] = b; pixels[i+3] = a;
  }

  function fillCircle(cx, cy, radius, r, g, b, a = 255) {
    const r2 = radius * radius;
    for (let y = Math.max(0, cy - radius); y <= Math.min(height - 1, cy + radius); y++) {
      for (let x = Math.max(0, cx - radius); x <= Math.min(width - 1, cx + radius); x++) {
        const dx = x - cx, dy = y - cy;
        if (dx*dx + dy*dy <= r2) setPixel(x, y, r, g, b, a);
      }
    }
  }

  function fillRect(x, y, w, h, r, g, b, a = 255) {
    for (let py = y; py < y + h; py++) {
      for (let px = x; px < x + w; px++) {
        setPixel(px, py, r, g, b, a);
      }
    }
  }

  function roundedRect(x0, y0, w, h, radius, r, g, b, a = 255) {
    fillRect(x0 + radius, y0, w - 2 * radius, h, r, g, b, a);
    fillRect(x0, y0 + radius, w, h - 2 * radius, r, g, b, a);
    fillCircle(x0 + radius, y0 + radius, radius, r, g, b, a);
    fillCircle(x0 + w - radius, y0 + radius, radius, r, g, b, a);
    fillCircle(x0 + radius, y0 + h - radius, radius, r, g, b, a);
    fillCircle(x0 + w - radius, y0 + h - radius, radius, r, g, b, a);
  }

  const s = size;
  const cx = Math.floor(s / 2);
  const cy = Math.floor(s / 2);

  // Background: dark navy rounded rect
  roundedRect(0, 0, s, s, Math.floor(s * 0.12), 0x1a, 0x1a, 0x2e);

  // Green field circle
  const fieldR = Math.floor(s * 0.38);
  fillCircle(cx, cy, fieldR, 0x15, 0x80, 0x3d);

  // White football
  const ballR = Math.floor(s * 0.14);
  fillCircle(cx, cy, ballR, 0xff, 0xff, 0xff);

  // Dark patches on ball (pentagon approximation)
  const patchAngles = [0, 72, 144, 216, 288].map(d => d * Math.PI / 180);
  const patchDist = Math.floor(ballR * 0.45);
  const patchR = Math.floor(ballR * 0.22);
  patchAngles.forEach(a => {
    const px = cx + Math.round(patchDist * Math.cos(a));
    const py = cy + Math.round(patchDist * Math.sin(a));
    fillCircle(px, py, patchR, 0x1a, 0x1a, 0x2e);
  });
  fillCircle(cx, cy, Math.floor(ballR * 0.18), 0x1a, 0x1a, 0x2e);

  // Gold bar at bottom
  const barH = Math.floor(s * 0.12);
  const barY = Math.floor(s * 0.82);
  fillRect(Math.floor(s * 0.2), barY, Math.floor(s * 0.6), barH, 0xC9, 0xA2, 0x27);

  // Build scanlines: filter type 0 (None) before each row
  const scanlines = Buffer.allocUnsafe(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    scanlines[y * (1 + width * 4)] = 0; // filter type None
    pixels.copy
      ? Buffer.from(pixels.buffer).copy(scanlines, y * (1 + width * 4) + 1, y * width * 4, (y + 1) * width * 4)
      : scanlines.set(pixels.slice(y * width * 4, (y + 1) * width * 4), y * (1 + width * 4) + 1);
  }

  const compressed = await deflateSync(scanlines);

  const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.allocUnsafe(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 6;  // color type RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

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

const [png192, png512] = await Promise.all([
  generatePNG(192),
  generatePNG(512),
]);

writeFileSync(join(outDir, 'icon-192.png'), png192);
console.log('✓ icon-192.png');

writeFileSync(join(outDir, 'icon-512.png'), png512);
console.log('✓ icon-512.png');
