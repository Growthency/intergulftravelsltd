-- ============================================================================
-- Inter Gulf Travels Ltd — seed data
-- seed.sql
--
-- Idempotent seed for site settings, blog posts, gallery, navigation and
-- footer links. Safe to re-run: every insert uses ON CONFLICT DO NOTHING.
-- Run after 0001_schema.sql and 0002_policies.sql.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- site_settings
-- ----------------------------------------------------------------------------
insert into public.site_settings (key, value) values
  (
    'contact',
    jsonb_build_object(
      'phones',   jsonb_build_array('01711 358939', '01716 529232'),
      'emails',   jsonb_build_array('intergulfg47@gmail.com', 'intergulf71@gmail.com'),
      'whatsapp', '8801711358939',
      'whatsappDisplay', '+880 1711 358939',
      'address',  '31, Purana Paltan, KR Plaza, 5th Floor, Dhaka-1000',
      'hours',    'Saturday – Thursday · 10:00 AM – 8:00 PM',
      'mapQuery', 'KR Plaza, Purana Paltan, Dhaka 1000'
    )
  ),
  (
    'social',
    jsonb_build_object(
      'facebook',  'https://facebook.com/',
      'twitter',   'https://twitter.com/',
      'instagram', 'https://instagram.com/',
      'telegram',  'https://t.me/',
      'whatsapp',  'https://wa.me/8801711358939'
    )
  ),
  (
    'theme',
    jsonb_build_object(
      'primary', '#0e7c5a',
      'accent',  '#c9a24b',
      'forest',  '#06402b'
    )
  )
on conflict (key) do nothing;


-- ----------------------------------------------------------------------------
-- blog_posts (all published)
-- ----------------------------------------------------------------------------
insert into public.blog_posts
  (slug, title, excerpt, content, category, tags, author_name, author_role,
   read_time, tone, status, featured, published_at)
values
  (
    'how-to-prepare-for-hajj-2026',
    'How to Prepare for Hajj 2026: A Complete Checklist',
    'From pre-registration and vaccinations to packing and du’a, here is the practical, step-by-step checklist every Bangladeshi pilgrim needs to be ready for Hajj 2026.',
    $html$
<p>Hajj is the journey of a lifetime — and a journey that rewards preparation. Pilgrims who plan early arrive calmer, healthier and far more focused on worship. At Inter Gulf Travels we have guided pilgrims from Bangladesh since 2002, and the single biggest difference between a smooth Hajj and a stressful one is simple: starting early and following a clear checklist.</p>
<h2>Start with pre-registration and your booking</h2>
<p>Both government and private Hajj quotas in Bangladesh fill quickly, so the first step is pre-registration through the national Hajj management system. The earlier your serial, the more certain your confirmation. Once you are pre-registered, choose a licensed agency and a package that matches your budget and physical needs, and get every inclusion — flights, hotels, meals, Ziyarat and guide — in writing.</p>
<h2>Documents you must have ready</h2>
<ul>
  <li>A machine-readable passport valid for <strong>at least six months</strong> beyond travel.</li>
  <li>Recent passport-size photographs with a white background, plus your National ID.</li>
  <li>The mandatory <strong>meningitis (ACWY) vaccination certificate</strong> and any seasonal requirements.</li>
  <li>Proof of payment and your agency’s package confirmation.</li>
</ul>
<h2>Prepare your body and learn the rites</h2>
<p>Hajj is physically demanding — Tawaf, Sa’i and the long days in Mina and Arafah involve hours of walking, often in heat. Begin light daily walking two to three months before departure. Study the rites in advance: understand Ifrad, Qiran and Tamattu, learn how to enter ihram, and memorise the Talbiyah so confusion turns into calm.</p>
<h2>Pack smart and prepare your heart</h2>
<p>Pack light: unscented toiletries, a refillable water bottle, comfortable sandals, a small medical kit and a power bank. Then prepare spiritually — settle your debts, seek forgiveness, make sincere tawbah and travel with the intention of returning a better person. May Allah accept your Hajj and grant you Hajj Mabrur.</p>
$html$,
    'hajj-umrah',
    array['Hajj 2026', 'Checklist', 'Preparation', 'Pilgrimage', 'Bangladesh'],
    'Inter Gulf Travels',
    'Editorial Team',
    '8 min read',
    'emerald',
    'published',
    true,
    timestamptz '2026-05-12 09:00:00+00'
  ),
  (
    'umrah-for-first-timers',
    'Umrah for First-Timers: A Step-by-Step Guide',
    'Performing Umrah for the first time? This clear, step-by-step guide walks you through ihram, Tawaf, Sa’i and the completion of your pilgrimage with confidence.',
    $html$
<p>For many Bangladeshi Muslims, Umrah is the first journey to the holy cities — and standing before the Kaaba for the first time is a moment you never forget. Umrah can be performed at any time of year and takes only a few hours to complete. If this is your first time, this guide explains exactly what to do, step by step.</p>
<h2>What Umrah involves</h2>
<p>Umrah consists of four essential acts performed in order: entering the state of <strong>ihram</strong>, performing <strong>Tawaf</strong> around the Kaaba, walking <strong>Sa’i</strong> between Safa and Marwah, and finally <strong>shaving or trimming the hair</strong>.</p>
<h2>Step 1 — Enter ihram at the Miqat</h2>
<p>Make a fresh ghusl if you can, then declare your intention for Umrah and begin reciting the Talbiyah. Men wear two unstitched white cloths; women wear ordinary modest clothing. Once in ihram, cutting hair or nails, using perfume and covering the head (for men) are forbidden.</p>
<h2>Step 2 — Perform Tawaf</h2>
<p>Begin from the corner of the Black Stone and circle the Kaaba <strong>seven times</strong> anti-clockwise, with the Kaaba on your left. Make du’a freely throughout, then pray two short rak’ah near Maqam Ibrahim if there is space.</p>
<h2>Step 3 — Walk Sa’i, then complete your Umrah</h2>
<p>Drink Zamzam, then walk between Safa and Marwah seven times, beginning at Safa and ending at Marwah. Afterwards, men shave or trim and women cut a fingertip’s length — and with that, your Umrah is complete. Our Bangla-speaking guides accompany every group through each rite, so you are never alone.</p>
$html$,
    'hajj-umrah',
    array['Umrah', 'First-timers', 'Tawaf', 'Guide', 'Ihram'],
    'Mufti Saiful Islam',
    'Religious Guide & Muallim',
    '7 min read',
    'gold',
    'published',
    false,
    timestamptz '2026-04-22 09:00:00+00'
  ),
  (
    'hajj-package-guide-economy-standard-premium',
    'Hajj Package Guide: Economy vs Standard vs Premium — Which Is Right for You?',
    'Confused by Hajj package tiers? We break down exactly what economy, standard and premium include — duration, hotels, meals and comfort — so you can choose with confidence.',
    $html$
<p>Choosing a Hajj package is one of the most important decisions you will make as a pilgrim. Every legitimate package covers the same essentials — return flights, the Hajj visa, accommodation in Makkah and Madinah, meals, transport, full Ziyarat and a guide. What changes between tiers is the <strong>quality and convenience</strong> of those elements.</p>
<h2>Economy Hajj</h2>
<p>Designed for pilgrims who want a complete, properly licensed Hajj at the most accessible price. It typically runs the longest — around 40 to 42 days — with comfortable hotels served by regular shuttle transport, all meals included, full Ziyarat, a Bangla-speaking guide and the pre-Hajj training workshop. Best for pilgrims who are physically fit and flexible on time.</p>
<h2>Standard Hajj</h2>
<p>The balanced, most-chosen option. The itinerary is shorter — typically 30 to 35 days — and hotels sit within about 700 metres of the Haram, often within walking distance. It includes full-board buffet meals, a dedicated guide, complete Ziyarat and Maktab service in Mina and Arafah.</p>
<h2>Premium Hajj</h2>
<p>The shortest itinerary (around 21 to 25 days) and the highest comfort: five-star hotels facing the Haram, premium meals, private transport, a small group with a senior guide and an upgraded VIP tent in Mina. Ideal for elderly pilgrims, those with limited mobility and busy professionals.</p>
<h2>How to decide</h2>
<p>Ask three honest questions — about your health and mobility, the time you can take away, and your realistic budget. At Inter Gulf Travels every package is clearly itemised, so you know exactly what you are paying for before you commit.</p>
$html$,
    'hajj-umrah',
    array['Hajj Packages', 'Pricing', 'Comparison', 'Planning'],
    'Inter Gulf Travels',
    'Hajj Advisory Desk',
    '8 min read',
    'forest',
    'published',
    false,
    timestamptz '2026-03-18 09:00:00+00'
  ),
  (
    '7-blessed-ziyarat-sites-makkah-madinah',
    '7 Blessed Ziyarat Sites to Visit in Makkah and Madinah',
    'Beyond the Haramain, the holy cities hold sites rich with Islamic history. Here are seven blessed Ziyarat locations every pilgrim should know and visit with reverence.',
    $html$
<p>For pilgrims travelling to the holy cities, Ziyarat — visiting places of Islamic significance — deepens the meaning of the journey. Most Inter Gulf packages include guided Ziyarat in both cities. Here are seven blessed sites worth knowing.</p>
<h2>1. Jabal al-Nour and the Cave of Hira</h2>
<p>On the outskirts of Makkah, this is where the Prophet ﷺ received the first revelation of the Qur’an. Whether you climb or view it from the base, pause here to remember how Islam began.</p>
<h2>2. Jabal Thawr</h2>
<p>South of Makkah, where the Prophet ﷺ and Abu Bakr (RA) hid during the migration — a reminder that Allah’s protection needs no grand means.</p>
<h2>3. The plains of Arafah and Jabal al-Rahmah</h2>
<p>The very heart of Hajj, where the standing (wuquf) takes place and near where the Farewell Sermon was delivered.</p>
<h2>4. Mina and the Jamarat</h2>
<p>The valley of white tents where pilgrims stay during Hajj. Visiting outside the season helps first-timers understand the geography of the rites.</p>
<h2>5. Masjid an-Nabawi and the Rawdah</h2>
<p>The spiritual centre of Madinah, home to the Rawdah — described by the Prophet ﷺ as “a garden from the gardens of Paradise.” Book a Rawdah slot in advance through the official Nusuk platform.</p>
<h2>6. Masjid Quba</h2>
<p>The first mosque built in Islam. Praying two rak’ah here, after making ablution at home, earns the reward of an Umrah.</p>
<h2>7. Mount Uhud and the martyrs’ cemetery</h2>
<p>The site of the Battle of Uhud and the resting place of seventy companions, including Hamza (RA). Ziyarat is about reflection and remembrance — make du’a to Allah alone at every site.</p>
$html$,
    'hajj-umrah',
    array['Ziyarat', 'Makkah', 'Madinah', 'Islamic History', 'Pilgrimage'],
    'Mufti Saiful Islam',
    'Religious Guide & Muallim',
    '7 min read',
    'sand',
    'published',
    false,
    timestamptz '2026-02-14 09:00:00+00'
  ),
  (
    'saudi-visa-guide-2026-bangladesh',
    'Saudi Visa Guide 2026 for Bangladeshi Travellers',
    'Umrah, tourist, Hajj or work — Saudi Arabia offers several visa routes for Bangladeshis. Here is a clear 2026 guide to which visa you need, what it costs and how to apply.',
    $html$
<p>Saudi Arabia has transformed how visitors enter the Kingdom, and for Bangladeshi travellers there are now several clear routes — whether you are going for Umrah, tourism, business or Hajj. Knowing exactly which visa fits your trip saves time, money and stress.</p>
<h2>The Umrah visa</h2>
<p>The Umrah e-visa is the most common route for Bangladeshi pilgrims and can be obtained throughout the year, usually within a few working days when documents are complete. You will generally need a passport valid for at least six months, a recent white-background photograph, confirmed accommodation, a return ticket and the required vaccination certificate(s).</p>
<h2>The tourist visa</h2>
<p>Saudi Arabia’s tourist visa is often a multiple-entry, one-year visa allowing stays of up to ninety days — and importantly it also permits Umrah outside the Hajj period. It is ideal for travellers who want to combine Umrah with Riyadh, Jeddah, Al-Ula or the Red Sea coast.</p>
<h2>The Hajj visa</h2>
<p>The Hajj visa is strictly seasonal and issued only through approved agencies and the official Hajj systems. It cannot be obtained as a regular tourist or e-visa. Inter Gulf Travels handles the entire Hajj visa process on your behalf as part of every Hajj package.</p>
<h2>Avoid common delays</h2>
<p>Most refusals are avoidable: check passport validity, photo specifications, vaccination certificates and detail matching, and never apply on the wrong visa type. Our visa desk handles Saudi, UAE, Malaysia, Thailand and Schengen visas and submits on your behalf.</p>
$html$,
    'others',
    array['Saudi Visa', 'Visa Guide', '2026', 'Bangladesh', 'Travel'],
    'Inter Gulf Travels',
    'Visa Services Desk',
    '8 min read',
    'emerald',
    'published',
    false,
    timestamptz '2026-01-28 09:00:00+00'
  ),
  (
    '5-family-holiday-destinations-from-dhaka',
    '5 Unforgettable Family Holiday Destinations You Can Book from Dhaka',
    'Looking for a family getaway beyond the pilgrimage? From Dubai to the Maldives, here are five wonderful destinations you can book directly from Dhaka — with tips for travelling with family.',
    $html$
<p>While our heart is in serving Hajj and Umrah pilgrims, we also love helping Bangladeshi families discover the world. Some of the world’s best family destinations are just a direct flight from Dhaka, with friendly visa processes and plenty for every age.</p>
<h2>1. Dubai, United Arab Emirates</h2>
<p>Close, accessible by direct flights and packed with attractions — from the Burj Khalifa to a desert safari at sunset. Halal food is everywhere and prayer facilities are easy to find. Best from November to March.</p>
<h2>2. Malaysia</h2>
<p>Lush nature, modern cities and a warm, Muslim-friendly culture. Kuala Lumpur dazzles with the Petronas Towers, while Langkawi and Penang add beaches and island charm.</p>
<h2>3. Turkey</h2>
<p>History and beauty like nowhere else — Istanbul’s Blue Mosque and Bosphorus, and Cappadocia’s hot-air balloons. Travelling with elders? Spend more nights in fewer cities.</p>
<h2>4. Maldives</h2>
<p>Turquoise lagoons, soft white sand and some of the clearest water on earth. Choose a family-friendly resort or a local-island guesthouse for a more budget-conscious stay.</p>
<h2>5. Kashmir, India</h2>
<p>“Paradise on earth” — cool mountain air, a shikara ride on Dal Lake and the meadows of Gulmarg, all within easy reach from Dhaka.</p>
<h2>Tips for a smooth family holiday</h2>
<p>Book early for the best fares, sort visas in advance, plan for every age, and choose central, comfortable hotels to cut down on tiring transfers. Tell us your dates, your budget and who is travelling, and we will plan a holiday your whole family will treasure.</p>
$html$,
    'others',
    array['Family Holiday', 'Tour Packages', 'Dubai', 'Maldives', 'Travel Tips'],
    'Nusrat Hossain',
    'Tour & Holidays Editor',
    '7 min read',
    'gold',
    'published',
    false,
    timestamptz '2026-01-10 09:00:00+00'
  )
on conflict (slug) do nothing;


-- ----------------------------------------------------------------------------
-- gallery_images
-- ----------------------------------------------------------------------------
insert into public.gallery_images (title, url, category, sort_order) values
  ('Pilgrims at the Kaaba, Masjid al-Haram', '/gallery/makkah-haram.webp',      'hajj',   10),
  ('Masjid an-Nabawi at dusk, Madinah',      '/gallery/madinah-nabawi.webp',    'umrah',  20),
  ('The white tents of Mina',                '/gallery/mina-tents.webp',        'hajj',   30),
  ('Standing on the plains of Arafah',       '/gallery/arafah.webp',            'hajj',   40),
  ('Inter Gulf group departing Dhaka',       '/gallery/group-departure.webp',   'group',  50),
  ('Hotel steps from the Haram',             '/gallery/hotel-haram.webp',       'hotel',  60),
  ('Ziyarat at Masjid Quba',                 '/gallery/quba.webp',              'ziyarat',70),
  ('Family Umrah pilgrims, Madinah',         '/gallery/family-umrah.webp',      'umrah',  80)
on conflict do nothing;


-- ----------------------------------------------------------------------------
-- menu_items (header navigation, mirrors the live site)
-- Parents are inserted first, then children reference them by label/href.
-- ----------------------------------------------------------------------------
insert into public.menu_items (label, href, parent_id, sort_order, location) values
  ('Home',       '/',        null, 10, 'header'),
  ('Hajj',       '/hajj',    null, 20, 'header'),
  ('Umrah',      '/umrah',   null, 30, 'header'),
  ('Services',   '/services',null, 40, 'header'),
  ('Gallery',    '/gallery', null, 50, 'header'),
  ('Blog',       '/blog',    null, 60, 'header'),
  ('About Us',   '/about',   null, 70, 'header'),
  ('Contact Us', '/contact', null, 80, 'header')
on conflict do nothing;

-- Hajj children
insert into public.menu_items (label, href, parent_id, sort_order, location)
select v.label, v.href, p.id, v.sort_order, 'header'
from (values
  ('Benefit of Hajj', '/hajj/benefit',   10),
  ('Hajj Packages',   '/hajj/packages',  20),
  ('Hajj Guide',      '/hajj/guide',     30),
  ('Hajj Guideline',  '/hajj/guideline', 40),
  ('FAQ of Hajj',     '/hajj/faq',       50)
) as v(label, href, sort_order)
cross join lateral (
  select id from public.menu_items where href = '/hajj' and parent_id is null limit 1
) as p
on conflict do nothing;

-- Umrah children
insert into public.menu_items (label, href, parent_id, sort_order, location)
select v.label, v.href, p.id, v.sort_order, 'header'
from (values
  ('Benefit of Umrah', '/umrah/benefit',   10),
  ('Umrah Packages',   '/umrah/packages',  20),
  ('Umrah Guide',      '/umrah/guide',     30),
  ('Umrah Guideline',  '/umrah/guideline', 40),
  ('FAQ of Umrah',     '/umrah/faq',       50)
) as v(label, href, sort_order)
cross join lateral (
  select id from public.menu_items where href = '/umrah' and parent_id is null limit 1
) as p
on conflict do nothing;

-- Services children
insert into public.menu_items (label, href, parent_id, sort_order, location)
select v.label, v.href, p.id, v.sort_order, 'header'
from (values
  ('Visa Service',  '/services/visa',          10),
  ('Air Ticket',    '/services/air-ticket',    20),
  ('Hotel Booking', '/services/hotel-booking', 30),
  ('Tour Packages', '/services/tour',          40)
) as v(label, href, sort_order)
cross join lateral (
  select id from public.menu_items where href = '/services' and parent_id is null limit 1
) as p
on conflict do nothing;

-- Blog children
insert into public.menu_items (label, href, parent_id, sort_order, location)
select v.label, v.href, p.id, v.sort_order, 'header'
from (values
  ('Hajj & Umrah', '/blog?category=hajj-umrah', 10),
  ('Others',       '/blog?category=others',     20)
) as v(label, href, sort_order)
cross join lateral (
  select id from public.menu_items where href = '/blog' and parent_id is null limit 1
) as p
on conflict do nothing;

-- About children
insert into public.menu_items (label, href, parent_id, sort_order, location)
select v.label, v.href, p.id, v.sort_order, 'header'
from (values
  ('About Us',            '/about',            10),
  ('Business Associates', '/about/associates', 20),
  ('Career Opportunity',  '/about/career',     30),
  ('Customer Reviews',    '/about/reviews',    40),
  ('Awards & Affiliations','/about/awards',    50),
  ('Management Team',     '/about/team',       60)
) as v(label, href, sort_order)
cross join lateral (
  select id from public.menu_items where href = '/about' and parent_id is null limit 1
) as p
on conflict do nothing;


-- ----------------------------------------------------------------------------
-- footer_links
-- ----------------------------------------------------------------------------
insert into public.footer_links (label, href, column_key, sort_order) values
  -- Help & Support
  ('Hajj Packages',        '/hajj/packages',   'help', 10),
  ('Umrah Packages',       '/umrah/packages',  'help', 20),
  ('Contact Us',           '/contact',         'help', 30),
  ('Gallery',              '/gallery',         'help', 40),
  ('Blog',                 '/blog',            'help', 50),
  ('About Us',             '/about',           'help', 60),
  ('Terms & Conditions',   '/terms',           'help', 70),
  ('Privacy Policy',       '/privacy',         'help', 80),
  -- Useful Links
  ('BD Hajj Management',          'https://hajj.gov.bd',              'useful', 10),
  ('Ministry of Religious Affairs','https://mora.gov.bd',             'useful', 20),
  ('HAAB Bangladesh',             'https://haab.com.bd',              'useful', 30),
  ('ATAB',                        'https://atab.org.bd',              'useful', 40),
  ('Saudi e-Hajj Portal',         'https://www.haj.gov.sa',           'useful', 50),
  ('Biman Bangladesh Airlines',   'https://www.biman-airlines.com',   'useful', 60),
  ('Saudia Airlines',             'https://www.saudia.com',           'useful', 70),
  ('Saudi e-Visa',                'https://visa.visitsaudi.com',      'useful', 80)
on conflict do nothing;
