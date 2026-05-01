# Rankin Waste Management — Project Context

Live site: https://rankinwaste.com
Repo: github.com/anthonykmartinez01/rankin-waste-management
Client: Family-owned waste management business in Hubbard, TX (Hill County). Owners: Tommy and Sydney.

## Stack

- **React 19** + **Vite 8** (NOT Astro — different from Anthony's other client templates)
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **react-router-dom v7** (client-side routing, `BrowserRouter`)
- **react-leaflet** for service-area maps
- Hosting: Netlify (`netlify.toml` present, `_redirects` configured)
- No backend — fully static SPA

## Key Files

- `src/App.jsx` — routes, homepage, navbar, footer, modal context, all top-level components inline. Single-file kitchen sink (~1000+ lines). Lazy-loads page components.
- `src/shared.jsx` — exported constants (`PHONE`, `PHONE_LINK`), reusable hooks (`useReveal`), shared icons. Import shared bits from here.
- `src/pages/*.jsx` — one file per route. All lazy-loaded in App.jsx.
- `src/components/ReviewWidget.jsx` — review carousel
- `public/sitemap.xml` — manually maintained, must add new routes here
- `public/rw-logo.webp` — brand logo

## Business Constants (single source of truth: `src/shared.jsx`)

- Phone: `(254) 205-6125` → tel link `+12542056125`
- Domain: `rankinwaste.com`
- Owners: Tommy and Sydney (mention by name in copy — that's a brand differentiator vs. "big national haulers")

## Routes (current)

```
/                                          → HomePage (in App.jsx)
/residential                               → Residential.jsx
/trash-trailer-rentals                     → TrashTrailerRentals.jsx
/about-us                                  → AboutUs.jsx
/contact-us                                → ContactUs.jsx
/reviews                                   → Reviews.jsx
/terms-of-service                          → TermsOfService.jsx
/privacy-policy                            → PrivacyPolicy.jsx
/service-areas/axtell                      → Axtell.jsx
/waste-management-service-hubbard          → Hubbard.jsx        (parent)
/junk-removal-service-hubbard              → JunkRemovalHubbard.jsx
/dumpster-rental-service-hubbard           → DumpsterRentalHubbard.jsx
/garbage-collection-service-hubbard        → GarbageCollectionHubbard.jsx
```

## Design System

- Dark theme; `bg-dark-elevated` for sections
- Brand accent: `orange-500` / `orange-600` hover; `text-orange-300` for hover states
- Star rating color: `text-star`
- Body copy: `text-text-muted`
- Primary CTA pattern: orange pill button with PhoneIcon + "Call (254) 205-6125 to Get Started"
- Section headers use `useReveal()` for scroll-fade-in
- Min tap target: `min-h-[44px]` on CTAs

## Established Patterns

### Adding a new Hubbard service page
1. Create `src/pages/<Service>Hubbard.jsx` (copy structure from `JunkRemovalHubbard.jsx`)
2. Lazy import + add `<Route>` in `src/App.jsx`
3. Add internal link from homepage Services section in App.jsx (the `<Link to="/...-service-hubbard">Learn more...</Link>` block)
4. Add entry to `public/sitemap.xml`
5. Per-page SEO: canonical, og:url, og:title, og:description, og:image, breadcrumb schema
6. Mobile-optimize images (sharpened, WebP)

### Per-page SEO checklist
- Set `<title>`, `<meta description>` via head tags in the page component
- Canonical URL must match the route exactly
- og:image should be page-specific where possible (not just global)
- Include breadcrumb schema on inner pages

## Recent Activity (most recent first)

- Add internal link homepage → /garbage-collection-service-hubbard
- Add Garbage Collection Service Hubbard page
- Add internal link homepage → /dumpster-rental-service-hubbard
- Publish Dumpster Rental Service Hubbard page
- Restore homepage FAQ section + FAQPage schema (was briefly removed)
- Junk Removal Hubbard SEO — per-page og:image + breadcrumb schema
- Add Junk Removal Service Hubbard page
- Hubbard service area page added at `/waste-management-service-hubbard`

## Uncommitted Changes

- `public/sitemap.xml` — modified (likely new Hubbard route entries). Verify and commit.

## Likely Next Steps

- Confirm sitemap.xml changes are complete and commit
- Continue Hubbard sub-page pattern for any remaining services (e.g., commercial, construction debris)
- Possibly replicate Hubbard pattern for other service areas (Axtell already exists; more cities may follow)

## Gotchas / Conventions

- Don't switch to Astro — this is React/Vite by design
- Phone number lives in `src/shared.jsx` only — never hardcode in page components, always import `PHONE` and `PHONE_LINK`
- Sitemap is manual, NOT auto-generated — every new route needs a manual entry
- Owners want personal-touch copy: emphasize Tommy + Sydney directly answering calls vs. corporate dispatch
- Target audience: rural Hill County, TX residents
- The site brands the locally-owned advantage hard — keep that voice in any new copy

## Memory transferred from prior session

The prior Claude Code session that built most of this crashed due to image-related context bloat. Session title was "RANKIN WASTE WEBSITE." If you need transcript context, the session is at `~/.claude/projects/...` but `search_session_transcripts` requires interactive mode.
