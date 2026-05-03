# Migration Resume Notes

**Last session ended:** 2026-05-03 (continued)
**Branch:** `astro-migration`
**HEAD commit:** `f5870a8` — `feat(astro): batch 4.3 — port axtell to Astro with per-page Organization schema in head, byte-identical content`
**Status:** ✅ **Foundation Complete + Batches 3 & 4 complete (8 / 13 pages translated)**

---

## Where we are

The Astro foundation is fully built and verified. The 12 legacy React SPA page components are deleted, replaced by the Astro layout + component layer. **8 of 13 pages translated** (Batches 3 & 4 complete). Batches 5 & 6 cover the remaining 5 pages.

### Pages translated (Batches 3 & 4 complete)

| # | Page | Commit | Verification |
|---|---|---|---|
| 1 | `/terms-of-service` | `c8921e3` | 15/15 assertions PASS |
| 2 | `/privacy-policy` | `2eb3995` | 18/18 assertions PASS |
| 3 | `/residential` | `f49f9cd` | 16/16 assertions PASS |
| 4 | `/trash-trailer-rentals` | `201a79f` | 14/14 assertions PASS |
| 5 | `/about-us` | `c97d79f` | 19/19 assertions PASS |
| 6 | `/contact-us` | `0ae688d` | 17/17 assertions PASS |
| 7 | `/reviews` | `1fdefc5` | 25/25 assertions PASS |
| 8 | `/service-areas/axtell` | `f5870a8` | 25/25 assertions PASS |

**Batch 3 total: 82/82 assertions PASS. Batch 4 total: 67/67 assertions PASS. Combined: 149/149.**

### Translation patterns locked in across Batches 3 + 4

- Layout title + description from `migration-baseline.md` §2
- InnerHero with title (and optional bgImage)
- `data-reveal` attributes (with optional `data-reveal-delay="0.X"`) — supports 1–6 staggered reveals per page
- CallCTA component (and optional separate inline phone link with `text-orange-500 hover:text-orange-400 font-semibold` styling)
- **Per-page schema via `<Fragment slot="head">` + `<script is:inline type="application/ld+json" set:html={JSON.stringify({...})} />`** (Batch 4.3, axtell)
- **React island consumption via `<Component client:idle />`** (Batch 4.2, reviews — `<ReviewWidget client:idle />` server-renders content, defers React hydration)
- **Third-party iframe with per-page inline script loader** (Batch 4.1, contact-us — form_embed.js with idempotent querySelector check)
- `<img>` tags preserved byte-identical (raw `<img>` per CLAUDE.md follow-up; not yet migrated to `astro:assets <Image />`)
- `className` → `class` throughout
- Byte-identical content with per-page byte-level dash verification (ASCII vs en/em-dash via `od -c` / hex byte counts)
- Prose word-diff vs master (expecting only JSX `); }` close artifacts as the visible delta)
- Schema byte-identity verified by re-running `JSON.stringify` on identical objects in both files (axtell schema = 388 bytes both)

### Foundation pieces in place
- Astro 5.18 + React 19 + Tailwind v4 toolchain (Batch 1)
- `src/layouts/Layout.astro` — full `<head>` management (per-page title/description/canonical/OG/Twitter from props, 6 universal OG/Twitter tags + font preloads + favicon site-wide), reveal-animation inline script, GHL form CSS + JS site-wide, modal-trigger bridge via `CustomEvent('open-service-modal')`
- `src/components/Nav.astro` — top utility bar + main nav + mobile drawer (mobile menu spec preserved verbatim, a11y gaps logged)
- `src/components/Footer.astro`, `InnerHero.astro`, `CallCTA.astro`
- `src/components/icons/*.astro` × 7 (PhoneIcon, MailIcon, MapPinIcon, ClockIcon, StarIcon, ChevronIcon, FacebookIcon)
- 3 React islands: `ServiceRequestModal.tsx` (mounted in Layout, `client:idle`), `ReviewWidget.tsx` (per-page island, `client:idle` at consumer site), `ServiceAreaMap.tsx` (dead code, `client:visible` at consumer site)
- `src/data/business.ts` NAP single-source-of-truth
- `src/pages/index.astro` is currently a placeholder — will be replaced by the real homepage in Batch 6

### Working verifications (re-run any time)
```bash
npm run build           # → 1 page (placeholder), ~1s, clean
npx astro check         # → 0 errors, 0 warnings, 1 hint (preserved iframe deprecation)
node scripts/verify-ssg.mjs  # head-only assertions; runs against dist/<route>/index.html
```

---

## Next planned batch

**Batch 5 — port the 4 Hubbard service pages:**

The most uniform batch — all 4 pages share the same structural pattern (alternating image+text grids, Service + BreadcrumbList schemas, similar h2/h3 layout). The patterns from Batch 4's axtell schema and Batch 3's image handling carry over directly.

Pages, in suggested order (simplest service-schema → most complex):
1. `src/pages/junk-removal-service-hubbard.astro`
2. `src/pages/dumpster-rental-service-hubbard.astro`
3. `src/pages/garbage-collection-service-hubbard.astro`
4. `src/pages/waste-management-service-hubbard.astro` (the parent Hubbard page; per `migration-baseline.md` §2 it has only Organization + PostalAddress + City schema, simpler than the others which add Service + BreadcrumbList)

**Note:** the pre-migration source for the 4 Hubbard pages includes alternating image+text grid sections with reveal animations on each section. Image attribute handling already established in Batch 3 (about-us). Schema handling already established in Batch 4 (axtell — Fragment slot="head" pattern with is:inline directive).

After Batch 5:
- Batch 6: `index.astro` homepage (largest single file — Hero, FAQ, Services, FindUs, etc. + the 38-`@type` JSON-LD homepage schema; replaces the placeholder index.astro)
- Smoke gate: `<title>` in `<head>` for all 13 prerendered pages
- Checkpoint 4: hardened verifier + Lighthouse + visual diff matrix on 5 pages × 2 viewports
- Deploy

---

## Established page translation pattern (apply per page)

Every Batch 3–6 page follows this shape:

```astro
---
// src/pages/<route>.astro
// Byte-identical content port of pre-migration src/pages/<Component>.jsx.

import Layout from '../layouts/Layout.astro';
import InnerHero from '../components/InnerHero.astro';
import CallCTA from '../components/CallCTA.astro';
import { PHONE, PHONE_LINK } from '../data/business';
// ...other component imports as needed (icons, ReviewWidget for /reviews, etc.)
---

<Layout
  title="<exact title from migration-baseline.md §2>"
  description="<exact description from migration-baseline.md §2>"
>
  {/* Per-page schema goes in slot="head" — copy <script type="application/ld+json"> blocks
      verbatim from the corresponding pre-migration .jsx page. Wrap in:
      <Fragment slot="head">
        <script type="application/ld+json" set:html={JSON.stringify({...})} />
      </Fragment>
  */}

  <InnerHero
    title="<exact H1 from migration-baseline.md §2>"
    bgImage="/images/...webp"      // only when pre-migration set bgImage
    bgImageAlt="..."               // only when pre-migration set bgImageAlt
  />

  <section class="<exact tailwind classes from pre-migration>">
    <div class="...">
      {/* For animated sections, add data-reveal (and optional data-reveal-delay="0.1") */}
      <div data-reveal class="mb-12 md:mb-16">
        <p>...content byte-identical to pre-migration...</p>
      </div>

      <div data-reveal data-reveal-delay="0.1" class="...">
        {/* staggered second section */}
      </div>

      {/* CTA pattern */}
      <CallCTA />
    </div>
  </section>
</Layout>
```

### Key contracts to preserve

- **Layout `title` + `description` props:** copy verbatim from `migration-baseline.md` §2 (one row per route)
- **`<InnerHero title=...>`:** the H1 string is verbatim from `migration-baseline.md` §2
- **`<InnerHero bgImage=... bgImageAlt=...>`:** only set when pre-migration `.jsx` set them; otherwise the prop-less form (solid `bg-dark-elevated` hero)
- **Reveal animations:** wherever pre-migration used `useReveal()`, add `data-reveal` attribute. Wherever pre-migration passed a `delay` parameter (e.g. `useReveal(0.1)`), add `data-reveal-delay="0.1"` (string, parsed as `parseFloat(...) || 0` by the inline observer in Layout)
- **Schema scripts:** copy the `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({...}) }} />` JSX block byte-identical, translated to Astro's `<script type="application/ld+json" set:html={JSON.stringify({...})} />`. The schema object content is byte-identical. Place inside `<Fragment slot="head">...</Fragment>` for `<head>` placement (per Layout's named-slot contract)
- **`<Link to=>` → `<a href=>`:** react-router-dom is gone. Every internal navigation is a full-page `<a href>` (Astro+Netlify serve cached HTML, so navigation is instant)
- **`className=` → `class=`:** Astro syntax
- **Tailwind classes:** byte-identical to pre-migration JSX
- **`<img>` tags:** preserve raw `<img>` with existing `srcset`/`sizes`/`width`/`height`/`loading`/`fetchpriority`/`decoding`/`alt` attributes verbatim. Do NOT switch to `astro:assets <Image />` — that's a P1 follow-up (see `post-migration-improvements.md`)

### Source-of-truth lookups during translation

```bash
git show master:src/pages/Hubbard.jsx           # pre-migration page body
git show master:src/App.jsx                     # for HomePage components in Batch 6
git show master:src/shared.jsx                  # only for cross-reference (already deleted)
git show master:src/components/ReviewWidget.jsx # already ported as .tsx, but reference for data
```

`migration-baseline.md` is the canonical reference for what every page must contain (H1, title, description, canonical, schema types, body sample).

---

## Migration discipline (re-read before each batch)

1. **Byte-identical content.** Page copy, schema JSON, hardcoded strings, attribute values — all preserved verbatim from pre-migration.
2. **No improvements during migration.** No new ARIA, no new schema, no new pages, no new content, no new images, no `<Image />` switch, no schema componentization, no auto-sitemap.
3. **Log, don't act.** When you spot something that should be improved (a11y, performance, dead code, inconsistency), append it to `post-migration-improvements.md` instead of fixing it.
4. **Show diffs before applying.** User reviews each batch before commit.
5. **Sanity build after each batch.** `npm run build` + `astro check` — must stay clean.

---

## Open known items (already logged in `post-migration-improvements.md`)

- **A1.** Mobile menu lacks aria-expanded, focus trap, scroll lock, Esc-to-close, backdrop-click-to-close
- **A2.** ServiceRequestModal lacks focus trap, focus return, Esc-to-close, role="dialog", aria-labelledby, explicit type="button" on close
- **7a.** NAP/hours inconsistency: Footer says "Mon–Fri 8AM–6PM" (no Saturday), `business.ts` says "7AM–6PM Mon–Fri + Sat 8AM–4PM", LocalBusiness schema says "Mo-Fr 07:00-18:00, Sa 08:00-16:00". Three sources disagree.
- **8a.** GHL form CSS + JS scoped site-wide (preserved verbatim) but only relevant on `/contact-us`. P3 follow-up to scope to that page only.
- **Vite 8 + RR 7 upgrade revisit** (no longer needed since we pivoted to Astro; the constraint that drove pinning was vite-react-ssg, which we abandoned)
- **Auto-sitemap, Partytown, `<Image />` switch** — all CLAUDE.md spec items skipped during migration, P1/P3 follow-ups

---

## Resume prompt for next session

Paste this into Claude Code when picking up:

> Resume the Astro migration on branch `astro-migration` from commit `f5870a8` (Batches 3 & 4 complete, 8/13 pages translated).
>
> Apply Batch 5 — port the 4 Hubbard service pages, which share the most uniform structure of any batch (alternating image+text grids, Service + BreadcrumbList schemas):
> 1. `junk-removal-service-hubbard.astro`
> 2. `dumpster-rental-service-hubbard.astro`
> 3. `garbage-collection-service-hubbard.astro`
> 4. `waste-management-service-hubbard.astro` (parent Hubbard page with simpler Organization-only schema)
>
> All patterns needed for Batch 5 are already established and verified:
> - Per-page schema via `<Fragment slot="head">` + `<script is:inline type="application/ld+json" set:html={JSON.stringify({...})} />` (axtell template — see 4.3)
> - Image handling with byte-identical `<img>` attribute preservation (about-us template — see 3.5)
> - Multi-reveal staggered animations with `data-reveal-delay="0.X"` (axtell + about-us templates)
> - Schema byte-identity verification via re-running JSON.stringify on identical objects
>
> Same verification discipline as Batches 3-4: inventory + cross-check vs migration-baseline, byte-level dash/hyphen checks, prose word-diff, structural counts, build + astro check + curl assertions.
>
> Show me each page's diff for approval before applying. After all 4 apply: hold for Batch 6 (homepage) approval.
>
> Re-read `MIGRATION-RESUME.md` for the established patterns and migration-discipline reminders.

---

## File locations cheatsheet

| File | Purpose |
|---|---|
| `migration-baseline.md` | Source-of-truth for what every page must contain (H1, title, desc, schema types) |
| `post-migration-improvements.md` | Backlog of items to address after migration |
| `MIGRATION-RESUME.md` | This file — resume notes for next session |
| `scripts/verify-ssg.mjs` | Head-only HTML assertions per route |
| `src/layouts/Layout.astro` | Base layout (head, body wrapper, modal mount, reveal script) |
| `src/data/business.ts` | NAP single-source-of-truth |
| `astro.config.mjs` | Astro config (site URL, trailingSlash:'never', build.format:'directory') |
