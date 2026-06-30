import type { Locale } from '@/lib/i18n';

const dict = {
  en: {
    index: {
      hero: {
        eyebrow: 'What we do',
        titleA: 'Every step of your journey,',
        titleB: 'in one trusted place',
        lead: 'From the fifth pillar of Islam to your next family holiday abroad, Inter Gulf Travels handles visas, flights, hotels and complete itineraries — so you travel with absolute peace of mind.',
        crumb: 'Services',
      },
      grid: {
        eyebrow: 'Six services, one team',
        titleA: 'Comprehensive travel care,',
        titleB: 'end to end',
        lead: 'Each service is run by specialists who know the paperwork, the routes and the on-ground realities — backed by 24 years of doing this the honest way.',
        explore: 'Explore',
      },
      // Curated marketing copy for the six service cards (mirrors lib/site.ts `services`)
      services: [
        {
          slug: 'hajj',
          icon: 'kaaba',
          title: 'Hajj Packages',
          tagline: 'The journey of a lifetime',
          description:
            'Complete, government-approved Hajj packages with direct flights, hotels close to the Haram, full Ziyarat, experienced Bangla-speaking guides and pre-departure training workshops.',
          features: ['Direct Saudia / Biman flights', 'Hotels near the Haram', 'Full Ziyarat & guide', 'Pre-Hajj training workshop'],
        },
        {
          slug: 'umrah',
          icon: 'moon',
          title: 'Umrah Packages',
          tagline: 'Year-round spiritual journeys',
          description:
            'Flexible 10 to 21-day Umrah programmes throughout the year, with transparent pricing, comfortable accommodation and dedicated on-ground support from arrival to return.',
          features: ['10 / 14 / 21-day plans', 'Premium & economy tiers', 'Makkah–Madinah transfers', '24/7 ground assistance'],
        },
        {
          slug: 'visa',
          icon: 'passport',
          title: 'Visa Service',
          tagline: 'Borders made simple',
          description:
            'End-to-end visa processing for Saudi Arabia (Hajj, Umrah, work, business), UAE, Malaysia, Thailand and Schengen countries — handled by specialists who know the paperwork inside out.',
          features: ['Saudi Hajj & Umrah visas', 'UAE & Schengen tourist visas', 'Work & business visas', 'Document guidance'],
        },
        {
          slug: 'air-ticket',
          icon: 'plane',
          title: 'Air Ticket',
          tagline: 'Fly for less, worldwide',
          description:
            'Domestic, regional and international air tickets across 40+ airlines with competitive fares, instant issuance and the best routings to Jeddah, Madinah, Dubai and beyond.',
          features: ['40+ airlines', 'Best-fare guarantee', 'Instant e-ticket issuance', 'Group fares'],
        },
        {
          slug: 'hotel-booking',
          icon: 'building',
          title: 'Hotel Booking',
          tagline: 'Rest steps from the Haram',
          description:
            'Hand-picked hotels in Makkah and Madinah within walking distance of the Haramain, plus quality stays across Dubai, Kuala Lumpur, Istanbul and other destinations.',
          features: ['Walking distance to Haram', 'Verified properties', 'Best-rate booking', 'Worldwide hotels'],
        },
        {
          slug: 'tour',
          icon: 'globe',
          title: 'Tour Packages',
          tagline: 'See the world with us',
          description:
            'Curated holiday packages to Dubai, Turkey, Malaysia, Kashmir, the Maldives and more — thoughtfully planned, fairly priced and completely hassle-free.',
          features: ['Dubai · Turkey · Malaysia', 'Family & honeymoon tours', 'Custom itineraries', 'All-inclusive options'],
        },
      ],
      why: {
        eyebrow: 'Why pilgrims choose us',
        titleA: 'A licensed name you can',
        titleB: 'truly rely on',
        lead: 'Government-approved, member of HAAB & ATAB, and trusted by over 12,000 travellers since 2002.',
      },
      // Curated marketing copy for the "why us" cards (mirrors lib/site.ts `whyUs`)
      whyUs: [
        {
          icon: 'shield',
          title: 'Government Licensed',
          body: 'Fully approved by the Ministry of Religious Affairs (Hajj License No. 071) and a member of HAAB & ATAB — your journey is in safe, accountable hands.',
        },
        {
          icon: 'calendar',
          title: '24 Years of Trust',
          body: 'Since 2002 we have guided thousands of pilgrims with the same honesty and care we would give our own family.',
        },
        {
          icon: 'users',
          title: 'Bangla-speaking Guides',
          body: 'Experienced muallims who speak your language stay with you from departure to return, so you never feel lost.',
        },
        {
          icon: 'wallet',
          title: 'Transparent Pricing',
          body: 'No hidden charges, no surprises. Every package is clearly itemised so you know exactly what you are paying for.',
        },
        {
          icon: 'hotel',
          title: 'Close to the Haram',
          body: 'We secure hotels within walking distance of the Haramain so you spend less time travelling and more time in worship.',
        },
        {
          icon: 'headset',
          title: '24/7 On-ground Support',
          body: 'A dedicated support team in Saudi Arabia is reachable around the clock for anything you need during your journey.',
        },
      ],
      cta: {
        heading: 'Not sure which service you need?',
        body: 'Tell us where you want to go and we will build the right plan around you — visa, flights, hotels and more. Free consultation, honest pricing, no obligation.',
        wa: 'Assalamu alaikum! I would like to know more about your services.',
      },
    },
    cta: {
      estimate: 'Get a Free Estimate',
      whatsapp: 'Chat on WhatsApp',
      callPrefix: 'Or call us directly:',
    },
    visa: {
      hero: {
        eyebrow: 'Visa Service',
        titleA: 'Borders made simple,',
        titleB: 'paperwork done right',
        lead: 'End-to-end visa processing for Saudi Arabia, the UAE, Malaysia, Thailand, Schengen states and beyond — handled by specialists who know exactly what each embassy expects.',
        crumbServices: 'Services',
        crumb: 'Visa Service',
      },
      countries: {
        eyebrow: 'Where we can take you',
        titleA: 'Visas for the destinations',
        titleB: 'that matter most',
        lead: 'From the holy cities of Makkah and Madinah to family holidays and business trips, we process the visas Bangladeshi travellers need most.',
      },
      visaCountries: [
        {
          flag: '🇸🇦',
          country: 'Saudi Arabia',
          types: ['Hajj visa', 'Umrah e-visa', 'Work visa', 'Business / commercial visit'],
          note: 'Our core specialty since 2002 — Hajj and Umrah visas processed through approved Saudi channels.',
        },
        {
          flag: '🇦🇪',
          country: 'United Arab Emirates',
          types: ['Tourist visa (30 / 60 days)', 'Visit visa', 'Transit visa'],
          note: 'Fast UAE tourist and visit visas for Dubai, Abu Dhabi and Sharjah trips.',
        },
        {
          flag: '🇲🇾',
          country: 'Malaysia',
          types: ['eVISA tourist', 'Visit visa', 'eNTRI'],
          note: 'Straightforward Malaysian eVISA processing for holidays and family visits.',
        },
        {
          flag: '🇹🇭',
          country: 'Thailand',
          types: ['Tourist visa', 'e-Visa', 'Visa on arrival guidance'],
          note: 'Bangkok and Phuket tourist visas with full document preparation.',
        },
        {
          flag: '🇪🇺',
          country: 'Schengen States',
          types: ['Tourist / family visit', 'Business visa', 'Travel insurance support'],
          note: 'Schengen applications for France, Germany, Italy and more — appointment and cover-letter support.',
        },
        {
          flag: '🌍',
          country: 'Other Destinations',
          types: ['Turkey e-Visa', 'Singapore', 'Qatar & Kuwait', 'Country-specific guidance'],
          note: 'Tell us where you are going — our consultants advise on the right route and paperwork.',
        },
      ],
      docsBadge: 'Required documents',
      docsTitle: 'What you will typically need',
      docsLead:
        'Exact requirements vary by country and visa type. Bring what you have and our consultants will tell you precisely what is missing — we handle the rest.',
      documents: [
        'Passport valid for at least 6 months with blank pages',
        'Recent passport-size photographs (white background)',
        'Completed visa application form (we prepare this for you)',
        'Confirmed return air ticket or itinerary',
        'Hotel booking / accommodation proof',
        'Bank statement & solvency certificate (where required)',
        'National ID (NID) and / or trade license for business visas',
        'Vaccination certificate (meningitis for Hajj & Umrah)',
      ],
      processBadge: 'How it works',
      processTitle: 'Four simple steps to your visa',
      processLead: 'We have refined this process over 24 years so it is as smooth and stress-free as possible.',
      stepLabel: 'Step',
      processSteps: [
        {
          title: 'Free consultation',
          body: 'We assess your destination, purpose and eligibility, then list exactly what you need.',
        },
        {
          title: 'Document preparation',
          body: 'Our team completes forms, checks every paper and corrects issues before submission.',
        },
        {
          title: 'Application & filing',
          body: 'We submit through the correct embassy or online portal and track your file daily.',
        },
        {
          title: 'Visa & travel ready',
          body: 'You collect your visa and, if you wish, we arrange your flights and hotels too.',
        },
      ],
      disclaimerLabel: 'Please note:',
      disclaimerBody:
        ' visa approval is always at the sole discretion of the relevant embassy or immigration authority. Inter Gulf Travels prepares and submits accurate, complete applications, but cannot influence or guarantee the final decision. Government and embassy fees are separate from our service charge and are non-refundable once paid.',
      faqEyebrow: 'Visa FAQ',
      faqTitleA: 'Your questions,',
      faqTitleB: 'answered',
      faqLead: 'Still unsure about something? Call us — our consultants are happy to walk you through it.',
      faqs: [
        {
          q: 'How long does a Saudi Umrah e-visa take?',
          a: 'With complete documents, the Umrah e-visa is typically issued within a few working days. Our premium Umrah packages include fast-track processing for tighter departure dates.',
        },
        {
          q: 'Can you process a Schengen visa from Dhaka?',
          a: 'Yes. We prepare your full Schengen application — cover letter, itinerary, travel insurance and supporting documents — and guide you through the VFS / embassy appointment so your file is as strong as possible.',
        },
        {
          q: 'Do you guarantee that a visa will be approved?',
          a: 'No agency can guarantee approval — the final decision always rests with the embassy or immigration authority. What we guarantee is an accurate, complete and well-presented application that gives you the best possible chance.',
        },
        {
          q: 'Can I apply for a visa even if I book my flight elsewhere?',
          a: 'Absolutely. Our visa service is available on its own. Of course, many clients let us handle flights and hotels as well so the whole trip is coordinated by one team.',
        },
        {
          q: 'What is the difference between Hajj, Umrah and visit visas to Saudi Arabia?',
          a: 'A Hajj visa is issued only for the official Hajj season and only through licensed agencies like ours. An Umrah e-visa is available year-round for the lesser pilgrimage. A business or commercial visit visa is for trade and meetings and does not permit Hajj or Umrah rites.',
        },
      ],
      ctaHeading: 'Ready to start your visa application?',
      ctaBody: 'Send us your destination and travel dates. We will tell you exactly what is needed and begin straight away.',
      ctaWa: 'Assalamu alaikum! I would like help with a visa application.',
    },
    air: {
      hero: {
        eyebrow: 'Air Ticket',
        titleA: 'Fly for less,',
        titleB: 'worldwide',
        lead: 'Domestic, regional and international air tickets across 40+ airlines, issued instantly at fares we are confident you will not beat — with a real human desk behind every booking.',
        crumbServices: 'Services',
        crumb: 'Air Ticket',
      },
      promiseHead: {
        eyebrow: 'Why book with us',
        titleA: 'A ticketing desk that',
        titleB: 'works for you',
        lead: 'Online portals leave you on your own. We do the searching, issue the ticket and stand by it from booking to boarding.',
      },
      promises: [
        {
          title: 'Best-fare promise',
          body: 'We compare fares across 40+ carriers and routings to find you the lowest workable price — every time.',
        },
        {
          title: 'Instant e-ticket issuance',
          body: 'Confirmed seats and e-tickets issued on the spot, with clear fare rules explained before you pay.',
        },
        {
          title: 'Group & Hajj fares',
          body: 'Special negotiated group fares for families, corporate travel and our Hajj & Umrah departures.',
        },
        {
          title: 'Re-issue & support',
          body: 'Date changes, re-routings and refunds handled by our ticketing desk — no endless airline call queues.',
        },
      ],
      ticketTypes: [
        {
          title: 'Domestic',
          body: 'Dhaka, Chattogram, Sylhet, Cox’s Bazar, Jashore, Saidpur and more — quick connections across Bangladesh.',
        },
        {
          title: 'Regional',
          body: 'Short-haul fares to India, Nepal, Bhutan, Malaysia, Thailand, the UAE and the wider Gulf.',
        },
        {
          title: 'International',
          body: 'Long-haul tickets to Saudi Arabia, Europe, the Far East and North America with the best routings.',
        },
      ],
      routesHead: {
        eyebrow: 'Popular routes from Dhaka',
        titleA: 'Where our travellers',
        titleB: 'fly most',
        lead: 'From the holy cities to the Gulf and the Far East — fares updated daily across our airline partners.',
      },
      routeGroups: [
        {
          label: 'Pilgrimage routes',
          routes: [
            { from: 'Dhaka', to: 'Jeddah', code: 'DAC → JED' },
            { from: 'Dhaka', to: 'Madinah', code: 'DAC → MED' },
            { from: 'Dhaka', to: 'Riyadh', code: 'DAC → RUH' },
          ],
        },
        {
          label: 'Gulf & Middle East',
          routes: [
            { from: 'Dhaka', to: 'Dubai', code: 'DAC → DXB' },
            { from: 'Dhaka', to: 'Abu Dhabi', code: 'DAC → AUH' },
            { from: 'Dhaka', to: 'Doha', code: 'DAC → DOH' },
          ],
        },
        {
          label: 'Asia & beyond',
          routes: [
            { from: 'Dhaka', to: 'Kuala Lumpur', code: 'DAC → KUL' },
            { from: 'Dhaka', to: 'Istanbul', code: 'DAC → IST' },
            { from: 'Dhaka', to: 'Bangkok', code: 'DAC → BKK' },
          ],
        },
      ],
      partnersHead: {
        eyebrow: '40+ airline partners',
        titleA: 'Booked across the world’s',
        titleB: 'leading carriers',
        lead: 'As an IATA-linked agency we issue on every major airline serving Bangladesh — and dozens more worldwide.',
      },
      moreCarriers: '+ 30 more carriers',
      askAirline: 'Can’t see your preferred airline? Just ask — we most likely issue on it.',
      ctaHeading: 'Looking for your best fare?',
      ctaBody: 'Tell us your route and dates. Our ticketing desk will come back with the lowest workable fare across our 40+ carriers.',
      ctaWa: 'Assalamu alaikum! I would like a fare quote for an air ticket.',
    },
    hotel: {
      hero: {
        eyebrow: 'Hotel Booking',
        titleA: 'Rest just steps',
        titleB: 'from the Haram',
        lead: 'Hand-picked hotels in Makkah and Madinah within walking distance of the Haramain — plus verified, best-rate stays across Dubai, Istanbul, Kuala Lumpur and the wider world.',
        crumbServices: 'Services',
        crumb: 'Hotel Booking',
      },
      haramHead: {
        eyebrow: 'Close to the Haramain',
        titleA: 'Spend less time travelling,',
        titleB: 'more in worship',
        lead: 'We secure accommodation as close to the holy mosques as your budget allows, so every prayer is just a short walk away.',
      },
      cityCountry: 'Saudi Arabia',
      haramHotels: [
        {
          city: 'Makkah',
          headline: 'Steps from Masjid al-Haram',
          points: [
            'Properties within 300–800m of the Haram',
            'Clock Tower & Ajyad area options',
            'Rooms with Kaaba / Haram views on request',
            'Walking distance — no shuttle needed',
          ],
        },
        {
          city: 'Madinah',
          headline: 'Facing Masjid an-Nabawi',
          points: [
            'Central Markaziyah district hotels',
            'A short walk to the Prophet’s Mosque',
            'Quiet, family-friendly accommodation',
            'Easy access to Ziyarat sites',
          ],
        },
      ],
      stepsHead: {
        eyebrow: 'How it works',
        titleA: 'Booking a hotel,',
        titleB: 'made effortless',
        lead: 'Three simple steps from your request to a confirmed voucher in your inbox.',
      },
      steps: [
        {
          title: 'Tell us your stay',
          body: 'Share your city, dates, budget and how close to the Haram you would like to be.',
        },
        {
          title: 'We shortlist options',
          body: 'We send verified properties with real distances, room types and honest rates — no surprises.',
        },
        {
          title: 'Confirm & relax',
          body: 'Choose your favourite, we secure the booking and you receive a confirmed voucher.',
        },
      ],
      worldwideBadge: 'Worldwide hotels',
      worldwideTitle: 'Quality stays well beyond the Kingdom',
      worldwideLead:
        'Travelling onward or planning a holiday? We book trusted hotels across the destinations our clients love most.',
      worldwideCities: [
        { city: 'Dubai', country: 'UAE' },
        { city: 'Istanbul', country: 'Turkey' },
        { city: 'Kuala Lumpur', country: 'Malaysia' },
        { city: 'Bangkok', country: 'Thailand' },
        { city: 'Singapore', country: 'Singapore' },
        { city: 'Male', country: 'Maldives' },
        { city: 'Srinagar', country: 'Kashmir' },
        { city: 'Doha', country: 'Qatar' },
      ],
      assuranceBadge: 'Our assurance',
      assuranceTitle: 'Every booking, honestly handled',
      assuranceLead:
        'We treat your accommodation the way we would arrange our own family’s — verified, fairly priced and exactly as described.',
      assurances: [
        'Verified, inspected properties — not anonymous listings',
        'Best-rate booking with no hidden booking fees',
        'Group & family allotments for Hajj and Umrah parties',
        'Flexible dates and room configurations',
        'Combine with our flights, visa and transfers',
        'Support reachable throughout your stay',
      ],
      ctaHeading: 'Need a hotel near the Haram?',
      ctaBody: 'Share your city, dates and budget. We will send verified options with real distances and our best rates.',
      ctaWa: 'Assalamu alaikum! I would like help booking a hotel near the Haram.',
    },
    tour: {
      hero: {
        eyebrow: 'Tour Packages',
        titleA: 'See the world,',
        titleB: 'the easy way',
        lead: 'Curated holiday packages to Dubai, Turkey, Malaysia, Kashmir and the Maldives — thoughtfully planned, fairly priced and completely hassle-free, with custom itineraries on request.',
        crumbServices: 'Services',
        crumb: 'Tour Packages',
      },
      destHead: {
        eyebrow: 'Popular destinations',
        titleA: 'Handpicked holidays for',
        titleB: 'every traveller',
        lead: 'Each tour is built around real highlights and sensible durations — and every detail, from visa to hotel, is handled by one team.',
      },
      enquireAbout: 'Enquire about',
      destinations: [
        {
          name: 'Dubai',
          country: 'United Arab Emirates',
          duration: '4–6 days',
          tagline: 'Skylines, desert & souks',
          highlights: [
            'Burj Khalifa & Dubai Mall fountains',
            'Desert safari with BBQ dinner',
            'Marina dhow cruise & Palm Jumeirah',
            'Old Dubai gold & spice souks',
          ],
        },
        {
          name: 'Turkey',
          country: 'Türkiye',
          duration: '7–9 days',
          tagline: 'Where east meets west',
          highlights: [
            'Hagia Sophia & Blue Mosque, Istanbul',
            'Bosphorus cruise between two continents',
            'Cappadocia hot-air balloons & cave hotels',
            'Pamukkale travertine terraces',
          ],
        },
        {
          name: 'Malaysia',
          country: 'Malaysia',
          duration: '5–7 days',
          tagline: 'City lights & island calm',
          highlights: [
            'Petronas Twin Towers & KL city tour',
            'Genting Highlands cable car & resorts',
            'Langkawi island hopping & cable car',
            'Halal-friendly dining throughout',
          ],
        },
        {
          name: 'Kashmir',
          country: 'India',
          duration: '5–7 days',
          tagline: 'Paradise on earth',
          highlights: [
            'Shikara ride on Dal Lake, Srinagar',
            'Gulmarg gondola & meadows',
            'Pahalgam valley & Betaab valley',
            'Mughal gardens & houseboat stays',
          ],
        },
        {
          name: 'Maldives',
          country: 'Maldives',
          duration: '4–6 days',
          tagline: 'Turquoise lagoons & villas',
          highlights: [
            'Overwater & beach villa resorts',
            'Snorkelling over coral reefs',
            'Sunset dolphin cruise',
            'Honeymoon & all-inclusive options',
          ],
        },
        {
          name: 'Custom Tour',
          country: 'You choose',
          duration: 'Flexible',
          tagline: 'Designed entirely around you',
          highlights: [
            'Tell us your dream destination',
            'Tailored itinerary & pacing',
            'Family, group or honeymoon focus',
            'Visa, flights & hotels all arranged',
          ],
        },
      ],
      typesHead: {
        eyebrow: 'However you travel',
        titleA: 'Tours shaped around',
        titleB: 'the people on them',
        lead: 'Whether it is the whole family, just the two of you, or a worry-free all-inclusive break — we build it your way.',
      },
      tourTypes: [
        { title: 'Family tours', body: 'Kid-friendly pacing, connecting rooms and activities everyone enjoys.' },
        { title: 'Honeymoon escapes', body: 'Romantic resorts, private transfers and special touches for two.' },
        { title: 'All-inclusive', body: 'Flights, hotels, transfers, sightseeing and meals in one clear price.' },
      ],
      // WhatsApp enquiry message is split so the destination name (kept as-is) can sit in the middle
      enquireWaPrefix: "Assalamu alaikum! I'm interested in the ",
      enquireWaSuffix: ' tour package. Please share the details.',
      ctaHeading: 'Where shall we take you?',
      ctaBody: 'Pick a destination above or describe your dream trip. We will craft an itinerary and a clear, all-inclusive quote.',
      ctaWa: 'Assalamu alaikum! I would like to plan a tour package. Please share options.',
    },
  },
  bn: {
    index: {
      hero: {
        eyebrow: 'আমরা যা করি',
        titleA: 'আপনার যাত্রার প্রতিটি ধাপ,',
        titleB: 'এক বিশ্বস্ত ঠিকানায়',
        lead: 'ইসলামের পঞ্চম স্তম্ভ থেকে আপনার পরবর্তী পারিবারিক ভ্রমণ পর্যন্ত—ভিসা, ফ্লাইট, হোটেল ও সম্পূর্ণ ভ্রমণসূচি সবকিছুই সামলায় Inter Gulf Travels, যাতে আপনি নিশ্চিন্তে ভ্রমণ করতে পারেন।',
        crumb: 'সেবাসমূহ',
      },
      grid: {
        eyebrow: 'ছয়টি সেবা, একটি দল',
        titleA: 'পরিপূর্ণ ভ্রমণসেবা,',
        titleB: 'শুরু থেকে শেষ',
        lead: 'প্রতিটি সেবা পরিচালনা করেন এমন বিশেষজ্ঞরা যারা কাগজপত্র, রুট ও বাস্তব পরিস্থিতি ভালোভাবে জানেন—২৪ বছরের সততার অভিজ্ঞতায় গড়া।',
        explore: 'বিস্তারিত দেখুন',
      },
      services: [
        {
          slug: 'hajj',
          icon: 'kaaba',
          title: 'হজ প্যাকেজ',
          tagline: 'জীবনের শ্রেষ্ঠ যাত্রা',
          description:
            'সরকার-অনুমোদিত পূর্ণাঙ্গ হজ প্যাকেজ—সরাসরি ফ্লাইট, হারামের কাছে হোটেল, পূর্ণ জিয়ারত, অভিজ্ঞ বাংলাভাষী গাইড এবং যাত্রাপূর্ব প্রশিক্ষণ কর্মশালা সহ।',
          features: ['সরাসরি Saudia / Biman ফ্লাইট', 'হারামের কাছে হোটেল', 'পূর্ণ জিয়ারত ও গাইড', 'হজপূর্ব প্রশিক্ষণ কর্মশালা'],
        },
        {
          slug: 'umrah',
          icon: 'moon',
          title: 'উমরাহ প্যাকেজ',
          tagline: 'সারা বছরের আধ্যাত্মিক যাত্রা',
          description:
            'সারা বছর জুড়ে নমনীয় ১০ থেকে ২১ দিনের উমরাহ প্রোগ্রাম—স্বচ্ছ মূল্য, আরামদায়ক আবাসন এবং পৌঁছানো থেকে ফেরা পর্যন্ত নিবেদিত স্থানীয় সহায়তা সহ।',
          features: ['১০ / ১৪ / ২১ দিনের প্ল্যান', 'প্রিমিয়াম ও ইকোনমি স্তর', 'মক্কা–মদিনা ট্রান্সফার', '২৪/৭ স্থানীয় সহায়তা'],
        },
        {
          slug: 'visa',
          icon: 'passport',
          title: 'ভিসা সেবা',
          tagline: 'সীমানা পেরোনো সহজ',
          description:
            'সৌদি আরব (হজ, উমরাহ, কাজ, ব্যবসা), সংযুক্ত আরব আমিরাত, মালয়েশিয়া, থাইল্যান্ড ও শেনঝেন দেশগুলোর জন্য শুরু থেকে শেষ পর্যন্ত ভিসা প্রক্রিয়াকরণ—কাগজপত্রে দক্ষ বিশেষজ্ঞদের হাতে।',
          features: ['সৌদি হজ ও উমরাহ ভিসা', 'আমিরাত ও শেনঝেন ট্যুরিস্ট ভিসা', 'কাজ ও ব্যবসায়িক ভিসা', 'কাগজপত্র সহায়তা'],
        },
        {
          slug: 'air-ticket',
          icon: 'plane',
          title: 'এয়ার টিকেট',
          tagline: 'বিশ্বজুড়ে কম খরচে উড়ান',
          description:
            '৪০+ এয়ারলাইনে দেশীয়, আঞ্চলিক ও আন্তর্জাতিক এয়ার টিকেট—প্রতিযোগিতামূলক ভাড়া, তাৎক্ষণিক ইস্যু এবং জেদ্দা, মদিনা, দুবাইসহ আরও অনেক গন্তব্যে সেরা রুটিং সহ।',
          features: ['৪০+ এয়ারলাইন', 'সেরা ভাড়ার নিশ্চয়তা', 'তাৎক্ষণিক ই-টিকেট ইস্যু', 'গ্রুপ ভাড়া'],
        },
        {
          slug: 'hotel-booking',
          icon: 'building',
          title: 'হোটেল বুকিং',
          tagline: 'হারাম থেকে কয়েক কদম দূরে বিশ্রাম',
          description:
            'মক্কা ও মদিনায় হারামাইন থেকে হাঁটার দূরত্বে বাছাই করা হোটেল, পাশাপাশি দুবাই, কুয়ালালামপুর, ইস্তাম্বুলসহ অন্যান্য গন্তব্যে মানসম্মত আবাসন।',
          features: ['হারাম থেকে হাঁটার দূরত্ব', 'যাচাইকৃত হোটেল', 'সেরা দামে বুকিং', 'বিশ্বজুড়ে হোটেল'],
        },
        {
          slug: 'tour',
          icon: 'globe',
          title: 'ট্যুর প্যাকেজ',
          tagline: 'আমাদের সাথে বিশ্ব দেখুন',
          description:
            'দুবাই, তুরস্ক, মালয়েশিয়া, কাশ্মীর, মালদ্বীপসহ আরও নানা গন্তব্যে বাছাই করা ছুটির প্যাকেজ—সুচিন্তিতভাবে পরিকল্পিত, ন্যায্য মূল্যে এবং সম্পূর্ণ ঝামেলামুক্ত।',
          features: ['দুবাই · তুরস্ক · মালয়েশিয়া', 'পারিবারিক ও হানিমুন ট্যুর', 'কাস্টম ভ্রমণসূচি', 'অল-ইনক্লুসিভ অপশন'],
        },
      ],
      why: {
        eyebrow: 'কেন হাজীরা আমাদের বেছে নেন',
        titleA: 'একটি লাইসেন্সধারী নাম, যার ওপর',
        titleB: 'সত্যিই ভরসা করা যায়',
        lead: 'সরকার-অনুমোদিত, HAAB ও ATAB-এর সদস্য, এবং ২০০২ সাল থেকে ১২,০০০-এরও বেশি যাত্রীর আস্থাভাজন।',
      },
      whyUs: [
        {
          icon: 'shield',
          title: 'সরকার লাইসেন্সপ্রাপ্ত',
          body: 'ধর্ম মন্ত্রণালয় কর্তৃক পূর্ণ অনুমোদিত (হজ লাইসেন্স নং ০৭১) এবং HAAB ও ATAB-এর সদস্য—আপনার যাত্রা নিরাপদ ও দায়বদ্ধ হাতে।',
        },
        {
          icon: 'calendar',
          title: '২৪ বছরের আস্থা',
          body: '২০০২ সাল থেকে আমরা হাজার হাজার হাজীকে পথ দেখিয়েছি, ঠিক যে সততা ও যত্ন আমরা নিজেদের পরিবারকে দিই তা দিয়ে।',
        },
        {
          icon: 'users',
          title: 'বাংলাভাষী গাইড',
          body: 'আপনার ভাষায় কথা বলা অভিজ্ঞ মুয়াল্লিমরা যাত্রার শুরু থেকে ফেরা পর্যন্ত আপনার সাথে থাকেন, যাতে আপনি কখনো অসহায় বোধ না করেন।',
        },
        {
          icon: 'wallet',
          title: 'স্বচ্ছ মূল্য',
          body: 'কোনো গোপন খরচ নেই, কোনো চমক নেই। প্রতিটি প্যাকেজ স্পষ্টভাবে তালিকাভুক্ত, যাতে আপনি ঠিক জানেন কীসের জন্য টাকা দিচ্ছেন।',
        },
        {
          icon: 'hotel',
          title: 'হারামের কাছে',
          body: 'আমরা হারামাইন থেকে হাঁটার দূরত্বে হোটেল নিশ্চিত করি, যাতে আপনি যাতায়াতে কম সময় ব্যয় করে ইবাদতে বেশি সময় দিতে পারেন।',
        },
        {
          icon: 'headset',
          title: '২৪/৭ স্থানীয় সহায়তা',
          body: 'সৌদি আরবে একটি নিবেদিত সহায়তা দল আপনার যাত্রার সময় যেকোনো প্রয়োজনে দিনরাত উপলব্ধ।',
        },
      ],
      cta: {
        heading: 'কোন সেবাটি আপনার প্রয়োজন, নিশ্চিত নন?',
        body: 'আপনি কোথায় যেতে চান বলুন, আর আমরা আপনার জন্য সঠিক পরিকল্পনা তৈরি করব—ভিসা, ফ্লাইট, হোটেল ও আরও অনেক কিছু। ফ্রি পরামর্শ, সৎ মূল্য, কোনো বাধ্যবাধকতা নেই।',
        wa: 'আসসালামু আলাইকুম! আমি আপনাদের সেবা সম্পর্কে আরও জানতে চাই।',
      },
    },
    cta: {
      estimate: 'ফ্রি এস্টিমেট নিন',
      whatsapp: 'হোয়াটসঅ্যাপে চ্যাট করুন',
      callPrefix: 'অথবা সরাসরি কল করুন:',
    },
    visa: {
      hero: {
        eyebrow: 'ভিসা সেবা',
        titleA: 'সীমানা পেরোনো সহজ,',
        titleB: 'কাগজপত্র নির্ভুলভাবে',
        lead: 'সৌদি আরব, আমিরাত, মালয়েশিয়া, থাইল্যান্ড, শেনঝেন রাষ্ট্রসহ আরও অনেক দেশের জন্য শুরু থেকে শেষ পর্যন্ত ভিসা প্রক্রিয়াকরণ—এমন বিশেষজ্ঞদের হাতে যারা প্রতিটি দূতাবাসের চাহিদা ঠিকঠাক জানেন।',
        crumbServices: 'সেবাসমূহ',
        crumb: 'ভিসা সেবা',
      },
      countries: {
        eyebrow: 'আমরা আপনাকে কোথায় নিতে পারি',
        titleA: 'সবচেয়ে গুরুত্বপূর্ণ গন্তব্যগুলোর',
        titleB: 'জন্য ভিসা',
        lead: 'মক্কা ও মদিনার পবিত্র নগরী থেকে পারিবারিক ছুটি ও ব্যবসায়িক সফর—বাংলাদেশি যাত্রীদের সবচেয়ে প্রয়োজনীয় ভিসাগুলো আমরা প্রক্রিয়া করি।',
      },
      visaCountries: [
        {
          flag: '🇸🇦',
          country: 'সৌদি আরব',
          types: ['হজ ভিসা', 'উমরাহ ই-ভিসা', 'কাজের ভিসা', 'ব্যবসায়িক / বাণিজ্যিক ভিজিট'],
          note: '২০০২ সাল থেকে আমাদের মূল বিশেষত্ব—অনুমোদিত সৌদি চ্যানেলের মাধ্যমে হজ ও উমরাহ ভিসা প্রক্রিয়াকরণ।',
        },
        {
          flag: '🇦🇪',
          country: 'সংযুক্ত আরব আমিরাত',
          types: ['ট্যুরিস্ট ভিসা (৩০ / ৬০ দিন)', 'ভিজিট ভিসা', 'ট্রানজিট ভিসা'],
          note: 'দুবাই, আবুধাবি ও শারজাহ ভ্রমণের জন্য দ্রুত আমিরাত ট্যুরিস্ট ও ভিজিট ভিসা।',
        },
        {
          flag: '🇲🇾',
          country: 'মালয়েশিয়া',
          types: ['eVISA ট্যুরিস্ট', 'ভিজিট ভিসা', 'eNTRI'],
          note: 'ছুটি ও পারিবারিক সফরের জন্য সহজ মালয়েশিয়ান eVISA প্রক্রিয়াকরণ।',
        },
        {
          flag: '🇹🇭',
          country: 'থাইল্যান্ড',
          types: ['ট্যুরিস্ট ভিসা', 'e-Visa', 'অন অ্যারাইভাল ভিসা নির্দেশনা'],
          note: 'সম্পূর্ণ কাগজপত্র প্রস্তুতিসহ ব্যাংকক ও ফুকেট ট্যুরিস্ট ভিসা।',
        },
        {
          flag: '🇪🇺',
          country: 'শেনঝেন রাষ্ট্রসমূহ',
          types: ['ট্যুরিস্ট / পারিবারিক ভিজিট', 'ব্যবসায়িক ভিসা', 'ভ্রমণ বীমা সহায়তা'],
          note: 'ফ্রান্স, জার্মানি, ইতালিসহ আরও অনেক দেশের জন্য শেনঝেন আবেদন—অ্যাপয়েন্টমেন্ট ও কভার-লেটার সহায়তা।',
        },
        {
          flag: '🌍',
          country: 'অন্যান্য গন্তব্য',
          types: ['তুরস্ক e-Visa', 'সিঙ্গাপুর', 'কাতার ও কুয়েত', 'দেশভিত্তিক নির্দেশনা'],
          note: 'আপনি কোথায় যাচ্ছেন বলুন—আমাদের পরামর্শকরা সঠিক রুট ও কাগজপত্র সম্পর্কে পরামর্শ দেবেন।',
        },
      ],
      docsBadge: 'প্রয়োজনীয় কাগজপত্র',
      docsTitle: 'সাধারণত আপনার যা লাগবে',
      docsLead:
        'সঠিক প্রয়োজনীয়তা দেশ ও ভিসার ধরন অনুযায়ী ভিন্ন হয়। আপনার কাছে যা আছে নিয়ে আসুন, আমাদের পরামর্শকরা আপনাকে ঠিক বলে দেবেন কী বাকি আছে—বাকিটা আমরা সামলাব।',
      documents: [
        'কমপক্ষে ৬ মাস মেয়াদসহ পাসপোর্ট ও ফাঁকা পৃষ্ঠা',
        'সাম্প্রতিক পাসপোর্ট সাইজ ছবি (সাদা ব্যাকগ্রাউন্ড)',
        'পূরণকৃত ভিসা আবেদন ফর্ম (আমরা এটি আপনার জন্য প্রস্তুত করি)',
        'নিশ্চিত রিটার্ন এয়ার টিকেট বা ভ্রমণসূচি',
        'হোটেল বুকিং / আবাসনের প্রমাণ',
        'ব্যাংক স্টেটমেন্ট ও স্বচ্ছলতার সনদ (যেখানে প্রয়োজন)',
        'ব্যবসায়িক ভিসার জন্য জাতীয় পরিচয়পত্র (NID) এবং / অথবা ট্রেড লাইসেন্স',
        'টিকা সনদ (হজ ও উমরাহর জন্য মেনিনজাইটিস)',
      ],
      processBadge: 'যেভাবে কাজ করে',
      processTitle: 'আপনার ভিসার জন্য চারটি সহজ ধাপ',
      processLead: '২৪ বছর ধরে আমরা এই প্রক্রিয়াটি পরিমার্জন করেছি, যাতে এটি যথাসম্ভব সহজ ও ঝামেলামুক্ত হয়।',
      stepLabel: 'ধাপ',
      processSteps: [
        {
          title: 'ফ্রি পরামর্শ',
          body: 'আমরা আপনার গন্তব্য, উদ্দেশ্য ও যোগ্যতা যাচাই করি, এরপর ঠিক কী কী প্রয়োজন তা তালিকাভুক্ত করি।',
        },
        {
          title: 'কাগজপত্র প্রস্তুতি',
          body: 'আমাদের দল ফর্ম পূরণ করে, প্রতিটি কাগজ যাচাই করে এবং জমা দেওয়ার আগে ত্রুটি সংশোধন করে।',
        },
        {
          title: 'আবেদন ও জমা',
          body: 'আমরা সঠিক দূতাবাস বা অনলাইন পোর্টালের মাধ্যমে জমা দিই এবং প্রতিদিন আপনার ফাইল ট্র্যাক করি।',
        },
        {
          title: 'ভিসা ও ভ্রমণ প্রস্তুত',
          body: 'আপনি আপনার ভিসা সংগ্রহ করেন এবং চাইলে আমরা আপনার ফ্লাইট ও হোটেলও ব্যবস্থা করি।',
        },
      ],
      disclaimerLabel: 'অনুগ্রহ করে লক্ষ্য করুন:',
      disclaimerBody:
        ' ভিসা অনুমোদন সর্বদা সংশ্লিষ্ট দূতাবাস বা ইমিগ্রেশন কর্তৃপক্ষের একচ্ছত্র এখতিয়ারে। Inter Gulf Travels নির্ভুল ও সম্পূর্ণ আবেদন প্রস্তুত করে জমা দেয়, কিন্তু চূড়ান্ত সিদ্ধান্তকে প্রভাবিত বা নিশ্চিত করতে পারে না। সরকারি ও দূতাবাসের ফি আমাদের সেবা চার্জ থেকে আলাদা এবং একবার পরিশোধ করলে তা অফেরতযোগ্য।',
      faqEyebrow: 'ভিসা সংক্রান্ত প্রশ্ন',
      faqTitleA: 'আপনার প্রশ্নের',
      faqTitleB: 'উত্তর',
      faqLead: 'এখনও কোনো বিষয়ে নিশ্চিত নন? আমাদের কল করুন—আমাদের পরামর্শকরা আপনাকে বিস্তারিত বুঝিয়ে দিতে আনন্দিত হবেন।',
      faqs: [
        {
          q: 'সৌদি উমরাহ ই-ভিসা পেতে কত সময় লাগে?',
          a: 'সম্পূর্ণ কাগজপত্র থাকলে উমরাহ ই-ভিসা সাধারণত কয়েক কর্মদিবসের মধ্যে ইস্যু হয়। আমাদের প্রিমিয়াম উমরাহ প্যাকেজে অল্প সময়ের যাত্রার তারিখের জন্য ফাস্ট-ট্র্যাক প্রক্রিয়াকরণ অন্তর্ভুক্ত।',
        },
        {
          q: 'আপনারা কি ঢাকা থেকে শেনঝেন ভিসা প্রক্রিয়া করতে পারেন?',
          a: 'হ্যাঁ। আমরা আপনার সম্পূর্ণ শেনঝেন আবেদন প্রস্তুত করি—কভার লেটার, ভ্রমণসূচি, ভ্রমণ বীমা ও সহায়ক কাগজপত্র—এবং VFS / দূতাবাসের অ্যাপয়েন্টমেন্টে আপনাকে পথ দেখাই, যাতে আপনার ফাইল যথাসম্ভব শক্তিশালী হয়।',
        },
        {
          q: 'আপনারা কি ভিসা অনুমোদনের নিশ্চয়তা দেন?',
          a: 'কোনো এজেন্সিই অনুমোদনের নিশ্চয়তা দিতে পারে না—চূড়ান্ত সিদ্ধান্ত সর্বদা দূতাবাস বা ইমিগ্রেশন কর্তৃপক্ষের হাতে। আমরা যা নিশ্চিত করি তা হলো একটি নির্ভুল, সম্পূর্ণ ও সুন্দরভাবে উপস্থাপিত আবেদন, যা আপনাকে সর্বোত্তম সম্ভাবনা দেয়।',
        },
        {
          q: 'আমি অন্য কোথাও ফ্লাইট বুক করলেও কি ভিসার আবেদন করতে পারি?',
          a: 'অবশ্যই। আমাদের ভিসা সেবা আলাদাভাবেই পাওয়া যায়। তবে অনেক ক্লায়েন্ট ফ্লাইট ও হোটেলও আমাদের হাতে ছেড়ে দেন, যাতে পুরো সফর একটি দল সমন্বয় করে।',
        },
        {
          q: 'সৌদি আরবের হজ, উমরাহ ও ভিজিট ভিসার মধ্যে পার্থক্য কী?',
          a: 'হজ ভিসা কেবল সরকারি হজ মৌসুমে এবং কেবল আমাদের মতো লাইসেন্সধারী এজেন্সির মাধ্যমে ইস্যু হয়। উমরাহ ই-ভিসা সারা বছর ছোট তীর্থযাত্রার জন্য পাওয়া যায়। ব্যবসায়িক বা বাণিজ্যিক ভিজিট ভিসা বাণিজ্য ও বৈঠকের জন্য এবং তা হজ বা উমরাহ পালনের অনুমতি দেয় না।',
        },
      ],
      ctaHeading: 'আপনার ভিসা আবেদন শুরু করতে প্রস্তুত?',
      ctaBody: 'আপনার গন্তব্য ও ভ্রমণের তারিখ পাঠান। আমরা ঠিক কী প্রয়োজন তা বলে দেব এবং সঙ্গে সঙ্গেই শুরু করব।',
      ctaWa: 'আসসালামু আলাইকুম! আমি একটি ভিসা আবেদনে সহায়তা চাই।',
    },
    air: {
      hero: {
        eyebrow: 'এয়ার টিকেট',
        titleA: 'কম খরচে উড়ান,',
        titleB: 'বিশ্বজুড়ে',
        lead: '৪০+ এয়ারলাইনে দেশীয়, আঞ্চলিক ও আন্তর্জাতিক এয়ার টিকেট, এমন ভাড়ায় তাৎক্ষণিক ইস্যু যা আপনি ছাড়িয়ে যেতে পারবেন না বলে আমরা নিশ্চিত—প্রতিটি বুকিংয়ের পেছনে একজন প্রকৃত মানুষের ডেস্ক।',
        crumbServices: 'সেবাসমূহ',
        crumb: 'এয়ার টিকেট',
      },
      promiseHead: {
        eyebrow: 'কেন আমাদের কাছে বুক করবেন',
        titleA: 'একটি টিকেটিং ডেস্ক যা',
        titleB: 'আপনার জন্য কাজ করে',
        lead: 'অনলাইন পোর্টাল আপনাকে একা ফেলে রাখে। আমরা খোঁজাখুঁজি করি, টিকেট ইস্যু করি এবং বুকিং থেকে বোর্ডিং পর্যন্ত পাশে থাকি।',
      },
      promises: [
        {
          title: 'সেরা ভাড়ার প্রতিশ্রুতি',
          body: '৪০+ এয়ারলাইন ও রুটিং তুলনা করে আমরা আপনার জন্য সম্ভাব্য সর্বনিম্ন ভাড়া খুঁজে দিই—প্রতিবার।',
        },
        {
          title: 'তাৎক্ষণিক ই-টিকেট ইস্যু',
          body: 'নিশ্চিত সিট ও ই-টিকেট সঙ্গে সঙ্গে ইস্যু, এবং অর্থ পরিশোধের আগে স্পষ্টভাবে ভাড়ার নিয়ম ব্যাখ্যা করা হয়।',
        },
        {
          title: 'গ্রুপ ও হজ ভাড়া',
          body: 'পরিবার, কর্পোরেট ভ্রমণ এবং আমাদের হজ ও উমরাহ যাত্রার জন্য বিশেষ আলোচিত গ্রুপ ভাড়া।',
        },
        {
          title: 'রি-ইস্যু ও সহায়তা',
          body: 'তারিখ পরিবর্তন, রুট পরিবর্তন ও রিফান্ড আমাদের টিকেটিং ডেস্ক সামলায়—এয়ারলাইনের অন্তহীন কল কিউ নেই।',
        },
      ],
      ticketTypes: [
        {
          title: 'দেশীয়',
          body: 'ঢাকা, চট্টগ্রাম, সিলেট, কক্সবাজার, যশোর, সৈয়দপুরসহ আরও—বাংলাদেশজুড়ে দ্রুত সংযোগ।',
        },
        {
          title: 'আঞ্চলিক',
          body: 'ভারত, নেপাল, ভুটান, মালয়েশিয়া, থাইল্যান্ড, আমিরাত ও বৃহত্তর উপসাগরীয় অঞ্চলে স্বল্প-দূরত্বের ভাড়া।',
        },
        {
          title: 'আন্তর্জাতিক',
          body: 'সৌদি আরব, ইউরোপ, দূরপ্রাচ্য ও উত্তর আমেরিকায় সেরা রুটিংসহ দূরপাল্লার টিকেট।',
        },
      ],
      routesHead: {
        eyebrow: 'ঢাকা থেকে জনপ্রিয় রুট',
        titleA: 'আমাদের যাত্রীরা সবচেয়ে বেশি',
        titleB: 'যেখানে উড়ে যান',
        lead: 'পবিত্র নগরী থেকে উপসাগরীয় অঞ্চল ও দূরপ্রাচ্য পর্যন্ত—আমাদের এয়ারলাইন পার্টনারদের ভাড়া প্রতিদিন হালনাগাদ করা হয়।',
      },
      routeGroups: [
        {
          label: 'তীর্থযাত্রার রুট',
          routes: [
            { from: 'ঢাকা', to: 'জেদ্দা', code: 'DAC → JED' },
            { from: 'ঢাকা', to: 'মদিনা', code: 'DAC → MED' },
            { from: 'ঢাকা', to: 'রিয়াদ', code: 'DAC → RUH' },
          ],
        },
        {
          label: 'উপসাগরীয় ও মধ্যপ্রাচ্য',
          routes: [
            { from: 'ঢাকা', to: 'দুবাই', code: 'DAC → DXB' },
            { from: 'ঢাকা', to: 'আবুধাবি', code: 'DAC → AUH' },
            { from: 'ঢাকা', to: 'দোহা', code: 'DAC → DOH' },
          ],
        },
        {
          label: 'এশিয়া ও তার বাইরে',
          routes: [
            { from: 'ঢাকা', to: 'কুয়ালালামপুর', code: 'DAC → KUL' },
            { from: 'ঢাকা', to: 'ইস্তাম্বুল', code: 'DAC → IST' },
            { from: 'ঢাকা', to: 'ব্যাংকক', code: 'DAC → BKK' },
          ],
        },
      ],
      partnersHead: {
        eyebrow: '৪০+ এয়ারলাইন পার্টনার',
        titleA: 'বিশ্বের শীর্ষস্থানীয়',
        titleB: 'বাহকদের সাথে বুকিং',
        lead: 'একটি IATA-যুক্ত এজেন্সি হিসেবে আমরা বাংলাদেশে চলাচলকারী প্রতিটি বড় এয়ারলাইনে—এবং বিশ্বজুড়ে আরও অনেকগুলোতে টিকেট ইস্যু করি।',
      },
      moreCarriers: '+ আরও ৩০টি বাহক',
      askAirline: 'আপনার পছন্দের এয়ারলাইন দেখছেন না? শুধু জিজ্ঞেস করুন—সম্ভবত আমরা সেটিতেও টিকেট ইস্যু করি।',
      ctaHeading: 'আপনার সেরা ভাড়া খুঁজছেন?',
      ctaBody: 'আপনার রুট ও তারিখ জানান। আমাদের টিকেটিং ডেস্ক আমাদের ৪০+ বাহকের মধ্যে সম্ভাব্য সর্বনিম্ন ভাড়া নিয়ে ফিরে আসবে।',
      ctaWa: 'আসসালামু আলাইকুম! আমি একটি এয়ার টিকেটের ভাড়ার কোটেশন চাই।',
    },
    hotel: {
      hero: {
        eyebrow: 'হোটেল বুকিং',
        titleA: 'বিশ্রাম মাত্র কয়েক কদম',
        titleB: 'হারাম থেকে',
        lead: 'মক্কা ও মদিনায় হারামাইন থেকে হাঁটার দূরত্বে বাছাই করা হোটেল—পাশাপাশি দুবাই, ইস্তাম্বুল, কুয়ালালামপুরসহ বৃহত্তর বিশ্বে যাচাইকৃত, সেরা দামের আবাসন।',
        crumbServices: 'সেবাসমূহ',
        crumb: 'হোটেল বুকিং',
      },
      haramHead: {
        eyebrow: 'হারামাইনের কাছে',
        titleA: 'যাতায়াতে কম সময়,',
        titleB: 'ইবাদতে বেশি সময়',
        lead: 'আপনার বাজেট যতটা অনুমতি দেয়, আমরা ততটা পবিত্র মসজিদের কাছে আবাসন নিশ্চিত করি, যাতে প্রতিটি নামাজ কেবল কয়েক কদম দূরে থাকে।',
      },
      cityCountry: 'সৌদি আরব',
      haramHotels: [
        {
          city: 'মক্কা',
          headline: 'মসজিদুল হারাম থেকে কয়েক কদম দূরে',
          points: [
            'হারাম থেকে ৩০০–৮০০ মিটারের মধ্যে হোটেল',
            'ক্লক টাওয়ার ও আজিয়াদ এলাকার অপশন',
            'অনুরোধে কাবা / হারাম ভিউ সহ রুম',
            'হাঁটার দূরত্ব—কোনো শাটল প্রয়োজন নেই',
          ],
        },
        {
          city: 'মদিনা',
          headline: 'মসজিদে নববীর মুখোমুখি',
          points: [
            'কেন্দ্রীয় মারকাজিয়া এলাকার হোটেল',
            'নবীজির মসজিদে অল্প হাঁটার পথ',
            'শান্ত, পরিবারবান্ধব আবাসন',
            'জিয়ারতের স্থানগুলোতে সহজ যাতায়াত',
          ],
        },
      ],
      stepsHead: {
        eyebrow: 'যেভাবে কাজ করে',
        titleA: 'হোটেল বুকিং,',
        titleB: 'অনায়াসে',
        lead: 'আপনার অনুরোধ থেকে আপনার ইনবক্সে নিশ্চিত ভাউচার পর্যন্ত তিনটি সহজ ধাপ।',
      },
      steps: [
        {
          title: 'আপনার থাকার কথা জানান',
          body: 'আপনার শহর, তারিখ, বাজেট এবং হারামের কতটা কাছে থাকতে চান তা জানান।',
        },
        {
          title: 'আমরা অপশন বাছাই করি',
          body: 'আমরা প্রকৃত দূরত্ব, রুমের ধরন ও সৎ মূল্যসহ যাচাইকৃত হোটেল পাঠাই—কোনো চমক নেই।',
        },
        {
          title: 'নিশ্চিত করুন ও নিশ্চিন্ত থাকুন',
          body: 'আপনার পছন্দটি বেছে নিন, আমরা বুকিং নিশ্চিত করি এবং আপনি একটি নিশ্চিত ভাউচার পান।',
        },
      ],
      worldwideBadge: 'বিশ্বজুড়ে হোটেল',
      worldwideTitle: 'কিংডমের বাইরেও মানসম্মত আবাসন',
      worldwideLead:
        'সামনে আরও ভ্রমণ করছেন বা ছুটির পরিকল্পনা করছেন? আমাদের ক্লায়েন্টদের সবচেয়ে প্রিয় গন্তব্যগুলোতে আমরা বিশ্বস্ত হোটেল বুক করি।',
      worldwideCities: [
        { city: 'দুবাই', country: 'আমিরাত' },
        { city: 'ইস্তাম্বুল', country: 'তুরস্ক' },
        { city: 'কুয়ালালামপুর', country: 'মালয়েশিয়া' },
        { city: 'ব্যাংকক', country: 'থাইল্যান্ড' },
        { city: 'সিঙ্গাপুর', country: 'সিঙ্গাপুর' },
        { city: 'মালে', country: 'মালদ্বীপ' },
        { city: 'শ্রীনগর', country: 'কাশ্মীর' },
        { city: 'দোহা', country: 'কাতার' },
      ],
      assuranceBadge: 'আমাদের নিশ্চয়তা',
      assuranceTitle: 'প্রতিটি বুকিং, সততার সাথে সামলানো',
      assuranceLead:
        'আমরা আপনার আবাসন এমনভাবে ব্যবস্থা করি যেমন আমরা নিজেদের পরিবারের জন্য করতাম—যাচাইকৃত, ন্যায্য মূল্যে এবং ঠিক যেমন বর্ণনা করা হয়েছে তেমনই।',
      assurances: [
        'যাচাইকৃত, পরিদর্শিত হোটেল—অজ্ঞাত তালিকা নয়',
        'কোনো গোপন বুকিং ফি ছাড়াই সেরা দামে বুকিং',
        'হজ ও উমরাহ দলের জন্য গ্রুপ ও পারিবারিক বরাদ্দ',
        'নমনীয় তারিখ ও রুম কনফিগারেশন',
        'আমাদের ফ্লাইট, ভিসা ও ট্রান্সফারের সাথে একত্রে',
        'আপনার পুরো অবস্থানকালে সহায়তা উপলব্ধ',
      ],
      ctaHeading: 'হারামের কাছে একটি হোটেল প্রয়োজন?',
      ctaBody: 'আপনার শহর, তারিখ ও বাজেট জানান। আমরা প্রকৃত দূরত্ব ও আমাদের সেরা দামসহ যাচাইকৃত অপশন পাঠাব।',
      ctaWa: 'আসসালামু আলাইকুম! আমি হারামের কাছে একটি হোটেল বুকিংয়ে সহায়তা চাই।',
    },
    tour: {
      hero: {
        eyebrow: 'ট্যুর প্যাকেজ',
        titleA: 'বিশ্ব দেখুন,',
        titleB: 'সহজ উপায়ে',
        lead: 'দুবাই, তুরস্ক, মালয়েশিয়া, কাশ্মীর ও মালদ্বীপে বাছাই করা ছুটির প্যাকেজ—সুচিন্তিতভাবে পরিকল্পিত, ন্যায্য মূল্যে ও সম্পূর্ণ ঝামেলামুক্ত, অনুরোধে কাস্টম ভ্রমণসূচিসহ।',
        crumbServices: 'সেবাসমূহ',
        crumb: 'ট্যুর প্যাকেজ',
      },
      destHead: {
        eyebrow: 'জনপ্রিয় গন্তব্য',
        titleA: 'প্রতিটি ভ্রমণকারীর জন্য',
        titleB: 'বাছাই করা ছুটি',
        lead: 'প্রতিটি ট্যুর প্রকৃত আকর্ষণ ও যুক্তিসঙ্গত সময়কাল ঘিরে তৈরি—এবং ভিসা থেকে হোটেল পর্যন্ত প্রতিটি বিষয় একটি দল সামলায়।',
      },
      enquireAbout: 'জানতে চাই',
      destinations: [
        {
          name: 'দুবাই',
          country: 'সংযুক্ত আরব আমিরাত',
          duration: '৪–৬ দিন',
          tagline: 'আকাশরেখা, মরুভূমি ও বাজার',
          highlights: [
            'বুর্জ খলিফা ও দুবাই মল ফোয়ারা',
            'বারবিকিউ ডিনারসহ ডেজার্ট সাফারি',
            'মেরিনা ধাও ক্রুজ ও পাম জুমেইরাহ',
            'পুরোনো দুবাইয়ের স্বর্ণ ও মসলার বাজার',
          ],
        },
        {
          name: 'তুরস্ক',
          country: 'তুর্কিয়ে',
          duration: '৭–৯ দিন',
          tagline: 'যেখানে পূর্ব ও পশ্চিম মিলে',
          highlights: [
            'আয়া সোফিয়া ও ব্লু মসজিদ, ইস্তাম্বুল',
            'দুই মহাদেশের মাঝে বসফরাস ক্রুজ',
            'ক্যাপাডোশিয়ার হট-এয়ার বেলুন ও গুহা হোটেল',
            'পামুক্কালের ট্র্যাভারটিন ছাদ',
          ],
        },
        {
          name: 'মালয়েশিয়া',
          country: 'মালয়েশিয়া',
          duration: '৫–৭ দিন',
          tagline: 'শহরের আলো ও দ্বীপের প্রশান্তি',
          highlights: [
            'পেট্রোনাস টুইন টাওয়ার ও কেএল সিটি ট্যুর',
            'গেন্টিং হাইল্যান্ডস কেবল কার ও রিসোর্ট',
            'লংকাউই আইল্যান্ড হপিং ও কেবল কার',
            'সর্বত্র হালাল-বান্ধব খাবার',
          ],
        },
        {
          name: 'কাশ্মীর',
          country: 'ভারত',
          duration: '৫–৭ দিন',
          tagline: 'ভূস্বর্গ',
          highlights: [
            'ডাল লেকে শিকারা রাইড, শ্রীনগর',
            'গুলমার্গ গন্ডোলা ও তৃণভূমি',
            'পাহালগাম উপত্যকা ও বেতাব উপত্যকা',
            'মুঘল উদ্যান ও হাউসবোট অবস্থান',
          ],
        },
        {
          name: 'মালদ্বীপ',
          country: 'মালদ্বীপ',
          duration: '৪–৬ দিন',
          tagline: 'ফিরোজা উপহ্রদ ও ভিলা',
          highlights: [
            'ওভারওয়াটার ও বিচ ভিলা রিসোর্ট',
            'প্রবাল প্রাচীরে স্নর্কেলিং',
            'সূর্যাস্তের ডলফিন ক্রুজ',
            'হানিমুন ও অল-ইনক্লুসিভ অপশন',
          ],
        },
        {
          name: 'কাস্টম ট্যুর',
          country: 'আপনি বেছে নিন',
          duration: 'নমনীয়',
          tagline: 'সম্পূর্ণ আপনাকে ঘিরে সাজানো',
          highlights: [
            'আপনার স্বপ্নের গন্তব্য আমাদের জানান',
            'উপযোগী ভ্রমণসূচি ও গতি',
            'পারিবারিক, গ্রুপ বা হানিমুন কেন্দ্রিক',
            'ভিসা, ফ্লাইট ও হোটেল সব ব্যবস্থা',
          ],
        },
      ],
      typesHead: {
        eyebrow: 'আপনি যেভাবেই ভ্রমণ করুন',
        titleA: 'ট্যুর সাজানো হয়',
        titleB: 'যারা যাচ্ছেন তাঁদের ঘিরে',
        lead: 'পুরো পরিবার হোক, শুধু আপনারা দুজন হোক, কিংবা চিন্তামুক্ত অল-ইনক্লুসিভ ছুটি—আমরা আপনার মতো করেই তা তৈরি করি।',
      },
      tourTypes: [
        { title: 'পারিবারিক ট্যুর', body: 'শিশুবান্ধব গতি, সংযুক্ত রুম এবং সবার পছন্দের কার্যক্রম।' },
        { title: 'হানিমুন ভ্রমণ', body: 'রোমান্টিক রিসোর্ট, ব্যক্তিগত ট্রান্সফার এবং দুজনের জন্য বিশেষ ছোঁয়া।' },
        { title: 'অল-ইনক্লুসিভ', body: 'ফ্লাইট, হোটেল, ট্রান্সফার, দর্শনীয় স্থান ও খাবার এক স্পষ্ট মূল্যে।' },
      ],
      enquireWaPrefix: 'আসসালামু আলাইকুম! আমি ',
      enquireWaSuffix: ' ট্যুর প্যাকেজে আগ্রহী। অনুগ্রহ করে বিস্তারিত জানান।',
      ctaHeading: 'আমরা আপনাকে কোথায় নিয়ে যাব?',
      ctaBody: 'উপরের একটি গন্তব্য বেছে নিন বা আপনার স্বপ্নের ভ্রমণ বর্ণনা করুন। আমরা একটি ভ্রমণসূচি ও স্পষ্ট, অল-ইনক্লুসিভ কোটেশন তৈরি করব।',
      ctaWa: 'আসসালামু আলাইকুম! আমি একটি ট্যুর প্যাকেজ পরিকল্পনা করতে চাই। অনুগ্রহ করে অপশন জানান।',
    },
  },
};

export function getDict(locale: Locale) {
  return dict[locale];
}
