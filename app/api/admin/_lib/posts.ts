import { z } from 'zod';
import { slugify, readingTime } from '@/lib/utils';

export const postSchema = z.object({
  title: z.string().trim().min(2, 'A title is required.').max(200),
  slug: z.string().trim().max(220).optional().default(''),
  excerpt: z.string().trim().max(500).optional().default(''),
  content: z.string().max(120_000).optional().default(''),
  category: z.enum(['hajj-umrah', 'others']).default('hajj-umrah'),
  tags: z.array(z.string().trim().min(1)).max(20).optional().default([]),
  author_name: z.string().trim().max(120).optional().default('Inter Gulf Travels'),
  author_role: z.string().trim().max(120).optional().default('Editorial Team'),
  read_time: z.string().trim().max(40).optional().default(''),
  tone: z.enum(['emerald', 'gold', 'forest', 'sand']).default('emerald'),
  featured_image: z.string().trim().url().max(600).optional().nullable().or(z.literal('')),
  status: z.enum(['draft', 'published', 'scheduled']).default('draft'),
  featured: z.boolean().optional().default(false),
  meta_title: z.string().trim().max(200).optional().default(''),
  meta_description: z.string().trim().max(320).optional().default(''),
  published_at: z.string().trim().max(40).optional().nullable(),
});

/** Normalise the validated payload into a DB row. */
export function buildPostRow(input: z.infer<typeof postSchema>) {
  const slug = (input.slug && slugify(input.slug)) || slugify(input.title);
  const now = new Date().toISOString();

  let publishedAt: string | null = input.published_at || null;
  if (input.status === 'published' && !publishedAt) publishedAt = now;
  if (input.status === 'draft') publishedAt = input.published_at || null;

  return {
    slug,
    title: input.title,
    excerpt: input.excerpt || null,
    content: input.content || '',
    category: input.category,
    tags: input.tags ?? [],
    author_name: input.author_name || 'Inter Gulf Travels',
    author_role: input.author_role || 'Editorial Team',
    read_time: input.read_time || readingTime(input.content || ''),
    tone: input.tone,
    featured_image: input.featured_image || null,
    status: input.status,
    featured: input.featured ?? false,
    meta_title: input.meta_title || null,
    meta_description: input.meta_description || null,
    published_at: publishedAt,
    updated_at: now,
  };
}
