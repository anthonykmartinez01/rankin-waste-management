#!/usr/bin/env node
// Checkpoint 4 — raw HTML assertions against baseline.
// Reads dist/*.html, asserts H1/title/desc/canonical/schema/body/og/twitter.
// Outputs JSON to stdout (no JS execution; pure HTML parsing).

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://rankinwaste.com';

// Baseline values from migration-baseline.md, encoded literally.
const ROUTES = [
  {
    path: '/',
    file: 'dist/index.html',
    h1: 'Reliable Trash Pickup & Waste Management Service',
    title: 'Trash Pickup & Waste Management in Hubbard, TX | Rankin Waste',
    description: 'Reliable trash pickup and waste management service in Hubbard, TX and surrounding rural communities. Family-owned, 250+ five-star reviews, no contracts. Call (254) 205-6125.',
    canonical: 'https://rankinwaste.com/',
    schemaTypes: ['LocalBusiness', 'FAQPage', 'OfferCatalog', 'Offer', 'Service', 'PostalAddress', 'GeoCoordinates', 'City', 'Question', 'Answer'],
    bodySample: 'Locally Family-Owned',
  },
  {
    path: '/residential',
    file: 'dist/residential/index.html',
    h1: 'Residential',
    title: 'Residential - Rankin Waste Management',
    description: 'Dependable weekly residential trash pickup in Hubbard, Axtell, Dawson, Malone, and surrounding rural TX communities. Affordable rates, reliable service.',
    canonical: 'https://rankinwaste.com/residential',
    schemaTypes: [],
    bodySample: 'Residential',
  },
  {
    path: '/trash-trailer-rentals',
    file: 'dist/trash-trailer-rentals/index.html',
    h1: 'Trash Trailer Rentals',
    title: 'Trash Trailer Rentals - Rankin Waste Management',
    description: 'Affordable trash trailer rentals in Hubbard, TX and surrounding areas. 16-foot trailers with high sides, flexible scheduling. We drop it off, you load it, we haul it away.',
    canonical: 'https://rankinwaste.com/trash-trailer-rentals',
    schemaTypes: [],
    bodySample: 'Trash Trailer',
  },
  {
    path: '/about-us',
    file: 'dist/about-us/index.html',
    h1: 'About Us',
    title: 'About Us - Rankin Waste Management',
    description: 'Rankin Waste Management is a family-owned trash service in Hubbard, TX. Owned and operated by Tommy Rankin, serving rural communities with reliable, affordable service.',
    canonical: 'https://rankinwaste.com/about-us',
    schemaTypes: [],
    bodySample: 'About Us',
  },
  {
    path: '/contact-us',
    file: 'dist/contact-us/index.html',
    h1: 'New Service Request',
    title: 'Contact us - Rankin Waste Management',
    description: 'Request trash pickup service from Rankin Waste Management. Serving Hubbard, TX and surrounding communities. Call (254) 205-6125 or submit a service request.',
    canonical: 'https://rankinwaste.com/contact-us',
    schemaTypes: [],
    bodySample: 'New Service Request',
  },
  {
    path: '/reviews',
    file: 'dist/reviews/index.html',
    h1: 'Waste Management Service Reviews in Hubbard, TX',
    title: 'Reviews - Waste Management Service in Hubbard, TX | Rankin Waste Management',
    description: 'Read reviews from Rankin Waste Management customers. See why families in Hubbard, TX and surrounding communities trust us for reliable waste management service.',
    canonical: 'https://rankinwaste.com/reviews',
    schemaTypes: [],
    bodySample: 'Reviews',
  },
  {
    path: '/terms-of-service',
    file: 'dist/terms-of-service/index.html',
    h1: 'Terms of Service',
    title: 'Terms of Service - Rankin Waste Management',
    description: 'Terms and Conditions for Rankin Waste Management, including SMS messaging consent, communication policies, and service terms.',
    canonical: 'https://rankinwaste.com/terms-of-service',
    schemaTypes: [],
    bodySample: 'Terms',
  },
  {
    path: '/privacy-policy',
    file: 'dist/privacy-policy/index.html',
    h1: 'Privacy Policy',
    title: 'Privacy Policy - Rankin Waste Management',
    description: 'Privacy Policy for Rankin Waste Management describing how we collect, use, and protect your personal information and SMS communications.',
    canonical: 'https://rankinwaste.com/privacy-policy',
    schemaTypes: [],
    bodySample: 'Privacy',
  },
  {
    path: '/service-areas/axtell',
    file: 'dist/service-areas/axtell/index.html',
    h1: 'Waste Management Service in Axtell, TX',
    title: 'Waste Management Service in Axtell, TX | Rankin Waste Management',
    description: 'Reliable waste management in Axtell. Family-owned with 250+ five-star reviews. Free estimates, 24-hour response. Call (254) 205-6125.',
    canonical: 'https://rankinwaste.com/service-areas/axtell',
    schemaTypes: ['Organization', 'PostalAddress', 'City'],
    bodySample: 'Running a household or business in Axtell',
  },
  {
    path: '/waste-management-service-hubbard',
    file: 'dist/waste-management-service-hubbard/index.html',
    h1: 'Waste Management Service in Hubbard',
    title: 'Waste Management Service Hubbard TX | Rankin Waste Management',
    description: 'Professional waste management service in Hubbard, TX. Weekly residential pickup, curbside collection, and rural trash service. Reliable garbage removal for homes and businesses.',
    canonical: 'https://rankinwaste.com/waste-management-service-hubbard',
    schemaTypes: ['Organization', 'PostalAddress', 'City'],
    bodySample: 'In Hubbard, residents and businesses need reliable waste removal',
  },
  {
    path: '/junk-removal-service-hubbard',
    file: 'dist/junk-removal-service-hubbard/index.html',
    h1: 'Junk Removal Service in Hubbard',
    title: 'Junk Removal Service Hubbard TX | Rankin Waste Management',
    description: 'Professional junk removal service in Hubbard, TX. We handle furniture, appliances, cleanouts and construction debris. Same-day pickup with upfront quotes from Rankin Waste Management.',
    canonical: 'https://rankinwaste.com/junk-removal-service-hubbard',
    schemaTypes: ['Service', 'BreadcrumbList', 'ListItem', 'Organization', 'PostalAddress', 'City'],
    bodySample: 'Junk Removal',
  },
  {
    path: '/dumpster-rental-service-hubbard',
    file: 'dist/dumpster-rental-service-hubbard/index.html',
    h1: 'Dumpster Rental Service in Hubbard',
    title: 'Dumpster Rental Service Hubbard TX | Rankin Waste Management',
    description: 'Professional dumpster rental service in Hubbard, TX. Residential cleanouts, commercial waste, and construction roll-off containers. Local delivery and pickup by Rankin Waste Management.',
    canonical: 'https://rankinwaste.com/dumpster-rental-service-hubbard',
    schemaTypes: ['Service', 'BreadcrumbList', 'ListItem', 'Organization', 'PostalAddress', 'City'],
    bodySample: 'Dumpster Rental',
  },
  {
    path: '/garbage-collection-service-hubbard',
    file: 'dist/garbage-collection-service-hubbard/index.html',
    h1: 'Garbage Collection Service in Hubbard',
    title: 'Garbage Collection Service Hubbard TX | Rankin Waste Management',
    description: 'Professional garbage collection service in Hubbard, TX. Weekly pickup, rural service, and bulk trash removal. Reliable waste management for homes and businesses.',
    canonical: 'https://rankinwaste.com/garbage-collection-service-hubbard',
    schemaTypes: ['Service', 'BreadcrumbList', 'ListItem', 'Organization', 'PostalAddress', 'City'],
    bodySample: 'In Hubbard, reliable waste removal keeps homes and businesses clean',
  },
];

const UNIVERSAL_OG = [
  { tag: 'og:type', value: 'website' },
  { tag: 'og:locale', value: 'en_US' },
  { tag: 'og:site_name', value: 'Rankin Waste Management' },
  { tag: 'og:image:width', value: '1600' },
  { tag: 'og:image:height', value: '1067' },
  { tag: 'twitter:card', value: 'summary_large_image' },
];

// HTML-decode &amp; etc. for comparison purposes.
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const extractH1 = (html) => {
  // First <h1>...</h1> match, strip nested tags, trim.
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!m) return null;
  return decode(m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
};

const extractTitle = (html) => {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/);
  if (!m) return null;
  return decode(m[1].trim());
};

const extractMetaContent = (html, attr, name) => {
  const re = new RegExp(`<meta[^>]*${attr}=["']${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*content=["']([^"']*)["']`, 'i');
  const m = html.match(re);
  if (m) return decode(m[1]);
  // Try other attribute order
  const re2 = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*${attr}=["']${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i');
  const m2 = html.match(re2);
  return m2 ? decode(m2[1]) : null;
};

const extractCanonical = (html) => {
  const m = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  if (m) return m[1];
  const m2 = html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  return m2 ? m2[1] : null;
};

const extractSchemaTypes = (html) => {
  const matches = [...html.matchAll(/"@type"\s*:\s*"([A-Za-z]+)"/g)];
  return [...new Set(matches.map(m => m[1]))];
};

const results = [];
const titles = new Set();
const descriptions = new Set();
const dupTitles = new Set();
const dupDescriptions = new Set();

for (const r of ROUTES) {
  const result = {
    path: r.path,
    file: r.file,
    h1: { ok: false, found: null, expected: r.h1 },
    title: { ok: false, found: null, expected: r.title, unique: null },
    description: { ok: false, found: null, expected: r.description, unique: null },
    canonical: { ok: false, found: null, expected: r.canonical },
    schema: { ok: false, missing: [], expected: r.schemaTypes, found: [] },
    body: { ok: false, sample: r.bodySample },
    universalOG: { ok: false, missing: [] },
  };

  if (!existsSync(r.file)) {
    result.error = 'FILE NOT FOUND';
    results.push(result);
    continue;
  }

  const html = readFileSync(r.file, 'utf8');

  // CRITICAL: head-scoped extraction. The previous version of this verifier
  // matched against the whole document, which let head tags emitted into
  // <body> by a broken helmet integration pass as if they were in <head>.
  // Lighthouse and crawlers only read <head>; matches outside it are invisible
  // to them.
  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/);
  const head = headMatch ? headMatch[1] : '';
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  const body = bodyMatch ? bodyMatch[1] : '';

  if (!head) {
    result.error = 'NO <head> ELEMENT';
    results.push(result);
    continue;
  }

  // H1 — must be in body
  const h1 = extractH1(body);
  result.h1.found = h1;
  result.h1.ok = h1 === r.h1;

  // Title — MUST be in <head>
  const title = extractTitle(head);
  result.title.found = title;
  result.title.ok = title === r.title;
  if (title) {
    if (titles.has(title)) dupTitles.add(title);
    titles.add(title);
  }

  // Description — MUST be in <head>
  const desc = extractMetaContent(head, 'name', 'description');
  result.description.found = desc;
  result.description.ok = desc === r.description;
  if (desc) {
    if (descriptions.has(desc)) dupDescriptions.add(desc);
    descriptions.add(desc);
  }

  // Canonical — MUST be in <head>
  const canonical = extractCanonical(head);
  result.canonical.found = canonical;
  result.canonical.ok = canonical === r.canonical;

  // Schema — JSON-LD scripts can be in <head> or <body>; both are crawler-visible.
  // Use whole document for schema discovery.
  const types = extractSchemaTypes(html);
  result.schema.found = types;
  result.schema.missing = r.schemaTypes.filter(t => !types.includes(t));
  result.schema.ok = result.schema.missing.length === 0;

  // Body content — must be in body
  result.body.ok = body.includes(r.bodySample);

  // Universal OG/Twitter — MUST be in <head>
  const ogResults = UNIVERSAL_OG.map(({ tag, value }) => {
    const attr = tag.startsWith('og:') ? 'property' : 'name';
    const found = extractMetaContent(head, attr, tag);
    return { tag, value, found, ok: found === value };
  });
  result.universalOG.missing = ogResults.filter(r => !r.ok).map(r => `${r.tag}=${r.value} (found ${r.found || 'MISSING'})`);
  result.universalOG.ok = result.universalOG.missing.length === 0;

  // Cross-check: warn if any of these head tags ALSO appear in body (= helmet emission bug)
  const bodyTitle = extractTitle(body);
  const bodyDesc = extractMetaContent(body, 'name', 'description');
  const bodyCanonical = extractCanonical(body);
  result.headBleed = {
    titleInBody: !!bodyTitle,
    descInBody: !!bodyDesc,
    canonicalInBody: !!bodyCanonical,
  };

  results.push(result);
}

// Mark unique flags now that we know dupes
for (const r of results) {
  if (r.title.found) r.title.unique = !dupTitles.has(r.title.found);
  if (r.description.found) r.description.unique = !dupDescriptions.has(r.description.found);
}

// Sitemap parity
const sitemapDist = existsSync('dist/sitemap.xml') ? readFileSync('dist/sitemap.xml', 'utf8') : null;
const sitemapPublic = existsSync('public/sitemap.xml') ? readFileSync('public/sitemap.xml', 'utf8') : null;
const sitemapMatch = sitemapDist === sitemapPublic && sitemapDist !== null;

const summary = {
  results,
  duplicateTitles: [...dupTitles],
  duplicateDescriptions: [...dupDescriptions],
  sitemap: { match: sitemapMatch, distExists: !!sitemapDist },
};

console.log(JSON.stringify(summary, null, 2));
