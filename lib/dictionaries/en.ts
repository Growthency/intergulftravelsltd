export const en = {
  nav: {
    home: 'Home',
    hajj: 'Hajj',
    umrah: 'Umrah',
    services: 'Services',
    branches: 'Branches',
    gallery: 'Gallery',
    blog: 'Blog',
    about: 'About Us',
    contact: 'Contact Us',
  },
  cta: {
    getEstimate: 'Get Free Estimate',
    explorePackages: 'Explore Packages',
  },
  utility: {
    hours: 'Saturday – Thursday · 10:00 AM – 8:00 PM',
    license: 'License No. 071 · Member of HAAB & ATAB',
  },
  langToggle: { label: 'Language', en: 'EN', bn: 'BN' },
  hero: {
    badge: 'Hajj License No. 071 · Trusted since 2002',
    titleTop: 'Your sacred journey to',
    phrases: ['the Kaaba', 'Makkah & Madinah', 'the Haramain', 'a lifetime'],
    titleBottom: 'begins with us.',
    lead: 'Government-licensed Hajj & Umrah from Bangladesh — direct flights, hotels steps from the Haram, Bangla-speaking guides and honest, all-inclusive pricing. We carry your journey so you can carry your prayers.',
    statYears: 'Years of service',
    statPilgrims: 'Pilgrims guided',
    statAirlines: 'Airline partners',
    rating: '4.9 / 5 · 12,000+ pilgrims',
    season: '2026 Season',
    seasonNote: 'Hajj pre-registration & Umrah booking is now open.',
    reserve: 'Reserve your seat',
  },
  footer: {
    description:
      'Inter Gulf Travels Ltd is one of the most trusted Hajj & Umrah agencies in Bangladesh. Government-licensed (Hajj License No. 071), we have guided pilgrims on the journey of a lifetime with honesty, comfort and care since 2002.',
    helpSupport: 'Help & Support',
    usefulLinks: 'Useful Links',
    contactUs: 'Contact Us',
    hours: 'Saturday – Thursday · 10:00 AM – 8:00 PM',
    rights: 'All rights reserved.',
    terms: 'Terms & Conditions',
    privacy: 'Privacy Policy',
    sitemap: 'Sitemap',
  },
};

// General-shaped type (plain string / string[]) so each locale can supply its
// own values. English is the reference for the key structure.
export type Dictionary = {
  nav: Record<'home' | 'hajj' | 'umrah' | 'services' | 'branches' | 'gallery' | 'blog' | 'about' | 'contact', string>;
  cta: { getEstimate: string; explorePackages: string };
  utility: { hours: string; license: string };
  langToggle: { label: string; en: string; bn: string };
  hero: {
    badge: string;
    titleTop: string;
    phrases: string[];
    titleBottom: string;
    lead: string;
    statYears: string;
    statPilgrims: string;
    statAirlines: string;
    rating: string;
    season: string;
    seasonNote: string;
    reserve: string;
  };
  footer: {
    description: string;
    helpSupport: string;
    usefulLinks: string;
    contactUs: string;
    hours: string;
    rights: string;
    terms: string;
    privacy: string;
    sitemap: string;
  };
};

const _typecheck: Dictionary = en;
void _typecheck;
