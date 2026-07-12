// src/pages/sitemap.xml.ts
//
// Schedule-aware sitemap. Replaces the old hand-maintained public/sitemap.xml
// so that future-dated pages (see src/lib/schedule.ts) are automatically
// EXCLUDED until their publish date passes — a hidden page must never show up
// in search-engine discovery. Prerendered at build time (static output), so
// the exclusion is re-evaluated on every build/deploy, exactly like the page
// guard.
//
// Still a manual route list, on purpose — same convention as before, just in
// code now. When you add a new route, add it here (unless it's a utility page
// you want kept out of the index, like /404).
import type { APIRoute } from 'astro';
import { isScheduledFuture } from '../lib/schedule';

export const prerender = true;

const SITE = 'https://rankinwaste.com';

interface SitemapEntry {
  path: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

// Indexable, canonical routes only. Utility pages (/404, terms, privacy) are
// intentionally omitted.
const ROUTES: SitemapEntry[] = [
  { path: '/', lastmod: '2026-05-03', changefreq: 'weekly', priority: '1.0' },
  { path: '/residential', lastmod: '2026-05-03', changefreq: 'weekly', priority: '0.8' },
  { path: '/trash-trailer-rentals', lastmod: '2026-05-03', changefreq: 'weekly', priority: '0.8' },
  { path: '/about-us', lastmod: '2026-05-03', changefreq: 'monthly', priority: '0.6' },
  { path: '/contact-us', lastmod: '2026-05-03', changefreq: 'monthly', priority: '0.6' },
  { path: '/reviews', lastmod: '2026-05-03', changefreq: 'weekly', priority: '0.7' },
  { path: '/service-areas', lastmod: '2026-06-15', changefreq: 'monthly', priority: '0.8' },
  { path: '/service-areas/axtell', lastmod: '2026-05-03', changefreq: 'monthly', priority: '0.8' },
  { path: '/service-areas/penelope', lastmod: '2026-07-12', changefreq: 'monthly', priority: '0.8' },
  { path: '/waste-management-service-hubbard', lastmod: '2026-05-03', changefreq: 'monthly', priority: '0.9' },
  { path: '/junk-removal-service-hubbard', lastmod: '2026-05-03', changefreq: 'monthly', priority: '0.9' },
  { path: '/dumpster-rental-service-hubbard', lastmod: '2026-05-03', changefreq: 'monthly', priority: '0.9' },
  { path: '/garbage-collection-service-hubbard', lastmod: '2026-05-03', changefreq: 'monthly', priority: '0.9' },
];

export const GET: APIRoute = () => {
  const urls = ROUTES
    // Drop any page whose publish date hasn't passed yet.
    .filter((r) => !isScheduledFuture(r.path))
    .map(
      (r) =>
        `  <url>\n    <loc>${SITE}${r.path}</loc>\n    <lastmod>${r.lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
