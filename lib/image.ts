import sharp from 'sharp';

export const ACCEPTED_UPLOAD_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/tiff',
  'image/bmp',
];

export const MAX_UPLOAD_BYTES = 12 * 1024 * 1024; // 12MB pre-conversion

export interface WebpResult {
  buffer: Buffer;
  width: number;
  height: number;
  bytes: number;
}

/**
 * Convert ANY supported raster image to an optimized WebP.
 *
 * This is the single choke-point that enforces the "every image on the site is
 * WebP" rule — both the convert-public-folder script and the admin upload API
 * route call this, so a JPG/PNG can never reach storage in its original format.
 */
export async function toOptimizedWebp(
  input: Buffer | Uint8Array,
  opts: { maxWidth?: number; quality?: number } = {},
): Promise<WebpResult> {
  const { maxWidth = 1920, quality = 80 } = opts;

  const pipeline = sharp(input, { failOn: 'none' }).rotate(); // honour EXIF orientation

  const meta = await pipeline.metadata();
  if (meta.width && meta.width > maxWidth) {
    pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  const buffer = await pipeline
    .webp({ quality, effort: 5, smartSubsample: true })
    .toBuffer();

  const out = await sharp(buffer).metadata();
  return {
    buffer,
    width: out.width ?? 0,
    height: out.height ?? 0,
    bytes: buffer.length,
  };
}

/** Force a `.webp` extension on any filename. */
export function toWebpFilename(name: string) {
  const base = name.replace(/\.[a-z0-9]+$/i, '').replace(/[^a-z0-9-_]+/gi, '-').toLowerCase();
  return `${base || 'image'}.webp`;
}
