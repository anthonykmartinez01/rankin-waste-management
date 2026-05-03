# Post-Migration Improvements (DEFERRED)

These were spotted during the SSG migration baseline inventory but are **out of scope** for the migration itself. The migration is delivery-layer only — same head, same content, same schema, just rendered server-side. Each item below should be evaluated and addressed in a separate change after the migration is verified stable.

Last updated: 2026-05-02 (Checkpoint 1 expanded)

---

## P1 — Accessibility

### A1. Mobile menu lacks accessibility primitives
- Mobile navigation drawer (in `Nav` component) does not implement:
  - `aria-expanded` on the toggle button — screen readers can't tell whether the menu is open
  - Focus management — no focus moves into the drawer when opened, no focus trap inside, no focus return on close
  - Body scroll lock — page body remains scrollable while drawer is open
  - Escape-to-close — pressing Esc does nothing
  - Backdrop / click-outside-to-close — there is no overlay; clicking outside the drawer doesn't close it
- **Current behavior preserved during migration per delivery-layer-only scope.** Each gap is a P1 accessibility improvement to fix post-migration. Suggested order: `aria-expanded` first (smallest change, highest screen-reader impact), then Escape-to-close, then focus management, then scroll lock, then backdrop.

### A11y-1. (RESOLVED in Checkpoint 4) Layout missing `<main>` landmark
- **Status:** ✅ RESOLVED 2026-05-03 in commit during Checkpoint 4 (Phase 2 → Step "A11y-1").
- **Was:** `src/layouts/Layout.astro` body wrapped Nav + slot + Footer with no `<main>` element. Lighthouse `landmark-one-main` audit failed on every route (-3 a11y points each).
- **Fix:** wrapped `<slot />` in `<main>`. Lighthouse A11y lifted from 92 → 93/94 across spot-checked routes (homepage / junk-removal / about-us). Did not fully reach the 95 target — remaining gap is from A11y-2 (color-contrast) and A11y-3 (heading-order), both pre-existing brand/chrome issues.

### A11y-2. (P1) Orange-500 CTA buttons fail WCAG AA color-contrast
- Lighthouse `color-contrast` audit fails (weight 7) on every route.
- Offenders: orange-500 background + white text on phone-CTA pill buttons (Hero, BusinessDescription, Services bottom, FinalCTA, Nav top-bar `data-desktop-cta` button), plus ReviewWidget's `.rw-review-date` greyed text.
- The orange-500 (≈`#E8751A`) on white text is below the 4.5:1 ratio required for normal-weight text under WCAG AA (computes ≈3.2:1).
- Pre-existing brand-design choice preserved verbatim per delivery-layer-only scope.
- **Fix as P1 post-migration.** Options: shift to a darker orange (e.g., orange-600 ≈`#D4761B` is closer to the 4.5:1 line), or use a heavier font weight (font-bold + larger size qualifies as "large text" with a more lenient 3:1 threshold), or pair white-on-orange with a thin dark border. Coordinate with Tommy/Sydney before changing the brand color.

### A11y-3. (P2) Footer column headings use `<h4>` without ancestor `<h3>`
- Lighthouse `heading-order` audit fails (weight 3) on every route.
- Offenders: Footer column titles ("OUR SERVICES", "QUICK LINKS", "CONNECT") use `<h4>` directly, with no `<h3>` ancestor in the page heading hierarchy.
- Pre-existing Footer markup preserved verbatim per delivery-layer-only scope.
- **Fix as P2 post-migration.** Either promote the Footer column titles to `<h3>` (semantically correct — they are top-level subsections of the Footer landmark) or wrap each column under an existing-but-visually-hidden `<h3>` parent. The simpler change is `<h4>` → `<h3>`.

### CLS-1. (P1) `/contact-us` GHL iframe layout shift
- Lighthouse CLS = 0.433 desktop / 0.734 mobile on `/contact-us`. Performance scores 81/75 as a result. Pre-existing.
- The GHL `form_embed.js` script inserts the iframe asynchronously and resizes form fields after `setTimeout(1500)`, guaranteeing a layout shift after first paint.
- **Fix as P1 post-migration.** Reserve a fixed `min-height` on the iframe wrapper (e.g., `min-h-[800px]`) so the page doesn't grow when the form mounts. May also consider lazy-loading the form behind a "Reveal form" button.

### A2. ServiceRequestModal lacks accessibility primitives
- Modal currently lacks (all preserved verbatim from pre-migration per delivery-layer scope):
  - **No focus trap** inside the modal — Tab can escape to the page behind
  - **No focus return** to the triggering CTA on close — focus drops to body
  - **No Escape-to-close** handler
  - **No `role="dialog"` or `aria-modal="true"`** on the modal container — screen readers don't announce it as a modal
  - **No `aria-labelledby`** linking the modal container to its `<h2>` ("Request Service") — screen readers don't announce the modal title on open
  - **No explicit `type="button"`** on the close button — modal isn't nested in a form so default behavior works, but explicit type is HTML hygiene best practice
- **Fix as part of a single P1 modal-a11y commit post-migration.** Suggested implementation order: `role="dialog"` + `aria-modal="true"` + `aria-labelledby` first (smallest change, highest screen-reader impact), then Escape-to-close, then focus trap, then focus return, then `type="button"`.

---

## P1 — High-impact SEO

### 1. Soft 404 on unknown URLs
- **Today:** `https://rankinwaste.com/<any-bad-url>` returns HTTP 200 + the SPA shell. Google treats this as a soft 404, which can confuse crawlers and bury real pages.
- **Cause:** `netlify.toml` catch-all redirect rewrites every unknown path to `/index.html` with status 200, and `App.jsx` has no `<Route path="*">` 404 handler.
- **Fix:** add a `NotFound.jsx` page at the catch-all route that sets the response status to 404 (in SSG, this can be done via Netlify's `_redirects` `from = /* to = /404.html status = 404` for unknowns, OR by prerendering a real `404.html` and letting Netlify's default behavior serve it for unmatched paths). Netlify automatically serves `dist/404.html` for unmatched routes when one exists at the publish root — that's the cleanest fix.

### 2. Inner pages serve homepage's OG/Twitter tags to crawlers without JS
- **Today:** every inner page's `og:title`, `og:url`, `og:image`, etc. are the homepage's values when a crawler reads the raw HTML. `PageHead`'s `useEffect` only runs after JS executes, so social-card scrapers (Slack, Twitter, Facebook) and JS-blind crawlers see the wrong preview.
- **Resolution:** **automatically fixed by the SSG migration itself.** Post-migration, every page's OG/Twitter tags will appear correctly in the raw HTML for that route. No additional work — but worth re-verifying social-card previews in the post-deploy checks.

### 3. Self-referential canonical for inner pages computed at runtime
- **Today:** `PageHead` builds the canonical from `window.location.origin + window.location.pathname`. Crawlers without JS see the homepage canonical (`https://rankinwaste.com/`) on every inner page, because the homepage canonical is the only one in `index.html`. This means crawlers may consolidate ranking signals from inner pages into the homepage.
- **Resolution:** **automatically fixed by the SSG migration.** Per-route canonicals will appear in raw HTML.

---

## P1 — Internal linking

### IL1. Parent Hubbard page doesn't link to its 3 child Hubbard service pages
- `/waste-management-service-hubbard` (the parent Hubbard page) does not link to its 3 child Hubbard service pages: `/junk-removal-service-hubbard`, `/dumpster-rental-service-hubbard`, `/garbage-collection-service-hubbard`.
- Pre-migration also lacked these links — preserved verbatim per delivery-layer-only migration scope.
- For local SEO, parent pages should link to child service pages to distribute link equity and help Google understand site hierarchy.
- **Add as P1 internal-linking improvement after migration is verified stable.** Each of the 4 service rows on the parent page is a natural anchor: weekly residential / garbage removal / curbside collection / rural service — at least one of these (likely "garbage removal" → `/garbage-collection-service-hubbard`) should become a contextual link. Junk removal and dumpster rental can be added as a "related services" block above or below the existing rows, or as inline links inside relevant copy.

---

## P1 — FAQ rendering

### FAQ-1. FaqAccordion island could be replaced with native `<details>`/`<summary>`
- The homepage FAQ section is currently rendered by `src/components/FaqAccordion.tsx` (a React island hydrated `client:idle`), ported byte-identical from pre-migration `src/App.jsx` `FAQItem` + `linkifyPhone` + `ChevronIcon`.
- Could be replaced post-migration with native `<details>`/`<summary>` for **zero-JS** rendering.
- **Visual difference:** native is binary open/close (no animation); current React version has a height-transition animation (max-h 0 → max-h-96 with opacity). Replacing with native loses the smooth transition.
- **Trade-off:** lose smooth transition but ship 0 KB of JS for the FAQ. Aligns with CLAUDE.md "Minimize JavaScript; prefer zero-JS static pages where possible."
- **Fix as P1 post-migration once stability is verified.** Could be paired with FAQ-2 (single FAQ-rework commit).

---

## P3 — Routing follow-ups

### ROUTE-1. (SUPERSEDED by ROUTE-2) Trailing-slash redirect rules
- ~~Two explicit `:placeholder/` redirect rules in `netlify.toml`~~ — superseded.
- The two-rule `:placeholder` pattern *also* caused a redirect loop on inner pages because Netlify normalizes paths internally before matching redirect rules (treats `/contact-us` and `/contact-us/` as equivalent at match-time). All redirect rules removed; canonicalization handled by `<link rel="canonical">` tags. See ROUTE-2.

### ROUTE-2. Trailing-slash 301 normalization NOT enforced at server level
- Both `/contact-us` and `/contact-us/` serve identical content (HTTP 200) with no redirect. Same for every Astro directory-format route.
- Reason: Netlify's redirect engine normalizes paths internally before matching against `[[redirects]]` rules, so any rule of the form `from = "/.../"` matches BOTH the with- and without-trailing-slash forms of a request. With `force = true`, this causes a redirect loop (`/contact-us` → 301 → `/contact-us` → 301 → ...). Without `force`, Netlify silently suppresses the redirect because the directory file already serves content.
- Encountered during deploy attempt 2026-05-04. Two attempts failed:
  - `from = "/*/"` with `force = true` — looped on every URL including `/`.
  - `from = "/:slug/"` + `from = "/:a/:b/"` with `force = true` — looped on every inner page (`/` survived because `:slug` requires non-empty value).
- **Current behavior:** SEO canonicalization handled by `<link rel="canonical">` tags pointing to the no-trailing-slash form. Google honors canonical tags; URL forms with trailing slashes will not split ranking signal. Pre-migration React SPA had the same lack of strict URL canonicalization.
- **Strict 301 normalization can be added post-deploy via Netlify Edge Function** that intercepts requests, checks for trailing slash on non-root paths, and returns an explicit 301. Edge functions bypass the redirect-rule normalization quirk because they run on the actual request URL before path normalization. Reference implementation:
  ```js
  // netlify/edge-functions/trailing-slash.js
  export default async (request, context) => {
    const url = new URL(request.url);
    if (url.pathname !== '/' && url.pathname.endsWith('/')) {
      url.pathname = url.pathname.slice(0, -1);
      return Response.redirect(url, 301);
    }
    return context.next();
  };
  ```
  Wire via `[[edge_functions]] path = "/*"` in `netlify.toml`.
- **Fix as P3 post-deploy.** Not a launch blocker — the canonical tags are doing the SEO work and inbound links to either URL form work correctly.

---

## P3 — FAQ schema parity

### FAQ-2. FAQPage JSON-LD schema uses ASCII hyphens; visible body uses em-dashes
- The FAQPage JSON-LD schema in `src/pages/index.astro` head fragment contains 8 Q/A pairs. Items 3 (`name`) and 5 (`acceptedAnswer.text`) use ASCII hyphen with spaces (`' - '`).
- The visible body FAQ data in `src/data/faqs.ts` uses em-dash (U+2014) for the same Q/A in items 3 and 5.
- This mismatch was present pre-migration (separate hand-authored schema in static `index.html` vs. JSX FAQ data in `App.jsx` lines 137 and 139).
- **Both preserved verbatim per delivery-layer-only migration scope.**
- **Fix as P3 post-migration:** schema text strings should match visible body text strings for Google's FAQ rich-result eligibility (Google's FAQ guidance recommends schema matching visible content). Reconcile by updating the schema's items 3 and 5 to use em-dashes (matching body), in a single commit.

---

## P2 — Schema coverage gaps

These pages currently have no JSON-LD schema. None are required, but each has a clear schema candidate that could improve rich-result eligibility:

| Route | Suggested schema | Notes |
|---|---|---|
| `/about-us` | `AboutPage` (or `Organization` with founder info) | Use Tommy Rankin's name + business history |
| `/contact-us` | `ContactPage` + `LocalBusiness` | Reinforces local-business signals |
| `/residential` | `Service` + `BreadcrumbList` | Match the pattern used by Hubbard sub-service pages |
| `/trash-trailer-rentals` | `Service` + `BreadcrumbList` | Same as above |
| `/reviews` | `AggregateRating` + reviews | Pulls from the existing review data |
| `/service-areas/axtell` | Add `BreadcrumbList` (already has `Organization`) | Parity with the Hubbard sub-pages |
| `/waste-management-service-hubbard` | Add `Service` (currently only `Organization`) + `BreadcrumbList` | This is the parent Hubbard page; should be at least as schema-rich as its children |

**Caveat:** every schema added needs to match real on-page content. Don't add schema for content that isn't visible.

---

## P3 — Head tag consistency

### 4. PageHead doesn't manage `og:type`, `og:locale`, `og:site_name`, `og:image:width`, `og:image:height`, `twitter:card`
- **Today:** these 6 tags come from `index.html` and apply universally. For a marketing site where every page is `og:type=website`, this is fine.
- **Possible improvement:** centralize all OG/Twitter management in one place (the SSG head layer) so there's a single source of truth. Low priority.

### 5. `PageHead` mutates `document.title` directly inside `useEffect`
- **Today:** works fine in CSR. Will be replaced with `react-helmet-async` during the migration.
- **Resolution:** addressed by Checkpoint 3 of the migration plan.

---

## P4 — Misc

### 6. `index.html` static head includes a fixed homepage canonical
- After migration, `index.html` becomes a template/layout. Its hardcoded canonical to `/` should either be removed (canonical is per-route) or remain as the homepage's canonical only.
- Worth a re-verify post-deploy: crawl homepage, confirm exactly one `<link rel="canonical">` and that it's `https://rankinwaste.com/`.

### 7. Sitemap is hand-maintained
- `public/sitemap.xml` requires a manual entry per new route.
- Could be auto-generated from the same route list used for prerendering (vite-react-ssg can output a sitemap automatically).
- Out of scope: the current manual sitemap is the reference for the migration. Auto-generation is a follow-up.

### 7a. NAP / hours data inconsistency (3 disagreeing sources of truth)
- The Footer displays `Monday – Friday / 8AM – 6PM` — weekdays only, no Saturday.
- `src/data/business.ts` `hours` field declares `7:00 AM – 6:00 PM Monday–Friday` plus `Saturday 8:00 AM – 4:00 PM`.
- The homepage `LocalBusiness` JSON-LD schema (currently in `index.html`, will live in `src/pages/index.astro` post-Batch-6) declares `["Mo-Fr 07:00-18:00", "Sa 08:00-16:00"]`.
- Three sources disagree on:
  - Weekday open time: Footer says 8AM, business.ts and schema say 7AM
  - Saturday hours: Footer omits, business.ts and schema include 8AM–4PM
- Current behavior preserved verbatim across migration (Footer text untouched, schema untouched, business.ts copied from schema values).
- **Fix as P1 NAP cleanup pass post-migration.** Talk to Tommy/Sydney to confirm correct hours, then update all three sources to match. Single commit.

### 8a. GHL Form CSS + JS scoping
- The 20-line `<style>` block and 47-line `<script>` block currently in `Layout.astro` (carried verbatim from pre-migration `index.html`) are global: they ship and run on **every** page, but only have any effect on `/contact-us` where the GHL form renders.
- Today's behavior is preserved verbatim per delivery-layer-only migration scope.
- **Improvement:** scope both the CSS `<style is:global>` block and the inline `<script>` block to the `/contact-us` page only (e.g., place them in `src/pages/contact-us.astro` directly, or in a dedicated `<GhlFormStyling>` Astro component imported only on that page).
- **User-visible behavior is identical** — the selectors only match GHL form elements that only exist on `/contact-us`.
- **Savings:** ~1.5 KB of inline CSS + the 47-line script + a `setTimeout(... 1500)` + querySelectorAll work on every non-contact page load. On the homepage and 11 other inner pages, this is dead overhead.
- Aligns with CLAUDE.md "Minimize JavaScript; prefer zero-JS static pages where possible."
- Single-commit follow-up after migration is verified stable. Move blocks to a `src/components/ContactPageGhlSetup.astro` component, import only in `contact-us.astro`, run smoke check on `/contact-us`.

### 8b. `<lastmod>` in sitemap is stale
- All entries say `2026-04-30` even though pages have been updated since (e.g., the `/garbage-collection-service-hubbard` content was rewritten today).
- Auto-generation would fix this naturally.

---

**Process:** when picking any of these up, open a separate branch and a separate PR per improvement. Do not bundle multiple of these together. Keep the migration's "delivery-layer only" boundary clear in the git history.

---

## Historical attempts (do not repeat without re-evaluating)

### vite-react-ssg attempt (ssg-migration branch, 2026-05-02)

Tried `vite-react-ssg@0.9.1-beta.1`. Required cascading version downgrades:
- Vite 8 → 7
- React Router 7 → 6
- react-helmet-async 3 → 1 (with `--legacy-peer-deps`; helmet 1 doesn't list React 19 as peer)

After all three downgrades, prerender still emitted per-page head tags into `<body>` (inside `<div id="root">`) instead of `<head>` — caused by helmet 1.x not integrating cleanly with vite-react-ssg's head extraction under React 19. Lighthouse SEO dropped 100 → 92 on every page because the meta description wasn't found in `<head>`.

**Documented for future reference if the library matures.** When `vite-react-ssg` adds support for Vite 8 + RR 7 + helmet 3 (or switches to a different head manager), this approach may become viable. The `ssg-migration` branch is preserved as the recoverable record.

Migration continued via Path B (vike) on the `ssg-migration-v2` branch.

### vike attempt (ssg-migration-v2 branch, 2026-05-02)

vike-react migration attempted on `ssg-migration-v2` branch; did not reach implementation. Plan documented (Checkpoint 2 + clarifications) for reference. Astro chosen as foundation going forward — different framework entirely, native SSG, zero-JS-by-default architecture better suited to this site's static content profile. The `ssg-migration-v2` branch is preserved as the recoverable record of the vike plan.
