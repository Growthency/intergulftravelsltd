import type { Locale } from '@/lib/i18n';

const dict = {
  en: {
    form: {
      emailLabel: 'Email address',
      emailPlaceholder: 'you@example.com',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      showPassword: 'Show password',
      hidePassword: 'Hide password',
      signingIn: 'Signing in…',
      signInAdmin: 'Sign in to admin',
      signIn: 'Sign in',
      restrictedNote: 'This is a restricted area for authorised staff only.',
    },
    shell: {
      homeAria: 'home',
      staffPortal: 'Staff Portal',
      pilgrimAccount: 'Pilgrim Account',
      heroLead: 'A reliable name for your',
      heroAccent: 'sacred journey.',
      allRightsReserved: 'All rights reserved.',
      trustPoints: {
        customer: [
          'Government-licensed since 2002 (Hajj License No. 071)',
          'Track your bookings, documents & departures in one place',
          'Dedicated, Bangla-speaking support around the clock',
        ],
        staff: [
          'Restricted access — authorised personnel only',
          'Manage enquiries, bookings & site content securely',
          'Every session is protected and logged',
        ],
      },
    },
  },
  bn: {
    form: {
      emailLabel: 'ইমেইল ঠিকানা',
      emailPlaceholder: 'you@example.com',
      passwordLabel: 'পাসওয়ার্ড',
      passwordPlaceholder: 'আপনার পাসওয়ার্ড লিখুন',
      showPassword: 'পাসওয়ার্ড দেখান',
      hidePassword: 'পাসওয়ার্ড লুকান',
      signingIn: 'সাইন ইন হচ্ছে…',
      signInAdmin: 'অ্যাডমিনে সাইন ইন করুন',
      signIn: 'সাইন ইন করুন',
      restrictedNote: 'এটি শুধুমাত্র অনুমোদিত কর্মীদের জন্য একটি সংরক্ষিত এলাকা।',
    },
    shell: {
      homeAria: 'হোম',
      staffPortal: 'স্টাফ পোর্টাল',
      pilgrimAccount: 'যাত্রী অ্যাকাউন্ট',
      heroLead: 'আপনার পবিত্র যাত্রার জন্য',
      heroAccent: 'এক নির্ভরযোগ্য নাম।',
      allRightsReserved: 'সর্বস্বত্ব সংরক্ষিত।',
      trustPoints: {
        customer: [
          'সরকার-অনুমোদিত, ২০০২ সাল থেকে (হজ লাইসেন্স নং ০৭১)',
          'আপনার বুকিং, ডকুমেন্ট ও যাত্রা একই জায়গায় ট্র্যাক করুন',
          'নিবেদিত, বাংলাভাষী সহায়তা সার্বক্ষণিক',
        ],
        staff: [
          'সংরক্ষিত প্রবেশাধিকার — শুধুমাত্র অনুমোদিত কর্মীদের জন্য',
          'অনুসন্ধান, বুকিং ও সাইটের কনটেন্ট নিরাপদে পরিচালনা করুন',
          'প্রতিটি সেশন সুরক্ষিত ও লগ করা হয়',
        ],
      },
    },
  },
};

export function getDict(locale: Locale) {
  return dict[locale];
}
