/**
 * Generates visible project preview PNGs (1280×720) for the portfolio.
 * Run: node scripts/generate-project-images.mjs
 */
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../src/assets/projects');

const projects = [
  { file: 'prestamos.png', title: 'PrestamosFacil', color: [6, 182, 212] },
  { file: 'urbangym.png', title: 'UrbanGYM', color: [16, 185, 129] },
  { file: 'hotel.png', title: 'Hotel Cacique T', color: [245, 158, 11] },
  { file: 'granero.png', title: 'Gestion Granero', color: [139, 92, 246] },
  { file: 'granero1.png', title: 'Gestion Granero', color: [99, 102, 241] },
];

const W = 1280;
const H = 720;

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function makePng([r, g, b], title) {
  const rowSize = 1 + W * 3;
  const raw = Buffer.alloc(rowSize * H);
  for (let y = 0; y < H; y++) {
    const off = y * rowSize;
    raw[off] = 0;
    const t = y / H;
    for (let x = 0; x < W; x++) {
      const p = off + 1 + x * 3;
      const vignette = 1 - t * 0.35;
      const stripe = Math.sin((x / W) * Math.PI * 4 + t * 2) * 0.04;
      raw[p] = Math.min(255, Math.floor((17 + r * 0.12 * vignette + stripe * 40)));
      raw[p + 1] = Math.min(255, Math.floor((17 + g * 0.12 * vignette + stripe * 40)));
      raw[p + 2] = Math.min(255, Math.floor((17 + b * 0.12 * vignette + stripe * 40)));
    }
  }
  const compressed = zlib.deflateSync(raw);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(W, 0);
  ihdr.writeUInt32BE(H, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

mkdirSync(outDir, { recursive: true });
for (const p of projects) {
  const path = join(outDir, p.file);
  writeFileSync(path, makePng(p.color, p.title));
  console.log('Wrote', path);
}
