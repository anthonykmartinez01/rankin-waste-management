// src/data/announcement.ts
//
// Sitewide announcement banner (rendered at the top of the fixed header by
// src/components/AnnouncementBanner.astro, via Nav.astro).
//
// To turn the banner off everywhere, set `enabled: false`. Layout.astro reads
// the same flag to remove the matching top offset on <main>, so the page
// content moves back up automatically. No other file needs to change.
export const announcement = {
  enabled: true,
  href: '/weekly-residential-dumpster-service-hubbard',
  /** Shown from the `sm` breakpoint up. */
  label: 'Weekly Residential Dumpsters Available Now',
  /** Shown on phones, where the full label would wrap to two lines. */
  shortLabel: 'Weekly Residential Dumpsters',
  cta: 'Learn more',
} as const;
