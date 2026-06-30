import type { Locale } from '@/lib/i18n';

const dict = {
  en: {
    meta: {
      title: 'Blog — Hajj, Umrah & Travel Journal',
      description:
        'Guides, checklists and travel tips from Inter Gulf Travels Ltd — a government-licensed Hajj & Umrah agency in Dhaka. Practical advice to help you prepare for the journey of a lifetime.',
      ogTitle: 'Our Journal',
      ogDescription:
        'Hajj & Umrah guides, Saudi visa help and family travel inspiration from Bangladesh’s trusted pilgrimage specialists.',
    },
    hero: {
      eyebrow: 'Our Journal',
      titleA: 'Guides, reflections & ',
      titleHighlight: 'travel wisdom',
      lead: 'Practical advice for pilgrims and travellers — from Hajj preparation and Umrah guides to Saudi visas and family holidays you can book from Dhaka.',
      crumb: 'Blog',
    },
    tabs: {
      all: 'All Articles',
      hajjUmrah: 'Hajj & Umrah',
      others: 'Travel & Tips',
    },
    featured: {
      badge: 'Featured',
      by: 'By',
      readFull: 'Read the full article',
    },
    list: {
      resultsSingular: 'result for',
      resultsPlural: 'results for',
      readArticle: 'Read article',
      emptySearch: (q: string) => `No articles match “${q}”. Try a different keyword.`,
      emptyCategory: 'No articles in this category yet — please check back soon.',
    },
    search: {
      placeholder: 'Search articles, e.g. “Umrah”, “visa”…',
      ariaLabel: 'Search articles',
      clearLabel: 'Clear search',
      noneTitle: 'No articles found',
      noneBody: (q: string) =>
        `We couldn’t find anything for “${q}”. Try a different word or browse all articles.`,
    },
    cta: {
      eyebrow: 'Plan your journey',
      heading: 'Have a question about Hajj, Umrah or travel?',
      body: 'Our advisors answer honestly, with no obligation. Reach out and we’ll help you plan the right journey for your dates and budget.',
      advisor: 'Talk to an advisor',
      estimate: 'Get a free estimate',
    },
    pagination: {
      ariaLabel: 'Blog pagination',
      previous: 'Previous page',
      next: 'Next page',
    },
    article: {
      breadcrumbHome: 'Home',
      breadcrumbBlog: 'Blog',
      allArticles: 'All articles',
      foundHelpful: 'Found this helpful?',
      shareWith: 'Share it with someone planning their journey.',
      ctaHeading: 'Ready to plan your Hajj, Umrah or holiday?',
      ctaBody:
        'Government-licensed since 2002. Get an honest, no-obligation estimate tailored to your dates and budget.',
      ctaEstimate: 'Get a free estimate',
      ctaContact: 'Contact us',
      keepReading: 'Keep reading',
      relatedHeading: 'Related articles',
      backToAll: 'Back to all articles',
      notFound: 'Article not found',
    },
    share: {
      label: 'Share',
      whatsapp: 'Share on WhatsApp',
      facebook: 'Share on Facebook',
      x: 'Share on X',
      copy: 'Copy link',
      copied: 'Link copied to clipboard',
      copyFailed: 'Could not copy the link',
      brandSuffix: 'Inter Gulf Travels Ltd',
    },
  },
  bn: {
    meta: {
      title: 'ব্লগ — হজ, উমরাহ ও ভ্রমণ জার্নাল',
      description:
        'Inter Gulf Travels Ltd-এর গাইড, চেকলিস্ট ও ভ্রমণ পরামর্শ — ঢাকার একটি সরকার-অনুমোদিত হজ ও উমরাহ এজেন্সি। জীবনের শ্রেষ্ঠ যাত্রার প্রস্তুতিতে সহায়ক বাস্তবসম্মত পরামর্শ।',
      ogTitle: 'আমাদের জার্নাল',
      ogDescription:
        'বাংলাদেশের বিশ্বস্ত হজ-উমরাহ বিশেষজ্ঞদের কাছ থেকে হজ ও উমরাহ গাইড, সৌদি ভিসা সহায়তা এবং পারিবারিক ভ্রমণের অনুপ্রেরণা।',
    },
    hero: {
      eyebrow: 'আমাদের জার্নাল',
      titleA: 'গাইড, ভাবনা ও ',
      titleHighlight: 'ভ্রমণ প্রজ্ঞা',
      lead: 'হাজি ও ভ্রমণকারীদের জন্য বাস্তবসম্মত পরামর্শ — হজ প্রস্তুতি ও উমরাহ গাইড থেকে সৌদি ভিসা এবং ঢাকা থেকে বুক করা যায় এমন পারিবারিক ছুটির ভ্রমণ পর্যন্ত।',
      crumb: 'ব্লগ',
    },
    tabs: {
      all: 'সব আর্টিকেল',
      hajjUmrah: 'হজ ও উমরাহ',
      others: 'ভ্রমণ ও টিপস',
    },
    featured: {
      badge: 'ফিচার্ড',
      by: 'লিখেছেন',
      readFull: 'সম্পূর্ণ আর্টিকেল পড়ুন',
    },
    list: {
      resultsSingular: 'টি ফলাফল —',
      resultsPlural: 'টি ফলাফল —',
      readArticle: 'আর্টিকেল পড়ুন',
      emptySearch: (q: string) => `“${q}” এর সাথে মিলে এমন কোনো আর্টিকেল নেই। অন্য কোনো কীওয়ার্ড চেষ্টা করুন।`,
      emptyCategory: 'এই বিভাগে এখনও কোনো আর্টিকেল নেই — অনুগ্রহ করে শীঘ্রই আবার দেখুন।',
    },
    search: {
      placeholder: 'আর্টিকেল খুঁজুন, যেমন “উমরাহ”, “ভিসা”…',
      ariaLabel: 'আর্টিকেল খুঁজুন',
      clearLabel: 'খোঁজা পরিষ্কার করুন',
      noneTitle: 'কোনো আর্টিকেল পাওয়া যায়নি',
      noneBody: (q: string) =>
        `“${q}” এর জন্য আমরা কিছু খুঁজে পাইনি। অন্য একটি শব্দ চেষ্টা করুন কিংবা সব আর্টিকেল দেখুন।`,
    },
    cta: {
      eyebrow: 'আপনার যাত্রার পরিকল্পনা করুন',
      heading: 'হজ, উমরাহ কিংবা ভ্রমণ নিয়ে কোনো প্রশ্ন আছে?',
      body: 'আমাদের উপদেষ্টারা সততার সাথে, কোনো বাধ্যবাধকতা ছাড়াই উত্তর দেন। যোগাযোগ করুন, আমরা আপনার তারিখ ও বাজেট অনুযায়ী সঠিক যাত্রার পরিকল্পনায় সহায়তা করব।',
      advisor: 'একজন উপদেষ্টার সাথে কথা বলুন',
      estimate: 'বিনামূল্যে এস্টিমেট নিন',
    },
    pagination: {
      ariaLabel: 'ব্লগ পেজিনেশন',
      previous: 'পূর্ববর্তী পৃষ্ঠা',
      next: 'পরবর্তী পৃষ্ঠা',
    },
    article: {
      breadcrumbHome: 'হোম',
      breadcrumbBlog: 'ব্লগ',
      allArticles: 'সব আর্টিকেল',
      foundHelpful: 'এটি কি সহায়ক মনে হয়েছে?',
      shareWith: 'যিনি তার যাত্রার পরিকল্পনা করছেন তার সাথে শেয়ার করুন।',
      ctaHeading: 'আপনার হজ, উমরাহ কিংবা ছুটির পরিকল্পনা করতে প্রস্তুত?',
      ctaBody:
        '২০০২ সাল থেকে সরকার-অনুমোদিত। আপনার তারিখ ও বাজেট অনুযায়ী সৎ, বাধ্যবাধকতাহীন এস্টিমেট নিন।',
      ctaEstimate: 'বিনামূল্যে এস্টিমেট নিন',
      ctaContact: 'যোগাযোগ করুন',
      keepReading: 'পড়া চালিয়ে যান',
      relatedHeading: 'সম্পর্কিত আর্টিকেল',
      backToAll: 'সব আর্টিকেলে ফিরে যান',
      notFound: 'আর্টিকেল পাওয়া যায়নি',
    },
    share: {
      label: 'শেয়ার',
      whatsapp: 'হোয়াটসঅ্যাপে শেয়ার করুন',
      facebook: 'ফেসবুকে শেয়ার করুন',
      x: 'এক্স-এ শেয়ার করুন',
      copy: 'লিংক কপি করুন',
      copied: 'লিংক ক্লিপবোর্ডে কপি হয়েছে',
      copyFailed: 'লিংকটি কপি করা যায়নি',
      brandSuffix: 'Inter Gulf Travels Ltd',
    },
  },
};

export function getDict(locale: Locale) {
  return dict[locale];
}
