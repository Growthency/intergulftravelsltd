import { getPosts } from '@/lib/blog';
import { siteConfig } from '@/lib/site';
import { getBaseUrl } from '@/lib/utils';

export const revalidate = 3600;

function esc(s: string) {
  return (s || '').replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]!));
}

export async function GET() {
  const base = getBaseUrl();

  let posts: Awaited<ReturnType<typeof getPosts>> = [];
  try {
    posts = await getPosts({ limit: 30 });
  } catch {
    // empty feed rather than an error
  }

  const items = posts
    .map(
      (p) => `
    <item>
      <title>${esc(p.title)}</title>
      <link>${base}/blog/${p.slug}</link>
      <guid isPermaLink="true">${base}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <category>${esc(p.categoryLabel)}</category>
      <description>${esc(p.excerpt)}</description>
    </item>`,
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(siteConfig.name)} — Blog</title>
    <link>${base}/blog</link>
    <description>${esc(siteConfig.description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
