import type { Locale } from '@/lib/i18n';

const dict = {
  en: {
    hero: {
      eyebrow: 'Watch',
      titleLead: 'Our ',
      titleHighlight: 'Videos',
      lead: 'Clear, practical guidance for your sacred journey — from how each rite of Hajj and Umrah is performed to the experiences of pilgrims who travelled with us. Watch, learn and prepare with confidence.',
      crumb: 'Videos',
    },
    empty: {
      title: 'Videos coming soon',
      body: 'We are putting together a library of Hajj and Umrah guidance videos to help you prepare for every step of your journey. Check back shortly — or speak to an advisor in the meantime.',
      estimate: 'Get a Free Estimate',
      whatsapp: 'Ask on WhatsApp',
      whatsappMessage: 'Assalamu alaikum! I have a question about Hajj and Umrah.',
    },
    cta: {
      title: 'Ready to begin your own journey?',
      body: 'Our advisors are here to guide you from your first question to your safe return. Plan your Hajj, Umrah or holiday with a team that has served pilgrims since 2002.',
      estimate: 'Get a Free Estimate',
      whatsapp: 'Chat on WhatsApp',
      whatsappMessage: 'Assalamu alaikum! I would like to plan a journey with Inter Gulf Travels.',
    },
    gallery: {
      upNext: 'Up next',
      nowPlaying: 'Now playing',
      allVideos: 'All videos',
      videoCount: 'videos',
      playLabel: 'Play',
    },
  },
  bn: {
    hero: {
      eyebrow: 'দেখুন',
      titleLead: 'আমাদের ',
      titleHighlight: 'ভিডিও',
      lead: 'আপনার পবিত্র যাত্রার জন্য স্পষ্ট ও ব্যবহারিক দিকনির্দেশনা — হজ ও উমরাহর প্রতিটি বিধান কীভাবে পালন করতে হয় তা থেকে শুরু করে আমাদের সঙ্গে যাত্রা করা হাজিদের অভিজ্ঞতা পর্যন্ত। দেখুন, শিখুন এবং আত্মবিশ্বাসের সঙ্গে প্রস্তুতি নিন।',
      crumb: 'ভিডিও',
    },
    empty: {
      title: 'ভিডিও শীঘ্রই আসছে',
      body: 'আপনার যাত্রার প্রতিটি ধাপের জন্য প্রস্তুতি নিতে সহায়তা করতে আমরা হজ ও উমরাহ দিকনির্দেশনার একটি ভিডিও সংগ্রহ তৈরি করছি। শীঘ্রই আবার দেখুন — অথবা ইতিমধ্যে একজন উপদেষ্টার সঙ্গে কথা বলুন।',
      estimate: 'বিনামূল্যে একটি এস্টিমেট নিন',
      whatsapp: 'হোয়াটসঅ্যাপে জিজ্ঞাসা করুন',
      whatsappMessage: 'আসসালামু আলাইকুম! হজ ও উমরাহ সম্পর্কে আমার একটি প্রশ্ন আছে।',
    },
    cta: {
      title: 'আপনার নিজের যাত্রা শুরু করতে প্রস্তুত?',
      body: 'আপনার প্রথম প্রশ্ন থেকে নিরাপদ প্রত্যাবর্তন পর্যন্ত আমাদের উপদেষ্টারা আপনাকে পথ দেখাতে এখানে আছেন। ২০০২ সাল থেকে হাজিদের সেবা দিয়ে আসা একটি দলের সঙ্গে আপনার হজ, উমরাহ বা ছুটি পরিকল্পনা করুন।',
      estimate: 'বিনামূল্যে একটি এস্টিমেট নিন',
      whatsapp: 'হোয়াটসঅ্যাপে চ্যাট করুন',
      whatsappMessage: 'আসসালামু আলাইকুম! আমি ইন্টার গালফ ট্রাভেলসের সঙ্গে একটি যাত্রা পরিকল্পনা করতে চাই।',
    },
    gallery: {
      upNext: 'পরবর্তী',
      nowPlaying: 'এখন চলছে',
      allVideos: 'সব ভিডিও',
      videoCount: 'টি ভিডিও',
      playLabel: 'চালান',
    },
  },
};

export function getDict(locale: Locale) {
  return dict[locale];
}
