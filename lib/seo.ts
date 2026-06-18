import { siteConfig, contact, social } from '@/lib/site';
import type { BlogPost } from '@/lib/blog-types';

const BASE = siteConfig.url.replace(/\/$/, '');

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: `${contact.address.line1}, ${contact.address.line2}`,
  addressLocality: 'Dhaka',
  postalCode: '1000',
  addressCountry: 'BD',
} as const;

const socialLinks = social
  .map((s) => s.href)
  .filter((h) => h && !/\/$/.test(h) && !h.includes('wa.me'));

/** TravelAgency / Organization — homepage. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${BASE}/#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: BASE,
    logo: `${BASE}/favicon.svg`,
    image: `${BASE}/opengraph-image`,
    description: siteConfig.description,
    telephone: `+880${contact.phones[0].replace(/\D/g, '').replace(/^0/, '')}`,
    email: contact.emails[0],
    foundingDate: String(siteConfig.founded),
    address: postalAddress,
    areaServed: { '@type': 'Country', name: 'Bangladesh' },
    sameAs: socialLinks,
    slogan: siteConfig.tagline,
  };
}

/** LocalBusiness — physical office (helps local/maps SEO). */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${BASE}/#localbusiness`,
    name: siteConfig.legalName,
    image: `${BASE}/opengraph-image`,
    url: BASE,
    telephone: `+880${contact.phones[0].replace(/\D/g, '').replace(/^0/, '')}`,
    priceRange: '৳৳',
    address: postalAddress,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '10:00',
      closes: '20:00',
    },
  };
}

/** WebSite + Sitelinks search box. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE}/#website`,
    url: BASE,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: 'en',
    publisher: { '@id': `${BASE}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/blog?search={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(it.url ? { item: it.url.startsWith('http') ? it.url : `${BASE}${it.url}` } : {}),
    })),
  };
}

export function articleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [post.cover ? (post.cover.startsWith('http') ? post.cover : `${BASE}${post.cover}`) : `${BASE}/og.png`],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { '@type': 'Organization', name: post.author || siteConfig.name, url: BASE },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.legalName,
      logo: { '@type': 'ImageObject', url: `${BASE}/favicon.svg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/blog/${post.slug}` },
    inLanguage: 'en',
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
