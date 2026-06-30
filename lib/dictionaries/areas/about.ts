import type { Locale } from '@/lib/i18n';

const dict = {
  en: {
    // ── About (index) page ─────────────────────────────────────────────
    index: {
      meta: {
        title: 'About Us — Our Story Since 2002',
        description:
          'Inter Gulf Travels Ltd has guided Bangladeshi pilgrims on Hajj & Umrah since 2002. Government-licensed (Hajj License No. 071), we serve every pilgrim with honesty, comfort and care.',
      },
      hero: {
        eyebrow: 'About Inter Gulf Travels',
        titleA: 'Guiding pilgrims home to the ',
        titleHighlight: 'House of Allah',
        titleB: ' since 2002',
        lead: 'For over two decades, Inter Gulf Travels Ltd has been a reliable name of smooth travelling for Hajj & Umrah — built on honesty, comfort and the care we would give our own family.',
        crumb: 'About Us',
      },
      story: {
        eyebrow: 'Our story',
        heading: 'A journey that began with a single, simple promise',
        p1: 'In 2002, in a modest office on the fifth floor of KR Plaza in Purana Paltan, Inter Gulf Travels Ltd was founded on one conviction: that every Bangladeshi who longs to stand before the Kaaba deserves a journey that is honest, dignified and free of worry.',
        p2: 'In those early years the pilgrimage could be daunting — confusing paperwork, unclear costs and the fear of being far from home in an unfamiliar land. We set out to change that, treating each pilgrim not as a customer but as a guest we were personally responsible for, from the moment they called us to the moment they returned safely to their families.',
        p3: 'More than twenty years and over twelve thousand pilgrims later, that promise has not changed. The same families who travelled with us in 2002 now send their children and grandchildren — and that quiet, generational trust is the achievement we are proudest of.',
        viewPackages: 'View Hajj Packages',
        talkAdvisor: 'Talk to an Advisor',
        quote: '“A reliable name of smooth travelling for Hajj & Umrah.”',
        quoteSub: 'The principle we were founded on in 2002 — and live by to this day.',
        established: 'Established',
        establishedValue: '2002',
        hajjLicence: 'Hajj Licence',
        hajjLicenceValue: 'No. 071',
        headOffice: 'Head office:',
      },
      mission: {
        title: 'Our Mission',
        body: 'To make the sacred journey of Hajj & Umrah accessible, comfortable and completely worry-free for every Bangladeshi pilgrim — through honest pricing, meticulous planning and unwavering personal care, so that our guests can devote their hearts entirely to worship.',
      },
      vision: {
        title: 'Our Vision',
        body: 'To be the most trusted Hajj & Umrah agency in Bangladesh — a name passed down through generations of families — by setting the benchmark for integrity, service and spiritual hospitality in every journey we arrange.',
      },
      values: {
        eyebrow: 'What we stand for',
        titleA: 'The values that have guided us for ',
        titleHighlight: 'over two decades',
        lead: 'Six principles shape every decision we make — from the hotels we choose to the advice we give.',
        items: [
          {
            title: 'Trust & Integrity',
            body: 'We earn trust the only way that lasts — by keeping every promise and pricing every package with complete honesty. No hidden charges, ever.',
          },
          {
            title: 'Service from the Heart',
            body: 'We treat every pilgrim the way we would want our own parents treated — with patience, respect and genuine care from first call to safe return.',
          },
          {
            title: 'Accountability',
            body: 'As a licensed agency answerable to the Ministry of Religious Affairs and HAAB, we hold ourselves to the highest standard at every step.',
          },
          {
            title: 'Fairness & Transparency',
            body: 'Clear itineraries, itemised costs and honest advice — even when it means recommending a smaller package than you came in for.',
          },
          {
            title: 'Excellence in Detail',
            body: 'From hotel proximity to the Haram to the experience of every guide, we obsess over the details that make a sacred journey effortless.',
          },
          {
            title: 'A Family, Not a Number',
            body: 'Thousands of pilgrims return to us, year after year, and send their relatives too. That trust is the heart of who we are.',
          },
        ],
      },
      timeline: {
        eyebrow: 'Our journey',
        titleA: 'From a single office to a trusted ',
        titleHighlight: 'household name',
        lead: 'Two decades of milestones — each one a step toward serving pilgrims better.',
        items: [
          {
            year: '2002',
            title: 'A trusted name is founded',
            body: 'Inter Gulf Travels Ltd opens its doors in Purana Paltan, Dhaka, with a single mission: to make Hajj & Umrah honest, comfortable and worry-free for Bangladeshi families.',
          },
          {
            year: '2005',
            title: 'Government Hajj licence',
            body: 'The agency is formally approved by the Ministry of Religious Affairs under Hajj License No. 071, earning the right to operate full government-recognised Hajj programmes.',
          },
          {
            year: '2009',
            title: 'HAAB & ATAB membership',
            body: 'We join the Hajj Agencies Association of Bangladesh and the Association of Travel Agents of Bangladesh, anchoring our work to the country’s leading industry bodies.',
          },
          {
            year: '2014',
            title: 'Year-round Umrah programmes',
            body: 'Demand grows, and we expand into flexible 10 to 21-day Umrah departures throughout the year, with on-ground support teams stationed in Makkah and Madinah.',
          },
          {
            year: '2018',
            title: 'IATA-accredited ticketing',
            body: 'Partnerships with 40+ airlines and IATA accreditation let us issue worldwide air tickets in-house, securing the best fares and routings for our pilgrims.',
          },
          {
            year: '2024',
            title: 'Over 12,000 pilgrims served',
            body: 'More than two decades on, we have guided over twelve thousand pilgrims — and the families who travelled with us in 2002 now send their children and grandchildren.',
          },
        ],
      },
      trust: {
        eyebrow: 'Why families trust us',
        heading: 'The reassurance of a licensed, experienced team',
        body: 'A pilgrimage is a once-in-a-lifetime trust. Families choose Inter Gulf because we remove every uncertainty — and because, after twenty-four years, we have done this thousands of times before.',
        cta: 'Plan Your Journey',
        promises: [
          'Hotels within walking distance of the Haramain',
          'Experienced, Bangla-speaking muallims with every group',
          'Transparent, fully itemised package pricing',
          'Dedicated 24/7 on-ground support in Saudi Arabia',
          'Complete visa, ticketing and documentation handled for you',
          'Pre-departure training so you arrive prepared and at peace',
        ],
      },
      cta: {
        title: 'Let our family guide yours to the Haramain',
        leadA: 'Speak to a ',
        leadB: ' advisor today for honest guidance and a plan tailored to your dates and budget — with no obligation.',
        contact: 'Contact Us',
        meetTeam: 'Meet Our Team',
        callDirect: 'Or call us directly:',
      },
    },

    // ── Shared animated stats band ─────────────────────────────────────
    stats: {
      items: [
        { label: 'Years of service', sub: 'Trusted since 2002' },
        { label: 'Pilgrims guided', sub: 'Hajj & Umrah journeys' },
        { label: 'Airline partners', sub: 'Worldwide network' },
        { label: 'Government licensed', sub: 'Hajj License No. 071' },
      ],
    },

    // ── Business Associates page ───────────────────────────────────────
    associates: {
      meta: {
        title: 'Business Associates — Partners & Affiliations',
        description:
          'The airlines, hotels, ground operators and regulatory bodies behind Inter Gulf Travels Ltd — including MoRA, HAAB, ATAB and IATA, plus 40+ airline partners and trusted Saudi hotel and transport providers.',
      },
      hero: {
        eyebrow: 'Business Associates',
        titleA: 'The trusted partners behind every ',
        titleHighlight: 'smooth journey',
        titleB: '',
        lead: 'A pilgrimage runs on the strength of its network. From regulators to airlines, hotels and ground operators, these are the associates who help us deliver on every promise.',
        crumbAbout: 'About Us',
        crumb: 'Business Associates',
      },
      affiliations: {
        eyebrow: 'Regulatory affiliations',
        titleA: 'Licensed, accredited and ',
        titleHighlight: 'accountable',
        lead: 'Our work is anchored to the country’s leading regulatory and industry bodies — your assurance of a legitimate, protected pilgrimage.',
        names: {
          MoRA: 'Ministry of Religious Affairs',
          HAAB: 'Hajj Agencies Association of Bangladesh',
          ATAB: 'Association of Travel Agents of Bangladesh',
          IATA: 'International Air Transport Association',
        },
        details: {
          MoRA: 'The government authority that licenses and regulates every Hajj operator in Bangladesh. Our Hajj License No. 071 is issued and overseen by the Ministry, ensuring full compliance and accountability.',
          HAAB: 'The Hajj Agencies Association of Bangladesh — the apex body for licensed Hajj agencies. Our membership binds us to its code of conduct and pilgrim-protection standards.',
          ATAB: 'The Association of Travel Agents of Bangladesh, the national platform for IATA and travel agencies, upholding professional and ethical standards across the industry.',
          IATA: 'International Air Transport Association accreditation lets us issue worldwide air tickets directly, securing better fares and trusted routings for our pilgrims and travellers.',
        },
      },
      airlines: {
        eyebrow: 'Airline partners',
        titleA: 'Booking across ',
        titleHighlight: '40+ airlines',
        titleB: ' worldwide',
        lead: 'As an IATA-accredited agency we issue tickets directly across a wide network of carriers, securing the best fares and most convenient routings to Jeddah, Madinah and beyond.',
        more: '…and many more domestic, regional and international carriers.',
      },
      saudi: {
        eyebrow: 'On-ground in Saudi Arabia',
        titleA: 'Trusted hotels & operators in the ',
        titleHighlight: 'Holy Cities',
        titleB: '',
        lead: 'Our long-standing relationships in Makkah and Madinah let us place pilgrims close to the Haramain and look after them at every step on the ground.',
        items: [
          {
            title: 'Hotel Partners — Makkah',
            body: 'A trusted network of vetted hotels in the Ajyad and Jabal Omar districts, many within 300–700 metres of the Masjid al-Haram, secured at favourable group rates.',
            tags: ['Walking distance to Haram', 'Verified properties', 'Group allocations'],
          },
          {
            title: 'Hotel Partners — Madinah',
            body: 'Quality accommodation in the Central Haram area, steps from the Masjid an-Nabawi, so pilgrims spend less time travelling and more time in prayer.',
            tags: ['Central Haram area', 'Family rooms', 'Best-rate booking'],
          },
          {
            title: 'Ground Transport & Maktab',
            body: 'Licensed Saudi transport operators provide air-conditioned coaches for airport, inter-city and Ziyarat transfers, alongside accredited Maktab services in Mina and Arafah.',
            tags: ['AC coaches', 'Mina & Arafah Maktab', 'Ziyarat transfers'],
          },
          {
            title: 'On-ground Support Teams',
            body: 'Dedicated Bangla-speaking representatives stationed in Makkah and Madinah, reachable around the clock to assist our pilgrims with anything they need.',
            tags: ['24/7 assistance', 'Bangla-speaking', 'Local coordination'],
          },
        ],
      },
      cta: {
        title: 'Become a partner of Inter Gulf Travels',
        lead: 'Are you a hotel, airline, ground operator or agency looking to work with one of Bangladesh’s most trusted Hajj & Umrah names? We would love to hear from you.',
        partner: 'Partner With Us',
        email: 'Email Our Team',
      },
    },

    // ── Career page ────────────────────────────────────────────────────
    career: {
      meta: {
        title: 'Career Opportunity — Join the Inter Gulf Family',
        description:
          'Build a meaningful career with Inter Gulf Travels Ltd, a government-licensed Hajj & Umrah agency in Dhaka since 2002. Explore open positions in Hajj operations, visa processing, ticketing, customer care and digital marketing.',
      },
      hero: {
        eyebrow: 'Career Opportunity',
        titleA: 'Build a career with ',
        titleHighlight: 'meaning',
        titleB: ' behind every journey',
        lead: 'At Inter Gulf Travels, your work helps families fulfil the dream of a lifetime. Join a respected, government-licensed team that has served pilgrims with pride since 2002.',
        crumbAbout: 'About Us',
        crumb: 'Career Opportunity',
      },
      culture: {
        eyebrow: 'Why work here',
        titleA: 'More than a job — a chance to ',
        titleHighlight: 'serve',
        titleB: '',
        lead: 'We are a team that takes pride in honesty, care and craft. Here is what life at Inter Gulf Travels looks like.',
        items: [
          {
            title: 'Purposeful work',
            body: 'Every booking you handle helps a family fulfil a once-in-a-lifetime dream. Few jobs carry this much meaning.',
          },
          {
            title: 'Learn from veterans',
            body: 'Work alongside colleagues with two decades of Hajj & Umrah expertise and grow into a true specialist.',
          },
          {
            title: 'Real growth',
            body: 'We promote from within. Strong performers move into senior operations, team-lead and management roles.',
          },
          {
            title: 'A family culture',
            body: 'A close-knit, respectful team in the heart of Dhaka where your contribution is seen, valued and supported.',
          },
        ],
      },
      positions: {
        eyebrow: 'Open positions',
        titleA: 'Current ',
        titleHighlight: 'openings',
        lead: 'We are growing, and we are looking for dedicated people who share our commitment to pilgrims. All roles are based at our head office in Dhaka.',
        apply: 'Apply Now',
        items: [
          {
            title: 'Hajj Operations Executive',
            department: 'Operations',
            type: 'Full-time',
            location: 'Dhaka (On-site)',
            summary:
              'Coordinate end-to-end Hajj group logistics — registration, flights, hotels and ground services — and ensure every pilgrim’s journey runs flawlessly.',
            responsibilities: [
              'Manage Hajj pre-registration, group allocations and government submissions',
              'Coordinate flights, hotel bookings and Maktab services with Saudi partners',
              'Prepare departure schedules, rooming lists and pilgrim documentation',
              'Liaise with on-ground teams in Makkah and Madinah during the Hajj season',
            ],
          },
          {
            title: 'Visa Processing Officer',
            department: 'Documentation',
            type: 'Full-time',
            location: 'Dhaka (On-site)',
            summary:
              'Take ownership of accurate, timely visa applications for Hajj, Umrah and tourist travel across Saudi Arabia, the UAE and beyond.',
            responsibilities: [
              'Prepare and submit Hajj, Umrah, UAE and Schengen visa applications',
              'Verify passports, photographs and supporting documents for completeness',
              'Track application status and keep clients updated at every stage',
              'Maintain meticulous records and ensure full regulatory compliance',
            ],
          },
          {
            title: 'Customer Care Representative',
            department: 'Customer Experience',
            type: 'Full-time',
            location: 'Dhaka (On-site)',
            summary:
              'Be the warm, reassuring first voice pilgrims hear — answering enquiries, guiding choices and turning interest into confident bookings.',
            responsibilities: [
              'Respond to phone, WhatsApp and walk-in enquiries with patience and care',
              'Explain packages, pricing and procedures clearly to prospective pilgrims',
              'Follow up on leads and support clients through the booking journey',
              'Gather feedback and help continuously improve our service quality',
            ],
          },
          {
            title: 'Ticketing Executive',
            department: 'Air Travel',
            type: 'Full-time',
            location: 'Dhaka (On-site)',
            summary:
              'Issue domestic and international air tickets across 40+ airlines, securing the best fares and routings for pilgrims and travellers.',
            responsibilities: [
              'Search, quote and issue air tickets via GDS and airline portals',
              'Find optimal fares and routings to Jeddah, Madinah, Dubai and beyond',
              'Handle reissues, refunds, date changes and group fare requests',
              'Reconcile bookings and coordinate with the accounts team',
            ],
          },
          {
            title: 'Digital Marketing Executive',
            department: 'Marketing',
            type: 'Full-time',
            location: 'Dhaka (On-site)',
            summary:
              'Grow our online presence and bring our story to more families through content, social media and thoughtful campaigns.',
            responsibilities: [
              'Plan and publish content across Facebook, Instagram and the website',
              'Run and optimise paid campaigns for Hajj & Umrah package seasons',
              'Create graphics, reels and copy that reflect our trusted, caring brand',
              'Track analytics and report on reach, engagement and lead generation',
            ],
          },
        ],
      },
      apply: {
        eyebrow: 'How to apply',
        heading: 'Four simple steps to join our team',
        intro:
          'Don’t see your exact role listed? We still want to hear from talented, sincere people. Send us your CV and tell us how you can help us serve pilgrims better.',
        steps: [
          'Email your CV and a short cover note telling us why you would like to join.',
          'Mention the position you are applying for in the subject line.',
          'Our team reviews every application and contacts shortlisted candidates.',
          'Selected applicants are invited to our Purana Paltan office for an interview.',
        ],
        cardTitle: 'Send your application',
        cardBody:
          'Email your CV with the position in the subject line, and our team will be in touch.',
        careersEmailLabel: 'Careers email',
        callUsLabel: 'Call us',
        visitOfficeLabel: 'Visit our office',
        contact: 'Contact Us',
        applicationSubject: 'Career Application — Inter Gulf Travels',
        applicationPrefix: 'Application',
      },
    },

    // ── Reviews page ───────────────────────────────────────────────────
    reviews: {
      meta: {
        title: 'Customer Reviews — Pilgrim Experiences',
        description:
          'Read honest reviews from pilgrims who travelled for Hajj & Umrah with Inter Gulf Travels Ltd. Rated 4.9/5 across thousands of journeys since 2002.',
      },
      hero: {
        eyebrow: 'Customer Reviews',
        titleA: 'What pilgrims say after travelling ',
        titleHighlight: 'with us',
        lead: 'Trust isn’t something we claim — it’s something thousands of families have given us over two decades. Here is what they have to say.',
        crumbAbout: 'About Us',
        crumb: 'Customer Reviews',
      },
      starsAria: 'out of 5 stars',
      summary: {
        score: '4.9',
        averageA: 'Average rating from ',
        averageCount: '2,400+',
        averageB: ' pilgrim reviews',
        breakdownTitle: 'Rating breakdown',
      },
      highlights: [
        { value: '8 in 10', label: 'pilgrims return or refer family' },
        { value: '98%', label: 'would recommend us to others' },
        { value: '12,000+', label: 'pilgrims served since 2002' },
      ],
      grid: {
        eyebrow: 'Pilgrim stories',
        titleA: 'Honest words from ',
        titleHighlight: 'real journeys',
        lead: 'Every review below is from a pilgrim who placed their sacred journey in our hands.',
      },
      // Curated reviews shown in addition to lib/site testimonials.
      extraReviews: [
        {
          name: 'Shahidul Islam',
          role: 'Economy Hajj 2023 · Narayanganj',
          quote:
            'I was worried the economy package would cut corners, but everything was exactly as described. The shuttle to the Haram was punctual and our muallim was knowledgeable and kind. Fair price, honest service.',
          rating: 5,
        },
        {
          name: 'Rokeya Sultana',
          role: 'Umrah · Khulna',
          quote:
            'My husband and I performed Umrah for the first time and Inter Gulf made it effortless. The visa came on time, the hotel in Madinah was a two-minute walk from the mosque. We will travel with them again, in sha Allah.',
          rating: 5,
        },
        {
          name: 'Golam Mostafa',
          role: 'Group Hajj 2022 · Dhaka',
          quote:
            'I have performed Hajj twice and this was by far the most organised. The pre-Hajj training prepared everyone in our group, and the office kept our families updated back home. Truly professional from start to finish.',
          rating: 5,
        },
        {
          name: 'Tahmina Akter',
          role: 'Family Umrah · Comilla',
          quote:
            'We travelled with three children and my elderly father. The connecting rooms and wheelchair assistance they arranged made all the difference. The whole team treated us with so much patience. JazakAllah khair.',
          rating: 5,
        },
        {
          name: 'Mizanur Rahman',
          role: 'Premium Hajj 2024 · Gazipur',
          quote:
            'Worth every taka. The hotel faced the Haram, the itinerary was short and comfortable, and our guide anticipated everything. After years of hearing good things about Inter Gulf, they exceeded my expectations.',
          rating: 5,
        },
      ],
      // Bangla translations of the lib/site testimonials, keyed by name.
      siteTestimonials: {
        'Md. Abdur Rahman': {
          role: 'Hajj 2024 · Dhaka',
          quote:
            'From the airport in Dhaka to standing before the Kaaba, every single step was organised. The hotel was minutes from the Haram and our guide treated us like his own family. Alhamdulillah.',
        },
      },
      cta: {
        title: 'Travelled with us? Share your experience',
        lead: 'Your story helps another family take the first step toward their journey of a lifetime. We would be honoured to hear about yours.',
        leave: 'Leave a Review',
        explore: 'Explore Packages',
      },
    },

    // ── Awards page ────────────────────────────────────────────────────
    awards: {
      meta: {
        title: 'Awards & Affiliations — Recognition & Memberships',
        description:
          'Inter Gulf Travels Ltd holds Government Hajj License No. 071 and is a member of HAAB, ATAB and IATA-accredited — backed by two decades of recognition for trusted Hajj & Umrah service.',
      },
      hero: {
        eyebrow: 'Awards & Affiliations',
        titleA: 'Recognition built on ',
        titleHighlight: 'two decades of trust',
        lead: 'Our credentials are more than badges on a wall — they are your assurance that the agency holding your sacred journey is licensed, accredited and accountable.',
        crumbAbout: 'About Us',
        crumb: 'Awards & Affiliations',
      },
      trustBadges: [
        'Government Licensed',
        'HAAB Member',
        'ATAB Member',
        'IATA Accredited',
        '100% Verified',
        'Since 2002',
      ],
      certifications: {
        eyebrow: 'Licences & accreditations',
        titleA: 'The credentials that ',
        titleHighlight: 'protect you',
        lead: 'Every certification below is a promise of legitimacy — and each one means something concrete for your peace of mind.',
        whatItMeans: 'What it means for you: ',
        items: [
          {
            badge: 'No. 071',
            title: 'Government Hajj Licence',
            issuer: 'Ministry of Religious Affairs, Bangladesh',
            body: 'Our official licence to operate Hajj programmes, issued and regulated by the Government of Bangladesh — the foundation of every journey we arrange.',
            meaning: 'A guarantee that your pilgrimage is legitimate, regulated and fully accountable.',
          },
          {
            badge: 'HAAB',
            title: 'HAAB Membership',
            issuer: 'Hajj Agencies Association of Bangladesh',
            body: 'Active membership of the apex body for licensed Hajj agencies, binding us to its code of conduct and pilgrim-protection standards.',
            meaning: 'Your interests are protected by an industry-wide framework of ethics and safeguards.',
          },
          {
            badge: 'ATAB',
            title: 'ATAB Membership',
            issuer: 'Association of Travel Agents of Bangladesh',
            body: 'Recognised membership of the national travel-agent association, the platform that upholds professional standards across the industry.',
            meaning: 'Confidence that you are dealing with an established, professionally accredited agency.',
          },
          {
            badge: 'IATA',
            title: 'IATA Accreditation',
            issuer: 'International Air Transport Association',
            body: 'Accreditation that allows us to issue worldwide air tickets directly across 40+ airlines, with verified, secure ticketing.',
            meaning: 'Better fares, trusted routings and the assurance of an internationally recognised standard.',
          },
        ],
      },
      recognitions: {
        eyebrow: 'Recognition & milestones',
        titleA: 'Honoured for ',
        titleHighlight: 'service that lasts',
        lead: 'The recognition we value most comes from the families who trust us — and the milestones we have reached together.',
        items: [
          {
            title: 'Two Decades of Trusted Service',
            year: 'Since 2002',
            body: 'Recognised within the Bangladeshi Hajj community for over twenty years of honest, reliable pilgrim service.',
          },
          {
            title: '4.9 / 5 Pilgrim Satisfaction',
            year: 'Ongoing',
            body: 'Consistently high ratings across thousands of pilgrim reviews — a reflection of care that families notice.',
          },
          {
            title: 'Excellence in Hajj Operations',
            year: 'Industry standing',
            body: 'Acknowledged among peers for meticulously organised Hajj group operations and on-ground support.',
          },
          {
            title: '12,000+ Pilgrims Guided',
            year: 'Milestone',
            body: 'A milestone of trust — more than twelve thousand pilgrims have completed their journey with us.',
          },
        ],
      },
      cta: {
        title: 'Travel with a name you can verify and trust',
        leadB: ', member of HAAB & ATAB. Begin your journey with the reassurance of full government licensing.',
        getInTouch: 'Get in Touch',
        viewPartners: 'View Our Partners',
      },
    },

    // ── Team page ──────────────────────────────────────────────────────
    team: {
      meta: {
        title: 'Management Team — The People Behind the Journey',
        description:
          'Meet the leadership of Inter Gulf Travels Ltd — the experienced team guiding Bangladeshi pilgrims on Hajj & Umrah with honesty and care since 2002.',
      },
      hero: {
        eyebrow: 'Management Team',
        titleA: 'The people behind your ',
        titleHighlight: 'sacred journey',
        titleB: '',
        lead: 'Behind every smooth pilgrimage is a dedicated team. Meet the experienced leaders who have made Inter Gulf Travels a name families trust.',
        crumbAbout: 'About Us',
        crumb: 'Management Team',
      },
      intro:
        'From the day we opened our doors in 2002, our greatest asset has been our people. Each member of our leadership brings years of dedicated experience in Hajj & Umrah service — and a shared belief that a pilgrimage is a trust to be honoured, never just a transaction.',
      members: [
        {
          name: 'Alhaj Md. Nurul Islam',
          role: 'Chairman',
          bio: 'Founder of Inter Gulf Travels in 2002, he set the agency’s guiding principle — to serve every pilgrim with the honesty and care of family.',
        },
        {
          name: 'Md. Rafiqul Islam',
          role: 'Managing Director',
          bio: 'Leads the company’s strategy and growth, ensuring two decades of trust translate into ever-better service for every journey.',
        },
        {
          name: 'Md. Shahjahan Kabir',
          role: 'Director — Hajj & Umrah Operations',
          bio: 'Oversees the full Hajj & Umrah programme, from government registration to on-ground coordination in Makkah and Madinah.',
        },
        {
          name: 'Mahbubur Rahman',
          role: 'General Manager',
          bio: 'Runs day-to-day operations across departments, keeping every booking, departure and pilgrim experience running smoothly.',
        },
        {
          name: 'Tanvir Ahmed',
          role: 'Head of Visa & Ticketing',
          bio: 'Leads visa processing and IATA-accredited ticketing, securing timely visas and the best fares across 40+ airlines.',
        },
        {
          name: 'Sumaiya Akter',
          role: 'Customer Care Manager',
          bio: 'Heads the customer experience team — the warm, reassuring voice that guides pilgrims from first enquiry to safe return.',
        },
      ],
      ethosQuote:
        '“We don’t measure ourselves by the number of pilgrims we serve, but by the number who return to us — and send their families too.”',
      ethosByA: 'The leadership of ',
      joinTitle: 'Want to join our team?',
      joinBody:
        'We are always looking for sincere, dedicated people who share our commitment to serving pilgrims. Explore our current openings and become part of the Inter Gulf family.',
      viewCareers: 'View Careers',
      emailAria: 'Email',
    },

    // ── Shared TeamCard ────────────────────────────────────────────────
    teamCard: {
      emailAria: 'Email',
    },
  },

  bn: {
    // ── About (index) page ─────────────────────────────────────────────
    index: {
      meta: {
        title: 'আমাদের সম্পর্কে — ২০০২ সাল থেকে আমাদের পথচলা',
        description:
          'Inter Gulf Travels Ltd ২০০২ সাল থেকে বাংলাদেশি হাজিদের হজ ও উমরাহ যাত্রায় পথ দেখিয়ে আসছে। সরকার-অনুমোদিত (হজ লাইসেন্স নং ০৭১), আমরা প্রতিটি হাজিকে সততা, স্বাচ্ছন্দ্য ও যত্নের সাথে সেবা দিই।',
      },
      hero: {
        eyebrow: 'Inter Gulf Travels সম্পর্কে',
        titleA: '২০০২ সাল থেকে হাজিদের ',
        titleHighlight: 'আল্লাহর ঘরে',
        titleB: ' পথ দেখিয়ে আসছি',
        lead: 'দুই দশকেরও বেশি সময় ধরে Inter Gulf Travels Ltd হজ ও উমরাহর স্বাচ্ছন্দ্যময় যাত্রার এক নির্ভরযোগ্য নাম — সততা, স্বাচ্ছন্দ্য এবং নিজের পরিবারকে যে যত্ন দিতাম, সেই যত্নের উপর গড়া।',
        crumb: 'আমাদের সম্পর্কে',
      },
      story: {
        eyebrow: 'আমাদের গল্প',
        heading: 'একটিমাত্র সহজ প্রতিশ্রুতি দিয়ে শুরু হওয়া এক যাত্রা',
        p1: '২০০২ সালে, পুরানা পল্টনের কেআর প্লাজার পঞ্চম তলায় একটি ছোট্ট অফিসে Inter Gulf Travels Ltd প্রতিষ্ঠিত হয় একটি বিশ্বাস নিয়ে: কাবার সামনে দাঁড়ানোর আকাঙ্ক্ষা রাখেন এমন প্রতিটি বাংলাদেশি একটি সৎ, সম্মানজনক ও দুশ্চিন্তামুক্ত যাত্রার অধিকারী।',
        p2: 'সেই প্রথম বছরগুলোতে হজযাত্রা ভীতিকর হতে পারত — জটিল কাগজপত্র, অস্পষ্ট খরচ এবং অচেনা দেশে ঘর থেকে দূরে থাকার ভয়। আমরা তা বদলাতে চেয়েছিলাম, প্রতিটি হাজিকে গ্রাহক নয় বরং এমন একজন অতিথি হিসেবে দেখেছি যাঁর জন্য আমরা ব্যক্তিগতভাবে দায়বদ্ধ — তাঁরা আমাদের কল করার মুহূর্ত থেকে নিরাপদে পরিবারের কাছে ফিরে আসা পর্যন্ত।',
        p3: 'বিশ বছরেরও বেশি সময় এবং বারো হাজারেরও বেশি হাজির পর সেই প্রতিশ্রুতি বদলায়নি। ২০০২ সালে যাঁরা আমাদের সাথে গিয়েছিলেন, সেই একই পরিবার এখন তাঁদের সন্তান ও নাতি-নাতনিদের পাঠাচ্ছেন — আর এই নিঃশব্দ, প্রজন্মান্তরের আস্থাই আমাদের সবচেয়ে গর্বের অর্জন।',
        viewPackages: 'হজ প্যাকেজ দেখুন',
        talkAdvisor: 'একজন পরামর্শকের সাথে কথা বলুন',
        quote: '“হজ ও উমরাহর স্বাচ্ছন্দ্যময় যাত্রার এক নির্ভরযোগ্য নাম।”',
        quoteSub: '২০০২ সালে যে নীতিতে আমরা প্রতিষ্ঠিত হয়েছিলাম — আজও তা মেনে চলি।',
        established: 'প্রতিষ্ঠিত',
        establishedValue: '২০০২',
        hajjLicence: 'হজ লাইসেন্স',
        hajjLicenceValue: 'নং ০৭১',
        headOffice: 'প্রধান কার্যালয়:',
      },
      mission: {
        title: 'আমাদের লক্ষ্য',
        body: 'প্রতিটি বাংলাদেশি হাজির জন্য হজ ও উমরাহর পবিত্র যাত্রাকে সহজলভ্য, স্বাচ্ছন্দ্যময় ও সম্পূর্ণ দুশ্চিন্তামুক্ত করা — সৎ মূল্য, নিখুঁত পরিকল্পনা ও অবিচল ব্যক্তিগত যত্নের মাধ্যমে, যাতে আমাদের অতিথিরা তাঁদের হৃদয় সম্পূর্ণরূপে ইবাদতে নিবেদন করতে পারেন।',
      },
      vision: {
        title: 'আমাদের স্বপ্ন',
        body: 'বাংলাদেশের সবচেয়ে বিশ্বস্ত হজ ও উমরাহ এজেন্সি হওয়া — প্রজন্ম থেকে প্রজন্মে পরিবারগুলোর মুখে মুখে বাহিত একটি নাম — আমাদের আয়োজিত প্রতিটি যাত্রায় সততা, সেবা ও আধ্যাত্মিক আতিথেয়তার মানদণ্ড স্থাপন করে।',
      },
      values: {
        eyebrow: 'আমরা যা ধারণ করি',
        titleA: 'দুই দশকেরও বেশি সময় ধরে যে মূল্যবোধ ',
        titleHighlight: 'আমাদের পথ দেখিয়েছে',
        lead: 'ছয়টি নীতি আমাদের প্রতিটি সিদ্ধান্তকে আকার দেয় — যে হোটেল আমরা বেছে নিই থেকে শুরু করে যে পরামর্শ আমরা দিই, সব কিছুতে।',
        items: [
          {
            title: 'আস্থা ও সততা',
            body: 'আমরা একমাত্র টেকসই উপায়ে আস্থা অর্জন করি — প্রতিটি প্রতিশ্রুতি রক্ষা করে এবং প্রতিটি প্যাকেজের মূল্য সম্পূর্ণ সততার সাথে নির্ধারণ করে। কখনোই কোনো লুকানো খরচ নেই।',
          },
          {
            title: 'অন্তর থেকে সেবা',
            body: 'প্রতিটি হাজিকে আমরা সেভাবেই দেখি যেভাবে নিজের বাবা-মায়ের সাথে আচরণ চাইতাম — প্রথম কল থেকে নিরাপদে ফেরা পর্যন্ত ধৈর্য, সম্মান ও আন্তরিক যত্নের সাথে।',
          },
          {
            title: 'জবাবদিহিতা',
            body: 'ধর্ম বিষয়ক মন্ত্রণালয় ও HAAB-এর কাছে দায়বদ্ধ একটি লাইসেন্সপ্রাপ্ত এজেন্সি হিসেবে, আমরা প্রতিটি ধাপে নিজেদের সর্বোচ্চ মানদণ্ডে ধরে রাখি।',
          },
          {
            title: 'ন্যায্যতা ও স্বচ্ছতা',
            body: 'স্পষ্ট ভ্রমণসূচি, খাত-ভিত্তিক খরচ ও সৎ পরামর্শ — এমনকি যখন তা মানে আপনি যে প্যাকেজ চেয়ে এসেছিলেন তার চেয়ে ছোট প্যাকেজের সুপারিশ করা।',
          },
          {
            title: 'খুঁটিনাটিতে উৎকর্ষ',
            body: 'হারামের কাছে হোটেলের অবস্থান থেকে শুরু করে প্রতিটি গাইডের অভিজ্ঞতা — পবিত্র যাত্রাকে অনায়াস করে তোলে এমন খুঁটিনাটির প্রতি আমরা গভীরভাবে মনোযোগী।',
          },
          {
            title: 'পরিবার, কেবল একটি সংখ্যা নয়',
            body: 'হাজারো হাজি বছরের পর বছর আমাদের কাছে ফিরে আসেন এবং তাঁদের স্বজনদেরও পাঠান। সেই আস্থাই আমরা যা, তার মূল।',
          },
        ],
      },
      timeline: {
        eyebrow: 'আমাদের পথচলা',
        titleA: 'একটি অফিস থেকে এক বিশ্বস্ত ',
        titleHighlight: 'পরিচিত নাম',
        lead: 'দুই দশকের মাইলফলক — প্রতিটিই হাজিদের আরও ভালো সেবা দেওয়ার দিকে একটি পদক্ষেপ।',
        items: [
          {
            year: '২০০২',
            title: 'একটি বিশ্বস্ত নামের জন্ম',
            body: 'Inter Gulf Travels Ltd ঢাকার পুরানা পল্টনে তার দরজা খোলে একটিমাত্র লক্ষ্য নিয়ে: বাংলাদেশি পরিবারের জন্য হজ ও উমরাহকে সৎ, স্বাচ্ছন্দ্যময় ও দুশ্চিন্তামুক্ত করা।',
          },
          {
            year: '২০০৫',
            title: 'সরকারি হজ লাইসেন্স',
            body: 'হজ লাইসেন্স নং ০৭১-এর অধীনে ধর্ম বিষয়ক মন্ত্রণালয় কর্তৃক এজেন্সিটি আনুষ্ঠানিকভাবে অনুমোদিত হয়, যা সরকার-স্বীকৃত পূর্ণাঙ্গ হজ কর্মসূচি পরিচালনার অধিকার এনে দেয়।',
          },
          {
            year: '২০০৯',
            title: 'HAAB ও ATAB সদস্যপদ',
            body: 'আমরা হজ এজেন্সিজ অ্যাসোসিয়েশন অব বাংলাদেশ এবং অ্যাসোসিয়েশন অব ট্রাভেল এজেন্টস অব বাংলাদেশে যোগ দিই, আমাদের কাজকে দেশের শীর্ষস্থানীয় শিল্প সংস্থাগুলোর সাথে যুক্ত করি।',
          },
          {
            year: '২০১৪',
            title: 'বছরজুড়ে উমরাহ কর্মসূচি',
            body: 'চাহিদা বাড়ে, এবং আমরা সারা বছর জুড়ে নমনীয় ১০ থেকে ২১ দিনের উমরাহ যাত্রায় সম্প্রসারিত হই, মক্কা ও মদিনায় মোতায়েন স্থানীয় সহায়তা দলসহ।',
          },
          {
            year: '২০১৮',
            title: 'IATA-স্বীকৃত টিকিটিং',
            body: '৪০+ এয়ারলাইনের সাথে অংশীদারিত্ব ও IATA স্বীকৃতি আমাদের ঘরে বসেই বিশ্বব্যাপী বিমান টিকিট ইস্যু করতে দেয়, যা হাজিদের জন্য সেরা ভাড়া ও রুট নিশ্চিত করে।',
          },
          {
            year: '২০২৪',
            title: '১২,০০০-এরও বেশি হাজির সেবা',
            body: 'দুই দশকেরও বেশি সময় পর, আমরা বারো হাজারেরও বেশি হাজিকে পথ দেখিয়েছি — আর ২০০২ সালে যাঁরা আমাদের সাথে গিয়েছিলেন, তাঁরা এখন তাঁদের সন্তান ও নাতি-নাতনিদের পাঠাচ্ছেন।',
          },
        ],
      },
      trust: {
        eyebrow: 'পরিবারগুলো কেন আমাদের ওপর আস্থা রাখে',
        heading: 'একটি লাইসেন্সপ্রাপ্ত, অভিজ্ঞ দলের নিশ্চয়তা',
        body: 'হজযাত্রা জীবনে একবারের আস্থা। পরিবারগুলো Inter Gulf বেছে নেয় কারণ আমরা প্রতিটি অনিশ্চয়তা দূর করি — এবং কারণ চব্বিশ বছর পর আমরা এই কাজ হাজার হাজার বার করেছি।',
        cta: 'আপনার যাত্রার পরিকল্পনা করুন',
        promises: [
          'হারামাইন থেকে হাঁটা দূরত্বের মধ্যে হোটেল',
          'প্রতিটি দলের সাথে অভিজ্ঞ, বাংলাভাষী মুয়াল্লিম',
          'স্বচ্ছ, সম্পূর্ণ খাত-ভিত্তিক প্যাকেজ মূল্য',
          'সৌদি আরবে নিবেদিত ২৪/৭ স্থানীয় সহায়তা',
          'আপনার জন্য সম্পূর্ণ ভিসা, টিকিটিং ও কাগজপত্র সম্পন্ন',
          'যাত্রার পূর্বে প্রশিক্ষণ, যাতে আপনি প্রস্তুত ও প্রশান্ত মনে পৌঁছান',
        ],
      },
      cta: {
        title: 'আমাদের পরিবার আপনার পরিবারকে হারামাইনে পথ দেখাক',
        leadA: 'আজই একজন ',
        leadB: ' পরামর্শকের সাথে কথা বলুন সৎ পরামর্শ এবং আপনার তারিখ ও বাজেট অনুযায়ী তৈরি একটি পরিকল্পনার জন্য — কোনো বাধ্যবাধকতা ছাড়াই।',
        contact: 'যোগাযোগ করুন',
        meetTeam: 'আমাদের টিমের সাথে পরিচিত হোন',
        callDirect: 'অথবা সরাসরি কল করুন:',
      },
    },

    // ── Shared animated stats band ─────────────────────────────────────
    stats: {
      items: [
        { label: 'বছরের সেবা', sub: '২০০২ সাল থেকে বিশ্বস্ত' },
        { label: 'হাজিকে পথ দেখিয়েছি', sub: 'হজ ও উমরাহ যাত্রা' },
        { label: 'এয়ারলাইন অংশীদার', sub: 'বিশ্বব্যাপী নেটওয়ার্ক' },
        { label: 'সরকার-অনুমোদিত', sub: 'হজ লাইসেন্স নং ০৭১' },
      ],
    },

    // ── Business Associates page ───────────────────────────────────────
    associates: {
      meta: {
        title: 'ব্যবসায়িক সহযোগী — অংশীদার ও অধিভুক্তি',
        description:
          'Inter Gulf Travels Ltd-এর পেছনে থাকা এয়ারলাইন, হোটেল, স্থানীয় অপারেটর ও নিয়ন্ত্রক সংস্থা — MoRA, HAAB, ATAB ও IATA সহ, এবং ৪০+ এয়ারলাইন অংশীদার ও বিশ্বস্ত সৌদি হোটেল ও পরিবহন সরবরাহকারী।',
      },
      hero: {
        eyebrow: 'ব্যবসায়িক সহযোগী',
        titleA: 'প্রতিটি ',
        titleHighlight: 'স্বাচ্ছন্দ্যময় যাত্রার',
        titleB: ' পেছনের বিশ্বস্ত অংশীদার',
        lead: 'একটি হজযাত্রা চলে তার নেটওয়ার্কের শক্তির ওপর। নিয়ন্ত্রক থেকে এয়ারলাইন, হোটেল ও স্থানীয় অপারেটর পর্যন্ত, এঁরাই সেই সহযোগী যাঁরা প্রতিটি প্রতিশ্রুতি পূরণে আমাদের সাহায্য করেন।',
        crumbAbout: 'আমাদের সম্পর্কে',
        crumb: 'ব্যবসায়িক সহযোগী',
      },
      affiliations: {
        eyebrow: 'নিয়ন্ত্রক অধিভুক্তি',
        titleA: 'লাইসেন্সপ্রাপ্ত, স্বীকৃত ও ',
        titleHighlight: 'জবাবদিহিমূলক',
        lead: 'আমাদের কাজ দেশের শীর্ষস্থানীয় নিয়ন্ত্রক ও শিল্প সংস্থাগুলোর সাথে যুক্ত — যা একটি বৈধ, সুরক্ষিত হজযাত্রার আপনার নিশ্চয়তা।',
        names: {
          MoRA: 'ধর্ম বিষয়ক মন্ত্রণালয়',
          HAAB: 'হজ এজেন্সিজ অ্যাসোসিয়েশন অব বাংলাদেশ',
          ATAB: 'অ্যাসোসিয়েশন অব ট্রাভেল এজেন্টস অব বাংলাদেশ',
          IATA: 'ইন্টারন্যাশনাল এয়ার ট্রান্সপোর্ট অ্যাসোসিয়েশন',
        },
        details: {
          MoRA: 'যে সরকারি কর্তৃপক্ষ বাংলাদেশের প্রতিটি হজ অপারেটরকে লাইসেন্স দেয় ও নিয়ন্ত্রণ করে। আমাদের হজ লাইসেন্স নং ০৭১ মন্ত্রণালয় কর্তৃক ইস্যুকৃত ও তত্ত্বাবধানে, যা সম্পূর্ণ সম্মতি ও জবাবদিহিতা নিশ্চিত করে।',
          HAAB: 'হজ এজেন্সিজ অ্যাসোসিয়েশন অব বাংলাদেশ — লাইসেন্সপ্রাপ্ত হজ এজেন্সিগুলোর শীর্ষ সংস্থা। আমাদের সদস্যপদ আমাদের তার আচরণবিধি ও হাজি-সুরক্ষা মানদণ্ডের সাথে আবদ্ধ করে।',
          ATAB: 'অ্যাসোসিয়েশন অব ট্রাভেল এজেন্টস অব বাংলাদেশ, IATA ও ট্রাভেল এজেন্সিগুলোর জাতীয় প্ল্যাটফর্ম, যা শিল্প জুড়ে পেশাগত ও নৈতিক মান বজায় রাখে।',
          IATA: 'ইন্টারন্যাশনাল এয়ার ট্রান্সপোর্ট অ্যাসোসিয়েশন স্বীকৃতি আমাদের সরাসরি বিশ্বব্যাপী বিমান টিকিট ইস্যু করতে দেয়, যা আমাদের হাজি ও ভ্রমণকারীদের জন্য ভালো ভাড়া ও বিশ্বস্ত রুট নিশ্চিত করে।',
        },
      },
      airlines: {
        eyebrow: 'এয়ারলাইন অংশীদার',
        titleA: 'বিশ্বব্যাপী ',
        titleHighlight: '৪০+ এয়ারলাইন',
        titleB: ' জুড়ে বুকিং',
        lead: 'IATA-স্বীকৃত এজেন্সি হিসেবে আমরা বিস্তৃত ক্যারিয়ার নেটওয়ার্ক জুড়ে সরাসরি টিকিট ইস্যু করি, জেদ্দা, মদিনা ও তার বাইরে সেরা ভাড়া ও সবচেয়ে সুবিধাজনক রুট নিশ্চিত করি।',
        more: '…এবং আরও অনেক অভ্যন্তরীণ, আঞ্চলিক ও আন্তর্জাতিক ক্যারিয়ার।',
      },
      saudi: {
        eyebrow: 'সৌদি আরবে স্থানীয়ভাবে',
        titleA: 'পবিত্র ',
        titleHighlight: 'নগরীগুলোতে',
        titleB: ' বিশ্বস্ত হোটেল ও অপারেটর',
        lead: 'মক্কা ও মদিনায় আমাদের দীর্ঘদিনের সম্পর্ক আমাদের হাজিদের হারামাইনের কাছে রাখতে এবং স্থানীয়ভাবে প্রতিটি ধাপে তাঁদের দেখভাল করতে দেয়।',
        items: [
          {
            title: 'হোটেল অংশীদার — মক্কা',
            body: 'আজিয়াদ ও জাবাল ওমর এলাকায় যাচাইকৃত হোটেলের এক বিশ্বস্ত নেটওয়ার্ক, যার অনেকগুলো মসজিদুল হারাম থেকে ৩০০–৭০০ মিটারের মধ্যে, অনুকূল গ্রুপ রেটে নিশ্চিত করা।',
            tags: ['হারাম থেকে হাঁটা দূরত্ব', 'যাচাইকৃত হোটেল', 'গ্রুপ বরাদ্দ'],
          },
          {
            title: 'হোটেল অংশীদার — মদিনা',
            body: 'সেন্ট্রাল হারাম এলাকায় মানসম্পন্ন আবাসন, মসজিদে নববী থেকে কয়েক কদম দূরত্বে, যাতে হাজিরা ভ্রমণে কম সময় এবং নামাজে বেশি সময় দেন।',
            tags: ['সেন্ট্রাল হারাম এলাকা', 'ফ্যামিলি রুম', 'সেরা-রেট বুকিং'],
          },
          {
            title: 'স্থানীয় পরিবহন ও মাকতাব',
            body: 'লাইসেন্সপ্রাপ্ত সৌদি পরিবহন অপারেটররা বিমানবন্দর, আন্তঃনগর ও জিয়ারত ট্রান্সফারের জন্য শীতাতপনিয়ন্ত্রিত কোচ সরবরাহ করে, পাশাপাশি মিনা ও আরাফায় স্বীকৃত মাকতাব সেবা।',
            tags: ['এসি কোচ', 'মিনা ও আরাফা মাকতাব', 'জিয়ারত ট্রান্সফার'],
          },
          {
            title: 'স্থানীয় সহায়তা দল',
            body: 'মক্কা ও মদিনায় মোতায়েন নিবেদিত বাংলাভাষী প্রতিনিধি, যাঁরা আমাদের হাজিদের যেকোনো প্রয়োজনে সাহায্য করতে চব্বিশ ঘণ্টা উপলব্ধ।',
            tags: ['২৪/৭ সহায়তা', 'বাংলাভাষী', 'স্থানীয় সমন্বয়'],
          },
        ],
      },
      cta: {
        title: 'Inter Gulf Travels-এর অংশীদার হোন',
        lead: 'আপনি কি একটি হোটেল, এয়ারলাইন, স্থানীয় অপারেটর বা এজেন্সি যা বাংলাদেশের সবচেয়ে বিশ্বস্ত হজ ও উমরাহ নামগুলোর একটির সাথে কাজ করতে চায়? আমরা আপনার কথা শুনতে চাই।',
        partner: 'আমাদের সাথে অংশীদার হোন',
        email: 'আমাদের টিমকে ইমেইল করুন',
      },
    },

    // ── Career page ────────────────────────────────────────────────────
    career: {
      meta: {
        title: 'ক্যারিয়ার সুযোগ — Inter Gulf পরিবারে যোগ দিন',
        description:
          '২০০২ সাল থেকে ঢাকার একটি সরকার-অনুমোদিত হজ ও উমরাহ এজেন্সি Inter Gulf Travels Ltd-এর সাথে একটি অর্থবহ ক্যারিয়ার গড়ুন। হজ অপারেশন, ভিসা প্রসেসিং, টিকিটিং, কাস্টমার কেয়ার ও ডিজিটাল মার্কেটিংয়ে উন্মুক্ত পদগুলো দেখুন।',
      },
      hero: {
        eyebrow: 'ক্যারিয়ার সুযোগ',
        titleA: 'প্রতিটি যাত্রার পেছনে ',
        titleHighlight: 'অর্থের',
        titleB: ' সাথে একটি ক্যারিয়ার গড়ুন',
        lead: 'Inter Gulf Travels-এ আপনার কাজ পরিবারগুলোকে জীবনের স্বপ্ন পূরণে সাহায্য করে। ২০০২ সাল থেকে গর্বের সাথে হাজিদের সেবা দিয়ে আসা একটি সম্মানিত, সরকার-অনুমোদিত দলে যোগ দিন।',
        crumbAbout: 'আমাদের সম্পর্কে',
        crumb: 'ক্যারিয়ার সুযোগ',
      },
      culture: {
        eyebrow: 'এখানে কেন কাজ করবেন',
        titleA: 'কেবল একটি চাকরির চেয়ে বেশি — ',
        titleHighlight: 'সেবা করার',
        titleB: ' একটি সুযোগ',
        lead: 'আমরা এমন একটি দল যা সততা, যত্ন ও দক্ষতায় গর্ব করে। Inter Gulf Travels-এ জীবন কেমন, তা এখানে দেখুন।',
        items: [
          {
            title: 'অর্থবহ কাজ',
            body: 'আপনি যে প্রতিটি বুকিং সামলান তা একটি পরিবারকে জীবনে একবারের স্বপ্ন পূরণে সাহায্য করে। খুব কম কাজেই এত অর্থ থাকে।',
          },
          {
            title: 'অভিজ্ঞদের কাছ থেকে শিখুন',
            body: 'দুই দশকের হজ ও উমরাহ দক্ষতাসম্পন্ন সহকর্মীদের পাশে কাজ করুন এবং একজন প্রকৃত বিশেষজ্ঞ হয়ে উঠুন।',
          },
          {
            title: 'প্রকৃত উন্নতি',
            body: 'আমরা ভেতর থেকেই পদোন্নতি দিই। ভালো কর্মীরা সিনিয়র অপারেশন, টিম-লিড ও ব্যবস্থাপনা পদে এগিয়ে যান।',
          },
          {
            title: 'পারিবারিক সংস্কৃতি',
            body: 'ঢাকার প্রাণকেন্দ্রে একটি ঘনিষ্ঠ, সম্মানজনক দল যেখানে আপনার অবদান দেখা হয়, মূল্যায়িত হয় ও সমর্থিত হয়।',
          },
        ],
      },
      positions: {
        eyebrow: 'উন্মুক্ত পদ',
        titleA: 'বর্তমান ',
        titleHighlight: 'পদসমূহ',
        lead: 'আমরা বাড়ছি, এবং হাজিদের প্রতি আমাদের অঙ্গীকার ভাগ করে নেন এমন নিবেদিত মানুষ খুঁজছি। সকল পদই ঢাকায় আমাদের প্রধান কার্যালয়ে।',
        apply: 'এখনই আবেদন করুন',
        items: [
          {
            title: 'হজ অপারেশন এক্সিকিউটিভ',
            department: 'অপারেশন',
            type: 'পূর্ণকালীন',
            location: 'ঢাকা (অন-সাইট)',
            summary:
              'হজ গ্রুপের শুরু থেকে শেষ পর্যন্ত লজিস্টিক সমন্বয় করুন — নিবন্ধন, ফ্লাইট, হোটেল ও স্থানীয় সেবা — এবং প্রতিটি হাজির যাত্রা নিখুঁতভাবে নিশ্চিত করুন।',
            responsibilities: [
              'হজ প্রাক-নিবন্ধন, গ্রুপ বরাদ্দ ও সরকারি দাখিল পরিচালনা করুন',
              'সৌদি অংশীদারদের সাথে ফ্লাইট, হোটেল বুকিং ও মাকতাব সেবা সমন্বয় করুন',
              'প্রস্থান সূচি, রুমিং তালিকা ও হাজির কাগজপত্র প্রস্তুত করুন',
              'হজ মৌসুমে মক্কা ও মদিনায় স্থানীয় দলের সাথে যোগাযোগ রাখুন',
            ],
          },
          {
            title: 'ভিসা প্রসেসিং অফিসার',
            department: 'ডকুমেন্টেশন',
            type: 'পূর্ণকালীন',
            location: 'ঢাকা (অন-সাইট)',
            summary:
              'সৌদি আরব, সংযুক্ত আরব আমিরাত ও তার বাইরে হজ, উমরাহ ও পর্যটন ভ্রমণের জন্য নির্ভুল, সময়মতো ভিসা আবেদনের দায়িত্ব নিন।',
            responsibilities: [
              'হজ, উমরাহ, ইউএই ও শেনজেন ভিসা আবেদন প্রস্তুত ও দাখিল করুন',
              'পাসপোর্ট, ছবি ও সহায়ক কাগজপত্রের পূর্ণতা যাচাই করুন',
              'আবেদনের অবস্থা ট্র্যাক করুন এবং প্রতিটি ধাপে ক্লায়েন্টদের অবহিত রাখুন',
              'নিখুঁত রেকর্ড বজায় রাখুন এবং সম্পূর্ণ নিয়ন্ত্রক সম্মতি নিশ্চিত করুন',
            ],
          },
          {
            title: 'কাস্টমার কেয়ার রিপ্রেজেন্টেটিভ',
            department: 'কাস্টমার এক্সপেরিয়েন্স',
            type: 'পূর্ণকালীন',
            location: 'ঢাকা (অন-সাইট)',
            summary:
              'হাজিরা যে উষ্ণ, আশ্বস্তকারী প্রথম কণ্ঠস্বর শোনেন তা হয়ে উঠুন — জিজ্ঞাসার উত্তর দিন, পছন্দে পথ দেখান এবং আগ্রহকে আত্মবিশ্বাসী বুকিংয়ে রূপান্তর করুন।',
            responsibilities: [
              'ফোন, হোয়াটসঅ্যাপ ও সরাসরি জিজ্ঞাসায় ধৈর্য ও যত্নের সাথে সাড়া দিন',
              'সম্ভাব্য হাজিদের কাছে প্যাকেজ, মূল্য ও পদ্ধতি স্পষ্টভাবে ব্যাখ্যা করুন',
              'লিড ফলো-আপ করুন এবং বুকিং যাত্রায় ক্লায়েন্টদের সহায়তা দিন',
              'মতামত সংগ্রহ করুন এবং আমাদের সেবার মান ক্রমাগত উন্নত করতে সাহায্য করুন',
            ],
          },
          {
            title: 'টিকিটিং এক্সিকিউটিভ',
            department: 'বিমান ভ্রমণ',
            type: 'পূর্ণকালীন',
            location: 'ঢাকা (অন-সাইট)',
            summary:
              '৪০+ এয়ারলাইন জুড়ে অভ্যন্তরীণ ও আন্তর্জাতিক বিমান টিকিট ইস্যু করুন, হাজি ও ভ্রমণকারীদের জন্য সেরা ভাড়া ও রুট নিশ্চিত করুন।',
            responsibilities: [
              'GDS ও এয়ারলাইন পোর্টালের মাধ্যমে বিমান টিকিট অনুসন্ধান, কোট ও ইস্যু করুন',
              'জেদ্দা, মদিনা, দুবাই ও তার বাইরে সর্বোত্তম ভাড়া ও রুট খুঁজুন',
              'রিইস্যু, রিফান্ড, তারিখ পরিবর্তন ও গ্রুপ ভাড়ার অনুরোধ সামলান',
              'বুকিং মিলিয়ে দেখুন এবং অ্যাকাউন্টস দলের সাথে সমন্বয় করুন',
            ],
          },
          {
            title: 'ডিজিটাল মার্কেটিং এক্সিকিউটিভ',
            department: 'মার্কেটিং',
            type: 'পূর্ণকালীন',
            location: 'ঢাকা (অন-সাইট)',
            summary:
              'কনটেন্ট, সোশ্যাল মিডিয়া ও চিন্তাশীল ক্যাম্পেইনের মাধ্যমে আমাদের অনলাইন উপস্থিতি বাড়ান এবং আমাদের গল্প আরও বেশি পরিবারের কাছে পৌঁছে দিন।',
            responsibilities: [
              'ফেসবুক, ইনস্টাগ্রাম ও ওয়েবসাইট জুড়ে কনটেন্ট পরিকল্পনা ও প্রকাশ করুন',
              'হজ ও উমরাহ প্যাকেজ মৌসুমের জন্য পেইড ক্যাম্পেইন চালান ও অপ্টিমাইজ করুন',
              'আমাদের বিশ্বস্ত, যত্নশীল ব্র্যান্ডের প্রতিফলন ঘটায় এমন গ্রাফিক্স, রিল ও কপি তৈরি করুন',
              'অ্যানালিটিক্স ট্র্যাক করুন এবং রিচ, এনগেজমেন্ট ও লিড জেনারেশন নিয়ে রিপোর্ট দিন',
            ],
          },
        ],
      },
      apply: {
        eyebrow: 'কীভাবে আবেদন করবেন',
        heading: 'আমাদের দলে যোগ দিতে চারটি সহজ ধাপ',
        intro:
          'আপনার ঠিক পদটি তালিকায় দেখছেন না? তবুও আমরা প্রতিভাবান, আন্তরিক মানুষের কথা শুনতে চাই। আপনার সিভি পাঠান এবং বলুন কীভাবে আপনি আমাদের হাজিদের আরও ভালো সেবা দিতে সাহায্য করতে পারেন।',
        steps: [
          'আপনার সিভি এবং কেন যোগ দিতে চান তা জানিয়ে একটি সংক্ষিপ্ত কভার নোট ইমেইল করুন।',
          'যে পদে আবেদন করছেন তা ইমেইলের সাবজেক্ট লাইনে উল্লেখ করুন।',
          'আমাদের দল প্রতিটি আবেদন পর্যালোচনা করে এবং বাছাইকৃত প্রার্থীদের সাথে যোগাযোগ করে।',
          'নির্বাচিত আবেদনকারীদের সাক্ষাৎকারের জন্য আমাদের পুরানা পল্টন অফিসে আমন্ত্রণ জানানো হয়।',
        ],
        cardTitle: 'আপনার আবেদন পাঠান',
        cardBody:
          'সাবজেক্ট লাইনে পদসহ আপনার সিভি ইমেইল করুন, আমাদের দল যোগাযোগ করবে।',
        careersEmailLabel: 'ক্যারিয়ার ইমেইল',
        callUsLabel: 'আমাদের কল করুন',
        visitOfficeLabel: 'আমাদের অফিসে আসুন',
        contact: 'যোগাযোগ করুন',
        applicationSubject: 'ক্যারিয়ার আবেদন — Inter Gulf Travels',
        applicationPrefix: 'আবেদন',
      },
    },

    // ── Reviews page ───────────────────────────────────────────────────
    reviews: {
      meta: {
        title: 'গ্রাহক পর্যালোচনা — হাজিদের অভিজ্ঞতা',
        description:
          'Inter Gulf Travels Ltd-এর সাথে হজ ও উমরাহ যাত্রা করা হাজিদের সৎ পর্যালোচনা পড়ুন। ২০০২ সাল থেকে হাজারো যাত্রায় ৪.৯/৫ রেটিং প্রাপ্ত।',
      },
      hero: {
        eyebrow: 'গ্রাহক পর্যালোচনা',
        titleA: 'আমাদের সাথে যাত্রার পর হাজিরা ',
        titleHighlight: 'যা বলেন',
        lead: 'আস্থা এমন কিছু নয় যা আমরা দাবি করি — এটি এমন কিছু যা হাজারো পরিবার দুই দশক ধরে আমাদের দিয়েছেন। তাঁরা যা বলেন তা এখানে।',
        crumbAbout: 'আমাদের সম্পর্কে',
        crumb: 'গ্রাহক পর্যালোচনা',
      },
      starsAria: '৫-এর মধ্যে',
      summary: {
        score: '৪.৯',
        averageA: 'গড় রেটিং, ',
        averageCount: '২,৪০০+',
        averageB: ' হাজির পর্যালোচনা থেকে',
        breakdownTitle: 'রেটিং বিশ্লেষণ',
      },
      highlights: [
        { value: '১০-এ ৮', label: 'হাজি ফিরে আসেন বা পরিবারকে রেফার করেন' },
        { value: '৯৮%', label: 'অন্যদের আমাদের সুপারিশ করবেন' },
        { value: '১২,০০০+', label: '২০০২ সাল থেকে সেবা পাওয়া হাজি' },
      ],
      grid: {
        eyebrow: 'হাজিদের গল্প',
        titleA: 'সৎ কথা, ',
        titleHighlight: 'প্রকৃত যাত্রা থেকে',
        lead: 'নিচের প্রতিটি পর্যালোচনা এমন একজন হাজির, যিনি তাঁর পবিত্র যাত্রা আমাদের হাতে তুলে দিয়েছিলেন।',
      },
      extraReviews: [
        {
          name: 'Shahidul Islam',
          role: 'ইকোনমি হজ ২০২৩ · নারায়ণগঞ্জ',
          quote:
            'আমি ভেবেছিলাম ইকোনমি প্যাকেজে হয়তো কিছু কমতি থাকবে, কিন্তু সব কিছুই ঠিক যেমন বলা হয়েছিল তেমনই ছিল। হারামে যাওয়ার শাটল সময়মতো ছিল এবং আমাদের মুয়াল্লিম ছিলেন জ্ঞানী ও দয়ালু। ন্যায্য মূল্য, সৎ সেবা।',
          rating: 5,
        },
        {
          name: 'Rokeya Sultana',
          role: 'উমরাহ · খুলনা',
          quote:
            'আমি ও আমার স্বামী প্রথমবার উমরাহ করেছি এবং Inter Gulf তা অনায়াস করে দিয়েছে। ভিসা সময়মতো এসেছে, মদিনার হোটেল মসজিদ থেকে দুই মিনিটের হাঁটা পথ ছিল। ইনশাআল্লাহ আমরা আবার তাঁদের সাথে যাব।',
          rating: 5,
        },
        {
          name: 'Golam Mostafa',
          role: 'গ্রুপ হজ ২০২২ · ঢাকা',
          quote:
            'আমি দুবার হজ করেছি এবং এটি ছিল সবচেয়ে সুসংগঠিত। প্রাক-হজ প্রশিক্ষণ আমাদের দলের সবাইকে প্রস্তুত করেছিল, এবং অফিস দেশে আমাদের পরিবারকে অবহিত রেখেছিল। শুরু থেকে শেষ পর্যন্ত সত্যিই পেশাদার।',
          rating: 5,
        },
        {
          name: 'Tahmina Akter',
          role: 'ফ্যামিলি উমরাহ · কুমিল্লা',
          quote:
            'আমরা তিন সন্তান ও আমার বৃদ্ধ বাবাকে নিয়ে যাত্রা করেছি। তাঁরা যে সংযুক্ত রুম ও হুইলচেয়ার সহায়তার ব্যবস্থা করেছিলেন তা অনেক পার্থক্য গড়ে দিয়েছে। পুরো দল আমাদের এত ধৈর্যের সাথে দেখেছেন। জাযাকাল্লাহু খাইরান।',
          rating: 5,
        },
        {
          name: 'Mizanur Rahman',
          role: 'প্রিমিয়াম হজ ২০২৪ · গাজীপুর',
          quote:
            'প্রতিটি টাকার মূল্য আছে। হোটেলটি হারামের মুখোমুখি ছিল, ভ্রমণসূচি ছিল সংক্ষিপ্ত ও স্বাচ্ছন্দ্যময়, এবং আমাদের গাইড সব কিছু আগেভাগে বুঝে নিতেন। Inter Gulf সম্পর্কে বছরের পর বছর ভালো শোনার পর, তাঁরা আমার প্রত্যাশা ছাড়িয়ে গেছেন।',
          rating: 5,
        },
      ],
      siteTestimonials: {
        'Md. Abdur Rahman': {
          role: 'হজ ২০২৪ · ঢাকা',
          quote:
            'ঢাকার বিমানবন্দর থেকে কাবার সামনে দাঁড়ানো পর্যন্ত, প্রতিটি ধাপ সুসংগঠিত ছিল। হোটেল ছিল হারাম থেকে কয়েক মিনিটের পথ এবং আমাদের গাইড আমাদের নিজের পরিবারের মতো করে দেখেছেন। আলহামদুলিল্লাহ।',
        },
      },
      cta: {
        title: 'আমাদের সাথে যাত্রা করেছেন? আপনার অভিজ্ঞতা শেয়ার করুন',
        lead: 'আপনার গল্প আরেকটি পরিবারকে তাদের জীবনের যাত্রার প্রথম পদক্ষেপ নিতে সাহায্য করে। আপনার অভিজ্ঞতা শুনতে পারলে আমরা সম্মানিত বোধ করব।',
        leave: 'একটি রিভিউ দিন',
        explore: 'প্যাকেজ দেখুন',
      },
    },

    // ── Awards page ────────────────────────────────────────────────────
    awards: {
      meta: {
        title: 'পুরস্কার ও অধিভুক্তি — স্বীকৃতি ও সদস্যপদ',
        description:
          'Inter Gulf Travels Ltd সরকারি হজ লাইসেন্স নং ০৭১ ধারণ করে এবং HAAB, ATAB-এর সদস্য ও IATA-স্বীকৃত — বিশ্বস্ত হজ ও উমরাহ সেবার জন্য দুই দশকের স্বীকৃতি দ্বারা সমর্থিত।',
      },
      hero: {
        eyebrow: 'পুরস্কার ও অধিভুক্তি',
        titleA: 'স্বীকৃতি, গড়া ',
        titleHighlight: 'দুই দশকের আস্থার ওপর',
        lead: 'আমাদের সনদ দেয়ালে ঝোলানো ব্যাজের চেয়ে অনেক বেশি — এগুলো আপনার নিশ্চয়তা যে আপনার পবিত্র যাত্রা যে এজেন্সির হাতে, তা লাইসেন্সপ্রাপ্ত, স্বীকৃত ও জবাবদিহিমূলক।',
        crumbAbout: 'আমাদের সম্পর্কে',
        crumb: 'পুরস্কার ও অধিভুক্তি',
      },
      trustBadges: [
        'সরকার-অনুমোদিত',
        'HAAB সদস্য',
        'ATAB সদস্য',
        'IATA-স্বীকৃত',
        '১০০% যাচাইকৃত',
        '২০০২ সাল থেকে',
      ],
      certifications: {
        eyebrow: 'লাইসেন্স ও স্বীকৃতি',
        titleA: 'যে সনদ ',
        titleHighlight: 'আপনাকে সুরক্ষা দেয়',
        lead: 'নিচের প্রতিটি সনদ বৈধতার একটি প্রতিশ্রুতি — এবং প্রতিটিই আপনার মানসিক প্রশান্তির জন্য সুনির্দিষ্ট কিছু বোঝায়।',
        whatItMeans: 'এটি আপনার জন্য যা বোঝায়: ',
        items: [
          {
            badge: 'No. 071',
            title: 'সরকারি হজ লাইসেন্স',
            issuer: 'ধর্ম বিষয়ক মন্ত্রণালয়, বাংলাদেশ',
            body: 'হজ কর্মসূচি পরিচালনার আমাদের সরকারি লাইসেন্স, বাংলাদেশ সরকার কর্তৃক ইস্যুকৃত ও নিয়ন্ত্রিত — আমাদের আয়োজিত প্রতিটি যাত্রার ভিত্তি।',
            meaning: 'একটি নিশ্চয়তা যে আপনার হজযাত্রা বৈধ, নিয়ন্ত্রিত ও সম্পূর্ণ জবাবদিহিমূলক।',
          },
          {
            badge: 'HAAB',
            title: 'HAAB সদস্যপদ',
            issuer: 'হজ এজেন্সিজ অ্যাসোসিয়েশন অব বাংলাদেশ',
            body: 'লাইসেন্সপ্রাপ্ত হজ এজেন্সিগুলোর শীর্ষ সংস্থার সক্রিয় সদস্যপদ, যা আমাদের তার আচরণবিধি ও হাজি-সুরক্ষা মানদণ্ডের সাথে আবদ্ধ করে।',
            meaning: 'আপনার স্বার্থ একটি শিল্প-ব্যাপী নৈতিকতা ও সুরক্ষা কাঠামো দ্বারা সুরক্ষিত।',
          },
          {
            badge: 'ATAB',
            title: 'ATAB সদস্যপদ',
            issuer: 'অ্যাসোসিয়েশন অব ট্রাভেল এজেন্টস অব বাংলাদেশ',
            body: 'জাতীয় ট্রাভেল-এজেন্ট অ্যাসোসিয়েশনের স্বীকৃত সদস্যপদ, যে প্ল্যাটফর্ম শিল্প জুড়ে পেশাগত মান বজায় রাখে।',
            meaning: 'আস্থা যে আপনি একটি প্রতিষ্ঠিত, পেশাগতভাবে স্বীকৃত এজেন্সির সাথে লেনদেন করছেন।',
          },
          {
            badge: 'IATA',
            title: 'IATA স্বীকৃতি',
            issuer: 'ইন্টারন্যাশনাল এয়ার ট্রান্সপোর্ট অ্যাসোসিয়েশন',
            body: 'স্বীকৃতি যা আমাদের ৪০+ এয়ারলাইন জুড়ে সরাসরি বিশ্বব্যাপী বিমান টিকিট ইস্যু করতে দেয়, যাচাইকৃত, নিরাপদ টিকিটিংসহ।',
            meaning: 'ভালো ভাড়া, বিশ্বস্ত রুট এবং একটি আন্তর্জাতিকভাবে স্বীকৃত মানের নিশ্চয়তা।',
          },
        ],
      },
      recognitions: {
        eyebrow: 'স্বীকৃতি ও মাইলফলক',
        titleA: 'সম্মানিত ',
        titleHighlight: 'টেকসই সেবার জন্য',
        lead: 'যে স্বীকৃতি আমরা সবচেয়ে বেশি মূল্য দিই তা আসে সেই পরিবারগুলোর কাছ থেকে যাঁরা আমাদের ওপর আস্থা রাখেন — এবং যে মাইলফলক আমরা একসাথে পৌঁছেছি।',
        items: [
          {
            title: 'দুই দশকের বিশ্বস্ত সেবা',
            year: '২০০২ সাল থেকে',
            body: 'বিশ বছরেরও বেশি সময় ধরে সৎ, নির্ভরযোগ্য হাজি সেবার জন্য বাংলাদেশি হজ সম্প্রদায়ে স্বীকৃত।',
          },
          {
            title: '৪.৯ / ৫ হাজি সন্তুষ্টি',
            year: 'চলমান',
            body: 'হাজারো হাজির পর্যালোচনা জুড়ে ধারাবাহিকভাবে উচ্চ রেটিং — যে যত্ন পরিবারগুলো লক্ষ্য করে তার প্রতিফলন।',
          },
          {
            title: 'হজ অপারেশনে উৎকর্ষ',
            year: 'শিল্পে অবস্থান',
            body: 'নিখুঁতভাবে সংগঠিত হজ গ্রুপ অপারেশন ও স্থানীয় সহায়তার জন্য সমপেশাজীবীদের মাঝে স্বীকৃত।',
          },
          {
            title: '১২,০০০+ হাজিকে পথ দেখানো',
            year: 'মাইলফলক',
            body: 'আস্থার একটি মাইলফলক — বারো হাজারেরও বেশি হাজি আমাদের সাথে তাঁদের যাত্রা সম্পন্ন করেছেন।',
          },
        ],
      },
      cta: {
        title: 'এমন একটি নামের সাথে যাত্রা করুন যা আপনি যাচাই করতে ও বিশ্বাস করতে পারেন',
        leadB: ', HAAB ও ATAB-এর সদস্য। সম্পূর্ণ সরকারি লাইসেন্সের নিশ্চয়তা নিয়ে আপনার যাত্রা শুরু করুন।',
        getInTouch: 'যোগাযোগ করুন',
        viewPartners: 'আমাদের অংশীদার দেখুন',
      },
    },

    // ── Team page ──────────────────────────────────────────────────────
    team: {
      meta: {
        title: 'ব্যবস্থাপনা দল — যাত্রার পেছনের মানুষ',
        description:
          'Inter Gulf Travels Ltd-এর নেতৃত্বের সাথে পরিচিত হোন — যে অভিজ্ঞ দল ২০০২ সাল থেকে সততা ও যত্নের সাথে বাংলাদেশি হাজিদের হজ ও উমরাহয় পথ দেখিয়ে আসছে।',
      },
      hero: {
        eyebrow: 'ব্যবস্থাপনা দল',
        titleA: 'আপনার ',
        titleHighlight: 'পবিত্র যাত্রার',
        titleB: ' পেছনের মানুষ',
        lead: 'প্রতিটি স্বাচ্ছন্দ্যময় হজযাত্রার পেছনে আছে একটি নিবেদিত দল। যে অভিজ্ঞ নেতারা Inter Gulf Travels-কে পরিবারগুলোর বিশ্বস্ত একটি নাম করে তুলেছেন, তাঁদের সাথে পরিচিত হোন।',
        crumbAbout: 'আমাদের সম্পর্কে',
        crumb: 'ব্যবস্থাপনা দল',
      },
      intro:
        '২০০২ সালে আমাদের দরজা খোলার দিন থেকে, আমাদের সবচেয়ে বড় সম্পদ আমাদের মানুষ। আমাদের নেতৃত্বের প্রতিটি সদস্য হজ ও উমরাহ সেবায় বছরের পর বছরের নিবেদিত অভিজ্ঞতা নিয়ে আসেন — এবং একটি অভিন্ন বিশ্বাস যে হজযাত্রা সম্মানের যোগ্য একটি আস্থা, কখনোই কেবল একটি লেনদেন নয়।',
      members: [
        {
          name: 'Alhaj Md. Nurul Islam',
          role: 'চেয়ারম্যান',
          bio: '২০০২ সালে Inter Gulf Travels-এর প্রতিষ্ঠাতা, তিনি এজেন্সির পরিচালক নীতি স্থাপন করেছেন — প্রতিটি হাজিকে পরিবারের সততা ও যত্নের সাথে সেবা দেওয়া।',
        },
        {
          name: 'Md. Rafiqul Islam',
          role: 'ব্যবস্থাপনা পরিচালক',
          bio: 'কোম্পানির কৌশল ও প্রবৃদ্ধির নেতৃত্ব দেন, নিশ্চিত করেন যে দুই দশকের আস্থা প্রতিটি যাত্রায় আরও ভালো সেবায় রূপ নেয়।',
        },
        {
          name: 'Md. Shahjahan Kabir',
          role: 'পরিচালক — হজ ও উমরাহ অপারেশন',
          bio: 'সরকারি নিবন্ধন থেকে মক্কা ও মদিনায় স্থানীয় সমন্বয় পর্যন্ত সম্পূর্ণ হজ ও উমরাহ কর্মসূচি তত্ত্বাবধান করেন।',
        },
        {
          name: 'Mahbubur Rahman',
          role: 'জেনারেল ম্যানেজার',
          bio: 'বিভাগ জুড়ে দৈনন্দিন কার্যক্রম পরিচালনা করেন, প্রতিটি বুকিং, প্রস্থান ও হাজির অভিজ্ঞতা সুষ্ঠুভাবে চালু রাখেন।',
        },
        {
          name: 'Tanvir Ahmed',
          role: 'ভিসা ও টিকিটিং প্রধান',
          bio: 'ভিসা প্রসেসিং ও IATA-স্বীকৃত টিকিটিংয়ের নেতৃত্ব দেন, ৪০+ এয়ারলাইন জুড়ে সময়মতো ভিসা ও সেরা ভাড়া নিশ্চিত করেন।',
        },
        {
          name: 'Sumaiya Akter',
          role: 'কাস্টমার কেয়ার ম্যানেজার',
          bio: 'কাস্টমার এক্সপেরিয়েন্স দলের নেতৃত্ব দেন — সেই উষ্ণ, আশ্বস্তকারী কণ্ঠস্বর যা প্রথম জিজ্ঞাসা থেকে নিরাপদে ফেরা পর্যন্ত হাজিদের পথ দেখায়।',
        },
      ],
      ethosQuote:
        '“আমরা নিজেদের পরিমাপ করি না কতজন হাজিকে সেবা দিই তা দিয়ে, বরং কতজন আমাদের কাছে ফিরে আসেন — এবং তাঁদের পরিবারকেও পাঠান, তা দিয়ে।”',
      ethosByA: 'নেতৃত্ব — ',
      joinTitle: 'আমাদের দলে যোগ দিতে চান?',
      joinBody:
        'আমরা সর্বদা আন্তরিক, নিবেদিত মানুষ খুঁজি যাঁরা হাজিদের সেবায় আমাদের অঙ্গীকার ভাগ করে নেন। আমাদের বর্তমান পদগুলো দেখুন এবং Inter Gulf পরিবারের অংশ হোন।',
      viewCareers: 'ক্যারিয়ার দেখুন',
      emailAria: 'ইমেইল',
    },

    // ── Shared TeamCard ────────────────────────────────────────────────
    teamCard: {
      emailAria: 'ইমেইল',
    },
  },
};

export function getDict(locale: Locale) {
  return dict[locale];
}
