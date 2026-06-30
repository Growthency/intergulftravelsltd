import type { Locale } from '@/lib/i18n';

const dict = {
  en: {
    cards: {
      visit: 'Visit our office',
      call: 'Call us',
      email: 'Email us',
      hours: 'Office hours',
      fridayClosed: 'Friday — Closed',
    },
    hero: {
      eyebrow: 'Contact Us',
      titleA: "Let's plan your ",
      titleHighlight: 'next journey',
      lead: 'Our advisors are here to help with Hajj, Umrah, visas, air tickets, hotels and tours. Reach us however suits you — and expect a warm, prompt reply.',
      crumb: 'Contact Us',
    },
    form: {
      badge: 'Send a message',
      heading: 'Write to us',
      intro: "Fill in the form and our team will respond as soon as possible, insha'Allah.",
    },
    chat: {
      heading: 'Prefer to chat?',
      body: 'Message us on WhatsApp for the fastest response, or follow us to keep up with departures and offers.',
      whatsappMessage: 'Assalamu alaikum! I have a question for Inter Gulf Travels.',
      whatsappCta: 'Chat on WhatsApp',
    },
    formFields: {
      subjects: [
        'Hajj enquiry',
        'Umrah enquiry',
        'Visa service',
        'Air ticket',
        'Hotel booking',
        'Tour package',
        'General question',
      ],
      labels: {
        name: 'Full name',
        phone: 'Phone',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
      },
      placeholders: {
        name: 'e.g. Md. Abdur Rahman',
        phone: '01XXX XXXXXX',
        email: 'you@example.com',
        message: 'Tell us about your plans — dates, number of travellers, budget or any questions you have.',
      },
      errors: {
        nameRequired: 'Please enter your full name.',
        phoneRequired: 'Please enter your phone number.',
        phoneInvalid: 'Please enter a valid phone number.',
        emailRequired: 'Please enter your email address.',
        emailInvalid: 'Please enter a valid email address.',
        subjectRequired: 'Please choose a subject.',
        messageRequired: 'Please write a short message.',
        messageMin: 'Please tell us a little more (min. 10 characters).',
      },
      submit: 'Send message',
      submitting: 'Sending…',
      privacyA: 'We respect your privacy. Your details are used only to respond to your enquiry — see our ',
      privacyLink: 'Privacy Policy',
      toast: {
        genericError: 'Something went wrong. Please try again or call us directly.',
        success: 'Thank you! Your message has reached us — we will be in touch shortly, insha’Allah.',
        networkError: 'Network error. Please check your connection and try again.',
      },
    },
  },
  bn: {
    cards: {
      visit: 'আমাদের অফিসে আসুন',
      call: 'আমাদের কল করুন',
      email: 'আমাদের ইমেইল করুন',
      hours: 'অফিসের সময়',
      fridayClosed: 'শুক্রবার — বন্ধ',
    },
    hero: {
      eyebrow: 'যোগাযোগ',
      titleA: 'আসুন আপনার ',
      titleHighlight: 'পরবর্তী যাত্রার পরিকল্পনা করি',
      lead: 'হজ, উমরাহ, ভিসা, বিমান টিকিট, হোটেল ও ট্যুর — সব বিষয়ে সহায়তা করতে আমাদের উপদেষ্টাগণ প্রস্তুত। আপনার সুবিধামতো যেকোনো উপায়ে আমাদের সাথে যোগাযোগ করুন — দ্রুত ও আন্তরিক সাড়া পাবেন।',
      crumb: 'যোগাযোগ',
    },
    form: {
      badge: 'একটি বার্তা পাঠান',
      heading: 'আমাদের লিখুন',
      intro: 'ফর্মটি পূরণ করুন, আমাদের টিম যত দ্রুত সম্ভব সাড়া দেবে, ইনশাআল্লাহ।',
    },
    chat: {
      heading: 'চ্যাট করতে চান?',
      body: 'দ্রুততম সাড়ার জন্য হোয়াটসঅ্যাপে আমাদের বার্তা পাঠান, অথবা যাত্রা ও অফারের খবর পেতে আমাদের ফলো করুন।',
      whatsappMessage: 'আসসালামু আলাইকুম! Inter Gulf Travels-এর কাছে আমার একটি প্রশ্ন আছে।',
      whatsappCta: 'হোয়াটসঅ্যাপে চ্যাট করুন',
    },
    formFields: {
      subjects: [
        'হজ সম্পর্কিত জিজ্ঞাসা',
        'উমরাহ সম্পর্কিত জিজ্ঞাসা',
        'ভিসা সেবা',
        'বিমান টিকিট',
        'হোটেল বুকিং',
        'ট্যুর প্যাকেজ',
        'সাধারণ প্রশ্ন',
      ],
      labels: {
        name: 'পূর্ণ নাম',
        phone: 'ফোন',
        email: 'ইমেইল',
        subject: 'বিষয়',
        message: 'বার্তা',
      },
      placeholders: {
        name: 'যেমন: মো. আব্দুর রহমান',
        phone: '01XXX XXXXXX',
        email: 'you@example.com',
        message: 'আপনার পরিকল্পনা সম্পর্কে আমাদের জানান — তারিখ, ভ্রমণকারীর সংখ্যা, বাজেট কিংবা আপনার যেকোনো প্রশ্ন।',
      },
      errors: {
        nameRequired: 'অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।',
        phoneRequired: 'অনুগ্রহ করে আপনার ফোন নম্বর লিখুন।',
        phoneInvalid: 'অনুগ্রহ করে একটি সঠিক ফোন নম্বর লিখুন।',
        emailRequired: 'অনুগ্রহ করে আপনার ইমেইল ঠিকানা লিখুন।',
        emailInvalid: 'অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা লিখুন।',
        subjectRequired: 'অনুগ্রহ করে একটি বিষয় নির্বাচন করুন।',
        messageRequired: 'অনুগ্রহ করে একটি সংক্ষিপ্ত বার্তা লিখুন।',
        messageMin: 'অনুগ্রহ করে আরও কিছু লিখুন (সর্বনিম্ন ১০ অক্ষর)।',
      },
      submit: 'বার্তা পাঠান',
      submitting: 'পাঠানো হচ্ছে…',
      privacyA: 'আমরা আপনার গোপনীয়তাকে সম্মান করি। আপনার তথ্য কেবল আপনার জিজ্ঞাসার উত্তর দিতেই ব্যবহৃত হয় — দেখুন আমাদের ',
      privacyLink: 'গোপনীয়তা নীতি',
      toast: {
        genericError: 'কিছু একটা সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন অথবা সরাসরি আমাদের কল করুন।',
        success: 'ধন্যবাদ! আপনার বার্তা আমাদের কাছে পৌঁছেছে — আমরা শীঘ্রই যোগাযোগ করব, ইনশাআল্লাহ।',
        networkError: 'নেটওয়ার্ক সমস্যা। অনুগ্রহ করে আপনার সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।',
      },
    },
  },
};

export function getDict(locale: Locale) {
  return dict[locale];
}
