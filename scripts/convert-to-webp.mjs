/**
 * Convert every raster image in /public to optimized WebP.
 *
 * The whole site is WebP-only. Drop any .jpg/.jpeg/.png/.tiff/.bmp into /public
 * and run:  npm run images:webp
 * Each file is converted in place and the original is removed (pass --keep to
 * keep originals). SVG / ICO / GIF / existing WebP are left untouched.
 */
import { readdir, stat, readFile, writeFile, unlink } from 'node:fs/promises';
import { join, extname, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const PUBLIC_DIR = fileURLToPath(new URL('../public/', import.meta.url));
const KEEP = process.argv.includes('--keep');
const CONVERTIBLE = new Set(['.jpg', '.jpeg', '.png', '.tiff', '.tif', '.bmp']);

let converted = 0;
let savedBytes = 0;

async function walk(dir) {
  let entries;
  try {
    entries = await readdir(dir);
  } catch {
    return;
  }
  for (const name of entries) {
    const full = join(dir, name);
    const info = await stat(full);
    if (info.isDirectory()) {
      await walk(full);
      continue;
    }
    const ext = extname(name).toLowerCase();
    if (!CONVERTIBLE.has(ext)) continue;

    const input = await readFile(full);
    const out = await sharp(input)
      .rotate()
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 80, effort: 5 })
      .toBuffer();

    const target = join(dirname(full), `${basename(name, ext)}.webp`);
    await writeFile(target, out);
    converted += 1;
    savedBytes += Math.max(0, input.length - out.length);
    if (!KEEP) await unlink(full);

    const rel = full.replace(PUBLIC_DIR, '');
    console.log(`  ✓ ${rel}  →  ${basename(target)}  (${(input.length / 1024).toFixed(0)}KB → ${(out.length / 1024).toFixed(0)}KB)`);
  }
}

console.log(`\nConverting images in /public to WebP${KEEP ? ' (keeping originals)' : ''}…\n`);
await walk(PUBLIC_DIR);
console.log(
  converted
    ? `\nDone. Converted ${converted} image(s), saved ~${(savedBytes / 1024).toFixed(0)}KB.\n`
    : '\nNo raster images found — everything is already WebP/SVG. ✓\n',
);
