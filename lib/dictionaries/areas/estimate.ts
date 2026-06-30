import type { Locale } from '@/lib/i18n';

const dict = {
  en: {
    meta: {
      title: 'Get a Free Estimate',
      description:
        'Request a free, no-obligation estimate for Hajj, Umrah, visa, air tickets, hotels or tours from Inter Gulf Travels Ltd, Dhaka. Tell us your plans and receive a clear, tailored quote.',
    },
    hero: {
      eyebrow: 'Free Estimate',
      titlePrefix: 'Get a free, tailored ',
      titleHighlight: 'quote today',
      lead: 'Share a few details about your trip and our advisors will prepare a clear, no-obligation estimate — for Hajj, Umrah, visas, flights, hotels or tours.',
      crumb: 'Free Estimate',
    },
    valueProps: [
      {
        title: 'Completely free',
        body: 'No charge and no obligation — request as many estimates as you like.',
      },
      {
        title: 'Fast turnaround',
        body: 'Our advisors prepare your tailored quote quickly, usually within a working day.',
      },
      {
        title: 'Transparent pricing',
        body: 'Every quote is clearly itemised — what is included, and what is not.',
      },
      {
        title: 'Tailored to you',
        body: 'Tell us your dates, budget and party size; we shape the plan around you.',
      },
    ],
    includedNotes: [
      'A clear breakdown of what your package includes',
      'Honest guidance on the best option for your budget',
      'Answers to your visa, flight and hotel questions',
      'Zero pressure — decide in your own time',
    ],
    formPanel: {
      badge: 'Estimate request',
      heading: 'Tell us about your trip',
      sub: 'The more you share, the more accurate your estimate will be. Every field with a date or number helps us tailor it.',
    },
    receive: {
      heading: "What you'll receive",
    },
    talk: {
      heading: 'Rather talk it through?',
      body: 'Our advisors are a call or message away — happy to answer questions before you commit to anything.',
      whatsappMessage: 'Assalamu alaikum! I would like a free estimate for a trip.',
      whatsappCta: 'Chat on WhatsApp',
    },
    form: {
      labels: {
        name: 'Full name',
        phone: 'Phone',
        email: 'Email',
        service: 'Service',
        package: 'Package / tier',
        travelDate: 'Preferred travel date',
        pax: 'Travellers (pax)',
        message: 'Anything else? (optional)',
      },
      placeholders: {
        name: 'e.g. Md. Abdur Rahman',
        phone: '01XXX XXXXXX',
        email: 'you@example.com',
        pax: '1',
        message:
          'Budget, hotel preference, special assistance, departure city — anything that helps us tailor your estimate.',
      },
      packageHints: [
        'Economy',
        'Standard',
        'Premium / VIP',
        'Family',
        'Group',
        'Custom / not sure yet',
      ],
      errors: {
        nameRequired: 'Please enter your full name.',
        phoneRequired: 'Please enter your phone number.',
        phoneInvalid: 'Please enter a valid phone number.',
        emailRequired: 'Please enter your email address.',
        emailInvalid: 'Please enter a valid email address.',
        serviceRequired: 'Please select a service.',
        paxRequired: 'Please enter the number of travellers.',
        paxMin: 'At least one traveller is required.',
        paxMax: 'Please contact us directly for groups over 500.',
      },
      submitting: 'Submitting…',
      submit: 'Get my free estimate',
      disclaimer:
        'No payment required. Submitting this form places you under no obligation — we will simply prepare a tailored quote and answer your questions.',
      toast: {
        genericError: 'Something went wrong. Please try again or call us directly.',
        success:
          'Request received! Our advisor will prepare your free estimate and contact you soon, insha’Allah.',
        networkError: 'Network error. Please check your connection and try again.',
      },
    },
  },
  bn: {
    meta: {
      title: 'বিনামূল্যে একটি প্রাক্কলন নিন',
      description:
        'ঢাকার ইন্টার গাল্ফ ট্রাভেলস লিমিটেড থেকে হজ, উমরাহ, ভিসা, বিমান টিকিট, হোটেল বা ট্যুরের জন্য বিনামূল্যে, কোনো বাধ্যবাধকতা ছাড়াই একটি প্রাক্কলন নিন। আপনার পরিকল্পনা আমাদের জানান এবং একটি স্পষ্ট, আপনার উপযোগী কোটেশন পান।',
    },
    hero: {
      eyebrow: 'বিনামূল্যে প্রাক্কলন',
      titlePrefix: 'আজই বিনামূল্যে, আপনার উপযোগী ',
      titleHighlight: 'কোটেশন নিন',
      lead: 'আপনার ভ্রমণ সম্পর্কে কয়েকটি তথ্য জানান, আর আমাদের পরামর্শকেরা হজ, উমরাহ, ভিসা, ফ্লাইট, হোটেল বা ট্যুরের জন্য একটি স্পষ্ট, কোনো বাধ্যবাধকতা ছাড়াই প্রাক্কলন তৈরি করে দেবেন।',
      crumb: 'বিনামূল্যে প্রাক্কলন',
    },
    valueProps: [
      {
        title: 'সম্পূর্ণ বিনামূল্যে',
        body: 'কোনো খরচ নেই, কোনো বাধ্যবাধকতা নেই — আপনি যত খুশি প্রাক্কলন চাইতে পারেন।',
      },
      {
        title: 'দ্রুত সাড়া',
        body: 'আমাদের পরামর্শকেরা আপনার উপযোগী কোটেশন দ্রুত তৈরি করেন, সাধারণত এক কর্মদিবসের মধ্যেই।',
      },
      {
        title: 'স্বচ্ছ মূল্য',
        body: 'প্রতিটি কোটেশন স্পষ্টভাবে ভাগ করা থাকে — কী কী অন্তর্ভুক্ত আছে এবং কী নেই।',
      },
      {
        title: 'আপনার জন্য বিশেষভাবে তৈরি',
        body: 'আপনার তারিখ, বাজেট ও যাত্রীসংখ্যা জানান; আমরা পরিকল্পনাটি আপনার প্রয়োজন অনুযায়ী সাজিয়ে দিই।',
      },
    ],
    includedNotes: [
      'আপনার প্যাকেজে কী কী অন্তর্ভুক্ত তার স্পষ্ট বিবরণ',
      'আপনার বাজেটের জন্য সেরা বিকল্প নিয়ে সৎ পরামর্শ',
      'আপনার ভিসা, ফ্লাইট ও হোটেল সংক্রান্ত প্রশ্নের উত্তর',
      'কোনো চাপ নেই — নিজের সময় নিয়ে সিদ্ধান্ত নিন',
    ],
    formPanel: {
      badge: 'প্রাক্কলনের অনুরোধ',
      heading: 'আপনার ভ্রমণ সম্পর্কে আমাদের জানান',
      sub: 'আপনি যত বেশি তথ্য দেবেন, আপনার প্রাক্কলন তত নির্ভুল হবে। তারিখ বা সংখ্যাসহ প্রতিটি ঘর আমাদের এটি আপনার উপযোগী করতে সাহায্য করে।',
    },
    receive: {
      heading: 'আপনি যা পাবেন',
    },
    talk: {
      heading: 'বরং সরাসরি কথা বলবেন?',
      body: 'আমাদের পরামর্শকেরা একটি কল বা মেসেজ দূরত্বে আছেন — কোনো সিদ্ধান্ত নেওয়ার আগে আপনার প্রশ্নের উত্তর দিতে আমরা সর্বদা প্রস্তুত।',
      whatsappMessage: 'আসসালামু আলাইকুম! আমি একটি ভ্রমণের জন্য বিনামূল্যে প্রাক্কলন চাই।',
      whatsappCta: 'হোয়াটসঅ্যাপে চ্যাট করুন',
    },
    form: {
      labels: {
        name: 'পূর্ণ নাম',
        phone: 'ফোন',
        email: 'ইমেইল',
        service: 'সেবা',
        package: 'প্যাকেজ / শ্রেণি',
        travelDate: 'পছন্দের ভ্রমণের তারিখ',
        pax: 'যাত্রীসংখ্যা (প্যাক্স)',
        message: 'আর কিছু বলতে চান? (ঐচ্ছিক)',
      },
      placeholders: {
        name: 'যেমন: মো. আব্দুর রহমান',
        phone: '01XXX XXXXXX',
        email: 'you@example.com',
        pax: '১',
        message:
          'বাজেট, হোটেলের পছন্দ, বিশেষ সহায়তা, যাত্রার শহর — যা কিছু আপনার প্রাক্কলন উপযোগী করতে সাহায্য করবে।',
      },
      packageHints: [
        'ইকোনমি',
        'স্ট্যান্ডার্ড',
        'প্রিমিয়াম / ভিআইপি',
        'পরিবার',
        'গ্রুপ',
        'কাস্টম / এখনও নিশ্চিত নই',
      ],
      errors: {
        nameRequired: 'অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।',
        phoneRequired: 'অনুগ্রহ করে আপনার ফোন নম্বর লিখুন।',
        phoneInvalid: 'অনুগ্রহ করে একটি সঠিক ফোন নম্বর লিখুন।',
        emailRequired: 'অনুগ্রহ করে আপনার ইমেইল ঠিকানা লিখুন।',
        emailInvalid: 'অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা লিখুন।',
        serviceRequired: 'অনুগ্রহ করে একটি সেবা নির্বাচন করুন।',
        paxRequired: 'অনুগ্রহ করে যাত্রীসংখ্যা লিখুন।',
        paxMin: 'কমপক্ষে একজন যাত্রী প্রয়োজন।',
        paxMax: '৫০০-এর বেশি গ্রুপের জন্য অনুগ্রহ করে সরাসরি আমাদের সাথে যোগাযোগ করুন।',
      },
      submitting: 'জমা দেওয়া হচ্ছে…',
      submit: 'আমার বিনামূল্যের প্রাক্কলন নিন',
      disclaimer:
        'কোনো পেমেন্ট প্রয়োজন নেই। এই ফর্ম জমা দিলে আপনার ওপর কোনো বাধ্যবাধকতা থাকে না — আমরা কেবল একটি উপযোগী কোটেশন তৈরি করব এবং আপনার প্রশ্নের উত্তর দেব।',
      toast: {
        genericError: 'কিছু একটা সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন অথবা সরাসরি আমাদের কল করুন।',
        success:
          'অনুরোধ পাওয়া গেছে! আমাদের পরামর্শক আপনার বিনামূল্যের প্রাক্কলন তৈরি করে শীঘ্রই আপনার সাথে যোগাযোগ করবেন, ইনশাআল্লাহ।',
        networkError: 'নেটওয়ার্ক সমস্যা। অনুগ্রহ করে আপনার সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।',
      },
    },
  },
};

export function getDict(locale: Locale) {
  return dict[locale];
}
