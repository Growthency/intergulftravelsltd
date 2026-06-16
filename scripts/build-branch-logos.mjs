/**
 * Rasterize the branch logo SVGs (assets/branch-logos/*.svg) into optimized,
 * transparent WebP files in /public/branches. Keeps the whole site WebP-only
 * while the source stays as crisp vectors.
 *
 *   node scripts/build-branch-logos.mjs
 */
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const SRC = fileURLToPath(new URL('../assets/branch-logos/', import.meta.url));
const OUT = fileURLToPath(new URL('../public/branches/', import.meta.url));

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => f.toLowerCase().endsWith('.svg'));

for (const f of files) {
  const svg = await readFile(join(SRC, f));
  const out = await sharp(svg, { density: 400 })
    .resize({ width: 900, height: 900, fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 92, effort: 6, alphaQuality: 100 })
    .toBuffer();
  const name = `${basename(f, '.svg')}.webp`;
  await writeFile(join(OUT, name), out);
  console.log(`  ✓ ${f}  →  branches/${name}  (${(out.length / 1024).toFixed(1)} KB)`);
}
console.log(`\nDone — ${files.length} logo(s) written to public/branches/.\n`);
