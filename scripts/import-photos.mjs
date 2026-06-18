/**
 * One-off: import the client's real photos into /public/gallery as optimized WebP.
 * Run again any time after dropping new source files (edit the jobs list).
 *   node scripts/import-photos.mjs
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const OUT = fileURLToPath(new URL('../public/gallery/', import.meta.url));
await mkdir(OUT, { recursive: true });

const D = 'C:/Users/User/Downloads/';
const jobs = [
  { src: D + '678225631_2302349643628333_6650516633127856201_n.jpg', name: 'pilgrims-haram', w: 1600 },
  { src: D + '676168173_2302350080294956_9155594602429463993_n.jpg', name: 'group-haram', w: 1600 },
  { src: D + '672684619_2301110317085599_4833619834780014925_n.jpg', name: 'office-handover', w: 1500 },
  { src: D + '0.jpg', name: 'hajj-2027-mokbul', w: 1200 },
];

for (const j of jobs) {
  try {
    const out = await sharp(j.src)
      .rotate()
      .resize({ width: j.w, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toBuffer();
    await writeFile(OUT + j.name + '.webp', out);
    console.log(`  ✓ ${j.name}.webp  (${(out.length / 1024).toFixed(0)} KB)`);
  } catch (e) {
    console.log(`  ✗ ${j.name}: ${e.message}`);
  }
}
console.log('\nDone.');
