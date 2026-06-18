/** Pure blog types + helpers — safe to import from client OR server code. */

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // sanitized HTML
  category: 'hajj-umrah' | 'others';
  categoryLabel: string;
  tags: string[];
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  tone: 'emerald' | 'gold' | 'forest' | 'sand';
  cover?: string | null; // optional webp path / URL
  featured?: boolean;
};

const tones: Record<BlogPost['tone'], string> = {
  emerald: 'from-brand-600 via-brand-700 to-brand-900',
  gold: 'from-gold-400 via-gold-500 to-gold-700',
  forest: 'from-brand-800 via-brand-900 to-ink',
  sand: 'from-gold-200 via-gold-300 to-brand-600',
};

export function toneGradient(tone: BlogPost['tone']) {
  return tones[tone];
}

/** Site photos used as blog covers until an admin uploads a featured image. */
const FALLBACK_COVERS = [
  '/gallery/pilgrims-haram.webp',
  '/gallery/group-haram.webp',
  '/gallery/office-handover.webp',
];

/** Resolve a cover image for a post: its uploaded cover, else a stable site photo. */
export function coverFor(post: Pick<BlogPost, 'slug' | 'cover'>): string {
  if (post.cover) return post.cover;
  let h = 0;
  for (let i = 0; i < post.slug.length; i++) h = (h * 31 + post.slug.charCodeAt(i)) >>> 0;
  return FALLBACK_COVERS[h % FALLBACK_COVERS.length];
}
