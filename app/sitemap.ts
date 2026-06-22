import type { MetadataRoute } from 'next';
import { branches } from '@/lib/site';
import { getPosts } from '@/lib/blog';
import { getBaseUrl } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();

  const staticPaths = [
    '', '/about', '/about/associates', '/about/career', '/about/reviews', '/about/awards', '/about/team',
    '/hajj', '/hajj/benefit', '/hajj/packages', '/hajj/guide', '/hajj/guideline', '/hajj/faq',
    '/umrah', '/umrah/benefit', '/umrah/packages', '/umrah/guide', '/umrah/guideline', '/umrah/faq',
    '/services', '/services/visa', '/services/air-ticket', '/services/hotel-booking', '/services/tour',
    '/branches', ...branches.map((b) => `/branches/${b.slug}`),
    '/gallery', '/videos', '/blog', '/contact', '/estimate', '/terms', '/privacy',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));

  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts();
    postEntries = posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch {
    // ignore
  }

  return [...staticEntries, ...postEntries];
}
