#!/usr/bin/env node
// Checkpoint 4 Phase 1 — hardened verifier.
//
// Walks all 13 dist/<route>/index.html files; runs universal head-tag
// + nav/footer assertions and per-route schema/island/image/data-reveal
// assertions. Stops on first route failure — emits a route×check matrix
// and a final per-route pass/fail summary.

import { readFileSync, existsSync } from 'node:fs';

const decodeEntities = (s) => s
  .replace(/&amp;/g, '&')
  .replace(/&#38;/g, '&')
  .replace(/&#x26;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"');

const ROUTES = [
  {
    path: '/',
    file: 'dist/index.html',
    title: 'Trash Pickup & Waste Management in Hubbard, TX | Rankin Waste',
    description: 'Reliable trash pickup and waste management service in Hubbard, TX and surrounding rural communities. Family-owned, 250+ five-star reviews, no contracts. Call (254) 205-6125.',
    canonical: 'https://rankinwaste.com/',
    ogImage: 'https://rankinwaste.com/truck-side.webp',
    dataRevealCount: 15,
    schemas: [
      { key: 'LocalBusiness', bytes: 1999 },
      { key: 'FAQPage', bytes: 2270 },
    ],
    custom: (body, head, helpers) => helpers.homepage(body, head),
  },
  {
    path: '/terms-of-service',
    file: 'dist/terms-of-service/index.html',
    title: 'Terms of Service - Rankin Waste Management',
    description: 'Terms and Conditions for Rankin Waste Management, including SMS messaging consent, communication policies, and service terms.',
    canonical: 'https://rankinwaste.com/terms-of-service',
    ogImage: 'https://rankinwaste.com/truck-side.webp',
    dataRevealCount: 1,
    schemas: [],
    custom: (body) => [
      ['H1 = "Terms of Service"', /<h1[^>]*>\s*Terms of Service\s*<\/h1>/.test(body)],
      ['"Last updated: April 23, 2026"', body.includes('Last updated: April 23, 2026')],
    ],
  },
  {
    path: '/privacy-policy',
    file: 'dist/privacy-policy/index.html',
    title: 'Privacy Policy - Rankin Waste Management',
    description: 'Privacy Policy for Rankin Waste Management describing how we collect, use, and protect your personal information and SMS communications.',
    canonical: 'https://rankinwaste.com/privacy-policy',
    ogImage: 'https://rankinwaste.com/truck-side.webp',
    dataRevealCount: 1,
    schemas: [],
    custom: (body) => [
      ['H1 = "Privacy Policy"', /<h1[^>]*>\s*Privacy Policy\s*<\/h1>/.test(body)],
      ['"Last updated: April 23, 2026"', body.includes('Last updated: April 23, 2026')],
    ],
  },
  {
    path: '/residential',
    file: 'dist/residential/index.html',
    title: 'Residential - Rankin Waste Management',
    description: 'Dependable weekly residential trash pickup in Hubbard, Axtell, Dawson, Malone, and surrounding rural TX communities. Affordable rates, reliable service.',
    canonical: 'https://rankinwaste.com/residential',
    ogImage: 'https://rankinwaste.com/truck-side.webp',
    dataRevealCount: 1,
    schemas: [],
    custom: (body) => [
      ['H1 = "Residential"', /<h1[^>]*>\s*Residential\s*<\/h1>/.test(body)],
      ['CallCTA orange + tel link', body.includes('bg-orange-500') && body.includes('tel:+12542056125')],
    ],
  },
  {
    path: '/trash-trailer-rentals',
    file: 'dist/trash-trailer-rentals/index.html',
    title: 'Trash Trailer Rentals - Rankin Waste Management',
    description: 'Affordable trash trailer rentals in Hubbard, TX and surrounding areas. 16-foot trailers with high sides, flexible scheduling. We drop it off, you load it, we haul it away.',
    canonical: 'https://rankinwaste.com/trash-trailer-rentals',
    ogImage: 'https://rankinwaste.com/truck-side.webp',
    dataRevealCount: 1,
    schemas: [],
    custom: (body) => [
      ['H1 = "Trash Trailer Rentals"', /<h1[^>]*>\s*Trash Trailer Rentals\s*<\/h1>/.test(body)],
      ['"16-foot" body content', body.includes('16-foot')],
    ],
  },
  {
    path: '/about-us',
    file: 'dist/about-us/index.html',
    title: 'About Us - Rankin Waste Management',
    description: 'Rankin Waste Management is a family-owned trash service in Hubbard, TX. Owned and operated by Tommy Rankin, serving rural communities with reliable, affordable service.',
    canonical: 'https://rankinwaste.com/about-us',
    ogImage: 'https://rankinwaste.com/truck-side.webp',
    dataRevealCount: 3,
    schemas: [],
    custom: (body) => [
      ['H1 = "About Us"', /<h1[^>]*>\s*About Us\s*<\/h1>/.test(body)],
      ['tommy-sydney img with srcset', /<img[^>]*src="\/tommy-sydney\.webp"[^>]*srcset=/.test(body)],
      ['tommy-sydney img has NO width attr', () => {
        const m = body.match(/<img[^>]*src="\/tommy-sydney\.webp"[^>]*>/);
        return m && !m[0].includes('width=');
      }],
      ['CallCTA present', body.includes('tel:+12542056125') && body.includes('bg-orange-500')],
    ],
  },
  {
    path: '/contact-us',
    file: 'dist/contact-us/index.html',
    title: 'Contact us - Rankin Waste Management',
    description: 'Request trash pickup service from Rankin Waste Management. Serving Hubbard, TX and surrounding communities. Call (254) 205-6125 or submit a service request.',
    canonical: 'https://rankinwaste.com/contact-us',
    ogImage: 'https://rankinwaste.com/truck-side.webp',
    dataRevealCount: 0,
    schemas: [],
    custom: (body) => [
      ['H1 = "New Service Request"', /<h1[^>]*>\s*New Service Request\s*<\/h1>/.test(body)],
      ['GHL iframe with /widget/form/ URL',
        /<iframe[^>]*src="https?:\/\/[^"]+\/widget\/form\/[A-Za-z0-9]+"/.test(body)],
      ['Inline form_embed.js script', body.includes('form_embed.js')],
      ['"175 PR335" address visible', body.includes('175 PR335')],
      ['"(254) 205-6125" phone visible', body.includes('(254) 205-6125')],
      ['"rankinwaste@gmail.com" visible', body.includes('rankinwaste@gmail.com')],
      ['Hours visible (Mon-Fri 8AM-6PM)',
        body.includes('Mon-Fri 8AM-6PM') || body.includes('Mon&ndash;Fri 8AM&ndash;6PM') || body.includes('Mon–Fri 8AM–6PM') || body.includes('Mon – Fri 8AM – 6PM')],
    ],
  },
  {
    path: '/reviews',
    file: 'dist/reviews/index.html',
    title: 'Reviews - Waste Management Service in Hubbard, TX | Rankin Waste Management',
    description: 'Read reviews from Rankin Waste Management customers. See why families in Hubbard, TX and surrounding communities trust us for reliable waste management service.',
    canonical: 'https://rankinwaste.com/reviews',
    ogImage: 'https://rankinwaste.com/truck-side.webp',
    dataRevealCount: 0,
    schemas: [],
    custom: (body) => [
      ['H1 = "Waste Management Service Reviews in Hubbard, TX"',
        /<h1[^>]*>\s*Waste Management Service Reviews in Hubbard, TX\s*<\/h1>/.test(body)],
      ['ReviewWidget astro-island', body.includes('<astro-island') && body.includes('ReviewWidget')],
      ['ReviewWidget client="idle"', /astro-island[^>]*client="idle"/.test(body)],
      ['Reviewer "Kayla Jones"', body.includes('Kayla Jones')],
      ['Reviewer "Mary McCaghren"', body.includes('Mary McCaghren')],
      ['Reviewer "Kelly Meier"', body.includes('Kelly Meier')],
      ['Reviewer "Megan Lee"', body.includes('Megan Lee')],
      ['Reviewer "Reagan McCurlie"', body.includes('Reagan McCurlie')],
    ],
  },
  {
    path: '/service-areas/axtell',
    file: 'dist/service-areas/axtell/index.html',
    title: 'Waste Management Service in Axtell, TX | Rankin Waste Management',
    description: 'Reliable waste management in Axtell. Family-owned with 250+ five-star reviews. Free estimates, 24-hour response. Call (254) 205-6125.',
    canonical: 'https://rankinwaste.com/service-areas/axtell',
    ogImage: 'https://rankinwaste.com/truck-side.webp',
    dataRevealCount: 6,
    schemas: [{ key: 'Organization', bytes: 388 }],
    custom: (body, head) => [
      ['H1 = "Waste Management Service in Axtell, TX"',
        /<h1[^>]*>\s*Waste Management Service in Axtell, TX\s*<\/h1>/.test(body)],
      ['areaServed City "Axtell, TX"', head.includes('"areaServed":{"@type":"City","name":"Axtell, TX"}')],
      ['NO bgImage hero (no /images/services/...)', !body.includes('/images/services/')],
      ['NO ReviewWidget', !body.includes('ReviewWidget')],
      ['Page-content imgs <= 2 (Nav+Footer chrome only)',
        (body.match(/<img\s/g) || []).length <= 2],
    ],
  },
  {
    path: '/junk-removal-service-hubbard',
    file: 'dist/junk-removal-service-hubbard/index.html',
    title: 'Junk Removal Service Hubbard TX | Rankin Waste Management',
    description: 'Professional junk removal service in Hubbard, TX. We handle furniture, appliances, cleanouts and construction debris. Same-day pickup with upfront quotes from Rankin Waste Management.',
    canonical: 'https://rankinwaste.com/junk-removal-service-hubbard',
    ogImage: 'https://rankinwaste.com/junk-removal-trailer.webp',
    dataRevealCount: 7,
    schemas: [
      { key: 'Service', bytes: 554 },
      { key: 'BreadcrumbList', bytes: 297 },
    ],
    custom: (body, head) => [
      ['H1 = "Junk Removal Service in Hubbard"',
        /<h1[^>]*>\s*Junk Removal Service in Hubbard\s*<\/h1>/.test(body)],
      ['Service serviceType "Junk Removal"', head.includes('"serviceType":"Junk Removal"')],
      ['Service image = /junk-removal-trailer.webp',
        head.includes('"image":"https://rankinwaste.com/junk-removal-trailer.webp"')],
      ['BreadcrumbList 2 ListItems', (head.match(/"@type":"ListItem"/g) || []).length === 2],
      ['Page has /junk-removal-trailer.webp img', body.includes('/junk-removal-trailer.webp')],
    ],
  },
  {
    path: '/dumpster-rental-service-hubbard',
    file: 'dist/dumpster-rental-service-hubbard/index.html',
    title: 'Dumpster Rental Service Hubbard TX | Rankin Waste Management',
    description: 'Professional dumpster rental service in Hubbard, TX. Residential cleanouts, commercial waste, and construction roll-off containers. Local delivery and pickup by Rankin Waste Management.',
    canonical: 'https://rankinwaste.com/dumpster-rental-service-hubbard',
    ogImage: 'https://rankinwaste.com/truck-side.webp',
    dataRevealCount: 5,
    schemas: [
      { key: 'Service', bytes: 500 },
      { key: 'BreadcrumbList', bytes: 303 },
    ],
    custom: (body, head) => [
      ['H1 = "Dumpster Rental Service in Hubbard"',
        /<h1[^>]*>\s*Dumpster Rental Service in Hubbard\s*<\/h1>/.test(body)],
      ['Service serviceType "Dumpster Rental"', head.includes('"serviceType":"Dumpster Rental"')],
      ['Service has NO image key', !/"@type":"Service"[^}]*"image":/.test(head)],
      ['BreadcrumbList 2 ListItems', (head.match(/"@type":"ListItem"/g) || []).length === 2],
      ['0 page-content imgs (only Nav+Footer)', (body.match(/<img\s/g) || []).length === 2],
    ],
  },
  {
    path: '/garbage-collection-service-hubbard',
    file: 'dist/garbage-collection-service-hubbard/index.html',
    title: 'Garbage Collection Service Hubbard TX | Rankin Waste Management',
    description: 'Professional garbage collection service in Hubbard, TX. Weekly pickup, rural service, and bulk trash removal. Reliable waste management for homes and businesses.',
    canonical: 'https://rankinwaste.com/garbage-collection-service-hubbard',
    ogImage: 'https://rankinwaste.com/truck-side.webp',
    dataRevealCount: 5,
    schemas: [
      { key: 'Service', bytes: 506 },
      { key: 'BreadcrumbList', bytes: 309 },
    ],
    custom: (body, head) => [
      ['H1 = "Garbage Collection Service in Hubbard"',
        /<h1[^>]*>\s*Garbage Collection Service in Hubbard\s*<\/h1>/.test(body)],
      ['Service serviceType "Garbage Collection"', head.includes('"serviceType":"Garbage Collection"')],
      ['Service has NO image key', !/"@type":"Service"[^}]*"image":/.test(head)],
      ['bgImage hero present', body.includes('/images/services/garbage-collection.webp')],
      ['3 page-content imgs',
        (body.match(/\/images\/garbage-collection\/[a-z-]+\.webp/g) || []).length >= 3],
      ['ReviewWidget island', body.includes('ReviewWidget') && body.includes('<astro-island')],
    ],
  },
  {
    path: '/waste-management-service-hubbard',
    file: 'dist/waste-management-service-hubbard/index.html',
    title: 'Waste Management Service Hubbard TX | Rankin Waste Management',
    description: 'Professional waste management service in Hubbard, TX. Weekly residential pickup, curbside collection, and rural trash service. Reliable garbage removal for homes and businesses.',
    canonical: 'https://rankinwaste.com/waste-management-service-hubbard',
    ogImage: 'https://rankinwaste.com/truck-side.webp',
    dataRevealCount: 6,
    schemas: [{ key: 'Organization', bytes: 389 }],
    custom: (body, head) => [
      ['H1 = "Waste Management Service in Hubbard"',
        /<h1[^>]*>\s*Waste Management Service in Hubbard\s*<\/h1>/.test(body)],
      ['Single Organization, NO Service, NO BreadcrumbList',
        head.includes('"@type":"Organization"') && !head.includes('"@type":"Service"') && !head.includes('BreadcrumbList')],
      ['areaServed City "Hubbard, TX"', head.includes('"areaServed":{"@type":"City","name":"Hubbard, TX"}')],
      ['bgImage hero present', body.includes('/images/services/waste-management.webp')],
      ['4 page-content imgs',
        (body.match(/\/images\/hubbard\/[a-z-]+\.webp/g) || []).length >= 4],
      ['ReviewWidget island', body.includes('ReviewWidget') && body.includes('<astro-island')],
    ],
  },
];

const helpers = {
  homepage: (body, head) => [
    ['Hero preload <link> lowercase imagesrcset/imagesizes',
      /<link rel="preload"[^>]*as="image"[^>]*imagesrcset="[^"]+"[^>]*imagesizes="100vw"/.test(head)],
    ['Hero <header id="top">', /<header id="top"/.test(body)],
    ['Hero <img> loading="eager" + fetchpriority="high"',
      /<img[^>]*src="\/truck-side\.webp"[^>]*loading="eager"[^>]*fetchpriority="high"/.test(body)],
    ['ReviewWidget island', body.includes('<astro-island') && body.includes('ReviewWidget')],
    ['FaqAccordion island', body.includes('FaqAccordion')],
    ['>= 2 islands client="idle"', (body.match(/client="idle"/g) || []).length >= 2],
    ['Internal link → /waste-management-service-hubbard',
      /href="\/waste-management-service-hubbard"/.test(body)],
    ['Internal link → /garbage-collection-service-hubbard',
      /href="\/garbage-collection-service-hubbard"/.test(body)],
    ['Internal link → /junk-removal-service-hubbard',
      /href="\/junk-removal-service-hubbard"/.test(body)],
    ['Internal link → /dumpster-rental-service-hubbard',
      /href="\/dumpster-rental-service-hubbard"/.test(body)],
    ['5 reviewer names server-rendered',
      ["Kayla Jones","Mary McCaghren","Kelly Meier","Megan Lee","Reagan McCurlie"].every(n => body.includes(n))],
    ['8 FAQ Qs server-rendered',
      ["What areas do you serve around Hubbard?",
       "Do you require long-term contracts or have cancellation fees?",
       "What can I put out for pickup",
       "How much does weekly trash pickup cost?",
       "What happens if you miss my pickup day?",
       "Do you offer bulk pickup for furniture and appliances?",
       "How do I schedule or cancel service?",
       "Are there extra fees for fuel or environmental charges?"].every(q => body.includes(q))],
    ['#hero-modal-trigger + #final-modal-trigger',
      body.includes('id="hero-modal-trigger"') && body.includes('id="final-modal-trigger"')],
    ['CustomEvent("open-service-modal") in inline script',
      body.includes("CustomEvent('open-service-modal')")],
  ],
};

function universalChecks(route, html) {
  const headEnd = html.indexOf('</head>');
  if (headEnd < 0) return [{ label: 'parse <head>', pass: false }];
  const head = html.slice(0, headEnd);
  const body = html.slice(headEnd);
  const checks = [];
  const c = (l, p) => checks.push({ label: l, pass: !!p });

  const titleM = head.match(/<title>([\s\S]*?)<\/title>/);
  const titleText = titleM ? decodeEntities(titleM[1]).trim() : '';
  c('U1 <title> in <head> matches baseline', titleText === route.title);
  c('U2 <title> NOT in <body>', !/<title>/.test(body));

  const descM = head.match(/<meta name="description" content="([^"]*)"/);
  c('U3 <meta description> matches baseline', descM && decodeEntities(descM[1]) === route.description);

  const canonM = head.match(/<link rel="canonical" href="([^"]*)"/);
  c('U4 <link canonical> matches baseline', canonM && canonM[1] === route.canonical);

  c('U5 og:type=website', head.includes('property="og:type" content="website"'));
  c('U6 og:locale=en_US', head.includes('property="og:locale" content="en_US"'));
  c('U7 og:site_name="Rankin Waste Management"',
    head.includes('property="og:site_name" content="Rankin Waste Management"'));
  c('U8 og:image:width=1600 + height=1067',
    head.includes('property="og:image:width" content="1600"') &&
    head.includes('property="og:image:height" content="1067"'));
  c('U9 twitter:card=summary_large_image',
    head.includes('name="twitter:card" content="summary_large_image"'));
  c('U10 og:image matches', head.includes(`property="og:image" content="${route.ogImage}"`));
  c('U11 og:image:alt present', /property="og:image:alt" content="[^"]+"/.test(head));
  c('U12 twitter:image matches', head.includes(`name="twitter:image" content="${route.ogImage}"`));
  c('U13 lato-400 + lato-700 font preloads',
    head.includes('href="/fonts/lato-400.woff2" as="font"') &&
    head.includes('href="/fonts/lato-700.woff2" as="font"'));
  c('U14 Nav data-mobile-state="closed"', body.includes('data-mobile-state="closed"'));
  c('U15 Footer "175 PR335" rendered', body.includes('175 PR335'));
  return checks;
}

function schemaChecks(route, html) {
  const head = html.split('</head>')[0];
  const checks = [];
  const c = (l, p) => checks.push({ label: l, pass: !!p });

  const ldScripts = [...head.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)]
    .map(m => m[1].trim());
  c(`S0 ${route.schemas.length} ld+json schema(s) (got ${ldScripts.length})`,
    ldScripts.length === route.schemas.length);

  for (let i = 0; i < route.schemas.length; i++) {
    const expected = route.schemas[i];
    const raw = ldScripts[i] || '';
    let obj;
    try { obj = JSON.parse(raw); } catch { obj = null; }
    const reBytes = obj ? Buffer.byteLength(JSON.stringify(obj)) : -1;
    const topType = obj ? (Array.isArray(obj['@type']) ? obj['@type'].join(',') : obj['@type']) : '?';
    c(`S${i+1} schema #${i+1} @type=${expected.key}, bytes=${expected.bytes} (got ${topType}/${reBytes})`,
      topType === expected.key && reBytes === expected.bytes);
  }
  return checks;
}

function dataRevealCheck(route, html) {
  const body = html.split('</head>')[1];
  const re = /<[a-z][a-z0-9]*[^>]*\sdata-reveal(?:\s|=|>)/gi;
  const got = (body.match(re) || []).length;
  return [{
    label: `R0 ${route.dataRevealCount} data-reveal divs in body (got ${got})`,
    pass: got === route.dataRevealCount,
  }];
}

function runRoute(route) {
  if (!existsSync(route.file)) {
    return { route: route.path, results: [{ label: 'file exists', pass: false }] };
  }
  const html = readFileSync(route.file, 'utf-8');
  const head = html.split('</head>')[0];
  const body = html.split('</head>')[1];

  const results = [
    ...universalChecks(route, html),
    ...schemaChecks(route, html),
    ...dataRevealCheck(route, html),
  ];

  if (route.custom) {
    const customResults = route.custom(body, head, helpers);
    for (const r of customResults) {
      if (Array.isArray(r)) {
        const [label, val] = r;
        const pass = typeof val === 'function' ? !!val() : !!val;
        results.push({ label, pass });
      } else {
        results.push(r);
      }
    }
  }
  return { route: route.path, results };
}

const allRouteResults = [];
let firstFailure = null;

for (const r of ROUTES) {
  const res = runRoute(r);
  allRouteResults.push(res);
  const fails = res.results.filter(x => !x.pass);
  if (fails.length > 0 && !firstFailure) firstFailure = res;
}

console.log('\n=== Phase 1 — Hardened Verifier (route × check matrix) ===\n');
for (const rr of allRouteResults) {
  const fails = rr.results.filter(x => !x.pass);
  const passes = rr.results.length - fails.length;
  const status = fails.length === 0 ? '✓ PASS' : '✗ FAIL';
  console.log(`${status}  ${rr.route.padEnd(40)}  ${passes}/${rr.results.length}`);
  for (const fail of fails) {
    console.log(`         FAIL: ${fail.label}`);
  }
}

const totalChecks = allRouteResults.reduce((acc, rr) => acc + rr.results.length, 0);
const totalPasses = allRouteResults.reduce((acc, rr) => acc + rr.results.filter(x => x.pass).length, 0);
const routePass = allRouteResults.filter(rr => rr.results.every(x => x.pass)).length;

console.log(`\n=== Routes: ${routePass}/${ROUTES.length} PASS  |  Checks: ${totalPasses}/${totalChecks} PASS ===`);

if (firstFailure) {
  console.log(`\nFirst failing route: ${firstFailure.route}`);
  console.log('STOP — fix Phase 1 failures before proceeding to Phase 2 (Lighthouse).');
  process.exit(1);
}
console.log('\nPhase 1 PASS — ready for Phase 2 (Lighthouse).');
process.exit(0);
