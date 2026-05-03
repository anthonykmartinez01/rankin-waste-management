# SSG Migration — Baseline Inventory

**Captured:** 2026-05-02
**Branch:** `master` (pre-migration)
**Live commit:** `e691887`
**Live deploy ID:** `69f6b57dff3bc38559af771a` (production)

This document captures the canonical state of the site BEFORE migrating from CSR to SSG with `vite-react-ssg`. Every value here must be preserved post-migration.

---

## 1. Routes (from `src/App.jsx`, lines 1075–1087)

13 routes total.

| # | Path | Component | In sitemap? |
|---|---|---|---|
| 1 | `/` | HomePage (in `App.jsx`) | ✅ |
| 2 | `/residential` | `pages/Residential.jsx` | ✅ |
| 3 | `/trash-trailer-rentals` | `pages/TrashTrailerRentals.jsx` | ✅ |
| 4 | `/about-us` | `pages/AboutUs.jsx` | ✅ |
| 5 | `/contact-us` | `pages/ContactUs.jsx` | ✅ |
| 6 | `/reviews` | `pages/Reviews.jsx` | ✅ |
| 7 | `/terms-of-service` | `pages/TermsOfService.jsx` | ❌ (intentional) |
| 8 | `/privacy-policy` | `pages/PrivacyPolicy.jsx` | ❌ (intentional) |
| 9 | `/service-areas/axtell` | `pages/Axtell.jsx` | ✅ |
| 10 | `/waste-management-service-hubbard` | `pages/Hubbard.jsx` | ✅ |
| 11 | `/junk-removal-service-hubbard` | `pages/JunkRemovalHubbard.jsx` | ✅ |
| 12 | `/dumpster-rental-service-hubbard` | `pages/DumpsterRentalHubbard.jsx` | ✅ |
| 13 | `/garbage-collection-service-hubbard` | `pages/GarbageCollectionHubbard.jsx` | ✅ |

**Routing setup:** `BrowserRouter` from `react-router-dom@7.13.2`, all non-home routes loaded via `React.lazy` + `Suspense`.

---

## 2. Per-route head & content inventory

The homepage's head tags are baked into `index.html` (static). Every other route's head tags are injected client-side via `PageHead` (the component in `src/shared.jsx:86-124`) which mutates `document.title`, `document.head` via `useEffect`. Canonical is computed from `window.location.origin + window.location.pathname` (i.e., the URL the user is on).

### Route 1: `/` (HomePage)
- **H1:** `Reliable Trash Pickup & Waste Management Service` (from `App.jsx:251-253`)
- **Title:** `Trash Pickup & Waste Management in Hubbard, TX | Rankin Waste` *(from static `index.html`)*
- **Description:** `Reliable trash pickup and waste management service in Hubbard, TX and surrounding rural communities. Family-owned, 250+ five-star reviews, no contracts. Call (254) 205-6125.`
- **Canonical:** `https://rankinwaste.com/`
- **JSON-LD schema in static HTML:** `LocalBusiness`, `FAQPage` (with `Question`/`Answer`), `OfferCatalog`/`Offer`/`Service`, `PostalAddress`, `GeoCoordinates`, `City` (38 `@type` declarations total)

### Route 2: `/residential`
- **H1:** `Residential` (from `<InnerHero title="Residential" />`)
- **Title:** `Residential - Rankin Waste Management`
- **Description:** `Dependable weekly residential trash pickup in Hubbard, Axtell, Dawson, Malone, and surrounding rural TX communities. Affordable rates, reliable service.`
- **Canonical:** `https://rankinwaste.com/residential`
- **Schema:** none

### Route 3: `/trash-trailer-rentals`
- **H1:** `Trash Trailer Rentals`
- **Title:** `Trash Trailer Rentals - Rankin Waste Management`
- **Description:** `Affordable trash trailer rentals in Hubbard, TX and surrounding areas. 16-foot trailers with high sides, flexible scheduling. We drop it off, you load it, we haul it away.`
- **Canonical:** `https://rankinwaste.com/trash-trailer-rentals`
- **Schema:** none

### Route 4: `/about-us`
- **H1:** `About Us`
- **Title:** `About Us - Rankin Waste Management`
- **Description:** `Rankin Waste Management is a family-owned trash service in Hubbard, TX. Owned and operated by Tommy Rankin, serving rural communities with reliable, affordable service.`
- **Canonical:** `https://rankinwaste.com/about-us`
- **Schema:** none

### Route 5: `/contact-us`
- **H1:** `New Service Request`
- **Title:** `Contact us - Rankin Waste Management`
- **Description:** `Request trash pickup service from Rankin Waste Management. Serving Hubbard, TX and surrounding communities. Call (254) 205-6125 or submit a service request.`
- **Canonical:** `https://rankinwaste.com/contact-us`
- **Schema:** none
- **Note:** embeds external GHL form iframe (`go.kailenflow.com`)

### Route 6: `/reviews`
- **H1:** `Waste Management Service Reviews in Hubbard, TX`
- **Title:** `Reviews - Waste Management Service in Hubbard, TX | Rankin Waste Management`
- **Description:** `Read reviews from Rankin Waste Management customers. See why families in Hubbard, TX and surrounding communities trust us for reliable waste management service.`
- **Canonical:** `https://rankinwaste.com/reviews`
- **Schema:** none (review carousel renders client-side via `ReviewWidget.jsx`)

### Route 7: `/terms-of-service`
- **H1:** `Terms of Service`
- **Title:** `Terms of Service - Rankin Waste Management`
- **Description:** `Terms and Conditions for Rankin Waste Management, including SMS messaging consent, communication policies, and service terms.`
- **Canonical:** `https://rankinwaste.com/terms-of-service`
- **Schema:** none

### Route 8: `/privacy-policy`
- **H1:** `Privacy Policy`
- **Title:** `Privacy Policy - Rankin Waste Management`
- **Description:** `Privacy Policy for Rankin Waste Management describing how we collect, use, and protect your personal information and SMS communications.`
- **Canonical:** `https://rankinwaste.com/privacy-policy`
- **Schema:** none

### Route 9: `/service-areas/axtell`
- **H1:** `Waste Management Service in Axtell, TX`
- **Title:** `Waste Management Service in Axtell, TX | Rankin Waste Management`
- **Description:** `Reliable waste management in Axtell. Family-owned with 250+ five-star reviews. Free estimates, 24-hour response. Call (254) 205-6125.`
- **Canonical:** `https://rankinwaste.com/service-areas/axtell`
- **Schema:** `Organization` (with nested `PostalAddress` + `City`)
- **⚠ Special:** uses `react-leaflet` for an embedded service-area map. Leaflet imports `window` at module load → must be wrapped in client-only render for SSG.

### Route 10: `/waste-management-service-hubbard`
- **H1:** `Waste Management Service in Hubbard`
- **Title:** `Waste Management Service Hubbard TX | Rankin Waste Management`
- **Description:** `Professional waste management service in Hubbard, TX. Weekly residential pickup, curbside collection, and rural trash service. Reliable garbage removal for homes and businesses.`
- **Canonical:** `https://rankinwaste.com/waste-management-service-hubbard`
- **Schema:** `Organization` (with nested `PostalAddress` + `City`)

### Route 11: `/junk-removal-service-hubbard`
- **H1:** `Junk Removal Service in Hubbard`
- **Title:** `Junk Removal Service Hubbard TX | Rankin Waste Management`
- **Description:** `Professional junk removal service in Hubbard, TX. We handle furniture, appliances, cleanouts and construction debris. Same-day pickup with upfront quotes from Rankin Waste Management.`
- **Canonical:** `https://rankinwaste.com/junk-removal-service-hubbard`
- **Schema:** `Service` (with nested `Organization`/`PostalAddress`/`City`) + `BreadcrumbList` (2 `ListItem`s)
- **OG image override:** `/junk-removal-trailer.webp`

### Route 12: `/dumpster-rental-service-hubbard`
- **H1:** `Dumpster Rental Service in Hubbard`
- **Title:** `Dumpster Rental Service Hubbard TX | Rankin Waste Management`
- **Description:** `Professional dumpster rental service in Hubbard, TX. Residential cleanouts, commercial waste, and construction roll-off containers. Local delivery and pickup by Rankin Waste Management.`
- **Canonical:** `https://rankinwaste.com/dumpster-rental-service-hubbard`
- **Schema:** `Service` (with nested `Organization`/`PostalAddress`/`City`) + `BreadcrumbList` (2 `ListItem`s)

### Route 13: `/garbage-collection-service-hubbard`
- **H1:** `Garbage Collection Service in Hubbard`
- **Title:** `Garbage Collection Service Hubbard TX | Rankin Waste Management`
- **Description:** `Professional garbage collection service in Hubbard, TX. Weekly pickup, rural service, and bulk trash removal. Reliable waste management for homes and businesses.`
- **Canonical:** `https://rankinwaste.com/garbage-collection-service-hubbard`
- **Schema:** `Service` (with nested `Organization`/`PostalAddress`/`City`) + `BreadcrumbList` (2 `ListItem`s)

---

## 3. Sitemap URL list (current `public/sitemap.xml`)

11 URLs, all 11 also valid routes in the router. The 2 router routes not in sitemap (`/terms-of-service`, `/privacy-policy`) are intentionally excluded — standard SEO practice for legal boilerplate.

```
https://rankinwaste.com/                                          priority=1.0  changefreq=weekly
https://rankinwaste.com/residential                               priority=0.8  changefreq=weekly
https://rankinwaste.com/trash-trailer-rentals                     priority=0.8  changefreq=weekly
https://rankinwaste.com/about-us                                  priority=0.6  changefreq=monthly
https://rankinwaste.com/contact-us                                priority=0.6  changefreq=monthly
https://rankinwaste.com/reviews                                   priority=0.7  changefreq=weekly
https://rankinwaste.com/service-areas/axtell                      priority=0.8  changefreq=monthly
https://rankinwaste.com/waste-management-service-hubbard          priority=0.9  changefreq=monthly
https://rankinwaste.com/junk-removal-service-hubbard              priority=0.9  changefreq=monthly
https://rankinwaste.com/dumpster-rental-service-hubbard           priority=0.9  changefreq=monthly
https://rankinwaste.com/garbage-collection-service-hubbard        priority=0.9  changefreq=monthly
```

All `<lastmod>` values: `2026-04-30`. After migration the URL list and `<priority>`/`<changefreq>` must remain identical.

---

## 4. Build output (current CSR build)

Build command: `vite build`
Output dir: `dist/`

| Metric | Value |
|---|---|
| Total `dist/` size | **2.6 MB** |
| Total file count | **52 files** |
| Number of HTML files | **1** (`dist/index.html` — the SPA shell) |
| Main JS bundle | `dist/assets/index-BvHgNPDx.js` — 278.47 kB / **85.85 kB gzip** |
| CSS bundle | `dist/assets/index-CQ33xw3J.css` |
| Per-page chunks (lazy) | ~1.7–8.3 kB gzip each |

**Post-migration expectation:** total file count will increase substantially because each route gets its own `<route>/index.html`. JS/CSS bundle sizes should remain within ~10 % of these numbers; if the main bundle grows materially, that's a regression to investigate.

---

## 5. Lighthouse baseline (mobile)

The PageSpeed Insights anonymous API quota is exhausted today. **You'll capture these manually via PSI web UI, screenshot, and we'll re-run the same URLs post-migration for the comparison.**

Click each link below, click "Mobile" (default), and screenshot the four scores (Performance / Accessibility / Best Practices / SEO):

1. https://pagespeed.web.dev/analysis?url=https%3A%2F%2Frankinwaste.com%2F&form_factor=mobile
2. https://pagespeed.web.dev/analysis?url=https%3A%2F%2Frankinwaste.com%2Fwaste-management-service-hubbard&form_factor=mobile
3. https://pagespeed.web.dev/analysis?url=https%3A%2F%2Frankinwaste.com%2Fgarbage-collection-service-hubbard&form_factor=mobile

Paste the scores into the table below and commit this file. We'll re-run the same 3 URLs post-deploy for the comparison.

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/` | __ | __ | __ | __ |
| `/waste-management-service-hubbard` | __ | __ | __ | __ |
| `/garbage-collection-service-hubbard` | __ | __ | __ | __ |

**Hard constraint:** post-migration scores on the same 3 pages must be ≥ these baselines.

---

## 5b. Per-route schema breakdown (consolidated)

Source of truth for what schema must remain present and identical post-migration. All schemas listed are currently authored as `<script type="application/ld+json">` in JSX or in `index.html` — none are dynamically generated.

| Route | Schemas present | Nested types |
|---|---|---|
| `/` | `LocalBusiness`, `FAQPage`, `OfferCatalog` (with `Offer` × 3 wrapping `Service`), `PostalAddress`, `GeoCoordinates`, `City`, `Question`/`Answer` (multiple) | All declared in `index.html` static head — total of 38 `@type` declarations |
| `/residential` | (none) | — |
| `/trash-trailer-rentals` | (none) | — |
| `/about-us` | (none) | — |
| `/contact-us` | (none) | — |
| `/reviews` | (none) | — |
| `/terms-of-service` | (none) | — |
| `/privacy-policy` | (none) | — |
| `/service-areas/axtell` | `Organization` | `PostalAddress`, `City` (Axtell, TX) |
| `/waste-management-service-hubbard` | `Organization` | `PostalAddress`, `City` (Hubbard, TX) |
| `/junk-removal-service-hubbard` | `Service`, `BreadcrumbList` | `Organization` → `PostalAddress` → `City`; `BreadcrumbList` has 2 `ListItem` |
| `/dumpster-rental-service-hubbard` | `Service`, `BreadcrumbList` | `Organization` → `PostalAddress` → `City`; `BreadcrumbList` has 2 `ListItem` |
| `/garbage-collection-service-hubbard` | `Service`, `BreadcrumbList` | `Organization` → `PostalAddress` → `City`; `BreadcrumbList` has 2 `ListItem` |

**Migration rule:** all 13 rows must be identical post-migration. The only behavioral change is that schemas currently injected into the DOM via JSX (which crawlers without JS don't see) will appear in the raw HTML output. No schema content is edited, added, or removed.

---

## 5c. Canonical URL inventory

| Source | Mechanism | Resolves to (in production) |
|---|---|---|
| `/` (homepage) | Hardcoded in `index.html` line 8: `<link rel="canonical" href="https://rankinwaste.com/" />` | ✅ Production domain |
| All other 12 routes | Computed at runtime in `PageHead` (`shared.jsx:88`): `window.location.origin + window.location.pathname` | ✅ Production domain (when served from `rankinwaste.com`); would resolve to `http://localhost:5173/...` on local dev |

**Confirmed:** no canonicals in source code reference `localhost`, IP addresses, or relative paths. Production canonicals are correct today.

**Migration implication:** post-migration the canonical for inner pages must be set to the absolute production URL during prerender (i.e., resolved at build time, not at runtime). This means the prerender config will need a `siteUrl: 'https://rankinwaste.com'` constant; `PageHead` will use that to construct canonical URLs deterministically. No URL value changes — same canonical strings as today.

---

## 5d. Open Graph & Twitter Card inventory

### Static (in `index.html`, applies to ALL routes via the SPA shell)

| Tag | Value |
|---|---|
| `og:title` | `Trash Pickup & Waste Management in Hubbard, TX | Rankin Waste` |
| `og:description` | (homepage description) |
| `og:url` | `https://rankinwaste.com/` |
| `og:type` | `website` |
| `og:locale` | `en_US` |
| `og:site_name` | `Rankin Waste Management` |
| `og:image` | `https://rankinwaste.com/truck-side.webp` |
| `og:image:alt` | `Rankin Waste Management truck serving Hubbard, TX` |
| `og:image:width` | `1600` |
| `og:image:height` | `1067` |
| `twitter:card` | `summary_large_image` |
| `twitter:title` | (homepage title) |
| `twitter:description` | (homepage description) |
| `twitter:image` | `https://rankinwaste.com/truck-side.webp` |
| `twitter:image:alt` | (homepage og:image:alt) |

### Per-route, set client-side by `PageHead` (`shared.jsx:108-119`)

`PageHead` overwrites these 9 tags after JS runs:
- `og:title`, `og:description`, `og:url`, `og:image`, `og:image:alt`
- `twitter:title`, `twitter:description`, `twitter:image`, `twitter:image:alt`

`PageHead` does **NOT** manage these tags — they remain at the `index.html` defaults on every route:
- `og:type`, `og:locale`, `og:site_name`, `og:image:width`, `og:image:height`, `twitter:card`

### Per-route image override

| Route | `image` prop passed to PageHead | Resolved og:image / twitter:image |
|---|---|---|
| `/junk-removal-service-hubbard` | `/junk-removal-trailer.webp` | `https://rankinwaste.com/junk-removal-trailer.webp` |
| All other 11 routes | (default) | `https://rankinwaste.com/truck-side.webp` |

**Migration rule:** post-migration, the same 9 tags `PageHead` currently overwrites must appear with the same per-page values in the raw HTML. The 6 tags `PageHead` doesn't manage today must continue to come from a shared source (the SSG layout's static head). No additions, no removals.

---

## 5e. robots.txt inventory

Source: `public/robots.txt` (static file, copied to `dist/robots.txt` at build).

```
User-agent: *
Allow: /

Sitemap: https://rankinwaste.com/sitemap.xml
```

- ✅ Sitemap reference uses production domain
- ✅ `/sitemap.xml` exists and is served correctly (verified earlier in this session)
- ✅ No disallow rules
- **Post-migration:** unchanged. The file is in `public/` and ships as-is.

---

## 5f. 404 status code behavior (current)

Tested with `curl -I https://rankinwaste.com/this-route-does-not-exist-test-404`:

| Probe | Result |
|---|---|
| HTTP status code | **`200 OK`** |
| Response body | The full `index.html` SPA shell (with the homepage's `<title>`) |
| React Router behavior | No `<Route path="*">` exists in `App.jsx` (lines 1075–1087), so unknown URLs render the layout (Header + Footer) with no content in the `<Routes>` slot |
| HTTP-level cause | `netlify.toml` redirect: `from = "/*" → to = "/index.html" status = 200` (catch-all SPA fallback) |

This is a **soft 404**: any URL the user mistypes returns a 200 status, which signals to crawlers that the page exists. Inventory only — addressed in `post-migration-improvements.md`.

---

## 6. Other items the migration must preserve

- `public/robots.txt` — unchanged
- `public/llms.txt` — unchanged
- `netlify.toml` — `[[redirects]] /* → /index.html status=200` will need adjustment (post-SSG, only routes that don't have a prerendered HTML should fall back to `index.html`; with vite-react-ssg, every advertised route gets its own `index.html` and the catch-all should only fire for unknown paths — i.e., 404s)
- All static assets in `public/` (favicons, images, fonts) — unchanged
- `src/components/ReviewWidget.jsx` — unchanged (renders client-side after hydration)
- Modal context, navbar, footer — unchanged
- Tailwind v4 config — unchanged
- `<script type="application/ld+json">` blocks in pages — must continue to render in JSX tree, will now appear in raw HTML (improvement)

---

## 7. Confirmed risks for the migration

1. **react-leaflet on `/service-areas/axtell`** — touches `window` at module load, will crash Node prerender. Solution: dynamic import + `ClientOnly` wrapper.
2. **`PageHead` mutates `document` directly via `useEffect`** — won't run during SSG, so head tags won't appear in raw HTML. Solution: rewrite to use `react-helmet-async` so head tags are collected and injected during prerender.
3. **`useReveal` hook calls `window.matchMedia`** — already inside `useEffect`, runs only post-hydration. No change needed.
4. **`window.scrollTo(0, 0)` in `PageHead`** — currently runs on every nav. Will need to be preserved post-migration (probably as a router scroll-restoration handler).
5. **Lazy-loaded routes** — vite-react-ssg supports lazy routes but the prerender list must list them. We'll explicitly enumerate all 13.

---

## 8. Open questions for you to confirm before Checkpoint 2

1. **Lighthouse scores** — please run the 3 PSI URLs above, paste the numbers into the table, and commit this file. (I cannot run them due to today's quota.)
2. **`/terms-of-service` and `/privacy-policy`** — confirm these should stay out of the sitemap post-migration (current behavior).
3. **`react-helmet-async`** — confirm it's OK to add this as a runtime dependency (~3 kB gzip). It's the standard React head manager and works with vite-react-ssg.
4. **Build command** — confirm Netlify won't break: currently `npm run build` runs `vite build`; after migration `npm run build` will run `vite-react-ssg build` (defined in `package.json`'s `scripts`). Netlify's deploy command stays `npm run build` — it doesn't care which command that script invokes.
