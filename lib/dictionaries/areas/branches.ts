import type { Locale } from '@/lib/i18n';

const dict = {
  en: {
    meta: {
      title: 'Our Branches',
      description:
        'The Inter Gulf family of companies — Inter Gulf Travels Ltd. (Hajj License No. 071), Mokbul Hajj Overseas Service and Inter Gulf Air Travels.',
    },
    hero: {
      eyebrow: 'Our Group',
      titlePre: 'The Inter Gulf ',
      titleAccent: 'family of companies',
      lead: 'One trusted group, three government-approved concerns — together covering Hajj, Umrah, visa, worldwide air ticketing, tours and hotel booking under one roof.',
      crumb: 'Branches',
    },
    intro: {
      pre: 'Since ',
      post: ', the Inter Gulf group has grown from a single Hajj agency into a family of sister concerns serving pilgrims and travellers across Bangladesh. Every company shares the same office, team and promise of honest, personal service.',
    },
    learnMore: 'Learn more',
    headOffice: {
      eyebrow: 'One head office',
      titlePre: 'All three companies, ',
      titleAccent: 'one trusted address',
      lead: 'Visit us at our head office in the heart of Dhaka — the home of the entire Inter Gulf group.',
      label: 'Head Office',
      address: '31, K.R. Plaza, 5th–6th Floor, Purana Paltan, Dhaka-1000',
      contactCta: 'Contact us',
      estimateCta: 'Get a free estimate',
    },
    detail: {
      notFoundTitle: 'Branch not found',
      whatWeOffer: 'What we offer',
      officeSingular: 'Office',
      officePlural: 'Offices',
      quickFacts: 'Quick Facts',
      company: 'Company',
      status: 'Status',
      established: 'Established',
      email: 'Email',
      officeHours: 'Office hours',
      estimateCta: 'Get a free estimate',
      whatsappCta: 'Chat on WhatsApp',
      whatsappMessage: (name: string) =>
        `Assalamu alaikum! I'd like to know more about ${name}.`,
      otherCompanies: 'Other companies in the group',
    },
    hours: 'Saturday – Thursday · 10:00 AM – 8:00 PM',
    officeLabels: {
      'Head Office': 'Head Office',
      'Gazipur Office': 'Gazipur Office',
    } as Record<string, string>,
    branches: {
      'inter-gulf-travels': {
        role: 'Hajj License No. 071 · Govt. Approved',
        tagline: 'Our flagship Hajj & Umrah company, guiding pilgrims since 2002.',
        description: [
          'Inter Gulf Travels Ltd. is the flagship of the group and a government-licensed Hajj agency (Hajj License No. 071), a member of HAAB, ATAB and IATA. Since 2002 we have organised Hajj and Umrah journeys for thousands of pilgrims with honesty, comfort and care.',
          'From pre-registration and visa processing to flights, hotels near the Haram, full Ziyarat and Bangla-speaking guides, every part of the journey is managed in-house by our experienced team — so our pilgrims can focus entirely on their worship.',
        ],
        services: [
          'Hajj packages (economy to premium)',
          'Umrah packages year-round',
          'Hajj & Umrah visa processing',
          'Ziyarat & guided tours',
          'Pre-Hajj training workshops',
        ],
      },
      'mokbul-hajj-overseas': {
        role: 'Govt. Approved Travel Agency',
        tagline: 'Dedicated Hajj and overseas service within the Inter Gulf group.',
        description: [
          'Mokbul Hajj Overseas Service is a government-approved member of the Inter Gulf group, dedicated to Hajj pre-registration, processing and overseas pilgrim support.',
          'Sharing the same office, team and standards as Inter Gulf Travels Ltd., it gives pilgrims a second trusted channel for Hajj management, visa processing and document support — with the personal khedmat the group is known for.',
        ],
        services: [
          'Hajj pre-registration & processing',
          'Overseas Hajj & Umrah service',
          'Visa processing & document support',
          'Ground assistance in Saudi Arabia',
        ],
      },
      'inter-gulf-air-travels': {
        role: 'Govt. Approved Travel Agency',
        tagline: 'Air ticketing, tour packages and hotel booking for the whole world.',
        description: [
          'Inter Gulf Air Travels is the air-ticketing and general travel arm of the group, a government-approved agency issuing air tickets to every country in the world.',
          'Alongside Hajj & Umrah visa processing, we arrange tour packages and hotel bookings worldwide. With offices in both Purana Paltan, Dhaka and Joydebpur, Gazipur, we are always close to our travellers.',
        ],
        services: [
          'Worldwide air ticket issuance',
          'Hajj & Umrah visa processing',
          'Tour packages',
          'Hotel booking',
        ],
      },
    } as Record<
      string,
      { role: string; tagline: string; description: string[]; services: string[] }
    >,
  },
  bn: {
    meta: {
      title: 'আমাদের শাখাসমূহ',
      description:
        'ইন্টার গালফ পরিবারের প্রতিষ্ঠানসমূহ — Inter Gulf Travels Ltd. (হজ লাইসেন্স নং ০৭১), Mokbul Hajj Overseas Service এবং Inter Gulf Air Travels।',
    },
    hero: {
      eyebrow: 'আমাদের গ্রুপ',
      titlePre: 'ইন্টার গালফ ',
      titleAccent: 'পরিবারের প্রতিষ্ঠানসমূহ',
      lead: 'একটি বিশ্বস্ত গ্রুপ, তিনটি সরকার-অনুমোদিত প্রতিষ্ঠান — একসঙ্গে এক ছাদের নিচে হজ, ওমরাহ, ভিসা, বিশ্বব্যাপী এয়ার টিকেটিং, ট্যুর ও হোটেল বুকিং সেবা দিচ্ছে।',
      crumb: 'শাখাসমূহ',
    },
    intro: {
      pre: '',
      post: ' সাল থেকে ইন্টার গালফ গ্রুপ একটি একক হজ এজেন্সি থেকে বেড়ে উঠে বাংলাদেশজুড়ে হাজি ও ভ্রমণকারীদের সেবায় নিয়োজিত একটি সহযোগী প্রতিষ্ঠান-পরিবারে পরিণত হয়েছে। প্রতিটি প্রতিষ্ঠান একই অফিস, একই টিম এবং সৎ ও আন্তরিক সেবার একই প্রতিশ্রুতি ভাগ করে নেয়।',
    },
    learnMore: 'বিস্তারিত জানুন',
    headOffice: {
      eyebrow: 'একটি প্রধান কার্যালয়',
      titlePre: 'তিনটি প্রতিষ্ঠান, ',
      titleAccent: 'একটি বিশ্বস্ত ঠিকানা',
      lead: 'ঢাকার প্রাণকেন্দ্রে আমাদের প্রধান কার্যালয়ে আসুন — সমগ্র ইন্টার গালফ গ্রুপের ঠিকানা।',
      label: 'প্রধান কার্যালয়',
      address: '৩১, কে.আর. প্লাজা, ৫ম–৬ষ্ঠ তলা, পুরানা পল্টন, ঢাকা-১০০০',
      contactCta: 'যোগাযোগ করুন',
      estimateCta: 'ফ্রি এস্টিমেট নিন',
    },
    detail: {
      notFoundTitle: 'শাখা পাওয়া যায়নি',
      whatWeOffer: 'আমরা যা দিচ্ছি',
      officeSingular: 'কার্যালয়',
      officePlural: 'কার্যালয়সমূহ',
      quickFacts: 'সংক্ষিপ্ত তথ্য',
      company: 'প্রতিষ্ঠান',
      status: 'অবস্থা',
      established: 'প্রতিষ্ঠাকাল',
      email: 'ইমেইল',
      officeHours: 'অফিস সময়',
      estimateCta: 'ফ্রি এস্টিমেট নিন',
      whatsappCta: 'হোয়াটসঅ্যাপে চ্যাট করুন',
      whatsappMessage: (name: string) =>
        `আসসালামু আলাইকুম! আমি ${name} সম্পর্কে আরও জানতে চাই।`,
      otherCompanies: 'গ্রুপের অন্যান্য প্রতিষ্ঠান',
    },
    hours: 'শনিবার – বৃহস্পতিবার · সকাল ১০টা – রাত ৮টা',
    officeLabels: {
      'Head Office': 'প্রধান কার্যালয়',
      'Gazipur Office': 'গাজীপুর কার্যালয়',
    } as Record<string, string>,
    branches: {
      'inter-gulf-travels': {
        role: 'হজ লাইসেন্স নং ০৭১ · সরকার অনুমোদিত',
        tagline: '২০০২ সাল থেকে হাজিদের পথনির্দেশনা দিয়ে আসছে আমাদের প্রধান হজ ও ওমরাহ প্রতিষ্ঠান।',
        description: [
          'Inter Gulf Travels Ltd. গ্রুপের প্রধান প্রতিষ্ঠান এবং একটি সরকার-অনুমোদিত হজ এজেন্সি (হজ লাইসেন্স নং ০৭১), HAAB, ATAB ও IATA-এর সদস্য। ২০০২ সাল থেকে আমরা সততা, স্বাচ্ছন্দ্য ও যত্নের সঙ্গে হাজার হাজার হাজির হজ ও ওমরাহ যাত্রার আয়োজন করে আসছি।',
          'প্রাক-নিবন্ধন ও ভিসা প্রসেসিং থেকে শুরু করে ফ্লাইট, হারামের কাছাকাছি হোটেল, পূর্ণাঙ্গ জিয়ারত ও বাংলাভাষী গাইড — যাত্রার প্রতিটি ধাপ আমাদের অভিজ্ঞ টিম নিজস্বভাবে পরিচালনা করে, যাতে আমাদের হাজিরা সম্পূর্ণভাবে ইবাদতে মনোযোগ দিতে পারেন।',
        ],
        services: [
          'হজ প্যাকেজ (ইকোনমি থেকে প্রিমিয়াম)',
          'সারা বছর ওমরাহ প্যাকেজ',
          'হজ ও ওমরাহ ভিসা প্রসেসিং',
          'জিয়ারত ও গাইডেড ট্যুর',
          'হজ-পূর্ব প্রশিক্ষণ কর্মশালা',
        ],
      },
      'mokbul-hajj-overseas': {
        role: 'সরকার অনুমোদিত ট্রাভেল এজেন্সি',
        tagline: 'ইন্টার গালফ গ্রুপের একটি নিবেদিত হজ ও ওভারসিজ সেবা প্রতিষ্ঠান।',
        description: [
          'Mokbul Hajj Overseas Service ইন্টার গালফ গ্রুপের একটি সরকার-অনুমোদিত সদস্য প্রতিষ্ঠান, যা হজ প্রাক-নিবন্ধন, প্রসেসিং ও ওভারসিজ হাজি সহায়তায় নিবেদিত।',
          'Inter Gulf Travels Ltd.-এর সঙ্গে একই অফিস, টিম ও মান ভাগ করে নিয়ে এটি হাজিদের হজ ব্যবস্থাপনা, ভিসা প্রসেসিং ও কাগজপত্র সহায়তার জন্য আরেকটি বিশ্বস্ত মাধ্যম এনে দেয় — গ্রুপের সুপরিচিত আন্তরিক খেদমতসহ।',
        ],
        services: [
          'হজ প্রাক-নিবন্ধন ও প্রসেসিং',
          'ওভারসিজ হজ ও ওমরাহ সেবা',
          'ভিসা প্রসেসিং ও কাগজপত্র সহায়তা',
          'সৌদি আরবে গ্রাউন্ড সহায়তা',
        ],
      },
      'inter-gulf-air-travels': {
        role: 'সরকার অনুমোদিত ট্রাভেল এজেন্সি',
        tagline: 'সারা বিশ্বের জন্য এয়ার টিকেটিং, ট্যুর প্যাকেজ ও হোটেল বুকিং।',
        description: [
          'Inter Gulf Air Travels গ্রুপের এয়ার-টিকেটিং ও সাধারণ ট্রাভেল শাখা, একটি সরকার-অনুমোদিত এজেন্সি যা বিশ্বের প্রতিটি দেশে এয়ার টিকেট ইস্যু করে।',
          'হজ ও ওমরাহ ভিসা প্রসেসিংয়ের পাশাপাশি আমরা বিশ্বব্যাপী ট্যুর প্যাকেজ ও হোটেল বুকিংয়ের ব্যবস্থা করি। পুরানা পল্টন, ঢাকা এবং জয়দেবপুর, গাজীপুর — উভয় স্থানে কার্যালয় থাকায় আমরা সবসময় আমাদের ভ্রমণকারীদের কাছাকাছি থাকি।',
        ],
        services: [
          'বিশ্বব্যাপী এয়ার টিকেট ইস্যু',
          'হজ ও ওমরাহ ভিসা প্রসেসিং',
          'ট্যুর প্যাকেজ',
          'হোটেল বুকিং',
        ],
      },
    } as Record<
      string,
      { role: string; tagline: string; description: string[]; services: string[] }
    >,
  },
};

export function getDict(locale: Locale) {
  return dict[locale];
}
