// src/data/faqs.ts
// Single source of truth for visible FAQ Q/A on the homepage.
//
// IMPORTANT: items 3 and 5 use em-dash (U+2014) in body text. The
// FAQPage JSON-LD schema in src/pages/index.astro head fragment uses
// ASCII hyphen with spaces (' - ') for the same items, preserving the
// pre-existing pre-migration parity gap byte-identical. Logged as P3
// (FAQ-2) in post-migration-improvements.md to reconcile post-migration.
//
// Verbatim port from pre-migration src/App.jsx lines 135-144.

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  { q: 'What areas do you serve around Hubbard?', a: 'We serve Hubbard and surrounding communities across Hill, Navarro, Limestone, and McLennan Counties, including Axtell, Dawson, Malone, Mertens, Whitney, and other rural areas. If you\'re not sure we serve your area, call us directly at (254) 205-6125.' },
  { q: 'Do you require long-term contracts or have cancellation fees?', a: 'No contracts required and no cancellation fees ever. You\'re never locked in and can adjust or cancel service anytime without penalties.' },
  { q: 'What can I put out for pickup — do I need to sort anything?', a: 'No sorting required. Put out bags or cans with your household waste and we handle everything. Much simpler than most municipal programs.' },
  { q: 'How much does weekly trash pickup cost?', a: 'We offer flat-rate pricing with no fuel surcharges, environmental fees, or surprise charges. Call (254) 205-6125 for current rates in your area.' },
  { q: 'What happens if you miss my pickup day?', a: 'We personally guarantee pickup reliability, but if any issue occurs, you reach the owners directly who resolve problems immediately — no ticket queues or call center delays.' },
  { q: 'Do you offer bulk pickup for furniture and appliances?', a: 'Yes, we provide bulk pickup services for large items like furniture and appliances in addition to regular weekly waste pickup.' },
  { q: 'How do I schedule or cancel service?', a: 'Call us directly at (254) 205-6125 to speak with Tommy or Sydney Rankin, or book online at rankinwaste.com.' },
  { q: 'Are there extra fees for fuel or environmental charges?', a: 'No hidden fees ever. Our flat-rate pricing means you know exactly what you pay each month without surprise charges or annual increases.' },
];
