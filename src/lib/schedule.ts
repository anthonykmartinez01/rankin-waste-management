// src/lib/schedule.ts
//
// THE ONE SOURCE OF TRUTH for scheduled (future-dated) pages, keyed by
// normalized URL path. To schedule a page you only ever do two things:
//   1. Add one line to `schedule` below.
//   2. Put the 3-line guard at the top of that page's frontmatter (see
//      scheduleGuard docs). That's the entire mechanism — nothing else.
//
// ─────────────────────────────────────────────────────────────────────────
// HOW IT WORKS — build-time gating for a static site
// ─────────────────────────────────────────────────────────────────────────
// rankinwaste.com is a static Astro site: every page is a file, there's no
// CMS and no database. "Publishing" is therefore decided at BUILD time, not
// per request. `isPublished()` compares a page's date to `Date.now()` *at the
// moment the site is built*. During a build:
//   • a future-dated page is redirected to /404 (scheduleGuard), and
//   • it is excluded from the generated sitemap (src/pages/sitemap.xml.ts).
// When a LATER build runs after the date has passed, the same page builds
// normally and goes live. Nothing about the page's own file changes — only
// the wall-clock at build time.
//
// => Because the Netlify site is NOT git-linked, a build only happens when
//    someone runs the deploy, or when the daily GitHub Action does. The
//    .github/workflows/scheduled-publish.yml cron is what actually turns
//    "schedule for tomorrow" into a live page without hand-deploying daily.
//
// ─────────────────────────────────────────────────────────────────────────
// DATES ARE UTC — read this carefully
// ─────────────────────────────────────────────────────────────────────────
// Dates are plain 'YYYY-MM-DD' strings. `new Date('2026-08-15')` parses to
// 2026-08-15T00:00:00Z — UTC midnight. So a page dated '2026-08-15' becomes
// eligible at 2026-08-15 00:00 UTC, which is:
//   • 2026-08-14  7:00 PM  Central Daylight Time (UTC-5, summer)
//   • 2026-08-14  6:00 PM  Central Standard Time (UTC-6, winter)
// It still only goes LIVE at the next build after that instant. The daily
// cron runs at 08:00 UTC (3:00 AM CDT / 2:00 AM CST), so in practice an
// Aug 15 page is deployed at ~3:00 AM Central on the morning of Aug 15.

export const schedule: Record<string, string> = {
  // Drip cadence: one new location page every other day (UTC), alphabetical.
  '/service-areas/axtell': '2026-07-13',
  '/service-areas/echols': '2026-07-15',
  '/service-areas/kirk': '2026-07-17',
  '/service-areas/leroy': '2026-07-19',
  '/service-areas/purdon': '2026-07-21',
  '/service-areas/watt': '2026-07-23',
  // Add scheduled pages here, e.g.:
  //   '/service-areas/some-town': '2026-08-15',
  // Keep past entries around — a past date behaves identically to no entry
  // (both mean "published"), and the history is useful.
};

/**
 * True if the page should be considered published.
 * Empty/undefined or unparseable dates fail OPEN (treated as published) so a
 * typo can never silently hide a live page.
 */
export function isPublished(date: string | undefined): boolean {
  if (!date) return true;
  const t = new Date(date).getTime();
  if (Number.isNaN(t)) return true;
  return t <= Date.now();
}

/**
 * Normalize a pathname to the registry key format: a leading slash, no
 * trailing slash, and no `/index.html` or `.html` suffix. Root stays '/'.
 * This is what makes an incoming request path line up with a `schedule` key
 * regardless of how the host presents the URL.
 */
export function normalizePath(pathname: string): string {
  let p = (pathname || '').trim();
  if (!p.startsWith('/')) p = '/' + p;
  p = p.replace(/index\.html$/i, '').replace(/\.html$/i, '');
  if (p.length > 1) p = p.replace(/\/+$/, ''); // strip trailing slash(es), keep root '/'
  return p === '' ? '/' : p;
}

/** True if `path` is in the registry AND its date has not passed yet. */
export function isScheduledFuture(path: string): boolean {
  const key = normalizePath(path);
  const date = schedule[key];
  return date !== undefined && !isPublished(date);
}

/** Minimal shape of the Astro global that scheduleGuard needs. */
interface ScheduleContext {
  url: URL;
  redirect: (path: string, status?: number) => Response;
}

/**
 * The guard every scheduled page calls. Put these three lines at the VERY TOP
 * of the page's frontmatter, before anything else runs:
 *
 *   import { scheduleGuard } from '../lib/schedule';   // adjust depth
 *   const guard = scheduleGuard(Astro);
 *   if (guard) return guard;
 *
 * Returns a redirect Response to /404 when the page is future-dated (hiding
 * its content and bouncing crawlers to the noindex 404 page); otherwise
 * returns null and the page renders normally.
 */
export function scheduleGuard(astro: ScheduleContext): Response | null {
  if (isScheduledFuture(astro.url.pathname)) {
    return astro.redirect('/404');
  }
  return null;
}
