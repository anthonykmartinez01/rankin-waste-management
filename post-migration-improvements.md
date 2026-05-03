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
