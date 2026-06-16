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
